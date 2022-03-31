import './App.css';
import LoginPage from './components/Login/Login';
import { Link, Routes, Route, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RegisterPage from './components/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import { useEffect, useState } from 'react';
import Scrumboard from './components/Scrumboard/Scrumboard';
import axios from 'axios';
import { loginReducer } from './features/login/loginSlice';
import { useDispatch } from 'react-redux';
import BoardDetail from './components/BoardDetail/BoardDetail';

function RequireAuth() {
  let loginUser = store.getState().login;
  let location = useLocation();
  if (!loginUser.token) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return <Outlet />;
}

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loginedUser = localStorage.getItem('loginedUser');
    if(loginedUser) {
      const userObject = JSON.parse(loginedUser);
      dispatch(loginReducer(userObject));
      navigate('/scrumboard');
    }
  }, [])
  
  const [user, setUser] = useState(null);

  function handleChange() {
    let loginUser = store.getState().login;
  
    if (loginUser) {
      setUser(loginUser);
      axios.interceptors.request.use(
        (req) => {
            req.headers["Authorization"] = `Bearer ${loginUser.token}`;
            return req;
        },
        (err) => {
           return Promise.reject(err);
        }
      );
    }
  }
  function handleLogout(){
    localStorage.removeItem('loginedUser');
    dispatch(loginReducer(null));
  }
  store.subscribe(handleChange);
  return (
    <div className="App">
      {(!user ?
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Kanban Board</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      :
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/scrumboard"}>Kanban Board</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="nav-link">Welcome : {(user.username).charAt(0).toUpperCase() + (user.username).slice(1)}</div>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={"/sign-in"} onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      )}
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path='/' element={ <LoginPage/>}/>
            <Route path="/sign-in" element={ <LoginPage/>}/>
            <Route path="/sign-up" element={ <RegisterPage/>}/>
            <Route element={<RequireAuth />}>
              <Route path="/scrumboard" element={ <Scrumboard/>}/>
              <Route path='/scrumboard/:id' element={ <BoardDetail/>} />
            </Route>
          </Routes>
        </div>
      </div>
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </div>
  );
}

export default App;

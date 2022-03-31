import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {createListApi, getBoard, getBoardDetailList, updateBoard} from "../../services/api";
import {Modal, Button} from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import {default as MuiButton} from '@mui/material/Button';
import SortableComponent from "./Sortable";


function BoardDetail() {
    let {id} = useParams();
    let [boardDetail, setBoardDetail] = useState({});
    const [boardDetailModal, setBoardDetailModal] = useState(false);
    const [boardName, setBoardName] = useState();
    const [createListTitle, setCreateListTitle] = useState("");
    const [createList, setCreateList] = useState(false);
    const [lists, setLists] = useState([]);

    const handleBoardDetailModalShow = () => setBoardDetailModal(true);
    const handleBoardDetailModalClose = () => setBoardDetailModal(false);

    const handleCreateListModalShow = () => setCreateList(true);
    const handleCreateListModalClose = () => setCreateList(false);


    const handleEditBoard = () => {
        handleBoardDetailModalClose();
        updateBoard(boardDetail.id, boardName).then((response) => {
            loadBoard();
            toast.success("Board Update Successful");
        });
    };

    const handleCreateList = () => {
        handleCreateListModalClose();
        createListApi(id, createListTitle).then((response) => {
            loadLists();
            toast.success("Create List Successful");
        });
    };


    useEffect(() => {
        loadBoard();
        loadLists();
    }, []);

    function loadBoard() {
        getBoard(id)
            .then((response) => {
                setBoardDetail(response.data);
                setBoardName(response.data.title)
            })
            .catch(() => {
                toast.error("List not found!");
            });
    }

    function loadLists() {
        getBoardDetailList(id).then((response) => {
            setLists(response.data);
        })
    }

    return (
        <div className="mt-5 pt-2">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand">{boardDetail.title}</span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li
                                className="nav-item active"
                                onClick={handleBoardDetailModalShow}
                            >
                                <span className={"nav-link"}>Edit</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <MuiButton className="col-2" variant="contained" startIcon={<AddIcon/>}
                               onClick={() => handleCreateListModalShow()}>
                        Add A List
                    </MuiButton>
                </div>
                <SortableComponent lists={lists}/>
            </div>

            <Modal show={boardDetailModal} onHide={handleBoardDetailModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-2">
                        <input
                            onChange={(e) => {
                                e.preventDefault();
                                setBoardName(e.target.value);
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Enter boardname"
                            required
                            value={boardName}
                        />
                        <label htmlFor="floatingInput">Board Name</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBoardDetailModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditBoard}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={createList} onHide={handleCreateListModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-2">
                        <input
                            onChange={(e) => {
                                e.preventDefault();
                                setCreateListTitle(e.target.value);
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Enter List title"
                            required
                            value={createListTitle}
                        />
                        <label htmlFor="floatingInput">List Title</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateListModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateList}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BoardDetail;

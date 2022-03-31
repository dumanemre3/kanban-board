import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./scrumboard.css";
import {
  addMemberToBoard,
  addNewBoard,
  deleteMemberBoard,
  destroyBoard,
  getBoardList,
  getMemberList,
  updateBoard,
} from "../../services/api";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Scrumboard() {
  const [boards, setBoards] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [memberName, setMemberName] = useState("");

  const [boardMembers, setBoardMembers] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDetail = () => setShowDetail(false);
  
  const handleShowDetail = (board) => {
    setBoardName(board.title);
    setSelectedBoard(board);
    getBoardMembers(board.id);
    setShowDetail(true);
  };

  const handleAddBoard = () => {
    setBoardName("");
    setShow(false);
    addNewBoard(boardName).then((response) => {
      setBoards([...boards, response.data]);
      toast.success("Board Add Successful");
    });
  };

  const handleAddMember = () => {
    const model = {
      username: memberName,
      boardId: selectedBoard.id,
    };
    addMemberToBoard(model)
      .then((response) => {
        getBoardMembers(selectedBoard.id);
        toast.warning("Member Add Successful");
      })
      .catch(() => {
        toast.error("Member can't Added");
      });
  };

  const handleEditBoard = () => {
    const board = selectedBoard;
    const newBoardName = boardName;
    setShowDetail(false);
    updateBoard(board.id, newBoardName).then((response) => {
      const boardsArray = boards;
      const index = boardsArray.findIndex((b) => b.id === board.id);
      boardsArray[index] = response.data;
      setBoards([...boardsArray]);
      toast.success("Board Update Successful");
    });
  };

  const deleteBoard = (board, index) => {
    destroyBoard(board.id).then(() => {
      const boardsArray = boards;
      boardsArray.splice(index, 1);
      setBoards([...boardsArray]);
      toast.success("Board Destroy Successful");
    });
  };

  function getBoardMembers(boardId) {
    getMemberList(boardId).then((response) => {
      setBoardMembers(response.data);
    });
  }

  const deleteBoardMember = (userId) => {
    deleteMemberBoard(userId)
      .then(() => {
        getBoardMembers(selectedBoard.id);
        toast.success("Board member is deleted!");
      })
      .catch(() => {
        toast.error("Board member is not delete!");
      });
  };
  useEffect(() => {
    getBoardList().then((response) => {
      setBoards(response.data);
    });
  }, []);

  return (
    <>
      <div className="mt-5 container scrumboard">
        <div className="row">
          {boards.map((board, index) => {
            return (
              <div key={index} className="col-auto mt-3">
                <div className="board-box position-relative">
                  <div onClick={() => deleteBoard(board, index)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="position-absolute trash-icon"
                    />
                  </div>
                  <div onClick={() => handleShowDetail(board)}>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="position-absolute three-dot-icon fa-lg"
                    />
                  </div>
                  <Link to={`/scrumboard/${board.id}`}>
                    <FontAwesomeIcon
                      className="chart-icon"
                      icon={faChartColumn}
                    />
                    {board.title}
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="col-auto mt-3">
            <div className="board-box" onClick={handleShow}>
              <FontAwesomeIcon className="chart-icon" icon={faCirclePlus} />
              Add new board
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-2">
            <input
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Enter boardname"
              required
            />
            <label htmlFor="floatingInput">Board Name</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBoard}>
            Add Board
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Board Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-floating mb-2">
              <input
                onChange={(e) => {
                  setBoardName(e.target.value);
                }}
                value={boardName}
                type="text"
                className="form-control"
                placeholder="Enter boardname"
                required
              />
              <label htmlFor="floatingInput">Board Name</label>
            </div>
            <Button
              className="mb-2"
              variant="primary"
              onClick={handleEditBoard}
            >
              Edit Board Name
            </Button>
            <hr />
            <div className="form-floating mb-2">
              <h3>Board Users</h3>
              <div className="form-floating mb-2 d-flex">
                <input
                  onChange={(e) => {
                    setMemberName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Enter member username"
                  required
                />
                <label htmlFor="floatingInput">Member Username</label>
                <Button
                  className="ml-2"
                  variant="primary"
                  onClick={handleAddMember}
                >
                  Add Member
                </Button>
              </div>
              <ul className="list-group">
                {boardMembers.map((member, key) => {
                  return (
                    <li key={key} className="list-group-item">
                      <span
                        className="member-delete"
                        onClick={() => deleteBoardMember(member.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                      {member.user.username}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Scrumboard;

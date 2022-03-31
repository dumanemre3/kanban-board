import axios from "axios";


const baseUrl = "http://localhost:80/";

export function login(loginModel){
    return axios.post(baseUrl + 'auth/login',loginModel);
}

export function register(registerModel){
    return axios.post(baseUrl + 'auth/register',registerModel);
}

export function getBoardList(){
    return axios.get(baseUrl + 'board');
}

export function addNewBoard(title){
    return axios.post(baseUrl + 'board',{
        title
    });
}

export function getBoard(boardId) {
    return axios.get(`${baseUrl}board/${boardId}`);
}

export function destroyBoard(boardId){
    return axios.delete(baseUrl + 'board/' + boardId);
}

export function updateBoard(boardId,newTitle){
    return axios.put(baseUrl + 'board/' + boardId,{
        "title":newTitle
    });
}

export function getMemberList(boardId){
    return axios.get(baseUrl + 'board-member?boardId=' + boardId);
}

export function addMemberToBoard(model){
    return axios.post(baseUrl + 'board-member',model);
}

export function deleteMemberBoard(userId) {
    return axios.delete(baseUrl + 'board-member/' + userId);
}

export function getBoardDetailList(boardId) {
    return axios.get(`${baseUrl}list?boardId=${boardId}`);
}

export function createListApi(boardId, title){
    return axios.post(baseUrl + 'list' , {boardId:Number(boardId),title});
}

export function deleteList(listId){
    return axios.delete(`${baseUrl}list/${listId}`);
}
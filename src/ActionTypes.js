
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_ALL_ANSWERS = "ADD_ALL_ANSWERS";
export const REMOVE_ANSWER = "REMOVE_ANSWER";
export const SELECT_ANSWER = "SELECT_ANSWER";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const EDIT_ANSWER = "EDIT_ANSWER";
export const FETCH_DATA = "FETCH_DATA";
export const POST_DATA = "POST_DATA";

export const ACTION_EDIT = "ACTION_EDIT";
export const UNLOCK_SITE = "UNLOCK_SITE";

const domain = "http://localhost:3333";

function dataLoadRequest() {
    return fetch(`${domain}/`, {
        method: "GET",
        cache: "no-cache",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}

function postDataRequest(data) {
    console.log(data);
    return fetch(`${domain}/?token=saveSomething`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    });
}

export function addAnswer(answer) {
    return { type: ADD_ANSWER, answer };
}

export function editAnswer(answer) {
    return { type: EDIT_ANSWER, answer };
}

export function removeAnswer(answer) {
    return { type: REMOVE_ANSWER, answer };
}

export function selectAnswer(answer, select) {
    return { type: SELECT_ANSWER, answer, select };
}

export function addAllAnswers(answers) {
    return { type: ADD_ALL_ANSWERS, answers };
}

export function editQuestion(question) {
    return { type: EDIT_QUESTION, question };
}

export function toggleEdit(edit) {
    return { type: ACTION_EDIT, edit };
}

export function unlockSite() {
    return { type: UNLOCK_SITE };
}

export function getData(data) {
    return { type: FETCH_DATA, data };
}

export function postData() {
    return { type: POST_DATA };
}

export function fetchData() {
    return (dispatch) => {
         dataLoadRequest()
            .then(response => dispatch(getData(response.json())))
            .catch(e => console.log(e));
    }
}

export function sendData(data) {
    return (dispatch) => {
        return postDataRequest(data)
            .then((response) => dispatch(postData()))
            .catch(e => console.error(e));
    }
}
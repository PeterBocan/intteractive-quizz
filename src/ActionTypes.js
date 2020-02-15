
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_ALL_ANSWERS = "ADD_ALL_ANSWERS";
export const REMOVE_ANSWER = "REMOVE_ANSWER";
export const SELECT_ANSWER = "SELECT_ANSWER";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const EDIT_ANSWER = "EDIT_ANSWER";

export const ACTION_EDIT = "ACTION_EDIT";
export const ACTION_ANSWER = "ACTION_ANSWER";

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
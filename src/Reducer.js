import {ACTION_EDIT, ADD_ANSWER, EDIT_ANSWER, EDIT_QUESTION, SELECT_ANSWER, REMOVE_ANSWER} from "./ActionTypes";

const initialState = {
    allAnswers: [],
    selectedAnswers: [],
    question: "",
    editMode: false,
    numberOfCorrectAnswers: 0
};

export function reducer(state = initialState, action) {
    if (action === undefined) {
        return state;
    }
    switch(action.type)  {
        case ADD_ANSWER: {
            let obj = {
                allAnswers: [...state.allAnswers, action.answer],
                numberOfCorrectAnswers: action.answer.isAnswer? state.numberOfCorrectAnswers + 1 : state.numberOfCorrectAnswers
            };
            return Object.assign({}, state, obj);
        }

        case EDIT_ANSWER: {
            let index = state.allAnswers.findIndex((answer) => answer.id === action.answer.id);
            state.allAnswers[index] = Object.assign({}, state.allAnswers[index], action.answer);
            let obj = {
                allAnswers: state.allAnswers,
                numberOfCorrectAnswers: action.answer.isAnswer? state.numberOfCorrectAnswers + 1 : state.numberOfCorrectAnswers
            };
            return Object.assign({}, state, obj);
        }

        case REMOVE_ANSWER: {
            const newState = {
                allAnswers: state.allAnswers.filter((answer) => action.answer.key !== answer.key ),
                selectedAnswers: state.selectedAnswers.filter((answer) => action.answer.key !== answer.key )
            };
            return Object.assign({}, state, newState);
        }

        case SELECT_ANSWER: {
            let answers = [];
            if (action.select === false) {
                answers = state.selectedAnswers.filter((answer) => answer !== action.answer);
            } else {
                answers = Array.from(state.selectedAnswers);
                answers.push(action.answer);
            }
            return Object.assign({}, state, {selectedAnswers: answers});
        }

        case EDIT_QUESTION: {
            let question = action.question;
            return Object.assign( {}, state, {question});
        }

        case ACTION_EDIT: {
            return Object.assign({}, state, { editMode: action.edit });
        }

        default:
            return state;
    }
}
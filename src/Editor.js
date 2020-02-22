import React from "react";
import AnswerPanel from "./AnswerPanel";
import { connect } from "react-redux";
import * as Actions from "./ActionTypes";

class Editor extends React.Component
{
    constructor(props) {
        super(props);
        this.renderQuestionAnswers = this.renderQuestionAnswers.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.captureQuestion = this.captureQuestion.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    toggleEdit() {
        this.props.toggleEdit(!this.props.editMode);
    }

    renderQuestionAnswers() {
        return this.props.allAnswers.map((answer) => {
            return <AnswerPanel answer={answer} key={answer.key} />;
        });
    }

    addAnswer() {
        let key = (Math.random()*1e64).toString(30);
        this.props.onAddAnswer({ id: this.props.allAnswers.length, text: "", isAnswer: false, key });
    }

    captureQuestion(e) {
        this.props.onEditQuestion(e.target.value);
    }

    handleSave() {
        console.log("Hello");
        this.props.saveQuestion(this.props.state);
    }

    render() {
        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds"> </div>
                    <div className="column">
                        <button className="button is-link" onClick={this.toggleEdit}>
                            <i className="icon fas fa-times"> </i>
                        </button>
                    </div>
                </div>

                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <div className="field">
                            <label className="label">Otazka</label>
                            <div className="control">
                                <input className="input"
                                       type="text"
                                       placeholder="Otazka"
                                       defaultValue={this.props.question}
                                       onKeyPress={this.captureQuestion}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column"> </div>
                </div>

                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <p>Odpovede</p>
                    </div>
                    <div className="column"> </div>
                </div>

                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <div className="columns is-multiline">
                            {this.renderQuestionAnswers()}
                        </div>
                    </div>
                    <div className="column"> </div>
                </div>
                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <button onClick={this.addAnswer}>
                            <span className="icon is-large">
                                <i className="fas fa-2x fa-plus" />
                            </span>
                        </button>
                    </div>
                    <div className="column"> </div>
                </div>
                <div className="columns">
                    <div className="column is-two-thirds"> </div>
                    <div className="column"> </div>
                    <div className="column">
                        <button className="button is-active is-primary is-large" onClick={() => this.handleSave()}>
                            Save
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        editMode: state.editMode,
        allAnswers: state.allAnswers,
        selectedAnswers: state.selectedAnswers,
        question: state.question,
        numberOfCorrectAnswers: state.numberOfCorrectAnswers,
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditStoreAnswers: answers => {
            dispatch(Actions.addAllAnswers(answers));
        },
        onAddAnswer: answer => {
            dispatch(Actions.addAnswer(answer));
        },
        onDeleteAnswer: id => {
            dispatch(Actions.removeAnswer(id));
        },
        onEditQuestion: question => {
            dispatch(Actions.editQuestion(question));
        },
        toggleEdit: edit => {
            dispatch(Actions.toggleEdit(edit));
        },
        saveQuestion: (data) => {
            dispatch(Actions.sendData(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

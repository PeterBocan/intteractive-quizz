import React from 'react';
import './App.css';
import * as ReactRedux from 'react-redux';
import * as Actions from './ActionTypes';
import SwitchPanel from "./SwitchPanel";
import AnswerPanel from "./AnswerPanel";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.renderQuestionAnswers = this.renderQuestionAnswers.bind(this);
        this.captureQuestion = this.captureQuestion.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.evaluateAnswer = this.evaluateAnswer.bind(this);
    }

    displayEditor() {
        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds"> </div>
                    <div className="column">
                        <button className="button is-link" onClick={this.edit}>
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
                                <input className="input" type="text" placeholder="Otazka" defaultValue={this.props.question} onKeyPress={this.captureQuestion} />
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
                            <div className="column">
                                <button onClick={this.addAnswer}>
                                    <span className="icon is-large">
                                        <i className="fas fa-2x fa-plus" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="column"> </div>
                </div>
            </React.Fragment>
        );
    }

    captureQuestion(e) {
        this.props.onEditQuestion(e.target.value);
    }

    addAnswer() {
        let key = (Math.random()*1e64).toString(30);
        this.props.onAddAnswer({ id: this.props.allAnswers.length, text: "", isAnswer: false, key });
    }

    edit() {
        this.props.toggleEdit(!this.props.editMode);
    }

    deleteAnswer(id) {
        this.props.onDeleteAnswer(id);
    }

    renderQuestionAnswers() {
        return this.props.allAnswers.map((answer) => {
            return <AnswerPanel answer={answer} key={answer.key} />;
        });
    }

    evaluateAnswer() {
        this.props.selectedAnswers.forEach((answer) =>
            console.log(answer)
        );
    }

    displayQuestion() {
        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <h1 className="title is-1 has-text-left">Kviz</h1>
                        <h2 className="title is-2 has-text-left">{this.props.question}</h2>
                    </div>
                    <div className="column"> </div>
                </div>

                <div className="columns">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <SwitchPanel answers={this.props.allAnswers} />
                    </div>
                    <div className="column"> </div>
                </div>

                <div className="columns submit-panel">
                    <div className="column"> </div>
                    <div className="column is-two-thirds">
                        <button className="button is-link is-outlined is-large is-pulled-left" onClick={this.edit}>
                            <span className="icon is-large">
                                <i className="fas fa-2x fa-cogs" />
                            </span>
                        </button>
                        <button className="button is-large is-info is-pulled-right" onClick={this.evaluateAnswer}>
                            Vyhodnot
                        </button>
                    </div>
                    <div className="column"> </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <section className="App section">
                {this.props.editMode? this.displayEditor() : this.displayQuestion()}

                <div className="columns fixed-panel">
                    <div className="column"> </div>
                    <div className="column is-two-thirds"> </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        editMode: state.editMode,
        allAnswers: state.allAnswers,
        selectedAnswers: state.selectedAnswers,
        question: state.question
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
        }
    };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);

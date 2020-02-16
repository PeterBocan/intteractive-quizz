import * as React from "react";
import { connect } from 'react-redux';
import * as Actions from './ActionTypes';

 class AnswerPanel extends React.Component
{
    state = {
        isAnswer: false,
        answer: {}
    };

    constructor(props) {
        super(props);
        this.editAnswer = this.editAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.markAsAnswer = this.markAsAnswer.bind(this);
        this.state.isAnswer = this.props.answer.isAnswer;
        this.state.answer = this.props.answer;
    }

    editAnswer(event) {
        let newAnswer = Object.assign({}, this.props.answer);
        newAnswer.text = event.target.value;
        this.props.editAnswer(newAnswer);
        this.setState({ answer: newAnswer });
    }

    deleteAnswer() {
        this.props.deleteAnswer(this.props.answer);
    }

    markAsAnswer() {
        let newAnswer = {...this.state.answer};
        newAnswer.isAnswer = !newAnswer.isAnswer;
        console.log(newAnswer);
        this.props.editAnswer(newAnswer);
        this.setState({ isAnswer: true });
    }

    render()
    {
        const answer = this.props.answer;

        return (
            <div className="column">
                <div className="field has-addons">
                    <div className="control answer-input">
                        <input type="text" defaultValue={"" + answer.text} className={"input" + (this.state.isAnswer? " is-success" : "")} onKeyUp={this.editAnswer} />
                    </div>
                    <div className="control">
                        <button className={"button" + (this.state.isAnswer? " is-success" : "")} onClick={this.markAsAnswer}>
                            <span className="icon is-large">
                                <i className={"fas fa-check" + (this.state.isAnswer? " is-success" : "") } />
                            </span>
                        </button>
                    </div>
                    <div className="control">
                        <button className="button" onClick={this.deleteAnswer}>
                            <span className="icon is-large">
                                <i className="fas fa-minus" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

 function mapStateToProps(state) {
    return {
        allAnswers: state.allAnswers,
        selectedAnswers: state.selectedAnswers
    };
 }

 function mapDispatchToProps(dispatch) {
     return {
        editAnswer: answer => {
            dispatch(Actions.editAnswer(answer));
        },

         deleteAnswer: answer => {
            dispatch(Actions.removeAnswer(answer));
         }
     };
 }

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPanel);

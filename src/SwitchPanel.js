import React from 'react';
import StateButton from "./StateButton";
import { connect } from "react-redux";
import * as Actions from "./ActionTypes";

class SwitchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.selectAnswer = this.selectAnswer.bind(this);
    }

    selectAnswer(answer, selected) {
       this.props.selectAnswer(answer.key, selected);
    }

    renderAnswers() {
        return this.props.allAnswers.map((answer) => {
            return (
                <div key={answer.key} className="column is-one-quarter">
                    <StateButton label={answer.text} onStateChanged={(selected) => this.selectAnswer(answer, selected)} />
                </div>
            );
        });
    }

    render() {
        return (
            <div className="columns is-multiline">
                {this.renderAnswers()}
            </div>
        );
    }
}

const dispatchActions = (dispatch) => {
    return {
        selectAnswer: (answerId, select) => dispatch(Actions.selectAnswer(answerId, select))
    };
};

function mapStateToProps (state) {
   return {
       allAnswers: state.allAnswers
   };
}

export default connect(mapStateToProps, dispatchActions)(SwitchPanel);

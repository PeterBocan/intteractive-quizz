import React from 'react';
import StateButton from "./StateButton";
import PropTypes from "prop-types";
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
        return this.props.answers.map((answer) => {
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

SwitchPanel.propTypes = {
    answers: PropTypes.array.isRequired
};

const dispatchActions = (dispatch) => {
    return {
        selectAnswer: (answer, select) => dispatch(Actions.selectAnswer(answer, select))
    };
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, dispatchActions)(SwitchPanel);

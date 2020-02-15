import React from 'react';
import PropTypes from 'prop-types';

export default class StateButton extends React.Component
{
    state = {
        selected: false
    };

    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        const sel = !this.state.selected;
       this.setState({ selected: sel });
       if (this.props.onStateChanged) {
           this.props.onStateChanged(sel);
       }
    }

    isSelected() {
        return this.state.selected;
    }

    render()
    {
        return (
          <button onClick={this.changeState} className={(this.isSelected())? "button is-large is-primary answer-button" : "button is-large answer-button"}>
              {this.props.label}
          </button>
        );
    }
}

StateButton.propTypes = {
  label: PropTypes.string.isRequired,
    onStateChanged: PropTypes.func
};


import React from "react";
import { connect } from "react-redux";
import * as Actions from "./ActionTypes";
import PropTypes from "prop-types";

const magic = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

async function sha256digest(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

class GateEditor extends React.Component
{
    state = { unlock: false };

    constructor(props) {
        super(props);
        this.state.unlock = this.props.unlockedSite;
        this.updateMagic = this.updateMagic.bind(this);
        this.setState = this.setState.bind(this);
    }

    updateMagic(event) {
        sha256digest(event.target.value).then(result => {
            if (result === magic) {
                this.props.unlockSite();
                this.setState({ unlock: true });
            }
        });
    }

    render() {
        if (this.state.unlock) {
            this.props.onUnlock();
            return (
                <div>
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <br />
                    <div className="columns">
                        <div className="column"> </div>
                        <div className="column is-two-thirds">
                            <p>Please enter a password</p><br />
                            <div className="field has-addons">
                                <div className="control answer-input">
                                    <input className="input" type="text" onKeyUp={this.updateMagic} />
                                </div>
                            </div>
                        </div>
                        <div className="column"> </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

GateEditor.propTypes = {
    onUnlock: PropTypes.func
};

function mapStateToProps(state) {
    return {
        unlockedSite: state.unlockSite
    };
}

function mapDispatchToProps(dispatch) {
    return {
       unlockSite: () => dispatch(Actions.unlockSite())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GateEditor);
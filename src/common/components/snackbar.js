import React, {Component} from "react";
import Snackbar from "@vertace/rn-snackbar";
import {connect} from "react-redux";
import {setSnackbarText} from "../redux/common_reducer";
import Store from "../redux/store";

const mapStateToProps = state => {
    return {text: state.common?.snackbarText};
};

class ConnectedSnackbar extends Component {
    render() {
        const {text} = this.props;
        return (
            <Snackbar
                onExit={() => {
                    Store.dispatch(setSnackbarText(""));
                }}
                text={text}
            />
        );
    }
}

export default connect(mapStateToProps, null)(ConnectedSnackbar);

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/loginUser";

class Navbar extends Component {
  logoutUser = () => {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  };

  render() {
    return (
      <nav className="ui container">
        <ul className="ui secondary menu" style={{ marginTop: "1rem" }}>
          <li className="active item">
            <NavLink className="ui header brown" to="/" exact>
              Questions
            </NavLink>
          </li>
          <li className="active item">
            <NavLink className="ui header brown" to="/leaderboard">
              Leaderboard
            </NavLink>
          </li>
          <li className="active item">
            <NavLink className="ui header brown" to="/add">
              New Question
            </NavLink>
          </li>
          <div className="right menu">
            <img src={this.props.avatarURL} className="nav-user-avatar" />
            <button className="ui button basic red" onClick={this.logoutUser}>
              Logout
            </button>
          </div>
        </ul>
        <hr />
      </nav>
    );
  }
}

function mapStateToProps({ loginUser, users }) {
  return {
    avatarURL: users[loginUser].avatarURL,
  };
}

export default connect(mapStateToProps)(Navbar);

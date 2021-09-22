import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Leaderboard = (props) => {
  if (!props.loginUser) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            returnPath: "/leaderboard",
          },
        }}
      />
    );
  }

  return (
    <div className="board">
      <h3 className="center">Leaderboard</h3>
      {props.users.map((user) => (
        <div key={user.id} className="board-box">
          <div className="board-content">
            <div className="center">
              <img
                src={user.avatarURL}
                alt="User Image"
                className="user-avatar"
              />
              <h3 className="ui header blue">{user.name}</h3>
            </div>
            <div className="center">
              <h4 className="ui grey header">Asked questions</h4>
              <strong className="ui red header">{user.questions.length}</strong>
            </div>
            <div className="center">
              <h4 className="ui grey header">Answered questions</h4>
              <strong className="ui green header">
                {Object.keys(user.answers).length}
              </strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function mapStateToProps({ users, loginUser }) {
  return {
    users: Object.keys(users)
      .sort(
        (a, b) =>
          users[b].questions.length +
          Object.keys(users[b].answers).length -
          (users[a].questions.length + Object.keys(users[a].answers).length)
      )
      .map((user) => users[user]),
    loginUser,
  };
}

export default connect(mapStateToProps)(Leaderboard);

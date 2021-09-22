import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionCard from "./QuestionCard";

class QuestionList extends Component {
  state = {
    answered: false,
  };

  toggleAnswered = (e, answered) => {
    e.preventDefault();

    this.setState(() => ({
      answered,
    }));
  };

  render() {
    if (!this.props.loginUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              returnPath: "/",
            },
          }}
        />
      );
    }

    return (
      <div className="board">
        <div className="btn-container">
          <button
            className="ui button red"
            onClick={(e) => this.toggleAnswered(e, false)}
          >
            Unanswered
          </button>
          <button
            className="ui button green"
            onClick={(e) => this.toggleAnswered(e, true)}
          >
            Answered
          </button>
        </div>
        {this.state.answered === true ? (
          <h3 style={{ color: "green" }} className="center">
            Answered Questions
          </h3>
        ) : (
          <h3 style={{ color: "red" }} className="center">
            Unanswered Questions
          </h3>
        )}
        <ul>
          {this.state.answered
            ? this.props.answeredQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))
            : this.props.unansweredQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, loginUser }) {
  return {
    answeredQuestions: Object.keys(questions)
      .filter(
        (question) =>
          questions[question].optionOne.votes.indexOf(loginUser) > -1 ||
          questions[question].optionTwo.votes.indexOf(loginUser) > -1
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQuestions: Object.keys(questions)
      .filter(
        (question) =>
          questions[question].optionOne.votes.indexOf(loginUser) === -1 &&
          questions[question].optionTwo.votes.indexOf(loginUser) === -1
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    loginUser,
  };
}

export default connect(mapStateToProps)(QuestionList);

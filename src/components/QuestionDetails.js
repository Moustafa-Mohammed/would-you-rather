import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Progress } from "semantic-ui-react";

import { handleSaveAnswer } from "../actions/shared";

class QuestionDetails extends Component {
  handleVoting = (e, qID, answer) => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(handleSaveAnswer(qID, answer));
  };

  render() {
    const {
      id,
      authorImg,
      question,
      optionOneSelected,
      optionTwoSelected,
      loginUser,
      optionOnePercentage,
      optionTwoPercentage,
    } = this.props;

    if (!loginUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              returnPath: "/questions/" + id,
            },
          }}
        />
      );
    }

    if (!question) {
      return (
        <div className="question-not-found-error">
          <h1 className="center">404 Error</h1>
          <p className="center">
            Oops... It appears the question you are trying to reach doesn't
            exist
          </p>
          <p className="center">
            Use the links above to view the question list or add the question to
            the list
          </p>
        </div>
      );
    }

    return (
      <div className="board">
        <h2 className="center">Would You Rather...?</h2>
        <div className="author-details">
          <img src={authorImg} alt="Author Avatar" className="user-avatar" />
          <h3>{question.author}</h3>
        </div>
        {optionOneSelected !== true && optionTwoSelected !== true && (
          <div className="board-box">
            <div className="board-content">
              <div className="board-box-sm">
                <h3 className="ui header blue">{question.optionOne.text}</h3>
                <button
                  className="ui button inverted blue"
                  onClick={(e) => this.handleVoting(e, id, "optionOne")}
                >
                  Vote
                </button>
              </div>
              <div className="board-box-sm">
                <h3 className="ui header brown">{question.optionTwo.text}</h3>
                <button
                  className="ui button inverted brown"
                  onClick={(e) => this.handleVoting(e, id, "optionTwo")}
                >
                  Vote
                </button>
              </div>
            </div>
          </div>
        )}
        {(optionOneSelected === true || optionTwoSelected === true) && (
          <div>
            <div className="board-content">
              <div className="board-box-sm">
                <p className="ui header blue">{question.optionOne.text}</p>
                <p className="ui header blue">
                  Votes: {question.optionOne.votes.length}
                </p>
                <Progress
                  inverted
                  color="blue"
                  percent={optionOnePercentage}
                  progress
                />
                {optionOneSelected && (
                  <h3 className="ui header green">Your choice</h3>
                )}
              </div>
              <div className="board-box-sm">
                <p className="ui header brown">{question.optionTwo.text}</p>
                <p className="ui header brown">
                  Votes: {question.optionTwo.votes.length}
                </p>
                <Progress
                  inverted
                  color="brown"
                  percent={optionTwoPercentage}
                  progress
                />
                {optionTwoSelected && (
                  <h3 className="ui header green">Your choice</h3>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, loginUser }, props) {
  const { id } = props.match.params;

  return {
    id,
    authorImg: questions[id] ? users[questions[id].author].avatarURL : null,
    question: questions[id] ? questions[id] : null,
    optionOneSelected: questions[id]
      ? questions[id].optionOne.votes.indexOf(loginUser) > -1
      : null,

    optionTwoSelected: questions[id]
      ? questions[id].optionTwo.votes.indexOf(loginUser) > -1
      : null,
    loginUser,
    optionOnePercentage: questions[id]
      ? (
          questions[id].optionOne.votes.length /
          (questions[id].optionOne.votes.length +
            questions[id].optionTwo.votes.length)
        ).toFixed(2) * 100
      : null,

    optionTwoPercentage: questions[id]
      ? (
          questions[id].optionTwo.votes.length /
          (questions[id].optionOne.votes.length +
            questions[id].optionTwo.votes.length)
        ).toFixed(2) * 100
      : null,
  };
}

export default connect(mapStateToProps)(QuestionDetails);

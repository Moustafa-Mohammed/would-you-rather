import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question, id } = this.props;

    return (
      <div className="board-box">
        <h3 className="center">Would you rather </h3>
        <div className="options">
          <div className="ui primary inverted button">
            <p className="center">{question.optionOne.text}</p>
          </div>
          <div>
            <p className="center ui header red">or</p>
          </div>
          <div className="ui secondary inverted button">
            <p className="center">{question.optionTwo.text}</p>
          </div>
        </div>
        <div className="center">
          <Link className="ui button" to={`/questions/${id}`}>
            Showmore
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, loginUser }, { id }) {
  return {
    question: questions[id],
    optionOneSelected: questions[id].optionOne.votes.indexOf(loginUser) > -1,
    optionTwoSelected: questions[id].optionTwo.votes.indexOf(loginUser) > -1,
  };
}

export default connect(mapStateToProps)(Question);

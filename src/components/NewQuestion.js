import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleChangeOfOptionOne = (e) => {
    const optionOne = e.target.value;

    this.setState(() => ({
      optionOne,
    }));
  };

  handleChangeOfOptionTwo = (e) => {
    const optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo,
    }));
  };

  handleSubmitQuestion = (e, optionOne, optionTwo) => {
    e.preventDefault();

    const { dispatch, loginUser } = this.props;

    dispatch(handleAddQuestion(optionOne, optionTwo, loginUser)).then(() =>
      this.setState(() => ({
        optionOne: "",
        optionTwo: "",
        toHome: true,
      }))
    );
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    const status = !optionOne || !optionTwo;

    if (!this.props.loginUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              returnPath: "/add",
            },
          }}
        />
      );
    }

    if (this.state.toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="new-question">
        <h2 className="center">Add a Question</h2>
        <form
          className="form"
          onSubmit={(e) => this.handleSubmitQuestion(e, optionOne, optionTwo)}
        >
          <h3 className="center">Would you rather </h3>
          <div className="ui input">
            <input
              id="optionOne"
              type="text"
              placeholder="Option One"
              value={optionOne}
              onChange={this.handleChangeOfOptionOne}
            />
          </div>
          <p className="center ui red header">or</p>
          <div className="ui input">
            <input
              id="optionTwo"
              type="text"
              placeholder="Option Two"
              value={optionTwo}
              onChange={this.handleChangeOfOptionTwo}
            />
          </div>
          <button
            className="ui button grey btn"
            type="submit"
            disabled={status}
          >
            Ask Question
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ loginUser }) {
  return {
    loginUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions/loginUser";

class Login extends Component {
  state = {
    username: "tylermcginnis",
  };

  // Used for the Controlled Component
  handleChange = (e) => {
    const username = e.target.value;

    this.setState(() => ({
      username,
    }));
  };

  handleLogin = (e) => {
    e.preventDefault();

    const { username } = this.state;
    const { dispatch } = this.props;
    dispatch(loginUser(username));

    // Reset the component State
    this.setState(() => ({
      username: "",
    }));
  };

  render() {
    const { username } = this.state;

    if (this.props.loginUser) {
      return <Redirect to={this.props.location.state.returnPath} />;
    }

    return (
      <div className="login">
        <h1 className="center">would you rather app</h1>
        <h2 className="center">Sign in</h2>
        <form className="form" onSubmit={this.handleLogin}>
          <select
            className="select"
            value={username}
            onChange={this.handleChange}
          >
            <option value="tylermcginnis">Tyler McGinnis</option>
            <option value="sarahedo">Sarah Edo</option>
            <option value="johndoe">John Doe</option>
          </select>
          <button className="ui button primary btn" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

// Map the usernames to the Component props
function mapStateToProps({ users, loginUser }) {
  return {
    usernames: Object.keys(users),
    loginUser,
  };
}

export default connect(mapStateToProps)(Login);

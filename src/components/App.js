import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";

import Nav from "./Navbar";
import Login from "./Login";
import QuestionList from "./QuestionList";
import QuestionDetails from "./QuestionDetails";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          {!this.props.showLogin && <Nav />}
          <LoadingBar />
          <div className="container">
            <div>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={QuestionList} />
              <Route path="/questions/:id" component={QuestionDetails} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/add" component={NewQuestion} />
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ loginUser }) {
  return {
    showLogin: loginUser === null,
  };
}

export default connect(mapStateToProps)(App);

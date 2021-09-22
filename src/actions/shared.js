import { getInitialData } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { receiveUsers, addQuestion, handleSaveAnswerUser } from "./users";
import {
  receiveQuestions,
  handleSaveAnswerQuestion,
  handleAddNewQuestion,
} from "./questions";

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData().then(({ users, questions }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
    dispatch(hideLoading());
  });
};

export const handleSaveAnswer = (qid, answer) => (dispatch) => {
  dispatch(showLoading());

  dispatch(handleSaveAnswerQuestion(qid, answer));
  dispatch(handleSaveAnswerUser(qid, answer)).then(() =>
    dispatch(hideLoading())
  );
};

export const handleAddQuestion =
  (optionOneText, optionTwoText, loginUser) => (dispatch) => {
    dispatch(showLoading());

    return dispatch(handleAddNewQuestion(optionOneText, optionTwoText)).then(
      (question) => {
        dispatch(addQuestion(loginUser, question.question.id));
        dispatch(hideLoading());
      }
    );
  };

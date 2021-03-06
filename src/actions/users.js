import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION_TO_USER";

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const saveAnswer = (loginUser, qid, answer) => {
  return {
    type: SAVE_QUESTION,
    loginUser,
    qid,
    answer,
  };
};

export const addQuestion = (loginUser, qid) => {
  return {
    type: ADD_QUESTION,
    loginUser,
    qid,
  };
};

export const handleSaveAnswerUser = (qid, answer) => (dispatch, getState) => {
  const { loginUser } = getState();

  return saveQuestionAnswer({ authedUser: loginUser, qid, answer }).then(() =>
    dispatch(saveAnswer(loginUser, qid, answer))
  );
};

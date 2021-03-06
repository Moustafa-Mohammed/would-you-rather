import { addNewQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const saveAnswer = (loginUser, qid, answer) => {
  return {
    type: SAVE_QUESTION,
    loginUser,
    qid,
    answer,
  };
};

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const handleSaveAnswerQuestion = (qid, answer) => {
  return (dispatch, getState) => {
    const { loginUser } = getState();

    return saveQuestionAnswer({ authedUser: loginUser, qid, answer }).then(() =>
      dispatch(saveAnswer(loginUser, qid, answer))
    );
  };
};

export const handleAddNewQuestion =
  (optionOneText, optionTwoText) => (dispatch, getState) => {
    const { loginUser } = getState();

    return addNewQuestion({
      optionOneText,
      optionTwoText,
      author: loginUser,
    }).then((question) => dispatch(addQuestion(question)));
  };

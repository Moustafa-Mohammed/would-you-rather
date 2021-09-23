# Would you rather

This is the complete project where you can see questions asked, add question, answer a question and see question votes.

## TL;DR

To get started with the App:

- install all App dependencies with `npm install`
- start the App server with `npm start`

## What You're Getting

```bash

├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   └── index.html # DO NOT MODIFY
└── src
    ├──components
    │   ├── Leaderboard # A component that lists all users along with their asked and answered questions.
    │   │── Login   # A component that contains a log in form of the authed users
    │   │── Navbar   # A nav component that contains the tabs that users can navigate through the app
    │   │── NewQuestion # A component that contains a form enables the user to add a question
    │   │── QuestionCard # A component that contains the UI of the question
    │   │── QuestionDetails # A component that contains the details of the question
    │   └── QuestionList # A component that contains the list of the questions
    ├── index.css # Styles for your app. Feel free to customize this as you desire.
    ├── utils # Helpful files.
    │   ├── _DATA.js # A JavaScript fake database for the provided Udacity backend.
    │   ├── Api.js # an api to handle the operations on the fake database
    │   └── helpers.js # a helper formatdate function
    ├── index.css # Global styles.
    └── index.js # The root js file that contains the Provider component that provides the Redux store
```

import React, { Component } from "react";
import { QuizData } from "./QuizData";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Container, Row, Button, Col} from 'react-bootstrap'

class Quiz extends Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    quizEnd: false,
    score: 1,
    disabled: true
  };

  loadQuiz = () => {
    const { currentQuestion } = this.state;

    this.setState(() => {
      return {
        questions: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answers: QuizData[currentQuestion].answer
      };
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  nextQuestionHandler = () => {
    const { userAnswer, answers, score } = this.state;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });

    if (userAnswer === answers) {
      this.setState({
        score: score + 1
      });
    }
  };

  // updates the components
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answers: QuizData[currentQuestion].answer
          // currentQuestion: this.state.currentQuestion - 1
        };
      });
    }
  }

  // check answer
  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    });
  };

  finishHandler = () => {
    if (this.state.currentQuestion === QuizData.length - 1) {
      this.setState({
        quizEnd: true
      });
    }
  };

  render() {
    const {
      questions,
      options,
      currentQuestion,
      userAnswer,
      quizEnd
    } = this.state;

    if (quizEnd) {
      return (
        <div className="container text-light my-4">
            <h2 className="">
              <b> Finish </b>
            </h2>
            <span className='mb-md-4 mb-4'>
              Final score is <b> {this.state.score} </b>
            </span>
            <p>
              <i>
                <b> The Correct Answer's for the Questions was : </b>{" "}
              </i>
            </p>
            <ul className='mt-4' >
              {QuizData.map((item, index) => (
                <li className="my-3 boarding options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="container text-light mt-4">
          <div className="row">
            <div className="offset-md-4 offset-md-4 col-md-12 col-12">
              <h2>
                <b> {questions} </b>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 my-4 col-12">
              <span>
                <i>
                  {`Questions ${currentQuestion} out of ${QuizData.length - 1}`}
                </i>
              </span>
            </div>
          </div>

          {options.map(option => (
            <p
              key={option.id}
              className={`boarding message options ${
                userAnswer === option ? " selected " : null
              }`}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < QuizData.length - 1 && (
            <button
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
              className="btn btn-color btn-md"
            >
              Next
            </button>
          )}
          {currentQuestion === QuizData.length - 1 && (
            <button
              className="btn btn-color btn-md"
              onClick={this.finishHandler}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;

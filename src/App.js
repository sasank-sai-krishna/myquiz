import React, { useState } from 'react';
import './App.css';

function App() {
  const questions = [
    " Which of the following option leads to the portability and security of Java?",
    "Which of the following is not a Java features?",
    "Number of primitive data types in Java are?",
    "What is not the use of “this” keyword in Java?",
  ];

  const options = [
    ["Bytecode is executed by JVM", "Bytecode is executed by JVM", "Use of exception handling", "Dynamic binding between objects"],
    ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"],
    ["6", "7", "8", "9"],
    ["Polymorphism", "Inheritance", "Encapsulation", "Compilation"],
  ];

  const correctAnswers = [0, 2, 2, 3];

  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showScoreCard, setShowScoreCard] = useState(false);

  function CheckAnswer(index) {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[counter] = index;
    if (index === correctAnswers[counter] && selectedAnswers[counter] !== correctAnswers[counter]) {
      setScore(score + 1);
    } else if (index !== correctAnswers[counter] && selectedAnswers[counter] === correctAnswers[counter]) {
      setScore(score - 1);
    }

    setSelectedAnswers(updatedAnswers);
  }

  function handleNext() {
    if (counter < questions.length - 1) {
      setCounter(counter + 1);
    } else {
      setShowScoreCard(true); 
    }
  }

  function handlePrevious() {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  }

  function resetQuiz() {
    setCounter(0);
    setScore(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowScoreCard(false);
  }

  return (
    <div className="container">
      {showScoreCard ? (
        <div className="score-card">
          <h1>Quiz Completed!</h1>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={resetQuiz}>Retry Quiz</button>
        </div>
      ) : (
        <div className="card">
          <h1>My Quiz Application</h1>
          <h2>
            Question {counter + 1} / {questions.length}
          </h2>
          <h2>{questions[counter]}</h2>
          <div id="option">
            {options[counter].map((option, index) => (
              <li
                key={index}
                onClick={() => CheckAnswer(index)}
                id={`option-${index}`}
                className={`option ${selectedAnswers[counter] === index ? 'selected' : ''}`}
              >
                {option}
              </li>
            ))}
          </div>
          <br />
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={counter === 0}>
              &#x2190; {/* Left Arrow */}
            </button>
            <button onClick={handleNext} disabled={counter === questions.length - 1 && showScoreCard}>
  {counter === questions.length - 1 ? "Submit" : <>&#x2192;</>} {/* Right Arrow */}
</button>
          </div>
          <br />
        </div>
      )}
    </div>
  );
}

export default App;

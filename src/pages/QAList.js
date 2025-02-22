import React from 'react';
import "../styles/QAlistUser.css"

const QAList = ({ questions, updateAnswer, childName }) => {
  return (
    <div className="qa-list">
      <h2>{childName}'s Questions</h2>
      {questions.map((q, index) => (
        <div key={index} className="question-item">
          <h3 className="question-text">{q.question}</h3>
          <div className="options-container">
            {q.options.map((option, idx) => (
              <label key={idx} className="option-label">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={q.answer === option}
                  onChange={() => updateAnswer(q.question, option)}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QAList;
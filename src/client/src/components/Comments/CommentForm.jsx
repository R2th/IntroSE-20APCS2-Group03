import React, { useState } from 'react';
import './style.css';

function CommentForm({ onSubmit, initialValue = '' }) {
  const [message, setMessage] = useState(initialValue);

  function messageChangeHandler(event) {
    setMessage(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(message);
    setMessage('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="comment-form-row">
        <textarea
          value={message}
          onChange={messageChangeHandler}
          className="message-input"
        />
        <button className="btn" type="submit">
          Post
        </button>
      </div>
    </form>
  );
}

export default CommentForm;

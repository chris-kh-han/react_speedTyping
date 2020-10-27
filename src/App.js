import React, { useState, useEffect, useRef } from "react"


function App() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(3)
  const [isGameRunning, setIsGameRunning] = useState(false) 
  const textAreaRef = useRef(null)

  function handleChange(e) {
    const { value } = e.target;
    setText(value)
  }

  function calculateWordCount(text) {
    if (text === '') {
      return 0;
    } 
    const words = text.trim().split(' ') 
    return words.length;
  }

  function startGame() {
    setIsGameRunning(true)
    setText("")
    setWordCount(0)
    setTimeRemaining(3)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
    console.log(textAreaRef);
  }

  useEffect( () => {
      if (isGameRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000);
      return;
    }
    setIsGameRunning(false)
    setWordCount(calculateWordCount(text)) // eslint-disable-next-line 
  }, [timeRemaining, isGameRunning])


  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea 
        ref={textAreaRef}
        onChange={handleChange}
        value={text}
        disabled={!isGameRunning}
      />
      <h4>Time Remaining:{timeRemaining}</h4>
      <button 
        onClick={startGame}
        disabled={isGameRunning}
      > 
      {isGameRunning ? 'Running' : 'Start'}
      </button>
      <h1>Word Count: {wordCount}</h1> 
    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Error: Could not connect to Flask backend'));
      })
  return <h1>Our message is {message}</h1>
}

export default App;

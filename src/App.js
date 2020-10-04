import React, { useState } from 'react';

import CreditCardForm from './components/CreditCardForm'
import Notification from './components/Notification'

import './App.css';

function App() {
  const [ success, setSuccess ] = useState(false)
  const [ error, setError ] = useState(false)

  let loadedComponent = <CreditCardForm setSuccess = { setSuccess } setError = { setError } /> 

  if (success || error) {
    loadedComponent = (
      <Notification 
        isSuccess = { success } 
        message = { error ? error : ''}
        reset = { () => setError(false) } />
    )
  }

  return (
    <div className="App">
      { loadedComponent }
    </div>
  );
}

export default App;

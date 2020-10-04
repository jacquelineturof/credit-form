import React from 'react'

import SuccessAnimation from './SuccessAnimation'

import classes from './Notification.module.css'

const ErrorMessage = ({ message, reset }) => (
    <div className = { classes.ErrorContainer }>
        <p>There were issues with your credit card information.</p>
        <p>{ message }</p>
        <button className = { classes.BackButton }onClick = { reset }>
            Back
        </button>
    </div>
)

const Notification = ({ message, isSuccess, reset }) => (
    <div className = { classes.Container }>
        { 
            isSuccess 
                ? <SuccessAnimation />
                : <ErrorMessage message = { message } reset = { reset } />
        }
    </div>
)

export default Notification
import React, { useState } from 'react'

import classes from './CreditCardForm.module.css'

const acceptedCreditCards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/
}

const CreditCardForm = () => {
    const [ creditCardNumber, setCreditCardNumber ] = useState('')

    /*
        Input change handler. Will validate input and then
        setState
        @param inputName { string } the name of the input field.
        e.g. number, name, month, year, cvv
    */
    const onInputChangeHandler = (e, inputName) => {
        if (inputName === 'number') {
            const validInput = validateInput(e.target.value, inputName)
            setCreditCardNumber(validInput)
        }
    }

    /*
        Validates a string based on regex patterns and if an input (not a select) will
        return an updated valid string
        @param inputName { string } the name of the input field.
        e.g. number, name, month, year, cvv
    */
    const validateInput = (inputValue, inputName) => {
        let value
        
        if (inputName === 'number') {
            console.log('validating input...')
            // remove all non digit characters
            value = inputValue.replace(/\D/g, '')
        }

        return value
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        console.log(checkLuhn(creditCardNumber))
        console.log(checkSupported(creditCardNumber))
    }

    /*
        check luhn algo to validate a credit card number.
    */
    const checkLuhn = value => {
        let sum = 0
        let shouldDouble = false
        // loop through values starting at the rightmost side
        for (let i = value.length - 1; i >= 0; i--) {
            let digit = parseInt(value.charAt(i))
    
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9
            }

            sum += digit
            shouldDouble = !shouldDouble
        }

        return (sum % 10) === 0
    }

    /*
        check user input against the regex for our supported credit card types.
        returns boolean -> true if user input is a valid accepted card type
    */
    const checkSupported = value => {
        let accepted = false

        // loop through the keys (visa, mastercard, amex, etc.)
        Object.keys(acceptedCreditCards).forEach(function(key) {
            let regex = acceptedCreditCards[key]
            if (regex.test(value)) {
                accepted = true
            }
        })
  
        return accepted
    }

    return (
        <form className = { classes.Form } onSubmit = { onSubmitHandler }>
            <div className = { classes.FormGroup }>
                <label className = { classes.FormLabel }>Card Number</label>
                <input 
                    className = { classes.Input } 
                    type = "text" 
                    value = { creditCardNumber } 
                    onChange = { e => onInputChangeHandler(e, "number") }/>
            </div>
        </form>
    )
}

export default CreditCardForm
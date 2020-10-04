import React, { useState, useEffect, useCallback } from 'react'

import { 
    formatInput, 
    validateExpirationDate, 
    validateInput,
    checkSupported,
    checkLuhn,
    getCardType
} from '../util/creditCardValidation'

import CreditCard from './CreditCard'

import classes from './CreditCardForm.module.css'

const CreditCardForm = ({ setSuccess, setError }) => {
    const currentYear = new Date().getFullYear()
    const [ expirationMonths, setExpirationMonths ] = useState([])
    const [ expirationYears, setExpirationYears ] = useState([])

    const [ creditCardNumber, setCreditCardNumber ] = useState('')
    const [ creditCardName, setCreditCardName ] = useState('')
    const [ expirationMonth, setExpirationMonth ] = useState('01')
    const [ expirationYear, setExpirationYear ] = useState(currentYear.toString())
    const [ cvv, setCvv ] = useState('')

    const getExpirationDates = useCallback(() => {
        const months = []
        const years = []
        
        for (let i = 1; i < 13; i++) {
            if (i < 10) {
                months.push('0' + i)
            } else {
                months.push(i)
            }
        }
        
        // Most cards expire in 2 - 3 years, will give users a decade
        // of years for input
        for (let i = currentYear; i < currentYear + 10; i++) {
            years.push(i)
        }

        setExpirationMonths(months)
        setExpirationYears(years)
    }, [ currentYear ])

    useEffect(() => {
        getExpirationDates()
    }, [ getExpirationDates ])

    /*
        Input change handler. Will validate input and then
        setState. Will check if current input is less than creditCardNumber,
        if it is, we are in delete mode, no need to validate
        @param inputName { string } the name of the input field.
        e.g. number, name, month, year, cvv
    */
    const onInputChangeHandler = (e, inputName) => {
        const currentInput = e.target.value
        
        if (inputName === 'number') {
            try {
                // user is deleting input, don't validate or format.
                if (currentInput.length < creditCardNumber.length) {
                    setCreditCardNumber(currentInput)
                    return
                }

                const validInput = validateInput(currentInput, inputName, setCreditCardNumber)
                const formattedInput = formatInput(validInput)
                setCreditCardNumber(formattedInput)
            } catch (e) {
                console.log(e)
            }
        } else if (inputName === 'name') {
            const validInput = validateInput(currentInput, inputName)
            setCreditCardName(validInput)
        } else {
            // CVV
            console.log('cvv changed')
            console.log(currentInput)
            console.log(inputName)
            const validInput = validateInput(currentInput, inputName, null, creditCardNumber)
            setCvv(validInput)
        }
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        console.log(checkLuhn(creditCardNumber))
        console.log(checkSupported(creditCardNumber))
        console.log(validateExpirationDate(expirationMonth, expirationYear))

        if (checkLuhn(creditCardNumber) && checkSupported(creditCardNumber) 
            && validateExpirationDate(expirationMonth, expirationYear)) {
            setSuccess(true)
        } else {
            setError('Bad account information.')
        }
    }

    return (
        <form className = { classes.Form } onSubmit = { onSubmitHandler }>
            <CreditCard 
                type = { getCardType(creditCardNumber) } 
                number = { creditCardNumber }
                name = { creditCardName }
                expirationDate = { expirationMonth + "/" + expirationYear }
                cvv = { cvv }  />
            <div className = { classes.InputsContainer }>
            <div className = { classes.FormGroup }>
                <label className = { classes.FormLabel }>Card Number</label>
                <input 
                    className = { classes.Input } 
                    type = "text" 
                    value = { creditCardNumber } 
                    onChange = { e => onInputChangeHandler(e, "number") }/>
            </div>
            <div className = { classes.FormGroup }>
                <label className = { classes.FormLabel }>Card Holder Name</label>
                <input 
                    className = { classes.Input } 
                    type = "text" 
                    value = { creditCardName } 
                    onChange = { e => onInputChangeHandler(e, "name") }/>
            </div>
            <div className = { classes.FormGroupRow }>
                <div className = { classes.ExpirationDateContainer }>
                    <label className = { classes.FormLabel }>Expiration Date</label>
                    <div className = { classes.ExpirationDate }>
                        <select 
                            className = { classes.Select } 
                            value = { expirationMonth }
                            onChange = { e => setExpirationMonth(e.target.value) }>
                            { expirationMonths.map(month => (
                                <option key = { month } value = { month }>
                                    { month }
                                </option>
                            ))}
                        </select>
                        <select 
                            className = { classes.Select }
                            value = { expirationYear }
                            onChange = { e => setExpirationYear(e.target.value) }>
                            { expirationYears.map(year => (
                                <option key = { year } value = {year }>
                                    { year }
                                </option>
                            ))}
                    </select>
                    </div>
                </div>
                

                <div className = { classes.CVV }>
                <label className = { classes.FormLabel }>CVV</label>
                <input 
                    className = { classes.Input } 
                    type = "text" 
                    value = { cvv } 
                    onChange = { e => onInputChangeHandler(e, "cvv") }/>
                </div>
            </div>
            </div>
            <button className = { classes.Submit }>
                Submit
            </button>
        </form>
    )
}

export default CreditCardForm
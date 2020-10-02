const acceptedCreditCards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/
}

/*
    @param value { string } credit card number
    returns the cardType as a string e.g. visa,
    amex, mastercard, or undefined if it is
    not one of the 3 listed card types
*/
const getCardType = value => {
    if (value.charAt(0) === '3') {
        return 'amex'
    } else if (value.charAt(0) === '4') {
        return 'visa'
    } else if (value.charAt(0) === '5') {
        return 'mastercard'
    } else {
        return undefined
    }
}

/*
    Check if we have reached the max number of digits for
    a cardType.
*/
const checkMaxInput = value => {
    const VISA_MAX_LENGTH = 16
    const AMEX_MAX_LENGTH = 15
    const MASTERCARD_MAX_LENGTH = 16

    const cardType = getCardType(value)

    if (cardType === 'visa') {
        if (value.length > VISA_MAX_LENGTH) {
            value = value.substring(0, VISA_MAX_LENGTH)
        }
    } else if (cardType === 'amex') {
        if (value.length > AMEX_MAX_LENGTH) {
            value = value.substring(0, AMEX_MAX_LENGTH)
        }
    } else {
        if (value.length > MASTERCARD_MAX_LENGTH) {
            value = value.substring(0, MASTERCARD_MAX_LENGTH)
        }
    }

    return value
}

export const formatInput = value => {
    const cardType = getCardType(value)

    if (cardType === 'amex') {
        value = value.toString().replace(/(\d{4})/, '$& ')
        value = value.toString().replace(/(\d{4})\s(\d{6})/, '$& ')

        return value
    } else {
        return value.toString().replace(/\d{4}(?=.)/g, '$& ')
    }
}

/*
    Validates card expiration date. Makes sure it is after today's date.
    returns a boolean
*/
export const validateExpirationDate = (expirationMonth, expirationYear) => {
    let month = parseInt(expirationMonth)
    month-- // date indexing starts at 0, subtract 1.

    const today = new Date()
    const expiration = new Date(expirationYear, month)

    return today < expiration
}



/*
        check user input against the regex for our supported credit card types.
        returns boolean -> true if user input is a valid accepted card type
*/
export const checkSupported = value => {
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

/*
     check luhn algo to validate a credit card number.
*/
export const checkLuhn = value => {
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
    Validates a string based on regex patterns and if an input (not a select) will
    return an updated valid string.
    Also checks for the max length for each
    card type.
    @param inputValue { string } the value of the input field (e.target.value)
    @param inputName { string } the name of the input field.
    e.g. number, name, month, year, cvv
*/
export const validateInput = (
    inputValue, inputName, setCreditCardNumber, creditCardNumber) => {
    let value

    if (inputName === 'number') {
        const cardType = getCardType(inputValue)

        if (!cardType) {
            setCreditCardNumber('')
            throw new Error('Invalid Card Type!')
        }

        // remove all non digit characters
        value = inputValue.replace(/\D/g, '')

        // remove any input that is over the max number of digits for the
        // cardType
        value = checkMaxInput(value)
    } else if (inputName === 'name') {
        value = inputValue.replace(/[^a-zA-Z]/gi, '')
    } else {
        // CVV
        const AMEX_CVV_LENGTH = 4
        const VISA_MASTERCARD_CVV_LENGTH = 3
        const cardType = getCardType(creditCardNumber)
        console.log('cardType: ', cardType)
        // remove all non digit characters
        value = inputValue.replace(/\D/g, '')
        
        if (cardType === 'amex') {
            if (value.length > AMEX_CVV_LENGTH) {
                value = value.substring(0, AMEX_CVV_LENGTH)
            }
        } else {
            value = value.substring(0, VISA_MASTERCARD_CVV_LENGTH)
        }
    }

    return value
}

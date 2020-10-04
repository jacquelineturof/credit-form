import React from 'react'

import classes from './CreditCard.module.css'

const CreditCard = ({ type, number, name, expirationDate, cvv }) => {

    return (
        <div className = { classes.Card }>
            <div className = { classes.CardType }>
                { type }
            </div>
            <div className = { classes.CardInfo }>
                <div className = { classes.CardNumber }>
                    { number }
                </div>
                <p className = { classes.CardName }>
                    { name }
                </p>
                <div className = { classes.CardBottomRow }>
                    <p className = { classes.ExpirationDate }>{ expirationDate }</p>
                    <p className = { classes.CVV }>{ cvv }</p>
                </div>
            </div>
        </div>
    )
}

export default CreditCard
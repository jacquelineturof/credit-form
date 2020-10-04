import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../Assets/7266-success.json'

import classes from './SuccessAnimation.module.css'

const Animation = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }

    return (
        <div className = { classes.Container }>
            <p>Payment Successful</p>
            <Lottie options={defaultOptions}
                height={200}
                width={200}
            />
        </div>
    )
}

export default Animation
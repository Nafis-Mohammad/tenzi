import React from 'react'

const Dice = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div
            className='dice-face'
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className='dice-number'>{props.value}</h2>
        </div>
    )
}

export default Dice
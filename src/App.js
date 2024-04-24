import React from "react"
import './styles.css'
import Dice from "./components/Dice"
import { nanoid } from "nanoid"

function App() {

    const [isWon, setIsWon] = React.useState(false)
  
    const generateNewDice = () => {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

  
    const allNewDice = () => {
        const newDice = []
        for(let i = 0; i < 10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }


    const rollDice = () => {
        if (isWon) {
            setRolls(0)
            setIsWon(false)
            setDice(allNewDice())
        }
        else {
            setRolls(oldRolls => oldRolls + 1)
            setDice(oldDice => oldDice.map(singleDice => {
            return singleDice.isHeld ?
              singleDice :
              generateNewDice()
            }))
        }
    }


    const holdDice = (id) => {
        setDice(oldDice => oldDice.map(singleDice => {
            return singleDice.id === id ? 
              {...singleDice, isHeld: !singleDice.isHeld} :
              singleDice
        }))
    }


    const [dice, setDice] = React.useState(allNewDice())
    const [rolls, setRolls] = React.useState(0)
    

    React.useEffect(() => {
        // check if game is won
        const isAllDiceHeld = dice.every(singleDice => singleDice.isHeld)
        const firstDiceValue = dice[0].value
        const isAllDiceSameValue = dice.every(singleDice => singleDice.value === firstDiceValue)
        if (isAllDiceHeld && isAllDiceSameValue) {
            setIsWon(true)
        }
    }, [dice])

    const diceElements = dice.map(singleDice => (
    <Dice 
      key = {singleDice.id}
      value = {singleDice.value}
      isHeld = {singleDice.isHeld}
      holdDice = {() => holdDice(singleDice.id)}
    />
    ))

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice-button" onClick={rollDice}>
                {isWon ? "New Game" : "Roll"}
            </button>

            <h2 className="rolls">Rolls: {rolls}</h2>

            { isWon && <h2 className="you-won">You Won!</h2>}
            
        </main>
    );
}

export default App;

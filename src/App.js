import { useState } from "react"
import palavras from "./palavras"


export default function App() {

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    


    const [usedLetters, setUsedLetters] = useState([])
    const [word, setWord] = useState([])
    const [wordGuess, setWordGuess] = useState([])
    const [wordInput, setWordInput] = useState([])
    const [hangmanState, setHangmanState] = useState(0)
    const [hangmanImage, setHangmanImage] = useState("assets/forca0.png")
    const [gameState, setGameState] = useState("waiting")


    function comparator() {
        return Math.random() - 0.5
    }

    function chooseWord() {
        palavras.sort(comparator)
        setWord(palavras[0].split(""))
        let underscoreWord = "_".repeat(palavras[0].length)
        console.log(palavras[0])
        setWordGuess(underscoreWord.split(""))
        restartGame()
    }

    function restartGame(){
        setWordInput("")
        setHangmanState(0)
        setHangmanImage(`assets/forca0.png`)
        setGameState("playing")
        setUsedLetters([])
    }

    function guessCharacter(event,index) {
        setUsedLetters([...usedLetters,index])
        let character = event.target.textContent
        if (word.includes(character)) {
            const updatedGuessWord = word.map((c, index) => isEqual(c,character)?c:wordGuess[index])
            setWordGuess(updatedGuessWord)
            checkWin(updatedGuessWord)
        } else {
            let updatedHangmanState = hangmanState + 1
            setHangmanState(updatedHangmanState)
            setHangmanImage(`assets/forca${updatedHangmanState}.png`)
            checkDefeat(updatedHangmanState)
        }

    }

    function isEqual(str1, str2){
        return str1.localeCompare(str2, undefined, {sensitivity:"base"})===0
    }

    function guessWord(updatedGuessWord){
        if(!checkWin(updatedGuessWord)){
            setHangmanState(6)
            setHangmanImage(`assets/forca6.png`)
            checkDefeat(6)
        }
        
    }

    function checkWin(updatedGuessWord) {
        let wordStr = word.join("")
        let guessWordStr = updatedGuessWord.join("")
        if(isEqual(wordStr, guessWordStr)){
            setWordGuess(updatedGuessWord)
            setGameState("won")
            console.log(wordStr)
            return true
        }
        return false
    }

    function checkDefeat(updatedHangmanState) {
        if(updatedHangmanState===6){
            setWordGuess(word)
            setGameState("defeated")
        }

    }

    return (
        <div className="content">
            <div className="container">
                <div className="hangman">
                    <img src={hangmanImage} data-identifier="game-image" />
                </div>
                <div className="word-utilities">
                    <button data-identifier="choose-word" onClick={() => chooseWord()}>Escolher Palavra</button>
                    <div className="word">
                        {wordGuess.map((character) => <span className={gameState}>{character}</span>)}
                    </div>
                </div>
            </div>
            <div className="keyboard">
                {alphabet.map((letter, index) => <button key={index} className="key" data-identifier="letter" disabled={gameState==="playing"?usedLetters.includes(index):true} onClick={event => guessCharacter(event,index)}>{letter}</button>)}
            </div>
            <div className="guess">
                <label htmlFor="guess">Já sei a palavra</label>
                <input type="text" name="guess" data-identifier="type-guess" value={wordInput} disabled={!(gameState==="playing")} onChange={(event)=>setWordInput(event.target.value)}></input>
                <button data-identifier="guess-button" disabled={!(gameState==="playing")} onClick={() => guessWord(wordInput.split(""))}>Chutar</button>
            </div>
        </div>
    )
}
import { useState } from "react"
import palavras from "./palavras"


export default function App() {

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


    const [word, setWord] = useState([])
    const [wordGuess, setWordGuess] = useState([])
    const [hangmanState, setHangmanState] = useState(0)


    function comparator() {
        return Math.random() - 0.5
    }

    function chooseWord() {
        palavras.sort(comparator)
        setWord(palavras[0].split(""))
        let underscoreWord = "_".repeat(palavras[0].length)
        setWordGuess(underscoreWord.split(""))
    }

    function guessCharacter(character) {
        if (word.includes(character)) {
            const updatedGuessWord = word.map((c, index) => c===character?c:wordGuess[index])
            setWordGuess(updatedGuessWord)
        } else {
            setHangmanState(hangmanState + 1)
            checkDefeat()
        }

    }

    function guessWord(){  


    }

    function checkWin() {

    }

    function checkDefeat() {
        if(hangmanState+1===6){
            setWordGuess(word)
        }

    }

    return (
        <div className="content">
            <div className="container">
                <div className="hangman">
                    <img src="assets/forca0.png" data-identifier="game-image" />
                </div>
                <div className="word-utilities">
                    <button data-identifier="choose-word" onClick={() => chooseWord()}>Escolher Palavra</button>
                    <div className="word">
                        {wordGuess.map((character) => <span>{character}</span>)}
                    </div>
                </div>
            </div>
            <div className="keyboard">
                {alphabet.map((letter) => <button className="letter" data-identifier="letter" onClick={(event) => guessCharacter(event.target.textContent)}>{letter}</button>)}
            </div>
            <div className="guess">
                <label htmlFor="guess">Já sei a palavra</label>
                <input type="text" name="guess" data-identifier="type-guess"></input>
                <button data-identifier="guess-button">Chutar</button>
            </div>
        </div>
    )
}
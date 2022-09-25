import { useState } from "react"
import palavras from "./palavras"


export default function App(){

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


    const [word, setWord] = useState([])

    
    function comparator() {
        return Math.random() - 0.5
    }

    function chooseWord(){
        palavras.sort(comparator)
        setWord(palavras[0].split(""))
    }

    return(
        <div className="content">
            <div className="container">
                <div className="hangman">
                    <img src="assets/forca0.png" data-identifier="game-image"/>
                </div>
                <div className="word-utilities">
                    <button data-identifier="choose-word" onClick={() => chooseWord()}>Escolher Palavra</button>
                    <div className="word">
                        {word.map((character) => <span>{character}</span>)}
                    </div>
                </div>
            </div>
            <div className="keyboard">
                {alphabet.map((letter) => <button className="letter" data-identifier="letter">{letter}</button>)}
            </div>
            <div className="guess">
                <label htmlFor="guess">Já sei a palavra</label>
                <input type="text" name="guess" data-identifier="type-guess"></input>
                <button data-identifier="guess-button">Chutar</button>
            </div>
        </div>
    )
}
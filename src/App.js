import palavras from "./palavras"

export default function App(){
    return(
        <>
            <div>
                <div className="hangman">
                    <img src="assets/forca0.png" data-identifier="game-image"/>
                </div>
                <div className="word-utilities">
                    <button data-identifier="choose-word" >Escolher Palavra</button>
                </div>
            </div>
            <div className="keyboard">

            </div>
            <div className="guess">
                <label for="guess">Já sei a palavra</label>
                <input type="text" name="guess" data-identifier="type-guess"></input>
                <button data-identifier="guess-button"></button>
            </div>
        </>
    )
}
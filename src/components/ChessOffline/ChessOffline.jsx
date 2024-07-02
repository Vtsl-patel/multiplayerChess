import React from "react";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Timer from "../Timer/Timer";
import SelectTime from "./SelectTime";

function ChessOffline() {

    const [ game, setGame ] = useState(new Chess())
    const [ turn, setTurn ] = useState(game.turn() === 'b' ? "black" : "white")
    const [ showCard, setShowCard ] = useState(false)
    const [ winner, setWinner ] = useState("")
    const [ message, setMessage ] = useState("")
    const [ over, setOver ] = useState(false)
    const [ whiteTime, setWhiteTime ] = useState(600); 
    const [ blackTime, setBlackTime ] = useState(600); 
    const [ selectedTime, setSelectedTime ] = useState(10);

    function handleTimeSelection(event) {
        const time = parseInt(event.target.value);
        setSelectedTime(time);
        setWhiteTime(time * 60); 
        setBlackTime(time * 60); 
    }

    useEffect(() => {
        let timer;
        if (!over) {
            timer = setInterval(() => {
                setGame((prevGame) => {
                    const newGame = new Chess();
                    newGame.load(prevGame.fen());

                    if (turn === "white") {
                        setWhiteTime((prevTime) => {
                            if (prevTime - 1 === 0) {
                                setWinner("BLACK WINS!");
                                setMessage("Black wins on time");
                                setOver(true);
                                setShowCard(true);
                            }
                            return Math.max(prevTime - 1, 0);
                        });
                    } else {
                        setBlackTime((prevTime) => {
                            if (prevTime - 1 === 0) {
                                setWinner("WHITE WINS!");
                                setMessage("White wins on time");
                                setOver(true);
                                setShowCard(true);
                            }
                            return Math.max(prevTime - 1, 0);
                        });
                    }

                    return newGame;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [turn, over]);

    function onDrop(sourceSquare, targetSquare, piece) {

        if(game.isGameOver()){
            if(game.isCheckmate()){
                setWinner(`${turn === "white" ? "BLACK WINS!" : "WHITE WINS!"}`)
            } else if(game.isDraw()){
                setWinner(`DRAW`)
                if (game.isStalemate()) {
                    setMessage(`Draw by Stalemate`)
                } else if(game.isThreefoldRepetition()){
                    setMessage(`Draw by Threefold Repetition`)
                } else if(game.isInsufficientMaterial()){
                    setMessage(`Draw by Insufficient Material`)
                }
            }
            setOver(true)
            setShowCard(true)
            return false
        }

        const gameCopy = new Chess()
        gameCopy.load(game.fen())
        const move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q",
        });
        setGame(gameCopy);
    
        if (move === null) return false;

        setTurn(turn === "white" ? "black" : "white")

        return true;
    }

    return (
        <div className="flex flex-col items-center mt-22">
            <div className="relative w-[65vmin] h-[65vmin] flex items-center justify-center">

                <div className="absolute -top-12 left-0 mb-2">
                    <Timer time={turn === "white" ? blackTime : whiteTime} />
                </div>

                <Chessboard
                    id="BasicBoard"
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation={turn}
                    arePremovesAllowed={true}
                    arePiecesDraggable={!over}
                />

                <div className="absolute -bottom-12 right-0 mt-2">
                    <Timer time={turn === "black" ? blackTime : whiteTime} />
                </div>

                {showCard && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 shadow-lg w-80 rounded-lg p-4 z-10 text-center">
                        <h2 className="text-xl font-bold">{`${winner}`}</h2>
                        <p className="text-lg">{`${message}`}</p>
                    </div>
                )}
            </div>
            
            <div className="flex space-x-10 space-y-14">

                <div className="flex flex-col items-center mt-4">
                    <label htmlFor="select-time" className="block text-lg font-medium text-center mb-2">
                        Select Time (minutes)
                    </label>
                    <SelectTime
                        id="select-time"
                        options={[5, 10, 20, 30, 45]}
                        value={selectedTime}
                        onChange={handleTimeSelection}
                        className="w-32"
                    />
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 self-center">
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default ChessOffline;

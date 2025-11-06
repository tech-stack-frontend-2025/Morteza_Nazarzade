import { use, useState, useEffect } from "react";

("use client");

import { useRef } from "react";
import { Confetti } from "./components/confetti";

export function ConfettiDemo() {
  const confettiRef = useRef(null);

  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        Confetti
      </span>

      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`bg-white border border-gray-400 float-left text-[24px] font-bold leading-[34px] 
h-[34px] w-[34px] p-0 text-center -mr-[1px] -mt-[1px] ${
        value?.className || ""
      }`}
      onClick={onSquareClick}
    >
      {value?.value || ""}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next Player : " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = { value: "X", className: "square text-blue-500" };
    } else {
      nextSquares[i] = { value: "O", className: "square text-red-500" };
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="text-center mb-8">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const confettiRef = useRef(null);
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  useEffect(() => {
    if (winner) {
      confettiRef.current?.fire?.({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [winner]);

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li
        className="px-5 bg-gray-500 text-white border-2 border-black rounded-xl text-center"
        key={move}
      >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex mt-5">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="ml-20">
        <ol className="flex flex-col gap-2">{moves}</ol>
      </div>
      <Confetti
        ref={confettiRef}
        manualstart
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

function getSquareValue(sq) {
  if (!sq) return null;
  if (typeof sq === "string") return sq;
  return sq.value ?? null;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const va = getSquareValue(squares[a]);
    const vb = getSquareValue(squares[b]);
    const vc = getSquareValue(squares[c]);

    if (va && va === vb && va === vc) {
      return va;
    }
  }
  return null;
}

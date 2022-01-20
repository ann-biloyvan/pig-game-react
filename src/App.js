import { useState, useEffect } from 'react';
import Rules from './components/Rules';
import Confetti from 'react-confetti';

function App() {
  const initialState = {
    player1: { activePlayer: true, currentScore: 0, totalScore: 0 },
    player2: { activePlayer: false, currentScore: 0, totalScore: 0 },
  };

  const [player1, setPlayer1] = useState(initialState.player1);
  const [player2, setPlayer2] = useState(initialState.player2);
  const [diceImg, setDiceImg] = useState(0);
  const [diceValue, setDiceValue] = useState(0);

  function rollDiceHandler() {
    setDiceImg(Math.trunc(Math.random() * 6) + 1);
  }

  useEffect(() => {
    setDiceValue((cur) => cur + diceImg);

    if (diceImg === 1) {
      setDiceValue(0);
      if (player1.activePlayer) {
        setPlayer1((cur) => ({ ...cur, activePlayer: false }));
        setPlayer2((cur) => ({ ...cur, activePlayer: true }));
      } else {
        setPlayer2((cur) => ({ ...cur, activePlayer: false }));
        setPlayer1((cur) => ({ ...cur, activePlayer: true }));
      }
    }
  }, [diceImg]);

  function holdHandler() {
    if (player1.activePlayer) {
      setPlayer1((cur) => ({
        activePlayer: false,
        currentScore: 0,
        totalScore: cur.totalScore ? cur.totalScore + diceValue : diceValue,
      }));
      setDiceValue(0);
      setPlayer2((cur) => ({ ...cur, activePlayer: true }));
    } else {
      setPlayer2((cur) => ({
        activePlayer: false,
        currentScore: 0,
        totalScore: cur.totalScore ? cur.totalScore + diceValue : diceValue,
      }));
      setDiceValue(0);
      setPlayer1((cur) => ({ ...cur, activePlayer: true }));
    }
  }

  function newGameHandler() {
    setDiceValue(0);
    setPlayer1(initialState.player1);
    setPlayer2(initialState.player2);
  }

  return (
    <>
      <Rules />
      <div className="flex">
        <section
          className={`player ${player1.activePlayer && 'active'} ${
            player1.totalScore >= 20 && 'winner'
          }`}
        >
          {player1.totalScore >= 20 && (
            <Confetti
              width="600px"
              height="600px"
              style={{
                width: 'inherit',
                height: 'inherit',
              }}
            />
          )}
          <h2 className="name">
            Player 1 <br />
            {player1.totalScore >= 20 && 'wins!'}
          </h2>
          <p className="score">{player1.totalScore}</p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score">
              {player1.activePlayer ? diceValue : 0}
            </p>
          </div>
        </section>
        <section
          className={`player ${player2.activePlayer && 'active'} ${
            player2.totalScore >= 20 && 'winner'
          }`}
        >
          {player2.totalScore >= 20 && (
            <Confetti
              width="600px"
              height="600px"
              style={{
                width: 'inherit',
                height: 'inherit',
              }}
            />
          )}
          <h2 className="name">
            Player 2 <br />
            {player2.totalScore >= 20 && 'wins!'}
          </h2>
          <p className="score">{player2.totalScore}</p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score">
              {player2.activePlayer ? diceValue : 0}
            </p>
          </div>
        </section>
        {
          <img
            src={`./images/dice-${diceImg || 1}.png`}
            alt="Playing dice"
            className="dice"
          />
        }
        <button className="btn btn--new" onClick={newGameHandler}>
          🔄 New game
        </button>

        <button className="btn btn--roll" onClick={rollDiceHandler}>
          🎲 Roll dice
        </button>
        <button className="btn btn--hold" onClick={holdHandler}>
          📥 Hold
        </button>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import Card from "./Card/Card";
import { Category } from "./constants";

import { useState } from "react";

const rollDice = () => {
  const array = new Uint8Array(1);
  window.crypto.getRandomValues(array);
  const randomNumber = (array[0] % 6) + 1;
  return randomNumber;
};

interface Team {
  name: string;
  position: number;
}

interface GameState {
  teams: Team[];
  currentTeam: number;
  currentRound: number;
}

function App() {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>({
    teams: [
      {
        name: "Team 1",
        position: 0,
      },
      {
        name: "Team 2",
        position: 0,
      },
    ],
    currentTeam: 0,
    currentRound: 0,
  });
  const categories = [
    Category.personPlaceAnimal,
    Category.object,
    Category.action,
    Category.difficult,
    Category.allPlay,
  ];

  const winnerTeam = gameState?.teams.find((i) => i.position >= 55);
  if (winnerTeam) {
    console.log(`Winner is ${winnerTeam.name}`);
  }

  const handleOK = () => {
    const random = rollDice();
    setRandomNumber(random);
    setGameState({
      ...gameState,
      teams: gameState.teams.map((team, index) => {
        if (index === gameState.currentTeam) {
          return {
            ...team,
            position: team.position + random,
          };
        }
        return team;
      }),
    });
  };

  const handleKO = () => {
    setGameState({
      ...gameState,
      currentTeam: (gameState.currentTeam + 1) % gameState.teams.length,
    });
  };

  const getCategory = () => {
    return categories[gameState.teams[gameState.currentTeam].position % 5];
  };

  return (
    <>
      <div>Dice roll: {randomNumber}</div>
      <div>
        Currently playing: {gameState.teams[gameState.currentTeam].name}
      </div>
      {gameState.teams.map((team) => (
        <div key={team.name}>
          {team.name}: {team.position}
        </div>
      ))}
      <div className="round">
        <button className="ok" onClick={handleOK}>
          OK
        </button>
        <Card category={getCategory()} />
        <button className="ko" onClick={handleKO}>
          KO
        </button>
      </div>
    </>
  );
}

export default App;

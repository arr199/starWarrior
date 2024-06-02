import React, { useState } from "react";
import { useOnPlayerMove } from "./hooks/useOnPlayerMove";
import { Header } from "./components/header";
import { useOnPlayerShoot } from "./hooks/useOnPlayerShoot";

function App() {
  const player = React.useRef<HTMLDivElement>(null);
  const gameContainer = React.useRef<HTMLDivElement>(null);
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    bottom: 0,
    left: 0,
  });

  useOnPlayerMove(setPlayerPosition, player, gameContainer);
  useOnPlayerShoot(player, gameContainer, playerPosition);

  return (
    <div className="min-h-[100vh] flex flex-col items-center">
      <Header></Header>
      <main className="flex flex-col w-full h-full items-center">
        {/* GAME CONTAINER */}
        <section ref={gameContainer} className="relative mt-4 border-2 border-white w-[500px] aspect-[3/4]  bg-black">
          {/* PLAYER */}
          <div
            ref={player}
            style={{ bottom: playerPosition.bottom, left: playerPosition.left }}
            className="absolute w-8 h-8 bg-red-500 bottom-0 left-0"
          ></div>
        </section>
      </main>
    </div>
  );
}

export default App;

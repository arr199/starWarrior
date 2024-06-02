import React, { useEffect } from "react";
import { createProjectile } from "../logic/createProjectile";

export function useOnPlayerShoot(
  player: React.RefObject<HTMLDivElement>,
  gameContainer: React.RefObject<HTMLDivElement>,
  playerPosition: { bottom: number; left: number }
) {
  useEffect(() => {
    const pressedKeys = new Set<string>();
    let animation: number;

    function handleKeyDown(e: KeyboardEvent) {
      pressedKeys.add(e.key);
    }

    function handleKeyUp(e: KeyboardEvent) {
      pressedKeys.delete(e.key);
    }

    function updateShot() {
      if (pressedKeys.has(" ")) {
        createProjectile(player, gameContainer, playerPosition);
        console.log("SHOOTING");
      }
      animation = requestAnimationFrame(updateShot);
    }

    animation = requestAnimationFrame(updateShot);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animation);
    };
  }, [player, gameContainer, playerPosition]);
}

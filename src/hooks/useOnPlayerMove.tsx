import { useEffect } from "react";
import { CONSTANTS } from "../config/gameConstants";

export function useOnPlayerMove(
  positionHandler: React.Dispatch<React.SetStateAction<PlayerPosition>>,
  playerRef: React.RefObject<HTMLDivElement>,
  gameContainerRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const pressedKeys = new Set<string>();
    let animationFrameId: number;

    function handleKeyDown(e: KeyboardEvent) {
      pressedKeys.add(e.key);
    }

    function handleKeyUp(e: KeyboardEvent) {
      pressedKeys.delete(e.key);
    }

    function updatePosition() {
      if (!playerRef.current || !gameContainerRef.current) return;

      const playerRect = playerRef.current.getBoundingClientRect();
      const gameContainerRect = gameContainerRef.current.getBoundingClientRect();

      positionHandler((prev) => {
        const newPosition = pressedKeys.has("ArrowLeft")
          ? prev.left - CONSTANTS.playerMovementSpeed
          : pressedKeys.has("ArrowRight")
          ? prev.left + CONSTANTS.playerMovementSpeed
          : prev.left;

        if (newPosition < 0 || newPosition + playerRect.width > gameContainerRect.width) {
          return prev;
        }
        return { ...prev, left: newPosition };
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    }

    animationFrameId = requestAnimationFrame(updatePosition);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [positionHandler, playerRef, gameContainerRef]);
}

import { useEffect } from "react";

// GET PLAYER CURRENT POSITION
// MAKE AN ELEMENT APPEAR ON TOP OF THE PLAYER
// MAKE THIS ELEMENT MOVE AND BE DESTROY IN A FEW SECONDS

export function useOnPlayerShoot() {
  useEffect(() => {
    const pressedKeys = new Set<string>();
    let animation: number;

    function handleKeyDown(e: KeyboardEvent) {
      pressedKeys.add(e.key);
      console.log("KEYS", pressedKeys);
    }

    function handleKeyUp(e: KeyboardEvent) {
      pressedKeys.delete(e.key);
    }
    function updateShot() {
      if (pressedKeys.has(" ")) {
        console.log("SHOOTING");
      }
      animation = requestAnimationFrame(updateShot);
    }

    animation = requestAnimationFrame(updateShot);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyUp);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animation);
    };
  }, []);
}

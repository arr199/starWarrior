import { useEffect } from "react";

// GET PLAYER CURRENT POSITION
// MAKE AN ELEMENT APPEAR ON TOP OF THE PLAYER
// MAKE THIS ELEMENT MOVE AND BE DESTROY IN A FEW SECONDS

export function useOnPlayerShoot() {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (event.key === " ") {
        console.log("SHOOTING");
      }
    }
    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);
}

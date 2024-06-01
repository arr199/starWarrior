import { useEffect } from "react";

export function useOnPlayerMove(
    positionHandler: React.Dispatch<React.SetStateAction<PlayerPosition>>,
    playerRef: React.RefObject<HTMLDivElement>,
    gameContainerRef: React.RefObject<HTMLDivElement>
  ) {
    useEffect(() => {
      function handler(event: KeyboardEvent) {
        const playerRect = playerRef.current!.getBoundingClientRect();
        const gameContainerRect = gameContainerRef.current!.getBoundingClientRect();
  
        positionHandler((prev) => {
          
          const newPosition = event.key === "ArrowLeft" ? prev.left - 10 : event.key === "ArrowRight" ? prev.left + 10 : prev.left
          
          if (newPosition < 0 || newPosition + playerRect.width > gameContainerRect.width ){
            return prev
          }
          return  {...prev , left : newPosition}
         
        }) 
      }
  
      window.addEventListener("keydown", handler);
  
      return () => window.removeEventListener("keydown", handler);
    }, []);
  }
export function createProjectile(
  playerRef: React.RefObject<HTMLDivElement>,
  gameContainerRef: React.RefObject<HTMLDivElement>,
  playerPosition: { bottom: number; left: number }
) {
  // create an element next to player ref
  if (!playerRef.current || !gameContainerRef.current) return;

  const playerRect = playerRef.current.getBoundingClientRect();
  const projectile = document.createElement("div");
  projectile.style.position = "absolute";
  projectile.style.left = playerPosition.left + "px";
  projectile.style.bottom = playerPosition.bottom + playerRect.height + "px";
  projectile.style.width = "10px";
  projectile.style.height = "10px";
  projectile.style.backgroundColor = "red";

  gameContainerRef.current.appendChild(projectile);

  function moveProjectile(): void {
    projectile.style.bottom = parseInt(projectile.style.bottom) + 1 + "px";
    requestAnimationFrame(moveProjectile);
  }

  requestAnimationFrame(moveProjectile);

  //  add logic to remove the projectile after some time or condition
  setTimeout(() => {
    if (projectile.parentNode === gameContainerRef.current) {
      gameContainerRef?.current?.removeChild(projectile);
    }
  }, 2000); //  remove projectile after 1 second
}

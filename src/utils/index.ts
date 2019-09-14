export const swithNewDirection = (code: String, value: String): String => {
  let direction = value;
  switch (code) {
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowDown":
      direction = "down";
      break;
  }

  return direction;
};

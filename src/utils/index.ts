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

interface updateSnakeHistoryType {
  x: number;
  y: number;
  direction: string;
  historyIntoArray: Array<any>;
  index: number;
}

export const updateSnakeHistory = ({
  x,
  y,
  direction,
  historyIntoArray,
  index
}: updateSnakeHistoryType) => {
  if (index === 0) {
    const moveHorizontal = ["left", "right"].includes(direction);
    const newXValue = direction === "left" ? x - 10 : x + 10;
    const newYValue = direction === "up" ? y - 10 : y + 10;
    return {
      x: moveHorizontal ? newXValue : x,
      y: !moveHorizontal ? newYValue : y
    };
  }

  const [, array] = historyIntoArray[index - 1];
  const [previusX, previusY] = array;
  return {
    x: previusX,
    y: previusY
  };
};

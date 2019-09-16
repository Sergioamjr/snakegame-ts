export const swithNewDirection = (code: String, value: String): String => {
  let direction = value;
  switch (code) {
    case "ArrowLeft":
      direction = value === "right" ? value : "left";
      break;
    case "ArrowUp":
      direction = value === "down" ? value : "up";
      break;
    case "ArrowRight":
      direction = value === "left" ? value : "right";
      break;
    case "ArrowDown":
      direction = value === "up" ? value : "down";
      break;
  }

  return direction;
};

interface updateSnakeHistoryType {
  x: number;
  y: number;
  direction: string;
  history: Array<any>;
  index: number;
}

export const updateSnakeHistory = ({
  x,
  y,
  direction,
  history,
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

  // const [array] = history[index - 1];
  const [previusX, previusY] = history[index - 1];
  return {
    x: previusX,
    y: previusY
  };
};

export const generateRandomPoint = (): Array<Number> => {
  const maxX = 290,
    minX = 0,
    maxY = 270,
    minY = 0;

  const X = Math.round((Math.random() * (maxX - minX) + minX) / 10) * 10;
  const Y = Math.round((Math.random() * (maxY - minY) + minY) / 10) * 10;
  return [X, Y];
};

import { generateRandomPoint } from ".";

export const stateDefault = {
  direction: "right",
  time: 100,
  history: {
    position_1: [300 / 2, 280 / 2],
    position_2: [300 / 2 - 10, 280 / 2]
  },
  target: generateRandomPoint(),
  gameover: false
};

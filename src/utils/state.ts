import { generateRandomPoint } from ".";

export const stateDefault = {
  isChanging: false,
  direction: "right",
  time: 100,
  history: [[300 / 2, 280 / 2], [300 / 2 - 10, 280 / 2]],
  target: generateRandomPoint(),
  gameover: false,
  paused: false,
  adjustToMobile: window.innerWidth < 540
};

export interface State {
  isChanging: boolean;
  direction: String;
  time: Number;
  history: Array<Array<Number>>;
  target: Array<Number>;
  gameover: boolean;
  paused: boolean;
  adjustToMobile: boolean;
}

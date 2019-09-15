export interface State {
  direction: String;
  time: Number;
  history: {
    [k: string]: Array<Number>;
  };
  target: Array<Number>;
  gameover: boolean;
  paused: boolean;
}

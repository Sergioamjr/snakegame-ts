import * as React from "react";

type Props = {
  paused?: boolean;
  gameOver?: boolean;
  pauseGameHandler: () => void;
  resetGameHandler: () => void;
  updateDirectionHandler: (event: KeyboardEvent | string) => void;
};

const GameArea: React.FC<Props> = props => {
  return (
    <div className="game-area">
      <div className="joystick">
        <form className="reverse">
          <button
            disabled={props.gameOver || props.paused}
            onClick={e => {
              e.preventDefault();
              props.updateDirectionHandler("ArrowUp");
            }}
            className="unreverse joystick-btn"
          >
            1
          </button>
          <button
            disabled={props.gameOver || props.paused}
            onClick={e => {
              e.preventDefault();
              props.updateDirectionHandler("ArrowRight");
            }}
            className="unreverse joystick-btn"
          >
            1
          </button>
          <button
            disabled={props.gameOver || props.paused}
            onClick={e => {
              e.preventDefault();
              props.updateDirectionHandler("ArrowLeft");
            }}
            className="unreverse joystick-btn"
          >
            1
          </button>
          <button
            disabled={props.gameOver || props.paused}
            onClick={e => {
              e.preventDefault();
              props.updateDirectionHandler("ArrowDown");
            }}
            className="unreverse joystick-btn"
          >
            1
          </button>
        </form>
      </div>
      <div className="screen">{props.children}</div>
      <div className="joystick joystick-right">
        <form className="reverse">
          <button
            onClick={e => {
              e.preventDefault();
              props.pauseGameHandler();
            }}
            disabled={props.gameOver}
            className="unreverse joystick-btn joystick-pause"
          >
            1
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              props.resetGameHandler();
            }}
            disabled={!props.gameOver}
            className="unreverse joystick-btn joystick-reset"
          >
            1
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameArea;

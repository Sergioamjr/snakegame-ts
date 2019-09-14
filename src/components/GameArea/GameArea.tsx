import * as React from "react";

type Props = {};

const GameArea: React.FC<Props> = props => {
  return (
    <div className="game-area">
      <div className="joystick">
        <form className="reverse">
          <button className="unreverse joystick-btn">1</button>
          <button className="unreverse joystick-btn">1</button>
          <button className="unreverse joystick-btn">1</button>
          <button className="unreverse joystick-btn">1</button>
        </form>
      </div>
      <div className="screen">{props.children}</div>
      <div className="joystick joystick-right">
        <form className="reverse">
          <button className="unreverse joystick-btn">1</button>
          <button className="unreverse joystick-btn">1</button>
          <div className="unreverse joystick-btn" />
        </form>
      </div>
    </div>
  );
};

export default GameArea;

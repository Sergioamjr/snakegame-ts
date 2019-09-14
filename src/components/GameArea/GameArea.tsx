import * as React from "react";
import "./GameArea.scss";

const GameArea: React.FC = props => {
  return <div className="game-area">{props.children}</div>;
};

export default GameArea;

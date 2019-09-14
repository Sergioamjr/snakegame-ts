import * as React from "react";
import "./GameArea.scss";

type Props = {};

const GameArea: React.FC<Props> = props => {
  return <div className="game-area">{props.children}</div>;
};

export default GameArea;

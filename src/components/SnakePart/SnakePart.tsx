import React from "react";

interface Props {
  values: Array<Number>;
  isPoint?: boolean;
}

const SnakePart: React.FC<Props> = props => {
  const { values, isPoint } = props;
  const [x, y] = values;
  return (
    <div
      className={`snake ${isPoint ? "snake-point" : ""}`}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
    ></div>
  );
};

export default SnakePart;

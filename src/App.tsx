import React from "react";
import GameArea from "./components/GameArea";
import _get from "lodash/get";
import { swithNewDirection } from "./utils";

const stateDefault = {
  direction: "right",
  time: 500,
  snake: {
    x: 400 / 2,
    y: 200 / 2
  }
};

interface State {
  direction: String;
  time: Number;
  snake: {
    x: number;
    y: number;
  };
}

class App extends React.Component<{}, State> {
  state = {
    ...stateDefault
  };

  componentDidMount = () => {
    setInterval(this.moveSnakeFoward, this.state.time);
    document.addEventListener("keydown", this.updateDirectionHandler);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.updateDirectionHandler);
  };

  componentDidUpdate = (_prevProps: {}, prevState: State) => {
    if (prevState.snake !== this.state.snake) {
      this.gameHasBeenOvered();
    }
  };

  gameHasBeenOvered = () => {
    const {
      snake: { x, y }
    } = this.state;
    if (x < 0 || x >= 400 || y < 0 || y >= 200) {
      console.log("Game Over");
    }
  };

  updateDirectionHandler = (event: KeyboardEvent) => {
    const code = _get(event, "code", "");
    let direction = swithNewDirection(code, this.state.direction);

    this.setState({
      direction
    });
  };

  moveSnakeFoward = () => {
    const {
      direction,
      snake: { x, y }
    } = this.state;
    const moveHorizontal = ["left", "right"].includes(direction);
    const newXValue = direction === "left" ? x - 10 : x + 10;
    const newYValue = direction === "up" ? y - 10 : y + 10;
    this.setState({
      snake: {
        ...this.state.snake,
        x: moveHorizontal ? newXValue : x,
        y: !moveHorizontal ? newYValue : y
      }
    });
  };

  render() {
    const {
      snake: { x, y }
    } = this.state;

    return (
      <GameArea>
        <div
          className="snake"
          style={{
            transform: `translate(${x}px, ${y}px)`
          }}
        ></div>
      </GameArea>
    );
  }
}

export default App;

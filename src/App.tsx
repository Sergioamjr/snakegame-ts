import React from "react";
import GameArea from "./components/GameArea";
import _get from "lodash/get";
import { swithNewDirection, updateSnakeHistory } from "./utils";

const stateDefault = {
  direction: "right",
  time: 500,
  history: {
    position_1: [400 / 2, 200 / 2]
  },
  point: [30, 20]
};

interface State {
  direction: String;
  time: Number;
  history: {
    [k: string]: Array<Number>;
  };
  point: Array<Number>;
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

  // componentDidUpdate = (_prevProps: {}, prevState: State) => {
  //   if (prevState.history !== this.state.history) {
  //     this.gameHasBeenOvered();
  //   }
  // };

  // gameHasBeenOvered = () => {
  //   const {
  //     snake: { x, y }
  //   } = this.state;
  //   if (x < 0 || x >= 400 || y < 0 || y >= 200) {
  //     console.log("Game Over");
  //   }
  // };

  updateDirectionHandler = (event: KeyboardEvent) => {
    const code = _get(event, "code", "");
    let direction = swithNewDirection(code, this.state.direction);

    this.setState({
      direction
    });
  };

  moveSnakeFoward = () => {
    const { history, direction } = this.state;
    const historyIntoArray = Object.entries(history);
    let newHistory = historyIntoArray.reduce((item, [name, values], index) => {
      const [x, y] = values;
      const { x: newX, y: newY } = updateSnakeHistory({
        x,
        y,
        direction,
        historyIntoArray,
        index
      });
      return {
        ...item,
        [name]: [newX, newY]
      };
    }, {});

    this.setState({
      history: newHistory
    });
  };

  render() {
    const { history, point } = this.state;
    const [pointX, pointY] = point;
    return (
      <GameArea>
        {pointX && pointY && (
          <div
            className="snake snake-point"
            style={{
              transform: `translate(${pointX}px, ${pointY}px)`
            }}
          ></div>
        )}
        {Object.entries(history).map(([name, values]) => {
          const [x, y] = values;
          return (
            <div
              key={name}
              className="snake"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            ></div>
          );
        })}
      </GameArea>
    );
  }
}

export default App;

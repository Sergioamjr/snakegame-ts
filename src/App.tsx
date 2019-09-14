import React from "react";
import GameArea from "./components/GameArea";
import {
  swithNewDirection,
  updateSnakeHistory,
  generateRandomPoint
} from "./utils";
import SnakePart from "./components/SnakePart";

const stateDefault = {
  direction: "right",
  time: 100,
  history: {
    position_1: [300 / 2, 280 / 2],
    position_2: [300 / 2 - 10, 280 / 2]
  },
  target: generateRandomPoint()
};

interface State {
  direction: String;
  time: Number;
  history: {
    [k: string]: Array<Number>;
  };
  target: Array<Number>;
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
    if (prevState.history !== this.state.history) {
      this.addNewPoint();
    }
  };

  addNewPoint = () => {
    const historyLength = Object.values(this.state.history).length;
    const [x, y] = Object.values(this.state.history)[0];
    const [lastX, lastY] = Object.values(this.state.history)[historyLength - 1];
    const [pointX, pointY] = this.state.target;
    if (x === pointX && y === pointY) {
      const history = {
        ...this.state.history,
        [`position_${historyLength + 1}`]: [lastX, lastY]
      };

      this.setState({
        target: generateRandomPoint(),
        history
      });
    }
  };

  updateDirectionHandler = (event: KeyboardEvent) => {
    let direction = swithNewDirection(event.code, this.state.direction);
    this.setState({
      direction
    });
  };

  moveSnakeFoward = () => {
    const { history, direction } = this.state;
    const newHistory = Object.entries(history).reduce(
      (item, [name, values], index) => {
        const [x, y] = values;
        const { x: newX, y: newY } = updateSnakeHistory({
          x,
          y,
          direction,
          history: Object.entries(history),
          index
        });
        return {
          ...item,
          [name]: [newX, newY]
        };
      },
      {}
    );

    this.setState({
      history: newHistory
    });
  };

  render() {
    const { history, target } = this.state;
    return (
      <React.Fragment>
        <GameArea>
          <SnakePart values={target} isPoint />
          {Object.entries(history).map(([name, values]) => {
            return <SnakePart key={name} values={values} />;
          })}
        </GameArea>
      </React.Fragment>
    );
  }
}

export default App;

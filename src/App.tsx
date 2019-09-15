import React from "react";
import GameArea from "./components/GameArea";
import {
  swithNewDirection,
  updateSnakeHistory,
  generateRandomPoint
} from "./utils";
import SnakePart from "./components/SnakePart";
import { stateDefault } from "./utils/state";
import { State } from "./utils/types";

class App extends React.Component<{}, State> {
  state = {
    ...stateDefault,
    paused: true
  };

  componentDidMount = () => {
    setInterval(this.moveSnakeFoward, this.state.time);
    document.addEventListener("keydown", this.updateDirectionHandler);
    window.addEventListener("resize", this.updateDeviceOrientationHanler);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.updateDirectionHandler);
    window.removeEventListener("resize", this.updateDeviceOrientationHanler);
  };

  componentDidUpdate = (_prevProps: {}, prevState: State) => {
    if (prevState.history !== this.state.history) {
      this.gameHasEnded();
      this.addNewPoint();
    }
  };

  updateDeviceOrientationHanler = () => {
    this.setState({
      adjustToMobile: window.innerWidth < 540
    });
  };

  gameHasEnded = () => {
    const [x, y] = Object.values(this.state.history)[0];
    const hasHitted = Object.values(this.state.history).filter(
      ([historyX, historyY]) => {
        return historyX === x && historyY === y;
      }
    );
    // console.log("hasHitted", hasHitted.length);
    if (x < 0 || x >= 300 || y < 0 || y >= 280 || hasHitted.length > 1) {
      this.setState({
        gameover: true
      });
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

  updateDirectionHandler = (event: KeyboardEvent | string) => {
    const code = typeof event === "string" ? event : event.code;
    let direction = swithNewDirection(code, this.state.direction);
    this.setState({
      direction
    });
  };

  moveSnakeFoward = () => {
    const { history, direction, gameover, paused } = this.state;
    if (gameover || paused) {
      return false;
    }
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

  resetGameHandler = () => {
    this.setState(stateDefault);
  };

  pauseGameHandler = () => {
    this.setState({
      paused: !this.state.paused
    });
  };

  render() {
    const { history, target, gameover } = this.state;
    return (
      <React.Fragment>
        <GameArea
          {...this.state}
          pauseGameHandler={this.pauseGameHandler}
          resetGameHandler={this.resetGameHandler}
          updateDirectionHandler={this.updateDirectionHandler}
        >
          {gameover && (
            <div className="gameover">
              <p>Game Over</p>
              <p>Score: {Object.keys(history).length - 2}</p>
            </div>
          )}
          {!gameover && (
            <div>
              <SnakePart values={target} isPoint />
              {Object.entries(history).map(([name, values]) => {
                return <SnakePart key={name} values={values} />;
              })}
            </div>
          )}
        </GameArea>
      </React.Fragment>
    );
  }
}

export default App;

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
    if (
      x < 0 ||
      x >= 300 ||
      y < 0 ||
      y >= 280 ||
      (hasHitted.length > 1 && !this.state.isChanging)
    ) {
      return this.setState({
        gameover: true
      });
    }
    this.setState({
      isChanging: false
    });
  };

  addNewPoint = () => {
    const { history } = this.state;
    const [x, y] = history[0];
    const [lastX, lastY] = history[history.length - 1];
    const [pointX, pointY] = this.state.target;
    if (x === pointX && y === pointY) {
      this.setState({
        history: history.concat([[lastX, lastY]]),
        target: generateRandomPoint()
      });
    }
  };

  updateDirectionHandler = (event: KeyboardEvent | string) => {
    const code = typeof event === "string" ? event : event.code;
    let direction = swithNewDirection(code, this.state.direction);
    this.setState({
      isChanging: true,
      direction
    });
  };

  moveSnakeFoward = () => {
    const { history, direction, gameover, paused } = this.state;
    if (gameover || paused) {
      return false;
    }
    let newHistory: Array<Array<number>> = [];
    for (let index = 0; index < history.length; index++) {
      const [x, y] = history[index];
      const { x: newX, y: newY } = updateSnakeHistory({
        x,
        y,
        direction,
        history,
        index
      });
      newHistory.push([newX, newY]);
    }

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
              <p>Score: {history.length - 2}</p>
            </div>
          )}
          {!gameover && (
            <div>
              <SnakePart values={target} isPoint />
              {history.map((values, index) => {
                return <SnakePart key={index} values={values} />;
              })}
            </div>
          )}
        </GameArea>
      </React.Fragment>
    );
  }
}

export default App;

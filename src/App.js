import { MissionUtils } from "@woowacourse/mission-utils";

const GREETING_MESSAGE = "숫자 야구 게임을 시작합니다.";
const INPUT_MESSAGE = "숫자를 입력해주세요 : ";
const END_MESSAGE = "3개의 숫자를 모두 맞히셨습니다! 게임 종료";
const RESTART_MESSAGE = "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.";
const ERROR_MESSAGE = "[ERROR]";

class App {
  /** @type {{strike: number, ball: number}} */
  #score = {
    strike: 0,
    ball: 0,
  };
  /** @type {string} */
  #randomNumber = "";

  async play(gameMode) {
    if (gameMode !== "restart") {
      this.#greeting();
    }

    this.#generateRandomNumber();
    while (this.#score.strike < 3) {
      const userInput = await this.#getUserInput();

      this.#calculateScore(userInput);
      const parsedScore = this.#parseScoreToString(this.#score);

      MissionUtils.Console.print(parsedScore);
    }

    MissionUtils.Console.print(END_MESSAGE);
    MissionUtils.Console.print(RESTART_MESSAGE);
    const restart = await this.#getRestartInput();

    if (restart === "1") {
      this.#reset();
      await this.play("restart");
    }
  }

  #greeting() {
    MissionUtils.Console.print(GREETING_MESSAGE);
  }

  #generateRandomNumber() {
    const computer = [];

    while (computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }

    this.#randomNumber = computer.join("");
  }

  async #getUserInput() {
    const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE);

    this.#validateUserInput(input);

    return input;
  }

  #validateUserInput(input) {
    if (
      input.length !== 3 ||
      !/^[1-9]{3}$/.test(input) ||
      new Set(input).size !== 3
    ) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  /**
   * @param {string} userInput
   */
  #calculateScore(userInput) {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (this.#randomNumber[i] === userInput[i]) {
        strike++;
      } else if (this.#randomNumber.includes(userInput[i])) {
        ball++;
      }
    }

    this.#score = { strike, ball };
  }

  /**
   * @param {{strike: number, ball: number}} scoreObj
   */
  #parseScoreToString(scoreObj) {
    let message = "";

    if (scoreObj.ball > 0) {
      message += `${scoreObj.ball}볼 `;
    }

    if (scoreObj.strike > 0) {
      message += `${scoreObj.strike}스트라이크 `;
    }

    if (message === "") {
      message = "낫싱";
    }

    return message;
  }

  async #getRestartInput() {
    const input = await MissionUtils.Console.readLineAsync("");

    this.#validateRestartInput(input);

    return input;
  }

  #validateRestartInput(input) {
    if (input !== "1" && input !== "2") {
      throw new Error("1 또는 2를 입력해주세요.");
    }
  }

  #reset() {
    this.#score = {
      strike: 0,
      ball: 0,
    };
    this.#randomNumber = "";
  }
}

export default App;

import { MissionUtils } from "@woowacourse/mission-utils";

const GREETING_MESSAGE = "숫자 야구 게임을 시작합니다.";
const INPUT_MESSAGE = "숫자를 입력해주세요 : ";

class App {
  async play() {
    await this.#greeting();

    const randomNumber = this.#generateRandomNumber();
    const userInput = await this.#getUserInput();

    MissionUtils.Console.print(randomNumber);
    MissionUtils.Console.print(userInput);

    const scoreObj = this.#calculateScore(randomNumber, userInput);
    const scoreString = this.#parseScoreToString(scoreObj);

    MissionUtils.Console.print(scoreString);
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

    return computer.join("");
  }

  async #getUserInput() {
    const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE);

    this.#validateUserInput(input);

    return input;
  }

  #validateUserInput(input) {
    if (input.length !== 3) {
      throw new Error("숫자는 3자리여야 합니다.");
    }

    if (input.split("").some(v => isNaN(v))) {
      throw new Error("숫자가 아닌 값이 포함되어 있습니다.");
    }

    if (input.split("").some(v => v === "0")) {
      throw new Error("0이 포함되어 있습니다.");
    }

    if (input.split("").some(v => input.indexOf(v) !== input.lastIndexOf(v))) {
      throw new Error("중복된 숫자가 포함되어 있습니다.");
    }
  }

  /**
   * @param {string} computer
   * @param {string} userInput
   * @returns {{strike: number, ball: number}}
   */
  #calculateScore(computer, userInput) {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (computer[i] === userInput[i]) {
        strike++;
      } else if (computer.includes(userInput[i])) {
        ball++;
      }
    }

    return { strike, ball };
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
}

export default App;

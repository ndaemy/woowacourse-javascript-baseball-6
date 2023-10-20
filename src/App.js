import { MissionUtils } from "@woowacourse/mission-utils";

const GREETING_MESSAGE = "숫자 야구 게임을 시작합니다.";

class App {
  async play() {
    await this.#greeting();

    const randomNumber = this.#generateRandomNumber();
    MissionUtils.Console.print(randomNumber);
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
}

export default App;

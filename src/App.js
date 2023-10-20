import { MissionUtils } from "@woowacourse/mission-utils";

const GREETING_MESSAGE = "숫자 야구 게임을 시작합니다.";

class App {
  async play() {
    await this.#greeting();
  }

  #greeting() {
    MissionUtils.Console.print(GREETING_MESSAGE);
  }
}

export default App;

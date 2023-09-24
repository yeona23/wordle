const answer = "PLATE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content:center; align-items: center; position: absolute; left: 50%; top:50%; transform: translate(-50%,-50%); background: #fff; border: 2px solid #6AA964; padding:40px 60px";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const handleEnterKey = () => {
    let rightLetter = 0;

    const keyboardColumns = Array.from(
      document.querySelectorAll(".keyboard-column")
    );

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );

      const letter = block.innerText;
      const rightAnswer = answer[i];
      const keyboardBlock = keyboardColumns.find(
        (element) => element.dataset.key === letter
      );

      if (letter === rightAnswer) {
        rightLetter++;
        block.style.background = "#6AA964";
        block.style.animation = "correct 0.3s linear";
        if (keyboardBlock) {
          keyboardBlock.style.background = "#6AA964";
        }
      } else if (answer.includes(letter)) {
        block.style.background = "#C9B458";
        block.style.animation = "hcorrect .4s linear";
        if (keyboardBlock) {
          keyboardBlock.style.background = "#C9B458";
        }
      } else {
        block.style.background = "#787C7E";
        block.style.animation = "incorrect .5s linear";
        if (keyboardBlock) {
          keyboardBlock.style.background = "#787C7E";
        }
      }

      block.style.color = "#fff";
      // console.log("input", letter, "answer", rightAnswer);
    }

    if (rightLetter === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );

      prevBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleClick = (event) => {
    if (event.target.matches("[data-key]")) {
      function mouseBoard() {
        const k = event.target.dataset.key;
        return k;
      }
    }
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (mouseBoard() === "DELETE") handleBackspace();
    else if (index === 5) {
      if (mouseBoard() === "ENTER") handleEnterKey();
      else return;
    } else if (mouseBoard() !== "ENTER" && mouseBoard() !== "DELETE") {
      thisBlock.innerText = mouseBoard();
      index++;
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const presentTime = new Date();
      const passedTime = new Date(presentTime - startTime);
      const min = passedTime.getMinutes().toString().padStart(2, "0");
      const sec = passedTime.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector("#timer");
      timerDiv.innerText = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleClick);
}

appStart();

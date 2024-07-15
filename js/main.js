let startGame = document.querySelector(".control span");
let helloName = document.querySelector(".statics-box .name span");

startGame.addEventListener("click", (e) => {
  let userName = window.prompt("What Is Your Name?");
  startGame.parentElement.style.display = "none";
  if (userName == null || userName == "") {
    helloName.innerHTML = `Unknown`;
  } else {
    helloName.innerHTML = `${userName}`;
  }
});

let duration = 1000;
let gameBox = document.querySelector(".game-box");
let unitboxes = document.querySelectorAll(".game-box .unit-box");
let numOfBoxes = [...Array(unitboxes.length).keys()];
let randomArr = [];
let count = 0;

for (let i = 0; randomArr.length <= 19; i++) {
  let randomize = Math.floor(Math.random() * numOfBoxes.length);
  if (randomArr.indexOf(randomize) === -1) {
    randomArr.push(randomize);
  }
}
// another way to shuffle
// function shuffleArr(array) {
//   let current = array.length,
//     temp,
//     random;

//   while (current > 0) {
//     random = Math.floor(Math.random() * current);
//     current--;
//     temp = array[current];
//     array[current] = array[random];
//     array[random] = temp;
//   }
//   return array;
// }

unitboxes.forEach((box, index) => {
  box.style.order = `${randomArr[index]}`;

  box.addEventListener("click", () => {
    flipped(box);
  });
});
let arrt = [];
function flipped(selectedBox) {
  selectedBox.classList.add("flipp");

  for (let i = 0; i < unitboxes.length; i++) {
    if (unitboxes[i].classList.contains("flipp")) {
      count++;
      if (arrt.indexOf(unitboxes[i]) == -1) {
        arrt.unshift(unitboxes[i]);
      }
    }
  }
  console.log(arrt);
  if (count == 3) {
    noClicking();
    if (arrt[0].dataset.tech !== arrt[1].dataset.tech) {
      setTimeout(() => {
        let score = document.querySelector(".score span");
        score.innerHTML = parseInt(score.innerHTML) + 1;
        arrt[0].classList.remove("flipp");
        arrt[1].classList.remove("flipp");
        count = 0;
        arrt = [];
      }, duration);
      document.getElementById("fail").play();
    } else {
      arrt[0].classList.remove("flipp");
      arrt[1].classList.remove("flipp");
      arrt[0].classList.add("has-match");
      arrt[1].classList.add("has-match");
      document.getElementById("success").play();
      arrt = [];
    }
    count = 0;
  }
}
function noClicking() {
  gameBox.classList.add("no-clicking");
  setTimeout(() => {
    gameBox.classList.remove("no-clicking");
  }, duration);
}

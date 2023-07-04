let BurgerButton = document.querySelector(".BurgerMain");
let blackout = document.querySelector(".blackout");
let Menu = document.querySelector(".Menu");
let MenuLink = document.querySelectorAll(".MenuLink");

blackout.onclick = function () {
  BurgerButton.style.transform = "rotate(0deg)";
  document.querySelector("body").style.overflowY = "scroll";
  Menu.style.right = "-320px";
  blackout.classList.remove("black");
  active = false;
  PopUP.style.display = "none";
  activCard = false;
};

let active = false;

BurgerButton.addEventListener("click", (e) => {
  if (!active) {
    e.stopPropagation();
    BurgerButton.style.transform = "rotate(90deg)";
    document.querySelector("body").style.overflowY = "hidden";
    Menu.style.right = "0";
    blackout.classList.add("black");
    active = true;
    activCard = true;
  } else {
    BurgerButton.style.transform = "rotate(0deg)";
    document.querySelector("body").style.overflowY = "scroll";
    Menu.style.right = "-320px";
    blackout.classList.remove("black");
    active = false;
  }
});

MenuLink.forEach((elem) => {
  elem.onclick = function () {
    BurgerButton.style.transform = "rotate(0deg)";
    document.querySelector("body").style.overflowY = "scroll";
    Menu.style.right = "-320px";
    blackout.classList.remove("black");
    active = false;
  };
});

let imgPets = document.querySelector(".imgPets");
let TitlePets = document.querySelector(".TitlePets");
let TypeBreed = document.querySelector(".TypeBreed");
let description = document.querySelector(".description");
let Age = document.querySelector(".Age");
let Inoculations = document.querySelector(".Inoculations");
let Diseases = document.querySelector(".Diseases");
let Parasites = document.querySelector(".Parasites");

function parse(obj, i) {
  DATA = JSON.parse(obj);
  imgPets.src = DATA[i].img;
  TitlePets.innerHTML = DATA[i].name;
  TypeBreed.innerHTML = DATA[i].type + " - " + DATA[i].breed;
  description.innerHTML = DATA[i].description;
  Age.innerHTML = DATA[i].age;
  Inoculations.innerHTML = DATA[i].inoculations;
  Diseases.innerHTML = DATA[i].diseases;
  Parasites.innerHTML = DATA[i].parasites;

  // imgPets.innerHTML=
}

var DATA;
function getFile(fileName, indx) {
  var request = new XMLHttpRequest();

  request.open("GET", fileName);

  request.onloadend = function () {
    parse(request.responseText, indx);
  };

  request.send();
}

let card = document.querySelectorAll(".card");
let PopUP = document.querySelector(".PopUP");
let cross = document.querySelector(".cross");

let activCard = false;
let arrPets = [0, 1, 2, 3, 4, 5, 6, 7];
let nowcards = [];

if (window.innerWidth < 730) {
  nowcards = [0];
} else if (window.innerWidth < 1230) {
  nowcards = [0, 1];
} else {
  nowcards = [0, 1, 2];
}
let remainingNumbers = arrPets.filter((element) => !nowcards.includes(element));

function shuffle(arr) {
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}
let bufercardL = remainingNumbers.map((elem) => elem);
let bufercardR = remainingNumbers.map((elem) => elem);

if (window.innerWidth < 730) {
  bufercardL = shuffle(bufercardL).splice(4);
  bufercardR = shuffle(bufercardR).splice(4);
} else if (window.innerWidth < 1230) {
  bufercardL = shuffle(bufercardL).splice(3);
  bufercardR = shuffle(bufercardR).splice(3);
} else {
  bufercardL = shuffle(bufercardL).splice(2);
  bufercardR = shuffle(bufercardR).splice(2);
}
card.forEach((elem, indx) => {
  elem.style.order = "0";
})
card.forEach((elem, indx) => {
  nowcards.forEach((e) => {
    if (indx == e) {
      elem.style.order = "-2";
    }
  });
});

console.log(remainingNumbers);
console.log(bufercardL);
console.log(bufercardR);
card.forEach((elem, indx) => {
  elem.onclick = function (e) {
    if (!activCard) {
      PopUP.style.display = "flex";
      e.stopPropagation();
      document.querySelector("body").style.overflowY = "hidden";
      blackout.classList.add("black");
      console.log( nowcards)
      console.log(indx)
      getFile("../../pets.json", arrPets[indx]); //путь к файлу
      activCard = true;
    } else {
      blackout.classList.remove("black");
      active = false;
      PopUP.style.display = "none";
      document.querySelector("body").style.overflowY = "scroll";
      activCard = false;
    }
  };
});

cross.onclick = function () {
  blackout.classList.remove("black");
  active = false;
  PopUP.style.display = "none";
  document.querySelector("body").style.overflowY = "scroll";
  activCard = false;
};

const ArrowRight = document.querySelector(".ArrowRight");
const ArrowLeft = document.querySelector(".ArrowLeft");

let left = 0;

let countL = 0;
let countR = 0;

ArrowRight.onclick = function () {
  bufercardL = nowcards.map((elem) => elem);
  countR++;
  if (countR > 1) {
    remainingNumbers = arrPets.filter(
      (element) => !bufercardL.includes(element)
    );
    if (window.innerWidth < 730) {
      nowcards = shuffle(remainingNumbers.map((elem) => elem)).splice(4);
    } else if (window.innerWidth < 1230) {
      nowcards = shuffle(remainingNumbers.map((elem) => elem)).splice(3);
    } else {
      nowcards = shuffle(remainingNumbers.map((elem) => elem)).splice(2);
    }
    countL=0;
  } else {
    nowcards = bufercardR.map((elem) => elem);
  }
  card.forEach((elem, indx) => {
    elem.style.order = "0";
  })
  card.forEach((elem, indx) => {
    nowcards.forEach((e) => {
      if (indx == e) {
        elem.style.order = "-2";
      }
    });
  });
  console.log(nowcards);
  console.log("nowcards");
  console.log(bufercardL);
  console.log("bufercardL");
  // if (window.innerWidth < 730) {
  //   left = left - 310;
  //   if (left < -2170) {
  //     left = 0;
  //   }
  // } else if (window.innerWidth < 900) {
  //   left = left - 620;
  //   if (left < -1860) {
  //     left = 0;
  //   }
  // } else if (window.innerWidth < 1230) {
  //   left = left - 720;
  //   if (left < -2160) {
  //     left = 0;
  //   }
  // } else {
  //   left = left - 1080;
  //   if (left < -2160) {
  //     left = 0;
  //   }
  // }

  // card.forEach((elem) => {
  //   elem.style.left = left + "px";
  // });
};

ArrowLeft.onclick = function () {
  countL++;
  bufercardR = nowcards.map((elem) => elem);

  if (countL > 1) {
    remainingNumbers = arrPets.filter(
      (element) => !bufercardR.includes(element)
    );
    if (window.innerWidth < 730) {
      nowcards = shuffle(remainingNumbers.map((elem) => elem)).splice(4);
    } else if (window.innerWidth < 1230) {
      nowcards = shuffle(remainingNumbers.map((elem) => elem)).splice(3);
    } else {
      nowcards = shuffle(remainingNumbers.map((elem) => elem)).splice(2);
    }
    countR = 0
  } else {
    console.log("bufercardL2")
    console.log(bufercardL)
    nowcards = bufercardL.map((elem) => elem);
  }
  card.forEach((elem, indx) => {
    elem.style.order = "0";
  })
  card.forEach((elem, indx) => {
    nowcards.forEach((e) => {
      if (indx == e) {
        elem.style.order = "-2";
      }
    });
  });
  console.log(nowcards);
  console.log("nowcards");
  console.log(bufercardR);
  console.log("bufercardR");
  // if (window.innerWidth < 730) {
  //   left = left + 310;
  //   if (left > 0) {
  //     left = -2170;
  //   }
  // } else if (window.innerWidth < 900) {
  //   left = left + 620;
  //   if (left > 0) {
  //     left = -1860;
  //   }
  // } else if (window.innerWidth < 1230) {
  //   left = left + 720;
  //   if (left > 0) {
  //     left = -2160;
  //   }
  // } else {
  //   left = left + 1080;
  //   if (left > 0) {
  //     left = -2160;
  //   }
  // }
  // card.forEach((elem) => {
  //   elem.style.left = left + "px";
  // });
};

window.onresize = function () {
  remainingNumbers = arrPets.filter((element) => !nowcards.includes(element));
  left = 0;
  card.forEach((elem) => {
    elem.style.left = left + "px";
  });
};

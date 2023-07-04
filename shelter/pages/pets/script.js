let BurgerButton = document.querySelector(".BurgerButton");
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
var DATA2;
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

card.forEach((elem, indx) => {
  elem.onclick = function (e) {
    if (!activCard) {
      PopUP.style.display = "flex";
      e.stopPropagation();
      document.querySelector("body").style.overflowY = "hidden";
      blackout.classList.add("black");
      let arrpagecard = arrPets[pagelist - 1];
      getFile("../../pets.json", arrpagecard[indx]); //путь к файлу

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

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateArrays() {
  let a = [[0, 1, 2, 3, 4, 5, 6, 7]];
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7];

  for (let i = 0; i < 5; i++) {
    let shuffledNumbers = shuffle(numbers.slice());
    // Проверяем, чтобы расположение элементов не совпадало с предыдущими массивами
    for (let j = 0; j < i; j++) {
      while (arraysEqual(shuffledNumbers, a[j])) {
        shuffledNumbers = shuffle(numbers.slice());
      }
    }

    a.push(shuffledNumbers);
  }

  return a;
}

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

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

const page = document.querySelector(".page");
let arrPets = generateArrays();
let Petsarr1280 = JSON.parse(JSON.stringify(arrPets));
let Petsarr768 = JSON.parse(JSON.stringify(arrPets));


function from8to6(){
  let removedElements = [];
  Petsarr768.forEach((elem) => {
    let removedElementsBuffer = elem.slice(-2);
    elem.pop();
    elem.pop();
    removedElements.push(removedElementsBuffer);
  });
  let firstThree = removedElements.slice(0, 3);
  let lastThree = removedElements.slice(3);
  let mergedArr = [firstThree.flat(), lastThree.flat()];
  Petsarr768 = Petsarr768.concat(mergedArr);
  
}

from8to6();
let Petsarr320 = JSON.parse(JSON.stringify(Petsarr768));
from6to16();





let pagelist = 1;
let lastPageList = 6;
changePagin()
const prevPrev = document.querySelector(".prevPrev");
prevPrev.onclick = function () {
  pagelist = 1;
  page.innerHTML = pagelist;
  getJson("../../pets.json", pagelist - 1);
};
const prev = document.querySelector(".prev");
prev.onclick = function () {
  pagelist--;
  if (pagelist < 1) {
    pagelist = 1;
  }
  page.innerHTML = pagelist;
  getJson("../../pets.json", pagelist - 1);
};


page.onclick = function () {
  console.log("page");
};

const next = document.querySelector(".next");
next.onclick = function () {
  pagelist++;
  if (pagelist > lastPageList) {
    pagelist = lastPageList;
  }
  page.innerHTML = pagelist;
  getJson("../../pets.json", pagelist - 1);
};

const nextNext = document.querySelector(".nextNext");
nextNext.onclick = function () {
  pagelist = lastPageList;
  page.innerHTML = pagelist;
  getJson("../../pets.json", pagelist - 1);
};

let CardImage = document.querySelectorAll(".CardImage");
let CardName = document.querySelectorAll(".CardName");

function getJson(fileName, indx) {
  var request = new XMLHttpRequest();

  request.open("GET", fileName);

  request.onloadend = function () {
    ChangeCard(request.responseText, indx);
  };

  request.send();
}

function ChangeCard(obj, i) {
  console.log(arrPets);
  let PagearrPets = arrPets[i];
  console.log(PagearrPets);
  PagearrPets.forEach((elem, indx) => {
    DATA2 = JSON.parse(obj);

    CardImage[indx].src = DATA2[elem].img;
    CardName[indx].innerHTML = DATA2[elem].name;
  });

  // imgPets.innerHTML=
}

window.onresize = changePagin;


function from6to16(){

  let removedElements = [];
  Petsarr320.forEach((elem) => {
    let removedElementsBuffer = elem.slice(-3);
    elem.pop();
    elem.pop();
    elem.pop();
    removedElements.push(removedElementsBuffer);
  });
  Petsarr320 = Petsarr320.concat(removedElements);
}

let modeWidth=1;
function changePagin(){
  var windowWidth = window.innerWidth;
  if (windowWidth < 1000 && windowWidth > 600 && arrPets.length != 8) {
    lastPageList = 8;
    arrPets=Petsarr768;
    pagelist = 1;
    page.innerHTML = pagelist;
    getJson("../../pets.json", pagelist - 1);
  } else if (windowWidth < 600 && arrPets.length != 16) {
    lastPageList = 16;
    arrPets=Petsarr320;
    pagelist = 1;
    page.innerHTML = pagelist;
    getJson("../../pets.json", pagelist - 1);
  } else if(windowWidth > 1000 && arrPets.length != 6) {
    lastPageList = 6;
    arrPets = Petsarr1280;
    pagelist = 1;
    page.innerHTML = pagelist;
    getJson("../../pets.json", pagelist - 1);
  }
}
"use strict"

import pets from '../../assets/pets.js';

const iconBurger = document.querySelector('.menu-icon');
const menuBurger = document.querySelector('.nav');
const backgroundShadow = document.querySelector('.background-shadow');
const linksBurger = document.querySelectorAll('.nav-link');

function closeBurgerMenu() {
    document.body.classList.remove("lock");
    iconBurger.classList.remove('active');
    menuBurger.classList.remove('active');
    backgroundShadow.classList.remove('active');
}

iconBurger.addEventListener('click', function () {
    document.body.classList.toggle("lock");
    iconBurger.classList.toggle('active');
    menuBurger.classList.toggle('active');
    backgroundShadow.classList.toggle('active');
})

backgroundShadow.addEventListener('click', closeBurgerMenu);
linksBurger.forEach(link => link.addEventListener('click', closeBurgerMenu));

//Pagination 
const container = document.getElementsByClassName('container-card-pets')[0];
const cardPets = document.getElementsByClassName('card-pets');
const btnToBegin = document.querySelector('.to-begining-btn');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');
const btnInEnd = document.querySelector('.in-end-btn');
const page = document.querySelector('.counter');
let elementsPerPage = null;
let numberPage = 1;
let randomList1 = [];
let randomList2 = [];
let randomList3 = [];
let randomList4 = [];
let randomList5 = [];
let randomList6 = [];
let paginationList = [];


function creatRandomArrPets() {
    while (randomList1.length < 8) {
        let item = pets[Math.floor(Math.random() * 8)];
        if (!randomList1.includes(item)) randomList1.push(item);
    }

    for (let i of randomList1) {
        paginationList.push(i);
    }
    return randomList1;
}

function creatRandomArrLastPets(arr1, arr2) {
    while (arr2.length < 8) {
        let item = arr1[Math.floor(Math.random() * 8)];
        if (!arr2.includes(item)) {
            if(arr2.length < 3) {
                if (arr1.indexOf(item) < 6) {
                    arr2.push(item);
                }
            } else arr2.push(item);
        }
    }
    for (let i of arr2) {
        paginationList.push(i);
    }
    return arr2;
}

function creatPaginationListArray() {
    creatRandomArrPets();
    creatRandomArrLastPets(randomList1, randomList2)
    creatRandomArrLastPets(randomList2, randomList3)
    creatRandomArrLastPets(randomList3, randomList4)
    creatRandomArrLastPets(randomList4, randomList5)
    creatRandomArrLastPets(randomList5, randomList6)
}

const checkElementsPerPage = () => {
    const clientWidth = document.documentElement.clientWidth

    if (clientWidth >= 1280) {
        elementsPerPage = 8;
    } else if (clientWidth > 769) {
        elementsPerPage = 6;
    } else {
        elementsPerPage = 3;
    }
}

const generateEl = () => {
    return ` 
    <div class="card-pets">
    
        <div class="images-pets">
            <img class="image-pets" src="" alt="">
        </div>
        <p class="name-pets"></p>
            <button class="btn-card-pets">Learn more</button>
    </div>    
    `
}

const fillEl = () => {
    let photoCards = document.querySelectorAll('.image-pets');
    let namePets = document.querySelectorAll('.name-pets');

    for (let i = 0; i < 48; i++) {
        photoCards[i].src = paginationList[i].img;
        photoCards[i].alt = paginationList[i].name;
        namePets[i].textContent = paginationList[i].name;
    }
}

const renderElements = () => {
    let elList = new Array(48).fill(generateEl());

    container.innerHTML = elList.join('');
    fillEl();
}

const fillNumPage = () => {
    page.innerHTML = numberPage;
}

const showCards = () => {
    for (let i = (numberPage - 1) * elementsPerPage; i < numberPage * elementsPerPage; i++) {
        cardPets[i].classList.add('active');
    }
}

const hideCardsPage = () => {
    for (let i = (numberPage - 1) * elementsPerPage; i < numberPage * elementsPerPage; i++) {
        cardPets[i].classList.remove('active');
    }
}

const inactiveBtn = (item) => {
    item.classList.remove('active');
    item.classList.add('inactive');
}

const activeBtn = (item) => {
    item.classList.remove('inactive');
    item.classList.add('active');
}

const onLoad = (event) => {
    checkElementsPerPage();
    creatPaginationListArray()
    renderElements();
    fillNumPage();
    showCards();
    initPopup();
}

const scrollNext = () => {
    if (numberPage < (48 / elementsPerPage)) {
        hideCardsPage();
        numberPage++;
        fillNumPage();
        showCards();
    }
}
const scrollPrev = () => {
    if (numberPage > 1) {
        hideCardsPage();
        numberPage--;
        fillNumPage();
        showCards();
    }
}

const scrollStart = () => {
    if (numberPage > 1) {
        hideCardsPage();
        numberPage = 1;
        fillNumPage();
        showCards();
    }
}
const scrollEnd = () => {
    if (numberPage < 48 / elementsPerPage) {
        hideCardsPage();
        numberPage = 48 / elementsPerPage;
        fillNumPage();
        showCards();
    }
}

const settingIntermediateState = () => {
    if (numberPage > 1) {
        activeBtn(btnPrev);
        activeBtn(btnToBegin);
        activeBtn(btnNext);
        activeBtn(btnInEnd);
    }
}

const settingEndState = () => {
    if (numberPage === (48 / elementsPerPage)) {
        inactiveBtn(btnNext);
        inactiveBtn(btnInEnd);
    }
}

const settingStartState = () => {
    if (numberPage === 1) {
        inactiveBtn(btnPrev);
        inactiveBtn(btnToBegin);
    }
}

window.addEventListener('DOMContentLoaded', onLoad);
btnNext.addEventListener('click', () => {
    scrollNext();
    settingIntermediateState();
    settingEndState();
});
btnPrev.addEventListener('click', () => {
    scrollPrev();
    settingIntermediateState();
    settingStartState();
});
btnInEnd.addEventListener('click', () => {
    scrollEnd();
    settingEndState();
    activeBtn(btnPrev);
    activeBtn(btnToBegin);
});
btnToBegin.addEventListener('click', () => {
    scrollStart();
    settingStartState();
    activeBtn(btnNext);
    activeBtn(btnInEnd);
});


//popup
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.close-popup-btn');
let backgroundPopup = document.querySelector('.background-shadow-popup');

function showPopup() {
    popup.classList.add('active');
    backgroundPopup.classList.add('active');
    document.body.style.overflow = "hidden";
}

function hidePopup() {
    popup.classList.remove('active');
    backgroundPopup.classList.remove('active');
    document.body.style.overflow = "";
}

const initPopup = () => {
    let cardsPets = document.querySelectorAll('.card-pets');
    let index = 0;

    cardsPets.forEach((card, i) => card.addEventListener('click', () => {
        index = i;

        fillPopup();
        showPopup();

    }))

    const fillPopup = () => {
        let imagePop = document.querySelector('.im-popup');
        let name = document.querySelector('.name-pet-popup');
        let type = document.querySelector('.type-pet');
        let breed = document.querySelector('.breed');
        let overview = document.querySelector('.overview-popup');
        let age = document.querySelector('.age-pet-popup');
        let inoculation = document.querySelector('.inoculation');
        let diseases = document.querySelector('.diseases');
        let parasites = document.querySelector('.parasites');

        imagePop.src = paginationList[index].img;
        imagePop.alt = paginationList[index].name;
        name.innerHTML = paginationList[index].name;
        type.innerHTML = paginationList[index].type;
        breed.innerHTML = paginationList[index].breed;
        overview.innerHTML = paginationList[index].description;
        age.innerHTML = paginationList[index].age;
        inoculation.innerHTML = paginationList[index].inoculations;
        diseases.innerHTML = paginationList[index].diseases;
        parasites.innerHTML = paginationList[index].parasites;
    }
}

function btnRemoveActive() {
    closeBtn.classList.remove('active');
}

function btnAddActive() {
    closeBtn.classList.add('active');
}

closeBtn.addEventListener('click', hidePopup);
backgroundPopup.addEventListener('click', hidePopup);
backgroundPopup.addEventListener('mousemove', btnAddActive);
popup.addEventListener('mousemove', btnRemoveActive);



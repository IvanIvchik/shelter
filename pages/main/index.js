"use strict"

import pets from '../../assets/pets.js';
//burger

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

//slider fill window

const container = document.getElementsByClassName('container-card-pets')[0]
let elementsPerPage = null;
let slideList = [];
let nextSlideList = [];

function creatNewListArray() {
    while (nextSlideList.length < elementsPerPage) {
        let item = pets[Math.floor(Math.random() * 8)];
        if (!slideList.includes(item) && !nextSlideList.includes(item)) nextSlideList.push(item);
    }
    return nextSlideList;
}

function shufflePets() {
    while (slideList.length < elementsPerPage) {
        let item = pets[Math.floor(Math.random() * 8)];
        if (!slideList.includes(item)) slideList.push(item);
    }
    return slideList;
}

const checkElementsPerPage = () => {
    const clientWidth = document.documentElement.clientWidth

    if (clientWidth >= 1280) {
        elementsPerPage = 3;
    } else if (clientWidth > 769) {
        elementsPerPage = 2;
    } else {
        elementsPerPage = 1;
    }
}


const generateSlide = () => {
    let blockSlide = document.createElement('div');
    blockSlide.classList.add('slide', 'active');
    container.append(blockSlide);
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

    for (let i = 0; i < elementsPerPage; i++) {
        photoCards[i].src = slideList[i].img;
        photoCards[i].alt = slideList[i].name;
        namePets[i].textContent = slideList[i].name;
    }
}

const renderElements = () => {
    generateSlide();

    const slide = document.querySelector('.slide.active');
    let elList = new Array(elementsPerPage).fill(generateEl());

    slide.innerHTML = elList.join('');
    shufflePets();
    fillEl();
}

const generateNextSlide = () => {
    let blockSlide = document.createElement('div');
    blockSlide.classList.add('slide', 'inactive');
    container.append(blockSlide);
    for (let i = 0; i < elementsPerPage; i++) {
        let blockPets = document.createElement('div');
        blockPets.classList.add('card-pets');
        blockSlide.append(blockPets);
        let imgBlock = document.createElement('div');
        imgBlock.classList.add('images-pets');
        blockPets.append(imgBlock);
        let imgPet = document.createElement('img');
        imgPet.classList.add('image-pets', 'new-slide');
        imgPet.src = '';
        imgPet.alt = '';
        imgBlock.append(imgPet);
        let namePets = document.createElement('p');
        namePets.classList.add('name-pets', 'new-slide');
        blockPets.append(namePets);
        let btnCardPets = document.createElement('button');
        btnCardPets.classList.add('btn-card-pets');
        blockPets.append(btnCardPets);
        btnCardPets.innerHTML = "Learn more";
    }

}

const fillNewEl = (el) => {
    let photoCards = document.querySelectorAll('.image-pets.new-slide');
    let namePets = document.querySelectorAll('.name-pets.new-slide');

    for (let i = 0; i < elementsPerPage; i++) {
        photoCards[i].src = nextSlideList[i].img;
        photoCards[i].alt = nextSlideList[i].name;
        namePets[i].textContent = nextSlideList[i].name;
    }

}

const overwriteArray = () => {
    slideList.length = 0;
    for (let i = 0; i < nextSlideList.length; i++) {
        slideList.push(nextSlideList[i])
    }
    nextSlideList.length = 0;
    creatNewListArray();
}

const onLoad = (event) => {
    checkElementsPerPage();
    renderElements();
    creatNewListArray();
    generateNextSlide();
    fillNewEl();
    initPopup();
}


window.addEventListener('DOMContentLoaded', onLoad);


//slider physics

let slide = document.getElementsByClassName('slide');
let isEnabled = true;
let index = 0;

function changeIndex(n) {
    index = (n + slide.length) % slide.length;
}

function updateSlideCollection() {
    slide = null;
    slide = document.getElementsByClassName('slide');
    index = 0;

}

function hideSlide(direction) {
    isEnabled = false;
    slide[index].classList.add(direction);
    slide[index].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
        this.remove();
    })

}

function showSlide(direction) {
    slide[index].classList.add('next', direction);
    slide[index].addEventListener("animationend", function () {
        this.classList.remove('next', 'inactive', direction);
        this.classList.add('active');
        isEnabled = true;
    });
    initPopup();
}

const generateNext = () => {
    generateNextSlide();
    fillNewEl();
}

const resetClass = () => {
    let photoCards = document.querySelectorAll('.image-pets.new-slide');
    let namePets = document.querySelectorAll('.name-pets.new-slide');

    for (let i = 0; i < elementsPerPage; i++) {
        photoCards[i].classList.remove('new-slide');
        namePets[i].classList.remove('new-slide');
    }
}


function secondSlide(n) {
    hideSlide("to-left");
    changeIndex(n + 1);
    showSlide("from-right");
    generateNext();
    resetClass();
    updateSlideCollection();
    overwriteArray();
}

function previousSlide(n) {
    hideSlide("to-right");
    changeIndex(n + 1);
    showSlide("from-left");
    generateNext();
    resetClass();
    updateSlideCollection();
    overwriteArray();
}

document.querySelector(".slider-btn.prev-btn").addEventListener("click", function () {
    if (isEnabled) {
        previousSlide(index);
    }
});

document.querySelector(".slider-btn.next-btn").addEventListener("click", function () {
    if (isEnabled) {
        secondSlide(index);
    }
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
        if (i < elementsPerPage) {
            index = i;
        } else index = i - elementsPerPage;
        
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

        imagePop.src = slideList[index].img;
        imagePop.alt = slideList[index].name;
        name.innerHTML = slideList[index].name;
        type.innerHTML = slideList[index].type;
        breed.innerHTML = slideList[index].breed;
        overview.innerHTML = slideList[index].description;
        age.innerHTML = slideList[index].age;
        inoculation.innerHTML = slideList[index].inoculations;
        diseases.innerHTML = slideList[index].diseases;
        parasites.innerHTML = slideList[index].parasites;
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

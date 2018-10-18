const wrapper = document.querySelector('.wrapper');
const empties = document.querySelectorAll('.empty');
const btnPlay = document.querySelector('#btn-play');
let fill = document.querySelector('.fill');
let index = 0;
// Array of animals
let animals = ['Cat', 'Rabbit', 'Elephant', 'Lion', 'Rat', 'Tigger'];

// Make array shuffle
Array.prototype.picsShuffle = function () {
    let len = this.length,
        rand,
        temp;
    while (--len > 0) {
        // Genertate random value
        rand = Math.floor(Math.random() * (len + 1));
        // Swap values
        temp = this[rand];
        this[rand] = this[len];
        this[len] = temp;
    }
};

// Window load images
window.addEventListener('load', startGame);

// Play againe
btnPlay.addEventListener('click', function () {
    window.location.reload()
});

// Fill listner
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop empties events
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', drop);
}

// Start game function
function startGame() {
    animals.picsShuffle();
    fill.style.backgroundImage = `url("../img/${animals[0]}.jpg")`;
    fill.setAttribute('data-value', `${animals[0]}`);
}

// Drag functions
function dragStart() {
    this.className += ' hold';
}

function dragEnd() {
    this.className = 'fill';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered'
}

function dragLeave() {
    this.className = 'empty';
}

function drop(e) {
    if (fill.getAttribute('data-value') == this.textContent) {
        this.className = 'empty';
        this.style.backgroundImage = fill.style.backgroundImage;
        index++;
        if (index === animals.length) {
            fill.style.display = "none";
            btnPlay.style.display = "inline-block";
            return false;
        }
        fill.style.backgroundImage = `url("../img/${animals[index]}.jpg")`;
        fill.setAttribute('data-value', `${animals[index]}`);
        fill.style.borderColor = "skyblue";
    } else {
        fill.style.borderColor = "red";
        console.log('not correct');
    }
}
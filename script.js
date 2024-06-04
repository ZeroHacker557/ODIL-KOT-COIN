const game = document.getElementById('game');
const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const kotDisplay = document.getElementById('kot');
const bonusDisplay = document.getElementById('bonus');
const bonusSound = document.getElementById('bonus-sound');
const withdrawInput = document.getElementById('withdraw-amount');
const withdrawButton = document.getElementById('withdraw-btn');
const withdrawMessage = document.getElementById('withdraw-message');

let score = 0;

function getRandomPosition(element) {
    const elementSize = element.getBoundingClientRect();
    const x = Math.floor(Math.random() * (game.clientWidth - elementSize.width));
    const y = Math.floor(Math.random() * (game.clientHeight - elementSize.height));
    return { x, y };
}

function getRandomFont() {
    const fonts = ['Arial', 'Verdana', 'Helvetica', 'Comic Sans MS', 'Georgia', 'Times New Roman', 'Courier New'];
    const randomIndex = Math.floor(Math.random() * fonts.length);
    return fonts[randomIndex];
}

function placeCoin() {
    const { x, y } = getRandomPosition(coin);
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
}

function showKot() {
    const { x, y } = getRandomPosition(kotDisplay);
    kotDisplay.style.left = `${x}px`;
    kotDisplay.style.top = `${y}px`;
    kotDisplay.style.fontFamily = getRandomFont();
    kotDisplay.classList.remove('hidden');
    setTimeout(() => {
        kotDisplay.classList.add('hidden');
    }, 1000);
}

function showBonus() {
    const { x, y } = getRandomPosition(bonusDisplay);
    bonusDisplay.style.left = `${x}px`;
    bonusDisplay.style.top = `${y}px`;
    bonusDisplay.classList.remove('hidden');
    bonusSound.play();
    setTimeout(() => {
        bonusDisplay.classList.add('hidden');
    }, 1000);
}

coin.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    placeCoin();
    showKot();
    if (score % 10 === 0) {
        showBonus();
    }
});

withdrawButton.addEventListener('click', () => {
    const amount = parseInt(withdrawInput.value, 10);
    if (amount > 1000000) {
        withdrawMessage.classList.remove('hidden');
        setTimeout(() => {
            withdrawMessage.classList.add('hidden');
        }, 3000);
    } else {
        alert("Mablag' chiqarildi!");
    }
});

placeCoin();

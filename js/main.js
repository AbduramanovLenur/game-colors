const initGame = () => {
    const start = document.querySelector('#start');
    const game = document.querySelector('#game');
    const time = document.querySelector('#time');
    const timeHeader = document.querySelector('#time-header');
    const resultHeader = document.querySelector('#result-header');
    const result = document.querySelector('#result');
    const gameTime = document.querySelector('#game-time');

    const colors = ['#CB356B', '#BD3F32', '#FA1C71', '#F76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];
    let score = 0;
    let isGameStarted = false;

    start.addEventListener('click', startGame);
    game.addEventListener('click', handleBoxClick);
    gameTime.addEventListener('input', setGameTime);

    function show(el) {
        el.classList.remove('hide');
    };

    function hide(el) {
        el.classList.add('hide');
    };

    function handleBoxClick(event) {
        if (!isGameStarted) {
            return;
        };

        if (event.target.dataset.jsBox) {
            score++;
            renderBox();
        };
    };

    function startGame() {
        score = 0;
        setGameTime();
        gameTime.setAttribute('disabled', 'true');
        isGameStarted = true;
        start.classList.add('hide');
        hide(start);
        game.style.backgroundColor = '#fff';

        let interval = setInterval(() => {
            let times = parseFloat(time.textContent)

            if (times <= 0) {
                clearInterval(interval);
                endGame();
            } else {
                time.textContent = (times - 0.1).toFixed(1);
            };
        }, 100);

        renderBox();
    };

    function setGameScore() {
        result.textContent = score.toString();
    };

    function setGameTime() {
        let times = +gameTime.value;
        time.textContent = times.toFixed(1);
        show(timeHeader);
        hide(resultHeader);
    };

    function endGame() {
        isGameStarted = false;
        setGameScore();
        gameTime.removeAttribute('disabled');
        show(start);
        game.innerHTML = '';
        game.style.backgroundColor = '#ccc';
        hide(timeHeader);
        show(resultHeader);
    };

    function renderBox() {
        game.innerHTML = '';
        const box = document.createElement('div');
        let boxSize = getRandom(30, 100);
        const gameSize = game.getBoundingClientRect();
        let maxTop = gameSize.height - boxSize;
        let maxLeft = gameSize.width - boxSize;
        let randomColor = getRandom(0, colors.length);

        box.style.height = box.style.width = `${boxSize}px`;
        box.style.position = 'absolute';
        box.style.backgroundColor = colors[randomColor];
        box.style.borderRadius = '50%';
        box.style.top = `${getRandom(0, maxTop)}px`;
        box.style.left = `${getRandom(30, maxLeft)}px`;
        box.style.cursor = 'pointer';
        box.setAttribute('data-js-box', 'true');

        game.insertAdjacentElement('afterbegin', box);
    };

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
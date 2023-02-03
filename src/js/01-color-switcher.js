
const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let makeChange = 0;


start.addEventListener('click', () => {
    
    makeChange = setInterval(() => {    
    body.style.backgroundColor = getRandomHexColor();           
    start.setAttribute("disabled", true);

    }, 1000);
    
});

stop.addEventListener('click', () => {
    
    clearInterval(makeChange);    
    start.removeAttribute("disabled");
    
});
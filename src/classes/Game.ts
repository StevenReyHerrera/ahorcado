import Player from "./Player.js";
import { lettersChange } from "../functions/letters.js";

const containerForm=document.getElementById('container-form')  as HTMLDivElement
const form=document.getElementById("form") as HTMLFormElement
containerForm!.appendChild(form)
const containerGame=document.querySelector('.container-game') as HTMLDivElement
document.body.removeChild(containerGame)

form!.addEventListener('submit',(event)=>{
event.preventDefault();
document.body.removeChild(containerForm)
document.body.appendChild(containerGame)
const name=  form!.querySelector('[type="text"]') as HTMLInputElement;
const player: Player = new Player(name.value);
player.startPlay();

const containerWord = document.getElementById("container-word");
const word: HTMLElement = document.createElement("h1");
containerWord!.appendChild(word);

player.getWord_().forEach(char=>{
    word.textContent += `${char} `;
})

const keyboard = document.getElementById("keyboard");


lettersChange.alphabet().forEach((letter: string) => {

    const button = document.createElement("button");
    button.classList.add("container-keyboard__button-letter");
    button.value = `${letter}`;
    button.onclick = () => {
      player.selectLetter(button.value);
      button.disabled = true;
      word.innerHTML = "";
      player.getWord_().forEach((char: string) => {
        word.textContent += `${char} `;
      });
      trys.innerHTML = "";
      trys.textContent = `Intentos: ${player.getTrys()}`;
      if (player.getTrys() === 0) {
        trys.innerHTML = "";
        trys.textContent = "PERDISTE";
        const allButtons: HTMLButtonElement[] = Array.from(
          document.querySelectorAll(".container-keyboard__button-letter")
        );
        allButtons.forEach(
          (button: HTMLButtonElement) => (button.disabled = true)
        );
        const reinicio= document.createElement('input')
        reinicio.type='button'
        reinicio.classList.add('container-keyboard__reinicio')
        reinicio.value="Restart"
        reinicio.onclick=()=>{
            location.reload()
        }
        const containerRestart=document.querySelector('.container-keyboard__restart')
        containerRestart!.appendChild(reinicio)
        
      }
     
      if ( player.getTrys()>0 && player.getWord_().filter(char=>
          char==='_').length===0)
      {
        trys.innerHTML = "";
        trys.textContent = "FELICIDADES "+lettersChange.toUpper(player.name);
        const allButtons: HTMLButtonElement[] = Array.from(
          document.querySelectorAll(".container-keyboard__button-letter")
        );
        allButtons.forEach(
          (button: HTMLButtonElement) => (button.disabled = true)
        );
      }
    };
    button.textContent = letter;
    keyboard!.appendChild(button);
  });

  const containerTrys = document.getElementById("container-trys");
const trys = document.createElement("h1");
containerTrys!.appendChild(trys);
trys.textContent = `Intentos: ${player.getTrys()}`;
})












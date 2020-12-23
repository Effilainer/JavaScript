import {radioPlayerInit} from "./radioPlayer.js";
import {musicPlayerInit} from "./musicPlayer.js";
import {videoPlayerInit} from "./videoPlayer.js";

//нужно получить элементы со страницы, с кот будем работать
// кнопочки, у которых есть классы, это смотрим в index
//по единому классу можем оратиься ко всем кнопкам

const playerBtn = document.querySelectorAll(".player-btn"); //document - обращаемся к дом-дереву
console.log(playerBtn);
//затем нужно получить блоки видео, аудио и радио, у них есть тоже один класс
const playerBlock = document.querySelectorAll(".player-block");
console.log(playerBlock)
const temp = document.querySelector(".temp"); //ищем класс строки Media Player ЯTunes

//в ф-ции ниже перебираем playerBtn и playerBlock с методом forEach, кот принимает
//стрелочную колбэк функцию. Мы берем каждйы item(в обной кнопки, в другой блоки)
//в самой функции удаляем класс active для каждого item
const deactivationPlayer = () => {
    //скрываем temp. Обращаемся: элемент.свойство.стиль сво-ва = свойство "none"
    temp.style.display = "none";
    playerBtn.forEach(item=> item.classList.remove("active"));
    playerBlock.forEach(item=> item.classList.remove("active"));
};

//напишем метод, когда будем кликать по кнопкам btn в playerBtn, то будет открываться playerBlock
playerBtn.forEach((btn, i) => {
    console.log(btn)
    console.log(i)
//forEach это метод, кот принимает callback функцию. Будет запущена внутри функции forEach 
//запускается в контексте массивов, в нее должны передать функцию лямбда. а именно стрелочную
//forEach(btn) - Где btn может принимать сами элементы. Запускает функцию столько раз, сколько у нас элементов
//на каждую кнопку повесим слушатель собатий
//чтобы определить какой блок раскрыть нам нужен индекс этой кнопки, поэтому в функции playerBtn добавляем после btn индекс i в playerBlock
    btn.addEventListener("click", ()=>{
//EventListener это метод, чтобы ее запустить она принимает 2 аргумента("какое событие должно произойти", calback функци)         
        deactivationPlayer(); //вызов функции чтобы когда нажимаем на кнопку блока, другой блок пропадал
        btn.classList.add("active");
        playerBlock[i].classList.add("active");
//с помощью свойства classList обращаемся к методу add и добавляем класс active
//обращаемся к playerBlock по индексу этой же кнопки, у нас btn и i всегда совпадают и добавляем класс active
    });
}) 

videoPlayerInit();
radioPlayerInit(); //вызываем функцию
musicPlayerInit();

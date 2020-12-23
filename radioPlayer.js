export const radioPlayerInit = () => { //т.к. это функция, то ставим глагол Init

    const radio = document.querySelector(".radio");
    const radioCoverImg = document.querySelector(".radio-cover__img");
    const radioNavigation = document.querySelector(".radio-navigation");
    const radioHeaderBig = document.querySelector(".radio-header__big");
    const radioItem = document.querySelectorAll(".radio-item");
    const radioStop = document.querySelector(".radio-stop");

    //конструктор аудио, кот создает объект аудио
    //создаем новый объект на основе функции конструкции аудио
    const audio = new Audio();
    audio.type = "audio/aac";


    const changeIconlay = () => {
        if (audio.paused){
            //когда радио на паузе удаляем Play
            radio.classList.remove("play");
            radioStop.classList.add("fa-play");
            radioStop.classList.remove("fa-stop");
        }else{
            //когда радио не на паузе, то добавляем Play
            radio.classList.add("play");
            radioStop.classList.add("fa-stop");
            radioStop.classList.remove("fa-play");
        }
    };
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove("select"));
        elem.classList.add("select");
    }
    //блокируем кнопку Play
    radioStop.disabled = true;
    //у radio есть св-во src. 
    //event - для делегирования, чтобы при выборе радио играло выбранное
    radioNavigation.addEventListener ("change", event => {
        const target = event.target;
        //получаем родителя таргета
        const parrent = target.closest(".radio-item");
        selectItem(parrent);
        //вместо выберите радиостанцию чтобы ставилось имя радостанции
        const title = parrent.querySelector(".radio-name").textContent;
        radioHeaderBig.textContent = title;
        //получаем src картинки радио и вставляем картинку на динамик
        const urlImg = parrent.querySelector(".radio-img").src;
        radioCoverImg.src = urlImg;
        //radioItem переберем с помощью метода forEach. этот мтод принимает ф-цию, которая может принимать
        // каждый эл, индекс или сам массив, и у каждого итема через класслист будем удалять класс select
        radioItem.forEach(item => item.classList.remove("select"));
        // console.log(parrent);
        parrent.classList.add("select");
        //разблокируем кнопку Стоп
        radioStop.disabled = false;
        //у target есть св-во dataset
        // console.log(target.dataset.radioStantion);
        audio.src = target.dataset.radioStantion;
        //чобы радио заработало
        audio.play();
        //запустили музыку и вызываем смену иконки
        changeIconlay();
    });

    //делаем стоп для радио
    radioStop.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        }else{
            audio.pause();
        }
        changeIconlay();
    });

    


    // console.log("Radio Init")
};
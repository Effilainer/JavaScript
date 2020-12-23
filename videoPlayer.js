export const videoPlayerInit = () => { 
    console.log("Video Init");

// video-player
// video-button__play
// video-button__stop
// video-time__passed
// video-progress
// video-time__total
//video-fullscreen

    const videoPlayer = document.querySelector(".video-player"); //прописываем класс
    const videoButtonPlay = document.querySelector(".video-button__play");
    const videoButtonStop = document.querySelector(".video-button__stop");
    const videoProgress = document.querySelector(".video-progress");
    const videoTimePassed = document.querySelector(".video-time__passed");
    const videoTimeTotal = document.querySelector(".video-time__total");
    const videoVolume = document.querySelector(".video-volume");
    const videoFullScreen = document.querySelector(".video-fullscreen");

    //сделаем, чтобы при нажатии на паузу появлялась иконка паузы
    const toggleIcon = () => {
        if (videoPlayer.paused){ //если у нас видео на паузе
            videoButtonPlay.classList.remove("fa-pause"); //то удаляем иконку паузы и включаем плэй
            videoButtonPlay.classList.add("fa-play");  // и наоборот
        }else{ //если видео не на паузе
            videoButtonPlay.classList.remove("fa-play");// удаляем плэй и ставим на паузу
            videoButtonPlay.classList.add("fa-pause"); //и наоборот 
        }
    };

    //запускаем togglePlay по клику в videoPlayer.addEventListener("click", togglePlay);
    const togglePlay = event => {
        event.preventDefault()
        if (videoPlayer.paused){
            videoPlayer.play();
        }else{
            videoPlayer.pause();
        };
        toggleIcon(); //запускаем функцию сразу после того как запустили плеер или поставили на паузу
        //или по toggleIcon как написано ниже
    };

        //!!! чтобы пауза проигрывателя не перекраывала паузу браузера
    // const togglePlay = event => {
    //     preventDefault()
    //     if (videoPlayer.paused){
    //         videoPlayer.play();
    //     }else{
    //         videoPlayer.pause();
    //     }
    // };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    //добавляем нолики во время проигрывателя
    //условие ? (условие верно) : (условие ложь)
    //ф-ция принимает число. Если то число < 10 ?(то) добаляем 0 и само число(01,02):если n>10, т.е. 11, 20, то просто n выводится
    const addZero = n => n < 10 ? "0" + n : n;

    videoPlayer.addEventListener("click", togglePlay);
    videoButtonPlay.addEventListener("click", togglePlay);

    videoPlayer.addEventListener("play", toggleIcon);
    videoPlayer.addEventListener("pause", toggleIcon);

    videoButtonStop.addEventListener("click", stopPlay);


    videoPlayer.addEventListener("timeupdate", () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        //у videoProgress можем менять значение value, чтобы начала бежат прокрутка
        videoProgress.value = (currentTime/duration)*100;

        let minutePassed = Math.floor(currentTime/60); //получим количнство прошедших минут
        let secondsPassed = Math.floor(currentTime%60);//получаем остаток в секундах
        let minuteTotal = Math.floor(duration/60); //получим общее количетсво минут воспроизведения
        let secondsTotal = Math.floor(duration%60);

        // videoTimePassed.textContent = addZero(minutePassed) + ":" + addZero(secondsPassed); //присваиваем время в видео, где прошедшее время
        // videoTimeTotal.textContent = addZero(minuteTotal) + ":" + addZero(secondsTotal);
        //или
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener("change", () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        //куда кликнули на ползунке, туда и должны переключить
        videoPlayer.currentTime = (value*duration)/100;
    });

    //из трансляции
    const changeValue = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume/100;
    };

    videoVolume.addEventListener("input", changeValue);
   
    videoFullScreen.addEventListener("click", () => {
        videoPlayer.requestFullscreen();
    });
    console.dir(videoPlayer);

    videoPlayer.addEventListener("volumechange",() => {
        videoVolume.value = Math.round(videoPlayer.volume *100)
    });
    changeValue();
    // console.log(`Значение громости:${videoPlayer.volume}`);
    // document.body.innerHTML = `Значение громкости: ${videoPlayer.value}`;
};
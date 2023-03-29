let music = document.querySelector('#music');
let musicImg = document.querySelector('img');
let musicName = document.querySelector('.name');
let musicArtist = document.querySelector('.artist');
let musicDuration = document.querySelector('.max-duration');
let musicCurrentTime = document.querySelector('.current-time');
let musicNum = 1;

let playBtn = document.querySelectorAll('.playBtn');
let playlists = document.querySelector('.playlists');
let playPauseBtn = document.querySelector('.play-pause');
let playListMenuBtn = document.querySelector('.hdbtn-1');

let progressBar = document.querySelector('.progress-bar');
let progressArea = document.querySelector('.progress-area');

let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');
let repeatBtn = document.querySelector('#repeat-btn');
let closePlayListBtn = document.querySelector('.hdbtn-2');

let modal = document.querySelector('.modal');
let wrapper = document.querySelector('.wrapper');
let randomBtnMusic = document.querySelector('.bi-shuffle');
let volumeSlider = document.querySelector('.volume_slider');

const removePauseAddPlay = () => {
    playBtn = document.querySelectorAll('.playBtn');
    playBtn.forEach((btn) => {
        btn.classList.remove("bi-pause-fill");
        btn.classList.add("bi-play-fill");
    });
};

const musicPlayListClick = (event) => {
    musicNum = event.target.id;
    removePauseAddPlay();
    event.target.classList.add("selected");
    songs.filter((selectedSongs) => {
        if (selectedSongs.id == musicNum) {
            playListPlayBtn();
            music.src = `audio/${musicNum}.mp3`;
            musicImg.src = songs[musicNum - 1].cover;
            musicArtist.innerHTML = songs[musicNum - 1].artist;
            musicName.innerHTML = songs[musicNum - 1].songName;
            playMusic();
        };
    });
};

const loadMusic = (indexNumber) => {
    musicName.innerText = songs[indexNumber - 1].songName;
    musicArtist.innerText = songs[indexNumber - 1].artist;
    musicImg.src = `${songs[indexNumber - 1].cover}`;
    music.src = `${songs[indexNumber - 1].src}`;
};

const playMusic = () => {
    wrapper.classList.add("paused");
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    music.play();
    playListPlayBtn();
};

const pauseMusic = () => {
    wrapper.classList.remove("paused");
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
    music.pause();
    playListPauseBtn();
};

const playListPlayBtn = () => {
    document.getElementById(`${musicNum}`).classList.remove("bi-play-fill");
    document.getElementById(`${musicNum}`).classList.add("bi-pause-fill");
};

const playListPauseBtn = () => {
    document.getElementById(`${musicNum}`).classList.add("bi-play-fill");
    document.getElementById(`${musicNum}`).classList.remove("bi-pause-fill");
};

const setVolume = () => {
    music.volume = volumeSlider.value / 100;
};

const showingModalMessage = () => {
    modal.style.display = "inline";
    setTimeout(() => {
        modal.style.display = "none"
    }, 2500);
};

const prevMusic = () => {
    musicNum = musicNum - 1 < 1 ? songs.length : musicNum - 1;

    loadMusic(musicNum);
    removePauseAddPlay();
    playMusic();
};

const nextMusic = () => {
    musicNum = musicNum + 1 > songs.length ? 1 : musicNum + 1;

    loadMusic(musicNum);
    removePauseAddPlay();
    playMusic();
};

const musicTimeUpdate = (event) => {
    let duration = event.target.duration;
    let currentTime = event.target.currentTime;
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    let progressWidth = (currentTime / duration) * 100;

    progressBar.style.width = `${progressWidth}%`;
    currentSec = currentSec >= 10 ? currentSec : `0${currentSec}`;
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
};

const musicLoadData = () => {
    let mainAudDuration = music.duration;
    let totalMinMusic = Math.floor(mainAudDuration / 60);
    let totalSecMusic = Math.floor(mainAudDuration % 60);

    totalSecMusic = totalSecMusic >= 10 ? totalSecMusic : `0${totalSecMusic}`;
    musicDuration.innerText = `${totalMinMusic}:${totalSecMusic}`;
};

const songAdder = (items) => {
    let beforeendElement = `
        <li class="songItem">
            <h5>
                ${items.songName}
                <div class="songName">
                    ${items.artist}
                </div>
            </h5>
            <img loading="lazy" src="${items.cover}" alt="shad" />
            <i 
                onclick="musicPlayListClick(event)" 
                class="bi bi-play-fill playBtn"
                id="${items.id}">
            </i>
        </li>
    `
    playlists.insertAdjacentHTML('beforeend', beforeendElement)
};

const playOrPauseMusic = () => {
    let isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
};

const changeStatusPlay = () => {
    let getIcon = repeatBtn.className;

    switch (getIcon) {
        case 'bi bi-repeat':
            repeatBtn.className = 'bi bi-repeat-1';
            modal.innerHTML = 'تکرار آهنگ';
            showingModalMessage();
            break;

        case 'bi bi-repeat-1':
            repeatBtn.className = 'bi-shuffle'
            modal.innerHTML = 'پخش رندوم آهنگ ها';
            showingModalMessage();
            break;

        case 'bi-shuffle':
            repeatBtn.className = 'bi bi-repeat'
            modal.innerHTML = 'پخش عادی';
            showingModalMessage();
            break;
    };
};

const getRandomMusicID = () => {
    let randMusic = Math.floor((Math.random() * songs.length) + 1);
    while (musicNum == randMusic) {
        randMusic = Math.floor((Math.random() * songs.length) + 1);
    };
    return randMusic;
};

const musicEnded = () => {
    let getIcon = repeatBtn.className;

    switch (getIcon) {
        case 'bi bi-repeat':
            nextMusic();
            break;

        case 'bi bi-repeat-1':
            music.currentTime = 0;
            loadMusic(musicNum);
            playMusic();
            break;

        case 'bi-shuffle':
            musicNum = getRandomMusicID();
            removePauseAddPlay();
            loadMusic(musicNum);
            playMusic();
            break;
    };
};

const progressAreaAction = (e) => {
    let clickedOffsetX = e.offsetX;
    let songDuration = music.duration;
    let progressWidth = progressArea.clientWidth;

    music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
};

const playListMenuBtnFix = () => {
    playlists.style.display = 'flex';
    playlists.style.flexDirection = 'column';
    closePlayListBtn.style.display = 'block';
};

const closePlayListBtnFix = () => {
    playlists.style.display = 'none';
    closePlayListBtn.style.display = 'none';
};

(() => {
    songs.forEach(songAdder);

    prevBtn.addEventListener('click', prevMusic);
    nextBtn.addEventListener('click', nextMusic);

    music.addEventListener('ended', musicEnded);
    music.addEventListener("loadeddata", musicLoadData);
    music.addEventListener("timeupdate", musicTimeUpdate);

    repeatBtn.addEventListener('click', changeStatusPlay);
    playPauseBtn.addEventListener('click', playOrPauseMusic);
    playListMenuBtn.addEventListener('click', playListMenuBtnFix);
    closePlayListBtn.addEventListener('click', closePlayListBtnFix);

    progressArea.addEventListener('click', progressAreaAction);
    window.addEventListener("load", () => { loadMusic(musicNum); });
})();
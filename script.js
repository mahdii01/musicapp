let $=document;
let wrapper=$.querySelector('.wrapper');
let musicImg=$.querySelector('img');
let musicName=$.querySelector('.name');
let musicArtist=$.querySelector('.artist');
let playlists=$.querySelector('.playlists')
let playPuaseBtn=$.querySelector('.play-pause');
let prevBtn=$.querySelector('#prev');
let nextBtn=$.querySelector('#next');
let music=$.querySelector('#music');
let progressArea=$.querySelector('.progress-area');
let progressBar=$.querySelector('.progress-bar');
let musicCurrentTime=$.querySelector('.current-time');
let musicDuration=$.querySelector('.max-duration');
let playListMenuBtn=$.querySelector('.hdbtn-1');
let closePlayListBtn=$.querySelector('.hdbtn-2');
let randomBtnMusic=$.querySelector('.bi-shuffle')
let heartshape=$.querySelector('.bi-heart');
let modal = $.querySelector('.modal');
let repeatBtn = $.querySelector('#repeat-btn');
let volumeSlider = $.querySelector('.volume_slider');
let musicNum=1;


songs.forEach(function (items) {
    playlists.insertAdjacentHTML('beforeend','<li class="songItem"><h5>'+items.songName+'<div class="songName">'+items.artist+'</div></h5><img src="'+items.cover+'" alt="shad"><i onclick="musicPlaylistclick(event)" class="bi bi-play-fill playBtn" id="'+items.id+'"></i></li>')

});
let playBtn=$.querySelectorAll('.playBtn');
function removePauseAddPlay() {
    playBtn.forEach(function (btn) {
        btn.classList.remove("bi-pause-fill");
        btn.classList.add("bi-play-fill");
    })
}

function musicPlaylistclick(event) {
    musicNum=event.target.id;
    removePauseAddPlay();
    event.target.classList.add("selected");
    songs.filter(function (selctedSongs) {
        if (selctedSongs.id==musicNum) {
            playListPlayBtn();
            music.src = "audio/" + musicNum + ".mp3";
            musicImg.src = songs[musicNum - 1].cover;
            musicArtist.innerHTML = songs[musicNum - 1].artist;
            musicName.innerHTML = songs[musicNum - 1].songName;
            playMusic();
        }
    })
}

// let musicIndex=Math.floor((Math.random()*songs.length)+1);
isMusicPaused = true;

window.addEventListener("load",function () {
    loadMusic(musicNum);
});

function loadMusic(indexNumber) {
    musicName.innerText = songs[indexNumber-1].songName;
    musicArtist.innerText = songs[indexNumber-1].artist;
    musicImg.src = ''+songs[indexNumber - 1].cover+'';
    music.src = ''+songs[indexNumber - 1].src+'';
}

function playMusic() {
    wrapper.classList.add("paused");
    musicImg.classList.add('rotate');
    playPuaseBtn.innerHTML=`<i class="bi bi-pause-fill"></i>`;
    music.play();
    playListPlayBtn();
    
}
function pauseMusic() {
    wrapper.classList.remove("paused");
    musicImg.classList.remove('rotate');
    playPuaseBtn.innerHTML=`<i class="bi bi-play-fill"></i>`;
    // playingStatusText.innerHTML='';
    music.pause();
    playListPauseBtn();


}
// function playListPlayLoadIndex() {
//     $.getElementById(`${musicIndex}`).classList.remove("bi-play-fill");
//     $.getElementById(`${musicIndex}`).classList.add("bi-pause-fill");
// }
// function playListPauseLoadIndex() {
//     $.getElementById(`${musicIndex}`).classList.add("bi-play-fill");
//     $.getElementById(`${musicIndex}`).classList.pause("bi-pause-fill");
// }
//this is for when play button in player changes, buttons of playlist must change
function playListPlayBtn() {
    $.getElementById(`${musicNum}`).classList.remove("bi-play-fill");
    $.getElementById(`${musicNum}`).classList.add("bi-pause-fill");
}
function playListPauseBtn() {
    $.getElementById(`${musicNum}`).classList.add("bi-play-fill");
    $.getElementById(`${musicNum}`).classList.remove("bi-pause-fill");
}
function prevMusic() {
    musicNum--;
    if (musicNum < 1) {
        musicNum = songs.length
    } else {
        musicNum=musicNum;
    }
    loadMusic(musicNum);
    removePauseAddPlay();
    playMusic();
    playListPauseLoadIndex();
}
function nextMusic() {
    musicNum++;
    if (musicNum > songs.length) {
        musicNum = 1
    } else {
        musicNum=musicNum;
    }
    loadMusic(musicNum);
    removePauseAddPlay();
    playMusic();
}

playPuaseBtn.addEventListener('click',function () {
    const isMusicplay = wrapper.classList.contains("paused");
    if(isMusicplay){
        pauseMusic();
    }else{
        playMusic();
    }
})
prevBtn.addEventListener('click',prevMusic);
nextBtn.addEventListener('click',nextMusic);

music.addEventListener("timeupdate",function (event) {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width= progressWidth+'%';
    // console.log(progressBar);
    music.addEventListener("loadeddata",function () {
        let mainaudduration=music.duration;
        // console.log(mainaudduration);
        let totalMinmusic=Math.floor(mainaudduration / 60);
        let totalsecmusic=Math.floor(mainaudduration % 60);
        if (totalsecmusic < 10) {
            totalsecmusic='0'+totalsecmusic;
        }
        musicDuration.innerText= totalMinmusic+':'+totalsecmusic;
    });

    let currentMin=Math.floor(currentTime / 60);
    let currentsec=Math.floor(currentTime % 60);
    if (currentsec < 10) {
        currentsec = '0'+currentsec;
    }
    musicCurrentTime.innerText= currentMin+':'+currentsec;
});


progressArea.addEventListener('click',function (e) {
    // console.log(e.clientWidth);
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = music.duration;

    music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

//this is for loop shuffle music
music.addEventListener('ended' ,function () {
    let getIcon = repeatBtn.className;
    switch(getIcon){
        case 'bi bi-repeat':
            nextMusic();
            break;
        case 'bi bi-repeat-1':
            music.currentTime = 0;
            loadMusic(musicNum);
            playMusic();
            break;    
        case 'bi-shuffle':
            let randmusic = Math.floor((Math.random() * songs.length)+1);
            do{
                 randmusic = Math.floor((Math.random() * songs.length)+1);  
            }while (musicNum == randmusic) {
                musicNum = randmusic;
                removePauseAddPlay();
                loadMusic(musicNum);
                playMusic();
            }
            break;  

    }
});

playListMenuBtn.addEventListener('click',function () {
    playlists.style.display='inline';
    closePlayListBtn.style.display='block';
})
closePlayListBtn.addEventListener('click',function () {
    playlists.style.display='none';
    closePlayListBtn.style.display='none';
});
function setVolume(){
    music.volume = volumeSlider.value / 100;
}
function showingModalMesseage() {
modal.style.display="inline";
    setTimeout(function() {
        modal.style.display="none"
    }, 2500);
}
//changing icon
repeatBtn.addEventListener('click',function () {
    let getIcon = repeatBtn.className;
    switch(getIcon){
        case 'bi bi-repeat':
            repeatBtn.className = 'bi bi-repeat-1';
            modal.innerHTML = 'تکرار آهنگ';
            showingModalMesseage();
            break;
        case 'bi bi-repeat-1':
            repeatBtn.className = 'bi-shuffle'
            modal.innerHTML = 'پخش رندوم آهنگ ها';
            showingModalMesseage();
            break;    
        case 'bi-shuffle':
            repeatBtn.className = 'bi bi-repeat'
            modal.innerHTML = 'پخش عادی';
            showingModalMesseage();
            break;  

    }
})

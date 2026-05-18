let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.flac');

let currentSong = 1;


play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0){
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }
    else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
}) 

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #177200ff ${progress}% , #333 ${progress}%)`;
})

progressBar.addEventListener('input', function (){
    let value =this.value;
    this.style.background = `linear-gradient(to right, #177200ff ${value}% , #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) /100;
})


let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        let index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.flac`;
        audio.currentTime=0;
        audio.play();
        updateNowBar();
    })
})


let allMusic =Array.from(document.getElementsByClassName('music-card'));


let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;
let totalSongs = allMusic.length;

function getRandomSong() {
    return Math.floor(Math.random() * totalSongs) + 1;
}

shuffle.addEventListener('click', () => {
    if (!songOnShuffle){
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');
    }
})

repeat.addEventListener('click', () => {
    if (!songOnRepeat){
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})


playNextSong = () => {
    if (songOnShuffle) {
        currentSong = getRandomSong();
    } else {
        currentSong = currentSong >= totalSongs ? 1 : currentSong + 1;
    }
    audio.src = `Audio/${currentSong}.flac`;
    audio.currentTime=0;
    audio.play();
    updateNowBar();
}

playPrevSong = () => {
    if (songOnShuffle) {
        currentSong = getRandomSong();
    } else {
        currentSong = currentSong <= 1 ? totalSongs : currentSong - 1;
    }
    audio.src = `Audio/${currentSong}.flac`;
    audio.currentTime=0;
    audio.play();
    updateNowBar();
}



function updateNowBar() {
    nowBar.getElementsByTagName('img')[0].src = allMusic[currentSong - 1].getElementsByTagName('img')[0].src;
    nowBar.getElementsByClassName('img-title-info')[0].textContent = allMusic[currentSong - 1].getElementsByClassName('img-title')[0].textContent;
    nowBar.getElementsByClassName('img-des-info')[0].textContent = allMusic[currentSong - 1].getElementsByClassName('img-description')[0].textContent;
}





forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    if (songOnRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        playNextSong();
    }
})

backward.addEventListener('click', () => {
    playPrevSong();
})

// Initialize now bar with first song data on page load
updateNowBar();


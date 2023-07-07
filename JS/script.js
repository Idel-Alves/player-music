//Variables
let musics = [
    {title: "A Flute's Mourning", artist: "Aakash Gandhi", src: "/MUSICAS/A Flute's Mourning - Aakash Gandhi.mp3", img: "./ASSETS/james-owen-oFHMk5fD8-s-unsplash-AFlutes.jpg"},
    {title: "Savior", artist: "Telecasted", src: "/MUSICAS/Savior - Telecasted.mp3", img: "./ASSETS/jacek-dylag-hUHzaiAHuUc-unsplash-Savior.jpg"},
    {title: "Searching For Time", artist: "Telecasted", src: "/MUSICAS/Searching For Time - Telecasted.mp3", img: "./ASSETS/ana-grave-gHcWaeldgtQ-unsplash-ForTime.jpg"}
];

const playBtn = document.querySelector('.playBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const arrowBack = document.querySelector('.back');
const arrowNext = document.querySelector('.next');
let music = document.querySelector('audio');
let image = document.querySelector('img');
let nameMusic = document.querySelector('.description h2');
let nameArtist = document.querySelector('.description i');
let indexMusic = 0;


//Events
playBtn.addEventListener('click', playMusic);
pauseBtn.addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', updateBar);
music.addEventListener('loadeddata', durationMusic); // entender sobre esse evento
arrowBack.addEventListener('click', () => {
    indexMusic--;
    if(indexMusic < 0) {
        indexMusic = 2;
    }
    renderMusic(indexMusic);
    pauseMusic();
});
arrowNext.addEventListener('click', () => {
    indexMusic++;
    if(indexMusic > 2) {
        indexMusic = 0;
    }
    renderMusic(indexMusic);
    pauseMusic();
});

renderMusic(indexMusic);

//Functions

function renderMusic(index) {
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        nameMusic.textContent = musics[index].title;
        nameArtist.textContent = musics[index].artist;
        image.src = musics[index].img;
        durationMusic();
    });
};

function playMusic() {
    music.play();

    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
};

function pauseMusic() {
    music.pause();

    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
};

function updateBar() {
    let bar = document.querySelector('progress');
    bar.style.width = ((music.currentTime / music.duration) * 100) + '%';

    let elapsedTime = document.querySelector('.start');
    elapsedTime.textContent = formatTime(Math.floor(music.currentTime));
};

function formatTime(seconds) {
    let fieldMinutes = Math.floor(seconds / 60);
    let fieldSeconds = seconds % 60;

    if(fieldSeconds < 10) {
        fieldSeconds = '0' + fieldSeconds;
    }

    return fieldMinutes+ ':' +fieldSeconds;
};

// entender sobre essa funçao que fez o tempo de duração da musica aparecer 
function durationMusic(){
    let durationMusic = document.querySelector('.end');

    durationMusic.textContent = formatTime(Math.floor(music.duration));
};


const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Songs
const songs = ["hey", "summer", "ukulele"];

index = 2;
let song = songs[index];

playlist(song);

function playlist(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");

  if (audio.paused) {
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  }

  audio.play();
}

//pause song
function pauseSong() {
  musicContainer.classList.remove("play");

  if (!audio.paused) {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }

  audio.pause();
}

// Previous song
function prevSong() {
  index--;
  if (index < 0) {
    index = 2;
  }
  playlist(songs[index]);

  playSong();
}

// Next song
function nextSong() {
  index++;
  if (index > 2) {
    index = 0;
  }
  playlist(songs[index]);
  playSong();
}

// Update progress bar
function updateProgress() {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressValue}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth; //A Number, representing the viewable width of an element in pixels
  const progressPosition = e.offsetX; //A Number, representing the horizontal coordinate of the mouse pointer, in pixels

  const duration = audio.duration;

  audio.currentTime = (progressPosition / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("click", playSong);

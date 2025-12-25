console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songitems = Array.from(document.getElementsByClassName("songitem"));

let songs = [
  {
    songName: "Salam-e-Isque",
    filepath: "songs/1.mp3",
    coverpath: "covers/1.jpg",
  },
  { songName: "Hey boy", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
  {
    songName: "Unstoppable",
    filepath: "songs/3.mp3",
    coverpath: "covers/3.jpg",
  },
  { songName: "Perfect", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
  {
    songName: "Meri Bechaniya",
    filepath: "songs/5.mp3",
    coverpath: "covers/5.jpg",
  },
  {
    songName: "Let Me Down Slowly",
    filepath: "songs/6.mp3",
    coverpath: "covers/6.jpg",
  },
  {
    songName: "Someone You Loved",
    filepath: "songs/7.mp3",
    coverpath: "covers/7.jpg",
  },
  {
    songName: "Until I Found You",
    filepath: "songs/8.mp3",
    coverpath: "covers/8.jpg",
  },
  {
    songName: "Believer – Imagine Dragons",
    filepath: "songs/9.mp3",
    coverpath: "covers/9.jpg",
  },
  {
    songName: "See You Again",
    filepath: "songs/10.mp3",
    coverpath: "covers/10.jpg",
  },
];

// Function to format time in MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Load song durations and populate song items
songitems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

  // Load audio to get real duration
  const tempAudio = new Audio(songs[i].filepath);
  tempAudio.addEventListener("loadedmetadata", () => {
    const timeSpan = element.getElementsByClassName("time")[0];
    const duration = formatTime(tempAudio.duration);
    // Update only the text, keep the icon
    timeSpan.childNodes[0].nodeValue = duration;
  });
  tempAudio.addEventListener("error", () => {
    // If file doesn't exist, show "N/A"
    const timeSpan = element.getElementsByClassName("time")[0];
    timeSpan.childNodes[0].nodeValue = "N/A";
  });
});

// Helper function to update all play button icons
const updateAllPlayIcons = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element, i) => {
      if (i === songIndex && !audioElement.paused) {
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
      } else {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
      }
    }
  );
};

// Helper function to play a song
const playSong = (index) => {
  songIndex = index;
  audioElement.src = songs[index].filepath;
  masterSongName.innerText = songs[index].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  updateAllPlayIcons();
};

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    updateAllPlayIcons();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    updateAllPlayIcons();
  }
});

// Get time display elements
const currentTimeElement = document.getElementById("currentTime");
const totalTimeElement = document.getElementById("totalTime");

// Function to update slider background gradient
const updateSliderBackground = (slider) => {
  const value = slider.value;
  const max = slider.max || 100;
  const percentage = (value / max) * 100;
  slider.style.background = `linear-gradient(to right, #1db954 ${percentage}%, #535353 ${percentage}%)`;
};

// Update progress bar and time display
audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
    updateSliderBackground(myProgressBar);

    // Update current time display with animation
    currentTimeElement.textContent = formatTime(audioElement.currentTime);
    totalTimeElement.textContent = formatTime(audioElement.duration);
  }
});

// Handle progress bar input (dragging)
myProgressBar.addEventListener("input", () => {
  if (audioElement.duration) {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
    updateSliderBackground(myProgressBar);
  }
});

// Handle progress bar change (after drag)
myProgressBar.addEventListener("change", () => {
  if (audioElement.duration) {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
    updateSliderBackground(myProgressBar);
  }
});

// Auto-play next song when current song ends with 1 second delay
audioElement.addEventListener("ended", () => {
  setTimeout(() => {
    songIndex = (songIndex + 1) % 10; // Loop back to first song after last
    playSong(songIndex);
  }, 1000); // 1 second delay
});

// Add click listeners to individual song play buttons
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      const clickedIndex = parseInt(e.target.id);

      // If clicking the same song that's playing, toggle play/pause
      if (clickedIndex === songIndex && !audioElement.paused) {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        updateAllPlayIcons();
      } else {
        // Play the clicked song
        playSong(clickedIndex);
      }
    });
  }
);

// Next button click handler
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % 10; // Loop back to first song
  playSong(songIndex);
});

// Previous button click handler
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + 10) % 10; // Loop back to last song
  playSong(songIndex);
});

// Volume Control Functionality
const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");
const volumePercentage = document.getElementById("volumePercentage");
let previousVolume = 100;

// Update volume icon based on volume level
const updateVolumeIcon = (volume) => {
  if (volume == 0) {
    volumeIcon.className = "fas fa-volume-mute";
  } else if (volume < 50) {
    volumeIcon.className = "fas fa-volume-down";
  } else {
    volumeIcon.className = "fas fa-volume-up";
  }
};

// Handle volume slider change
volumeBar.addEventListener("input", () => {
  const volume = volumeBar.value;
  audioElement.volume = volume / 100;
  volumePercentage.textContent = volume + "%";
  updateVolumeIcon(volume);
  updateSliderBackground(volumeBar);
  if (volume > 0) {
    previousVolume = volume;
  }
});

// Handle volume icon click (mute/unmute)
volumeIcon.addEventListener("click", () => {
  if (audioElement.volume > 0) {
    // Mute
    previousVolume = volumeBar.value;
    audioElement.volume = 0;
    volumeBar.value = 0;
    volumePercentage.textContent = "0%";
    updateVolumeIcon(0);
    updateSliderBackground(volumeBar);
  } else {
    // Unmute
    audioElement.volume = previousVolume / 100;
    volumeBar.value = previousVolume;
    volumePercentage.textContent = previousVolume + "%";
    updateVolumeIcon(previousVolume);
    updateSliderBackground(volumeBar);
  }
});

// Set initial volume to 100%
audioElement.volume = 1;
updateSliderBackground(volumeBar);
updateSliderBackground(myProgressBar);

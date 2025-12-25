console.log("Welcome to Spotify");
// initialize the variables
let songIndex=0;
let audioElement= new Audio('songs/1.mp3');

let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songitems= Array.from(document.getElementsByClassName('songitem'));

let songs=   [
    {songName: "Salam-e-Isque", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName: "Hey boy", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName: "I am in the way", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName: "Das ka music", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName: "hey god", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName: "sidha sadha tha", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songName: "The Moon is bright", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songName: "A dark forest", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songName: "DD production music", filepath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songName: "Lets do some work", filepath: "songs/10.mp3", coverpath: "covers/10.jpg"}

];
songitems.forEach((element,i)=>{
   

element.getElementsByTagName("img")[0].src =songs[i].coverpath;
element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

});
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add("fa-pause-circle");
gif.style.opacity=1;
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity=0;
}
});

audioElement.addEventListener('timeupdate',()=>{
 
    //Update seekbar
progress= parseInt((audioElement.currentTime/audioElement.duration)*100);

myProgressBar.value= progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;

} );
const makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');   
    element.classList.add('fa-play-circle');

    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
console.log(e.target);
makeAllplays();

songIndex= parseInt(e.target.id);
e.target.classList.remove('fa-play-circle');
e.target.classList.add('fa-pause-circle');
audioElement.src= `songs/${songIndex+1}.mp3`;
masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add("fa-pause-circle");

})
});
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add("fa-pause-circle");
});
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;

audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add("fa-pause-circle");
});

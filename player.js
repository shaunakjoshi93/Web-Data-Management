window.addEventListener('load', function(){
    video = document.getElementById("video");
    
    playButton = document.getElementById("play_button");
    
    //sound
    soundButton = document.getElementById("sound_button");
    sbarContainer = document.getElementById("sbar_container");
    sbar = document.getElementById("sbar");
    
    //progress bar
    pbar = document.getElementById("pbar");
    pbarContainer = document.getElementById("pbar_container");
    
    fullScreenButton = document.getElementById("full_screen_button");
    
    timeField = document.getElementById("time_field");
    
    video.load();
    video.addEventListener('canplay', function(){
        playButton.addEventListener('click', playPauseFunc, false)
        pbarContainer.addEventListener('click', skipVideo, false)
        soundButton.addEventListener('click',  soundFunc, false)
        sbarContainer.addEventListener('click', updateVolumeFunc, false)
        fullScreenButton.addEventListener('click', fullScreenFunc, false)
    }, false);
}, false)


function playPauseFunc()
{
    if(video.paused)
    {
        video.play(); 
        playButton.src = "pause_b.jpg";
        update_pbar = window.setInterval(progressBarFunc, 25);
    }
    else
    {
        video.pause();
        playButton.src = "play_b.png";
        window.clearInterval(update_pbar);
    }
}

function progressBarFunc()
{
    var percentComplete = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentComplete + "%";
    timeField.innerHTML = timeFunction();
    if(video.ended)
    {
        window.clearInterval(update_pbar);
        playButton.src = "replay_b.jpg"
    }
}

function skipVideo(part)
{
    var cursorX = part.pageX - 350;
    var width = window.getComputedStyle(pbarContainer).getPropertyValue("width");
    width = parseFloat(width.substr(0, width.length - 2));
    video.currentTime = (cursorX / width) * video.duration;
    
    progressBarFunc();
}

function timeFunction()
{
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);
    
    if(minutes > 0)
    {
       seconds = seconds - minutes*60;
    }
    
    if(seconds.toString().length === 1)
    {
        seconds = '0' + seconds;
    }
    
    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds / 60);
    
    if(totalMinutes > 0)
    {
       totalSeconds = totalSeconds - totalMinutes*60;
    }
    
    if(totalSeconds.toString().length === 1)
    {
        totalSeconds = '0' + totalSeconds;
    }
    
    return minutes + ' : ' + seconds + ' / ' + totalMinutes + ' : ' + totalSeconds;
}

function soundFunc()
{
    if(!video.muted)
    {
        video.muted = true;
        soundButton.src = "mute.jpg"
        sbar.style.display = 'none';
    }
    else
    {
        video.muted = false;
        soundButton.src ="sound_b.png"
        sbar.style.display = "block";
    }
}

function updateVolumeFunc(ev)
{
    var mouseX = ev.pageX - 590;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));
    
    video.volume = (mouseX / width);
    sbar.style.width = (mouseX / width) * 100 + '%';
    video.muted = false;
    soundButton.src ="sound_b.png"
    sbar.style.display = "block";
}

function fullScreenFunc()
{
    if(video.requestFullscreen)
    {
        video.requestFullscreen();
    }
    else if(video.webkitRequestFullscreen)
    {
        video.webkitRequestFullscreen();
    }
    else if(video.mozRequestFullscreen)
    {
        video.mozRequestFullscreen();    
    }
    else if(video.msRequestFullscreen)
    {
         video.msRequestFullscreen();   
    }
}
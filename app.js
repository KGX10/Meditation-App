app = () => {
		const icon = document.querySelector(".play");
		const song = document.querySelector(".song");
		const video = document.querySelector(".bg-vid");
		const timedisplay = document.querySelector(".time-display");
		const circle = document.querySelector(".moving-outline circle");
		const timers = document.querySelectorAll(".timer-container button");
		const sounds = document.querySelectorAll(".sound-picker button")
		let duration = 600;
		let currentTime =0;


		let outlineLength = circle.getTotalLength();
		circle.style.strokeDasharray = outlineLength;
		circle.style.strokeDashoffset =outlineLength;

//Theme Picker
	sounds.forEach(sound =>{
		sound.addEventListener("click",function(){
			if(song.paused){
				song.src = this.getAttribute("data-sound");
				video.src = this.getAttribute("data-video");
				//New Feature
				let colorvalue = this.getAttribute("data-color");
				circle.setAttribute("stroke",colorvalue);
			}
		})
	})

//Change Timer Duration
	timers.forEach(option => {
		option.addEventListener("click",() =>{
			if(song.paused){
				duration = option.getAttribute("data-time");
				timedisplay.textContent=`${Math.floor(duration/60)}:${Math.floor(duration%60)}`;
				song.currentTime = 0;
			}
		})
	})

//Play Song
	icon.addEventListener("click" ,() =>{
		checkAudioStatus();
	})

	function checkAudioStatus () {
		if(song.paused){
			song.play();
			video.play();
			icon.src = "./svg/pause.svg";
		}else{
			song.pause();
			video.pause();
			icon.src = "./svg/play.svg"
		}
	}

	song.ontimeupdate = () => {
		currentTime = song.currentTime;
		let timeleft = duration - currentTime;
		let second = Math.floor(timeleft % 60);
		let minute = Math.floor(timeleft / 60);

		//Animate the circle
		circle.style.strokeDashoffset = outlineLength - (currentTime/duration)*outlineLength;
		//Animate the time-Counter;
		timedisplay.textContent = `${minute}:${second}`;

		//Reset
		if(currentTime >= duration){
			song.pause();
			video.pause();
			song.currentTime = 0;
			icon.src = "./svg/play.svg";
		}
	};

};


app(); 
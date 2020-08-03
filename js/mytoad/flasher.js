var flasher = function(game){
	flash_on = false;
	flicker_interval = null;
	flickingRate = 200;
	TINT_COLOR = 0xf55acc;
	
	circlesArray = [];
	soundBtns = [];
	soundBtnsTints = [0x79d0e2, 0x1ed760, 0xc3e347, 0xff82d4];

	GO_ANGLE = 25;
	AccelX = 0;
	
	HU_STATE = false;
	HA_STATE = false;
	
	MIDDLE_STATE = false;
	
	isInfinite = false;
	isVish = false;
	isNote = false;
};

flasher.prototype = {
    create: function(){ 
	    bgB = game.add.image(0, 0, 'black');
	    bgW = game.add.image(0, 0, 'white');
	    
		bgHot = game.add.image(0, 0, 'gradientHot');
		bgCold = game.add.image(0, 0, 'gradientCold');

	    bgW.alpha = 0;
	    
        distributeEmpty();
        
    	bigLogo = game.add.sprite(0, 0, 'logo');

    	light_btn = game.add.sprite(137, 41, 'light_btn');
	    light_btn.inputEnabled = true;
	    light_btn.events.onInputDown.add(flashIt, this);
	    light_btn.events.onInputUp.add(flash_off, this);
    	
    	vibrate_btn = game.add.sprite(160, 170, 'vibrate_btn');
	    vibrate_btn.inputEnabled = true;
	    vibrate_btn.events.onInputDown.add(goVibrate, this);
	    vibrate_btn.events.onInputUp.add(stopVibrate, this);
    	
    	flicker_btn = game.add.sprite(237, 28, 'flicker_btn');
	    flicker_btn.inputEnabled = true;
	    flicker_btn.events.onInputDown.add(goFlicker, this);
	    flicker_btn.events.onInputUp.add(stopFlicker, this);
	    
    	game.input.addPointer();
    	game.input.addPointer();
    	
        soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    	
    	soundBtns[0] = soundBtnsGroup.create(24, 20, 'sound_btn');
    	soundBtns[1] = soundBtnsGroup.create(16, 184, 'sound_btn');
    	soundBtns[2] = soundBtnsGroup.create(44, 315, 'sound_btn');
    	soundBtns[3] = soundBtnsGroup.create(221, 382, 'sound_btn');
 
	 	for (s = 0; s < soundBtnsTints.length; s++){
		    soundBtns[s].tint = soundBtnsTints[s];
		    soundBtns[s].inputEnabled = true;
	    	soundBtns[s].events.onInputDown.add(play_sound, this);
	    	soundBtns[s].events.onInputUp.add(stop_sound, this);	
	 	}

    	inf_btn = game.add.sprite(297, 440, 'inf_btn');
	    inf_btn.inputEnabled = true;
	    inf_btn.events.onInputDown.add(toggle_inf, this);
    	    	
    	vish_btn = game.add.sprite(297, 497, 'vish_btn');
	    vish_btn.inputEnabled = true;
	    vish_btn.events.onInputDown.add(toggle_vish, this);
	    
    	note_btn = game.add.sprite(297, 554, 'note_btn');
	    note_btn.inputEnabled = true;
	    note_btn.events.onInputDown.add(toggle_note, this);


    	wiper_btn = game.add.sprite(100, 470, 'empty');
	    wiper_btn.inputEnabled = true;
    	wiper_btn.tint = 0xbc85f9;
 
    	wiper = game.add.sprite(0, 0, 'wiper');
    	wiper.tint = 0xcc2242;
    	wiper.scale.set(0.3, 0.1);
        wiper.y = 536;
        wiper.x = 135;
        wiper.anchor.set(.5, 1);
	    
    	if (isMobile()){
    		startMic();
    	}
    	else{
			setTimeout(function(){
				getDevices();
			}, 500);
    	}
    	
    	window.addEventListener("devicemotion", readVisherAccel, true);
    	
    	soundToPlay = sound_logo.play();
    }, 
    update: function(){
    	if (isVish){
	    	if (wiper.angle < -GO_ANGLE && !HU_STATE){
				toad1Sfx.play();
				
		    	wiper_btn.tint = 0x79d0e2;
	
				HA_STATE = false;
				HU_STATE = true;
			}
	    	
	    	else if (wiper.angle > GO_ANGLE && !HA_STATE){    		
				toad2Sfx.play();
				
		    	wiper_btn.tint = 0x35ff00;
	
				HA_STATE = true;
				HU_STATE = false;
			}
		}
    }     
};

function toggle_inf(_this){
	if (!isInfinite){
		_this.tint = 0xffffff * 0.6;
		isInfinite = true;
	}
	else{
		_this.tint = 0xffffff;
		isInfinite = false;
	}
}

function toggle_vish(_this){
	if (!isVish){
		_this.tint = 0xffffff * 0.6;
		isVish = true;
	}
	else{
		_this.tint = 0xffffff;
		isVish = false;
	}
}

function toggle_note(_this){
	if (!isNote){
		_this.tint = 0xffffff * 0.6;
		isNote = true;
	}
	else{
		_this.tint = 0xffffff;
		isNote = false;
	}
}

function readVisherAccel(event){
	if (isVish){
		AccelX = event.accelerationIncludingGravity.x;

		wiper.angle = AccelX * 3;

		var alphaVal = (AccelX + 10) / 20;
		if (alphaVal < 0) alphaVal = 0;
		else if (alphaVal > 1) alphaVal = 1;
		
		bgHot.alpha = alphaVal - 0.2;
		bgCold.alpha = 1 - alphaVal - 0.2;
	}
	else{
		AccelY = event.accelerationIncludingGravity.y;
		
		if (AccelY < -5){
			if (!rainstick1Sfx.isPlaying && MIDDLE_STATE){
				rainstick1Sfx.play();
			}
			rainstick1Sfx._sound.playbackRate.value = Math.abs(AccelY) / 10;
			MIDDLE_STATE = false;
		}
		
		else if (AccelY > 5){
			if (!rainstick2Sfx.isPlaying && MIDDLE_STATE){
				rainstick2Sfx.play();
			}
			rainstick2Sfx._sound.playbackRate.value = Math.abs(AccelY) / 10;
			MIDDLE_STATE = false;
		}
		
		else if (AccelY > -2  && AccelY < 2){
			MIDDLE_STATE = true;
		}

		wiper.angle = AccelY * 3;

		var alphaVal = (AccelY + 10) / 20;
		if (alphaVal < 0) alphaVal = 0;
		else if (alphaVal > 1) alphaVal = 1;
		
		bgHot.alpha = alphaVal - 0.2;
		bgCold.alpha = 1 - alphaVal - 0.2;	
	}
}

function startMic(){
	try{
		window.audioinput.checkMicrophonePermission(function(hasPermission) {
			if (hasPermission){
				webaudio_tooling_obj();
			}
		    else{
		        window.audioinput.getMicrophonePermission(function(hasPermission, message) {
		        	if (hasPermission) {
						webaudio_tooling_obj();		
		        	}
		        	else{
		        		alert('Microphone permission needed for app to work!');
		        	}
		        });
		    }
		});
	} catch(e){
		alert('Please give microphone permission via Settings > Apps ' + e);
	}  
}

function distributeEmpty(){
	circles = game.add.group();
    circles.enableBody = true;
    circles.physicsBodyType = Phaser.Physics.ARCADE;

	circlesArray[0] = circles.create(40, 135, 'empty');
	circlesArray[1] = circles.create(45, 440, 'empty');
	circlesArray[2] = circles.create(140, 410, 'empty');
	circlesArray[3] = circles.create(50, 560, 'empty');
	circlesArray[4] = circles.create(312, 130, 'empty');
	circlesArray[5] = circles.create(275, 305, 'empty');

	for (var i=0; i < circlesArray.length; i++) {
		circlesArray[i].alpha = 0;
		circlesArray[i].anchor.set(.5, .5);
		circlesArray[i].tint = 0xffffff * Math.random();
	};	
}

function goVibrate(_this){
	if (isInfinite && _this.tint == TINT_COLOR){
		if (isMobile()) navigator.vibrate(0);		
		_this.tint = 0xffffff;
		game.camera.shake(0, 0);
	}
	else{
		if (isMobile()) navigator.vibrate(120000);
		_this.tint = TINT_COLOR;
		game.camera.shake(0.003, 120000);
	}
}

function stopVibrate(_this){
	if (!isInfinite){
		if (isMobile()) navigator.vibrate(0);		
		_this.tint = 0xffffff;
		game.camera.shake(0, 0);	
	}
}

function goFlicker(_this){
	if (isInfinite && flicker_interval != null){
		_this.tint = 0xffffff;
		
		if (flicker_interval != null){
			clearInterval(flicker_interval);
			flicker_interval = null;
		}
		
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
	}
	else{
		_this.tint = TINT_COLOR;
	
		flicker_interval = setInterval(function(){
			if (window.plugins.flashlight.isSwitchedOn()){
				window.plugins.flashlight.switchOff();
				navigator.vibrate(0);
				game.camera.shake(0, 0);
			}
			else{
				window.plugins.flashlight.switchOn();
				navigator.vibrate(flickingRate);
				game.camera.flash(0xffffff, flickingRate);
				game.camera.shake(0.004, flickingRate);
			}
		}, flickingRate);
	}
}

function stopFlicker(_this){
	if (!isInfinite){
		_this.tint = 0xffffff;
		
		if (flicker_interval != null){
			clearInterval(flicker_interval);
			flicker_interval = null;
		}
		
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
	}
}

function play_sound(_this){	
	var num = soundBtns.indexOf(_this);
		
	if (isInfinite && allSounds[num].isPlaying){
		_this.tint = soundBtnsTints[num];
		allSounds[num].stop(); 	
	}
	
	else{
		_this.tint =  soundBtnsTints[num] * 0.8;
		allSounds[num].play();
	}
}

function stop_sound(_this){
	if (!isInfinite){
		var num = soundBtns.indexOf(_this);
		
		_this.tint = soundBtnsTints[num];
		allSounds[num].stop(); 
	}
}

function flashIt(_this){
	if (isInfinite && flash_on){
		if (isMobile()){
			window.plugins.flashlight.switchOff();
		}
		
		value = 255;
	
	    game.add.tween(bgW).to( { alpha: 0 }, 200, "Linear", true);
	    game.add.tween(bgB).to( { alpha: 1 }, 0, "Linear", true);
	
		_this.tint = 0xffffff;
		flash_on = false;
	}
	else{
		if (!flash_on){
			if (isMobile()){
				window.plugins.flashlight.switchOn();
			}
			
			_this.tint = TINT_COLOR;
			flash_on = true;
			
			value = 0;
		    
		    game.add.tween(bgW).to( { alpha: 1 }, 200, "Linear", true);
		    game.add.tween(bgB).to( { alpha: 0 }, 0, "Linear", true);
	  	    
		}
	}
}

function flash_off(_this){
	if (!isInfinite){
		if (isMobile()){
			window.plugins.flashlight.switchOff();
		}
		
		value = 255;
	
	    game.add.tween(bgW).to( { alpha: 0 }, 200, "Linear", true);
	    game.add.tween(bgB).to( { alpha: 1 }, 0, "Linear", true);
	
		_this.tint = 0xffffff;
		flash_on = false;
	}
}

/* general functions */

function loadSounds(){   
	sound_logo = game.add.audio('sound_logo');
	
	toad1Sfx = game.add.audio('toad1Sfx', 1, false);
	toad2Sfx = game.add.audio('toad2Sfx', 1, false);
	
	clapSfx = game.add.audio('clapSfx', 1, true);
	booSfx = game.add.audio('booSfx', 1, true);
	cheerSfx = game.add.audio('cheerSfx', 1, true);
	laughSfx = game.add.audio('laughSfx', 1, true);
	
	rainstick1Sfx = game.add.audio('rainstick1', 1, false);
	rainstick2Sfx = game.add.audio('rainstick2', 1, false);
	
	allSounds = [clapSfx, cheerSfx, laughSfx, booSfx];
}

function isMobile(){
    return /Mobi|Android/i.test(navigator.userAgent);
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep device awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(80, false);} catch(e){} // change device media volume to maximum
}
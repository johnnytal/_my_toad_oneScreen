var flasher = function(game){
	flash_on = false;
	flicker_interval = null;
	flickingRate = 200;
	TINT_COLOR = 0xf55acc;
	
	circlesArray = [];
	soundBtns = [];
	soundBtnsTints = [0x79d0e2, 0x1ed760, 0xc3e347, 0xff82d4];
	
	visherOn = true;
	
	GO_ANGLE = 25;
	AccelX = 0;
	HU_STATE = false;
	HA_STATE = false;
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
	    light_btn.events.onInputDown.add(flash, this);
	    light_btn.events.onInputUp.add(flash, this);
    	
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

    	wiper_btn = game.add.sprite(100, 470, 'empty');
	    wiper_btn.inputEnabled = true;
	   // wiper_btn.events.onInputDown.add(toggleVisher, this);
    	wiper_btn.tint = 0xbc85f9;
 
    	wiper = game.add.sprite(0, 0, 'wiper');
    	wiper.tint = 0xff0042;
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
};

function readVisherAccel(event){
	if (visherOn){
		AccelX = event.accelerationIncludingGravity.x;

		wiper.angle = AccelX * 3;

		var alphaVal = (AccelX + 10) / 20;
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
	if (isMobile()) navigator.vibrate(120000);
	_this.tint = TINT_COLOR;
	game.camera.shake(0.003, 120000);
}

function stopVibrate(_this){
	if (isMobile()) navigator.vibrate(0);		
	_this.tint = 0xffffff;
	game.camera.shake(0, 0);	
}

function goFlicker(_this){
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
			game.camera.shake(0.003, flickingRate);
		}
	}, flickingRate);
}

function stopFlicker(_this){
	_this.tint = 0xffffff;
	
	if (flicker_interval != null){
		clearInterval(flicker_interval);
		flicker_interval = null;
	}
	
	if (window.plugins.flashlight.isSwitchedOn()){
		window.plugins.flashlight.switchOff();
	}
}

function play_sound(_this){
	_this.tint = TINT_COLOR;
	clapSfx.play();
}

function stop_sound(_this){
	num = soundBtns.indexOf(_this);
	_this.tint = soundBtnsTints[num];
	clapSfx.stop(); 
}

function flash(_this){
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
	else{
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
	clapSfx = game.add.audio('clapSfx', true);
	toad1Sfx = game.add.audio('toad1Sfx');
	toad2Sfx = game.add.audio('toad2Sfx');
}

function converToHex(_color){
	return _color.toString(16);
}

function isMobile(){
    return /Mobi|Android/i.test(navigator.userAgent);
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep device awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(80, false);} catch(e){} // change device media volume to maximum
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}
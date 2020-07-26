var flasher = function(game){
	flash_on = false;
	flicker_interval = null;
	flickingRate = 200;
	TINT_COLOR = 0xf55acc;
	
	circlesArray = [];
	
	visherOn = true;
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
	    
    	sound_btn = game.add.sprite(24, 20, 'sound_btn');
    	sound_btn.tint = 0x79d0e2;
	    sound_btn.inputEnabled = true;
	    sound_btn.events.onInputDown.add(play_sound, this);
	    
    	if (isMobile()){
    		startMic();
    	}
    	else{
			setTimeout(function(){
				getDevices();
			}, 500);
    	}
    	
    	window.addEventListener("devicemotion", readVisherAccel, true);

    }, 
    update: function(){}     
};

function readVisherAccel(event){
	if (visherOn){
		var AccelX = event.accelerationIncludingGravity.x;
		
		//bigLogo.angle = AccelX;
		
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
	soundToPlay = sound_logo.play();
	
	setTimeout(function(){
    	 _this.tint = 0x79d0e2;
    }, soundToPlay.durationMS); 
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

function droppingLogos(StartX, velY){
	logoDrop = game.add.sprite(StartX, 0, 'drop');
	
	logoDrop.tint = 0xffffff * Math.random();
	
	game.physics.enable(logoDrop, Phaser.Physics.ARCADE);
    
    logoDrop.body.velocity.setTo(0, velY);

    tween = game.add.tween(logoDrop).to( { alpha: 0 }, 5000, "Linear", true);
    tween.onComplete.add(function(){ logoDrop.destroy; }, this);
}

/* general functions */

function loadSounds(){   
	sound_logo = game.add.audio('sound_logo');
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
    try{window.androidVolume.setMusic(50, false);} catch(e){} // change device media volume to maximum
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}
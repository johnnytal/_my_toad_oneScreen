var shaker = function(game){
	DEFAULT_COLOR = converToHex(colors[1]);
	FRONT_COLOR = converToHex(colors[6]);
	BACK_COLOR = converToHex(colors[0]);	

	aveAccel = 0;
	accelX = 0;
	angle = 0;

	lastAccel = 0;
	lastAngle = 0;
	
	last_accelX = 0;
	
	lastAction = '';

	config = { // 0.8, 0.35, 0.35, 0
		MIN_ACCEL_F: 0.75,
		MIN_ACCEL_B: 0.4, 
		MIN_ANGLE_F: 0.4, 
		MIN_ANGLE_B: 0.1, 
		VOL_FACTOR: false,
		SHAKER_SOUND: false
	};
};

shaker.prototype = {
    create: function(){  
    	initState(DEFAULT_COLOR);
    	
		shakingSounds = [bellFsfx, bellBsfx];

		logo = game.add.image(0, 0, 'bigLogo');		       
        logo.anchor.set(.5, .5);
        logo.x = game.world.centerX;
        logo.y = game.world.centerY - 100;

        debug_text_shaker = game.add.text(250, 850, "Shake it!", {font: '32px', fill: 'black'});
        debug_text_shaker.anchor.set(.5, .5);
        debug_text_shaker.x = game.world.centerX;

		try{window.addEventListener('deviceorientation', function(){
			angle = event.gamma;
		});} catch(e){}
			
		try{window.addEventListener('devicemotion', readAcc);} catch(e){}
		
		startGUI();
    }
};

function startGUI() {
    gui = new dat.GUI({ width: 300 });
    
    gui.add(config, 'MIN_ACCEL_F', 0, 1.5).name('min accel fwd');
    gui.add(config, 'MIN_ACCEL_B', 0, 0.7).name('min accel bck');
    gui.add(config, 'MIN_ANGLE_F', 0, 0.7).name('min angle fwd');
    gui.add(config, 'MIN_ANGLE_B', 0, 0.5).name('min angle bck');
    gui.add(config, 'VOL_FACTOR').name('Volume factor');
    gui.add(config, 'SHAKER_SOUND').name('Shaker sound').onFinishChange(changeShakeSound);

   // if (isMobile()) gui.close();
}

function readAcc(event){
	if (game.state.getCurrentState().key == 'Shaker'){
		var accelX = event.accelerationIncludingGravity.x;
		var aveAccel = (event.accelerationIncludingGravity.x + event.accelerationIncludingGravity.z) / 2;
	
		if (!shakingSounds[0].isPlaying && !shakingSounds[1].isPlaying){
			if (Math.abs(lastAccel - aveAccel) > config.MIN_ACCEL_F && angle - lastAngle > config.MIN_ANGLE_F
			&& accelX < last_accelX - 0.95){ 
				if (lastAction != 'FRONT'){
					if (config.VOL_FACTOR) shakingSounds[0].volume = Math.abs(lastAccel - aveAccel);
					shakingSounds[0].play();
					
					flashShaker(FRONT_COLOR);
					
					lastAction = 'FRONT';
					
					last_accelX = event.accelerationIncludingGravity.x;
				}
			}
			
			else if(Math.abs(lastAccel - aveAccel) > config.MIN_ACCEL_B && angle - lastAngle < config.MIN_ANGLE_B
			&& accelX > last_accelX + 0.95){	
				if (lastAction != 'BACK'){
					if (config.VOL_FACTOR) shakingSounds[1].volume = Math.abs(lastAccel - aveAccel);
					shakingSounds[1].play();
					
					flashShaker(BACK_COLOR);
					
					lastAction = 'BACK';
					
					last_accelX = event.accelerationIncludingGravity.x;
				}
			}
		}

		//debug_text_shaker.text = roundIt(Math.abs(lastAccel - aveAccel));
		
		lastAngle = angle;
		lastAccel = aveAccel;
	}
}

function changeShakeSound(){
	if (!config.SHAKER_SOUND){
		shakingSounds = [bellFsfx, bellBsfx];
	}		
	else{
		shakingSounds = [shakerFsfx, shakerBsfx];
	}
}

function flashShaker(_color){
	if (_color == FRONT_COLOR){
		window.plugins.flashlight.switchOn();	
		navigator.vibrate(60);
	}
	else{
		navigator.vibrate(40);
	}
	
	game.stage.backgroundColor = _color;

	setTimeout(function(){ // back to normal
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
		game.stage.backgroundColor = DEFAULT_COLOR;
	}, 75);
}
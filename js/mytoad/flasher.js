var flasher = function(game){
	flash_on = false;
};

flasher.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#ffffff';
    	bigLogo = game.add.sprite(0, 0, 'logo');
    	
    	light_btn = game.add.sprite(137, 42, 'light_btn');
	    light_btn.inputEnabled = true;
	    light_btn.events.onInputDown.add(flash, this);
	    light_btn.events.onInputUp.add(flash, this);
		    
    }
};

function flash(_this){
	if (!flash_on){
		_this.tint = 0xf55acc;

		if (isMobile()){
			window.plugins.flashlight.switchOn();
		}
		
		flash_on = true;
	}
	else{
		if (isMobile()){
			window.plugins.flashlight.switchOff();
		}

		_this.tint = 0xffffff;
		
		flash_on = false;
	}
}



/* general functions */

function loadSounds(){   
	sound_logo = game.add.audio('sound_logo');
	
	huSfx = game.add.audio('hu', 1);
	haSfx = game.add.audio('ha', 1);

	shakerFsfx = game.add.audio('front', 1);
	shakerBsfx = game.add.audio('back', 1);
	bellFsfx = game.add.audio('c', 1);
	bellBsfx = game.add.audio('g', 1);
	
    click1 = game.add.audio('clanck', 0.2);
    click2 = game.add.audio('clap', 0.2);
    click3 = game.add.audio('scrape', 0.2);
    click4 = game.add.audio('snap', 0.2);

    sfx1 = game.add.audio('bd', 1);
    sfx2 = game.add.audio('clanck', 1);
    sfx3 = game.add.audio('clap', 1);
    sfx4 = game.add.audio('cymble', 1);
    sfx5 = game.add.audio('hh', 1);
    sfx6 = game.add.audio('snr', 1);
    sfx7 = game.add.audio('pluck', 1);
    sfx8 = game.add.audio('scrape', 1);
    sfx9 = game.add.audio('snap', 1);
    sfx10 = game.add.audio('vox1', 1);
    sfx11 = game.add.audio('vox2', 1);
    sfx12 = game.add.audio('vox3', 1); 
    
    note1 = game.add.audio('C4');
    note2 = game.add.audio('Db4');
    note3 = game.add.audio('D4');
    note4 = game.add.audio('Eb4');
    note5 = game.add.audio('E4');
    note6 = game.add.audio('F4');
    note7 = game.add.audio('Gb4');
    note8 = game.add.audio('G4');
    note9 = game.add.audio('Ab4');
    note10 = game.add.audio('A4');
    note11 = game.add.audio('Bb4');
    note12 = game.add.audio('B4');
}

function initState(_color){    	
	bg = game.add.image(0, 0, 'bg');
	bg.alpha = 0.8;

	game.stage.backgroundColor = _color;
    	
    buttons = game.add.group();
    
    for (n = 0; n < btn_keys.length; n++){
    	btn = buttons.create(10 + (n % 3) * (WIDTH / 3), 800, btn_keys[n]);
    	if (n <= 2) btn.y = HEIGHT - btn.height * 2 - 70;
    	else { btn.y = HEIGHT - btn.height - 40; }
    	
    	btn.scale.set(1, 1.15);
    	
        btn.inputEnabled = true;
	    btn.events.onInputDown.add(goToState, this);
	    
	    if (btn_keys[n].slice(4) == state){
	    	btn.tint = CHOSEN_TINT;
	    }
    }
    
	game.add.image(0,  HEIGHT - btn.height - 160, 'seperator').scale.set(4, 1.5);
}

function goToState(_this){    
    click4.play();
    
	if (isMobile()){
		navigator.vibrate(0);

		if (game.state.getCurrentState().key == 'Flasher'){
			resetFlickerTimer();
			flash_on = false;
			flicker_on = false;
		}
		
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
	}
	
	if (game.state.getCurrentState().key == 'Shaker'){
		gui.destroy();
	}
	
	if (game.state.getCurrentState().key == 'Riddles'){
		try{clearTimeout(riddleTimer);} catch(e){};
	}

	state = _this.key.slice(4);
    game.state.start(state);
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
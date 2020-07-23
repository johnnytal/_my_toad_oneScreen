var flasher = function(game){
	flash_on = false;
};

flasher.prototype = {
    create: function(){ 
    	bigLogo = game.add.sprite(0, 0, 'logo');

    	light_btn = game.add.sprite(137, 41, 'light_btn');
	    light_btn.inputEnabled = true;
	    light_btn.events.onInputDown.add(flash, this);
	    light_btn.events.onInputUp.add(flash, this);
    }   
};



function flash(_this){
	if (!flash_on){
		if (isMobile()){
			window.plugins.flashlight.switchOn();
		}
		
		_this.tint = 0xf55acc;
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
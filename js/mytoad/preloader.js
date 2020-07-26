var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.image('logo', 'assets/mytoad/images/bigLogo.png');
        game.load.image('light_btn', 'assets/mytoad/images/light_btn.png');
        game.load.image('vibrate_btn', 'assets/mytoad/images/vibrate_btn.png');
        game.load.image('sound_btn', 'assets/mytoad/images/sound_btn.png');
        game.load.image('flicker_btn', 'assets/mytoad/images/flicker_btn.png');
        game.load.image('drop', 'assets/mytoad/images/drop.png');
        game.load.image('empty', 'assets/mytoad/images/empty.png');

        game.load.audio('sound_logo', 'assets/mytoad/audio/sound_logo.mp3');
    },
    
    create: function(){
    	loadSounds();
    	initPlugIns();
    	
        this.game.state.start("Flasher"); 
    }
};
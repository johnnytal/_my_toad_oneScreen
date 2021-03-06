var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.image('logo', 'assets/mytoad/images/bigLogo.png');
        game.load.image('light_btn', 'assets/mytoad/images/light_btn.png');
        game.load.image('vibrate_btn', 'assets/mytoad/images/vibrate_btn.png');
        game.load.image('sound_btn', 'assets/mytoad/images/sound_btn.png');
        game.load.image('flicker_btn', 'assets/mytoad/images/flicker_btn.png');
        game.load.image('empty', 'assets/mytoad/images/empty.png');
        
        game.load.image('white', 'assets/mytoad/images/white.png');
        game.load.image('black', 'assets/mytoad/images/black.png');
        
        game.load.image('inf_btn', 'assets/mytoad/images/inf_btn.png');
        game.load.image('note_btn', 'assets/mytoad/images/note_btn.png');
        game.load.image('vish_btn', 'assets/mytoad/images/vish_btn.png');
        
        game.load.image('gradientHot', 'assets/mytoad/images/color-gradient-background.jpg');
        game.load.image('gradientCold', 'assets/mytoad/images/color-gradient-background_cold.jpg');
        game.load.image('wiper', 'assets/mytoad/images/wiper.png');

        game.load.audio('sound_logo', 'assets/mytoad/audio/sound_logo.mp3');
        game.load.audio('toad1Sfx', 'assets/mytoad/audio/toad1.mp3');
        game.load.audio('toad2Sfx', 'assets/mytoad/audio/toad2.mp3');
        game.load.audio('clapSfx', 'assets/mytoad/audio/apllause.mp3');
        game.load.audio('booSfx', 'assets/mytoad/audio/boo.mp3');
        game.load.audio('cheerSfx', 'assets/mytoad/audio/cheer.mp3');
        game.load.audio('laughSfx', 'assets/mytoad/audio/laugh.mp3');
        
        game.load.audio('rainstick1', 'assets/mytoad/audio/rainstick1.mp3');
        game.load.audio('rainstick2', 'assets/mytoad/audio/rainstick2.mp3');
    },
    
    create: function(){
    	loadSounds();
    	initPlugIns();
    	
        this.game.state.start("Flasher"); 
    }
};
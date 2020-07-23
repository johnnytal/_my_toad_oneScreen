var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.image('logo', 'assets/mytoad/images/bigLogo.png');
        game.load.image('light_btn', 'assets/mytoad/images/light_btn.png');

        game.load.audio('bd', 'assets/mytoad/audio/percz/bd.mp3');
        game.load.audio('clanck', 'assets/mytoad/audio/percz/clanck.mp3');
        game.load.audio('clap', 'assets/mytoad/audio/percz/clap.mp3');
        game.load.audio('cymble', 'assets/mytoad/audio/percz/cymble.mp3');
        game.load.audio('hh', 'assets/mytoad/audio/percz/hh.mp3');
        game.load.audio('pluck', 'assets/mytoad/audio/percz/pluck.mp3');
        game.load.audio('scrape', 'assets/mytoad/audio/percz/scrape.mp3');
        game.load.audio('snap', 'assets/mytoad/audio/percz/snap.mp3');
        game.load.audio('snr', 'assets/mytoad/audio/percz/snr.mp3');
        game.load.audio('vox1', 'assets/mytoad/audio/percz/vox1.mp3');
        game.load.audio('vox2', 'assets/mytoad/audio/percz/vox2.mp3');
        game.load.audio('vox3', 'assets/mytoad/audio/percz/vox3.mp3');
        
        game.load.audio('C4', 'assets/mytoad/audio/notes/C4.mp3');
        game.load.audio('Db4', 'assets/mytoad/audio/notes/Db4.mp3');
        game.load.audio('D4', 'assets/mytoad/audio/notes/D4.mp3');
        game.load.audio('Eb4', 'assets/mytoad/audio/notes/Eb4.mp3');
        game.load.audio('E4', 'assets/mytoad/audio/notes/E4.mp3');
        game.load.audio('F4', 'assets/mytoad/audio/notes/F4.mp3');
        game.load.audio('Gb4', 'assets/mytoad/audio/notes/Gb4.mp3');
        game.load.audio('G4', 'assets/mytoad/audio/notes/G4.mp3');
        game.load.audio('Ab4', 'assets/mytoad/audio/notes/Ab4.mp3');
        game.load.audio('A4', 'assets/mytoad/audio/notes/A4.mp3');
        game.load.audio('Bb4', 'assets/mytoad/audio/notes/Bb4.mp3');
        game.load.audio('B4', 'assets/mytoad/audio/notes/B4.mp3');

        game.load.audio('back', 'assets/mytoad/audio/back.mp3');
        game.load.audio('front', 'assets/mytoad/audio/front.mp3');
        game.load.audio('g', 'assets/mytoad/audio/g.mp3');
        game.load.audio('c', 'assets/mytoad/audio/c.mp3');
        
        game.load.audio('hu', 'assets/mytoad/audio/hu.mp3');
        game.load.audio('ha', 'assets/mytoad/audio/ha.mp3');
        
        game.load.audio('sound_logo', 'assets/mytoad/audio/sound_logo.mp3');
    },
    
    create: function(){
    	loadSounds();
    	initPlugIns();
    	
        this.game.state.start("Flasher"); 
    }
};
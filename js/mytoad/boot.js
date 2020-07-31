//window.onload = start;
document.addEventListener("deviceready", start, false);

function start(){
    WIDTH = 360; 
    HEIGHT = 616; 

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.WEBGL, "game", null, false);  

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    
    game.state.add("Flasher", flasher);

    
    game.state.start("Boot");  
}

var boot = function(game){};
  
boot.prototype = {
    create: function(){
        if (this.game.device.desktop){
           // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        
        else {
          /*  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
			this.scale.maxHeight = window.innerWidth * window.devicePixelRatio;*/

            this.scale.forceOrientation(false, true);
        }
        
        game.state.start("Preloader"); 
    }
};
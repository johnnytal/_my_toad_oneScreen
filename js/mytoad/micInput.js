audioContext = new AudioContext();

timeRadius = 0;
oldDrawX = 0;
oldDrawY = 0;
input = null;
radius = 0;
sprite = null;
oldTime = 0;
oldNote = 0;

averageValue = 0;
largestFreq = 0;
largestValue = 0;
currentValue = 0;

BUFF_SIZE = 16384;

audioInput = null,
microphone_stream = null,
gain_node = null,
script_processor_node = null,
script_processor_fft_node = null,
analyserNode = null;
    
function webaudio_tooling_obj() {
    if (!navigator.getUserMedia)
            navigator.mediaDevices.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia){
        navigator.getUserMedia({audio:true}, 
          function(stream) {
              start_microphone(stream);
          },
          function(e) {
              alert('getUserMedia: ' + e);
          }
        );
    } else { alert('getUserMedia not supported in this browser.'); }  
}

function start_microphone(stream){
	      gain_node = audioContext.createGain();
	      gain_node.connect( audioContext.destination );
	
	      microphone_stream = audioContext.createMediaStreamSource(stream);
	      microphone_stream.connect(gain_node); 
	
	      script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);

	      microphone_stream.connect(script_processor_node);
	
	      gain_node.gain.value = 0;
	
	      script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
	      script_processor_fft_node.connect(gain_node);
	
	      analyserNode = audioContext.createAnalyser();
	
	      analyserNode.smoothingTimeConstant = 0;
	      analyserNode.fftSize = 2048;
	
	      microphone_stream.connect(analyserNode);
	
	      analyserNode.connect(script_processor_fft_node);
	
	      script_processor_fft_node.onaudioprocess = function() {
	      	 array = new Uint8Array(analyserNode.frequencyBinCount);
	      	 analyserNode.getByteFrequencyData(array);

             for (var i = 0; i < array.length; i++) {
            	 averageValue += array[i];
            	 try{
            	 	circlesArray[i].scale.set(array[(i + 2) * 2] / 100, array[(i + 2) * 2] / 100);
            	 } catch(e){}
             }
             
             averageValue = averageValue / array.length - 1;
             largestValue = Math.max.apply(null, array);
             largestFreq = array.indexOf(largestValue);
             
             for (var i = 0; i < circlesArray.length; i++) {
             	circlesArray[i].alpha = 0.2 + averageValue / 10;
             }
             
             /*if (averageValue > 4){
             	droppingLogos(largestFreq * (game.scale.width / 120), averageValue * 32);
			 }*/
	   	 	/* value = Math.round(averageValue * 8);
	  	 	 if (value > 255) value = 255;
	  	 	 else if (value < 0) value = 0;
	
	  	 	 game.stage.backgroundColor = 'rgba(' + value + ', ' + value + ',' + value + ',' + 1 + ')';*/ 
         };      
     }

async function getDevices() {     
	const devices = await navigator.mediaDevices.enumerateDevices();
	audioDevices = devices.filter(device => device.kind === 'audioinput');

	navigator.getUserMedia( { audio: {deviceId: audioDevices[2].deviceId} },
        function(stream) {
    		start_microphone(stream);
        },
        function(e) {
            alert(e);
        }
	);
}
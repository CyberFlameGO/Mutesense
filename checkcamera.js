var NodeWebcam = require( "node-webcam" );
var opts = {

    //Picture related

    width: 1280,

    height: 720,

    quality: 100,

    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60

    frames: 60,


    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows

    delay: 0,


    //Save shots in memory

    saveShots: true,


    // [jpeg, png] support varies
    // Webcam.OutputTypes

    output: "jpeg",


    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: '2',


    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "location",


    //Logging

    verbose: true

};
var webcam = NodeWebcam.create(opts);
webcam.capture( "test_picture", function( err, data ) {} );

webcam.list(function(list) {console.log(list)});
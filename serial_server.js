var SerialPort = require('serialport');
var _ = require('lodash');
var jsonfile = require('jsonfile')
var PubNub = require('pubnub');

var globalSweepData = [];
var sweepData = [];

var saveFrequency = 30000;
jsonfile.spaces = 4

// var data_handler = _(parseData).bind(this);
var data_handler = _.bind(parseData, this);

var port = new SerialPort('/dev/cu.usbmodem1451', {
	baudRate: 115200,
    parser: SerialPort.parsers.readline("\n")
}, function (err) {
	if (err) {
		return console.log('Error: ', err.message);
	}
	port.write('main screen turn on', function(err) {
		if (err) {
				return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    // port.on('data', function(data) {
    //     console.log(data);
    // });
    port.on('data', data_handler); 
});

function parseData(data){
    console.log(data);

    var tmp = _.split(data, '/');


    var string_obj_handler = _.bind(stringToObject, this);
    string_obj_handler
    _.forEach(tmp, string_obj_handler); 

    pushToGlobalArray();
    logFullObject();
}

function stringToObject(str){
    // console.log(str);
    var tmp_array = _.split(str, ':');
    
    // console.log(_.indexOf(tmp_array, '\r'));

    if(typeof tmp_array[0] != "undefined"
        && typeof tmp_array[1] != "undefined"
        && typeof tmp_array[2] != "undefined"
        ){
        var scan_tmp_object = {
            'id': tmp_array[0].replace(/(?:\\[rn]|[\r\n]+)+/g, ""),
            'ang': tmp_array[1].replace(/(?:\\[rn]|[\r\n]+)+/g, ""),
            'dst': tmp_array[2].replace(/(?:\\[rn]|[\r\n]+)+/g, "")
        };

        // sweepData = sweepData.push(scan_tmp_object);
        sweepData.push(scan_tmp_object);
    }
}

function pushToGlobalArray(){
    globalSweepData.push(sweepData);
    clearSweepData();
}

function clearSweepData(){
    sweepData = [];
}

function clearGlobalSweep(){
    globalSweepData = [];
}

function logFullObject(){
    console.log("sweepData: ", sweepData);
    console.log("globalSweepData: ", globalSweepData);
}

function saveJSONFileHandler(err){
    console.log(arguments);
    console.error(err);
    clearGlobalSweep();
}

var interval_handler = _.bind(intervalHandler, this);
var interval = setInterval(interval_handler, saveFrequency);
// clearInterval(interval);

function intervalHandler(){
    console.log("here???");


    var tm_stamp = Date.now();

    var file = './output/sweep_' + tm_stamp + '.json';

    var save_json_handler = _.bind(saveJSONFileHandler, this);
    jsonfile.writeFile(file, globalSweepData, {flag: 'w'}, save_json_handler);

    //     function (err) {
    //     console.error(err);
    // });

    // jsonfile.writeFile(file, obj, function (err) {
    //     console.error(err);
    // });

}

function publish() {
   
    pubnub = new PubNub({
        publishKey : 'pub-c-48d8a716-ad50-444f-8e60-22978d42537f',
        subscribeKey : 'sub-c-e33c40c6-be23-11e6-9868-02ee2ddab7fe',
        secretKey: "sec-c-N2RiY2Q2NjgtOWU5NC00YWMzLWI3YTAtNjVkZWVlNWU4NDU2",
    })
       
    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : "data_viz",
            message : "Hello from PubNub Docs!"
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }
       
    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(message) {
            console.log("New Message!!", message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })      
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['data_viz'] 
    });
};

publish();
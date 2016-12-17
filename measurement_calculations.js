var _ = require('lodash');
var jsonfile = require('jsonfile')

jsonfile.spaces = 4;

var globalSweepData = [];
var sweepData = [];
var physical_degree_map;
var obj_size;


/*
    formated like:
    {
        deg: #
        count: #
        sum: #
    }
*/

// setting for ang = 2 degrees for a bootstrapped test for this one object
var combined_values = [{
        ang: 2,
        count: 0,
        sum: 0,
    }];

var data_load_handler = _.bind(parseData, this);

// small / first
// var file = './output/accumulative/sweep_1481486704664.json';

// full
var file = './output/accumulative/sweep_1481490007803.json';
jsonfile.readFile(file, data_load_handler);

var data_map_handler = _.bind(dataMapHandler, this);
var file = './output/processed/physical_degree_map.json';
jsonfile.readFile(file, data_map_handler);

function parseData(err, obj){
    // console.log(arguments);
    // console.log(_.size(obj));
    obj_size = _.size(obj);

    var data_obj_handler = _.bind(dataProcessing, this);
    _.forEach(obj, data_obj_handler);

    var data_difference_handler = _.bind(calculateMeasurementDifference, this);
    _.forEach(combined_values, data_difference_handler);

    saveProcessedData();

}

function dataProcessing(scan_object){
    var data_single_scan_handler = _.bind(dataSingleScanProcessing, this);
    _.forEach(scan_object, data_single_scan_handler);

    calculateMean();

    combined_values = _.orderBy(combined_values, 'ang', ['asc']);
    console.log("//////////////////////////");
    console.log(combined_values);
    console.log("//////////////////////////");
}

function dataSingleScanProcessing(single_obj){
    var tmp_ang = single_obj.ang * 1;
    // console.log(typeof tmp_ang);
    // console.log(tmp_ang);

    if(_.find(combined_values, {'ang': tmp_ang * 1 })){
        var found_obj = _.find(combined_values, {'ang': tmp_ang * 1 });
        found_obj.count += 1;
        found_obj.sum += single_obj.dst * 1;

        console.log(found_obj);

    } else {
        var new_deg_obj = {
            ang: single_obj.ang*1,
            count: 1,
            sum: single_obj.dst*1
        }

        combined_values.push(new_deg_obj);

    }

    console.log("------------------");
}

function calculateMean(){
    var calculate_mean_handler = _.bind(calculateMeanHandler, this);
    _.forEach(combined_values, calculate_mean_handler);
}

function calculateMeanHandler(obj){
    obj.mean = Math.round( (obj.sum*1) / (obj.count*1) );
}

function calculateMeasurementDifference(obj){
    // console.log("--------------//////",  physical_degree_map);
    if(typeof obj != 'undefined'){
        // console.log("-> ", obj);
        var physical_dist = _.find(physical_degree_map, { 'ang': (obj.ang * 1)});
        console.log("physical_dist: ", physical_dist);
        obj.diff = Math.abs(obj.mean - physical_dist.dst);
    }
}

function dataMapHandler(err, obj){
    console.log(arguments);
    console.log("--------->", physical_degree_map);
    physical_degree_map = obj;
}

function saveProcessedData(){
    var file;
    if(obj_size > 100){
        file = './output/processed/data_mean_lg.json';
    } else {
        file = './output/processed/data_mean_sm.json';
    }

    jsonfile.writeFile(file, combined_values, function (err) {
        if(err){
            console.error(err);
        } else {
            console.log("success saving" + file);
        }
    });
}


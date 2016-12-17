var _ = require('lodash');
var jsonfile = require('jsonfile')

jsonfile.spaces = 4;
var data_points = 0;

var data_load_handler = _.bind(parseData, this);
// full
var file = './output/accumulative/sweep_1481490007803.json';
jsonfile.readFile(file, data_load_handler);

function parseData(err, obj){
    // console.log(arguments);
    console.log(_.size(obj));
    // obj_size = _.size(obj);

    _.forEach(obj, function(obj){
        

        data_points += _.size(obj);
        console.log(data_points);
        console.log(" ----- ");


    });

}

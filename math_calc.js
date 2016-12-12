var jsonfile = require('jsonfile')
jsonfile.spaces = 4;

var deg = 0;
var inc = 10;
// var max = 89;
var max = 180;
var height = 120;
var length = 160;

var deg_map = [];

for(var i = 0; i <= max; i++){
    var rad_conversion = deg_to_rads(deg);
    var answr = 0;

    if(deg <= 53){
        answr = height/Math.cos(rad_conversion);
    } else if (deg > 53 && deg <= 89) {
        var hypth = height / Math.cos(rad_conversion);
        console.log("hypth ", hypth);

        var base = hypth * Math.cos(deg_to_rads(deg_difference(deg)));
        console.log("base ", base);

        var base_diff = base - length;
        console.log("base_diff ", base_diff);

        var small_hypth = base_diff / Math.cos(deg_to_rads(deg_difference(deg)));
        console.log("small_hypth ", small_hypth);

        var dis_to_wall = hypth - small_hypth;

        answr = dis_to_wall;
    } else if(deg == 90){
        // set the new height of the triangle the second half of the 180 deg.
        height = 124;
    } else if(deg > 90 && deg <= 128){
        var hypth = height / Math.cos(rad_conversion);
        console.log("hypth ", hypth);

        var base = hypth * Math.cos(deg_to_rads(deg_difference(deg)));
        console.log("base ", base);

        var base_diff = base - length;
        console.log("base_diff ", base_diff);

        var small_hypth = base_diff / Math.cos(deg_to_rads(deg_difference(deg)));
        console.log("small_hypth ", small_hypth);

        var dis_to_wall = hypth - small_hypth;

        answr = Math.abs(dis_to_wall);
    } else if (deg > 128) {
        answr = Math.abs(height/Math.cos(rad_conversion));
    }

    
    console.log("degrees: " + deg + " distance: " + Math.round(answr));
    // deg_map[deg] = Math.round(answr);

    var tmp_obj = {
        ang: deg,
        dst: Math.round(answr)
    }

    deg_map.push(tmp_obj);

    deg++;

    console.log(" ");
}

saveProcessedData();

function deg_to_rads(deg){
    var rad_c = deg * (Math.PI/180);
    return rad_c;
}

function deg_difference(deg){
    return 180 - (90 + deg);
}

function saveProcessedData(){
    console.log(deg_map);

    var file = './output/processed/physical_degree_map.json';

    jsonfile.writeFile(file, deg_map, function (err) {
        if(err){
            console.error(err);
        } else {
            console.log("success saving degree map for physical space: " + file);
        }
    });
}
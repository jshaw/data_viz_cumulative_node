var deg = 0;
var inc = 10;
var max = 89;
var height = 120;
var length = 160;

var deg_map = {};


for(var i = 0; i <= max; i++){
    var rad_conversion = deg_to_rads(deg);
    var answr = 0;

    if(deg <= 53){
        answr = height/Math.cos(rad_conversion);
    } else if (deg <= max) {
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
    } else if ()

    if(deg == 90){
        height = 124;
    }

    if(deg > 90 && deg <= 38){
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
    } else if (deg > 39) {
        answr = height/Math.cos(rad_conversion);
    }

    
    console.log("degrees: " + deg + " distance: " + Math.round(answr));
    deg_map[deg] = Math.round(answr);
    deg++;

    console.log(" ");
}

function deg_to_rads(deg){
    var rad_c = deg * (Math.PI/180);
    return rad_c;
}

function deg_difference(deg){
    return 180 - (90 + deg);
}

console.log(deg_map);
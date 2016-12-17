# data_viz_cumulative_node

##### serial_server.js

This script controls the servo motor and also reads the data being scanned by the ultrasonic sensor. The file also stores the data into a json array and saves two incremently files, one every minute and every 5 minutes. Every minute it saves the data from the previous minute and  every 5 minutes it saves an accumulation of all of the data points.

##### math_calc.js

Calculations to figure out the distance from the ultrasonic sensor to the wall at every degree. Also saves the outcome of the calculations in the following file `/output/processed/physical_degree_map.json`.

##### measurement_calculations.js
Opens the accumulative data file for one hours of scanning `/output/accumulative/sweep_1481490007803.json` and then opens the `/output/processed/physical_degree_map.json`. It then calculates the mean value for each angle that was scanned and then calculated the difference between the mean measurement and the physical known distance. This data gets saved to the file `/output/processed/data_mean_sm.json'.


##### measurement_calculations_size.js

Outputs the total number of data points scanned and saved in the json file.

##### Data Files

All of the data files are stored in the `/output` folder. The `sweep_xxxxxxxxxx.json` files are the one minute saved files. In the `/output/accumulative` directory is the accumulative saves of every 5 minutes. 

* Full 1 hour of scanning data points: `/output/accumulative/sweep_1481490007803.json`
* Physical degree data: `/output/processed/physical_degree_map.json`
* All calculation data points and measurements for each degree: `/output/processed/data_mean_lg.json`
* Choosen instalation degree data points used in sculpture: `/output/processed/installation_points.json`



##### Library Dependencies 

 * [pubnub](https://www.npmjs.com/package/pubnub) 
 * [serialport](https://www.npmjs.com/package/serialport) 
 * [lodash](https://www.npmjs.com/package/lodash) 
 * [jsonfile](https://www.npmjs.com/package/jsonfile) 
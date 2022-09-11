"use strict";

const station = require("../controllers/station");
const readings = require("../controllers/reading");
const logger = require("../utils/logger");
const _ = require("lodash")

const computations = {
  
  latestData(station){
    if (station.readings.length > 0) {
    let lastReading = station.readings[station.readings.length-1];
    station.weatherIcon = computations.getWeatherIcon(lastReading.code);
    station.beaufort = computations.getBeaufort(lastReading.windSpeed);
    station.windCompass = computations.getWindCompass(lastReading.windDirection);
    station.latestPressure = lastReading.pressure;
    station.latestTemperature = lastReading.temperature;
    station.tempFar = computations.tempFar(lastReading.temperature);
    station.windChill = computations.getWindChill(lastReading.temperature, lastReading.windSpeed).toFixed(2);
    station.minTemp = computations.minTemp(station.readings);
    station.maxTemp = computations.maxTemp(station.readings);
    station.minWind = computations.minWind(station.readings);
    station.maxWind = computations.maxWind(station.readings);
    station.minPressure = computations.minPressure(station.readings);
    station.maxPressure = computations.maxPressure(station.readings);
    }
    
  },
  
    getWeatherIcon(code) {
      let iconCode = '0';
      if (code == '100') iconCode = "sun icon";
      else if (code == '200') iconCode = "cloud sun icon";
      else if (code == '300') iconCode = "cloud icon";
      else if (code == '400') iconCode = "cloud rain icon";
      else if (code == '500') iconCode = "cloud showers heavy icon";
      else if (code == '600') iconCode = "cloud rain icon";
      else if (code == '700') iconCode = "snowflake outline icon";
      else if (code == '800') iconCode = "bolt icon";
      else iconCode = "null";
      logger.info(iconCode);
      return iconCode;
    },
  
  tempFar(temperature){
    return (temperature * 1.8) + 32; 
  },
  
  getBeaufort(windSpeed) {
    //problems here I was telling it to windOutput to a value, I do not need that I only need to return the beaufort value 
    if ((windSpeed >= 0) && (windSpeed <= 1)) {
      return 0;
      }else if ((windSpeed >= 1) && (windSpeed <= 5)) { 
        return 1;
      }else if ((windSpeed >= 6) && (windSpeed <= 11)){ 
        return 2;
      }else if ((windSpeed >= 12) && (windSpeed <= 19)){ 
        return 3;
      }else if ((windSpeed >= 20) && (windSpeed <= 28)){ 
        return 4;
      }else if ((windSpeed >= 29) && (windSpeed <= 38)){ 
        return 5;
      }else if ((windSpeed >= 39) && (windSpeed <= 49)){ 
        return 6;
      }else if ((windSpeed >= 50) && (windSpeed <= 61)){ 
        return 8;
      }else if ((windSpeed >= 62) && (windSpeed <= 74)){ 
        return 9;
      }else if ((windSpeed >= 75) && (windSpeed <= 88)){ 
        return 10;
      }else if ((windSpeed >= 89) && (windSpeed <= 102)){ 
        return 11;
      }else if ((windSpeed >= 103) && (windSpeed <= 117)){ 
      return 12;
      }
  },
  
  getWindCompass(windDirection){
    if ((windDirection >= 348.75) && (windDirection <= 360)){ 
         return "North";
    }else if ((windDirection >= 0) && (windDirection <= 11.25)){ 
        return "North";
    }else if ((windDirection >= 11.25) && (windDirection <= 33.75)){ 
        return "North North East";
    }else if ((windDirection >= 33.75) && (windDirection <= 56.25)){ 
        return "North East";
    }else if ((windDirection >= 56.25) && (windDirection <= 78.75)){
        return "East North East";
    }else if ((windDirection >= 78.75) && (windDirection <= 101.25)){ 
        return "East";
    }else if ((windDirection >= 101.25) && (windDirection <= 123.75)){ 
        return "East South East";
    }else if ((windDirection >= 123.75) && (windDirection <= 146.25)){ 
        return "South East";
    }else if ((windDirection >= 146.25) && (windDirection <= 168.75)){ 
        return "South South East";
    }else if ((windDirection >= 168.75) && (windDirection <= 191.25)){ 
        return "South";
    }else if ((windDirection >= 191.25) && (windDirection <= 213.75)){ 
        return "South South West";
    }else if ((windDirection >= 213.75) && (windDirection <= 236.25)){
        return "South West";
    }else if ((windDirection >= 236.25) && (windDirection <= 258.75)){ 
        return "West South West";
    }else if ((windDirection >= 258.75) && (windDirection <= 281.25)){ 
        return "West";
    }else if ((windDirection >= 281.25) && (windDirection <= 303.75)){ 
        return "West North West";
    }else if ((windDirection >= 303.75) && (windDirection <= 326.25)){ 
        return "North West";
    }else if ((windDirection >= 326.25) && (windDirection <= 348.75)){ 
        return "North North West";
}
},
  
  getWindChill(temperature,windSpeed){
    return 13.12 + (0.6215 * temperature) - 11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * temperature * (Math.pow(windSpeed, 0.16));

  },
  
  minTemp(readings){
   let min = _.minBy(readings, _.property('temperature'));
    return min.temperature;
  },
  
  maxTemp(readings){
   let max = _.maxBy(readings, _.property('temperature'));
    return max.temperature;
  },
  
  minWind(readings){
   let min = _.minBy(readings, _.property('windSpeed'));
    return min.windSpeed;
  },
  
  maxWind(readings){
   let max = _.maxBy(readings, _.property('windSpeed'));
    return max.windSpeed;
  },
  
  minPressure(readings){
   let min = _.minBy(readings, _.property('pressure'));
    return min.pressure;
  },
  
  maxPressure(readings){
    let max = _.maxBy(readings, _.property('pressure'));
    return max.pressure;
  },
}

module.exports = computations;


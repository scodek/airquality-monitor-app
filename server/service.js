const axios = require('axios')

module.exports = {
    getCountryInfo: function(){
        return axios.get(process.env.REST_COUNTRIES); 
    }, 

    getCapitalsAQIInfo: function(capitalName){
        return axios.get(`${process.env.AQI_LINK}/${capitalName}/?token=${process.env.AQI_TOKEN}`);
    }
}

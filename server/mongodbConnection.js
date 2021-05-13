const restServices = require('./service.js'); 
const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

/**
 * Main function that starts to prepare data for the DB.
 * Country specific and AQI specific REST endpoint
 * will be called to prepare real time data
 */

async function prepareData() {
console.log("Preparing Mongo Database:-");

restServices.getCountryInfo()
.then(response => {
    
    const countryArr = response['data']
                        .filter(eachObj => eachObj['region'] === 'Europe' || eachObj['region'] === 'Asia' || eachObj['region'] === 'Africa')
                        .slice(0,100)
                        .map(eachObj => {
                            let temp = {};
                            temp['countryName'] = eachObj['name'];
                            temp['capital'] = eachObj['capital'];
                            temp['population'] = eachObj['population'];
                            temp['flag'] = eachObj['flag'];
                            temp['isoCode'] = eachObj['alpha3Code'];
                            return temp;
                        });
                        return countryArr;
                        
}).then(resArr => getCitySpecificAirqualitydata(resArr))
.catch((err) => console.log('data fetching failed : ',err.toString()));

}


/**
 * Provides AQI information of a capital city using AQI specific REST endpoint
 * @param  {Array} resArr containing object related to each country
 */


function getCitySpecificAirqualitydata(resArr){
    let finalDbArr = [];
    resArr.forEach((eachObj) => {
        let capitalName = eachObj['capital'];
        if(capitalName === 'Chișinău'){
            capitalName = 'Kishinev';
        }
    restServices.getCapitalsAQIInfo(capitalName)
    .then(response => {
        const result = response.data;
        let temp = {};
        if(result.status === 'ok'){
            temp = {...eachObj};
            temp['aqi'] = result.data.aqi;
            temp['extra'] = {
            url : result.data.city.url,
            iaqi: JSON.stringify(result.data.iaqi)

            };

        }else{
            temp = {...eachObj};
            temp['aqi'] = "NOT AVAILABLE";
            temp['extra'] = {};
        }
        
        return temp;

    })
    .then(obj =>{
        finalDbArr.push(obj); 
        if(finalDbArr.length === resArr.length){
            processFinalData(finalDbArr);
        }
    })
    .catch(err => console.log("data fetching failed", err.toString()))
    
    
});

}


/**
 * Sorts the array of list in ascending order
 * based on AQI
 * for an object when AQI is empty for a capital city
 * it is compared with a MAX_ASSUMED_AQI
 * to display it towards the end of the list
 * @param  {Array} finalDbArr array of DB listing
 */


function processFinalData(finalDbArr){
    const MAX_ASSUMED_AQI = 500;
    finalDbArr.sort((firstObj,secObj) => {
        if(firstObj['aqi'].toString().match(/^\D+$/) && secObj['aqi'].toString().match(/^\D+$/)){
            return MAX_ASSUMED_AQI;
        }else if(firstObj['aqi'].toString().match(/^\D+$/) && secObj['aqi'].toString().match(/^\d+$/)){
            return MAX_ASSUMED_AQI - secObj['aqi'];
        }else if(firstObj['aqi'].toString().match(/^\d+$/) && secObj['aqi'].toString().match(/^\D+$/)){
            return firstObj['aqi'] - MAX_ASSUMED_AQI;
        }else{
            return firstObj['aqi'] - secObj['aqi'];
        }
    });

    databaseSetUP(finalDbArr.map((eachObj,index) =>({...eachObj,['rank']:index+1})));
}


/**
 * Sends prepared data list to DB
 * if DB already contains data, it will
 * be cleaned first and then populated with 
 * new data
 * @param  {Array} finalDbArr array of objects
 */


async function databaseSetUP(finalDbArr){
    const client = createMongoClient();
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        if(await isEmptyDB(client)){
            await populateDatabase(client,finalDbArr);
        }else{
            console.log("DB is not empty. First DB would be emptied:-");
            await deleteAllEntires(client,{});
            await populateDatabase(client,finalDbArr);
        }
 
    } catch (e) {
        console.error("error from databaseSetUP ",e);
    } finally {
        await client.close();
    }
}



/**Database handling function calls starting**/


/**
 * Function to create Mongo client
 * @return {Object} client handler object
 */

function createMongoClient(){
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    return client;
}


/**
 * Checks if DB-collection is empty
 * @param  {Object} client client handler object
 * @return {Boolean} true/false  
 */

async function isEmptyDB(client){
    const count = await client.db(process.env.DB_NAME)
    .collection(process.env.COLLECTION_NAME)
    .find({})
    .count();
    return count === 0;
}

/**
 * Add two numbers together
 * @param  {Object} client client handler object
 * @param  {Object} filter clause for delete
 * @return {Number}      total number of deleted records
 */

async function deleteAllEntires(client,filter){
    const result = await client.db(process.env.DB_NAME)
                .collection(process.env.COLLECTION_NAME)
                .deleteMany(filter);
    console.log(`${result.deletedCount} old document(s) are deleted.`);
    return result.deletedCount;
}


/**
 * Send mutiple data to the databse 
 * @param  {Object} client client handler object
 * @param  {Array} dataList list of processed objects
 * containing AQI data of a capital city for a country 
 */

async function populateDatabase(client, dataList){
    const res = await client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME).insertMany(dataList);
    console.log(`${res.insertedCount} new document(s) created.`);
    //console.log(res.insertedIds);
}


//Calling the main function to start data sending process
prepareData();


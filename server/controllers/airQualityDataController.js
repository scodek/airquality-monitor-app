const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

/**
 * Controller for fetching page-wise data(20/page) from Mongo DB
 * @param  req Request object
 * @param  res Response object
 * @param  next Middleware function
 * @return Array of data object representing each listing of the collection
 */

const sendAirqualityData = async(req, res, next) => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
       let findClause = {};
       if(Object.keys(req.params).length > 0){
        const lowerLimit = 20 * (parseInt(req.params['pageno'])-1) + 1;
        findClause = {
            rank: {$gte:lowerLimit},
        };
       }
        await client.connect();
        const cursor = await client.db(process.env.DB_NAME)
                       .collection(process.env.COLLECTION_NAME)
                       .find(findClause).limit(20);
        const returnedData = await cursor.toArray();
        return res.send(returnedData);
 
    } catch (e) {
        console.error(e);
        next(e.toString());
    } finally {
        await client.close();
    }

};


export default sendAirqualityData;
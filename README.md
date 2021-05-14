# airquality-monitor-app

airquality-monitor-app is a React-NodeJS-MongoDB based app that reports on air quality of the capitals of countries from three regions (Europe, Asia and Africa). For clarity, this app currently will display records from 100 countries of the above mentioned regions. It will display the records in the ascending order of air-quality-index(AQI). The capitals for whom AQI not found, would be displayed at the end of the report table. The App currently supports partially two languages(German and English).

## Technologies
* ReactJS v17.0.2
* NodeJS v10.15.0
* ExpressJS v4.17.1
* Typescript v4.2.4
* MongoDB(onpremises) v4.4  and Cloud based Atlas MongoDB

## General Info
To get the credentials for the environment variables please contact the author

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/v6/commands/npm-install) to install this app.

```bash
cd server
npm install
cd ../client
npm install
```

## Usage guide for server, client and MongoDB
### Usage guide for MongoDB database
#### Case -1 (Using Cloud based Atlas MongoDB database)
* Contact the author for credentials for the access of cloud DB
* Add your IP address in the network access section
* Git checkout the main branch. 
* follow the steps for running server and client
#### Case -2 (Using Cloud on-premises MongoDB database)
* Git checkout the br_for_mongodb_local branch. 
* install [mongoDB](https://www.mongodb.com/) locally
* goto the bin folder where MongoDB is installed and start it locally by
```bash
\MongoDB\Server\4.4\bin>mongod
```
* when you start it, the database and table(collection) with data(documents) will be automatically created if they don't exist
### Usage guide for Server and Client
#### open two terminals to run react based client and ExpressJS based server separately
#### Terminal -1

```bash
cd server
npm run server
```
#### Terminal -2

```bash
cd client
npm run client
```

## Acknowledgment
I collected the country and country specific air quality data and the images from this free resources 
* https://restcountries.eu/
* https://aqicn.org/json-api/doc/
* https://unsplash.com/
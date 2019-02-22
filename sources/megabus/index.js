const axios = require("axios")
const { query } = require("../../server_assets/ghettoDB.js")

const megabusScraper = (origin, destination, date) => {
    let destinationID = query(destination).megabus
    let originID = query(origin).megabus
    let tripDate = date

    let megabusUrl =
        "https://ca.megabus.com/journey-planner/api/journeys?originId=" +
        originID +
        "&destinationId=" +
        destinationID +
        "&departureDate=" +
        tripDate +
        "&totalPassengers=1&concessionCount=0&nusCount=0&otherDisabilityCount=0&wheelchairSeated=0&pcaCount=0&days=1"
    console.log(megabusUrl)
    return new Promise((resolve, reject) => {
        axios
            .get(megabusUrl)
            .then(response => {
                resolve(response.data.journeys)
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    megabusScraper
}

// ============================
// Format to scrape megabus
// ============================
// // Tentative megabus code (at least the format of it)
// let destinationID = 275; //Whitby
// let originID = 276; //Kingston
// let departureDate = "2019-02-04"; //Feb 4th
// let kingstonToWhitby = "https://ca.megabus.com/journey-planner/api/journeys?originId=" + originID + "&destinationId=" + destinationID + "&departureDate=2019-02-04&totalPassengers=1&concessionCount=0&nusCount=0&otherDisabilityCount=0&wheelchairSeated=0&pcaCount=0&days=1"
// let kingstonToCornwall = "https://ca.megabus.com/journey-planner/api/journeys?originId=276&destinationId=278&departureDate=2019-02-02&totalPassengers=1&concessionCount=0&nusCount=0&otherDisabilityCount=0&wheelchairSeated=0&pcaCount=0&days=1"

// ===========================
// NPM  INSTALLED PACKAGES
// ===========================
const express = require("express")
const ip = require("ip")
const bodyParser = require("body-parser")

// ===========================
// LOCAL IMPORTS
// ===========================

//Respective helper functions for each source
const { megabusScraper } = require("./sources/megabus")
const { kijijiScraper } = require("./sources/kijiji")
const { viaParser } = require("./sources/viarail")
const { goParser } = require("./sources/go")

// ===========================
// global variable declarations and middleware
// ===========================
const port = process.env.port || 8080
const app = express()
app.use(bodyParser.json())

const callScraper = async function(name, scraper, origin, destination, date) {
    var result = await scraper(origin, destination, date)
    return { name, result }
}

// Send json to this route to get your results
app.post("/trips", (req, res) => {
    let origin = req.body.origin
    let destination = req.body.destination
    let date = req.body.date
    console.log("Route was hit\n")
    console.log({ origin, destination, date })

    var resultPromises = [
        callScraper("megabus", megabusScraper, origin, destination, date),
        callScraper("kijiji", kijijiScraper, origin, destination),
        callScraper("via", viaParser, origin, destination),
        callScraper("go", goParser, origin, destination)
    ]

    Promise.all(resultPromises)
        .then(results => {
            let resultsJson = JSON.stringify(results)
            res.send(resultsJson)
        })
        .catch(err => console.log(err))
})

app.get("/", (req, res) => {
    res.send("Test Route")
})

// app listens on available port
app.listen(port, () => {
    console.log("server started at http://" + ip.address() + ":" + port)
})

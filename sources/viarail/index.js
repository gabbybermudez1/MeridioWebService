const csvtojson = require("csvtojson")
const fs = require("fs")
const { query } = require("../../server_assets/ghettoDB.js")

const GTFS_RELATIVE_PATH = "server/sources/viarail/gtfs"
const filesToIgnore = []

const files = fs
    .readdirSync(GTFS_RELATIVE_PATH)
    .filter(file => !filesToIgnore.includes(file))
    .map(file => `${GTFS_RELATIVE_PATH}/${file}`)

const gtfsPromises = files.map(async file => {
    return csvtojson()
        .fromFile(file)
        .then(json => {
            return { file, json }
        })
})

const viaParser = (origin, destination, date) => {
    return Promise.all(gtfsPromises)
        .then(jsons => {
            return jsons.reduce((acc, curr) => {
                return { ...acc, [curr.file]: curr.json }
            }, {})
        })
        .then(jsons => {
            var originInfo = query(origin)
            var destinationInfo = query(destination)

            var originId = originInfo.via
            var destinationId = destinationInfo.via

            var routes = jsons[`${GTFS_RELATIVE_PATH}/routes.txt`].filter(
                route => route.route_id === `${originId}-${destinationId}`
            )

            const mockedRouteData = routes.map(route => {
                let temp = {}
                temp.price = Math.floor(Math.random() * 50 + 40)
                temp.depart = Math.floor(Math.random() * 24)
                temp.arrive = (temp.depart + 3) % 24
                temp.origin = origin
                temp.destination = destination
                temp.description = route.route_long_name

                return temp
            })

            return mockedRouteData
        })
}

module.exports = {
    viaParser
}

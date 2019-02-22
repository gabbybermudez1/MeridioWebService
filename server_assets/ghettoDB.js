const demo_locations = [
    {
        name: "Toronto",
        megabus: 145,
        kijiji: 1700272,
        via: 119,
        go: "UN",
        kijijiName: "gta-greater-toronto-area"
    },
    {
        name: "Montreal",
        megabus: 280,
        kijiji: 80002,
        via: 226,
        go: null,
        kijijiName: "grand-montreal"
    },
    {
        name: "Kingston",
        megabus: 276,
        kijiji: 1700181,
        via: 58,
        go: null,
        kijijiName: "kingston-area"
    },
    {
        name: "Waterloo",
        megabus: 422,
        kijiji: 1700212,
        via: 234,
        go: null,
        kijijiName: "kitchener-waterloo"
    },
    {
        name: "Whitby",
        megabus: 275,
        kijiji: 1700275,
        via: 572,
        go: "WH",
        kijijiName: "oshawa-durham-region"
    }
]

const query = (locationName, locations = demo_locations) => {
    let targetLocation = locations.filter(location => {
        return location.name === locationName
    })
    return targetLocation[0]
}

module.exports = {
    query
}

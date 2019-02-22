const axios = require("axios")
const cheerio = require("cheerio")
const { query } = require("../../server_assets/ghettoDB.js")

// Helper function to clean up the parsed text from cheerio
const textCleanUp = text => {
    let newText = text.substring(2)
    newText = newText.trim()
    return newText
}

// Function Parameters:
//      - OriginName: where to search for ride shares
//      - destinationName: used in the search tag to determine a possible rideshare
const kijijiScraper = (originName, destinationName) => {
    let area = query(originName).kijijiName
    let originID = query(originName).kijiji

    let kijijiUrl = "https://www.kijiji.ca/b-" + area + "/rideshare-" + destinationName + "/k0l" + originID + "?dc=true"

    return new Promise((resolve, reject) => {
        axios
            .get(kijijiUrl)
            .then(response => {
                let listAds = []
                let $ = cheerio.load(response.data)
                $(".regular-ad").each(function(index, element) {
                    let saleItem = {}
                    saleItem.price = textCleanUp(
                        $(this)
                            .find(".price")
                            .text()
                    )
                    saleItem.title = textCleanUp(
                        $(this)
                            .find("a")
                            .text()
                    )
                    saleItem.link =
                        "https://www.kijiji.ca" +
                        $(this)
                            .find("a")
                            .first()
                            .attr("href")
                    saleItem.description = textCleanUp(
                        $(this)
                            .find(".description")
                            .find("p")
                            .first()
                            .text()
                    )

                    listAds.push(saleItem)
                    resolve(listAds)
                })
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    kijijiScraper
}

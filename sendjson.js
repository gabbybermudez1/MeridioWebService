// ==============================================
// One of the test files to simulate sending json
// ==============================================

const axios = require("axios")
const ip = require("ip")

const address = ip.address()

axios({
    method: "post",
    url: "http://" + address + ":8080/trips",
    data: {
        origin: "Toronto",
        destination: "Kingston",
        date: "2019-02-22"
    }
})
    .then(results => console.log(JSON.stringify(results.data)))
    .catch(err => console.log(err))

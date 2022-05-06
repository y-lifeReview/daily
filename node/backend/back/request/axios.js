const Axios = require('axios')
const service = Axios.create({
    timeout: 10 * 60 * 1000
})

module.exports ={
    service
}
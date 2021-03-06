const axios = require('axios')

let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content_type": "application/json"
}

module.exports = class Mailercheck {
    constructor(config) {
        this.api_key = config.api_key;
        this.basePath = "https://app.mailercheck.com/api/v1";
        headers.Authorization = `Bearer ${this.api_key}`;
    }

    async checkEmail(email) {
        const response = await axios.post(this.basePath + "/check/single", { email }, { headers })
        const data = response.data
        const statusCode = response.status

        if (response.status !== 200) {
            throw "Oops something went wrong, please try again later or contact support here: https://www.mailercheck.com/support"
        }
        else {
            return { message: data.status, status: statusCode }
        }
    }
}
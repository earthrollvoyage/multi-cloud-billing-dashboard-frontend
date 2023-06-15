const axios = require('axios');
const moment = require('moment');

export async function listAzureResourceData(periodStart, periodEnd) {

    const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/azure/billing/dashboard/resource/find";
    try {

        periodStart = moment(periodStart)
        periodEnd = moment(periodEnd)

        let params = { start_date: `${periodStart.format('YYYY-MM-DD')}`, end_date: `${periodEnd.format('YYYY-MM-DD')}`}

        const response = await axios.get(url, { params, });

        if(response.status === 200) {
            return response.data.data;

        } else {
            console.log("Response Error :", response.data);
            return {};
        }
    } catch (error) {
        console.error("Error :", error);
        return error;
    }
}



// listAzureResourceData('2021-01-01', '2021-12-31')
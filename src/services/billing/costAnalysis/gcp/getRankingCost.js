const axios = require('axios');
const moment = require('moment');

export async function getRankingGCPCost(periodStart, periodEnd, group_by) {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/gcp/billing/dashboard/cost/ranking/get";
  try {
    periodStart = moment(periodStart)
    periodEnd = moment(periodEnd)

    const response = await axios.get(url, {
      params: {
        start_date: `${periodStart.format('YYYY-MM-DD')}`,
        end_date: `${periodEnd.format('YYYY-MM-DD')}`,
        group_by: group_by,
      },
    });

    if(response.status === 200) {
        let costData = response.data
        return costData.data;

    } else {
        console.log("Response Error :", response.data);
        return {};
    }

  } catch (error) {
    console.error("Error :", error);
    return error;
  }
}



// getRankingCost('2021-01-01', '2021-02-28', 'service')
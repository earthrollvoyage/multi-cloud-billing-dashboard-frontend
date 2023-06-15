const axios = require('axios');
const moment = require('moment');

export async function listCostSummary(periodStart, periodEnd, cloudBrand) {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/billing/summary/costs";
  try {
    
    periodStart = moment(periodStart)
    periodEnd = moment(periodEnd)
    
    const response = await axios.get(url, { 
      params: {
        start_period_year: periodStart.format('YYYY'),
        start_period_month: periodStart.format('MMMM'),
        end_period_year: periodEnd.format('YYYY'),
        end_period_month: periodEnd.format('MMMM'),
        cloud_brand: cloudBrand
    },});
    
    if(response.status === 200) {
        let costData = JSON.parse(response.data)
        for(let i = 1; i < costData.data.series.length; i++) {
          costData.data.series[i].format = (value) => value.toLocaleString('en-US')
        }
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



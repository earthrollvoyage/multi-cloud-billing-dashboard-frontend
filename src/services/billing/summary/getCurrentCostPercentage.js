const axios = require('axios');
const moment = require('moment');

export async function getCurrentCostPercentage(periodStart, periodEnd, cloud_brand=null) {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/billing/summary/percentage_summary";
  try {

    periodStart = moment(periodStart)
    periodEnd = moment(periodEnd)
    const response = await axios.get(url, { 
      params: {
        start_period_year: periodStart.format('YYYY'),
        start_period_month: periodStart.format('MMMM'),
        end_period_year: periodEnd.format('YYYY'),
        end_period_month: periodEnd.format('MMMM')
    },});

    if(response.status === 200) {
        let costData = JSON.parse(response.data)
        
        if ( cloud_brand ) {
          costData.data.cost_on_clouds = [costData.data.cost_on_clouds.find( item => item.brand === cloud_brand.toUpperCase())]
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

// getCurrentCostPercentage()

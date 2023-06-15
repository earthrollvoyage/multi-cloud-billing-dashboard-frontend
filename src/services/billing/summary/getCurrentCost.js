const axios = require('axios');

export async function getCurrentCost() {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/billing/summary/current_cost";
  try {
    
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('en-us', { month: 'long' });
    const year = String(currentDate.getFullYear());

    const response = await axios.get(url, {
      params: {
        start_period_year: year,
        start_period_month: monthName,
        end_period_year: year,
        end_period_month: monthName
      },
    });

    if(response.status === 200) {
        let costData = JSON.parse(response.data)
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

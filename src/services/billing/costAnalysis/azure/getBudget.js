const axios = require('axios');

export async function getBudgetAzureCost() {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/azure/billing/dashboard/cost/budget/get";
  try {

    const response = await axios.get(url);

    if(response.status === 200) {
        let costData = response.data.data
        return costData;

    } else {
        console.log("Response Error :", response.data);
        return {};
    }

  } catch (error) {
    console.error("Error :", error);
    return error;
  }
}



// getForecastCost()
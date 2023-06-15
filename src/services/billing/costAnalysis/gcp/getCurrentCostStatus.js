const axios = require('axios');

export async function getCurrentGCPCostStatus() {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/gcp/billing/dashboard/cost/current/get";
  try {

    const response = await axios.get(url);

    if(response.status === 200) {
        let costData = response.data.data[0]
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



// getCurrentCostStatus()
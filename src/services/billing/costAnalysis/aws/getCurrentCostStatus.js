const axios = require('axios');

export async function getCurrentAWSCostStatus() {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/aws/billing/dashboard/cost/current/get";
  try {

    // const response = await axios.get(url, {
    //   params: {
    //     customer_site: "set",
    //     account_id: "313477619416",
    //     account_name: "MFEC-Business"
    //   },
    // });

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



// getCurrentAWSCostStatus()
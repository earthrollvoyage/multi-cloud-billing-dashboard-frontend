const axios = require('axios');

export async function listDailyGCPCost(periodStart, periodEnd, group_by) {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/gcp/billing/dashboard/cost/group/find_by_daily";
  try {

    const response = await axios.get(url, {
      params: {
        start_date: periodStart,
        end_date: periodEnd,
        group_by: group_by,
      },
    });

    if(response.status === 200) {

        let costData = response.data
        let costDataResult = [] 
        let id = 1

        for (const [key, value] of Object.entries(costData.data.data)) {
    
            let dataTemp = { id: id }
            dataTemp[group_by] = key
            costDataResult.push(dataTemp)

            id += 1
            for (let i = 0; i < value.data.length; i++) { 
                costDataResult[costDataResult.length - 1][costData.data.series[i + 1].field] = value.data[i]
            }
        }

        costData.data.data = costDataResult
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



// listDailyGCPCost('2021-11-01', '2021-11-30', 'projects')
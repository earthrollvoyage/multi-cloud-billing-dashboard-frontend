const axios = require('axios');
const moment = require('moment');

export async function filterGCPCostByPeriod(periodStart, periodEnd, granularity, group_by, listSelectBy) {

  const url = "https://ybk48wv4yc.execute-api.ap-southeast-1.amazonaws.com/v1/centralized_data/gcp/billing/dashboard/cost/group/find_by_period";
  try {
    
    periodStart = moment(periodStart)
    periodEnd = moment(periodEnd)
    
    let params = {
      start_date: `${periodStart.format('YYYY-MM-DD')}`,
      end_date: `${periodEnd.format('YYYY-MM-DD')}`,
      granularity: granularity.toUpperCase(),
      group_by: group_by,
    }

    if (listSelectBy.length > 0) {
      let listSelectByData = []

      for(let i = 0; i < listSelectBy.length; i++ ) {
        listSelectByData.push(listSelectBy[i].title)
      }

      params.list_select_by = JSON.stringify(listSelectByData)
    }

    const response = await axios.get(url, { params, });

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



// filterCostByPeriod('2021-10-01', '2022-01-06', 'MONTHLY', 'service')
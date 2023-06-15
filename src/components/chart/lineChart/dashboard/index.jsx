import React, { useState, useEffect, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styled from "styled-components";
import ChartTypeDropdown from "../../../formInput/dropdown/dashboard/chartType";
import MonthsPicker from "../../../picker/month";
import { listDailyAWSCost } from "../../../../services/billing/costAnalysis/aws/listDailyCost"
import { listMonthlyAWSCost } from "../../../../services/billing/costAnalysis/aws/listMonthlyCost"
import { filterAWSCostByPeriod } from "../../../../services/billing/costAnalysis/aws/filterCostByPeriod"
import { listDailyGCPCost } from "../../../../services/billing/costAnalysis/gcp/listDailyCost"
import { listMonthlyGCPCost } from "../../../../services/billing/costAnalysis/gcp/listMonthlyCost"
import { filterGCPCostByPeriod } from "../../../../services/billing/costAnalysis/gcp/filterCostByPeriod"
import { AWSFilterDataContext } from "../../../../data/dashboardFilter/aws/filterDataContext";
import CircularIndeterminate from '../../../../progressLoading/circular/circularIndeterminate';
// import BasicSelect from "../../formInput/dropdown";

const ChartContainer = styled.div`
  /* width: 1150px; */
  height: 480px;
  flex: 4;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 15px;
  padding: 20px;
  box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  -moz-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  border-radius: 5px;
  background-color: #fff;
`;

const ChartTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 2px;
  margin-bottom: 5px;
  font-size: 20px;
  color: rgb(52, 52, 52);
  padding: 5px 0px; */
  border-bottom: 1px solid rgb(243, 209, 178);
`;

const ChartTitleInnerLeft = styled.h3`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 20px;
  color: rgb(52, 52, 52);
  padding: 5px 0px;
  /* border-bottom: 1px solid rgb(243, 209, 178); */
`;

const ChartSubtitle = styled.h5`
  margin-bottom: 30px;
  color: rgb(52, 52, 52);
  font-size: 12px;
  font-weight: 20px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 70%;
  padding-top: 10px;
  padding-left: ${({ pdLeftValue }) => pdLeftValue};
  padding-right: ${({ pdRightValue }) => pdRightValue};
  font-family: "Inter";
`;

const LegendWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 5px 0px;
  /* border: 1px solid rgb(243, 209, 178); */
  margin-left: 15em;
  margin-right: 15em;
`;

const LegendContentWrap = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LegendContentBoxColor = styled.div`
  display: inline-block;
  width: 18px;
  height: 12px;
  background-color: ${({ color }) => color};
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid rgba(236, 140, 52);
`;

const LegendContentTitle = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

const DashboardLineChartAnalytics = ({
  title,
  filterDataSet,
  page,
  dataKey,
  dataValueKeys,
  legend,
  grid,
  granularity
}) => {
  const COLORS = ["rgba(236, 140, 52, 0.6)"];
  const [listCost, setListCost] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const { awsFilterDataSet } = useContext(AWSFilterDataContext);

  useEffect(() => {
    const {dateRange, granularity, groupBy, listSelectBy} = filterDataSet;
    filterAWSCostByPeriod(dateRange.startDate, dateRange.endDate, granularity, groupBy, listSelectBy).then((res) => {
        setListCost(res.data_chart)
        setDataFetched(true);
    });
   }, [awsFilterDataSet]);

  return (
    <ChartContainer>
      <ChartTitleWrap>
        <ChartTitleInnerLeft>{title}</ChartTitleInnerLeft>
        <ChartTypeDropdown />
      </ChartTitleWrap>
      <ChartSubtitle>
        The chart below shows the proportion of costs spent for each service you
        use.
      </ChartSubtitle>
      { !dataFetched ? <CircularIndeterminate /> :
        <ChartWrapper
          pdRightValue={"30px"}
          pdLeftValue={"10px"}
        >
          <ResponsiveContainer
            width="100%"
            aspect={ 2.1 / 1 }
          >
            <AreaChart 
              data={listCost}
              margin={{
                top: 5,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(236, 140, 52)" stopOpacity={1}/>
                  <stop offset="95%" stopColor="rgb(236, 140, 52)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey={dataKey}
                interval={0}
                // dx={-20}
                tick={{ fontSize: 13 }}
                stroke="rgb(52, 52, 52)"
              />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey={dataValueKeys} stroke="#FF8042" fillOpacity={1} fill="url(#colorUv)" dot={false} />

              {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
            </AreaChart>
          </ResponsiveContainer>
            {/* <LegendWrap>
              <LegendContentWrap key={`item-${0}`}>
                <LegendContentBoxColor color={COLORS[0]} />
                <LegendContentTitle>{dataValueKeys} ($)</LegendContentTitle>
              </LegendContentWrap>
            </LegendWrap> */}
        </ChartWrapper>
      }
    </ChartContainer>
  );
};

export default DashboardLineChartAnalytics;

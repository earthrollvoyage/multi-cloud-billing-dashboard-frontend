import { width } from "@mui/system";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import ChartTypeDropdown from "../../../formInput/dropdown/dashboard/chartType";
import { listDailyAWSCost } from "../../../../services/billing/costAnalysis/aws/listDailyCost"
import { listMonthlyAWSCost } from "../../../../services/billing/costAnalysis/aws/listMonthlyCost"
import { listDailyGCPCost } from "../../../../services/billing/costAnalysis/gcp/listDailyCost"
import { listMonthlyGCPCost } from "../../../../services/billing/costAnalysis/gcp/listMonthlyCost"
// import BasicSelect from "../../formInput/dropdown";

const ChartContainer = styled.div`
  /* width: 1150px;
  height: 450px; */
  height: 480px;
  flex: 4;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 15px;
  padding: 20px;
  /* box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -moz-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29); */
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
  /* background-color: #00C49F; */
  padding-left: ${({ pdLeftValue }) => pdLeftValue};
  padding-right: ${({ pdRightValue }) => pdRightValue};
  font-family: "Inter";
`;

const LegendWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
  margin-left: 15em;
  margin-right: 15em;
`;

const LegendContentWrap = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
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

const DashboardBarChartAnalytics = ({
  title,
  filterDataSet,
  page,
  data,
  dataKey,
  dataValueKeys,
  grid,
  granularity
}) => {
  const COLORS = ["rgb(236, 140, 52)"];
  const [listCost, setListCost] = useState([]);

  useEffect(() => {
    if(page === '/aws/billing/costAnalysis') {
      if( granularity === "MONTHLY") {
        listMonthlyAWSCost('2021-10-01', '2021-11-30', 'service').then((res) => {
          setListCost(res.data_chart)
        })
      } else {
        listDailyAWSCost('2021-01-01', '2021-11-30', 'service').then((res) => {
          setListCost(res.data_chart)
        })
      }
    } else {
      if( granularity === "MONTHLY") {
        listMonthlyGCPCost('2021-01-01', '2021-11-30', 'project_cost').then((res) => {
          setListCost(res.data_chart)
        })
      } else {
        listDailyGCPCost('2021-11-01', '2021-12-26', 'project_cost').then((res) => {
          setListCost(res.data_chart)
        })
      }
    }
  }, []);

  const renderLegend = () => {
    return (
      <LegendWrap>
        <LegendContentWrap key={`item-${0}`}>
          <LegendContentBoxColor color={COLORS[0]} />
          <LegendContentTitle>{dataValueKeys} ($)</LegendContentTitle>
        </LegendContentWrap>
      </LegendWrap>
    );
  };

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
      <ChartWrapper
        pdRightValue={"30px"}
        pdLeftValue={"2px"}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={listCost}
            font
            margin={{
              top: 5
            }}
          >
            {/* <CartesianGrid strokeDasharray="5 5" /> */}
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(236, 140, 52)" stopOpacity={1}/>
                <stop offset="95%" stopColor="rgb(236, 140, 52)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis dataKey={dataKey} interval={0} tick={{ fontWeight: "bold" ,fontSize: 11 }} />
            <YAxis tick={{ fontWeight: "bold" ,fontSize: 13 }} />
            <Tooltip />
            {/* <Legend
              content={renderLegend}
              verticalAlign="bottom"
              align="center"
            /> */}
            <Bar
              dataKey={dataValueKeys}
              stackId="x"
              // fill="rgb(236, 140, 52)"
              barSize={30}
              fillOpacity={1} fill="url(#colorUv)"
            />
          </BarChart>
        </ResponsiveContainer>
        {/* <LegendWrap>
          <LegendContentWrap key={`item-${0}`}>
            <LegendContentBoxColor color={COLORS[0]} />
            <LegendContentTitle>{dataValueKeys} ($)</LegendContentTitle>
          </LegendContentWrap>
        </LegendWrap> */}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default DashboardBarChartAnalytics;

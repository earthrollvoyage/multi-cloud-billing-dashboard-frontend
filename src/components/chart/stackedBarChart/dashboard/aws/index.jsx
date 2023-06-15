import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import { Marginer } from "../../../../marginer";
import { getForecastAWSCost } from "../../../../../services/billing/costAnalysis/aws/getForecastCost"
import CircularIndeterminate from '../../../../progressLoading/circular/circularIndeterminate';

const ChartContainer = styled.div`
  flex: 2.1;
  height: 500px;
  margin-top: 15px;
  margin-right: 20px;
  padding: 20px;
  box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  -moz-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  border-radius: 5px;
  background-color: #fff;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopFiveItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopFiveItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-left: 10px solid ${({ color }) => color};
  /* margin: 2px 0px; */
  padding-left: 5px;
  font-size: 12px;
  color: rgb(52, 52, 52);
  font-weight: bold;
`;

const TopFiveItemContentTitle = styled.div``;

const TopFiveItemContentCost = styled.div``;

const ChartTitle = styled.h3`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 15px;
  color: rgb(52, 52, 52);
  padding: 5px 0px;
  border-bottom: 1px solid rgb(243, 209, 178);
`;

const ChartSubtitle = styled.h5`
  margin-bottom: ${({ marginValue }) => marginValue};
  color: rgb(52, 52, 52);
  font-size: 12px;
  font-weight: 20px;
`;

const LegendWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0px;
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
  border: ${({ border }) => border};
`;

const LegendContentTitle = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

const StackedBarChartAnalytics = ({ title, dataKey, legend, page }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const COLORS = ["rgb(236, 140, 52, 0.6)", "rgb(255, 255, 255)"];
  const [forecastCost, setForecastCost] = useState([{
    month: '',
    Forecast: 0.00,
    Costs: 0.00,
    recent_update: ''
  }]);

  useEffect(() => {
    getForecastAWSCost().then((res) => {
      setForecastCost(res)
      setDataFetched(true);
    })
  }, []);

  const renderLegend = () => {
    return (
      <LegendWrap>
        {legend.reverse().map((entry, index) => (
          <LegendContentWrap key={`item-${index}`}>
            <LegendContentBoxColor
              border={
                entry !== "Costs" ? "1px solid rgba(236, 140, 52, 0.6)" : "unset"
              }
              color={COLORS[index]}
            />
            <LegendContentTitle>{entry}</LegendContentTitle>
          </LegendContentWrap>
        ))}
      </LegendWrap>
    );
  };

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ChartSubtitle marginValue={page === "/home" ? "15px" : "8px"}>
        The chart below shows the proportion.
      </ChartSubtitle>
      { !dataFetched ? <CircularIndeterminate /> :
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={300}
              height={300}
              data={forecastCost}
              margin={{
                top: 40,
                right: 5,
                left: 5,
                // bottom: ,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <defs>
                <linearGradient id="costs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(236, 140, 52)" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="rgb(236, 140, 52)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey={dataKey}
                tick={{ fontWeight: "bold", fontSize: 13 }}
              />
              <YAxis tick={{ fontWeight: "bold", fontSize: 13 }} />
              <Tooltip />
              {/* <Legend
                content={renderLegend}
                verticalAlign="bottom"
                align="center"
              /> */}
              <Bar
                dataKey="Costs"
                stackId="a"
                fillOpacity={1} 
                fill="url(#costs)"
                stroke="rgb(236, 140, 52)"
                strokeWidth={1}
              />
              <Bar
                dataKey="Forecast"
                stackId="a"
                fill="#fff"
                stroke="rgb(236, 140, 52)"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
          <LegendWrap>
          {legend.reverse().map((entry, index) => (
            <LegendContentWrap key={`item-${index}`}>
              <LegendContentBoxColor
                border={
                  entry !== "Costs" ? "1px solid rgba(236, 140, 52, 0.6)" : "unset"
                }
                color={COLORS[index]}
              />
              <LegendContentTitle>{entry}</LegendContentTitle>
            </LegendContentWrap>
          ))}
        </LegendWrap>
        </ChartWrapper>
      }
    </ChartContainer>
  );
};

export default StackedBarChartAnalytics;

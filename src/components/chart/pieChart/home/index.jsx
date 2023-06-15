import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  Legend,
} from "recharts";
import { Marginer } from "../../../marginer";
import { getCurrentCostPercentage } from "../../../../services/billing/summary/getCurrentCostPercentage";
import { HomeFilterDataContext } from "../../../../data/homeFilterContext";
import CircularIndeterminate from "../../../progressLoading/circular/circularIndeterminate";

const ChartContainer = styled.div`
  height: 450px;
  margin-top: 15px;
  margin-right: ${({ marginRightValue }) =>
    marginRightValue ? `${marginRightValue}px` : "20px"};
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 2px;
  background-color: #fff;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 75%;
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
  font-family: "Inter";
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

const TopFiveItemContentTitle = styled.div``;

const TopFiveItemContentCost = styled.div``;

const ChartTitle = styled.h3`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 15px;
  color: rgb(52, 52, 52);
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(244,244,244);
`;

const ChartSubtitle = styled.h5`
  margin-bottom: ${({ marginValue }) => marginValue};
  color: rgb(141, 141, 141);
  font-size: 12px;
  font-weight: 20px;
`;

const LegendWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: "Inter";
  font-weight: bold;
  font-size: 13px;
  color: rgb(52, 52, 52);
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
`;

const LegendContentTitle = styled.div`
  display: flex;
`;

const HomePieChartAnalytics = ({
  title,
  filterDataSet,
  dataKey,
  legend,
  marginRightValue,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [percentageCosts, setPercentageCosts] = useState({
    cost_on_clouds: [
      {brand: 'AWS', percentage: 0},
      {brand: 'GCP', percentage: 0},
      {brand: 'AZURE', percentage: 0},
      // {brand: 'HUAWEI', percentage: 0},
    ],
    total: '$0'
  });
  const { homeFilterDataSet } = useContext(HomeFilterDataContext);
  
  useEffect(() => {
    const { monthRange } = filterDataSet;
    getCurrentCostPercentage(monthRange.startMonth, monthRange.endMonth).then((res) => {
      setPercentageCosts(res)
      setDataFetched(true);
    })
  }, [ homeFilterDataSet ]);

  const COLORS = ["rgb(16,100,214)", "rgb(107,220,228)", "rgb(107,178,244)"];
  function CustomLabel({viewBox, value1, value2}){
    const {cx, cy} = viewBox;
    return (
      <>
        <text x={cx} y={cy - 10} fill="rgb(52, 52, 52)" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
          <tspan alignmentBaseline="middle" fontSize="25">{value1}</tspan>
        </text>
        <text x={cx} y={cy + 30} fill="rgb(52, 52, 52)" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
          <tspan alignmentBaseline="middle" fontSize="22">{value2}</tspan>
        </text>
      </>
    )
  }

  const renderLegend = () => {
    return (
      <LegendWrap>
        {legend.reverse().map((entry, index) => (
          <LegendContentWrap key={`item-${index}`}>
            <LegendContentBoxColor color={COLORS[index]} />
            <LegendContentTitle>{entry}</LegendContentTitle>
          </LegendContentWrap>
        ))}
      </LegendWrap>
    );
  };

  return (
    <ChartContainer marginRightValue={marginRightValue}>
      <ChartTitle>{title}</ChartTitle>
      <ChartSubtitle marginValue={"15px"}>
        The percentage of cost used for each cloud brand you use.
      </ChartSubtitle>
        { !dataFetched ? <CircularIndeterminate /> : 
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                width={400}
                height={400}
                fontSize={16}
                fontFamily="Inter"
                margin={{
                  top: 10
                }}
              >
                <Pie
                  data={percentageCosts.cost_on_clouds}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // label={renderCustomizedLabel}
                  outerRadius={120}
                  innerRadius={100}
                  startAngle={90}
                  endAngle={450}
                  dataKey={dataKey}
                >
                  {percentageCosts.cost_on_clouds.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      // fillOpacity={0.6}
                    />
                  ))}
                  <Label width={30} position="center"
                    content={<CustomLabel value1={percentageCosts.total} value2={'100%'}/>}>
                  </Label>
                </Pie>
                <Tooltip
                  cursor={false}
                  formatter={(value, index) => [`${value.toFixed(2)} %`, `${percentageCosts.cost_on_clouds[index].brand}`]}
                />
                {/* <Legend
                content={renderLegend}
                verticalAlign="bottom"
                align="center"
                /> */}
              </PieChart>
            </ResponsiveContainer>
            {/* <LegendWrap>
          {legend.reverse().map((entry, index) => (
            <LegendContentWrap key={`item-${index}`}>
              <LegendContentBoxColor color={COLORS[index]} />
              <LegendContentTitle>{entry}</LegendContentTitle>
            </LegendContentWrap>
          ))}
        </LegendWrap> */}
        </ChartWrapper>
      }
    </ChartContainer>
  );
};

export default HomePieChartAnalytics;

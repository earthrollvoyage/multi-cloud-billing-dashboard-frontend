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
import { Marginer } from "../../../../marginer";
import { getCurrentCostPercentage } from "../../../../../services/billing/summary/getCurrentCostPercentage";
import { HomeFilterDataContext } from "../../../../../data/homeFilterContext";
import CircularIndeterminate from "../../../../progressLoading/circular/circularIndeterminate";

const ChartContainer = styled.div`
  height: 160px;
  margin-top: 15px;
  margin-right: ${({ marginRightValue }) =>
    marginRightValue ? `${marginRightValue}px` : "20px"};
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 2px;
  background-color: #fff;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChartLeftContentWrapper = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ChartRightContentWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ChartRightContentItemWrapper = styled.div`
  width: 100%;
  color: ${({ color }) => color};
  margin-bottom: ${({ marginBottom}) => marginBottom ? marginBottom : "unset"};
  font-size: ${({ fontSize }) => fontSize };
  font-weight: bold;
  display: flex;
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
  font-size: 13px;
  font-weight: bold;
  color: rgb(52, 52, 52);
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

const HomeCloudBrandPieChartAnalytics = ({
  title,
  filterDataSet,
  title_brand,
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

  useEffect(() => {const { monthRange } = filterDataSet;
  getCurrentCostPercentage(monthRange.startMonth, monthRange.endMonth, title_brand).then((res) => {
    res.cost_on_clouds.push({ brand: 'Total', percentage: 100 - res.cost_on_clouds[0].percentage, cost: 0 })
    setPercentageCosts(res)
    setDataFetched(true);
    })
  }, [ homeFilterDataSet ]);

  // const COLORS = ["rgba(255, 153, 0, 0.6)", "rgba(0, 196, 159, 0.6)", "rgba(0, 138, 215, 0.6)", "rgba(255, 0, 0, 0.6)"];
  // const COLORS = ["rgba(255, 153, 0, 0.6)", "rgba(0, 196, 159, 0.6)", "rgba(0, 138, 215, 0.6)"];
  const COLORS = ["rgb(16,100,214)", "rgb(107,220,228)", "rgb(107,178,244)", "rgb(244,244,244)"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight="bold"
        fontFamily="Inter"
        dominantBaseline="central"
        textAnchor="middle"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
      {/* <ChartSubtitle marginValue={"15px"}>
        The chart below shows the proportion of costs spent for each service you
        use.
      </ChartSubtitle> */}
        { !dataFetched ? <CircularIndeterminate /> : 
          <ChartWrapper>
            <ChartLeftContentWrapper>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  width={200}
                  height={200}
                  fontSize={16}
                  fontFamily="Inter"
                  // margin={{
                  //   top: 10
                  // }}
                >
                  <Pie
                    data={percentageCosts.cost_on_clouds}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    outerRadius={60}
                    innerRadius={50}
                    startAngle={-90}
                    endAngle={450}
                    dataKey={dataKey}
                  >
                    {percentageCosts.cost_on_clouds.map((entry, index) => (
                       <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.brand === 'AWS' ? 0 : entry.brand === 'GCP' ? 1 : entry.brand === 'AZURE' ? 2 : 3]}
                      />
                    ))}
                    <Label
                      width={30}
                      fontSize={18}
                      position="center"
                    >
                      { `${percentageCosts.cost_on_clouds[0].percentage.toFixed(2)}%` }
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
            </ChartLeftContentWrapper>
            <ChartRightContentWrapper>
              <ChartRightContentItemWrapper>
                <ChartTitle>{title}</ChartTitle>
              </ChartRightContentItemWrapper>
              <ChartRightContentItemWrapper fontSize="20px" marginBottom="10px" color="rgb(52, 52, 52)">
                {'$' + (percentageCosts.cost_on_clouds[0].cost.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </ChartRightContentItemWrapper>
              <ChartRightContentItemWrapper fontSize="12px" color="rgb(141, 141, 141)">
                {`Proportion of the last month's expenditure of ${title_brand} from the total amount of all active cloud brands.`}
              </ChartRightContentItemWrapper>
            </ChartRightContentWrapper>
            
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

export default HomeCloudBrandPieChartAnalytics;

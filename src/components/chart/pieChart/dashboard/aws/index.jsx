import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  Legend,
} from "recharts";
import { Marginer } from "../../../../marginer";
import { getRankingAWSCost } from "../../../../../services/billing/costAnalysis/aws/getRankingCost";
import { AWSFilterDataContext } from "../../../../../data/dashboardFilter/aws/filterDataContext";
import CircularIndeterminate from '../../../../progressLoading/circular/circularIndeterminate';

const ChartContainer = styled.div`
  flex: 1.5;
  height: 480px;
  margin-top: 15px;
  margin-right: ${({ marginRightValue }) =>
    marginRightValue ? `${marginRightValue}px` : "20px"};
  padding: 20px;
  box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  -moz-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.2);
  border-radius: 5px;
  background-color: rgba(255, 255, 255);
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 70%;
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
  font-size: 11px;
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
  margin-top: 20px;
  padding: 5px 0px;
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

const DashboardPieChartAnalytics = ({
  title,
  filterDataSet,
  page,
  dataKey,
  legend,
  marginRightValue
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [rankingCosts, setRankingCosts] = useState(filterDataSet.pieChart);
  // const [rankingCosts, setRankingCosts] = useState({
  //   top_five_cost: [
  //     { name: 'Other Services', total: 0.00 }
  //   ],
  //   top_five_title: [
  //     'Other Services'
  //   ],
  //   total: '$0.00'
  // });

  const { awsFilterDataSet } = useContext(AWSFilterDataContext);

  useEffect(() => {
    getRankingAWSCost('2021-12-01', '2021-12-31', awsFilterDataSet.groupBy).then((res) => {
      setRankingCosts(res)
      setDataFetched(true);
    });
  }, [awsFilterDataSet]);
  
  const COLORS = ["rgba(0, 138, 215, 0.6)", "rgba(0, 196, 159, 0.6)", "rgba(255, 153, 0, 0.6)", "rgb(255, 128, 66, 0.6)", "rgba(255, 0, 0, 0.6)"];

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
        fontSize="14px"
        fontFamily="Inter"
        dominantBaseline="central"
        textAnchor="middle"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ChartContainer marginRightValue={marginRightValue}>
      <ChartTitle>{title}</ChartTitle>
      <ChartSubtitle marginValue={"8px"}>
        The chart below shows the proportion.
      </ChartSubtitle>
      {/* { !dataFetched ? <CircularIndeterminate /> : */}
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              width={400}
              height={400}
              fontSize={14}
              fontFamily="Inter"
            >
              <Pie
                data={rankingCosts.top_five_cost}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={115}
                innerRadius={80}
                startAngle={90}
                endAngle={450}
                fill="#8884d8"
                dataKey={dataKey}
              >
                {rankingCosts.top_five_cost.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  width={20}
                  fontSize={25}
                  position="center"
                >
                  { rankingCosts.total }
                </Label>
              </Pie>
              <Tooltip
                cursor={false}
                formatter={(value, name) => [`${value}%`, `${name}`]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* <Marginer direction="vertical" margin="3px" /> */}
          <TopFiveItemWrap>
              {rankingCosts.top_five_cost.map((entry, index) => (
                  <TopFiveItemContent key={index + 1} color={COLORS[index % COLORS.length]}>
                  <TopFiveItemContentTitle>
                      {entry.name}
                  </TopFiveItemContentTitle>
                  <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                  </TopFiveItemContent>
              ))}
          </TopFiveItemWrap>
        </ChartWrapper>
      {/* } */}
    </ChartContainer>
  );
};

export default DashboardPieChartAnalytics;

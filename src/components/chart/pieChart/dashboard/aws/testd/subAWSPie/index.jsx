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
import { Marginer } from "../../../../../../marginer";
import { getRankingAWSCost } from "../../../../../../../services/billing/costAnalysis/aws/getRankingCost";
import { AWSFilterDataContext } from "../../../../../../../data/dashboardFilter/aws/filterDataContext";
import CircularIndeterminate from '../../../../../../progressLoading/circular/circularIndeterminate';

const ChartContainer = styled.div`
  display: flex;
  width: 20%;
  height: 20%;
`;

const ChartWrapper = styled.div`
  width: 20%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTop = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
`;

const ChartBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartBottomInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${({ borderSize }) => 
    borderSize ? borderSize + "px solid rgb(244,244,244)" : "0px solid rgb(244,244,244)"};
`;

const ChartBottomInnerContent = styled.div`
  width: 100%;
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
  border-bottom: 2px solid rgb(244,244,244);
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

const DashboardAWSSubPieChartAnalytics = ({
  marginRightValue,
  color
}) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [dataFetched, setDataFetched] = useState(false);
  // const [rankingCosts, setRankingCosts] = useState(filterDataSet.pieChart);
  // const [rankingCosts, setRankingCosts] = useState({
  //   top_five_cost: [
  //     { name: 'Other Services', total: 0.00 }
  //   ],
  //   top_five_title: [
  //     'Other Services'
  //   ],
  //   total: '$0.00'
  // });

  // const { awsFilterDataSet } = useContext(AWSFilterDataContext);

  // useEffect(() => {
  //   getRankingAWSCost('2021-12-01', '2021-12-31', awsFilterDataSet.groupBy).then((res) => {
  //     setRankingCosts(res)
  //     setDataFetched(true);
  //   });
  // }, [awsFilterDataSet]);
  
  // useEffect(() => {
  //   getRankingAWSCost('2021-11-01', '2021-11-30', 'linked_account').then((res) => {
  //     console.log("listCost 1222 :", res);
  //     setRankingCosts(res)
  //   });
  // }, []);

  const COLORS = ["rgba(0, 138, 215, 0.6)", "rgba(0, 196, 159, 0.6)", "rgba(255, 153, 0, 0.6)", "rgb(255, 128, 66, 0.6)", "rgba(16,100,214, 0.6)"];
  const data = [
    { name: 'Group A', value: 400 }
  ];
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
        {/* <ChartWrapper> */}
        <PieChart width={45} height={45}>
        <Pie
          data={data}
          cx={20}
          cy={20}
          innerRadius={5}
          outerRadius={10}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
            <Cell fill={color} />
        </Pie>
      </PieChart>
            {/* <ResponsiveContainer width="100%" height="100%">
                <PieChart
                width={20}
                height={20}
                fontSize={14}
                fontFamily="Inter"
                >
                <Pie
                    data={rankingCosts.top_five_cost}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={20}
                    innerRadius={10}
                    startAngle={90}
                    endAngle={450}
                    fill="#8884d8"
                    dataKey={dataKey}
                >
                    <Cell fill={color}/>
                </Pie>
                </PieChart>
            </ResponsiveContainer> */}
        {/* </ChartWrapper> */}

    </ChartContainer>
  );
};

export default DashboardAWSSubPieChartAnalytics;

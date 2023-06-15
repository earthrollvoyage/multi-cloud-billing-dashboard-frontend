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
import { Marginer } from "../../../../../marginer";
import { getRankingAWSCost } from "../../../../../../services/billing/costAnalysis/aws/getRankingCost";
import { AWSFilterDataContext } from "../../../../../../data/dashboardFilter/aws/filterDataContext";
import DashboardAWSSubPieChartAnalytics from "./subAWSPie";
import CircularIndeterminate from '../../../../../progressLoading/circular/circularIndeterminate';
import RankingButtonComponent from '../../../../../formInput/button/rankingDashboard';

const moment = require('moment');

const ChartContainer = styled.div`
  flex: 1.5;
  height: 100%;
  margin-top: 15px;
  /* margin-left: ${({ marginLeftValue }) =>
    marginLeftValue ? `${marginLeftValue}px` : "15px"}; */
  margin-right: ${({ marginRightValue }) =>
    marginRightValue ? `${marginRightValue}px` : "20px"};
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 2px;
  background-color: #fff;
  font-family: "Inter";
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  flex-direction: row;
  justify-content: flex-end;
  color: ${({ color }) => color ? color : "rgb(141, 141, 141)"};
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : "unset"};
  font-size: ${({ fontSize }) => fontSize ? fontSize + "px" : "10px"};
  margin-left: ${({ marginLeft }) => marginLeft ? marginLeft + "px" : "0px"};
`;

const ChartBottomInnerContentLeft = styled.div`
  /* width: 100%; */
  display: flex;
  align-items: center;
`;

const ChartBottomInnerContentRight = styled.div`
  width: ${({ width }) => width };
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const ChartTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(244,244,244);
`;

const ChartTitleInnerLeft = styled.h3`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 15px;
  color: rgb(52, 52, 52);
  /* padding: 5px 0px; */
  /* border-bottom: 1px solid rgb(243, 209, 178); */
`;

const ChartTitleInnerRight = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-right: 20px; */
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
  filterDataSet,
  page,
  dataKey,
  legend,
  marginRightValue
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [rankingCosts, setRankingCosts] = useState(filterDataSet.pieChart);
  const [groupBy, setGroupBy] = useState({ 'linked_account': "true", 'service': "false" });

  useEffect(() => {

    let startDate = moment(new Date()).subtract(1,'months')
    let endDate = moment(new Date()).subtract(1,'months')
    let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
    let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);
    let groupByKey = groupBy.linked_account === "true" ? 'linked_account' : 'service'
    
    getRankingAWSCost(startDateDefault, endDateDefault, groupByKey).then((res) => {
      setRankingCosts(res)
      setDataFetched(true);
    });

  }, [ groupBy ]);

  const handleOnChange = (value) => {
    setGroupBy(value);
  }

  const COLORS = ["rgba(107,178,244)", "rgba(107,220,228)", "rgb(244,180,108)", "rgb(236,124,188)", "rgba(16,100,214)"];

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

      <ChartTitleWrap>
        <ChartTitleInnerLeft>{groupBy.linked_account === 'true' ? 'Spend by Account' : 'Spend by Service'}</ChartTitleInnerLeft>
        <ChartTitleInnerRight>
          <RankingButtonComponent title="Account" page={page} groupby={groupBy.linked_account} handleOnChange={handleOnChange} />
          <RankingButtonComponent title="Serivce" page={page} groupby={groupBy.service} handleOnChange={handleOnChange} />
        </ChartTitleInnerRight>
      </ChartTitleWrap>
      <ChartSubtitle marginValue={"8px"}>
        The percentage of cost used for each accounts or services you use.
      </ChartSubtitle>
      {/* { !dataFetched ? <CircularIndeterminate /> : */}
        <ChartWrapper>
            <ChartTop>
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
                        // label={renderCustomizedLabel}
                        outerRadius={120}
                        innerRadius={100}
                        startAngle={90}
                        endAngle={450}
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
            </ChartTop>
            <ChartBottom>
                <ChartBottomInner>
                    <ChartBottomInnerContent fontSize={12} fontWeight={"bold"} marginLeft={groupBy.linked_account === 'false' ? 80 : 15 }>
                      ACCOUNT
                    </ChartBottomInnerContent>
                    <ChartBottomInnerContent marginLeft={groupBy.linked_account === 'false' ? 80 : 15 } fontSize={12} fontWeight={"bold"}>
                      EXPENSE
                    </ChartBottomInnerContent>
                    <ChartBottomInnerContent marginLeft={15} fontSize={12} fontWeight={"bold"}>
                      PERCENTAGE
                    </ChartBottomInnerContent>
                </ChartBottomInner>
                {rankingCosts.top_five_cost.map((entry, index) => (
                    <ChartBottomInner key={index + 1} borderSize={index === rankingCosts.top_five_cost.length - 1 ? 0 : 3}>
                        <ChartBottomInnerContent fontSize={13} fontWeight={"bold"} color={"rgb(52, 52, 52)"}>
                            <ChartBottomInnerContentLeft>
                                <DashboardAWSSubPieChartAnalytics
                                    marginRightValue={marginRightValue}
                                    color={COLORS[index % COLORS.length]} />
                            </ChartBottomInnerContentLeft>
                            <ChartBottomInnerContentRight width={groupBy.linked_account === 'false' ? '190px' : '100px'}>
                                {entry.name}
                            </ChartBottomInnerContentRight>
                        </ChartBottomInnerContent>
                        <ChartBottomInnerContent marginLeft={15} fontSize={13} fontWeight={"bold"} color={"rgb(52, 52, 52)"}>
                            ${entry.total.toFixed(2)}
                        </ChartBottomInnerContent>
                        <ChartBottomInnerContent marginLeft={15} fontSize={13} fontWeight={"bold"}>
                            {entry.percentage}%
                        </ChartBottomInnerContent>
                    </ChartBottomInner>
                ))}
            </ChartBottom>
          {/* <Marginer direction="vertical" margin="3px" /> */}
          {/* <TopFiveItemWrap>
              {rankingCosts.top_five_cost.map((entry, index) => (
                  <TopFiveItemContent key={index + 1} color={COLORS[index % COLORS.length]}>
                  <TopFiveItemContentTitle>
                      {entry.name}
                  </TopFiveItemContentTitle>
                  <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                  </TopFiveItemContent>
              ))}
          </TopFiveItemWrap> */}
        </ChartWrapper>
      {/* } */}
    </ChartContainer>
  );
};

export default DashboardPieChartAnalytics;

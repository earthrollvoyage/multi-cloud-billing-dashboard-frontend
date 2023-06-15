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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Marginer } from "../../../../../marginer";
import { getBudgetAWSCost } from "../../../../../../services/billing/costAnalysis/aws/getBudget"
import CircularIndeterminate from '../../../../../progressLoading/circular/circularIndeterminate';

const ChartContainer = styled.div`
  flex: 2.1;
  height: 600px;
  margin-top: 15px;
  margin-right: 20px;
  padding: 20px;
  /* border: 2px solid rgb(244,244,244); */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 2px;
  background-color: #fff;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTop = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const ChartBottom = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: row; */
  /* align-items: center; */
  justify-content: space-between;
  /* margin-top: 10px; */
`;

const ChartBottomInnerLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* border: 1px solid rgba(192, 187, 181, 0.2); */
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
`;

const ChartBottomInnerLeftContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: ${({fontSize}) => fontSize ? fontSize + "px": "20px"};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : "unset"};
  color: ${({color}) => color};
  margin-top: ${({marginTop}) => marginTop ? marginTop + "px": "0px"};
`;

const ChartBottomInnerRight = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid rgba(192, 187, 181, 0.2); */
  margin-right: 20px
  margin-left: 10px;
  margin-right: ${({ marginRight }) => marginRight ? marginRight : "unset"};
`;

const ChartBottomInnerRightContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: ${({fontSize}) => fontSize ? fontSize + "px": "20px"};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : "unset"};
  color: ${({color}) => color};
  margin-top: ${({marginTop}) => marginTop ? marginTop + "px": "0px"};
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
  margin-bottom: 20px;
  font-size: 15px;
  color: rgb(52, 52, 52);
  padding-top: 5px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(244,244,244);
`;

const ChartSubtitle = styled.div`
  margin-bottom: ${({ marginValue }) => marginValue};
  color: rgb(141, 141, 141);
  font-size: 12px;
  font-weight: 600;
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

const AttachMoneyIconIcon = styled(AttachMoneyIcon)`
  font-size: 23px !important;
  color: rgb(52, 52, 52);
  margin-left: -5px;
`;

const data = [
  {
    name: 'Page A',
    uv: 2400,
    pv: 4000,
    amt: 2000,
  },
  {
    name: 'Page B',
    uv: 1900,
    pv: 3000,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2600,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 3090,
    pv: 4800,
    amt: 2181,
  },
];

const StackedBarChartAnalytics = ({ title, dataKey, legend, page }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const COLORS = ["rgb(236, 140, 52, 0.6)", "rgb(255, 255, 255)"];
  const [budgetCost, setBudget] = useState([{
    account_ranking: '',
    actual_cost_ranking: 0.00,
    forecast_cost_ranking: 0.00,
    budget_cost: 0.00
  }]);

  useEffect(() => {
    getBudgetAWSCost().then((res) => {
      setBudget(res)
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
      <ChartSubtitle marginValue="20px">
        The chart below shows the proportion of the budget, future expenses. and actual expenses according to the Budget period.
      </ChartSubtitle>
      {/* <ChartSubtitle marginValue="20px">
        and actual expenses according to the Budget period.
      </ChartSubtitle> */}
      { !dataFetched ? <CircularIndeterminate /> :
        <ChartWrapper>
          <ChartTop>
            {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20,
                }}
                barSize={20}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <XAxis 
                  axisLine={false}
                  dataKey="name" 
                  scale="point" 
                  xAxisId={0} 
                  dy={0} 
                  dx={0} 
                  label={{ value: '', angle: -45, position: 'bottom' }} 
                  interval={0} 
                  tickLine={false} 
                  padding={{ left: 40, right: 40 }}
                  tick={{fontSize: 13}} />
                <YAxis tickLine={false}  axisLine={false} tick={{fontSize: 13}} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar barSize={40} dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
              </BarChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={budgetCost}
                margin={{
                  top: 20,
                  // right: 30,
                  // left: 20,
                  bottom: 20,
                }}
              >
                <XAxis axisLine={false}
                  dataKey="Account" 
                  scale="point" 
                  xAxisId={0} 
                  dy={0} 
                  dx={0} 
                  label={{ value: '', angle: -45, position: 'bottom' }} 
                  interval={0} 
                  tickLine={false} 
                  padding={{ left: 40, right: 40 }}
                  tick={{fontSize: 13}} />
                <YAxis tickLine={false}  axisLine={false} tick={{fontSize: 13}} />
                <YAxis tickLine={false}  axisLine={false} tick={{fontSize: 13}} />
                <Tooltip />
                {/* <Legend layout="vertical" verticalAlign="top" align="right" /> */}
                <Bar dataKey="Monthly Actual Cost" barSize={30} stackId="a" fill="rgb(16,100,214)"/>
                <Bar dataKey="Monthly Forecast" barSize={30} stackId="a" fill="rgb(107,220,228)" />
                <Bar dataKey="Monthly Budget" barSize={30} stackId="a" fill='#eee'  />
                
              
                {/* <Bar dataKey="pv" barSize={30} stackId="a" fill="rgb(4,108,252)"  /> */}
              </BarChart>
            </ResponsiveContainer>
          </ChartTop>
          <ChartBottom>
            <ChartBottomInnerLeft>
              <ChartBottomInnerLeftContent fontSize={22} color={"rgb(52, 52, 52)"}>
                <AttachMoneyIconIcon />
                12,333.00
              </ChartBottomInnerLeftContent>
              <ChartBottomInnerLeftContent fontSize={13} fontWeight="bold" color={"rgb(107,220,228)"} marginTop={5}>
                Monthly Budget
              </ChartBottomInnerLeftContent>
              <ChartBottomInnerLeftContent fontSize={10} color={"rgb(141, 141, 141)"} fontWeight='600' marginTop={15}>
                Amount of Monthly Budget.
              </ChartBottomInnerLeftContent>
            </ChartBottomInnerLeft>
            <ChartBottomInnerRight marginRight="10px">
              <ChartBottomInnerRightContent fontSize={22} color={"rgb(52, 52, 52)"}>
                <AttachMoneyIconIcon />
                12,333.00
              </ChartBottomInnerRightContent>
              <ChartBottomInnerRightContent fontSize={13} fontWeight="bold" color={"rgb(107,178,244)"} marginTop={5}>
                Monthly Forecast
              </ChartBottomInnerRightContent>
              <ChartBottomInnerRightContent fontSize={10} color={"rgb(141, 141, 141)"} fontWeight='600' marginTop={15}>
                Amount of Monthly forecast.
              </ChartBottomInnerRightContent>
            </ChartBottomInnerRight>
            <ChartBottomInnerRight>
              <ChartBottomInnerRightContent fontSize={22} color={"rgb(52, 52, 52)"}>
                <AttachMoneyIconIcon />
                12,333.00
              </ChartBottomInnerRightContent>
              <ChartBottomInnerRightContent fontSize={13} fontWeight="bold" color={"rgb(16,100,214)"} marginTop={5}>
                Monthly Actual Cost
              </ChartBottomInnerRightContent>
              <ChartBottomInnerRightContent fontSize={10} color={"rgb(141, 141, 141)"} fontWeight='600' marginTop={15}>
                Amount of Monthly Actual Cost.
              </ChartBottomInnerRightContent>
            </ChartBottomInnerRight>
          </ChartBottom>
        </ChartWrapper>
        // <ChartWrapper>
        //   <ResponsiveContainer width="100%" height="100%">
        //     <BarChart
        //       width={300}
        //       height={300}
        //       data={budgetCost}
        //       margin={{
        //         top: 40,
        //         right: 5,
        //         left: 5,
        //         // bottom: ,
        //       }}
        //     >
        //       {/* <CartesianGrid strokeDasharray="3 3" /> */}
        //       <defs>
        //         <linearGradient id="costs" x1="0" y1="0" x2="0" y2="1">
        //           <stop offset="5%" stopColor="rgb(236, 140, 52)" stopOpacity={0.6}/>
        //           <stop offset="95%" stopColor="rgb(236, 140, 52)" stopOpacity={0}/>
        //         </linearGradient>
        //       </defs>
        //       <XAxis
        //         dataKey={dataKey}
        //         tick={{ fontWeight: "bold", fontSize: 13 }}
        //       />
        //       <YAxis tick={{ fontWeight: "bold", fontSize: 13 }} />
        //       <Tooltip />
        //       {/* <Legend
        //         content={renderLegend}
        //         verticalAlign="bottom"
        //         align="center"
        //       /> */}
        //       <Bar
        //         dataKey="Costs"
        //         stackId="a"
        //         fillOpacity={1} 
        //         fill="url(#costs)"
        //         stroke="rgb(236, 140, 52)"
        //         strokeWidth={1}
        //       />
        //       <Bar
        //         dataKey="Forecast"
        //         stackId="a"
        //         fill="#fff"
        //         stroke="rgb(236, 140, 52)"
        //         strokeWidth={1}
        //       />
        //     </BarChart>
        //   </ResponsiveContainer>
        //   <LegendWrap>
        //   {legend.reverse().map((entry, index) => (
        //     <LegendContentWrap key={`item-${index}`}>
        //       <LegendContentBoxColor
        //         border={
        //           entry !== "Costs" ? "1px solid rgba(236, 140, 52, 0.6)" : "unset"
        //         }
        //         color={COLORS[index]}
        //       />
        //       <LegendContentTitle>{entry}</LegendContentTitle>
        //     </LegendContentWrap>
        //   ))}
        // </LegendWrap>
        // </ChartWrapper>
      }
    </ChartContainer>
  );
};

export default StackedBarChartAnalytics;

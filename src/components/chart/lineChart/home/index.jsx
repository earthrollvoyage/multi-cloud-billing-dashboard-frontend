import React, { useState, useEffect, useContext } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styled from "styled-components";
import { listCostSummary } from "../../../../services/billing/summary/listCostSummary";
import { HomeFilterDataContext } from "../../../../data/homeFilterContext";
import CircularIndeterminate from '../../../progressLoading/circular/circularIndeterminate';
import HomeChartFilterComponent from '../../../filter/home/chart';

const ChartContainer = styled.div`
  flex: 4;
  width: 100%;
  height: 700px;
  padding: 20px;
`;

const ChartTitleWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChartTitleInnerLeft = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 18px;
  color: rgb(52, 52, 52);
  /* padding: 5px 0px; */
  /* border-bottom: 1px solid rgb(243, 209, 178); */
`;

const ChartTitleInnerRight = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 18px;
  color: rgb(52, 52, 52);
  /* padding: 5px 0px; */
  /* border-bottom: 1px solid rgb(243, 209, 178); */
`;

const ChartSubtitle = styled.h5`
  margin-bottom: 30px;
  color: rgb(141, 141, 141);
  font-size: 12px;
  font-weight: 20px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 65%;
  padding-top: 10px;
  padding-left: ${({ pdLeftValue }) => pdLeftValue};
  padding-right: ${({ pdRightValue }) => pdRightValue};
  font-family: "Inter";
`;

const LegendWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0px;
  /* border: 1px solid rgb(243, 209, 178); */
  margin-left: 15em;
  margin-right: 15em;
  margin-top: 15px;
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

const HomeLineChartAnalytics = ({
  title,
  cloud_brand,
  filterDataSet,
  data,
  dataKey,
  dataValueKeys,
  legend,
  grid
}) => {

  const [listCost, setListCost] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const { homeFilterDataSet } = useContext(HomeFilterDataContext);

  useEffect(() => {
    const { monthRange, cloudBrand } = filterDataSet;
    listCostSummary(monthRange.startMonth, monthRange.endMonth, cloudBrand).then((res) => {
    setListCost(res.data);
    setDataFetched(true);
    })
  }, [ homeFilterDataSet ]);

  const COLORS = ["rgb(4,108,252, 0.8)", "rgb(107,220,228, 0.8)", "rgb(108,180,252, 0.8)", "rgba(255, 0, 0, 0.8)"]

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
    <ChartContainer>
      <ChartTitleWrap>
        <ChartTitleInnerLeft>{title}</ChartTitleInnerLeft>
        <ChartTitleInnerRight>
          <HomeChartFilterComponent />
        </ChartTitleInnerRight>
      </ChartTitleWrap>
      <ChartSubtitle>
        The chart below shows the proportion of costs spent for each cloud brand you use.
      </ChartSubtitle>
      { !dataFetched ? <CircularIndeterminate /> : 
        <ChartWrapper
          pdRightValue={"unset"}
          pdLeftValue={"unset"}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            // aspect={ 2.1 / 1 }
          >
            <AreaChart 
              data={listCost}
              margin={{
                top: 5,
                bottom: 5,
              }}
            >
              <defs>
                {
                  dataValueKeys.map((key, index) => (
                      <linearGradient id={key} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS[cloud_brand === 'all' ? index : cloud_brand === 'aws' ? 0 : cloud_brand === 'gcp' ? 1 : 2]} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={COLORS[cloud_brand === 'all' ? index : cloud_brand === 'aws' ? 0 : cloud_brand === 'gcp' ? 1 : 2]} stopOpacity={0}/>
                      </linearGradient>
                      )
                )}
              </defs>
              <XAxis 
                axisLine={false}
                xAxisId={0} 
                dy={15} 
                dx={0} 
                label={{ value: '', angle: 0, position: 'bottom' }} 
                interval={0} 
                dataKey={dataKey} 
                tickLine={false} 
                tick={{fontSize: 12 }}
                scale="point"
                padding={{ left: 0, right: 20 }}/>
              <YAxis tickCount={6} tickLine={false}  axisLine={false} tick={{fontSize: 13}}  />
              <Tooltip />
              {/* <Legend
                content={renderLegend}
                verticalAlign="bottom"
                align="center"
              /> */}

              {dataValueKeys.map((key, index) => (
                  <Area
                      key={index}
                      type="monotone"
                      dataKey={key}
                      stroke={COLORS[cloud_brand === 'all' ? index : cloud_brand === 'aws' ? 0 : cloud_brand === 'gcp' ? 1 : 2]}
                      fillOpacity={1} 
                      fill={`url(#${key})`}
                      // fill={COLORS[index]}
                  />
              ))}

              {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
            </AreaChart>
          </ResponsiveContainer>
          <LegendWrap>
            {legend.reverse().map((entry, index) => (
              <LegendContentWrap key={`item-${index}`}>
                <LegendContentBoxColor color={COLORS[cloud_brand === 'all' ? index : cloud_brand === 'aws' ? 0 : cloud_brand === 'gcp' ? 1 : 2]} />
                <LegendContentTitle>{entry}</LegendContentTitle>
              </LegendContentWrap>
            ))}
          </LegendWrap>
        </ChartWrapper>
      }
    </ChartContainer>
  );
};

export default HomeLineChartAnalytics;

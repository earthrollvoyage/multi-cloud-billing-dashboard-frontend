import { width } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
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
import ChartTypeDropdown from "../../../../formInput/dropdown/dashboard/chartType";
import { listDailyAWSCost } from "../../../../../services/billing/costAnalysis/aws/listDailyCost"
import { listMonthlyAWSCost } from "../../../../../services/billing/costAnalysis/aws/listMonthlyCost"
import { listDailyGCPCost } from "../../../../../services/billing/costAnalysis/gcp/listDailyCost"
import { listMonthlyGCPCost } from "../../../../../services/billing/costAnalysis/gcp/listMonthlyCost"
import { AzureFilterDataContext } from "../../../../../data/dashboardFilter/azure/filterDataContext";
import { filterAzureCostByPeriod } from "../../../../../services/billing/costAnalysis/azure/filterCostByPeriod"
import CircularIndeterminate from '../../../../progressLoading/circular/circularIndeterminate';
import AzureFilterComponent from '../../../../filter/dashboard/azure';
// import BasicSelect from "../../formInput/dropdown";

const ChartContainer = styled.div`
  width: 100%;
  height: 550px;
  flex: 3;
  /* margin-top: 15px;
  margin-left: 20px;
  margin-right: 15px; */
  /* padding: 20px; */
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  /* padding-right: 20px; */
  /* border: 2px solid rgb(244,244,244); */
  border-radius: 2px;
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
  /* border-bottom: 2px solid rgb(244,244,244); */
`;

const ChartTitleInnerLeft = styled.h3`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 18px;
  color: rgb(52, 52, 52);
  /* padding: 5px 0px; */
  /* border-bottom: 1px solid rgb(243, 209, 178); */
`;

const ChartTitleInnerRight = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  /* margin-top: 2px;
  margin-bottom: 5px; */
  font-size: 20px;
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
  height: 75%;
  /* padding-top: 10px; */
  padding-left: ${({ pdLeftValue }) => pdLeftValue};
  padding-right: ${({ pdRightValue }) => pdRightValue};
  font-family: "Inter";
  flex-direction: column;
`;

const ChartTop = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  /* flex-direction: row; */
  /* align-items: center; */
  /* justify-content: space-between; */
  /* border: 2px solid rgba(192, 187, 181, 0.2); */
`;

const ChartBottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 40px;
  /* align-items: center; */
  /* flex-direction: row; */
`;

const ChartBottomLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 4;
  align-items: center;
`;

const ChartBottomRight = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  /* margin-left: 20px; */
  flex: 0.5;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  /* justify-content: flex-end; */
  /* align-items: center; */
`;

const ChartTopInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* border: 2px solid rgba(192, 187, 181, 0.2); */
  /* flex-direction: row; */
  /* margin-left: 20px; */
`;

const ChartTopInnerContent = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: flex-start;
  font-size: ${({fontSize}) => fontSize ? fontSize + "px": "20px"};
  color: ${({color}) => color};
  margin-top: ${({marginTop}) => marginTop ? marginTop + "px": "0px"};
`;

const ChartTopInnerRight = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid rgba(192, 187, 181, 0.2); */
  margin-right: 20px
  margin-left: 10px;
`;

const ChartTopInnerRightContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: ${({fontSize}) => fontSize ? fontSize + "px": "20px"};
  color: ${({color}) => color};
  margin-top: ${({marginTop}) => marginTop ? marginTop + "px": "0px"};
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
  const [dataFetched, setDataFetched] = useState(false);
  const { azureFilterDataSet } = useContext(AzureFilterDataContext);

  useEffect(() => {
    const {dateRange, granularity, groupBy, listSelectBy} = filterDataSet;
    filterAzureCostByPeriod(dateRange.startDate, dateRange.endDate, granularity, groupBy, listSelectBy).then((res) => {
        setListCost(res.data_chart)
        setDataFetched(true);
    });
  }, [azureFilterDataSet]);

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

  const BarWithBorder = (borderHeight, borderColor) => {
    return (props) => {
      const { fill, x, y, width, height } = props;
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} stroke="none" fill={fill} />
          <rect x={x} y={y} width={width} height={borderHeight} stroke="none" fill={borderColor} />
        </g>
      );
    };
  };

  return (
    <ChartContainer>
      <ChartTitleWrap>
        <ChartTitleInnerLeft>{title}</ChartTitleInnerLeft>
        {/* <ChartTitleInnerRight>
          <Dropdown />
          <Dropdown />
          <Dropdown />
        </ChartTitleInnerRight> */}
      </ChartTitleWrap>
      {/* <ChartSubtitle>
        The chart below shows the proportion of costs spent for each service you
        use.
      </ChartSubtitle> */}
      { !dataFetched ? <CircularIndeterminate /> :
        <ChartWrapper
          pdRightValue={"20px"}
          pdLeftValue={"10px"}
        >
          <ChartTop>
            <ChartTopInner>
              <ChartTopInnerContent fontSize={16} color={"rgb(61, 181, 250)"}>
                <AzureFilterComponent />
              </ChartTopInnerContent>
            </ChartTopInner>
          </ChartTop>
          <ChartBottom>
            <ChartBottomLeft>
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
                      <stop offset="55%" stopColor="rgb(107,178,244)" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="rgb(16,100,214)" stopOpacity={1}/>
                      {/* <stop offset="95%" stopColor="rgb(107,220,228)" stopOpacity={1}/> */}
                  </linearGradient>
                </defs>
                {/* <XAxis dataKey={dataKey} interval={0} tick={{ fontWeight: "bold" ,fontSize: 11 }} /> */}
                <XAxis 
                    axisLine={false}
                    xAxisId={0} 
                    dy={10} 
                    dx={0} 
                    label={{ value: '', angle: 0, position: 'bottom' }} 
                    interval={0} 
                    dataKey={dataKey} 
                    tickLine={false} 
                    tick={{fontSize: 12 }}
                    scale="point"
                    fontFamily="Inter"
                    padding={{ left: 30, right: 20 }}/>
                {/* <XAxis xAxisId={1} dy={-15} dx={0} label={{ value: '', angle: 0, position: 'bottom' }} interval={10} dataKey="Year" tickLine={false} tick={{fontSize: 9, angle: 0}} /> */}
                <YAxis tickLine={false}  axisLine={false} tick={{fontSize: 13}}  />
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
                  fillOpacity={1} 
                  fill="url(#colorUv)"
                  // shape={BarWithBorder(3, "rgb(107,178,244)")}
                  // background={{ fill: '#050303' }}
                />
              </BarChart>
              </ResponsiveContainer>
            </ChartBottomLeft>
            {/* <ChartBottomRight>
              <AWSSidebar />
            </ChartBottomRight> */}
          </ChartBottom>
        </ChartWrapper>
      }
    </ChartContainer>
  );
};

export default DashboardBarChartAnalytics;

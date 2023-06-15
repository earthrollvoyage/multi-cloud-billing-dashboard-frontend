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
import { listCostSummary } from "../../../../services/billing/summary/listCostSummary";
import { HomeFilterDataContext } from "../../../../data/homeFilterContext";
import CircularIndeterminate from '../../../progressLoading/circular/circularIndeterminate';
import HomeChartFilterComponent from '../../../filter/home/chart';
// import BasicSelect from "../../formInput/dropdown";

const ChartContainer = styled.div`
  flex: 4;
  width: 100%;
  height: 700px;
  padding: 20px;
`;

const ChartTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChartTitleInnerLeft = styled.h3`
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

const HomeBarChartAnalytics = ({
  title,
  cloud_brand,
  filterDataSet,
  page,
  data,
  dataKey,
  dataValueKeys,
  legend,
  grid,
}) => {

  const [listCost, setListCost] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const { homeFilterDataSet } = useContext(HomeFilterDataContext);

  useEffect(() => {
    const { monthRange, cloudBrand } = filterDataSet;
    listCostSummary(monthRange.startMonth, monthRange.endMonth, cloudBrand).then((res) => {
      setListCost(res.data)
      setDataFetched(true);
    })

  }, [ homeFilterDataSet ]);

  const COLORS = ["rgb(16,100,214)", "rgb(107,220,228)", "rgb(107,178,244)", "rgba(255, 0, 0, 0.6)"];
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
        <HomeChartFilterComponent />
      </ChartTitleWrap>
      <ChartSubtitle>
        The chart below shows the proportion of costs spent for each cloud brand you use.
      </ChartSubtitle>
      { !dataFetched ? <CircularIndeterminate /> : 
        <ChartWrapper
          pdRightValue={page === "/dashboard" ? "30px" : "unset"}
          pdLeftValue={page === "/dashboard" ? "10px" : "unset"}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={listCost}
              margin={{
                top: 5,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="5 5" /> */}
              <defs>
                <linearGradient id="cell-0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="55%" stopColor="rgb(16,100,214)" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="rgb(16,100,214)" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="cell-1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="55%" stopColor="rgb(107,220,228)" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="rgb(107,220,228)" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="cell-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="55%" stopColor="rgb(107,178,244)" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="rgb(107,178,244)" stopOpacity={1}/>
                </linearGradient>
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
                padding={{ left: 50, right: 40 }}/>
              <YAxis tickCount={6} tickLine={false}  axisLine={false} tick={{fontSize: 13}}  />
              <Tooltip />
              {/* <Legend
                content={renderLegend}
                verticalAlign="bottom"
                align="center"
              /> */}
              {dataValueKeys.map((item, index) => (
                <Bar key={index} dataKey={item} fill={`url(#cell-${cloud_brand === 'all' ? index : cloud_brand === 'aws' ? 0 : cloud_brand === 'gcp' ? 1 : 2})`} />
              ))}
            </BarChart>
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

export default HomeBarChartAnalytics;

// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import styled from "styled-components";
// import Dropdown from "../../../formInput/dropdown";
// import { listCostSummary } from "../../../../services/billing/summary/listCostSummary";
// // import BasicSelect from "../../formInput/dropdown";

// const ChartContainer = styled.div`
//   /* width: 1150px;
//   height: 450px; */
//   flex: 4;
//   margin-top: 15px;
//   margin-left: 20px;
//   margin-right: 15px;
//   padding: 20px;
//   /* box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
//   -webkit-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
//   -moz-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29); */
//   border-radius: 5px;
//   background-color: #fff;
// `;

// const ChartTitleWrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   /* margin-top: 2px;
//   margin-bottom: 5px;
//   font-size: 20px;
//   color: rgb(52, 52, 52);
//   padding: 5px 0px; */
//   border-bottom: 1px solid rgb(243, 209, 178);
// `;

// const ChartTitleInnerLeft = styled.h3`
//   margin-top: 2px;
//   margin-bottom: 5px;
//   font-size: 20px;
//   color: rgb(52, 52, 52);
//   padding: 5px 0px;
//   /* border-bottom: 1px solid rgb(243, 209, 178); */
// `;

// const ChartSubtitle = styled.h5`
//   margin-bottom: 30px;
//   color: rgb(52, 52, 52);
//   font-size: 12px;
//   font-weight: 20px;
// `;

// const ChartWrapper = styled.div`
//   width: 100%;
//   height: 75%;
//   padding-top: 10px;
//   padding-left: ${({ pdLeftValue }) => pdLeftValue};
//   padding-right: ${({ pdRightValue }) => pdRightValue};
// `;

// const LegendWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 15px;
//   padding: 5px 0px;
//   /* border: 1px solid rgb(243, 209, 178); */
//   margin-left: 15em;
//   margin-right: 15em;
//   color: rgb(52, 52, 52);
// `;

// const LegendContentWrap = styled.span`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

// const LegendContentBoxColor = styled.div`
//   display: inline-block;
//   width: 18px;
//   height: 12px;
//   background-color: ${({ color }) => color};
//   margin-left: 10px;
//   margin-right: 10px;
// `;

// const LegendContentTitle = styled.div`
//   display: flex;
// `;

// const HomeBarChartAnalytics = ({
//   title,
//   page,
//   data,
//   dataKey,
//   dataValueKeys,
//   legend,
//   grid,
// }) => {

//   const [listCost, setListCost] = useState([]);

//   useEffect(() => {
//     listCostSummary('January 2021', 'November 2021').then((res) => {
//       setListCost(res)
//     })

//   }, []);

//   const COLORS = [
//     "rgb(255, 153, 0)",
//     "#00C49F",
//     "rgb(0, 138, 215)",
//     "rgb(255, 0, 0)",
//   ];

//   const renderLegend = () => {
//     return (
//       <LegendWrap>
//         {legend.reverse().map((entry, index) => (
//           <LegendContentWrap key={`item-${index}`}>
//             <LegendContentBoxColor color={COLORS[index]} />
//             <LegendContentTitle>{entry}</LegendContentTitle>
//           </LegendContentWrap>
//         ))}
//       </LegendWrap>
//     );
//   };

//   return (
//     <ChartContainer>
//       <ChartTitleWrap>
//         <ChartTitleInnerLeft>{title}</ChartTitleInnerLeft>
//         <Dropdown />
//       </ChartTitleWrap>
//       <ChartSubtitle>
//         The chart below shows the proportion of costs spent for each service you
//         use.
//       </ChartSubtitle>
//       <ChartWrapper
//         pdRightValue={page === "/dashboard" ? "30px" : "unset"}
//         pdLeftValue={page === "/dashboard" ? "10px" : "unset"}
//       >
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             width={500}
//             height={300}
//             data={listCost}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="5 5" />
//             <defs>
//               {/* {
//                 dataValueKeys.map((item, index) => (
//                     <linearGradient id={item} x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor={COLORS[index]} stopOpacity={0.2}/>
//                         <stop offset="95%" stopColor={COLORS[index]} stopOpacity={0}/>
//                     </linearGradient>
//                     )
//                )} */}
//             </defs>
//             <XAxis dataKey={dataKey} />
//             <YAxis />
//             <Tooltip />
//             <Legend
//               content={renderLegend}
//               verticalAlign="bottom"
//               align="center"
//             />
//             {dataValueKeys.map((item, index) => (
//               <Bar key={index} dataKey={item}  />
//             ))}
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartWrapper>
//     </ChartContainer>
//   );
// };

// export default HomeBarChartAnalytics;


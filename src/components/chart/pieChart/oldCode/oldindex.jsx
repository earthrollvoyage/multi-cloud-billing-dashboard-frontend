// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import {
//   PieChart,
//   Pie,
//   Sector,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Label,
//   Legend,
// } from "recharts";
// import { Marginer } from "../../marginer";
// import { getCurrentCostPercentage } from "../../../services/billing/summary/getCurrentCostPercentage";

// const ChartContainer = styled.div`
//   flex: 1.5;
//   margin-top: 15px;
//   margin-right: ${({ marginRightValue }) =>
//     marginRightValue ? `${marginRightValue}px` : "20px"};
//   padding: 20px;
//   /* box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
//   -webkit-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
//   -moz-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29); */
//   border-radius: 5px;
//   background-color: #fff;
// `;

// const ChartWrapper = styled.div`
//   width: 100%;
//   height: 75%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const TopFiveItemWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const TopFiveItemContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-direction: row;
//   border-left: 10px solid ${({ color }) => color};
//   /* margin: 2px 0px; */
//   padding-left: 5px;
//   font-size: 12px;
//   font-family: "Inter";
//   font-weight: bold;
//   color: rgb(52, 52, 52);
// `;

// const TopFiveItemContentTitle = styled.div``;

// const TopFiveItemContentCost = styled.div``;

// const ChartTitle = styled.h3`
//   margin-top: 2px;
//   margin-bottom: 5px;
//   font-size: 15px;
//   color: rgb(52, 52, 52);
//   padding: 5px 0px;
//   border-bottom: 1px solid rgb(243, 209, 178);
// `;

// const ChartSubtitle = styled.h5`
//   margin-bottom: ${({ marginValue }) => marginValue};
//   color: rgb(52, 52, 52);
//   font-size: 12px;
//   font-weight: 20px;
// `;

// const LegendWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 20px;
//   padding: 5px 0px;
//   font-family: "Inter";
//   font-weight: bold;
//   font-size: 13px;
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

// const PieChartAnalytics = ({
//   title,
//   data,
//   dataKey,
//   legend,
//   marginRightValue,
//   page,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [percentageCosts, setPercentageCosts] = useState({});
//   const [percentageCosts, setPercentageCosts] = useState({});
//   // const [percentageCosts, setPercentageCosts] = useState({
//   //   cost_on_clouds: [
//   //     {brand: 'AWS', percentage: 0},
//   //     {brand: 'GCP', percentage: 0},
//   //     {brand: 'AZURE', percentage: 0},
//   //     {brand: 'HUAWEI', percentage: 0},
//   //   ],
//   //   total: '$0'
//   // });

//   useEffect(() => {
//     if(page === "/home") {
//       getCurrentCostPercentage().then((res) => {
//         console.log("listCost 1222 :", res);
//         setPercentageCosts(res)
//       })
//     } else {
//       getCurrentCostPercentage().then((res) => {
//         console.log("listCost 1222 :", res);
//         setPercentageCosts(res)
//       })
//     }
//   }, []);

//   const COLORS =
//     page === "/home"
//       ? ["rgb(255, 153, 0)", "#00C49F", "rgb(0, 138, 215)", "rgb(255, 0, 0)"]
//       : ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

//   const RADIAN = Math.PI / 180;
//   const renderCustomizedLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     percent,
//     index,
//   }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         fontWeight="bold"
//         fontFamily="Inter"
//         dominantBaseline="central"
//         textAnchor="middle"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   const renderLegend = () => {
//     console.log("legend :", dataKey, legend);
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
//     <ChartContainer marginRightValue={marginRightValue}>
//       <ChartTitle>{title}</ChartTitle>
//       <ChartSubtitle marginValue={page === "/home" ? "15px" : "8px"}>
//         The chart below shows the proportion of costs spent for each service you
//         use.
//       </ChartSubtitle>
//       <ChartWrapper>
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart
//             width={400}
//             height={400}
//             fontSize={page === "/dashboard" ? 14 : 16}
//             fontFamily="Inter"
//           >
//             <Pie
//               data={percentageCosts.cost_on_clouds}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={renderCustomizedLabel}
//               outerRadius={page === "/dashboard" ? 100 : 120}
//               innerRadius={page === "/dashboard" ? 70 : 80}
//               startAngle={90}
//               endAngle={450}
//               // name="Percentage"
//               // unit="%"
//               // nameKey="age"
//               fill="#8884d8"
//               dataKey={dataKey}
//             >
//               {percentageCosts.cost_on_clouds.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//               <Label
//                 width={page === "/home" ? 30 : 20}
//                 fontSize={page === "/home" ? 25 : 30}
//                 position="center"
//               >
//                 { percentageCosts.total }
//               </Label>
//             </Pie>
//             <Tooltip
//               cursor={false}
//               formatter={(value, name) => [`${value}%`, `Age - ${name}`]}
//             />
//             {page === "/home" && (
//               <Legend
//                 content={renderLegend}
//                 verticalAlign="bottom"
//                 align="center"
//               />
//             )}
//           </PieChart>
//         </ResponsiveContainer>
//         {page === "/dashboard" && (
//           <>
//             <Marginer direction="vertical" margin="3px" />
//             <TopFiveItemWrap>
//               <TopFiveItemContent color="#FF8042">
//                 <TopFiveItemContentTitle>
//                   Elastic Compute Cloud
//                 </TopFiveItemContentTitle>
//                 <TopFiveItemContentCost>$1,426.71</TopFiveItemContentCost>
//               </TopFiveItemContent>
//               <TopFiveItemContent color="#FFBB28">
//                 <TopFiveItemContentTitle>
//                   Relational Database Service
//                 </TopFiveItemContentTitle>
//                 <TopFiveItemContentCost>$811.47</TopFiveItemContentCost>
//               </TopFiveItemContent>
//               <TopFiveItemContent color="#00C49F">
//                 <TopFiveItemContentTitle>
//                   Virtual Private Cloud
//                 </TopFiveItemContentTitle>
//                 <TopFiveItemContentCost>$717.42</TopFiveItemContentCost>
//               </TopFiveItemContent>
//               <TopFiveItemContent color="#0088FE">
//                 <TopFiveItemContentTitle>Data Transfer</TopFiveItemContentTitle>
//                 <TopFiveItemContentCost>$649.27</TopFiveItemContentCost>
//               </TopFiveItemContent>
//               <TopFiveItemContent color="#FF0000">
//                 <TopFiveItemContentTitle>
//                   {" "}
//                   Other Services
//                 </TopFiveItemContentTitle>
//                 <TopFiveItemContentCost>$2,931.57</TopFiveItemContentCost>
//               </TopFiveItemContent>
//             </TopFiveItemWrap>
//           </>
//         )}
//       </ChartWrapper>
//     </ChartContainer>
//   );
// };

// export default PieChartAnalytics;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import SectionInfo from "../../../components/sectionInfo/dashboard";
// import LargeWidget from "../../components/widget/largeWidget";
// import SmallWidget from "../../components/widget/smallWidget";
import styled from "styled-components";
import DashboardPieChartAnalytics from "../../../components/chart/pieChart/dashboard/aws/testd";
// import StackedBarChartAnalytics from "../../../components/chart/stackedBarChart/dashboard/aws";
import StackedBarChartAnalytics from "../../../components/chart/stackedBarChart/dashboard/aws/testd";
import DashboardBarChartAnalytics from "../../../components/chart/barChart/dashboard/aws";
import TableContent from "../../../components/tableContent";
import { ChartSelectContext } from "../../../data/chartSelectContext";
import { AWSFilterDataContext } from "../../../data/dashboardFilter/aws/filterDataContext";
// import DashboardLineChartAnalytics from "../../../components/chart/lineChart/dashboard/aws";
import DashboardLineChartAnalytics from "../../../components/chart/lineChart/dashboard/aws/testmain";
import DownloadButtonComponent from "../../../components/formInput/button/download";
import AWSSidebar from "../../../components/sidebar/dashboard/aws"

const moment = require('moment');

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 0px 20px;
`;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ChartContainerLeft = styled.div`
  width: 100%;
  display: flex;
  flex: 4.5;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 15px;
  /* padding: 20px; */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  /* border: 2px solid rgb(244,244,244); */
  border-radius: 2px;
  /* background-color: rgba(236, 140, 52, 0.7); */
`;

const ChartContainerLeftTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ChartContainerLeftMiddle = styled.div`
  /* width: 100%; */
  display: flex;
  margin-top: 70px;
  margin-right: 20px;
  justify-content: flex-end;
  /* background-color: rgba(236, 140, 52, 0.7); */
`;

const ChartContainerLeftBottom = styled.div`
  width: 100%;
  display: flex;
  padding-top: 5px;
`;

const ChartContainerMiddle = styled.div`
  width: 100%;
  display: flex;
  flex: 1.5;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 15px;
  border: 2px solid rgb(244,244,244);
  border-radius: 2px;
`;

const ChartContainerMiddleInner = styled.div`
  width: 100%;
  display: flex;
`;

const ChartContainerRight = styled.div`
  width: 100%;
  display: flex;
  flex: 2.5;
  flex-direction: column;
`;

const BottomContentContainer = styled.div`
  width: 100%;
  height: 43%;
  display: flex;
  flex-direction: row;
`;

const FilterWidgetWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
`;

const FilterWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  position: sticky;
  border-radius: 3px;
  padding: 6px;
  color: #fff;
  background-color: rgba(236, 140, 52, 0.7);
  top: 100px;
  height: 30px;
  width: 80px;
  transition: 350ms;
  left: ${({ leftPosition }) => `${leftPosition}px`};
  right: 10px;
  z-index: 9;

  &:hover {
    cursor: pointer;
    color: rgb(236, 140, 52);
    background-color: rgb(52, 52, 52);
  }
`;

const TopTitle = styled.div`
  display: flex;
  height: 60px;
  border-radius: 3px;
  justify-content: space-between;
  align-items: center;
  color:rgba(236, 140, 52);
  /* margin-left: 20px; */
  margin-right: 20px;
  margin-bottom: 20px;
  /* background-color: rgb(255, 255, 255); */
  /* box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  -moz-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5); */
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:rgba(236, 140, 52);
  /* margin-top: 30px; */
  margin-left: 20px;
`;

const MainTitle = styled.div`
  color: rgb(52, 52, 52);
  margin-bottom: 30px;
  margin-right: 10px;
  font-size: 22px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  color: rgb(141, 141, 141);
  margin-left: 1px;
  margin-top: 1px;
  margin-bottom: 30px;
  font-size: 16px;
  padding-top: 5px;
`;

const NavigatorWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 60px;
  margin-bottom: 10px;
`;

const NavigatorItemWord = styled.div`
  display: flex;
  align-items: center;
  color: rgb(141, 141, 141);
  font-size: 12px;
  margin-left: 10px;
`;

const NavigatorItemLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: rgb(4,100,251);
  font-size: 12px;
  &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
`;

const AWSBillingDashboard = ({
  data,
  dataPie,
  dataStack,
  showSidebar,
  sidebarActive,
  page,
}) => {
  
  let startDate = moment(new Date()).subtract(12,'months')
  let endDate = moment(new Date()).subtract(1,'months')
  let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
  let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);

  const [toggleChart, setToggleChart] = useState("line");
  const [awsFilterDataSet, setAWSFilterDataSet] = useState({
    dateRange: { startDate: startDateDefault, endDate: endDateDefault },
    granularity: 'monthly',
    groupBy: 'linked_account',
    listSelectBy: [],
    pieChart: {
      top_five_cost: [
        { name: 'Other Services', total: 0.00 }
      ],
      top_five_title: [
        'Other Services'
      ],
      total: '$0.00'
    }
  });
  
  const handleChange = (valueSelect) => {
    setToggleChart(valueSelect);
  };

  const handleChangeAWSFilter = (valueSelect) => {
    setAWSFilterDataSet(valueSelect);
  };

  const chartSelectContext = { toggleChart, handleChange };
  const awsFilterDataContext = { awsFilterDataSet, handleChangeAWSFilter };

  return (
    <AWSFilterDataContext.Provider value={awsFilterDataContext}>
      <ChartSelectContext.Provider value={chartSelectContext}>
        {/* <AWSSidebar sidebarActive={sidebarActive} showSidebar={showSidebar} /> */}
        <DashboardContainer>
          {/* <FilterWidget leftPosition={window.innerWidth} onClick={showSidebar}>
            FILTERS
          </FilterWidget> */}
          <NavigatorWrap>
            <NavigatorItemLink to='/home' >Billing Summary Dashboard</NavigatorItemLink>
            <NavigatorItemWord><i class="fas fa-angle-right"></i></NavigatorItemWord>
            <NavigatorItemWord>AWS Cost Analysis</NavigatorItemWord> 
          </NavigatorWrap>
          <TopTitle>
            <Title>
              {/* <MainTitle>
                <i className="fad fa-chart-bar" style={{ color: "rgb(4,100,251)", fontSize: "30px", marginTop: "6px"  }}></i>
              </MainTitle> */}
              <MainTitle>Billing Summary</MainTitle>
              <MainTitle>|</MainTitle>
              <SubTitle>AWS Cost Analysis</SubTitle>
            </Title>
          </TopTitle>
          <DashboardWrapper>
            <SectionInfo page={page} fSpendtopthree="Accounts" sSpendtopthree="Services" />
            <ChartContainer>
              <ChartContainerLeft>
                <ChartContainerLeftTop>
                  {toggleChart === "line" ? (
                    <DashboardLineChartAnalytics
                      title={ awsFilterDataSet.groupBy === "linked_account" ? "Expense by Account" : "Expense by Service" }
                      filterDataSet={awsFilterDataSet}
                      page={page}
                      data={data}
                      dataKey="month"
                      dataValueKeys="Costs"
                      grid
                    />
                  ) : (
                    <DashboardBarChartAnalytics
                      title={ awsFilterDataSet.groupBy === "linked_account" ? "Expense by Account" : "Expense by Service" }
                      filterDataSet={awsFilterDataSet}
                      page={page}
                      data={data}
                      dataKey="month"
                      dataValueKeys="Costs"
                      grid
                      granularity="MONTHLY"
                    />
                  )}
                </ChartContainerLeftTop>
                <ChartContainerLeftMiddle>
                  <DownloadButtonComponent />
                </ChartContainerLeftMiddle>
                <ChartContainerLeftBottom>
                  <TableContent
                    title={ awsFilterDataSet.groupBy === "linked_account" ? "Expense by Account" : "Expense by Service" }
                    filterDataSet={awsFilterDataSet}
                    page={page}
                    fontsize="20px"
                    // marginRightValue={20}
                  />
                </ChartContainerLeftBottom>
              </ChartContainerLeft>
              <ChartContainerRight>
                <StackedBarChartAnalytics
                  title="Forecasted month end costs"
                  // data={dataStack}
                  dataKey="month"
                  legend={["Expense ($)", "Forecast ($)"]}
                  page={page}
                />
                <DashboardPieChartAnalytics
                  filterDataSet={awsFilterDataSet}
                  page={page}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  marginRightValue={20}
              />
              </ChartContainerRight>
            </ChartContainer>
          </DashboardWrapper>
        </DashboardContainer>
      </ChartSelectContext.Provider>
    </AWSFilterDataContext.Provider>
  );
};

export default AWSBillingDashboard;

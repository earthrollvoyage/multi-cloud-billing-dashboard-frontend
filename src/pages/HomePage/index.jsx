import React, { useEffect, useState } from "react";
import SectionInfo from "../../components/sectionInfo/home";
import LargeWidget from "../../components/widget/largeWidget";
import SmallWidget from "../../components/widget/smallWidget";
import styled from "styled-components";
import HomePieChartAnalytics from "../../components/chart/pieChart/home";
import HomeCloudBrandPieChartAnalytics from "../../components/chart/pieChart/home/cloudBrand";
import HomeBarChartAnalytics from "../../components/chart/barChart/home";
import TableContent from "../../components/tableContent";
import { ChartSelectContext } from "../../data/chartSelectContext";
import { HomeFilterDataContext } from "../../data/homeFilterContext";
import HomeLineChartAnalytics from "../../components/chart/lineChart/home";
import HomePeriodFilterComponent from "../../components/filter/home/period";
import DownloadButtonComponent from "../../components/formInput/button/download";

const moment = require('moment');

const HomePageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const HomePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
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
  flex: 5;
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
  height: 580px;
  display: flex;
  flex-direction: row;
  /* background-color: rgba(236, 140, 52, 0.7); */
`;

const ChartContainerLeftMiddle = styled.div`
  /* width: 100%; */
  display: flex;
  margin-top: 50px;
  margin-right: 20px;
  justify-content: flex-end;
  /* background-color: rgba(236, 140, 52, 0.7); */
`;

const ChartContainerLeftBottom = styled.div`
  width: 100%;
  display: flex;
  /* margin-top: 20px; */
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
  flex: 2.3;
  flex-direction: column;
`;

const TableContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const FilterWidgetWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
`;

const TitleWrap = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  margin-left: 20px;
  margin-top: 40px;
  margin-right: 20px;
`;

const TitleName = styled.h3`
  color: rgb(52, 52, 52);
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 20px;
  font-weight: bold;
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

const HomePage = ({ data, dataPie, showSidebar, sidebarActive, page }) => {

  let startDate = moment(new Date()).subtract(12,'months')
  let endDate = moment(new Date()).subtract(1,'months')
  let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
  let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);

  const [toggleChart, setToggleChart] = useState("line");
  const [homeFilterDataSet, setHomeFilterDataSet] = useState({
    monthRange: { startMonth: startDateDefault, endMonth: endDateDefault },
    cloudBrand: 'all',
  });
  
  const handleChangeHomeFilter = (valueSelect) => {
    setHomeFilterDataSet(valueSelect);
  };

  const handleChange = (valueSelect) => {
    setToggleChart(valueSelect);
  };

  const chartSelectContext = { toggleChart, handleChange };
  const homeFilterDataContext = { homeFilterDataSet, handleChangeHomeFilter };

  return (
    <HomeFilterDataContext.Provider value={homeFilterDataContext}>
      <ChartSelectContext.Provider value={chartSelectContext}>
        <HomePageContainer>
          {/* <FilterWidget leftPosition={window.innerWidth} onClick={showSidebar}>
              FILTERS
          </FilterWidget> */}
          <TitleWrap>
            {/* <i
              className="fad fa-chart-bar"
              style={{ color: "rgb(236, 140, 52)", fontSize: "20px", marginLeft: "20px", marginTop: "5px" }}
            ></i> */}
            <TitleName>Billing Summary Dashboard</TitleName>
          </TitleWrap>
          <HomePageWrapper>
            <SectionInfo />
            <HomePeriodFilterComponent />
            <ChartContainer>
              <ChartContainerLeft>
                <ChartContainerLeftTop>
                  {toggleChart === "line" ? (
                    <HomeLineChartAnalytics
                      title="Cost By Cloud Providers"
                      cloud_brand={homeFilterDataSet.cloudBrand}
                      filterDataSet={homeFilterDataSet}
                      page={page}
                      data={data}
                      dataKey="short_month"
                      dataValueKeys={
                        homeFilterDataSet.cloudBrand === 'all' ? ["AWS", "GCP", "AZURE"] :
                        homeFilterDataSet.cloudBrand === 'aws' ? ["AWS"] :
                        homeFilterDataSet.cloudBrand === 'gcp' ? ["GCP"] :
                        homeFilterDataSet.cloudBrand === 'azure' ? ["AZURE"] :["HUAWEI"] 
                      }
                      legend={
                        homeFilterDataSet.cloudBrand === 'all' ? ["AWS", "GCP", "AZURE"] :
                        homeFilterDataSet.cloudBrand === 'aws' ? ["AWS"] :
                        homeFilterDataSet.cloudBrand === 'gcp' ? ["GCP"] :
                        homeFilterDataSet.cloudBrand === 'azure' ? ["AZURE"] :["HUAWEI"] 
                      }
                      grid
                    />
                  ) : (
                    <HomeBarChartAnalytics
                      title="Cost By Cloud Providers"
                      cloud_brand={homeFilterDataSet.cloudBrand}
                      filterDataSet={homeFilterDataSet}
                      page={page}
                      data={data}
                      dataKey="short_month"
                      dataValueKeys={
                        homeFilterDataSet.cloudBrand === 'all' ? ["AWS", "GCP", "AZURE"] :
                        homeFilterDataSet.cloudBrand === 'aws' ? ["AWS"] :
                        homeFilterDataSet.cloudBrand === 'gcp' ? ["GCP"] :
                        homeFilterDataSet.cloudBrand === 'azure' ? ["AZURE"] :["HUAWEI"] 
                      }
                      legend={
                        homeFilterDataSet.cloudBrand === 'all' ? ["AWS", "GCP", "AZURE"] :
                        homeFilterDataSet.cloudBrand === 'aws' ? ["AWS"] :
                        homeFilterDataSet.cloudBrand === 'gcp' ? ["GCP"] :
                        homeFilterDataSet.cloudBrand === 'azure' ? ["AZURE"] :["HUAWEI"] 
                      }
                      grid
                    />
                  )}
                </ChartContainerLeftTop>
                <ChartContainerLeftMiddle>
                  <DownloadButtonComponent />
                </ChartContainerLeftMiddle>
                <ChartContainerLeftBottom>
                  <TableContent
                    title="Cost By Cloud Providers"
                    filterDataSet={homeFilterDataSet}
                    // marginRightValue={0}
                    page={page}
                  />
                </ChartContainerLeftBottom>
              </ChartContainerLeft>
              <ChartContainerRight>
                <HomePieChartAnalytics
                  title="Spend by Cloud Providers"
                  filterDataSet={homeFilterDataSet}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  // legend={["AWS", "GCP", "AZURE", "HUAWEI"]}
                  legend={["AWS", "GCP", "AZURE"]}
                  marginRightValue={20}
                />
                <HomeCloudBrandPieChartAnalytics
                  title="Average Cost Percentage of AWS"
                  filterDataSet={homeFilterDataSet}
                  title_brand="aws"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  // legend={["AWS", "GCP", "AZURE", "HUAWEI"]}
                  legend={["AWS", "GCP", "AZURE"]}
                  marginRightValue={20}
                />
                <HomeCloudBrandPieChartAnalytics
                  title="Average Cost Percentage of GCP"
                  filterDataSet={homeFilterDataSet}
                  title_brand="gcp"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  // legend={["AWS", "GCP", "AZURE", "HUAWEI"]}
                  legend={["AWS", "GCP", "AZURE"]}
                  marginRightValue={20}
                />
                <HomeCloudBrandPieChartAnalytics
                  title="Average Cost Percentage of Azure"
                  filterDataSet={homeFilterDataSet}
                  title_brand="azure"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  // legend={["AWS", "GCP", "AZURE", "HUAWEI"]}
                  legend={["AWS", "GCP", "AZURE"]}
                  marginRightValue={20}
                />
              </ChartContainerRight>
            </ChartContainer>
            {/* <TableContentContainer>
              <TableContent
                title="Cost By Cloud Providers"
                marginRightValue={20}
                page={page}
              />
            </TableContentContainer> */}
          </HomePageWrapper>
        </HomePageContainer>
      </ChartSelectContext.Provider>
    </HomeFilterDataContext.Provider>
  );
};

export default HomePage;

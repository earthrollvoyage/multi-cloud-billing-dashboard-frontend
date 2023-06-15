import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HomeSidebar from "../../components/sidebar/home";
import AWSSidebar from "../../components/sidebar/dashboard/aws";
import AzureSidebar from "../../components/sidebar/dashboard/azure";
import GCPSidebar from "../../components/sidebar/dashboard/gcp";
import HuaweiSidebar from "../../components/sidebar/dashboard/huawei";
import Topbar from "../../components/topbar";
import AWSBillingDashboard from "../Dashboard/aws";
import GCPBillingDashboard from "../Dashboard/gcp";
import AZUREBillingDashboard from "../Dashboard/azure";
import HUAWEIBillingDashboard from "../Dashboard/huawei";
import HomePage from "../HomePage";
import { InnerPageContainer } from "../../components/pageContainer";
import styled from "styled-components";
import {
  dataMainChartHomePage,
  dataPieChartHomePage,
  dataTopFiveServices,
  dataMainChartDashboardPage,
  forecastedDashboardData
} from "../../data/dummy";
import { FilterDataContext } from "../../data/dashboardFilter/filterDataContext";

const MainPageContainer = styled(InnerPageContainer)`
  flex: unset;
  min-height: 100%;
  padding: 0;
  margin: 0;
  flex-direction: column;
  align-items: unset;
`;

const MainPageWrapper = styled.div`
  display: flex;
`;

const MainPageSidebarWrapper = styled.div`
  background-color: rgb(236, 236, 236);
`;

const MainPageContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 5;
  padding-left: 10px;
  background-color: rgb(255, 255, 255);
  /* background-color: rgb(236, 236, 236); */
`;

export default function Main() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [filterData, setFilterData] = useState({});
  const showSidebar = () => setSidebarActive(!sidebarActive);
  const { pathname } = useLocation();
  const { action } = useParams();

  const filterDataHandleChange = (value) => {
    setFilterData(value);
  };

  const filterDataContext = { filterData, filterDataHandleChange };

  return (
    <FilterDataContext.Provider value={ filterDataContext }>
      <MainPageContainer>
        <Topbar showSidebar={showSidebar} />
        <MainPageWrapper>
          <MainPageContentWrapper>
            {pathname === "/aws/billing/costAnalysis" && (
              <AWSBillingDashboard
                data={dataMainChartDashboardPage}
                dataPie={dataTopFiveServices}
                dataStack={forecastedDashboardData}
                showSidebar={showSidebar}
                sidebarActive={sidebarActive}
                page={pathname}
              />
            )}
            {pathname === "/gcp/billing/costAnalysis" && (
              <GCPBillingDashboard
                data={dataMainChartDashboardPage}
                dataPie={dataTopFiveServices}
                dataStack={forecastedDashboardData}
                showSidebar={showSidebar}
                sidebarActive={sidebarActive}
                page={pathname}
              />
            )}
            {pathname === "/azure/billing/costAnalysis" && (
              <AZUREBillingDashboard
                data={dataMainChartDashboardPage}
                dataPie={dataTopFiveServices}
                dataStack={forecastedDashboardData}
                showSidebar={showSidebar}
                sidebarActive={sidebarActive}
                page={pathname}
              />
            )}
            {/* {pathname === "/huawei/billing/costAnalysis" && (
              <HUAWEIBillingDashboard
                data={dataMainChartDashboardPage}
                dataPie={dataTopFiveServices}
                dataStack={forecastedDashboardData}
                showSidebar={showSidebar}
                sidebarActive={sidebarActive}
                page={pathname}
              />
            )} */}
            {pathname === "/home" && (
              <HomePage
                data={dataMainChartHomePage}
                dataPie={dataPieChartHomePage}
                showSidebar={showSidebar}
                sidebarActive={sidebarActive}
                page={pathname}
              />
            )}
          </MainPageContentWrapper>
          {/* <MainPageSidebarWrapper sidebarActive={sidebarActive}>
            {pathname === "/home" && (
              <HomeSidebar sidebarActive={sidebarActive} showSidebar={showSidebar} />
            )}
            {pathname === "/aws/billing/costAnalysis" && (
              <AWSSidebar sidebarActive={sidebarActive} showSidebar={showSidebar} />
            )}
            {pathname === "/azure/billing/costAnalysis" && (
              <AzureSidebar sidebarActive={sidebarActive} showSidebar={showSidebar} />
            )}
            {pathname === "/gcp/billing/costAnalysis" && (
              <GCPSidebar sidebarActive={sidebarActive} showSidebar={showSidebar} />
            )}
            {pathname === "/huawei/billing/costAnalysis" && (
              <HuaweiSidebar sidebarActive={sidebarActive} showSidebar={showSidebar} />
            )}
          </MainPageSidebarWrapper> */}
        </MainPageWrapper>
      </MainPageContainer>
    </FilterDataContext.Provider>
  );
}
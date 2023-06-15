import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PersonOutline,
  MonetizationOnOutlined,
  AttachMoneyOutlined,
} from "@material-ui/icons";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import LineChartTest from "../../chart/lineChart/dashboard/aws/testd"
import SimpleBarChart from "../../chart/barChart/dashboard/aws/testd"
import { getCurrentAWSCostStatus } from "../../../services/billing/costAnalysis/aws/getCurrentCostStatus"
import { getCurrentAzureCostStatus } from "../../../services/billing/costAnalysis/azure/getCurrentCostStatus"
import { getCurrentGCPCostStatus } from "../../../services/billing/costAnalysis/gcp/getCurrentCostStatus"
import CircularIndeterminate from '../../../components/progressLoading/circular/circularIndeterminate';

const SectionInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SectionInfoItem = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: flex-end; */
  /* justify-content: space-between; */
  margin-left: ${({ marginLeftValue }) => `${marginLeftValue}px`};
  margin-right: ${({ marginRightValue }) => `${marginRightValue}px`};
  /* padding: ${({ paddingValue }) => `${paddingValue}px`}; */
  border-radius: 2px;
  padding-top: 20px;
  padding-bottom: 10px;
  /* cursor: pointer; */
  /* box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  -moz-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5); */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 2px;
  background-color: #fff;
  /* border: 2px solid rgb(244,244,244); */
  /* background: rgb(236,140,52);
  background: linear-gradient(90deg, rgba(236,140,52,1) 20%, rgba(245,207,171,1) 100%); */
`;

const SectionInfoINumberContainer = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: flex-end;  */
  flex-direction: column;
  /* border-left: ${({ borderValue }) =>
    borderValue
      ? `${borderValue}px solid rgb(204, 205, 198)`
      : "0px solid rgb(204, 205, 198)"}; */
`;

const SectionInfoTitle = styled.span`
  display: flex;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  /* justify-content: flex-start; */
  color: rgb(52, 52, 52);
`;

const SectionInfoINumberWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

`;

const SectionInfoINumberLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize ? fontSize + "px" : "25px"};
  font-weight: 20px;
  margin-top: 20px;
  margin-left: 20px;
  color: rgb(52, 52, 52);
  margin-bottom: 10px;
`;

const SectionInfoINumberRight = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const SectionInfoINumberLeftInnerRight = styled.div`
  display: flex;
  flex-direction: row;
`;

const SectionInfoINumberRightPercent = styled.div`
  display: flex;
  align-items: center;
  color: rgb(52, 52, 52);
  font-size: ${({ fontSize }) => fontSize};
  margin-right: 5px;
`;

const SectionInfoINumberRightCompare = styled.div`
  display: flex;
  align-items: center;
  color: rgb(104, 103, 103);
  font-size: 11px;
  font-weight: bold;
`;

const NumberLabel = styled.span`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "unset")};
  margin-left: ${({ marginLeftValue }) => (marginLeftValue ? marginLeftValue : "0px")};
  /* font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "unset")}; */
`;

const SectionInfoITopThreeWrap = styled.div`
  /* width: 100%; */
  display: flex;
  /* justify-content: flex-end; */
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
`;

const SectionInfoITopThreeInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-size: ${({ fontSize }) => fontSize ? fontSize + "px" : "25px"};
  font-weight: 20px;
  margin-top: ${({ marginTop }) => marginTop ? marginTop + "px" : "0px"};
  /* margin-left: 10px; */
  color: rgb(52, 52, 52);
`;

const TopFiveItemContentTitle = styled.div``;

const TopFiveItemContentCost = styled.div``;

const PersonOutlineIcon = styled(PersonOutline)`
  margin-right: 5px;
  font-size: 35px !important;
  color: rgb(52, 52, 52);
`;

const MonetizationOnOutlinedIcon = styled(MonetizationOnOutlined)`
  margin-right: 5px;
  font-size: 35px !important;
  color: rgb(52, 52, 52);
`;

const AttachMoneyOutlinedIcon = styled(AttachMoneyOutlined)`
  margin-right: 5px;
  font-size: 35px !important;
  color: rgb(52, 52, 52);
`;

const AttachMoneyIconIcon = styled(AttachMoneyIcon)`
  /* margin-right: 5px; */
  font-size: 28px !important;
  color: rgb(52, 52, 52);
  margin-left: -6px;
`;

const DollarIcon = styled.i`
  margin-right: 5px;
  font-size: 35px;
  color: rgb(52, 52, 52);
`;

const SectionInfo = ({ compareTitle = "last month", page, fSpendtopthree, sSpendtopthree }) => {
  let currentDate = new Date();
  let forecastDate = new Date();
  let previousDate = new Date();
  currentDate.setMonth(currentDate.getMonth()-1)
  previousDate.setMonth(previousDate.getMonth()-2)
  let currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  let forecastMonth = forecastDate.toLocaleString('default', { month: 'long' })
  let previousMonth = previousDate.toLocaleString('default', { month: 'long' })

  const [dataFetched, setDataFetched] = useState(false);
  const [costStatus, setCostStatus] = useState({
    recent_update: '',
    current_cost: '',
    forecast_cost: '',
    previous_cost: '',
    current_cost_percent: '',
    forecast_cost_percent: '',
    account_top_three: [{name: '-', total: 0.00}],
    project_top_three: [{name: '-', total: 0.00}],
    services_top_three: [{name: '-', total: 0.00}],
    billing_profile_top_three: [{name: '-', total: 0.00}]
  });

  useEffect(() => {
    if (page === '/aws/billing/costAnalysis') {
      getCurrentAWSCostStatus().then((res) => {
        setCostStatus(res);
        setDataFetched(true);
      })
    } else if (page === '/azure/billing/costAnalysis') {
      getCurrentAzureCostStatus().then((res) => {
        setCostStatus(res);
        setDataFetched(true);
      })
    } else {
      getCurrentGCPCostStatus().then((res) => {
        setCostStatus(res);
        setDataFetched(true);
      })
    }
  }, []);

  return (
    <SectionInfoContainer>
      <SectionInfoItem
        paddingValue={30}
        marginLeftValue={20}
        marginRightValue={30}
      >
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer>
            <SectionInfoTitle>{ `${currentMonth} ${currentDate.getFullYear()} (current costs)` }</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <AttachMoneyIconIcon />
                <NumberLabel color="rgb(52, 52, 52)">{costStatus.current_cost}</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberLeftInnerRight>
                  <SectionInfoINumberRightPercent fontSize="13px">
                    <i
                      className="fas fa-long-arrow-alt-up"
                      style={{ color: "rgb(52, 52, 52)" }}
                    ></i>
                    <NumberLabel
                      color="#00C49F"
                      marginLeftValue="5px"
                      fontWeight="bold"
                    >
                      {costStatus.current_cost_percent}
                    </NumberLabel>
                  </SectionInfoINumberRightPercent>
                  <SectionInfoINumberRightCompare>
                    Over last month
                  </SectionInfoINumberRightCompare>
                </SectionInfoINumberLeftInnerRight>
                {/* <LineChartTest  /> */}
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
        }
      </SectionInfoItem>
      <SectionInfoItem
        paddingValue={30}
        marginLeftValue={0}
        marginRightValue={30}
      >
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>{ `${forecastMonth} ${forecastDate.getFullYear()} (forecast costs)` }</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <AttachMoneyIconIcon />
                <NumberLabel color="rgb(52, 52, 52)">{costStatus.forecast_cost}</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberLeftInnerRight>
                  <SectionInfoINumberRightPercent fontSize="13px">
                    <i
                      className="fas fa-long-arrow-alt-up"
                      style={{ color: "rgb(52, 52, 52)" }}
                    ></i>
                    <NumberLabel
                      color="#00C49F"
                      marginLeftValue="5px"
                      fontWeight="bold"
                    >
                      {costStatus.forecast_cost_percent}
                    </NumberLabel>
                  </SectionInfoINumberRightPercent>
                  <SectionInfoINumberRightCompare>
                    Over last month
                  </SectionInfoINumberRightCompare>
                </SectionInfoINumberLeftInnerRight>
                {/* <LineChartTest /> */}
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
        }
      </SectionInfoItem>
      {/* <SectionInfoItem
        paddingValue={30}
        marginLeftValue={0}
        marginRightValue={15}
      >
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>{ previousMonth } { previousDate.getFullYear() }</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <AttachMoneyIconIcon />
                <NumberLabel color="rgb(52, 52, 52)">{costStatus.previous_cost}</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberLeftInnerRight>
                  <SectionInfoINumberRightPercent fontSize="13px">
                    <i
                      className="fas fa-long-arrow-alt-up"
                      style={{ color: "rgb(52, 52, 52)" }}
                    ></i>
                    <NumberLabel
                      color="#00C49F"
                      marginLeftValue="2px"
                      fontWeight="bold"
                    >
                      {costStatus.forecast_cost_percent}
                    </NumberLabel>
                  </SectionInfoINumberRightPercent>
                  <SectionInfoINumberRightCompare>
                    Over last month
                  </SectionInfoINumberRightCompare>
                </SectionInfoINumberLeftInnerRight>
                <LineChartTest />
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
        }
      </SectionInfoItem> */}
      <SectionInfoItem
        paddingValue={30}
        marginLeftValue={0}
        marginRightValue={30}
      >
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Top 3 Spend by {fSpendtopthree}</SectionInfoTitle>
            <SimpleBarChart data={page === '/aws/billing/costAnalysis' ? costStatus.account_top_three : 
              page === '/azure/billing/costAnalysis' ? costStatus.service_family_top_three : costStatus.project_top_three} />
          </SectionInfoINumberContainer>
        }
      </SectionInfoItem>
      <SectionInfoItem
        paddingValue={30}
        marginLeftValue={0}
        marginRightValue={20}
      >
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Top 3 Spend by {sSpendtopthree}</SectionInfoTitle>
            <SimpleBarChart data={page === '/aws/billing/costAnalysis' ? costStatus.services_top_three : 
              page === '/azure/billing/costAnalysis' ? costStatus.services_top_three : costStatus.services_top_three} />
          </SectionInfoINumberContainer>
        }
      </SectionInfoItem>
    </SectionInfoContainer>
  );
};

export default SectionInfo;

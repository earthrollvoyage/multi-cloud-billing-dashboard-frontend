import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PersonOutline,
  MonetizationOnOutlined,
  AttachMoneyOutlined,
} from "@material-ui/icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
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
  flex: 5;
  display: flex;
  justify-content: space-between;
  margin-left: ${({ marginLeftValue }) => `${marginLeftValue}px`};
  margin-right: ${({ marginRightValue }) => `${marginRightValue}px`};
  padding: ${({ paddingValue }) => `${paddingValue}px`};
  border-radius: 3px;
  /* cursor: pointer; */
  box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  -moz-box-shadow: 2px 2px 5px 4px rgba(192, 187, 181, 0.5);
  background-color: #fff;
  border-left: 10px solid rgb(236, 140, 52);
  /* background: rgb(236,140,52);
  background: linear-gradient(90deg, rgba(236,140,52,1) 20%, rgba(245,207,171,1) 100%); */
`;

const SectionInfoTitle = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
  color: rgb(52, 52, 52);
`;

const SectionInfoINumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: ${({ borderValue }) =>
    borderValue
      ? `${borderValue}px solid rgb(204, 205, 198)`
      : "0px solid rgb(204, 205, 198)"};
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
  margin-left: 10px;
  color: rgb(52, 52, 52);
`;

const SectionInfoINumberRight = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  /* color: rgb(52, 52, 52); */
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 10px;
`;

const SectionInfoINumberRightPercent = styled.div`
  display: flex;
  align-items: center;
  color: rgb(52, 52, 52);
  font-size: ${({ fontSize }) => fontSize};
`;

const SectionInfoINumberRightCompare = styled.div`
  display: flex;
  align-items: center;
  color: rgb(104, 103, 103);
  font-size: 11px;
  font-weight: bold;
`;

const NumberLabel = styled.span`
  margin-left: ${({ marginLeftValue }) =>
    marginLeftValue ? marginLeftValue : "10px"};
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "unset")};
  /* font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "unset")}; */
`;

const SectionInfoITopThreeWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionInfoITopThreeInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-size: ${({ fontSize }) => fontSize ? fontSize + "px" : "25px"};
  font-weight: 20px;
  margin-top: ${({ marginTop }) => marginTop ? marginTop + "px" : "0px"};
  margin-left: 10px;
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
        marginRightValue={20}
      >
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer>
            <SectionInfoTitle>{ currentMonth } { currentDate.getFullYear() } Expense</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <i
                  className="fad fa-usd-circle"
                  style={{ color: "#00C49F", fontSize: "25px" }}
                ></i>
                <NumberLabel color="#00C49F">{costStatus.current_cost}</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberRightPercent fontSize="16px">
                  <i
                    className="fas fa-long-arrow-alt-up"
                    style={{ color: "rgb(52, 52, 52)" }}
                  ></i>
                  <NumberLabel
                    color="#00C49F"
                    marginLeftValue="2px"
                    fontWeight="bold"
                  >
                    {costStatus.current_cost_percent}
                  </NumberLabel>
                </SectionInfoINumberRightPercent>
                <SectionInfoINumberRightCompare>
                  Over last month
                </SectionInfoINumberRightCompare>
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
        }
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>{ forecastMonth } { forecastDate.getFullYear() } Expense</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <i
                  className="fad fa-usd-circle"
                  style={{ color: "#0088FE", fontSize: "25px" }}
                ></i>
                <NumberLabel color="#0088FE">{costStatus.forecast_cost}</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberRightPercent fontSize="16px">
                  <i
                    className="fas fa-long-arrow-alt-up"
                    style={{ color: "rgb(52, 52, 52)" }}
                  ></i>
                  <NumberLabel
                    color="#0088FE"
                    marginLeftValue="2px"
                    fontWeight="bold"
                  >
                    {costStatus.forecast_cost_percent}
                  </NumberLabel>
                </SectionInfoINumberRightPercent>
                <SectionInfoINumberRightCompare>
                  Over last month
                </SectionInfoINumberRightCompare>
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
        }
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>{ previousMonth } { previousDate.getFullYear() } Expense</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <i
                  className="fad fa-usd-circle"
                  style={{ color: "rgb(236, 140, 52)", fontSize: "25px" }}
                ></i>
                <NumberLabel color="rgb(236, 140, 52)">{costStatus.previous_cost}</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberRightPercent fontSize="13px">
                  <NumberLabel
                    color="rgb(52, 52, 52)"
                    marginLeftValue="2px"
                    //   fontWeight="bold"
                  >
                    Recent Updates
                  </NumberLabel>
                </SectionInfoINumberRightPercent>
                <SectionInfoINumberRightCompare>
                {costStatus.recent_update}
                </SectionInfoINumberRightCompare>
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
        }
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Top 3 Spend by {fSpendtopthree}</SectionInfoTitle>
            <SectionInfoITopThreeWrap>
            { 
                page === '/aws/billing/costAnalysis' ? (
                  costStatus.account_top_three.map((entry, index) => (
                    <SectionInfoITopThreeInner key={index + 1} fontSize={11} marginTop={10}>
                      <TopFiveItemContentTitle>
                          {entry.name}
                      </TopFiveItemContentTitle>
                      <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                    </SectionInfoITopThreeInner>
                    // <SectionInfoITopThreeInner fontSize={15} marginTop={10}>
                    //   {/* <i
                    //     className="fad fa-toolbox"
                    //     style={{ color: "rgb(52, 52, 52)", fontSize: "10px" }}
                    //   ></i> */}
                    //   {/* <NumberLabel color="rgb(236, 140, 52)">{ costStatus.services_total }</NumberLabel> */}
                      
                    //   <NumberLabel color="rgb(236, 140, 52)">225</NumberLabel>
                    // </SectionInfoITopThreeInner>
                  ))
                ) : ( page === '/azure/billing/costAnalysis' ? (
                  costStatus.billing_profile_top_three.map((entry, index) => (
                    <SectionInfoITopThreeInner key={index + 1} fontSize={11}>
                      <TopFiveItemContentTitle>
                          {entry.name}
                      </TopFiveItemContentTitle>
                      <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                    </SectionInfoITopThreeInner>
                    // <SectionInfoITopThreeInner fontSize={15} marginTop={10}>
                    //   {/* <i
                    //     className="fad fa-toolbox"
                    //     style={{ color: "rgb(52, 52, 52)", fontSize: "10px" }}
                    //   ></i> */}
                    //   {/* <NumberLabel color="rgb(236, 140, 52)">{ costStatus.services_total }</NumberLabel> */}
                      
                    //   <NumberLabel color="rgb(236, 140, 52)">225</NumberLabel>
                    // </SectionInfoITopThreeInner>
                  ))
                ) : (
                  costStatus.project_top_three.map((entry, index) => (
                    <SectionInfoITopThreeInner key={index + 1} fontSize={11}>
                      <TopFiveItemContentTitle>
                          {entry.name}
                      </TopFiveItemContentTitle>
                      <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                    </SectionInfoITopThreeInner>
                    // <SectionInfoITopThreeInner fontSize={15} marginTop={10}>
                    //   {/* <i
                    //     className="fad fa-toolbox"
                    //     style={{ color: "rgb(52, 52, 52)", fontSize: "10px" }}
                    //   ></i> */}
                    //   {/* <NumberLabel color="rgb(236, 140, 52)">{ costStatus.services_total }</NumberLabel> */}
                      
                    //   <NumberLabel color="rgb(236, 140, 52)">225</NumberLabel>
                    // </SectionInfoITopThreeInner>
                  ))
                ))
              }
            </SectionInfoITopThreeWrap>
          </SectionInfoINumberContainer>
        }
        { !dataFetched ? <CircularIndeterminate /> :
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Top 3 Spend by {sSpendtopthree}</SectionInfoTitle>
            <SectionInfoITopThreeWrap>
              { 
                page === '/aws/billing/costAnalysis' ? (
                  costStatus.services_top_three.map((entry, index) => (
                    <SectionInfoITopThreeInner key={index + 1} fontSize={11} marginTop={10}>
                      <TopFiveItemContentTitle>
                          {entry.name}
                      </TopFiveItemContentTitle>
                      <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                    </SectionInfoITopThreeInner>
                    // <SectionInfoITopThreeInner fontSize={15} marginTop={10}>
                    //   {/* <i
                    //     className="fad fa-toolbox"
                    //     style={{ color: "rgb(52, 52, 52)", fontSize: "10px" }}
                    //   ></i> */}
                    //   {/* <NumberLabel color="rgb(236, 140, 52)">{ costStatus.services_total }</NumberLabel> */}
                      
                    //   <NumberLabel color="rgb(236, 140, 52)">225</NumberLabel>
                    // </SectionInfoITopThreeInner>
                  ))
                ) : ( page === '/azure/billing/costAnalysis' ? (
                  costStatus.services_top_three.map((entry, index) => (
                    <SectionInfoITopThreeInner key={index + 1} fontSize={11}>
                      <TopFiveItemContentTitle>
                          {entry.name}
                      </TopFiveItemContentTitle>
                      <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                    </SectionInfoITopThreeInner>
                    // <SectionInfoITopThreeInner fontSize={15} marginTop={10}>
                    //   {/* <i
                    //     className="fad fa-toolbox"
                    //     style={{ color: "rgb(52, 52, 52)", fontSize: "10px" }}
                    //   ></i> */}
                    //   {/* <NumberLabel color="rgb(236, 140, 52)">{ costStatus.services_total }</NumberLabel> */}
                      
                    //   <NumberLabel color="rgb(236, 140, 52)">225</NumberLabel>
                    // </SectionInfoITopThreeInner>
                  ))
                ) : (
                  costStatus.services_top_three.map((entry, index) => (
                    <SectionInfoITopThreeInner key={index + 1} fontSize={11}>
                      <TopFiveItemContentTitle>
                          {entry.name}
                      </TopFiveItemContentTitle>
                      <TopFiveItemContentCost>${entry.total}</TopFiveItemContentCost>
                    </SectionInfoITopThreeInner>
                    // <SectionInfoITopThreeInner fontSize={15} marginTop={10}>
                    //   {/* <i
                    //     className="fad fa-toolbox"
                    //     style={{ color: "rgb(52, 52, 52)", fontSize: "10px" }}
                    //   ></i> */}
                    //   {/* <NumberLabel color="rgb(236, 140, 52)">{ costStatus.services_total }</NumberLabel> */}
                      
                    //   <NumberLabel color="rgb(236, 140, 52)">225</NumberLabel>
                    // </SectionInfoITopThreeInner>
                  ))
                ))
              }
            </SectionInfoITopThreeWrap>
          </SectionInfoINumberContainer>
        }

        {/* 
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Previous month end costs</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <i
                  className="fad fa-usd-circle"
                  style={{ color: "rgb(236, 140, 52)" }}
                ></i>
                <NumberLabel color="rgb(236, 140, 52)">12,100</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberRightPercent>
                  Over last month
                </SectionInfoINumberRightPercent>
                <SectionInfoINumberRightCompare>
                  Over last month
                </SectionInfoINumberRightCompare>
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Services total</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <i
                  className="fad fa-toolbox"
                  style={{ color: "rgb(52, 52, 52)" }}
                ></i>
                <NumberLabel color="rgb(236, 140, 52)">30</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberRightPercent>
                  Over last month
                </SectionInfoINumberRightPercent>
                <SectionInfoINumberRightCompare>
                  Over last month
                </SectionInfoINumberRightCompare>
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer>
          <SectionInfoINumberContainer borderValue={1}>
            <SectionInfoTitle>Tags total</SectionInfoTitle>
            <SectionInfoINumberWrap>
              <SectionInfoINumberLeft>
                <i
                  className="fad fa-tags"
                  style={{ color: "rgb(52, 52, 52)" }}
                ></i>
                <NumberLabel color="rgb(236, 140, 52)">12</NumberLabel>
              </SectionInfoINumberLeft>
              <SectionInfoINumberRight>
                <SectionInfoINumberRightPercent>
                  Over last month
                </SectionInfoINumberRightPercent>
                <SectionInfoINumberRightCompare>
                  Over last month
                </SectionInfoINumberRightCompare>
              </SectionInfoINumberRight>
            </SectionInfoINumberWrap>
          </SectionInfoINumberContainer> */}
      </SectionInfoItem>
    </SectionInfoContainer>
  );
};

export default SectionInfo;

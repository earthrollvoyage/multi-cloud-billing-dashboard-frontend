import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { getCurrentCost } from "../../../services/billing/summary/getCurrentCost";
import GCPLogoImg from "../../../images/logo/google-cloud-seeklogo.com.svg";
import AWSLogoImg from "../../../images/logo/Amazon_Web_Services_Logo.svg";
import AzureLogoImg from "../../../images/logo/microsoft-azureicon-seeklogo.com.svg";

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

const SectionInfoTitle = styled.div`
  display: flex;
  margin-left: 10px;
`;

const SubSectionInfoTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
`;

const SubSectionInfoTitleLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

const SubSectionInfoTitleRight = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: flex-end;
  text-decoration: none;
  color: rgb(52, 52, 52);
`;

const SubSectionInfoTitleIconRight = styled.i`
  font-size: 25px;

  &:hover {
    color: ${({ color }) => color};
    cursor: pointer;
  }
`;

const SubSectionInfoTitleName = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: bold;
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
  display: flex;
  flex-direction: row;
`;

const SectionInfoINumberLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: 20px;
  margin-top: 10px;
  margin-left: 10px;
  color: rgb(52, 52, 52);
`;

const SectionInfoINumberRight = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  font-family: "Inter";
  margin-top: 15px;
  /* margin-left: 30px; */
  margin-left: 120px;
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
  align-items: flex-end;
  color: rgb(104, 103, 103);
  font-size: 11px;
  font-weight: bold;
`;

const NumberLabel = styled.span`
  margin-left: 10px;
  color: ${({ color }) => color};
`;

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

const LogoImage = styled.div`
  width: ${({ size }) => (size ? size + "em" : "2em")};
  height: ${({ size }) => (size ? size + "em" : "2em")};
  margin-right: 15px;

  img {
    margin-top: 1px;
    width: 100%;
    height: 100%;
  }
`;

const SectionInfo = ({ compareTitle = "last month" }) => {
  const [currentCost, setCurrentCost] = useState({
    AWS: 0,
    GCP: 0,
    AZURE: 0,
    HUAWEI: 0
  });

  useEffect(() => {
    getCurrentCost().then((res) => {
      setCurrentCost(res)
    })

  }, []);

  return (
    <SectionInfoContainer>
      <SectionInfoItem
        paddingValue={20}
        marginLeftValue={20}
        marginRightValue={15}
      >
        <SectionInfoINumberContainer>
          <SectionInfoTitle>
            <SubSectionInfoTitle>
              <SubSectionInfoTitleLeft>
                <LogoImage>
                  <img src={AWSLogoImg} alt="AWS Section Info Logo" />
                </LogoImage>
                <SubSectionInfoTitleName>AWS current month costs</SubSectionInfoTitleName>
              </SubSectionInfoTitleLeft>
              <SubSectionInfoTitleRight to="/aws/billing/costAnalysis" >
                <SubSectionInfoTitleIconRight
                  color={"rgb(255, 153, 0)"} 
                  className="far fa-arrow-alt-to-right"
                  // style={{ color: "rgb(52, 52, 52)", fontSize: "25px" }}
                ></SubSectionInfoTitleIconRight>
              </SubSectionInfoTitleRight>
            </SubSectionInfoTitle>
          </SectionInfoTitle>
          <SectionInfoINumberWrap>
            <SectionInfoINumberLeft>
            <i
                className="fad fa-usd-circle"
                // style={{ color: "rgb(255, 153, 0)", fontSize: "25px" }}
              ></i>
              <NumberLabel color="rgb(255, 153, 0)">{ currentCost.AWS }</NumberLabel>
            </SectionInfoINumberLeft>
            <SectionInfoINumberRight>
              <SectionInfoINumberRightPercent fontSize="13px">
                <NumberLabel
                  color="rgb(52, 52, 52)"
                  marginLeftValue="2px"
                  fontWeight="bold"
                >
                  Recent Updates
                </NumberLabel>
              </SectionInfoINumberRightPercent>
              <SectionInfoINumberRightCompare>
                { currentCost.date }
              </SectionInfoINumberRightCompare>
            </SectionInfoINumberRight>
          </SectionInfoINumberWrap>
        </SectionInfoINumberContainer>
        {/* <SectionInfoSub>Compared to { compareTitle }</SectionInfoSub> */}
      </SectionInfoItem>
      <SectionInfoItem
        paddingValue={20}
        marginLeftValue={0}
        marginRightValue={15}
      >
        <SectionInfoINumberContainer>
        <SectionInfoTitle>
            <SubSectionInfoTitle>
              <SubSectionInfoTitleLeft>
                <LogoImage>
                  <img src={GCPLogoImg} alt="GCP Section Info Logo" />
                </LogoImage>
                <SubSectionInfoTitleName>GCP current month costs</SubSectionInfoTitleName>
              </SubSectionInfoTitleLeft>
              <SubSectionInfoTitleRight to="/gcp/billing/costAnalysis" >
                <SubSectionInfoTitleIconRight
                  color={"#00C49F"} 
                  className="far fa-arrow-alt-to-right"
                  // style={{ color: "rgb(52, 52, 52)", fontSize: "25px" }}
                ></SubSectionInfoTitleIconRight>
              </SubSectionInfoTitleRight>
            </SubSectionInfoTitle>
          </SectionInfoTitle>
          <SectionInfoINumberWrap>
            <SectionInfoINumberLeft>
            <i
                className="fad fa-usd-circle"
                // style={{ color: "#00C49F", fontSize: "25px" }}
              ></i>
              <NumberLabel color="#00C49F">{ currentCost.GCP }</NumberLabel>
            </SectionInfoINumberLeft>
            <SectionInfoINumberRight>
              <SectionInfoINumberRightPercent fontSize="13px">
                <NumberLabel
                  color="rgb(52, 52, 52)"
                  marginLeftValue="2px"
                  fontWeight="bold"
                >
                  Recent Updates
                </NumberLabel>
              </SectionInfoINumberRightPercent>
              <SectionInfoINumberRightCompare>
                { currentCost.date }
              </SectionInfoINumberRightCompare>
            </SectionInfoINumberRight>
          </SectionInfoINumberWrap>
        </SectionInfoINumberContainer>
        {/* <SectionInfoSub>Compared to { compareTitle }</SectionInfoSub> */}
      </SectionInfoItem>
      <SectionInfoItem
        paddingValue={20}
        marginLeftValue={0}
        marginRightValue={20}
      >
        <SectionInfoINumberContainer>
        <SectionInfoTitle>
            <SubSectionInfoTitle>
              <SubSectionInfoTitleLeft>
                <LogoImage>
                  <img src={AzureLogoImg} alt="Azure Section Info Logo" />
                </LogoImage>
                <SubSectionInfoTitleName>Azure current month costs</SubSectionInfoTitleName>
              </SubSectionInfoTitleLeft>
              <SubSectionInfoTitleRight to="/azure/billing/costAnalysis" >
                <SubSectionInfoTitleIconRight
                  color={"rgb(0, 138, 215)"} 
                  className="far fa-arrow-alt-to-right"
                  // style={{ color: "rgb(52, 52, 52)", fontSize: "25px" }}
                ></SubSectionInfoTitleIconRight>
              </SubSectionInfoTitleRight>
            </SubSectionInfoTitle>
          </SectionInfoTitle>
          <SectionInfoINumberWrap>
            <SectionInfoINumberLeft>
            <i
                className="fad fa-usd-circle"
                // style={{ color: "rgb(0, 138, 215)", fontSize: "25px" }}
              ></i>
              <NumberLabel color="rgb(0, 138, 215)">{ currentCost.AZURE }</NumberLabel>
            </SectionInfoINumberLeft>
            <SectionInfoINumberRight>
              <SectionInfoINumberRightPercent fontSize="13px">
                <NumberLabel
                  color="rgb(52, 52, 52)"
                  marginLeftValue="2px"
                  fontWeight="bold"
                >
                  Recent Updates
                </NumberLabel>
              </SectionInfoINumberRightPercent>
              <SectionInfoINumberRightCompare>
                { currentCost.date }
              </SectionInfoINumberRightCompare>
            </SectionInfoINumberRight>
          </SectionInfoINumberWrap>
        </SectionInfoINumberContainer>
        {/* <SectionInfoSub>Compared to { compareTitle }</SectionInfoSub> */}
      </SectionInfoItem>
      {/* <SectionInfoItem
        paddingValue={20}
        marginLeftValue={0}
        marginRightValue={20}
      >
        <SectionInfoINumberContainer>
          <SectionInfoTitle>Huawei current month costs</SectionInfoTitle>
          <SectionInfoINumberWrap>
            <SectionInfoINumberLeft>
            <i
                className="fad fa-usd-circle"
                style={{ color: "rgb(255, 0, 0)", fontSize: "25px" }}
              ></i>
              <NumberLabel color="rgb(255, 0, 0)">{ currentCost.HUAWEI }</NumberLabel>
            </SectionInfoINumberLeft>
            <SectionInfoINumberRight>
              <SectionInfoINumberRightPercent fontSize="13px">
                <NumberLabel
                  color="rgb(52, 52, 52)"
                  marginLeftValue="2px"
                  fontWeight="bold"
                >
                  Recent Updates
                </NumberLabel>
              </SectionInfoINumberRightPercent>
              <SectionInfoINumberRightCompare>
                { currentCost.date }
              </SectionInfoINumberRightCompare>
            </SectionInfoINumberRight>
          </SectionInfoINumberWrap>
        </SectionInfoINumberContainer> */}
        {/* <SectionInfoSub>Compared to { compareTitle }</SectionInfoSub> */}
      {/* </SectionInfoItem> */}
    </SectionInfoContainer>
  );
};

export default SectionInfo;

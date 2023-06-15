import React from "react";
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
  /* box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -moz-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29); */
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
  display: flex;
  align-items: center;
  font-size: 35px;
  font-weight: 20px;
  margin-top: 10px;
  margin-left: 10px;
  color: rgb(52, 52, 52);
`;

const NumberLabel = styled.span`
  margin-left: 16px;
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

const SectionInfo = ({ compareTitle = "last month" }) => {
  return (
    <SectionInfoContainer>
      <SectionInfoItem
        paddingValue={20}
        marginLeftValue={20}
        marginRightValue={15}
      >
        <SectionInfoINumberContainer>
          <SectionInfoTitle>AWS Accounts</SectionInfoTitle>
          <SectionInfoINumberWrap>
            <i
              className="fad fa-users"
              style={{ color: "rgb(52, 52, 52)" }}
            ></i>
            <NumberLabel color="rgb(236, 140, 52)">60</NumberLabel>
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
          <SectionInfoTitle>GCP Accounts</SectionInfoTitle>
          <SectionInfoINumberWrap>
            <i
              className="fad fa-users"
              style={{ color: "rgb(52, 52, 52)" }}
            ></i>
            <NumberLabel color="rgb(236, 140, 52)">30</NumberLabel>
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
          <SectionInfoTitle>Azure Accounts</SectionInfoTitle>
          <SectionInfoINumberWrap>
            <i
              className="fad fa-users"
              style={{ color: "rgb(52, 52, 52)" }}
            ></i>
            <NumberLabel color="rgb(236, 140, 52)">20</NumberLabel>
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
          <SectionInfoTitle>Huawei Accounts</SectionInfoTitle>
          <SectionInfoINumberWrap>
            <i
              className="fad fa-users"
              style={{ color: "rgb(52, 52, 52)" }}
            ></i>
            <NumberLabel color="rgb(236, 140, 52)">10</NumberLabel>
          </SectionInfoINumberWrap>
        </SectionInfoINumberContainer>
        {/* <SectionInfoSub>Compared to { compareTitle }</SectionInfoSub> */}
      </SectionInfoItem>
    </SectionInfoContainer>
  );
};

export default SectionInfo;

import React from "react";
import styled from "styled-components";
import UserAvatar from "../../../images/avatar/3ca46bfcfa43ef92f2875eaaa3199af6.jpeg";

const WidgetContainer = styled.div`
  flex: 2;
  /* box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -moz-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29); */
  padding: 20px; 
  border-radius: 5px;
  background-color: #fff;
`;

const WidgetTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  /* color: rgb(52, 52, 52); */
`;

const WidgetTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const WidgetTr = styled.tr`
  text-align: left;
`;

const WidgetTh = styled.th``;

const WidgetTdCustomerName = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const WidgetTdDate = styled.td`
  font-weight: 300;
`;

const WidgetTdAmount = styled.td`
  font-weight: 300;
`;

const WidgetTdButton = styled.td``;

const WidgetUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const WidgetUserFullName = styled.span``;

const WidgetButtonUserWrapper = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
`;

const WidgetButtonUserApproved = styled(WidgetButtonUserWrapper)`
  background-color: #e5faf2;
  color: #3bb077;
`;

const WidgetButtonUserDeclined = styled(WidgetButtonUserWrapper)`
  background-color: #fff0f1;
  color: #d95087;
`;

const WidgetButtonUserPending = styled(WidgetButtonUserWrapper)`
  background-color: #ebf1fe;
  color: #2a7ade;
`;

const LargeWidget = ({ type = "Approved" }) => {
  return (
    <WidgetContainer>
      <WidgetTitle>Lastest Transactions</WidgetTitle>
      <WidgetTable>
        <WidgetTr>
          <WidgetTh>Customer</WidgetTh>
          <WidgetTh>Date</WidgetTh>
          <WidgetTh>Amount</WidgetTh>
          <WidgetTh>Status</WidgetTh>
        </WidgetTr>
        <WidgetTr>
          <WidgetTdCustomerName>
            <WidgetUserImage src={UserAvatar} alt="user-avatar-transaction" />
            <WidgetUserFullName>Susan Carol</WidgetUserFullName>
          </WidgetTdCustomerName>
          <WidgetTdDate>2 Jun 2021</WidgetTdDate>
          <WidgetTdAmount>$122.00</WidgetTdAmount>
          <WidgetTdButton>
            {type === "Approved" ? (
              <WidgetButtonUserApproved>Approved</WidgetButtonUserApproved>
            ) : type === "Declined" ? (
              <WidgetButtonUserDeclined>Declined</WidgetButtonUserDeclined>
            ) : (
              <WidgetButtonUserPending>Pending</WidgetButtonUserPending>
            )}
          </WidgetTdButton>
        </WidgetTr>
        <WidgetTr>
          <WidgetTdCustomerName>
            <WidgetUserImage src={UserAvatar} alt="user-avatar-transaction" />
            <WidgetUserFullName>Susan Carol</WidgetUserFullName>
          </WidgetTdCustomerName>
          <WidgetTdDate>2 Jun 2021</WidgetTdDate>
          <WidgetTdAmount>$122.00</WidgetTdAmount>
          <WidgetTdButton>
            {type === "Approved" ? (
              <WidgetButtonUserApproved>Approved</WidgetButtonUserApproved>
            ) : type === "Declined" ? (
              <WidgetButtonUserDeclined>Declined</WidgetButtonUserDeclined>
            ) : (
              <WidgetButtonUserPending>Pending</WidgetButtonUserPending>
            )}
          </WidgetTdButton>
        </WidgetTr>
      </WidgetTable>
    </WidgetContainer>
  );
};

export default LargeWidget;

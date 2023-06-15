import React from "react";
import styled from "styled-components";
import UserAvatar from "../../../images/avatar/3ca46bfcfa43ef92f2875eaaa3199af6.jpeg";
import { Visibility } from "@material-ui/icons";

const WidgetContainer = styled.div`
  flex: 1;
  /* box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -webkit-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29);
  -moz-box-shadow: 2px 2px 5px 4px rgba(73, 140, 200, 0.29); */
  padding: 20px;
  margin-right: 15px;
  border-radius: 3px;
  background-color: #fff;
`;

const WidgetTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  /* color: rgb(52, 52, 52); */
`;

const WidgetList = styled.ul`
  margin: 35px 0px;
  padding: 0;
  list-style: none;
`;

const WidgetListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

const WidgetUserWarpper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WidgetUsername = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const WidgetUserTitle = styled.span`
  font-size: 13px;
  font-weight: 300;
`;

const WidgetUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const WidgetUserButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555555;
  cursor: pointer;
`;

const WidgetUserButtonIcon = styled(Visibility)`
  font-size: 16px !important;
  margin-right: 5px;
`;

const SmallWidget = () => {
  return (
    <WidgetContainer>
      <WidgetTitle>New Join Members</WidgetTitle>
      <WidgetList>
        <WidgetListItem>
          <WidgetUserImage src={UserAvatar} alt="new-member" />
          <WidgetUserWarpper>
            <WidgetUsername>Ann Keller</WidgetUsername>
            <WidgetUserTitle>Software Engineer</WidgetUserTitle>
          </WidgetUserWarpper>
          <WidgetUserButton>
            <WidgetUserButtonIcon />
            Display
          </WidgetUserButton>
        </WidgetListItem>
        <WidgetListItem>
          <WidgetUserImage src={UserAvatar} alt="new-member" />
          <WidgetUserWarpper>
            <WidgetUsername>Ann Keller</WidgetUsername>
            <WidgetUserTitle>Software Engineer</WidgetUserTitle>
          </WidgetUserWarpper>
          <WidgetUserButton>
            <WidgetUserButtonIcon />
            Display
          </WidgetUserButton>
        </WidgetListItem>
        <WidgetListItem>
          <WidgetUserImage src={UserAvatar} alt="new-member" />
          <WidgetUserWarpper>
            <WidgetUsername>Ann Keller</WidgetUsername>
            <WidgetUserTitle>Software Engineer</WidgetUserTitle>
          </WidgetUserWarpper>
          <WidgetUserButton>
            <WidgetUserButtonIcon />
            Display
          </WidgetUserButton>
        </WidgetListItem>
        <WidgetListItem>
          <WidgetUserImage src={UserAvatar} alt="new-member" />
          <WidgetUserWarpper>
            <WidgetUsername>Ann Keller</WidgetUsername>
            <WidgetUserTitle>Software Engineer</WidgetUserTitle>
          </WidgetUserWarpper>
          <WidgetUserButton>
            <WidgetUserButtonIcon />
            Display
          </WidgetUserButton>
        </WidgetListItem>
        <WidgetListItem>
          <WidgetUserImage src={UserAvatar} alt="new-member" />
          <WidgetUserWarpper>
            <WidgetUsername>Ann Keller</WidgetUsername>
            <WidgetUserTitle>Software Engineer</WidgetUserTitle>
          </WidgetUserWarpper>
          <WidgetUserButton>
            <WidgetUserButtonIcon />
            Display
          </WidgetUserButton>
        </WidgetListItem>
        <WidgetListItem>
          <WidgetUserImage src={UserAvatar} alt="new-member" />
          <WidgetUserWarpper>
            <WidgetUsername>Ann Keller</WidgetUsername>
            <WidgetUserTitle>Software Engineer</WidgetUserTitle>
          </WidgetUserWarpper>
          <WidgetUserButton>
            <WidgetUserButtonIcon />
            Display
          </WidgetUserButton>
        </WidgetListItem>
      </WidgetList>
    </WidgetContainer>
  );
};

export default SmallWidget;

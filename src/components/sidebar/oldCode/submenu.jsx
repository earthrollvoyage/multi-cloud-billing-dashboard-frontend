import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubmenuContainer = styled.div``;

const SubmenuLink = styled(Link)`
  display: flex;
  color: rgb(73, 140, 200);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 80px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background-color: rgb(251, 251, 255);
    border-left: 4px solid rgb(73, 140, 200);
    cursor: pointer;
  }
`;

const SubmenuWrap = styled.div``;

const SubmenuLabel = styled.span`
  margin-left: 16px;
`;

const DropDownLink = styled(Link)`
  display: flex;
  color: rgb(251, 251, 255);
  color: rgb(73, 140, 200);
  padding-left: 3rem;
  align-items: center;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background-color: rgb(251, 251, 255);
    cursor: pointer;
  }
`;

const Submenu = ({ item }) => {
  const [subNav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subNav);

  return (
    <SubmenuContainer>
      <SubmenuLink to={item.path} onClick={item.subNav && showSubNav}>
        <SubmenuWrap>
          {item.icon}
          <SubmenuLabel>{item.title}</SubmenuLabel>
        </SubmenuWrap>
        <SubmenuWrap>
          {item.subNav && subNav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </SubmenuWrap>
      </SubmenuLink>
      {subNav &&
        item.subNav.map((item, index) => {
          return (
            <DropDownLink key={index} to={item.path}>
              {item.icon}
              <SubmenuLabel>{item.title}</SubmenuLabel>
            </DropDownLink>
          );
        })}
    </SubmenuContainer>
  );
};

export default Submenu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userSubmenuItems, dashboardSubmenuItems } from "./menuItems";

// const DropdownContainer = styled.div`
//   width: 100%;
// `;

const DropdownListItems = styled.ul`
  width: ${({ widthValue }) => widthValue};
  display: ${({ displayValue }) => displayValue};
  position: absolute;
  top: 94px;
  list-style: none;
  text-align: start;
  padding-left: 0px;
`;

const DropdownItems = styled.li`
  background-color: rgb(255, 255, 255);;
  cursor: pointer;
`;

const DropdownItemsLink = styled(Link)`
  display: block;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: rgb(52, 52, 52);
  padding: 16px;

  &:hover {
    color: rgb(4,100,251);
    cursor: pointer;
  }
`;

const DropdownMenu = ({ dropdown, mainMenu }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <DropdownListItems
      displayValue={click ? "none" : "unset"}
      widthValue={mainMenu === "USER MANAGEMENT" ? "12rem" : "7rem"}
      onClick={handleClick}
    >
      {mainMenu === "USER MANAGEMENT"
        ? userSubmenuItems.map((item, index) => {
            return (
              <DropdownItems key={index}>
                <DropdownItemsLink to={item.path} onClick={handleClick}>
                  {item.title}
                </DropdownItemsLink>
              </DropdownItems>
            );
          })
        : dashboardSubmenuItems.map((item, index) => {
            return (
              <DropdownItems key={index}>
                <DropdownItemsLink to={item.path} onClick={handleClick}>
                  {item.title}
                </DropdownItemsLink>
              </DropdownItems>
            );
          })}
    </DropdownListItems>
  );
};
// {subNav &&
//   item.subNav.map((item, index) => {
//     return (
//       <DropDownLink key={index} to={item.path}>
//         {item.icon}
//         <SubmenuLabel>{item.title}</SubmenuLabel>
//       </DropDownLink>
//     );
//   })}
export default DropdownMenu;

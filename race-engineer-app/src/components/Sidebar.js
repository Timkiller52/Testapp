import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link
import { FaBars, FaUser, FaCar, FaRoad, FaCalendarAlt, FaCogs } from "react-icons/fa";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => (props.isOpen ? "200px" : "60px")};
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuToggle = styled.div`
  margin: 10px;
  cursor: pointer;
  font-size: 24px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? "flex-start" : "center")};
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  color: white;
  text-decoration: none; /* Remove underline for links */
  font-size: ${(props) => (props.isOpen ? "16px" : "20px")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #34495e;
  }

  span {
    margin-left: ${(props) => (props.isOpen ? "10px" : "0")};
    display: ${(props) => (props.isOpen ? "inline" : "none")};
  }
`;

function Sidebar({ isOpen, toggleSidebar }) {
  const menuItems = [
    { name: "Dashboard", icon: <FaBars />, route: "/" },
    { name: "Garage", icon: <FaCar />, route: "/garage" },
    { name: "Tracks", icon: <FaRoad />, route: "/tracks" },
    { name: "Events", icon: <FaCalendarAlt />, route: "/events" },
    { name: "Settings", icon: <FaCogs />, route: "/settings" },
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <MenuToggle onClick={toggleSidebar}>
        <FaBars />
      </MenuToggle>
      {menuItems.map((item) => (
        <MenuItem to={item.route} key={item.name} isOpen={isOpen}>
          {item.icon}
          <span>{item.name}</span>
        </MenuItem>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

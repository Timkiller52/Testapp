import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaCarAlt,
  FaRoad,
  FaCalendarAlt,
  FaCogs,
  FaTrophy,
} from "react-icons/fa";

// Background images array
const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
  "/images/image10.jpg",
  "/images/image11.jpg",
  "/images/image12.jpg",
];

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: url(${(props) => props.background}) center/cover no-repeat;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.collapsed ? "80px" : "250px")};
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s ease-in-out;
  z-index: 2;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: ${(props) => (props.collapsed ? "center" : "space-between")};
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.collapsed ? "0" : "10px")};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#34495e" : "transparent")};
  color: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};

  &:hover {
    background-color: #34495e;
    color: #3498db;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.sidebarCollapsed ? "80px" : "250px")};
  width: calc(100% - ${(props) => (props.sidebarCollapsed ? "80px" : "250px")});
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${(props) => (props.sidebarCollapsed ? "80px" : "250px")};
  z-index: 1;
  position: relative;
  transition: margin-left 0.3s ease;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1 1 calc(50% - 20px);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const CardContent = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.5;
`;

function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [background, setBackground] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackground(randomImage);
  }, []);

  return (
    <PageWrapper background={background}>
      <Sidebar collapsed={sidebarCollapsed}>
        <SidebarHeader collapsed={sidebarCollapsed}>
          <FaBars
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ cursor: "pointer" }}
          />
          {!sidebarCollapsed && <h3>Race Engineer</h3>}
        </SidebarHeader>
        <SidebarItem
          active={location.pathname === "/dashboard"}
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/dashboard")}
        >
          <FaTachometerAlt />
          {!sidebarCollapsed && "Dashboard"}
        </SidebarItem>
        <SidebarItem
          active={location.pathname === "/garage"}
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/garage")}
        >
          <FaCarAlt />
          {!sidebarCollapsed && "Garage"}
        </SidebarItem>
        <SidebarItem
          active={location.pathname === "/tracks"}
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/tracks")}
        >
          <FaRoad />
          {!sidebarCollapsed && "Tracks"}
        </SidebarItem>
        <SidebarItem
          active={location.pathname === "/events"}
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/events")}
        >
          <FaCalendarAlt />
          {!sidebarCollapsed && "Events"}
        </SidebarItem>
        <SidebarItem
          active={location.pathname === "/settings"}
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/settings")}
        >
          <FaCogs />
          {!sidebarCollapsed && "Settings"}
        </SidebarItem>
      </Sidebar>
      <Overlay sidebarCollapsed={sidebarCollapsed} />
      <Content sidebarCollapsed={sidebarCollapsed}>
        <Header>
          <h2>Dashboard</h2>
          <input
            type="search"
            placeholder="Search something..."
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              outline: "none",
            }}
          />
        </Header>
        <Section>
          <Card>
            <CardHeader>
              <FaCalendarAlt />
              Upcoming Race
            </CardHeader>
            <CardContent>
              <p>
                <strong>Name:</strong> Nurburgring Endurance
              </p>
              <p>
                <strong>Date:</strong> Dec 15, 2024
              </p>
              <p>
                <strong>Car:</strong> Porsche 911 GT3
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FaTrophy />
              Your Performance
            </CardHeader>
            <CardContent>
              <p>
                <strong>Last Race:</strong> 2nd Place
              </p>
              <p>
                <strong>Total Races:</strong> 23
              </p>
              <p>
                <strong>Tracks Raced On:</strong> 10
              </p>
            </CardContent>
          </Card>
        </Section>
      </Content>
    </PageWrapper>
  );
}

export default Dashboard;

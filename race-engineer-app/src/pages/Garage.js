import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  FaBars,
  FaCarAlt,
  FaTachometerAlt,
  FaCogs,
  FaRoad,
  FaCalendarAlt,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f4f9;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.collapsed ? "80px" : "250px")};
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s ease-in-out;
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

const GarageContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CarCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CarImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const DefaultIcon = styled(FaCarAlt)`
  font-size: 100px;
  color: #ccc;
  margin-bottom: 10px;
`;

const CarDetails = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const CarActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  button {
    background-color: #34495e;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #2c3e50;
    }
  }
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  z-index: 10;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function Garage() {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ make: "", model: "", category: "", image: null });
  const [editCarId, setEditCarId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("make", formData.make);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("category", formData.category);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editCarId) {
        await axios.put(`http://localhost:5000/cars/${editCarId}`, formDataToSend);
      } else {
        await axios.post("http://localhost:5000/cars", formDataToSend);
      }

      setFormData({ make: "", model: "", category: "", image: null });
      setEditCarId(null);
      setIsModalOpen(false);
      fetchCars();
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleEditCar = (car) => {
    setFormData({
      make: car.make,
      model: car.model,
      category: car.category,
      image: car.image, // You can display the image if required
    });
    setEditCarId(car._id);
    setIsModalOpen(true);
  };

  return (
    <PageWrapper>
      <Sidebar collapsed={sidebarCollapsed}>
        <SidebarHeader collapsed={sidebarCollapsed}>
          <FaBars
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ cursor: "pointer" }}
          />
          {!sidebarCollapsed && <h3>Race Engineer</h3>}
        </SidebarHeader>
        <SidebarItem
          active
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/dashboard")}
        >
          <FaTachometerAlt />
          {!sidebarCollapsed && "Dashboard"}
        </SidebarItem>
        <SidebarItem
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/garage")}
        >
          <FaCarAlt />
          {!sidebarCollapsed && "Garage"}
        </SidebarItem>
        <SidebarItem
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/tracks")}
        >
          <FaRoad />
          {!sidebarCollapsed && "Tracks"}
        </SidebarItem>
        <SidebarItem
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/events")}
        >
          <FaCalendarAlt />
          {!sidebarCollapsed && "Events"}
        </SidebarItem>
        <SidebarItem
          collapsed={sidebarCollapsed}
          onClick={() => navigate("/settings")}
        >
          <FaCogs />
          {!sidebarCollapsed && "Settings"}
        </SidebarItem>
      </Sidebar>
      <GarageContainer>
        <Header>
          <h2>Garage</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add Car
          </Button>
        </Header>

        <CarsGrid>
          {cars.map((car) => (
            <CarCard key={car._id}>
              {car.image ? <CarImage src={car.image} alt={car.make} /> : <DefaultIcon />}
              <CarDetails>
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Category:</strong> {car.category}</p>
              </CarDetails>
              <CarActions>
                <button onClick={() => handleEditCar(car)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDeleteCar(car._id)}>
                  <FaTrash /> Delete
                </button>
              </CarActions>
            </CarCard>
          ))}
        </CarsGrid>

        {isModalOpen && (
          <>
            <Overlay onClick={() => setIsModalOpen(false)} />
            <Modal>
              <h3>{editCarId ? "Edit Car" : "Add Car"}</h3>
              <form onSubmit={handleAddCar}>
                <Input
                  type="text"
                  placeholder="Make"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  required
                />
                <Input
                  type="text"
                  placeholder="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
                <Input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
                <Input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
                <Button type="submit">{editCarId ? "Save Changes" : "Add Car"}</Button>
              </form>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </Modal>
          </>
        )}
      </GarageContainer>
    </PageWrapper>
  );
}

export default Garage;

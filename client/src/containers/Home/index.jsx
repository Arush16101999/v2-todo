import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "../../components/Select";
import TodoTable from "../../components/Table";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/todo");
      if (data) {
        console.log(data);
        setTodos(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`);
      toast.success("Successfully Deleted!");
      getAllTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === "Complete" ? "Active" : "Complete";

    try {
      await axios.put(`http://localhost:5000/api/todo/${id}`, {
        status: newStatus,
      });
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, status: newStatus } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const filteredTodos = todos.filter((track) => {
    return track.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <div>
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>
              <Link to="/addTodo">
                <Button variant="outline-light" size="lg">
                  Add Todo
                </Button>{" "}
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Select
                name="status"
                size="lg"
                required
                handleChange={handleChange}
                value={filterStatus}
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <br />
          <Row>
            <Col>
              <h3>TODO Management System</h3>
            </Col>
          </Row>
          <br />
          <Row>
            <TodoTable
              handleComplete={handleComplete}
              filteredTodos={filteredTodos}
              handleDeleteTodo={handleDeleteTodo}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;

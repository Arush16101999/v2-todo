import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "../../components/Select";
import TodoTable from "../../components/Table";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/todo");
      if (data) {
        console.log(data);
        setTasks(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`);
      toast.success("Successfully Deleted!");
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = tasks.filter((track) => {
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
              <h3>Task Management System</h3>
            </Col>
          </Row>
          <br />
          <Row>
            <TodoTable
              filteredTasks={filteredTasks}
              handleDeleteTask={handleDeleteTask}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;

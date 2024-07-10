import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import Select from "../../components/Select";

const AddTodo = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // to get the id from in the url

  useEffect(() => {
    if (id) {
      debugger;
      getTaskById(id);
    }
  }, [id]);

  // get the task by ID
  const getTaskById = async (id) => {
    const data = await axios
      .get(`http://localhost:5000/api/todo/${id}`)
      .then((res) => {
        console.log(res);
        setTask(res.data);
        debugger;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    // debugger;
    setTask((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  /*According to the ID the update and Add Task form will work with same form*/
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      if (task.status !== "" && task.title !== "") {
        if (!id) {
          await axios.post("http://localhost:5000/api/todo", task);
          toast.success("Task Successfully Added!");
          setTask({ title: "", description: "", status: "" });
          // navigate("/");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          const res = await axios.put(
            `http://localhost:5000/api/todo/${id}`,
            task
          );
          setTask({ ...res.data });
          toast.success("Task Successfully Updated!");
          console.log(res);
          navigate("/");
        }
      } else {
        toast.error("Please enter the empty fields");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <br />
        <h3>{id ? "Update Task" : "Add Task"}</h3>

        <br />
        <Form noValidate onSubmit={handleClick}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="title">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Task Title"
                defaultValue={task.title || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Task Description"
                //   required
                name="description"
                defaultValue={task.description || ""}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="status">
              <Form.Label>Task Status</Form.Label>
              {/* <Form.Select
          name="status"
          size="lg"
          required
          onChange={handleChange}
          value={task.status || ""}
        >
          <option value="">Select Status </option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </Form.Select> */}
              <Select
                name="status"
                size="lg"
                required
                handleChange={handleChange}
                value={task.status || ""}
              />
            </Form.Group>
          </Row>
          <Button variant="success" type="submit" size="md">
            {id ? "Update Task" : "Add Task"}
          </Button>{" "}
        </Form>
        <br />
        <Link to="/">
          <Button variant="outline-light" size="md">
            Go Back
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default AddTodo;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import Select from "../../components/Select";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // to get the id from in the url

  useEffect(() => {
    if (id) {
      // debugger;
      getTodoById(id);
    }
  }, [id]);

  // get the todo by ID
  const getTodoById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/todo/${id}`);
      const todoData = res.data;
      todoData.dueDate = todoData.dueDate
        ? new Date(todoData.dueDate).toISOString().split("T")[0]
        : "";
      setTodo(todoData);
    } catch (err) {
      console.log(err);
    }

    // const data = await axios
    //   .get(`http://localhost:5000/api/todo/${id}`)
    //   .then((res) => {
    //     console.log(res);
    //     setTodo(res.data);
    //     debugger;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleChange = (event) => {
    // debugger;
    setTodo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  /*According to the ID the update and Add Todo form will work with same form*/
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      if (todo.status !== "" && todo.title !== "") {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/; // validate input date format
        if (!datePattern.test(todo.dueDate)) {
          toast.error(
            "Please enter a valid due date in the format YYYY-MM-DD."
          );
          return;
        }
        if (!id) {
          await axios.post("http://localhost:5000/api/todo", todo);
          toast.success("Todo Successfully Added!");
          setTodo({ title: "", description: "", status: "", dueDate: "" });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          const res = await axios.put(
            `http://localhost:5000/api/todo/${id}`,
            todo
          );
          setTodo({ ...res.data });
          toast.success("Todo Successfully Updated!");
          // console.log(res);
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
        <h3>{id ? "Update Todo" : "Add Todo"}</h3>

        <br />
        <Form noValidate onSubmit={handleClick}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="title">
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Todo Title"
                defaultValue={todo.title || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="description">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Todo Description"
                //   required
                name="description"
                defaultValue={todo.description || ""}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="description">
              <Form.Label>Due Date</Form.Label>

              <Form.Control
                type="date"
                placeholder="Due Date"
                name="dueDate"
                defaultValue={todo.dueDate || ""}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="status">
              <Form.Label>Todo Status</Form.Label>
              <Select
                name="status"
                size="lg"
                required
                handleChange={handleChange}
                value={todo.status || ""}
              />
            </Form.Group>
          </Row>
          <Button variant="success" type="submit" size="md">
            {id ? "Update Todo" : "Add Todo"}
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

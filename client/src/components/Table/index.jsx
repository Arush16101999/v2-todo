import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const TodoTable = (props) => {
  const { handleDeleteTodo, filteredTodos, handleComplete } = props;
  return (
    <div className="table-responsive">
      <Table responsive bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Todo Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.status === "Complete"}
                  onChange={() => handleComplete(todo._id, todo.status)}
                />
              </td>
              <td
                style={{
                  textDecoration:
                    todo.status === "Complete" ? "line-through" : "",
                }}
              >
                {todo.title}
              </td>
              <td
                style={{
                  textDecoration:
                    todo.status === "Complete" ? "line-through" : "",
                }}
              >
                {todo.dueDate
                  ? new Date(todo.dueDate).toISOString().split("T")[0]
                  : ""}
              </td>
              <td>
                <Badge
                  bg={
                    todo.status === "Complete"
                      ? "info"
                      : todo.status === "Active"
                      ? "success"
                      : "warning"
                  }
                >
                  {todo.status}
                </Badge>
              </td>

              <td>
                <Link to={`/updateTodo/${todo._id}`}>
                  <Button variant="primary" size="sm">
                    Edit
                  </Button>
                </Link>{" "}
                &nbsp;
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoTable;

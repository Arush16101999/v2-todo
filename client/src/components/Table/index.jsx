import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const TodoTable = (props) => {
  const { handleDeleteTask, filteredTasks } = props;
  return (
    <div className="table-responsive">
      <Table responsive bordered hover variant="dark">
        <thead>
          <tr>
            <th>Task Title</th>
            {/* <th>Description</th> */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              {/* <td>{task.description}</td> */}
              <td>
                <Badge
                  bg={
                    task.status === "Complete"
                      ? "info"
                      : task.status === "Active"
                      ? "success"
                      : "warning"
                  }
                >
                  {task.status}
                </Badge>
              </td>

              <td>
                <Link to={`/updateTodo/${task._id}`}>
                  <Button variant="primary" size="sm">
                    Edit
                  </Button>
                </Link>{" "}
                &nbsp;
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTask(task._id)}
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

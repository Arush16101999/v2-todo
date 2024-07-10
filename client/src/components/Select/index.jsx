import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ name, size, required, handleChange, value }) => {
  return (
    <Form.Select
      name={name}
      size={size}
      required={required}
      onChange={handleChange}
      value={value || ""}
    >
      <option value="">Select Status</option>
      <option value="Active">Active</option>
      <option value="Complete">Complete</option>
      <option value="Pending">Pending</option>
    </Form.Select>
  );
};

export default Select;

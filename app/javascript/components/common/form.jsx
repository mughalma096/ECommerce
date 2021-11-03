import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Joi from "joi-browser";
import Input from "./input";

const Form = () => {

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {} );
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.value;

    setErrors(errors);
    setData(data);
  };

  const renderButton = (label) => {
    return (
      <Button disabled={ this.validate() ? true : false } variant="contained" color="primary">
        {label}
      </Button>
    );
  }

  const renderInput = (name, label, type = "text") => {

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

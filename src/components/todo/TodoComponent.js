import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

const TodoComponent = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState({
    id: parseInt(id),
    description: " ",
    targetDate: moment(new Date()).format('YYYY-MM-DD')
  });

  const onSubmit = (values) => {
    let username = AuthenticationService.getLoggedInUser();
    let newTodo = {
      id: id,
      description:values.description,
      targetDate:values.targetDate
    };
    if (id !== -1) {
      TodoDataService.updateTodo(username, id, newTodo).then(response => {
        console.log("updated");
      });
    } else {
      TodoDataService.createTodo(username, newTodo).then(response => {
        console.log("created");
      });
      navigate('/todos');
    }
  };

  useEffect(() => {
    let username = AuthenticationService.getLoggedInUser();
    if (id !== -1) {
      console.log(`getting todo id ${id}`)
      TodoDataService.retriveTodo(username, id).then(response => {
        setTodo({
          ...todo,
          description : response.data.description,
          targetDate : moment(response.data.targetDate).format("YYYY-MM-DD")
        })
      })
  }},[])


  // lf errors is not empty then form is not submitted
  const validateInput = (values) => {
    let errors = {};

    if (!values.description) {
        errors.description = "Enter a Description!";
    } else if (values.description.length < 5) {
        errors.description = "Enter at least 5 characters in description!"
    }

    if (!moment(values.targetDate).isValid()) {
        errors.targetDate = "Enter a valid target date!"
    }
    return errors;

  };

  return (
    <div>
      <h1>Todo</h1>
      <div className="container">
        <Formik
          initialValues={{
            description: todo.description || "",
            targetDate: todo.targetDate || "",
          }}
          onSubmit={onSubmit}
          validate={validateInput}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}

        >
          {(props) => (
            <Form>
              <ErrorMessage name="description" component="div" className="alert alert-warning"/>
              <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  className="form-control"
                  type="text"
                  name="description"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field
                  className="form-control"
                  type="date"
                  name="targetDate"
                ></Field>
              </fieldset>
              <button className="btn btn-success" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoComponent;

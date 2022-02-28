import { useEffect, useState } from "react";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const ListTodosComponent = (props) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   description: "Learn Yoga",
    //   done: false,
    //   targetDate: new Date(),
    // },
    // {
    //   id: 2,
    //   description: "Become an Expert at React",
    //   done: false,
    //   targetDate: new Date(),
    // },
    // {
    //   id: 3,
    //   description: "Finish my Degree",
    //   done: false,
    //   targetDate: new Date(),
    // },
  ]);

  // fetch todo data when the todos is changes(deleted/updated)
  useEffect(() => {
    let username = AuthenticationService.getLoggedInUser();
    TodoDataService.retrieveAllTodos(username).then((response) => {
      setTodos(response.data);
    });
    return ()=> {
      console.log("data fetched"); // clean up function
    }
  }, [todos]);

  const [deleteMesage, setDeleteMessage] = useState();

  const handleDeleteTodo = (id) => {
    let username = AuthenticationService.getLoggedInUser();
    TodoDataService.deleteTodo(username, id).then(
      setDeleteMessage(`Deleted todo ${id} successfully!`)
    );
  };

  const handleUpdateTodo = (id) => {
    let username = AuthenticationService.getLoggedInUser();
    navigate(`/todos/${id}`);
  }

  const handleAddTodo = () => {
    let username = AuthenticationService.getLoggedInUser();
    navigate('/todos/-1');
  }

  return (
    <div>
      <h1>List Todos</h1>
      {deleteMesage && (
        <div className="alert alert-success">{deleteMesage}</div>
      )}
      <div className="container">
        <table className="table">
          <thead>
            <tr key="title">
              <th>id</th>
              <th>description</th>
              <th>Target Date</th>
              <th>Is Completed?</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                <td>{todo.done.toString()}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row" onClick={handleAddTodo}>
          <button className="btn btn-success">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ListTodosComponent;

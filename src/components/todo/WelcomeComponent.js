import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import HelloWorldService from "../api/todo/HelloWorldService";

const WelcomeComponent = () => {
  const { username } = useParams();
  const [message, setMessage] = useState(""); // error message

  const retrieveWelcomeData = () => {
    HelloWorldService.executeHelloWorldNameService(username)
      .then((response) => {
        handleSucessfulResponse(response);
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  const handleSucessfulResponse = (response) => {
    console.log(response);
    setMessage(response.data.message);
  };

  const handleErrorResponse = (error) => {
    // sometimes with error, we dont even get a response back;
    let errorMessage = "";
    if (error.message) {
      errorMessage += error.message;
    }

    if (error.response && error.response.data.message) {
      errorMessage += error.response.data.message;
    }
    setMessage(errorMessage);
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <div className="container">
        Welcome {username}. You can manage your todos{" "}
        <Link to="/todos">here</Link>
      </div>

      <div className="container">
        Click to get your customized welcome message here.
        <button className="btn btn-success" onClick={retrieveWelcomeData}>
          get welcome message
        </button>
      </div>

      <div>{message}</div>
    </div>
  );
};

export default WelcomeComponent;

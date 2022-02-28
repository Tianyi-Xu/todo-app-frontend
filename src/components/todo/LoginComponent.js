import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    username: "default",
    password: "",
  });
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [hasLoginSucess, setHasLoginSucess] = useState(false);

  const handleChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  // const loginClicked = () => {
  //   AuthenticationService
  //   .excuteBasicAuthentication(loginInfo.username,loginInfo.password)
  //   .then(() => {
  //       AuthenticationService.registerSuccessfulLogin(loginInfo.username,loginInfo.password)
  //       navigate(`/welcome/${loginInfo.username}`);
  //   }).catch( () =>{
  //       setHasLoginFailed(true);
  //       setHasLoginSucess(false);
  //   })
  // };

  const loginClicked = () => {
    AuthenticationService
    .excuteJwtAuthentication(loginInfo.username,loginInfo.password)
    .then((response) => {
        AuthenticationService.registerSuccessfulLoginForJwt(loginInfo.username, response.data.token);
        navigate(`/welcome/${loginInfo.username}`);
    }).catch( () =>{
        setHasLoginFailed(true);
        setHasLoginSucess(false);
    })
  };


  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        {hasLoginFailed && (
          <div className="alert alert-warning">
            Invalid username or password!
          </div>
        )}
        {hasLoginSucess && <div>Successfully logged in!</div>}
        User name:
        <input
          type="text"
          name="username"
          value={loginInfo.username}
          onChange={handleChange}
        ></input>
        Password:
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
        ></input>
        <button className="btn btn-success" onClick={loginClicked}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;

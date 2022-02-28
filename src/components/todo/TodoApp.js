import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import HeaderComponent from './HeaderComponent';
import FooterComponent from "./FooterComponent";
import ListTodosComponent from './ListTodosComponent';
import TodoComponent from "./TodoComponent";


const TodoApp = () => {
  const {username, id} = useParams(); 
  return (
    <div className="TodoApp">
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="/welcome/:username" element={<AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute>} />
          <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>} />
          <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponent /></AuthenticatedRoute>} />
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
};

export default TodoApp;

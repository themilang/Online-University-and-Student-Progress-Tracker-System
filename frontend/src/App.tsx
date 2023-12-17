import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Lectures from "./pages/Lectures";
import Courses from "./pages/Courses";
import Landing from "./pages/Landing";
import LectureForm from "./components/forms/AddLectureForm";
import AddCourseForm from "./components/forms/AddCourseForm";
import LectureEditForm from "./components/forms/EditLectureForm";
import SecureRoute from "./routes/SecureRoute";
import UnmatchedRoute from "./pages/UnmatchedRoute";
import AccessDenied from "./pages/AccessDenied";
import PrivateRoute from "./routes/PrivateRoute";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Section from "./pages/Section";
function App() {
  return (
    <>
      <Routes>
      <Route path ='/' element={<Landing/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
       
          <Route path="/" element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
              <Route path="/lecture" element={<Lectures />} />
              <Route path="/lecture/add" element={<LectureForm />} />
              <Route path="/lecture/:id" element={<LectureEditForm />} />
              <Route path="/courses/add" element={<AddCourseForm />} />
           
            <Route path="/courses" element={<Courses />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path = '/section' element={<Section/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/profile" element={<Profile />}/>
            
             
         </Route>
        

        <Route path="*" element={<UnmatchedRoute />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

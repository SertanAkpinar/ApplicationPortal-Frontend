import LandingPage from "./components/landingPage/LandingPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/Homepage";
import UserManagement from "./components/user/userManagementPage.js/UserManagementPage";
import UserEditPage from "./components/user/userEditPage/UserEditPage";
import UserCreatePage from "./components/user/UserCreatePage/UserCreatePage";
import DegreeCourseManagement from "./components/degreeCourse/DegreeCourseManagement";
import DegreeCourseCreatePage from "./components/degreeCourse/degreeCourseCreatePage/DegreeCourseCreatePage";
import DegreeCourseEditPage from "./components/degreeCourse/degreeCourseEditPage/DegreeCourseEditPage";
import ApplicationManagement from "./components/application/applicationManagementPage/ApplicationManagementPage";
import ApplicationCreatePage from "./components/application/applicationCreatePage/ApplicationCreatePage"
import ApplicationDegreeCourseCreatePage from "./components/application/applicationCreatePage/ApplicationDegreeCourseCreatePage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/homepage' element={<Home />} />
          <Route path='/userManagementPage' element={<UserManagement />} />
          <Route path='/userEdit/:userID' element={<UserEditPage />} />
          <Route path='/userCreate' element={<UserCreatePage />} />
          <Route path='/degreeCourseManagementPage' element={<DegreeCourseManagement />} />
          <Route path='/degreeCourseCreate' element={<DegreeCourseCreatePage />} />
          <Route path='/degreeCourseEdit/:id' element={<DegreeCourseEditPage />} />
          <Route path='/applicationManagementPage' element={<ApplicationManagement />} />
          <Route path='/degreeCourseApplication' element={<ApplicationCreatePage />} />
          <Route path='/degreeCourseApplication/:id' element={<ApplicationDegreeCourseCreatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

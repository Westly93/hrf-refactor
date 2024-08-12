import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Setup from './components/utils/Setup';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NewAdvert from './pages/NewAdvert';
import PasswordReset from './pages/PasswordReset';
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'

export default function App(){
  return (
    <div className="App">
      
      <Setup/>
      <Router>
        <Navbar/>
        <Routes>
          <Route element= {<Jobs/>} path="/" />
          <Route element= {<JobDetail/>} path="/jobs/:id" />
          <Route element= {<Login/>} path="/login" />
          <Route element= {<SignUp/>} path="/signup" />
          <Route element= {<NewAdvert/>} path="/adverts" />
          <Route element= {<PasswordReset/>} path="/password-reset" />
          <Route element= {<PasswordResetConfirm/>} path="/password-reset-confirm/:uid/:token" />
        </Routes>
      </Router>
    </div>
  )
}
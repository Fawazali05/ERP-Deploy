import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/signup';
import PreviousAcademicResults from './components/previous_academic_results';
import PreviousResult from './components/Admin/PreviousResult';
import FeeAddressParents from './components/fees_address_parents';
import McaResult from './components/mcaResult';
import Achievements from './components/achievements';
import Training from './components/training';
import Research from './components/research';
import Home1 from './components/Admin/home';
import StudentDataCard from './components/Admin/StudentDataCard';
import FeeParents from './components/Admin/FeeParents';
import CurrentMcaResults from './components/Admin/currentMcaResults';
import CompAchievements from './components/Admin/Achievements';
import Placements from './components/Admin/Placements';
import ResearchPaper from './components/Admin/researchPaper';
import Report from './components/Report';
import Image from './components/images';
import YearResult from './components/yearResult';
import StudentReport from './components/Admin/studentReport';

import AdminLogin from './components/Admin/adminLogin';
import ExamCompetitive from './components/Admin/ExamCompetitive'


import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/ResetPassword';

import AdminForgotPassword from './components/Admin/adminForgotPassword'
import AdminResetPassword from './components/Admin/adminResetPassword'


function App() {
  return (
    <>
    <Router>
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/Home' element={<Home/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/previous_academic_results' element={<PreviousAcademicResults/>}/>
         <Route path='/Admin/PreviousResult' element={<PreviousResult/>}/>
         <Route path='/fees_address_parents' element={<FeeAddressParents/>}/>
         <Route path='/mcaResult' element={<McaResult/>}/>
         <Route path='/yearResult' element={<YearResult/>}/>
         <Route path='/achievements' element={<Achievements/>}/>
         <Route path='/training' element={<Training/>}/>
         <Route path='/research' element={<Research/>}/>
         <Route path='/Report' element={<Report/>}/>
         <Route path='/images' element={<Image/>}/>
         <Route path='/Admin/home' element={<Home1/>}/>
         <Route path='/Admin/StudentDataCard' element={<StudentDataCard/>}/>
         <Route path='/Admin/FeeParents' element={<FeeParents/>}/>
         <Route path='/Admin/currentMcaResults' element={<CurrentMcaResults/>}/>
         <Route path='/Admin/Achievements' element={<CompAchievements/>}/>
         <Route path='/Admin/Placements' element={<Placements/>}/>
         <Route path='/Admin/researchPaper' element={<ResearchPaper/>}/>
         <Route path='/Admin/studentReport' element={<StudentReport/>}/>
         <Route path='/Admin/adminLogin' element={<AdminLogin/>}/>
         <Route path='/Admin/ExamCompetitive' element={<ExamCompetitive/>}/>
       
         <Route path='/forgotpassword' element={<ForgotPassword/>}/>
         <Route path='/passwordreset/:resetToken' element={<ResetPassword/>}/>
         

         <Route path='/Admin/adminforgotpassword' element={<AdminForgotPassword/>}/>
         <Route path='/Admin/passwordreset/:resetToken' element={<AdminResetPassword/>}/>
       </Routes>
       </Router>
     </>
   );
}

export default App;

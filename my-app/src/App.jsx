import { LandingPage } from "./pages/LandingPage"
import { StudentDashboard } from "./pages/StudentDashboard"
import { TeacherDashboard } from "./pages/TeacherDashboard"
import { ParentDashboard } from "./pages/parentDashboard"
import { Signin } from "./pages/Signin"
import { ParentSignup } from "./pages/signup/parent/ParentSignup"
import { StudentSignup } from "./pages/signup/student/StudentSignup"
import { TeacherSignup } from "./pages/signup/teacher/TeacherSignup"
import { Routes, Route } from "react-router"

function App() {
  return (
    <section>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='signin' element={<Signin />} />
        <Route path='/teacher/signup' element={<TeacherSignup />} />
        <Route path='/student/signup' element={<StudentSignup />} />
        <Route path='/parent/signup' element={<ParentSignup />} />
        <Route path='studentdashboard' element={<StudentDashboard />} />
        <Route path='teacherdashboard' element={<TeacherDashboard />} />
        <Route path='parentdashboard' element={<ParentDashboard />} />
      </Routes>
    </section>
  )
}

export default App

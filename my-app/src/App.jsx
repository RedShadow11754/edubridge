import { LandingPage } from "./pages/LandingPage"
import { StudentDashboard } from "./pages/StudentDashboard"
import { TeacherDashboard } from "./pages/TeacherDashboard"
import { ParentDashboard } from "./pages/parentDashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Routes, Route } from "react-router"

function App() {
  return (
    <section>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='login' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='studentdashboard' element={<StudentDashboard />} />
        <Route path='teacherdashboard' element={<TeacherDashboard />} />
        <Route path='parentdashboard' element={<ParentDashboard />} />
      </Routes>
    </section>
  )
}

export default App

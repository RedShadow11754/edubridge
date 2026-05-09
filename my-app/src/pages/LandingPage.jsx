
import { Link } from "react-router"
function LandingPage() {
    return (
        <div>
            <Link to="/student/signup">student</Link> <br />
            <Link to="/teacher/signup">teacher</Link> <br />
            <Link to="/parent/signup">parent</Link> <br />
        </div>
    )
}

export { LandingPage }

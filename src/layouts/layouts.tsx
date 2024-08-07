import { Link, Outlet } from "react-router-dom"

const layouts = () => {
  return (
    <div>
        <div className="flex gap-8 ">
            <Link to="/" className="RTL">Home</Link>
            <Link to="/about" className="LTR">About</Link>
        </div>
        <Outlet></Outlet>
        <p className="BTT">footer</p>
    </div>
  )
}

export default layouts

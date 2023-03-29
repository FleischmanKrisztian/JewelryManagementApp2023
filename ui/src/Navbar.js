import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/Jewelries" className="site-title">
        Biju Products
      </Link>
      <ul>
        <CustomLink to="/Jewelries">Stoc</CustomLink>
        <CustomLink to="/Jewelrytypes">Tipuri de Bijuterii</CustomLink>
        <CustomLink to="/Sales">Vânzări</CustomLink>
        <CustomLink to="/Maintenance">Avize</CustomLink>
        <CustomLink to="/Admin">Admin</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

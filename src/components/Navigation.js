export default Header = () => (
      <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                  <Link className="navbar-brand" to="/"></Link>
              </div>
              <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
              </ul>
          </div>
      </nav>
    )

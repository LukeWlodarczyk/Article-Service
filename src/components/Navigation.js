import React from 'react';
import { Link } from 'react-router-dom';



const Navigation = ({ authenticated }) => (
  <nav className="">
      <div className="">
          <div className="">
              <Link className="" to="/">home</Link>
          </div>
          <ul className="">
              <li className="">
                  <Link className="" to="/signup">Sign up</Link>
              </li>
              <li className="">
                  <Link className="" to="/signin">Sign in</Link>
              </li>
              <li className="">
                  <Link className="" to="/offerts">Offerts</Link>
              </li>
              <li className="">
                  <Link className="" to="/add-offert">Add offert</Link>
              </li>
          </ul>
      </div>
  </nav>
)

export default Navigation;

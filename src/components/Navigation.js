import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

const Navigation = ({ authenticated }) => (
  <nav className="">
      <div className="">
          <div className="">
              <Link className="" to="/">home</Link>
          </div>
          <ul className="">
              {authenticated.uid === 'guest' &&
                <React.Fragment>
                  <li className="">
                      <Link className="" to="/signup">Sign up</Link>
                  </li>
                  <li className="">
                      <Link className="" to="/signin">Sign in</Link>
                  </li>
                </React.Fragment>}
              <li className="">
                  <Link className="" to="/offerts">Offerts</Link>
              </li>
              <li className="">
                  <Link className="" to="/add-offert">Add offert</Link>
              </li>
              <li className="">
                  <Link className="" to={"/users/"+authenticated.uid}>Account</Link>
              </li>
              <SignOutButton />
          </ul>
      </div>
  </nav>
)

export default Navigation;

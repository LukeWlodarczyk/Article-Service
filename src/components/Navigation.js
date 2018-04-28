import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import AccountMenu from './AccountMenu';

const Navigation = ({ authenticated }) => (
  <nav className="">
      <div className="">
          <div className="">
              <Link className="" to="/">Articles</Link>
          </div>
          <ul className="">
              {authenticated.uid === 'guest' ?
                <React.Fragment>
                  <li className="">
                      <Link className="" to="/signup">Sign up</Link>
                  </li>
                  <li className="">
                      <Link className="" to="/signin">Sign in</Link>
                  </li>
                </React.Fragment> :
                <li className="">
                    <AccountMenu />
                </li>
              }
          </ul>
      </div>
  </nav>
)

export default Navigation;

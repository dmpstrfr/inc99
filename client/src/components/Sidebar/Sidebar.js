import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'perfect-scrollbar';
import logo from 'logo.svg';
import { IoMdExit } from 'react-icons/io';
import { FaCaravan } from 'react-icons/fa';

var ps;

function Sidebar(props) {
  const history = useHistory();
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // return function cleanup() {
    //   if (navigator.platform.indexOf('Win') > -1) {
    //     ps.destroy();
    //   }
    // };
  });

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    history.push('/sign-in');
  };

  return (
    <div
      className='sidebar'
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className='logo'>
        <a
          href='https://www.creative-tim.com'
          className='simple-text logo-mini'
        >
          <div className='logo-img'>
            {/* <img src={logo} alt='react-logo' /> */}
            <FaCaravan size={25} color='#51bcda' style={{ marginTop: '5px' }} />
          </div>
        </a>
        <a
          href='https://www.creative-tim.com'
          className='simple-text logo-normal'
        >
          Invantory
        </a>
      </div>
      <div className='sidebar-wrapper' ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? ' active-pro' : '')
                }
                key={key}
              >
                <NavLink
                  to={prop.path}
                  className='nav-link'
                  activeClassName='active'
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
          <li onClick={handleSignOut}>
            <a className='nav-link'>
              <i className='nc-icon'>
                <IoMdExit />
              </i>
              <p style={{ paddingTop: '4px' }}>Sign out</p>
            </a>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

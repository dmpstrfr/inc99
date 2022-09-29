import React, { useState } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch, useLocation } from 'react-router-dom';

import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

import routes from 'routes.js';

var ps;

function Dashboard(props) {
  const [routeLinks, setRouteLinks] = useState(
    JSON.parse(localStorage.getItem('currentUser'))?.permission === 'STANDARD'
      ? [
          {
            path: '/inventory',
            name: 'Inventory',
            icon: 'nc-icon nc-atom',
          },
          {
            path: '/groups',
            name: 'Groups',
            icon: 'nc-icon nc-vector',
          },
          {
            path: '/show-and-tell',
            name: 'Show & Tell',
            icon: 'nc-icon nc-album-2',
          },
        ]
      : [
          {
            path: '/items',
            name: 'Items and Categories',
            icon: 'nc-icon nc-bullet-list-67',
          },
        ]
  );
  const [backgroundColor, setBackgroundColor] = React.useState('black');
  const [activeColor, setActiveColor] = React.useState('info');
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
    // return function cleanup() {
    //   if (navigator.platform.indexOf('Win') > -1) {
    //     ps.destroy();
    //     document.body.classList.toggle('perfect-scrollbar-on');
    //   }
    // };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className='wrapper'>
      <Sidebar
        {...props}
        routes={routeLinks}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className='main-panel' ref={mainPanel}>
        <DemoNavbar {...props} />
        {props.children}
        {/* <Footer fluid /> */}
      </div>
    </div>
  );
}

export default Dashboard;

import UserPage from 'views/User.js';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

var routes =
  currentUser?.permission === 'STANDARD'
    ? [
        {
          path: '/inventory',
          name: 'Inventory',
          icon: 'nc-icon nc-backpack',
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
      ];
export default routes;

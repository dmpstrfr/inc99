import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from 'layouts/Admin.js';
import Dashboard from 'views/Dashboard';
import SignIn from 'views/SignIn';
import SignUp from 'views/SignUp';
import ItemsAndCategories from 'views/ItemsAndCategories';
import Inventory from 'views/Inventory';
import ShowTell from 'views/ShowTell';
import Groups from 'views/Groups';
import InventoryDetail from 'views/InventoryDetail';
import GroupDetail from 'views/GroupDetail';
import TripDetail from 'views/TripDetail';

const RequireAuth = ({ children }) => {
  let isAuthenticated = false;
  if (localStorage.getItem('currentUser')) isAuthenticated = true;
  return isAuthenticated ? children : <Redirect to='/sign-in' />;
};

const CheckAuth = ({ children }) => {
  let isAuthenticated = false;
  if (localStorage.getItem('currentUser')) isAuthenticated = true;
  return isAuthenticated ? <Redirect to='/inventory' /> : children;
};

const RequireAdminAuth = ({ children }) => {
  let isAuthenticated = false;
  if (JSON.parse(localStorage.getItem('currentUser')).permission === 'ADMIN')
    isAuthenticated = true;
  return isAuthenticated ? children : <Redirect to='/items' />;
};

const MyRoutes = () => {
  return (
    <>
      <Redirect exact from='/' to='/sign-in' />
      <Route
        path='/inventory'
        exact
        render={(props) => (
          <RequireAuth>
            <AdminLayout {...props}>
              <Inventory />
            </AdminLayout>
          </RequireAuth>
        )}
      />
      <Route
        path='/inventory/:inventoryId'
        render={(props) => (
          <RequireAuth>
            <AdminLayout {...props}>
              <InventoryDetail />
            </AdminLayout>
          </RequireAuth>
        )}
      />
      <Route
        path='/groups'
        exact
        render={(props) => (
          <RequireAuth>
            <AdminLayout {...props}>
              <Groups />
            </AdminLayout>
          </RequireAuth>
        )}
      />
      <Route
        path='/groups/:groupId'
        exact
        render={(props) => (
          <RequireAuth>
            <AdminLayout {...props}>
              <GroupDetail />
            </AdminLayout>
          </RequireAuth>
        )}
      />
      <Route
        path='/groups/:groupId/:tripId'
        exact
        render={(props) => (
          <RequireAuth>
            <AdminLayout {...props}>
              <TripDetail />
            </AdminLayout>
          </RequireAuth>
        )}
      />
      <Route
        path='/show-and-tell'
        render={(props) => (
          <RequireAuth>
            <AdminLayout {...props}>
              <ShowTell />
            </AdminLayout>
          </RequireAuth>
        )}
      />
      <Route
        path='/sign-in'
        render={(props) => (
          <CheckAuth>
            <SignIn />
          </CheckAuth>
        )}
      />
      <Route
        path='/sign-up'
        render={(props) => (
          <CheckAuth>
            <SignUp />
          </CheckAuth>
        )}
      />
      <Route
        path='/items'
        render={(props) => (
          <RequireAdminAuth>
            <AdminLayout {...props}>
              <ItemsAndCategories />
            </AdminLayout>
          </RequireAdminAuth>
        )}
      />
    </>
  );
};

export default MyRoutes;

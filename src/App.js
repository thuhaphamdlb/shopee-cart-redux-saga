import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import MainSearch from "./components/Search";
import ProductsDetail from "./components/ProductDetail";
import Purchase from "./components/Purchase";

// admin management

import User from "./components/admin/User";
import Category from "./components/admin/Category";
import Slider from "./components/admin/Slider";
import Transaction from "./components/admin/Transaction";

import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import ShoppingCart from "./components/ShoppingCart";

import { Switch, Route } from "react-router-dom";

import { checkUserSession } from "./redux/User/user.actions";

import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

import "./App.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />

        <Route
          exact
          path="/signup"
          render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}
        />

        <Route exact path="/search/:query" component={MainSearch}></Route>

        <Route
          exact
          path="/product-detail/:id"
          component={ProductsDetail}
        ></Route>

        <Route
          exact
          path="/forgot-password"
          render={() => (
            <MainLayout>
              <ForgotPassword />
            </MainLayout>
          )}
        />

        <Route
          exact
          path="/dashboard"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />

        <Route
          exact
          path="/dashboard/purchase"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard>
                  <Purchase/>
                </Dashboard>
              </DashboardLayout>
            </WithAuth>
          )}
        />

              <Route
                exact
                path="/admin"
                render={() => (
                  <WithAdminAuth>
                    <AdminLayout>
                      <Admin />
                    </AdminLayout>
                  </WithAdminAuth>
                )}
              />

              <Route
                exact
                path="/admin/user"
                render={() => (
                  <WithAdminAuth>
                    <AdminLayout>
                      <User />
                    </AdminLayout>
                  </WithAdminAuth>
                )}
              />

              <Route
                exact
                path="/admin/category"
                render={() => (
                  <WithAdminAuth>
                    <AdminLayout>
                      <Category />
                    </AdminLayout>
                  </WithAdminAuth>
                )}
              />

              <Route
                exact
                path="/admin/slider"
                render={() => (
                  <WithAdminAuth>
                    <AdminLayout>
                      <Slider />
                    </AdminLayout>
                  </WithAdminAuth>
                )}
              />

              <Route
                exact
                path="/admin/transaction"
                render={() => (
                  <WithAdminAuth>
                    <AdminLayout>
                      <Transaction />
                    </AdminLayout>
                  </WithAdminAuth>
                )}
              />

              <Route
                path="/signin"
                render={() => (
                  <MainLayout>
                    <Login />
                  </MainLayout>
                )}
              />

              <Route
                path="/shopping-cart"
                render={() => (
                  <WithAuth>
                    <MainLayout>
                      <ShoppingCart />
                    </MainLayout>
                  </WithAuth>
                )}
              />
      </Switch>
    </div>
  );
};

export default App;

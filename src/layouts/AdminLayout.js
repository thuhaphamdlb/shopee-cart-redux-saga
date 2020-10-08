import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/User/user.actions";

import VerticalNav from "./../components/VerticalNav";
import Footer from "./../components/Footer";
import Header from "./../components/Header";

const AdminLayout = (props) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutUser());
  };

  return (
    <div className="adminLayout">
      <div style={{ height: 140 }}>
        <Header />
      </div>
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin/user">
                  User
                </Link>
              </li>
              <li>
                <Link to="/admin/category">
                  Category
                </Link>
              </li>
              <li>
                <Link to="/admin/product">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/admin/slider">Slider</Link>
              </li>
              <li>
                <Link to="/admin/transaction">
                  Transaction
                </Link>
              </li>
              <li>
                <i className="fa fa-sign-out-alt" aria-hidden="true">
                  <span className="signOut" onClick={() => signOut()}>
                    Sign Out
                  </span>
                </i>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;

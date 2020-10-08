import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../redux/User/user.actions';

import Header from '../components/Header';
import VerticalNav from '../components/VerticalNav';
import Footer from '../components/Footer';
import AdminBar from '../components/AdminBar';

const DashBoardLayout = props => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUser());
    };

    return (
        <div className="dashboardLayout">
            <div style={{ height: 140 }}>
                <Header {...props} />
            </div>
            <div className="controlPanel">
                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <AdminBar />
                            </li>
                            <li>
                                <Link to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/purchase">
                                    Đơn mua
                                </Link>
                            </li>
                            <li>
                                <span className="signOut" onClick={() => signOut()}>
                                    Đăng xuất
                            </span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default DashBoardLayout;

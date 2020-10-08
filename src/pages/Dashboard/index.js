import React from 'react'
import { useSelector } from 'react-redux'
import './styles.scss'
import { Row, Col } from 'antd'
import ImgProfile from './../../assets/user.png'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const DashBoard = props => {
    const { currentUser } = useSelector(mapState)

    return (
        <div className="dashboard-user">
            {!props.children && (
                <Row className="profile">
                    <Col span={18}>
                        <h3 style={{ color: "orangered", textTransform: "uppercase" }}>Hồ sơ của tôi</h3>
                        <table className="profile-table">
                            <tbody>
                                <tr>
                                    <td>Tên Đăng Nhập</td>
                                    <td> {currentUser.displayName}</td>
                                </tr>
                                <tr>
                                    <td>Họ và Tên</td>
                                    <td>{currentUser.displayName}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{currentUser.email}</td>
                                </tr>
                                <tr>
                                    <td>SDT</td>
                                    <td>0866487699</td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ</td>
                                    <td>101 B Lê Hữu Trác</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col>
                        <Row>
                            <img style={{ width: 200, height: 200 }} src={ImgProfile} alt={currentUser.displayName} />
                        </Row>
                    </Col>
                </Row>
            )}
            {props.children && (
                <div className="show-shopping-cart">
                    {props.children}
                </div>
            )}
        </div >
    )
}

export default DashBoard
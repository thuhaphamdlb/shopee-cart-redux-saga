import React from 'react';
import './styles.scss';
import BackgroundImage from '../../assets/backgroundlogin.jpg'

const AuthWrapper = ({ headline, children }) => {
    return (
        <>
            <img src={BackgroundImage} alt="Nicu" className="form-background"/>
            <div className="authWrapper">
                <div className="wrap">
                    {headline && <h2>{headline}</h2>}
                    <div className="children">
                        {children && children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthWrapper;
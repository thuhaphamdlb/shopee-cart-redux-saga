import React from 'react';
import './styles.scss';
import userImage from '../../assets/user.png'

const UserProfile = props => {
    const { currentUser } = props;
    const { displayName, email } = currentUser;

    return (
        <div style={{ textAlign:'center' }} className="userProfile">
            <ul>
                <li>
                    <div className="img">
                        <img alt={displayName} src={userImage} />
                    </div>
                </li>
                <li>
                    <span className="displayName">
                        {displayName && displayName}
                    </span>
                </li>
                <li>
                    <span  className="email">
                        {email && email}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default UserProfile;
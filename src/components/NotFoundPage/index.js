import React from 'react'
import NotFoundImage from '../../assets/notfound.jpg'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div>
            <Link to='/'>
                <img src={NotFoundImage} alt="Not Found" />
            </Link>
        </div>
    )
}

export default NotFoundPage
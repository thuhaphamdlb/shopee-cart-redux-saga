import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './styles.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminBar = () => {
    const { currentUser } = useSelector(mapState)

    const checkUserIsAdmin = currentUser => {
        if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
        const { userRoles } = currentUser
        if (userRoles.includes('admin')) return true
        return false
    }

    const isUserAdmin = checkUserIsAdmin(currentUser)

    if (!isUserAdmin) return null;

    return (
        <Link to='/admin'>Admin</Link>
    )
}

export default AdminBar
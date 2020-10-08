import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'
import './styles.scss'

const User = props => {
    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        firebase.firestore().collection('users')
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data());
                setUsers(data)
            })
    }

    const deleteUserFromFirebase = (userID) => {
        firebase.firestore().collection('users')
            .doc(userID)
            .delete()
        fetchUsers();
    }

    useEffect(() => {
        fetchUsers()
    }, [users])

    return (
        <div>
            <h2>Quản lý tài khoản</h2>
            <table className="users-tables">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Display Name</th>
                        <th>Email</th>
                        <th>User Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {user.displayName}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.userRoles}
                                </td>
                                <td>
                                    <button onClick={() => deleteUserFromFirebase(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default User
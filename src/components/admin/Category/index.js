import React, { useState, useEffect } from 'react'
import { firestore } from '../../../firebase'
import firebase from '../../../firebase'
import FormInput from './../../../components/forms/FormInput';
import Button from './../../../components/forms/Button';
import { Col, Row } from 'antd'
import { auth } from './../../../firebase';

import './styles.scss'

const Category = props => {
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState('')

    const fetchCategories = () => {
        firebase.firestore().collection('categories')
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data());
                setCategories(data)
            })
    }

    const resetForm = () => {
        setCategoryName('');
        setCategoryImage('');
    };

    useEffect(() => {
        fetchCategories()
    }, [categories])

    const handleAddCategory = (categoryName, categoryImage) => {
        const timestamp = new Date();
        const category = {
            categoryName,
            adminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        }
        firestore
            .collection('categories')
            .add(category)
            .then((res) => {
                firebase.storage().ref()
                    .child('categories/' + categoryImage.name)
                    .put(categoryImage).then((respon) => {
                        respon.ref.getDownloadURL().then((url) => firestore
                            .collection('categories').doc(res.id).set({
                                ...category,
                                categoryImage: url
                            }))
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAddCategory(categoryName, categoryImage)
        resetForm();
    }

    return (
        <div>
            <div className='add-category-container'>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col span={7}>
                            <FormInput
                                label='Danh mục'
                                type='text'
                                value={categoryName}
                                handleChange={e => setCategoryName(e.target.value)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={7}>
                            <FormInput
                                label='Ảnh minh họa'
                                type='file'
                                handleChange={e => setCategoryImage(e.target.files[0])}
                            />
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Button type='submit'>
                                Thêm Danh Mục
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
            <div>
                <h2>Quản lý danh mục</h2>
                <table className="category-tables">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {category.categoryName}
                                    </td>
                                    <td style={{ width: 300, height: 300 }}>
                                        <img src={category.categoryImage} alt={category.categoryName}></img>
                                    </td>
                                    <td>
                                        <button>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Category
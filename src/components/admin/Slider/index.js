import React, { useState, useEffect } from 'react'
import { firestore } from '../../../firebase'
import firebase from '../../../firebase'
import toSlug from '../../../Utils'
import FormInput from './../../../components/forms/FormInput';
import Button from './../../../components/forms/Button';
import { Col, Row } from 'antd'
import { auth } from './../../../firebase';

import './styles.scss'

const Slider = props => {
    const [sliders, setSliders] = useState([])
    const [slideName, setSlideName] = useState('')
    const [slideImage, setSlideImage] = useState('')

    const fetchSliders = () => {
        firebase.firestore().collection('sliders')
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data());
                setSliders(data)
            })
    }

    const resetForm = () => {
        setSlideImage('');
        setSlideName('');
    };

    useEffect(() => {
        fetchSliders()
    }, [])

    const handleAddSlide = (slideName, slideImage) => {
        const timestamp = new Date();
        const slider = {
            slideName,
            adminUserUID: auth.currentUser.uid,
            slug: toSlug(slideName),
            isShow: true,
            createdDate: timestamp
        }
        firestore
            .collection('sliders')
            .add(slider)
            .then((res) => {
                firebase.storage().ref()
                    .child('sliders/' + slideImage.name)
                    .put(slideImage).then((respon) => {
                        respon.ref.getDownloadURL().then((url) => firestore
                            .collection('sliders').doc(res.id).set({
                                ...slider,
                                slideImage: url
                            }))
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editShow = (slug) => {
        console.log(slug, 'slug');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAddSlide(slideName, slideImage)
        resetForm();
    }

    return (
        <div>
            <div className='add-category-container'>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col span={7}>
                            <FormInput
                                label='Tên Quảng Cáo'
                                type='text'
                                value={slideName}
                                required
                                handleChange={e => setSlideName(e.target.value)}
                            />
                        </Col>
                        <Col span={2}></Col>
                        <Col span={7}>
                            <FormInput
                                label='Slider'
                                type='file'
                                required
                                handleChange={e => setSlideImage(e.target.files[0])}
                            />
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Button type='submit'>
                                Thêm Ảnh Trình Chiếu
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
            <div>
                <h2>Quản Lý Ảnh Trình Chiếu</h2>
                {sliders.length > 0 ? (
                    <table className="sliders-tables">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên ảnh</th>
                                <th>Ảnh Trình Chiếu</th>
                                <th>Slug</th>
                                <th>Chiếu</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sliders.map((slider, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {slider.slideName}
                                        </td>
                                        <td style={{ width: 400, height: 200 }}>
                                            <img src={slider.slideImage} alt={slider.slideName}></img>
                                        </td>
                                        <td>
                                            {slider.slug}
                                        </td>
                                        <td>
                                            <span onClick={(e) => editShow(slider.slug)}>{slider.isShow ? 'Chiếu' : 'Không chiếu'}</span>
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
                ) : <span>
                        No slider found
                    </span>
                }
            </div>
        </div>
    )
}

export default Slider
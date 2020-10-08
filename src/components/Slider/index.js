import React, { useState, useEffect } from 'react'
import './styles.scss'
import firebase from '../../firebase'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

const Slider = props => {
  const [sliders, setSliders] = useState([])

  const fetchSliders = () => {
    firebase.firestore().collection('sliders').get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        setSliders(data)
      })
  }

  useEffect(() => {
    fetchSliders()
  }, [])

  return (
    <div className='slider'>
      <Carousel autoplay>
        {sliders.map((slider, index) => (
          <div key={index}>
            <h3><img alt={slider.sliderName} style={{ width: '100%', height: '35%', borderRadius: 0 }} src={slider.slideImage} /></h3>
          </div>
        ))}

      </Carousel>
    </div >
  )
}

export default Slider
import React from 'react'
import Slider from '../../components/Slider'
import Products from '../../components/Products'
import Advantage from '../../components/demo/Advantage'
import Category from '../../components/demo/Category'
import './styles.scss'

const Homepage = props => {
    return (
        <>
            <div>
                <Slider />
            </div>
            <div>
                <Advantage />
            </div>
            <div>
                <Category />
            </div>
            <div>
                <Products />
            </div>
        </>
    )
}

export default Homepage
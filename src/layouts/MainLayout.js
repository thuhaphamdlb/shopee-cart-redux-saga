import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = props => {
    return (
        <div >
            <div style={{ height: 140 }}>
                <Header {...props} />
            </div>
            <div className='main'>
                {props.children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout

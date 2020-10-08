import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomepageLayout = props => {
    return (
        <div className='fullHeight'>
            <div style={{ height: 140 }}>
                <Header {...props} />
            </div>
            {props.children}
            <Footer />
        </div>
    )
}

export default HomepageLayout
import React from 'react';
import { connect } from 'react-redux'
import Background from './landingPageComponents/Background';

function LandingPage() {
    return (
        <div className='page-content' id='LandingPage' style={{ background: 'white' }}>
            <Background />
        </div>
    )
}

export default connect()(LandingPage)
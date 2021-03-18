import React from 'react'
import { GrCode } from "react-icons/gr"


function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <small>For Brindocorp</small>
           <GrCode/>
        </div>
    )
}

export default Footer
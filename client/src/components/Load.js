import React from 'react'
import { Spinner } from 'react-bootstrap'
import '.././style/Nav.css'
function Load() {
    return (
        <div id="load">
            <Spinner animation="border" variant="light" id="spinner" />
        </div>
    )
}

export default Load

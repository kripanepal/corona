import React from 'react'
import App from './App';
import Header from'./header'
import Spinner from "react-bootstrap/Spinner";

function main(props) {
    return (
        <div>
            <Header/>
            <App name="https://corona.lmao.ninja/v2/countries"/>
        </div>
    )
}



export default main


import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main.jsx'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector("#root")
    ReactDOM.render(React.createElement(Main), root);
}, false);
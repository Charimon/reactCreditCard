import React from 'react';
import ReactDOM from 'react-dom';
import {default as CreditCard, CardNumberInput, CardCVCInput, CardExpiryInput} from '../dist/main.min.js';
// import {default as Card, Card2} from '../dist/main.js'

// const test = Card
// const test2 = Card2
// debugger

ReactDOM.render(<CreditCard />, document.getElementById("react-container"));
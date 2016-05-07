import React from 'react';
import ReactDOM from 'react-dom';
import {default as CreditCard, CardNumberInput, CardCVCInput, CardExpiryInput} from '../src/index.jsx';

ReactDOM.render(<CreditCard />, document.getElementById("react-container"));
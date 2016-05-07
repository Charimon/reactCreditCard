import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import Payment from 'payment'

import './index.sass'

import './sprite-cards.css'


const cardWidthToHeightRatio = 1.75
const cardWidthToRatio = 21.875
const cardWidthToBorderRadius = 35

const cardLogoWidthToHeightRatio = 64/42
const cardLogoWidthRatio =  350 / 64 


const last4 = (last4) => last4 != null?(("\u2022".repeat(4) + " ").repeat(3) + last4): null


const pad = (numberToPad, characters, padValue) => {
  const pad_char = typeof padValue !== 'undefined' ? padValue : '0';
  const pad = new Array(1 + characters).join(pad_char);
  return (pad + numberToPad).slice(-pad.length);
}

export const Card = (props) => {
  const augmentedProps = Object.assign({}, props)
  const cardWidth = (props && props.style && props.style.width) || 350
  augmentedProps.style = {
    width: cardWidth,
    height: cardWidth/cardWidthToHeightRatio,
    fontSize: cardWidth/cardWidthToRatio
  }
  
  const cardLogoZoom = cardWidth / cardLogoWidthRatio / 64
  
  const cardNumber = (props.last4 && last4(props.last4)) || (props.cardNumber && Payment.fns.formatCardNumber(props.cardNumber)) || Card.defaultProps.cardNumber
  const cardBrand = (props.cardBrand && props.cardBrand.toLowerCase())  || (Payment.fns.cardType(props.cardNumber) && Payment.fns.cardType(props.cardNumber).toLowerCase())
  const month = (isNaN(props.month))?Card.defaultProps.month:pad(props.month, 2)
  const year = (isNaN(props.year))?Card.defaultProps.year:pad(props.year, 2)
  const name = props.name || Card.defaultProps.name
  const cvc = props.cvc || Card.defaultProps.cvc
  
  return <div {...augmentedProps} className={classNames("creditCard", props.className, (cardBrand && `creditCard-${cardBrand}`), {"creditCard-flipped": props.flipped})}>
    <div className="creditCard-front" style={{borderRadius: cardWidth/cardWidthToBorderRadius}}>
      <div className={classNames("creditCard-logo", (cardBrand && `icon-${cardBrand}`) )} style={{zoom: cardLogoZoom, MozTransformOrigin: "top right", MozTransform: `scale(${cardLogoZoom})` }} />
      <div className="creditCard-chip"></div>
      <div className="creditCard-number">{cardNumber}</div>
      <div className="creditCard-name">{name}</div>
      <div className="creditCard-expiry">{`${month}/${year}`}</div>
    </div>
    <div className="creditCard-back" style={{borderRadius: cardWidth/cardWidthToBorderRadius}}>
      <div className="creditCard-magStrip" />
      <div className="creditCard-signature" />
      <div className="creditCard-cvc">{cvc}</div>
    </div>
  </div>
}

Card.defaultProps = {
  month: "MM",
  year: "YY",
  name: "FULL NAME",
  cardNumber: ("\u2022".repeat(4) + " ").repeat(3) + "\u2022".repeat(4),
  cvc: "\u2022".repeat(3)
}

export default Card


export class CardNumberInput extends React.Component {
  componentDidMount() { Payment.formatCardNumber(this.refs.input) }
  render() {
    return <input placeholder="Card number" type="text" name="number" ref="input" value={this.props.value} autoComplete="cc-number" {...this.props} />
  }
}

export class CardCVCInput extends React.Component {
  componentDidMount() { Payment.formatCardCVC(this.refs.input) }
  render() {
    return <input placeholder="CVC" type="text" name="number" ref="input" value={this.props.value} autoComplete="off" {...this.props} />
  }
}

export class CardExpiryInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    const {month, year} = Payment.fns.cardExpiryVal(e.target.value)
    this.props.onChangeValue && this.props.onChangeValue(month, year, e.target.value)
  }
  componentDidMount() { Payment.formatCardExpiry(this.refs.input) }
  render() {
    return <input placeholder="MM/YY" type="text" name="number" ref="input" value={this.props.value} autoComplete="cc-exp" onChange={this.onChange} {...this.props} />
  }
}
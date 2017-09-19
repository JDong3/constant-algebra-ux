import Card from './card.js'
import {Col, Row} from 'react-flexbox-grid'
import {mm, mmv, util} from 'constant-algebra'
import FormInput from './formInput.js'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styles from './customStyles.js'

const schedule = ['- add docs for constant-algebra package on npm',
                  '- implement negative number parsing',
                  '- implement computation of all properties on CA lib']
const welcomeCards = [
  <Card name={'Try Inputs:'} contents={['[[0, 1, 2], [3, 4, 5], [6, 7, 8]]', '[[2, 3, 4, 5], [6, 7, 9, 10]]']}/>,
  <Card name={'Dev Schedule: date: (12-09-17)'} contents = {schedule}/>
]

const getCards = (string) => {
  const matrix = util.parseMatrix(string)
  if (!matrix) {
    return [<Card name={'err:'} contents={['my parser does not know how to interperet your input >.<']}/>]
  }
  const cards = []
  cards.push(cardOf('Input:', matrix, (m) => (true), (m) => (m)))
  cards.push(cardOf('RREF:', matrix, mmv.rrefDefined, mm.rref))
  cards.push(cardOf('Transpose:', matrix, mmv.transposeDefined, mm.transpose))
  cards.push(cardOf('Adjugate:', matrix, mmv.adjugateDefined, mm.adjugate))
  //cards.push(cardOf('Inverse:', matrix, mmv.inverseDefined, mm.inverse))

  return cards
}

const cardOf = (name, matrix, verify, transform) => {
  console.log(verify)
  console.log(transform)
  if (!verify(matrix)) {
    return (
      <Card name={name} contents={['undefined']}/>
    )
  } else {
    const fixedMatrix = util.matrixToStringList(transform(matrix))
    return (
      <Card name={name} contents = {fixedMatrix}/>
    )
  }
}

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: this.props.cards,
      inputFormText: ''
    }
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    console.log(this.state.inputFormText)
    const newCards = getCards(this.state.inputFormText)
    this.setState(
      {cards: newCards}
    )
  }

  handleFormUpdate(event) {
    event.preventDefault()
    this.setState({inputFormText: event.target.value})
  }

  renderFormInput(text) {
    return (
      <FormInput text={text}/>
    )
  }

  renderDivider() {
    return (
      <p style={styles.divider}/>
    )
  }

  handleHomeButtonClick(event) {
    event.preventDefault()
    this.setState({cards: welcomeCards, inputFormText: ''})
  }

  render() {
    const cards = this.state.cards.map((card) => (
      <div>
        {card}
        <p style={styles.divider}/>
        <p style={styles.divider}/>
      </div>
    ))
    return(
      <body style={styles.background}>
        <Col onChange={this.handleFormUpdate}
          xs={12} sm={12} md={12} lg={12}>
          <button style={styles.headerText} onClick={this.handleHomeButtonClick}>
            Constant Algebra v 0.0.0 (Alpha)
          </button>
          {this.renderDivider()}
          <Row center='xs'>
            <Col xs={8} sm={8} md={5} lg={5}>
              <form onSubmit={this.handleFormSubmit}>
                {this.renderFormInput(this.state.inputFormText)}
              </form>
            </Col>
          </Row>
          {this.renderDivider()}
          {cards}
        </Col>
      </body>
    )
  }
}


ReactDOM.render(<Index cards={welcomeCards}/>, document.getElementById('root'))

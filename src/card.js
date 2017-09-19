import React, {Component} from 'react'
import styles from './customStyles.js'
import {Col, Row} from 'react-flexbox-grid'

class Card extends Component {
  constructor(props) {
    super(props)
  }

  renderNameDisplay(name) {
    return (
      <NameDisplay name={name}/>
    )
  }

  renderContentsDisplay(contents) {
    return (
      <ContentsDisplay contents={contents}/>
    )
  }

  render() {
    return(
      <Row center='xs'>
        <Col xs={10} sm={10} md={8} lg={6}>
          <div style={styles.cardDisplay}>
            {this.renderNameDisplay(this.props.name)}
            {this.renderContentsDisplay(this.props.contents)}
          </div>
        </Col>
      </Row>
    )
  }
}

class NameDisplay extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Row>
        <Col>
            {this.props.name}
        </Col>
      </Row>
    )
  }
}

class ContentsDisplay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const lines = this.props.contents.map((element) => (
      <Row>
        <Col xs={1} sm={1} md={1} lg={1}/>
        <Col>
            {element}
        </Col>
      </Row>
    ))
    return (
      <div>
        <pre>
          {lines}
        </pre>
      </div>
    )
  }
}

export default Card

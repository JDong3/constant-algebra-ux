import React, {Component} from 'react'
import styles from './customStyles.js'

class FormInput extends Component {

  render() {
    return(
      <input
        type="text"
        style={styles.formInput}
        value={this.props.text}/>
    )
  }
}

export default FormInput

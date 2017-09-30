import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  render () {
    const { props } = this

    return (
      <div>
        <input id='input' binding={props.input} />
        <input id='checkbox' type='checkbox' binding={props.checkbox} />
        <input id='radio' type='radio' binding={props.radio} />
      </div>
    )
  }
}

export default connect(
  state => state.form,
  dispatch => ({
    onChange (value, key) {
      dispatch({
        type: 'UPDATE_FORM',
        key,
        value,
      })
    },
  })
)(App)

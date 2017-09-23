import React from 'react'
import { Custom0, Custom1, Custom2 } from './Custom'
import Child from './Child'

export default class App extends React.Component {
  state = {
    formData: {
      input: 'value',
      select: 'a',
      textarea: 'text',
      checkbox: true,
      radio: false,
    },

    custom0: 0,
    custom1: 1,
    custom2: 2,
    child: 'child',
  }

  render () {
    const { state } = this

    return (
      <div>
        <input id='input' binding={this.state.formData.input} />
        <select binding={this.state.formData.select}>
          <option value='a'>a</option>
          <option value='b'>b</option>
          <option value='c'>c</option>
        </select>
        <textarea binding={state.formData.textarea} />
        <input id='checkbox' type='checkbox' binding={state.formData.checkbox} />
        <input id='radio' type='radio' binding={state.formData.radio} />
        <Custom0 id='custom0' binding={this.state.custom0} />
        <Custom1 id='custom1' binding={state.custom1} />
        <Custom2 id='custom2' binding={state.custom2} />
        <Child id='child' binding={state.child} />
      </div>
    )
  }
}

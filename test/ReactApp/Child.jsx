import React from 'react'

export default class Child extends React.Component {
  render () {
    return (
      <div>
        <input id='child-input' binding={this.props.val} />
      </div>
    )
  }

  static bindingDescriptor = {
    event: 'onInput',
    prop: 'val',
  }
}

import React from 'react'

/**
 * number / onInput
 */
export class Custom0 extends React.Component {
  render () {
    return (
      <div id={this.props.id}>
        {this.props.number}
      </div>
    )
  }

  static bindingDescriptor = {
    prop: 'number',
    event: 'onInput',
  }
}

/**
 * number / onChange
 */
export class Custom1 extends React.Component {
  render () {
    return (
      <div id={this.props.id}>
        {this.props.number}
      </div>
    )
  }

  static bindingDescriptor = {
    prop: 'number',
  }
}

/**
 * value / onInput
 */
export class Custom2 extends React.Component {
  render () {
    return (
      <div id={this.props.id}>
        {this.props.value}
      </div>
    )
  }

  static bindingDescriptor = {
    event: 'onInput',
  }
}

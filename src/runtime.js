import React from 'react'

const warn = (...args) => {
  typeof console !== 'undefined' && console.warn(...args)
}

/**
 * give a event, get the new value that the event contains.
 * @param {Event | React.SyntheticEvent | any} e
 */
const getValue = e => {
  if (!e) return e

  const { target } = e

  /**
   * if `e` is an Event, get value from e.target
   */
  if (target && target.tagName) {
    const { tagName, type } = target
    if (
      tagName === 'INPUT' && (
        type === 'checkbox' || type === 'radio'
      )
    ) {
      return target.checked
    } else {
      return target.value
    }
  }

  return e
}

const shallwClone = node => {
  if (Array.isArray(node)) {
    return [...node]
  } else {
    return {...node}
  }
}

/**
 * deep update node[path0][path1][...] to leaf
 * keep node immutable and return a difference node
 * @param {any} node
 * @param {(string|number)[]} path
 * @param {any} leaf
 */
const deepUpdate = (node, path, leaf) => {
  if (!path.length) {
    return leaf
  }

  node = shallwClone(node)
  let root = node

  path.forEach((key, index) => {
    if (index === path.length - 1) {
      node[key] = leaf
    } else {
      node[key] = shallwClone(node[key])
      node = node[key]
    }
  })

  return root
}

/**
 *
 * @param {React.Component} instance
 * @param {Event} e
 * @param {string} key
 * @param {(string|number)[]} rest
 */
const setState = (instance, e, [key, ...rest]) => {
  const leaf = getValue(e)
  const node = instance.state[key]

  instance.setState({
    [key]: deepUpdate(node, rest, leaf),
  })
}

/**
 *
 * @param {React.Component} instance
 * @param {Event} e
 * @param {string} key
 * @param {(string|number)[]} rest
 */
const setProps = (instance, e, [key, ...rest], eventName) => {
  const { props } = instance
  const leaf = getValue(e)
  const prop = props[key]
  const { propName } = getbindingDescriptor(instance)

  if (propName !== key) {
    warn(
      `'binding={props.X}' can be used only if ` +
      `X is 'value' or the custom two-way prop ` +
      `(defined with bindingDescriptor.prop)`
    )
  }

  props[eventName] && props[eventName](deepUpdate(prop, rest, leaf))
}

/**
 * for native component: input, select, textarea
 *  - default -> {prop: 'value', event: 'onChange'}
 *  - input[type=checkbox, type=radio] -> {prop: 'checked'}
 *
 * for custom component:
 *  - event: Class.bindingDescriptor.event || 'onChange'
 *  - prop: Class.bindingDescriptor.prop || 'value'
 *
 * @param {JSX.Element} element
 * @return {{propName: string, eventName: string}}
 */
const getbindingDescriptor = element => {
  const { type, props } = element
  let eventName = 'onChange'
  let propName = 'value'

  if (type === 'input' && (
    props.type === 'checkbox' || props.type === 'radio'
  )) {
    propName = 'checked'
  }

  if (typeof type === 'function') {
    const { bindingDescriptor = {} } = type
    eventName = bindingDescriptor.event || eventName
    propName = bindingDescriptor.prop || propName
  }

  return {
    propName,
    eventName,
  }
}

/**
 * set correct `onChange` `value` props to JSX Element
 *
 * @param {any} value
 * @param {React.Component} self Component instance
 * @param {JSX.Element} element structure is {type: tag, props:{}}
 * @param {string} space - 'state' or 'props'
 * @param {(string|number)[]} path
 */
const binding = (element, value, self, space, ...path) => {
  const { props } = element
  const { propName, eventName } = getbindingDescriptor(element)

  const selfListener = props[eventName]

  return React.cloneElement(element, {
    [eventName] (e) {
      if (space === 'state') {
        setState(self, e, path)
      }

      if (space === 'props') {
        setProps(self, e, path, eventName)
      }

      selfListener && selfListener(e)
    },

    [propName]: value,
  })
}

export default binding

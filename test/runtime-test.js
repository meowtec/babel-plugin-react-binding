import React from 'react'
import { mount } from 'enzyme'
import App from './ReactApp/App'

test('state -> DOM ok', () => {
  const app = mount(
    <App />
  )

  expect(app.find('#input').prop('value')).toBe('value')
  expect(app.find('select').prop('value')).toBe('a')
  expect(app.find('#checkbox').prop('checked')).toBe(true)
  expect(app.find('#radio').prop('checked')).toBe(false)
  expect(app.find('#custom0').text()).toBe('0')
  expect(app.find('#custom1').text()).toBe('1')
  expect(app.find('#custom2').text()).toBe('2')
})

test('change input -> state', () => {
  const app = mount(
    <App />
  )

  app.find('#input').simulate('change', {
    target: {
      tagName: 'INPUT',
      value: 'new value',
    },
  })

  expect(app.find('#input').prop('value')).toBe('new value')
})

test('change select -> state', () => {
  const app = mount(
    <App />
  )

  app.find('select').simulate('change', {
    target: {
      tagName: 'SELECT',
      value: 'c',
    },
  })

  expect(app.find('select').prop('value')).toBe('c')
})

test('change checkbox -> state', () => {
  const app = mount(
    <App />
  )

  app.find('#checkbox').simulate('change', {
    target: {
      tagName: 'INPUT',
      type: 'checkbox',
      checked: false,
    },
  })

  expect(app.find('#checkbox').prop('checked')).toBe(false)
})

test('change radio -> state', () => {
  const app = mount(
    <App />
  )

  app.find('#radio').simulate('change', {
    target: {
      tagName: 'INPUT',
      type: 'radio',
      checked: true,
    },
  })

  expect(app.find('#radio').prop('checked')).toBe(true)
})

test('change radio -> state', () => {
  const app = mount(
    <App />
  )

  app.find('#radio').simulate('change', {
    target: {
      tagName: 'INPUT',
      type: 'radio',
      checked: true,
    },
  })

  expect(app.find('#radio').prop('checked')).toBe(true)
})

test('change custom -> state', () => {
  const app = mount(
    <App />
  )

  app.find('Custom0').prop('onInput')(10)
  app.find('Custom1').prop('onChange')(11)
  app.find('Custom2').prop('onInput')(12)

  expect(app.find('#custom0').text()).toBe('10')
  expect(app.find('#custom1').text()).toBe('11')
  expect(app.find('#custom2').text()).toBe('12')
})

test('deep in', () => {
  const app = mount(
    <App />
  )

  expect(
    app.find('#child-input').prop('value')
  ).toBe('child')
})

test('deep out', () => {
  const app = mount(
    <App />
  )

  const childInput = app.find('#child-input')

  childInput.simulate('change', {
    target: {
      tagName: 'INPUT',
      value: 'meowtec',
    },
  })

  expect(
    childInput.prop('value')
  ).toBe('meowtec')
})

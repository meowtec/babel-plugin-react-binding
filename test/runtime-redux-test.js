import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import App from './ReactReduxApp/App'
import store from './ReactReduxApp/store'

test('redux state -> DOM ok', () => {
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(app.find('#input').prop('value')).toBe('initial')
  expect(app.find('#checkbox').prop('checked')).toBe(false)
  expect(app.find('#radio').prop('checked')).toBe(true)
})

test('redux state -> dispatch ok', () => {
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )

  app.find('#input').simulate('change', {
    target: {
      tagName: 'INPUT',
      value: 'new value',
    },
  })

  app.find('#checkbox').simulate('change', {
    target: {
      tagName: 'INPUT',
      type: 'checkbox',
      checked: true,
    },
  })

  app.find('#radio').simulate('change', {
    target: {
      tagName: 'INPUT',
      type: 'radio',
      checked: false,
    },
  })

  expect(app.find('#input').prop('value')).toBe('new value')
  expect(app.find('#checkbox').prop('checked')).toBe(true)
  expect(app.find('#radio').prop('checked')).toBe(false)
})

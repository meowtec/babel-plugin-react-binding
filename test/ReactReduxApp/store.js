import { createStore, combineReducers } from 'redux'

const initialForm = {
  input: 'initial',
  checkbox: false,
  radio: true,
}

const formReducer = (state = initialForm, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        [action.key]: action.value,
      }
  }

  return state
}

const reducer = combineReducers({
  form: formReducer,
})

export default createStore(reducer)

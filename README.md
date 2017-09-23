# babel-plugin-react-binding

Two way binding [syntax] sugar for React.

## Usage

#### install

```
npm i babel-plugin-react-binding --save-dev
```

####  add to `.babelrc`

```js
{
  "plugins": [
    ["react-binding", {
      // options
    }]
  ]
}
```

#### use binding in React JSX!

```javascript
<div>
  <input binding={this.state.inputValue}>
  <Dialog binding={this.state.dialogOpen}>
</div>
```

## Principle

`babel-plugin-react-binding` will automatically add `value` and `onChange` props to Element.

When the event triggered, `react-binding` will receive the new value, then execute `setState()` (or `props.onChange()`) to update the value.

You can think of it as (if you write by hand):

```javascript
<input
  value={this.state.inputValue}
  onChange={e => this.setState({ inputValue: e.target.value })}
>
```

## Options

Use babel option to custom the prop name (default `binding`)

```json
{
  "plugins": [
    ["react-binding", {
      "attrName": "bindModel"
    }]
  ]
}
```

Then the jsx code may be like:

```javascript
<input bindModel={this.state.inputValue}>
```

## Custom Component

By default, `react-binding` use `value` and `onChange` as default prop names for two-way binding (except radio and checkbox, they use `checked`). But some custom component may use another prop name, for example `onInput`.

Use static property `bindingDescriptor` for adaptation.

```javascript
CustomComponent.bindingDescriptor = {
  prop: 'number',
  event: 'onInput',
}
```

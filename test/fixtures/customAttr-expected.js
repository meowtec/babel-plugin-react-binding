import _binding from 'babel-plugin-react-binding/lib/runtime'
class A {
  render () {
    return (
      <div className='container'>
        {_binding(<input name='username' />, this.state.form.username, this, 'state', 'form', 'username')}
        {this.renderTextarea()}
      </div>
    )
  }

  renderTextarea () {
    return (
      _binding(<textarea />, this.state.form.description, this, 'state', 'form', 'description')
    )
  }
}

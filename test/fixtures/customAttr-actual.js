class A {
  render () {
    return (
      <div className='container'>
        <input name='username' modelBind={this.state.form.username} />
        {this.renderTextarea()}
      </div>
    )
  }

  renderTextarea () {
    return (
      <textarea modelBind={this.state.form.description} />
    )
  }
}

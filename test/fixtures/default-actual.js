class A {
  render () {
    return (
      <div className='container'>
        <input name='username' binding={this.state.form.username} />
        {this.renderTextarea()}
        <Custom binding={state.form.username} />
      </div>
    )
  }

  renderTextarea () {
    return (
      <textarea binding={this.state.form.description} />
    )
  }
}

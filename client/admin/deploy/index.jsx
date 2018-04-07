import React, { Component } from 'react'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      input: null
    }
  }

  componentDidMount() {
    fetch('/proxy/get-deploy-config')
    .then(response => response.text())
    .then(text => {
      this.setState({ input: text })
    })
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleCommit(e) {
    var { input } = this.state
    try {
      JSON.parse(input)
    } catch (error) {
      console.error(error)
      return alert('input error')
    }
    console.log(input)
  }

  render() {
    var { input } = this.state
    return (
      <div>
        <p>/admin/deploy</p>
        <textarea value={input} onChange={e => this.handleChange(e)} />
        <button onClick={e => this.handleCommit()}>save</button>
      </div>
    )
  }
}
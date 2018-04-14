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
    .then(response => response.json())
    .then(json => {
      this.setState({ input: JSON.stringify(json.model, null, 2) })
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
    fetch('/proxy/set-deploy-config', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: input
    })
    .then(response => response.json())
    .then(json => {
      alert('success')
    })
    .catch(error => {
      alert(error.message)
    })
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
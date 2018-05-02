import React, {Component} from 'react'
import 'whatwg-fetch'
import Layout from '../../component/frame/Layout'
import Field from '../../component/Field'

export default class extends Component {
  constructor(props) {
    super(props)
    const state = window.epii.state
    this.state = {
      query: state.query,
      modal: null,
      input: {}
    }
  }

  componentDidMount() {
    this.loadEvent();
  }

  loadEvent() {
  }

  saveEvent() {
    const { input } = this.state
    fetch('/api/saveEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        window.location.href = '/direct'
      } else {
        alert(json.error)
      }
    })
    .catch(error => {
      alert(error.message)
    })
  }

  changeInput(key, value) {
    const { input } = this.state
    input[key] = value
    this.setState({ input })
  }

  render() {
    const { query } = this.state
    return (
      <Layout hideMode={true}>
        <div className='card'>
        </div>
        <div className='card'>
          <form>
            <Field theme='idle' label='title' 
              onChange={value => this.changeInput('title', value)} />
            <Field theme='idle' label='content'
              onChange={value => this.changeInput('content', value)} />
            <Field theme='idle' label='expect'
              onChange={value => this.changeInput('expect', value)} />
          </form>
        </div>
        <a className='btn fixed-btn area-done' onClick={e => this.saveEvent()}>
          <i className='md-icons'>done</i>
        </a>
      </Layout>
    )
  }
}
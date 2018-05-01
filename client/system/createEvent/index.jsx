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
  }

  render() {
    const { query } = this.state
    return (
      <Layout hideMode={true}>
        <div className='card'>
        </div>
        <div className='card'>
          <form>
            <Field theme='idle' label='name' />
            <Field theme='idle' label='content' />
            <Field theme='idle' label='expect' />
          </form>
        </div>
        <a className='btn fixed-btn area-done' onClick={e => this.saveEvent()}>
          <i className='md-icons'>done</i>
        </a>
      </Layout>
    )
  }
}
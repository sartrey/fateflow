import React, {Component} from 'react'
import 'whatwg-fetch'
import Layout from '../component/frame/Layout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <div></div>
      </Layout>
    )
  }
}
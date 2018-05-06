import React, {Component} from 'react'
import 'whatwg-fetch'
import Header from './Header'
import Footer from './Footer'

export default class Layout extends Component {
  render() {
    var { hideMode } = this.props
    return (
      <div className='wrapper'>
        <Header hideMode={hideMode} />
        <div className='holder'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

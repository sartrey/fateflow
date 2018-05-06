import React, {Component} from 'react'

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className='logo'>timeaxis</div>
        <div className='more'>
          <a onClick={e => this.invokeSearch(e)}>
            <i className='md-icons'>search</i>
          </a>
        </div>
      </header>
    )
  }
}

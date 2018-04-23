import React, {Component} from 'react'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  switchMode() {
    var mode = this.getCurrentMode()
    if (mode === 'direct') window.location.href = '/sprint'
    if (mode === 'sprint') window.location.href = '/direct'
  }

  getCurrentMode() {
    var pathname = window.location.pathname
    if (/^\/direct/.test(pathname)) return 'direct'
    if (/^\/sprint/.test(pathname)) return 'sprint'
    if (/^\/report/.test(pathname)) return 'report'
  }

  render() {
    var mode = this.getCurrentMode()
    return (
      <header>
        <div className='logo'>timeaxis</div>
        <div className='mode' onClick={e => this.switchMode()}>
          <div className={mode === 'direct' ? 'active' : null}>Direct</div>
          <div className={mode === 'sprint' ? 'active' : null}>Sprint</div>
        </div>
      </header>
    )
  }
}

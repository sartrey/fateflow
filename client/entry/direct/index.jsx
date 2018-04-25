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

  renderEventItem(item) {
    var status = ['done', 'halt', 'busy', 'idle'][item.status]
    return (
      <div className='event-item'>
        <div><a className={'badge area-stroke area-' + status}>{status}</a></div>
        <div className='event-name'><p>{item.title}</p></div>
        <div className='control'>
          <a className='btn'>
            <i className='md-icons'>more_horiz</i>
          </a>
        </div>
      </div>
    )
  }

  render() {
    var items = [
      { title: 'test1', status: 0 },
      { title: 'test2', status: 1 }
    ]
    return (
      <Layout>
        <div className='card'>
          <div>
            <a className='btn'>
              <i className='md-icons'>arrow_back</i>
            </a>
            <a className='btn'>
              <i className='md-icons'>add</i>
            </a>
          </div>
          <div className='event-stat'>
            <a className='badge area-idle'>80.00%</a>
          </div>
          <div className='event-name'>
            <p>TODO TODOTODOTODOTODOTODOTODOTODOTOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODO</p>
          </div>
        </div>
        <div className='card'>
          <div>
            <input type='text' />
          </div>
          <div>
            <a className='btn'>Sort By</a>
          </div>
        </div>
        <div className='event-list'>
          {items.map(item => this.renderEventItem(item))}
        </div>
      </Layout>
    )
  }
}
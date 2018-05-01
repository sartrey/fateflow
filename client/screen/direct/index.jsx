import React, {Component} from 'react'
import 'whatwg-fetch'
import Layout from '../../component/frame/Layout'

export default class extends Component {
  constructor(props) {
    super(props)
    const state = window.epii.state
    this.state = {
      query: state.query,
      items: [
        { id: 0, title: 'test1', status: 0 },
        { id: 1, title: 'test2', status: 1 },
        { id: 2, title: 'test3', status: 2 },
        { id: 3, title: 'test4'.repeat(40), status: 3 },
        { id: 4, title: 'test1', status: 0 },
        { id: 5, title: 'test2', status: 1 },
        { id: 6, title: 'test3', status: 2 },
        { id: 7, title: 'test4'.repeat(40), status: 3 },
      ],
      modal: null
    }
  }

  componentDidMount() {
    // load current event
    // load all sub-events
  }

  getEventIntent() {
    // todo - /event/:id/:action
    // view - edit - make
  }

  renderEventItem(item) {
    var status = ['done', 'halt', 'busy', 'idle'][item.status]
    return (
      <div className='event-item' key={item.id}>
        <div><a className={'badge area-stroke area-' + status}>{status}</a></div>
        <div className='event-name'><p>{item.title}</p></div>
        <div className='control'>
          <a className='btn'>
            <i className='md-icons'>info_outline</i>
          </a>
          <a className='btn'>
            <i className='md-icons'>link</i>
          </a>
          <a className='btn' href={`/direct/${item.id}`}>
            <i className='md-icons'>expand_more</i>
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { query, items } = this.state
    return (
      <Layout>
        <div className='card'>
          <div>
            <a className='btn'>
              <i className='md-icons'>arrow_back</i>
            </a>
            <a className='btn' target='_blank'
              href={`/event/create?parent=${query.eventId || 'nil'}`}>
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
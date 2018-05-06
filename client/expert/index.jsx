import React, {Component} from 'react'
import 'whatwg-fetch'
import Layout from '../component/frame/Layout'
import { joinQuery } from '../component/script/url'
import ModalEventEdit from './component/ModalEventEdit'
import ModalEventView from './component/ModalEventView'

export default class extends Component {
  constructor(props) {
    super(props)
    const state = window.epii.state
    this.state = {
      query: state.query,
      model: null,
      items: [
        // { id: 0, title: 'test1', status: 0 },
        // { id: 1, title: 'test2', status: 1 },
        // { id: 2, title: 'test3', status: 2 },
        // { id: 3, title: 'test4'.repeat(40), status: 3 },
        // { id: 4, title: 'test1', status: 0 },
        // { id: 5, title: 'test2', status: 1 },
        // { id: 6, title: 'test3', status: 2 },
        // { id: 7, title: 'test4'.repeat(40), status: 3 },
      ],
      modal: null
    }
  }

  componentDidMount() {
    // load current event
    // load all sub-events
    this.loadMainEvent()
    this.loadNextEvents()
  }

  loadMainEvent() {
    const { query } = this.state
    if (query.eventId == null) return
    return fetch(`/api/loadEvent?${joinQuery({ id: query.eventId })}`)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          return console.error(json.error)
        }
        this.setState({ model: json.model })
      })
  }

  loadNextEvents() {
    const { query } = this.state
    return fetch(`/api/loadEvents?${joinQuery({ 
      parent: query.eventId || '-1' 
    })}`)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          return console.error(json.error)
        }
        this.setState({ items: json.model })
      })
  }

  getEventIntent() {
    // todo - /event/:id/:action
    // view - edit - make
  }

  openModal(name, data) {
    this.setState({ modal: { name, data } })
  }

  closeModal(e) {
    this.setState({ modal: null })
    if (e && e.changed) {
      this.loadNextEvents()
    }
  }

  renderEventItem(item) {
    var status = ['done', 'halt', 'busy', 'idle'][item.status]
    return (
      <div className='event-item' key={item.id}>
        <div><a className={'badge area-stroke area-' + status}>{status}</a></div>
        <div className='event-name'><p>{item.title}</p></div>
        <div className='control'>
          <a className='btn' onClick={e => this.openModal('event-view', { model: item })}>
            <i className='md-icons'>info_outline</i>
          </a>
          <a className='btn'>
            <i className='md-icons'>link</i>
          </a>
          <a className='btn' href={`/events/${item.id}`}>
            <i className='md-icons'>open_in_new</i>
          </a>
        </div>
      </div>
    )
  }

  getProgress() {
    const { items, model } = this.state
    const total = items.length
    const count = items.reduce((prev, item) => {
      return prev + (item.status < 2 ? 1 : 0)
    }, 0)
    if (total > 0) return count / total * 100
    if (! model) return 0
    return model.status < 2 ? 100 : 0
  }

  navigateToPrev(e) {
    e.preventDefault()
    const { model } = this.state
    if (! model) return
    location.href = `/events/${model.parent < 0 ? '' : model.parent}`
  }

  render() {
    const { query, model, items, modal } = this.state
    return (
      <Layout>
        <div className='card'>
          <div>
            <a className='btn' onClick={e => this.navigateToPrev(e)}>
              <i className='md-icons'>arrow_back</i>
            </a>
            <a className='btn' onClick={e => this.openModal('event-edit', { model })}>
              <i className='md-icons'>add</i>
            </a>
          </div>
          <div className='event-stat'>
            <a className='badge area-idle'>
              { this.getProgress().toFixed(2) + '%' }
            </a>
          </div>
          <div className='group-view'>
            <input type='text' />
            <a className='btn'>Sort By</a>
          </div>
          <div className='event-name'>
            <p>{ model && model.title }</p>
          </div>
        </div>
        <div className='event-list'>
          { items.map(item => this.renderEventItem(item)) }
          { items.length === 0 && (
            <div className='no-data'>no data</div>
          ) }
        </div>
        { modal && modal.name === 'event-edit' && (
          <ModalEventEdit {...modal.data} onClose={e => this.closeModal(e)} />
        ) }
        { modal && modal.name === 'event-view' && (
          <ModalEventView {...modal.data} onClose={e => this.closeModal(e)} />
        ) }
      </Layout>
    )
  }
}
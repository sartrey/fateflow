import React, {Component} from 'react'
import 'whatwg-fetch'
import Layout from '../component/frame/Layout'
import ModalEventEdit from './component/ModalEventEdit'
import ModalEventView from './component/ModalEventView'
import { joinQuery, humanDuration } from '../component/script/utility'

export default class extends Component {
  constructor(props) {
    super(props)
    const state = window.epii.state
    this.state = {
      query: state.query,
      model: null,
      items: [],
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
    const expire = this.getEventExpire(item)
    var statusTheme = ['done', 'halt', 'busy', 'idle'][item.status]
    var expectTheme = ['halt', 'busy', 'done'][this.levelExpect(item.expect)]
    var expireTheme = ['halt', 'busy', 'done'][this.levelExpire(expire)]
    return (
      <div className='event-item' key={item.id}>
        <div className='event-status'>
          <a className={'badge area-' + statusTheme} />
        </div>
        <div className='event-title'><p>{item.title}</p></div>
        <div className='event-expect'>
          <a className={'badge area-stroke area-' + expectTheme}>
            { 'expect ' + humanDuration(item.expect) }
          </a>
        </div>
        <div className='event-expire'>
          <a className={'badge area-stroke area-' + expireTheme}>
            { (expire > 0 ? 'remain' : 'expire') + ' ' + humanDuration(expire) }
          </a>
        </div>
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

  levelExpect(expect) {
    let level = Math.floor(Math.log10(expect || 1)) - 1
    if (level < 0) level = 0
    return level
  }

  levelExpire(expire) {
    if (expire > 30) return 2
    if (expire > 0 && expire < 30) return 1
    return 0
  }

  getEventExpire(item) {
    return item.expect - Math.abs(new Date(item.created_at) - Date.now()) / 60000
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
        <div className='card event-head'>
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
          <div className='event-title'>
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
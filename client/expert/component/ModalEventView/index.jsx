import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'
import Modal from '../../../component/Modal'

export default class ModalEventView extends Component {
  constructor(props) {
    super(props)
  }

  saveEvent(force) {
    const { model } = this.props
    const input = Object.assign({
      id: model.id
    }, force)
    fetch('/api/pushEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        const { onClose } = this.props
        if (onClose) {
          onClose({ changed: true })
        }
      } else {
        console.error(json.error)
      }
    })
    .catch(error => {
      console.error(error.message)
    })
  }

  killEvent() {
    const { model } = this.props
    const input = { id: model.id }
    fetch('/api/killEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        const { onClose } = this.props
        if (onClose) {
          onClose({ changed: true })
        }
      } else {
        console.error(json.error)
      }
    })
    .catch(error => {
      console.error(error.message)
    })
  }

  render() {
    const { model, onClose } = this.props
    if (! model) return
    console.log(model)
    return (
      <Modal name='event-view' title='event' onClose={onClose}>
        <div className='card'>
          <p>id - { model.id }</p>
          <p>title - { model.title }</p>
          <p>content - { model.content }</p>
          <p>expect - { model.expect }</p>
          <p>elapse - { model.elapse }</p>
          <p>status - { model.status }</p>
          <p>created - { model.created_at }</p>
          <p>updated - { model.updated_at }</p>
          <p>deleted - { model.deleted_at }</p>
        </div>
        <div className='group-flag'>
          <a className='btn btn-large area-done' onClick={e => this.saveEvent()}>
            <i className='md-icons'>play_arrow</i>
            <span>push</span>
          </a>
          <a className='btn btn-large area-halt' onClick={e => this.saveEvent({ status: 1 })}>
            <i className='md-icons'>stop</i>
            <span>stop</span>
          </a>
          <a className='btn btn-large area-idle' onClick={e => this.saveEvent({ status: 3 })}>
            <i className='md-icons'>replay</i>
            <span>restart</span>
          </a>
          <a className='btn btn-large area-halt' onClick={e => this.killEvent()}>
            <i className='md-icons'>delete</i>
            <span>delete</span>
          </a>
        </div>
      </Modal>
    )
  }
}

ModalEventView.propTypes = {
  model: PropTypes.object,
  onClose: PropTypes.func
}

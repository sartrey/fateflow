import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'
import Modal from '../../../component/Modal'
import Field from '../../../component/Field'

export default class ModalEventEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: {}
    }
  }

  saveEvent() {
    const { model } = this.props
    const { input } = this.state
    input.parent = model.id
    fetch('/api/saveEvent', {
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

  changeInput(key, value) {
    const { input } = this.state
    input[key] = value
    this.setState({ input })
  }

  render() {
    const { model, onClose } = this.props
    return (
      <Modal name='event-edit' title='event' onClose={onClose}>
        <div className='card'>
          <p>parent event - {model ? model.title : '(nil)'}</p>
        </div>
        <div className='card'>
          <form>
            <Field theme='idle' label='title' 
              onChange={value => this.changeInput('title', value)} />
            <Field theme='idle' label='content'
              onChange={value => this.changeInput('content', value)} />
            <Field theme='idle' label='expect'
              onChange={value => this.changeInput('expect', value)} />
          </form>
        </div>
        <a className='btn btn-large area-done' onClick={e => this.saveEvent()}>
          <i className='md-icons'>done</i>
          <span>save event</span>
        </a>
      </Modal>
    )
  }
}

ModalEventEdit.propTypes = {
  model: PropTypes.object,
  onClose: PropTypes.func
}

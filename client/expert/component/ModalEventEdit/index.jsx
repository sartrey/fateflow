import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'
import Modal from '../../../component/Modal'
import Field from '../../../component/Field'
import { parseDuration } from '../../../component/script/utility'

export default class ModalEventEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: {}
    }
  }

  saveEvent(input) {
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

  submitInput(e) {
    e.preventDefault()
    const { model } = this.props
    const input = Object.assign({}, this.state.input)
    input.parent = model ? model.id : '-1'
    const expect = parseDuration(input.expect)
    input.expect = Math.floor(Number(expect.as('minutes')) || 5)
    this.saveEvent(input)
  }

  changeInput(key, e) {
    const { input } = this.state
    input[key] = e.target.value
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
            <Field theme='idle' label='title'>
              <input onChange={e => this.changeInput('title', e)} />
            </Field>
            <Field theme='idle' label='content'>
              <textarea rows={3} onChange={e => this.changeInput('content', e)} />
            </Field>
            <Field theme='idle' label='expect'>
              <input onChange={e => this.changeInput('expect', e)} />
            </Field>
          </form>
        </div>
        <a className='btn btn-large area-done' onClick={e => this.submitInput(e)}>
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

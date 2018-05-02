import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  constructor() {
    super()
  }

  handleChange(e) {
    const { onChange } = this.props
    const value = e.target.value
    if (onChange) onChange(value)
  }

  render() {
    const { label, theme } = this.props
    return (
      <div className={`field field-${theme}`}>
        <label className='label-head'>{label}</label>
        <input onChange={e => this.handleChange(e)} />
        <label className='label-more'></label>
      </div>
    )
  }
}

Field.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.string
}

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  constructor() {
    super()
  }

  render() {
    const { label, theme } = this.props
    return (
      <div className={`field field-${theme}`}>
        <label className='label-head'>{label}</label>
        { this.props.children }
        <label className='label-more'></label>
      </div>
    )
  }
}

Field.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.string
}

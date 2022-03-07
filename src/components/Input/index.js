import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Input extends Component {
  render() {
    const {
      placeholder,
      labelText,
      type,
      name,
      id,
      testId,
      value,
      onChange,
    } = this.props;

    return (
      <label htmlFor={ id }>
        {labelText}
        <input
          type={ type }
          name={ name }
          id={ id }
          data-testid={ testId }
          value={ value }
          onChange={ onChange }
          placeholder={ placeholder }
        />
      </label>
    );
  }
}

Input.propTypes = {
  labelText: PropTypes.string,
  testId: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  labelText: '',
  testId: '',
};

export default Input;

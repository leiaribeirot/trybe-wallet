import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Select extends Component {
  render() {
    const { labelText, name, id, value, onChange, options } = this.props;

    return (
      <label htmlFor={ id }>
        {labelText}
        <select
          name={ name }
          id={ id }
          value={ value }
          onChange={ onChange }
          data-testid={ `${id}-input` }
        >
          {options.map((option, index) => (
            <option key={ index } value={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;

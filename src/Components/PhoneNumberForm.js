import React, { Component } from 'react';



// Function to normalize phone number input
const normalizeInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }
};

// Function to validate phone number input
const validateInput = (value) => {
  let error = '';

  if (!value) error = 'Phone number is required!';
  else if (value.length !== 14) error = 'Invalid phone number format. Example: (555) 555-5555';

  return error;
};

class PhoneNumberForm extends Component {
  constructor() {
    super();

    this.state = {
      phone: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const { value, selectionStart } = event.target;

    // Calculate the new caret position based on the changes in the input
    const caretPosition =
      selectionStart === 1 || selectionStart === 2
        ? selectionStart + 1
        : selectionStart;

    this.setState((prevState) => ({
      phone: normalizeInput(value, prevState.phone),
      error: '',
      caretPosition: caretPosition
    }));
  }

  handleReset() {
    this.setState({ phone: '', error: '' });
  }

  render() {
    const { phone, error } = this.state;
  
    return (
      <form className="form">
        <div className="input-container">
          <label className="label" htmlFor="phone">Phone:</label>
          <input
            className="input"
            type="text"
            id="phone"
            name="phone"
            placeholder="(xxx) xxx-xxxx"
            value={phone}
            onChange={this.handleChange}
          />
          {error && <p className="error">{error}</p>}
        </div>
        <div className="btn-container">
          <button className="btn danger" type="button" onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </form>
    );
  }
  
}



export default PhoneNumberForm;

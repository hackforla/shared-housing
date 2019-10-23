import React from 'react';
import {} from '@material-ui/core';

class PrototypeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      'pet-kind': '',
      children: '',
      age: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      'have-pets': havePets,
      'pet-kind': petKind,
      age,
      'have-children': haveChildren,
      children,
    } = this.state;

    return (
      <form style={{ padding: '20px' }} onSubmit={this.handleSubmit}>
        <label htmlFor="age">
          What is your age?
          <br />
          <input
            onChange={this.handleChange}
            id="age"
            name="age"
            value={age}
            type="number"
          />
        </label>

        <p>Do you have pets? </p>

        <label htmlFor="pets-yes">
          Yes
          <input
            onChange={this.handleChange}
            id="pets-yes"
            name="have-pets"
            type="radio"
            value="Yes"
          />
        </label>
        <br />

        <label htmlFor="pets-no">
          No
          <input
            onChange={this.handleChange}
            id="pets-no"
            name="have-pets"
            type="radio"
            value="No"
          />
        </label>
        <br />

        {havePets === 'Yes' && (
          <React.Fragment>
            <br />
            <label htmlFor="pet">
              What kind of pets?
              <br />
              <input
                id="pet"
                onChange={this.handleChange}
                value={petKind}
                name="pet-kind"
                type="text"
              />
            </label>
            <br />
          </React.Fragment>
        )}

        <p>Do you have children? </p>

        <label htmlFor="children-yes">
          Yes
          <input
            onChange={this.handleChange}
            id="children-yes"
            name="have-children"
            type="radio"
            value="Yes"
          />
        </label>
        <br />

        <label htmlFor="children-no">
          No
          <input
            onChange={this.handleChange}
            id="children-no"
            name="have-children"
            type="radio"
            value="No"
          />
        </label>
        <br />

        {haveChildren === 'Yes' && (
          <React.Fragment>
            <br />
            <label htmlFor="children">
              Number of children?
              <br />
              <input
                id="children"
                onChange={this.handleChange}
                value={children}
                name="children"
                type="number"
              />
            </label>
            <br />
          </React.Fragment>
        )}

        <p>Are you outgoing?</p>

        <label htmlFor="outgoing-yes">
          Yes
          <input
            onChange={this.handleChange}
            id="is-outgoing-yes"
            name="is-outgoing"
            type="radio"
            value="Yes"
          />
        </label>
        <br />

        <label htmlFor="is-outgoing-no">
          No
          <input
            onChange={this.handleChange}
            id="is-outgoing-no"
            name="is-outgoing"
            type="radio"
            value="No"
          />
        </label>
        <br />

        <p>Do you like music?</p>
        <label htmlFor="music-yes">
          Yes
          <input
            id="music-yes"
            onChange={this.handleChange}
            name="music"
            type="radio"
            value="Yes"
          />
        </label>
        <br />

        <label htmlFor="music-no">
          No
          <input
            id="music-no"
            onChange={this.handleChange}
            name="music"
            type="radio"
            value="no"
          />
        </label>
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default PrototypeForm;

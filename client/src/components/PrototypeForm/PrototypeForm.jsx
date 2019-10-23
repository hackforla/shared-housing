import React from 'react';
import {} from '@material-ui/core';

class PrototypeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      havePets: false,
      petKind: '',
      party: '',
      music: 'no',
      havechildren: '',
      children: '',
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
    const { havePets, petKind, age, havechildren, children } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Do you have pets? </p>

        <label htmlFor="petsYes">
          Yes
          <input
            onChange={this.handleChange}
            id="petsYes"
            name="havePets"
            type="radio"
            value="Yes"
          />
        </label>
        <br />

        <label htmlFor="petsNo">
          No
          <input
            onChange={this.handleChange}
            id="petsNo"
            name="havePets"
            type="radio"
            value="No"
          />
        </label>
        <br />

        {havePets === 'Yes' && (
          <label htmlFor="pet">
            What kind of pets?
            <input
              id="pet"
              onChange={this.handleChange}
              value={petKind}
              name="petKind"
              type="text"
            />
          </label>
        )}

        <br />

        <p>Do you like music?</p>
        <label htmlFor="musicYes">
          Yes
          <input
            id="musicYes"
            onChange={this.handleChange}
            name="music"
            type="radio"
            value="Yes"
          />
        </label>

        <label htmlFor="musicNo">
          No
          <input
            id="musicNo"
            onChange={this.handleChange}
            name="music"
            type="radio"
            value="no"
          />
        </label>
        <br />

        <label htmlFor="age">
          What is your age?
          <input
            onChange={this.handleChange}
            id="age"
            name="age"
            value={age}
            type="text"
          />
        </label>
        <br />

        <p>Do you have children? </p>

        <label htmlFor="childrenYes">
          Yes
          <input
            onChange={this.handleChange}
            id="childrenYes"
            name="havechildren"
            type="radio"
            value="Yes"
          />
        </label>
        <br />

        <label htmlFor="childrenNo">
          No
          <input
            onChange={this.handleChange}
            id="childrenNo"
            name="havechildren"
            type="radio"
            value="No"
          />
        </label>
        <br />

        {havechildren === 'Yes' && (
          <label htmlFor="children">
            Number of children?
            <input
              id="children"
              onChange={this.handleChange}
              value={children}
              name="children"
              type="text"
            />
            <br />
          </label>
        )}

        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default PrototypeForm;

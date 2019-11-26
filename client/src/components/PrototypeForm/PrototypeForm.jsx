import React from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import SectionContainer from '../common/SectionContainer';

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
      <SectionContainer>
        <Typography component="h1" variant="h4" align="center">
          Example Form
        </Typography>
        <form style={{ padding: '20px' }} onSubmit={this.handleSubmit}>
          {/* ========================== AGE =============================== */}
          <div>
            <TextField
              type="text"
              id="age"
              label="What is your age?"
              name="age"
              value={age}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </div>

          {/* ======================== PETS ================================ */}
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you have pets?</FormLabel>
              <RadioGroup
                aria-label="pets"
                name="have-pets"
                onChange={this.handleChange}
                row
              >
                <FormControlLabel value="Yes" label="Yes" control={<Radio />} />
                <FormControlLabel value="No" label="No" control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <br />

            {havePets === 'Yes' && (
              <TextField
                type="text"
                id="pet"
                label="What kind of pets?"
                name="pet-kind"
                value={petKind}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            )}
          </div>

          {/* ======================= CHILDREN ============================= */}
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Do you have any children?
              </FormLabel>
              <RadioGroup
                aria-label="children"
                name="have-children"
                onChange={this.handleChange}
                row
              >
                <FormControlLabel value="Yes" label="Yes" control={<Radio />} />
                <FormControlLabel value="No" label="No" control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <br />

            {haveChildren === 'Yes' && (
              <TextField
                type="text"
                id="children"
                label="How many children?"
                name="children"
                value={children}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            )}
          </div>

          {/* ======================== OUTGOING ============================ */}
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Are you outgoing?</FormLabel>
              <RadioGroup
                aria-label="outgoing"
                name="is-outgoing"
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="Yes"
                  label="Yes, I am outgoing."
                  control={<Radio />}
                />
                <FormControlLabel
                  value="No"
                  label="No, I prefer staying in."
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* ========================== MUSIC ============================= */}
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you like music?</FormLabel>
              <RadioGroup
                aria-label="music"
                name="music"
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="Yes"
                  label="Yes, I enjoy playing music out loud."
                  control={<Radio />}
                />
                <FormControlLabel
                  value="No"
                  label="No, I prefer a quieter environment."
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* ========================== BUTTON ============================ */}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </SectionContainer>
    );
  }
}

export default PrototypeForm;

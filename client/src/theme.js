import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

// This file is used to override material-ui's base styles'

//helper function to convert pixels to Rem as material uses rem to adjust to
// browser defaults

const pxToRem = value => `${value / 16}rem`;

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  useNextVariants: true,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 850,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {},
  typography: {},
  overrides: {
    MuiTypography: {
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},
      body1: {},
      body2: {},
      button: {},
      caption: {},
      overline: {}
    }
  }
});

export default theme;

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4A6572',
            main: '#344955',
            dark: '#232F34'
        },
        secondary: {
            main: '#F9AA33'
        }
    },
    status: {
        danger: 'orange',
    }
});

function Root() {
    return (
      <MuiThemeProvider theme={theme}>
        <App theme={theme}/>
      </MuiThemeProvider>
    );
  }

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

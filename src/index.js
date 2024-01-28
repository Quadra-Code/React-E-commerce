import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './redux/store'
import { Provider } from 'react-redux';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';



const root = ReactDOM.createRoot(document.getElementById('root'));
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
});

root.render(
    <React.StrictMode>
      <Provider store= {store}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
              <App/>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {createTheme, ThemeProvider} from '@mui/material/styles';
// import rtlPlugin from 'stylis-plugin-rtl';
// import {prefixer} from 'stylis';
// import {CacheProvider} from '@emotion/react';
// import createCache from '@emotion/cache';

// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });
// const theme = createTheme({
//   direction: 'rtl',
// });

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <CacheProvider value={cacheRtl}>
//     <ThemeProvider theme={theme}>
//       <App/>
//     </ThemeProvider>
//   </CacheProvider>
// );
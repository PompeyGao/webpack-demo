import React from 'react';
import ReactDom from 'react-dom';
// import 'babel-polyfill';
// import Home from 'containers/Home';
// import App from './App/app';

const MOUNT_NODE = document.getElementById('root');

// ReactDom.render(<Home />, MOUNT_NODE);

let render = () => {
    const NEXT = require('./App/app').default;
    ReactDom.render(<NEXT />, MOUNT_NODE);
};

if (module.hot) {
    module.hot.accept('./App/app', () => {
        console.log(
            '--------Accepting the updated containers/App module!-----'
        );
        setImmediate(() => {
            ReactDom.unmountComponentAtNode(MOUNT_NODE);
            render();
        });
    });
}
render();

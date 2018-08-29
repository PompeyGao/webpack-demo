import React from 'react';
import ReactDom from 'react-dom';
// import Page from 'containers/Page';

const MOUNT_NODE = document.getElementById('root');

let render = () => {
    const NEXT = require('./containers/Page.js').default;
    ReactDom.render(<NEXT />, MOUNT_NODE);
};

if (module.hot) {
    module.hot.accept('./containers/Page.js', () => {
        console.log(
            '--------Accepting the updated containers/Page module!-----'
        );
        setImmediate(() => {
            ReactDom.unmountComponentAtNode(MOUNT_NODE);
            render();
        });
    });
}
render();

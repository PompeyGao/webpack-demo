import React from 'react';
import ReactDom from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import 'babel-polyfill';
// import Home from 'containers/Home';
// import App from './App/app';

const MOUNT_NODE = document.getElementById('root');

// ReactDom.render(<Home />, MOUNT_NODE);

let render = () => {
    const NEXT = require('./App/app').default;
    ReactDom.render(
        <LocaleProvider locale={zhCN}>
            <NEXT />
        </LocaleProvider>,
        MOUNT_NODE
    );
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

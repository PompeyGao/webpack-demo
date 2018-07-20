import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import Header from '../layouts/Header';
import Home from 'containers/Home';
import Detail from 'containers/Detail';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        {Header()}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/detail" component={Detail} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combineReducers from './reducers.js';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// 将store和history进行关联，支持history对象，方便修改url
const history = createHistory();
const middleware = [thunkMiddleware, routerMiddleware(history)];

const store = createStore(
    combineReducers,
    composeEnhancers(applyMiddleware(...middleware))
);

/* if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextCombineReducers = require('./reducers').default;
        store.replaceReducer(nextCombineReducers);
    });
} */

export default store;

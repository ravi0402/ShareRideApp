import { applyMiddleware, createStore, compose } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk';

const configureStore = () => {
    const middleware = [
        thunk
    ];

    const initialState = {};

    const enhancers = [];
    if (typeof window.devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    return store;
}

export default configureStore;

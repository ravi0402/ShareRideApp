import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createReactClass from 'create-react-class';
import configureStore from './store/configureStore';
import Home from './pages/Home';

let store = configureStore();

const App = createReactClass({
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }
});

ReactDom.render(<App />, document.getElementById('react-root'));


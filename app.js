import React from "react";
import ReactDOM from "react-dom";
import List from './components/list.js';
import './app.scss';

function App() {
    return (
        <div className="app">
            <List />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

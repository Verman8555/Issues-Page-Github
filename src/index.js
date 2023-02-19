import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GitHubIssuesApp } from './Components/GitHubIssuesApp';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GitHubIssuesApp />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();

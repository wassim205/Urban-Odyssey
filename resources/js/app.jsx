import './bootstrap';
import './components/Home';


import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import Test from './components/TEST';

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<Home />);
}

const container2 = document.getElementById('root2');
if (container2) {
    const root2 = ReactDOM.createRoot(container2);
    root2.render(<Test />);
}
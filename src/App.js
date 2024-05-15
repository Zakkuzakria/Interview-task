// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './store';
import HomePage from './components/HomePage';
import PostDetailsPage from './components/PostDetailsPage';
import './App.css';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;

// HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

function HomePage() {
  const { state, dispatch, toggleTheme } = useStore();
  const { theme } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.body.classList.add(theme + '-mode');
    return () => {
      document.body.classList.remove(theme + '-mode');
    };
  }, [theme]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_POSTS', payload: data });
        setFilteredPosts(data);
      })
      .catch(error => dispatch({ type: 'SET_ERROR', payload: error.message }));
  }, [dispatch]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts(state.posts);
    } else {
      const filtered = state.posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [state.posts, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const paginate = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    } else if (direction === 'next') {
      setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredPosts.length / postsPerPage)));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container">
      <h1 className="title">Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={toggleTheme} className='read-more'>Toggle Theme</button>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      <div className="post-list">
        {currentPosts.map(post => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
        paginate={paginate}
      />
    </div>
  );
}

export default HomePage;

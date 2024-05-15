import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store';


function PostDetailsPage() {
  const { postId } = useParams();
  const { state, dispatch, toggleTheme } = useStore();
  const { post, user, comments, theme } = state;

  useEffect(() => {
    document.body.classList.add(theme + '-mode');
    return () => {
      document.body.classList.remove(theme + '-mode');
    };
  }, [theme]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_POST', payload: data }))
      .catch(error => console.log(error));

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_COMMENTS', payload: data }))
      .catch(error => console.log(error));

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
          .then(response => response.json())
          .then(userData => dispatch({ type: 'SET_USER', payload: userData }))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, [postId, dispatch]);

  return (
    <div className="container">
      <h1 className="title">Post Details Page</h1>
      <button onClick={toggleTheme} className='read-more'>Toggle Theme</button>
      <div className="post-details">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div className="user-details">
          <h3>User Details</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="comments">
          <h3>Comments</h3>
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.body}</p>
              <p>By: {comment.name}</p>
            </div>
          ))}
        </div>
        <Link to="/" className="go-back">Go Back</Link>
      </div>
    </div>
  );
}

export default PostDetailsPage;

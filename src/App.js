import React, { useEffect } from 'react';
import './style.css';
import { provideRedux } from './state/store';
import usePosts from './hooks/usePosts';

const App = () => {
  const { get, data: posts = [] } = usePosts();

  useEffect(() => {
    get();
  }, []);
  return (
    <div>
      {posts.map(({ id, ...post }) => (
        <div key={id}>
          <h2> {post.title} </h2>
          <p> {post.body} </p>
        </div>
      ))}
    </div>
  );
};

export default provideRedux(App);

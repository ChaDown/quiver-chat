import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Model } from './interfaces';
import '../styles/model.css';

const ModelPage = () => {
  const { urlString } = useParams();
  const [post, setPost] = useState<Model>();

  function decodeHtml(html: any) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/surfboard-model/${urlString}`)
      .then((result) => result.json())
      .then((data) => setPost(data[0]));
  }, [urlString]);

  if (!post) return null;

  return (
    <section className='model-info'>
      <img className='model-img' src={post.imgLink} alt='Alt' />
      <div className='divider-line'></div>
      <section className='model-description'>
        <h1>{post.title}</h1>
        <h2>{post.shaper}</h2>
        {decodeHtml(post.description).length < 300 ? (
          <p>{decodeHtml(post.description)}</p>
        ) : (
          <details>
            <summary>See board details</summary>
            <p>{decodeHtml(post.description)}</p>
          </details>
        )}
      </section>
    </section>
  );
};

export default ModelPage;

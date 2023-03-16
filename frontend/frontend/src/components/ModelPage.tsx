import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Model } from './interfaces';
import '../styles/model.css';
import ModelDetails from './ModelDetails';
import ModelComments from './ModelComments';

const ModelPage = () => {
  const { urlString } = useParams();
  const [post, setPost] = useState<Model>();

  useEffect(() => {
    fetch(
      `https://quiver-chat-api.onrender.com/api/surfboard-model/${urlString}`
    )
      .then((result) => result.json())
      .then((data) => setPost(data[0]));
  }, [urlString]);

  if (!post) return null;

  return (
    <div>
      <ModelDetails post={post} />
      <ModelComments post={post} />
    </div>
  );
};

export default ModelPage;

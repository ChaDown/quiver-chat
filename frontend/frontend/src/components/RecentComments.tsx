import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from './interfaces';

const RecentComments = () => {
  const [recentComments, setRecentComments] = useState<Comment[]>([]);

  function decodeHtml(html: any) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    fetch('https://quiver-chat-api.onrender.com/api/get-recent-comments')
      .then((res) => res.json())
      .then((data) => setRecentComments(data));
  }, []);

  if (recentComments.length === 0) return null;

  return (
    <div className='home-comments'>
      <h1>Recent Comments</h1>
      {recentComments.map((comment, index) => (
        <Link to={`/surfboard-model/${comment.postId.urlString}`}>
          <div className='comment-container home-comment-container'>
            <img
              className='comment-thumbnail'
              src={decodeHtml(comment.postId.imgLink)}
              alt={comment.postId.title}
            />
            <div>
              <div>
                <b>{`${comment.postId.shaper} - ${comment.postId.title}`}</b>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentComments;

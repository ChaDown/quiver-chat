import React, { useRef, useContext, useState } from 'react';
import { UserContext } from './Contexts';
import { FilteredComment } from './interfaces';

const PostComment = (props: {
  postId: string;
  setComment: (com: any) => void;
  comment: any;
  setNewCommentVisible: (b: boolean) => void;
}) => {
  const { user } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  async function onSubmitComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(
      'https://quiver-chat-api.onrender.com/api/comment',
      {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams({
          content: commentContent,
          postId: props.postId,
        }),
      }
    );

    if (response.ok) {
      const comment = await response.json();
      // Change comment state to trigger re-render of all comments including new comment
      props.setComment(comment);
      props.setNewCommentVisible(false);
      setCommentContent('');
      // Allow new comment to render then scroll to bottom
      setTimeout(() => scrollToBottom(), 100);
      return;
    } else console.log(response);
  }

  return (
    <section className='comment-container'>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <button
          className='x-btn'
          onClick={() => props.setNewCommentVisible(false)}
        >
          X
        </button>
      </div>
      <div style={{ margin: '5px 10px' }}>
        <b>{user?.username}</b>
      </div>
      <form className='post-comment-form' onSubmit={onSubmitComment}>
        <textarea
          className='comment-textarea'
          placeholder='Its a great board but ...'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button type='submit' className='form-btn submit-comment'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default PostComment;

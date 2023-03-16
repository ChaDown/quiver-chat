import { useContext, useEffect, useState } from 'react';
import CommentComponent from './Comment';
import PostComment from './PostComment';
import { UserContext, UserVisibleContext } from './Contexts';
import { FilteredComment, Model } from './interfaces';

const ModelComments = (props: { post: Model }) => {
  const [postComments, setPostComments] = useState<FilteredComment[]>([]);
  const [newCommentVisible, setNewCommentVisible] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { setUserVisible } = useContext(UserVisibleContext);
  // This comment will be used as a dependency in the useeffect function, so when a new comment is posted we can trigger a rerender of all the posts comments.
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(
      `https://quiver-chat-api.onrender.com/api/model/get-comments/${props.post._id}`
    )
      .then((res) => res.json())
      .then((data) => setPostComments(data));
  }, [props.post._id, comment]);

  return (
    <div className='post-comments-container'>
      <h1 className='comments-title'>Comments</h1>
      {!newCommentVisible ? (
        <div className='flex-container'>
          <button
            className='form-btn'
            onClick={() => setNewCommentVisible(true)}
          >
            Post New Comment
          </button>
        </div>
      ) : (
        ''
      )}

      {newCommentVisible && user ? (
        <PostComment
          postId={props.post._id}
          comment={comment}
          setComment={setComment}
          setNewCommentVisible={setNewCommentVisible}
        />
      ) : (
        ''
      )}
      {newCommentVisible && !user ? (
        <div className='flex-container'>
          <div>You must be logged in to post a comment</div>
          <button className='form-btn' onClick={() => setUserVisible(true)}>
            Log In / Sign Up
          </button>
        </div>
      ) : (
        ''
      )}
      {postComments.length > 0 ? (
        postComments.map((comment, index) => (
          <CommentComponent
            comment={comment}
            index={index}
            userSidebar={false}
          />
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No comments on this board yet</p>
      )}
    </div>
  );
};

export default ModelComments;

import { useContext, useEffect, useState } from 'react';
import { UserVisibleContext } from './Contexts';
import { FilteredComment } from './interfaces';
import { Link } from 'react-router-dom';
import CommentComponent from './Comment';

const UserRecentActivity = (props: {
  isActive: 'home' | 'account' | 'activity';
  setIsActive: (s: 'home' | 'account' | 'activity') => void;
}) => {
  const { setUserVisible } = useContext(UserVisibleContext);
  const [userComments, setUserComments] = useState<Array<FilteredComment>>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/user/get-user-comments', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUserComments(data);
      });
  }, []);

  return (
    <div
      className={
        props.isActive === 'activity'
          ? ' panel active-info'
          : 'panel info-hidden '
      }
    >
      <section className='user-comments-container'>
        <button
          className='edit-icon go-back-btn'
          onClick={() => {
            props.setIsActive('home');
          }}
        >
          Go Back
        </button>
        <h1 style={{ margin: '1rem', textAlign: 'center' }}>Comments</h1>
        {userComments.map((comment: FilteredComment, index) => (
          <Link
            className='comment-link'
            to={`/surfboard-model/${comment.urlString}`}
            onClick={() => setUserVisible(false)}
          >
            <CommentComponent
              comment={comment}
              index={index}
              userSidebar={true}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default UserRecentActivity;

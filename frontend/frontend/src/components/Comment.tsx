import { FilteredComment } from './interfaces';
import format from 'date-fns/format';

const CommentComponent = (props: {
  comment: FilteredComment;
  index?: number;
  userSidebar: boolean;
}) => {
  return (
    <div className='comment-container' key={`comment-${props.index}`}>
      <div className='comment-top-line'>
        <div>
          {props.userSidebar ? (
            `${props.comment.modelName}`
          ) : (
            <b>{props.comment.username}</b>
          )}
        </div>
        <div className='comment-date'>
          {format(new Date(props.comment.date), 'Pp')}
        </div>
      </div>
      <p className='comment-content'>{props.comment.comment}</p>
    </div>
  );
};

export default CommentComponent;

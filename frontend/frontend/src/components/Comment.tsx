import { FilteredComment } from './interfaces';
import format from 'date-fns/format';

const CommentComponent = (props: {
  comment: FilteredComment;
  index?: number;
  userSidebar: boolean;
}) => {
  console.log(props.comment);

  return (
    <div className='comment-container' key={`comment-${props.index}`}>
      <div>
        {props.userSidebar
          ? `${props.comment.shaper} - ${props.comment.modelName}`
          : props.comment.username}
      </div>
      <div className='comment-date'>
        {format(new Date(props.comment.date), 'Pp')}
      </div>
      <div>{props.comment.comment}</div>
    </div>
  );
};

export default CommentComponent;

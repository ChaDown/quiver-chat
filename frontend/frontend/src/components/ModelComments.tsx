import { useEffect, useState } from 'react';
import CommentComponent from './Comment';
import { FilteredComment, Model } from './interfaces';

const ModelComments = (props: { post: Model }) => {
  const [postComments, setPostComments] = useState<FilteredComment[]>([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/model/get-comments?postId=${props.post._id}`
    )
      .then((res) => res.json())
      .then((data) => setPostComments(data));
  }, [props.post._id]);

  return (
    <div>
      {postComments.map((comment, index) => (
        <CommentComponent comment={comment} index={index} userSidebar={false} />
      ))}
    </div>
  );
};

export default ModelComments;

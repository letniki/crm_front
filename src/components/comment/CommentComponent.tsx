import React, { FC } from 'react';
import { IComment } from '../../interfaces/comment/IComment';

interface IProps {
    comment: IComment;
}
const CommentComponent:FC<IProps> = ({comment}) => {
    return (
        <div>
            <li key={comment.id}>
                Author: {comment.author} Comment: {comment.body} Created at: {comment.createdAt}
            </li>
        </div>
    );
};

export default CommentComponent;
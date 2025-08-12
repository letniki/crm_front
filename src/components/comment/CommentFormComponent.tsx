import React, { FC } from 'react';
import {SubmitHandler, useForm } from 'react-hook-form';
import { IComment } from '../../interfaces/comment/IComment';
import { addComment } from '../../services/commentsService';

interface IProps {
    orderId: number;
    onCommentAdded: (comment: IComment) => void;
}
interface CommentForm {
    body: string
}
const CommentFormComponent:FC<IProps> = ({orderId, onCommentAdded}) => {
    const {register, handleSubmit, reset} = useForm<CommentForm>();
    const onSubmit: SubmitHandler<CommentForm> = async (data) => {
        const newComment = await addComment(orderId, data.body);
        if (newComment) {
            onCommentAdded(newComment);
            reset();
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
        <textarea
            {...register("body", {required: true})}
            placeholder="comment"
        />
            </div>
            <button type="submit">send</button>
        </form>
    );
};

export default CommentFormComponent;
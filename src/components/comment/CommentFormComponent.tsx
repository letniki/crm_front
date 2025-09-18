import React, { FC } from 'react';
import {SubmitHandler, useForm } from 'react-hook-form';
import { IComment } from '../../interfaces/comment/IComment';
import { addComment } from '../../services/commentsService';
import './CommentFormComponent.css';
import { Button } from 'react-bootstrap';

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
            <div className="commentBox">
        <textarea
            {...register("body", {required: true})}
            placeholder="comment"
            className="commentFormTextArea"
        />

            <Button type="submit" className="commentFormButton">send</Button></div>
        </form>
    );
};

export default CommentFormComponent;
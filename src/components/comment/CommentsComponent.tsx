import React, { FC, useEffect, useState } from 'react';
import PreloaderComponent from '../PreloaderComponent';
import CommentFormComponent from './CommentFormComponent';
import CommentComponent from './CommentComponent';
import { IOrder } from '../../interfaces/order/IOrder';
import { IComment } from '../../interfaces/comment/IComment';
import { getAllComments } from '../../services/commentsService';

interface IProps {
    order: IOrder;
}

const CommentsComponent:FC<IProps> = ({order}) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(false);
        getAllComments(order.id)
            .then((comments) => {
                setComments(comments);
                setIsLoaded(true);
            })
            .catch(() => setIsLoaded(true));
    }, [order.id]);

    const handleCommentAdded = (newComment: IComment) => {
        setComments([...comments, newComment]);
    };
    return (
        <>
            {isLoaded ? (
                <tr>
                    <td colSpan={5}>
                        <p>UTM: {order.utm || "null"}</p>
                        <p>Message: {order.msg || "null"}</p>
                    </td>
                    <td colSpan={9}>
                        {comments.length > 0 && (
                            <ul>
                                {comments.map((comment) => (
                                    <CommentComponent key={comment.id} comment={comment}/>
                                ))}
                            </ul>
                        )}
                        <CommentFormComponent orderId={order.id} onCommentAdded={handleCommentAdded}/>
                    </td>
                    <td colSpan={1}>
                        <button>Edit</button>
                    </td>
                </tr>) :( <tr><td colSpan={1}><PreloaderComponent/></td></tr>)
                    }
                </>
            );
};

export default CommentsComponent;
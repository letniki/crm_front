import React, { FC, useEffect, useState } from 'react';
import PreloaderComponent from '../PreloaderComponent';
import CommentFormComponent from './CommentFormComponent';
import CommentComponent from './CommentComponent';
import { IOrder } from '../../interfaces/order/IOrder';
import { IComment } from '../../interfaces/comment/IComment';
import { getAllComments } from '../../services/commentsService';
import OrderChangeModalComponent from '../order/OrderChangeModalComponent';

interface IProps {
    order: IOrder;
}

const CommentsComponent:FC<IProps> = ({order}) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
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
                            <ul className="list-group mb-3 m-2">
                                {comments.map((comment) => (
                                    <CommentComponent key={comment.id} comment={comment}/>
                                ))}
                            </ul>
                        )}
                        <CommentFormComponent orderId={order.id} onCommentAdded={handleCommentAdded}/>
                    </td>
                    <td colSpan={1}>
                        <button className="btn btn-success m-4 p-2" onClick={handleModalOpen}>edit</button>
                    </td>
                </tr>) : (<tr>
                <td colSpan={1}><PreloaderComponent/></td>
            </tr>)
            }
            {isModalOpen && (
                <div>
                    <OrderChangeModalComponent
                        order={order}
                        onClose={handleModalClose}
                        isOpen={isModalOpen}
                    />
                </div>
            )}
        </>
    );
};

export default CommentsComponent;
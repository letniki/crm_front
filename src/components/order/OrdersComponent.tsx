import React, {FC, useState} from 'react';
import {IOrder} from "../../interfaces/order/IOrder";
import OrderComponent from "./OrderComponent";
import TableHeaderComponent from './TableHeaderComponent';

interface IProps {
    orders: IOrder[];
    onSort: (column: string) => void;
}
const OrdersComponent: FC<IProps> = ({orders, onSort}) => {

    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const toggleExpand = (orderId: number) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };
    return (
        <>
            <table className="table table-bordered table-striped">
                <TableHeaderComponent onSort={onSort}/>
                <tbody>
                {
                    orders.map((order, index) => (
                        <OrderComponent key={index} order={order} isExpanded={expandedOrderId === order.id}
                                        onClick={() => toggleExpand(order.id)}/>))
                }
                </tbody>
            </table>
        </>
    );
};

export default OrdersComponent;
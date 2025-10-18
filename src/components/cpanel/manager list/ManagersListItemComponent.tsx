import React, { FC } from 'react';
import { IManager } from '../../../interfaces/manager/IManager';
import ActivateBanButtonsComponent from './ActivateBanButtonsComponent';
import OrderStatsItemComponent from '../order stats/OrderStatsItemComponent';
interface IProps {
    manager: IManager;
}
const ManagersListItemComponent: FC<IProps> = ({manager}) => {
    return (
        <div className="px-4 bg-success-subtle text-right justify-content-between m-4 p-2 d-flex">
            <div className="d-flex flex-column">
                <p className="m-1 fs-4">id:{manager.id}</p>
                <p className="m-1 fs-4">email:{manager.email}</p>
                <p className="m-1 fs-4">name:{manager.name}</p>
                <p className="m-1 fs-4">surname:{manager.surname}</p>
                <p className="m-1 fs-4">active:{manager.isActive ? "yes" : "no"}</p>
                <p className="m-1 fs-4">last login:{manager.lastLogin?.replace("T", " ") ?? "never"}</p>
                <p className="m-1 fs-4">total:{manager.stats?.length}</p>
            </div>
            <div>
                {manager.stats && manager.stats.length > 0 ? (
                    <ul className="text-sm mt-2">
                        {manager.stats.map((stat, index) => (
                            <OrderStatsItemComponent key={index} stat={stat}/>
                        ))}
                    </ul>
                ) : <p className="m-1 fs-4"> no stats yet </p>}
            </div>
            <ActivateBanButtonsComponent manager={manager}/>
        </div>
    );
};

export default ManagersListItemComponent;
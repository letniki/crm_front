import React, {FC, useEffect, useState } from 'react';
import { IStat } from '../interfaces/order/IStat';
import PreloaderComponent from '../components/PreloaderComponent';
import CPanelComponent from '../components/order/CPanelComponent';
import { getStats } from '../services/OrdersService';
import { IManager } from '../interfaces/manager/IManager';
import { getManagers } from '../services/managerService';

const CPanelPage: FC = () => {
    const [stats, setStats] = useState<IStat[]>([]);
    const [managers, setManagers] = useState<IManager[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect((): void => {
        setIsLoaded(false);
        getStats()
            .then((data) => {
                setStats(data);
                setIsLoaded(true);
            })
    }, []);

    useEffect((): void => {
        setIsLoaded(false);
        getManagers()
            .then((data) => {
                setManagers(data.data);
                setIsLoaded(true);
            })
    }, []);
    return (
        <div className="d-flex flex-column align-items-center justify-content-evenly p-4">
            {!isLoaded ? <PreloaderComponent/> : <CPanelComponent managers={managers} stats={stats}/>}
        </div>
    );
};

export default CPanelPage;
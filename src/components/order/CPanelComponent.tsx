import React, {FC, useState} from 'react';
import {IStat} from '../../interfaces/order/IStat';
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {IManager} from '../../interfaces/manager/IManager';

interface IProps {
    stats: IStat[];
    managers: IManager[];
}

const CPanelComponent: FC<IProps> = ({stats, managers}) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);


    return (
        <>
            <div className="d-flex flex-row align-items-center justify-content-evenly w-75">
                <div className="w-25">
                    <Button className="btn btn-success my-3 fs-4" onClick={() => setModalOpen(true)}>
                        Create manager
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CPanelComponent;
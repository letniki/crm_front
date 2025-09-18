import React, {FC, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {IOrder} from "../../interfaces/order/IOrder";
import {Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { editOrder } from "../../services/OrdersService";

interface IProps {
    onClose: () => void;
    order: IOrder;
    isOpen: boolean;
    groups: string[];
}

const OrderChangeModalComponent: FC<IProps> = ({onClose, order, isOpen, groups}) => {
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [updatedFields, setUpdatedFields] = useState<Partial<IOrder>>({});
    const { control, handleSubmit } = useForm({defaultValues: order});
    const navigate = useNavigate();

    const onSubmit = async () => {
        if (newGroupName.trim() || selectedGroup) {
            const groupName = newGroupName.trim()
                ? newGroupName.trim().toUpperCase()
                : selectedGroup;

            if (!groupName) {
                setError("Select group or create new one");
                return;
            }

            if (newGroupName.trim() && groups.includes(groupName)) {
                setError("This name exists, choose from options");
                return;
            }

            updatedFields.groupName = groupName;


        }









        await editOrder(order.id, {
            ...updatedFields,
            groupName: newGroupName,
            sum: updatedFields.sum ?? 0,
            alreadyPaid: updatedFields.alreadyPaid ?? 0,
            age: updatedFields.age ?? 0
        });

        onClose();
        navigate(0);
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                {order.name} {order.surname} - {order.groupName}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select
                        className="form-select"
                        value={selectedGroup}
                        onChange={(e) => {
                            setSelectedGroup(e.target.value);
                            setNewGroupName('');
                            setError('');
                            setUpdatedFields(prev => ({ ...prev, groupName: e.target.value || null }));
                        }}
                        disabled={!!newGroupName.trim()}>
                        {groups.map((name, i) => <option key={i} value={name}>{name}</option>)}
                    </select>

                    <input
                        type="text"
                        className="form-control mt-2"
                        value={newGroupName}
                        onChange={(e) => {
                            setNewGroupName(e.target.value);
                            setSelectedGroup('');
                            setError('');
                            setUpdatedFields(prev => ({ ...prev, groupName: e.target.value.trim() ? e.target.value.trim().toUpperCase() : null }));
                        }}
                        placeholder="new group name"
                        disabled={!!selectedGroup}
                    />

                    {error && <p className="text-danger mt-2">{error}</p>}

                    <div className="mb-3">
                        <label>Name</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="form-control"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, name: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Surname</label>
                        <Controller
                            name="surname"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="form-control"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, surname: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="form-control"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, email: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phone</label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="form-control"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, phone: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Age</label>
                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => {
                                        const value = e.target.value === "" ? null : Number(e.target.value);
                                        field.onChange(value);
                                        setUpdatedFields(prev => ({ ...prev, age: value }));
                                    }}
                                    value={field.value === null ? "" : field.value}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Status</label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="form-select"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, status: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                >
                                    <option value="New">New</option>
                                    <option value="In Work">In Work</option>
                                    <option value="Agreed">Agreed</option>
                                    <option value="Disagreed">Disagreed</option>
                                    <option value="Dubbing">Dubbing</option>
                                </select>
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Course</label>
                        <Controller
                            name="course"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="form-select"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, course: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                >
                                    <option value="FS">FS</option>
                                    <option value="QACX">QACX</option>
                                    <option value="JCX">JCX</option>
                                    <option value="JSCX">JSCX</option>
                                    <option value="FE">FE</option>
                                    <option value="PCX">PCX</option>
                                </select>
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Course Format</label>
                        <Controller
                            name="courseFormat"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="form-select"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, courseFormat: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                >
                                    <option value="static">static</option>
                                    <option value="online">online</option>
                                </select>
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Course Type</label>
                        <Controller
                            name="courseType"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="form-select"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUpdatedFields(prev => ({ ...prev, courseType: e.target.value || null }));
                                    }}
                                    value={field.value ?? ""}
                                >
                                    <option value="pro">pro</option>
                                    <option value="minimal">minimal</option>
                                    <option value="premium">premium</option>
                                    <option value="incubator">incubator</option>
                                    <option value="vip">vip</option>
                                </select>
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Sum</label>
                        <Controller
                            name="sum"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => {
                                        const value = e.target.value === "" ? null : Number(e.target.value);
                                        field.onChange(value);
                                        setUpdatedFields(prev => ({ ...prev, sum: value }));
                                    }}
                                    value={field.value === null ? "" : field.value}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Already Paid</label>
                        <Controller
                            name="alreadyPaid"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => {
                                        const value = e.target.value === "" ? null : Number(e.target.value);
                                        field.onChange(value);
                                        setUpdatedFields(prev => ({ ...prev, alreadyPaid: value }));
                                    }}
                                    value={field.value === null ? "" : field.value}
                                />
                            )}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        save
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default OrderChangeModalComponent;
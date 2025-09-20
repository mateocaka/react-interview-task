
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import { fetchJob } from '../../store/jobsSlice.js';
import { addItemToJobCategory, deleteItemFromJobCategory } from '../../store/jobsSlice.js';
import ServiceTable from '../../components/Service/ServiceTable.jsx';
import ServiceFormModal from '../../components/Service/ServiceFormModal.jsx';
import StatusBadge from '../../components/jobs/StatusBadge.jsx';

const JobDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const job = useSelector((state) => state.jobs.jobs.find(j => j.id === parseInt(id)));
    const [showModalForCategory, setShowModalForCategory] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);

    useEffect(() => {
        if (!job) {
            dispatch(fetchJob(id));
        }
    }, [id, dispatch, job]);

    if (!job) return <div className="p-4">Loading job...</div>;

    const handleSaveItem = (itemData) => {
        if (itemToEdit) {

            console.log('Update Service in job', itemData);
            setItemToEdit(null);
        } else {
            dispatch(addItemToJobCategory({ jobId: id, categoryName: showModalForCategory, item: itemData }));
        }
        setShowModalForCategory(null);
    };

    const handleDeleteItem = (categoryName, nr) => {
        dispatch(deleteItemFromJobCategory({ jobId: id, categoryName, nr }));
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-xl font-bold mb-2">{job.name}</h2>
            <p className="mb-4">Status: <StatusBadge status={job.status} /></p>
            <h3 className="text-lg font-bold mb-2">Services</h3>
            {job.categories.map((cat) => (
                <div key={cat.name} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold">{cat.name}</h4>
                        <button
                            onClick={() => setShowModalForCategory(cat.name)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Add Item
                        </button>
                    </div>
                    {cat.items.length === 0 ? (
                        <p className="text-gray-500">No items for this category.</p>
                    ) : (
                        <ServiceTable
                            items={cat.items}
                            onEdit={(item) => {
                                setItemToEdit(item);
                                setShowModalForCategory(cat.name);
                            }}
                            onDelete={(nr) => handleDeleteItem(cat.name, nr)}
                        />
                    )}
                </div>
            ))}
            {showModalForCategory && (
                <ServiceFormModal
                    onSave={handleSaveItem}
                    onCancel={() => {
                        setShowModalForCategory(null);
                        setItemToEdit(null);
                    }}
                    itemToEdit={itemToEdit}
                />
            )}
        </div>
    );
};

export default JobDetail;
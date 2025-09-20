import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react'

const JobTable = ({ jobs }) => {
    const navigate = useNavigate();
    const storeJobs = useSelector((state) => state.jobs.jobs);
    const jobsToDisplay = jobs || storeJobs;

    const handleViewInventory = (job) => {
        navigate('/inventory', {
            state: {
                jobName: job.name,
                jobId: job.id
            }
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed':
                return <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">Completed</span>;
            case 'On Road':
                return <span className="inline-block px-3 py-1 bg-yellow-400 text-white text-xs font-medium rounded-full">On Road</span>;
            case 'On Hold':
                return <span className="inline-block px-3 py-1 bg-red-700 text-white text-xs font-medium rounded-full">On Hold</span>;
            default:
                return <span className="inline-block px-3 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">{status}</span>;
        }
    };

    if (!jobsToDisplay || jobsToDisplay.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-500">Create your first job to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                            Jobsite Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {jobsToDisplay.map((job, index) => (
                        <tr key={job.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleViewInventory(job)}
                                    className="text-blue-600 hover:text-blue-800 text-left font-medium"
                                >
                                    {job.name}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                {getStatusBadge(job.status)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobTable;
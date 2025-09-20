import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs, addJob, updateJob } from '../../store/jobsSlice.js';
import SearchJob from '../../components/jobs/SearchJob.jsx';
import JobTable from '../../components/jobs/JobTable.jsx';
import JobFormModal from '../../components/jobs/JobFormModal.jsx';
import NavBar from "../../components/common/NavBar.jsx";
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { jobs, status, error } = useSelector(state => state.jobs);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchJobs());
        }
    }, [status, dispatch]);

    const handleSaveJob = (jobData) => {
        const action = jobToEdit
            ? updateJob({ ...jobToEdit, ...jobData })
            : addJob(jobData);

        dispatch(action);
        closeModal();
    };

    const handleCreateJob = () => {
        setJobToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditJob = (job) => {
        setJobToEdit(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setJobToEdit(null);
    };

    if (status === 'loading') {
        return <LoadingSpinner message="Loading jobs..." />;
    }

    if (status === 'failed') {
        return <ErrorMessage error={error} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <NavBar />

                <ActionBar
                    jobsCount={jobs?.length || 0}
                    onCreateJob={handleCreateJob}
                />

                <JobsContent
                    jobs={jobs}
                    onEditJob={handleEditJob}
                />

                {isModalOpen && (
                    <JobFormModal
                        onSave={handleSaveJob}
                        onCancel={closeModal}
                        jobToEdit={jobToEdit}
                        isEditMode={!!jobToEdit}
                    />
                )}
            </div>
        </div>
    );
};

const ActionBar = ({ jobsCount, onCreateJob }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
            All Jobs ({jobsCount})
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-grow sm:flex-grow-0">
                <SearchJob />
            </div>
            <CreateJobButton onClick={onCreateJob} />
        </div>
    </div>
);

const CreateJobButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center space-x-2"
        aria-label="Create new job"
    >
        <span>Create</span>
        <span>|</span>
        <span className="text-lg">+</span>
    </button>
);

const JobsContent = ({ jobs, onEditJob }) => {
    if (!jobs?.length) {
        return <EmptyJobsState />;
    }

    return <JobTable jobs={jobs} onEditJob={onEditJob} />;
};

const EmptyJobsState = () => (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-6xl mb-4" role="img" aria-label="Clipboard">📋</div>
        <p className="text-gray-600 text-lg">No jobs found</p>
        <p className="text-gray-400 text-sm">Create your first job to get started</p>
    </div>
);

export default Dashboard;
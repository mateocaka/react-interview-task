import React from 'react';
export const JobHeader = ({ job, jobStatus, jobError }) => (
    <header className="p-6 border-b border-gray-200">
        {jobStatus === 'loading' ? (
            <div className="text-gray-600">Loading job...</div>
        ) : job ? (
            <div>
                <div className="text-sm text-gray-500 mb-1">Job Name</div>
                <h2 className="text-lg font-semibold text-gray-900 truncate" title={job.name}>
                    {job.name}
                </h2>
            </div>
        ) : (
            <div className="text-red-600">
                Job Not Found
                {jobError && <p className="text-sm text-red-500">{jobError}</p>}
            </div>
        )}
    </header>
);
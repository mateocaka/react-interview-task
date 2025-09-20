import React from "react";

const StatusBadge = ({ status }) => {
    let colorClass;
    switch (status) {
        case 'Completed':
            colorClass = 'bg-green-500 text-white';
            break;
        case 'On Road':
            colorClass = 'bg-orange-500 text-white';
            break;
        case 'On Hold':
            colorClass = 'bg-red-500 text-white';
            break;
        default:
            colorClass = 'bg-gray-500 text-white';
    }
    return <span className={`px-3 py-1 rounded-full ${colorClass}`}>{status}</span>;
};

export default StatusBadge;
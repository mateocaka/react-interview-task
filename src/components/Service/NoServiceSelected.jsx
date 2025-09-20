import img from '../../assets/NoService.png';
import React from "react";

const NoServiceSelected = () => (
    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border border-gray-200">
        <div className="text-center">
            <img src={img} alt="No service selected" className="mx-auto mb-4 w-24 h-24" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Service Selected</h3>
            <p className="text-gray-500 text-sm">
                Please select a service on your left to proceed.
            </p>
        </div>
    </div>
);

export default NoServiceSelected;
import React from 'react';
import {useJobCounts} from '../../hooks/useJobCounts.js';

function NavBar() {
    const counts = useJobCounts();

    return (
        <div className="grid grid-cols-3 gap-0 mb-8">

            <div className="bg-yellow-400 p-6 text-white relative">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{counts.onRoad} On Road</p>
                    </div>
                </div>
            </div>


            <div className="bg-green-500 p-6 text-white relative">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{counts.completed} Completed</p>
                    </div>
                </div>
            </div>


            <div className="bg-red-500 p-6 text-white relative">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{counts.onHold} On Hold</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
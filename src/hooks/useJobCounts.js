
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useJobCounts = () => {
    const jobs = useSelector((state) => state.jobs.jobs || []);

    return useMemo(() => {
        if (!Array.isArray(jobs)) {
            console.warn('useJobCounts: jobs is not an array, returning default counts');
            return { onRoad: 0, completed: 0, onHold: 0, total: 0 };
        }

        return jobs.reduce(
            (acc, job) => {
                switch (job.status) {
                    case 'On Road':
                        acc.onRoad += 1;
                        break;
                    case 'Completed':
                        acc.completed += 1;
                        break;
                    case 'On Hold':
                        acc.onHold += 1;
                        break;
                    default:
                        console.warn(`useJobCounts: unknown status "${job.status}" for job`);
                }
                return acc;
            },
            { onRoad: 0, completed: 0, onHold: 0, total: jobs.length }
        );
    }, [jobs]);
};
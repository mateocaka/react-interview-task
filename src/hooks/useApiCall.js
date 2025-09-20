
import { useState, useEffect } from 'react';

const useApiCall = (fetchFunction, deps = [], maxRetries = 2) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            setStatus('loading');
            setError(null);
            try {
                const result = await fetchFunction({ signal: controller.signal });
                if (isMounted) {
                    setData(result);
                    setStatus('succeeded');
                    setRetryCount(0);
                }
            } catch (err) {
                if (isMounted && retryCount < maxRetries) {
                    setRetryCount((prev) => prev + 1);
                    setTimeout(fetchData, 1000 * (retryCount + 1));
                } else if (isMounted) {
                    setError(err.message || 'Failed to fetch data');
                    setStatus('failed');
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, deps);

    return { data, status, error, retryCount };
};

export default useApiCall;
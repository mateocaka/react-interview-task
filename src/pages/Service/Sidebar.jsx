import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React,{ useEffect } from "react";
import { fetchJob } from "../../store/jobsSlice.js";
import { setSelectedService } from "../../store/ServicesSlice.js";
import { CategoryButton } from "./CategoryButton.jsx";
import { ServiceCategories } from "./ServiceCategories.jsx";
import { JobHeader } from "./JobHeader.jsx";
import { GoBackButton } from "./GoBackButton.jsx";

const Sidebar = ({ onSelectService, selected }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { jobId: paramJobId } = useParams();
    const { state } = useLocation();
    const jobId = paramJobId || state?.jobId;
    const job = useSelector((state) =>
        state.jobs.jobs.find((j) => j.id === jobId)
    );
    const jobStatus = useSelector((state) => state.jobs.status);
    const jobError = useSelector((state) => state.jobs.error);
    const allJobs = useSelector((state) => state.jobs.jobs);

    useEffect(() => {
        if (jobId && !job && jobStatus !== "loading") {
            dispatch(fetchJob(jobId));
        }
    }, [jobId, job, jobStatus, dispatch]);

    useEffect(() => {
        if (!selected) {
            dispatch(setSelectedService(null));
        }
    }, [dispatch, selected]);

    const dynamicCategories = Array.from(
        new Set(
            allJobs.flatMap((job) =>
                job.categories?.map((cat) => cat.name) || []
            )
        )
    );

    const categories =
        job?.categories?.length > 0
            ? job.categories.map((cat) => cat.name)
            : dynamicCategories.length > 0
                ? dynamicCategories
                : [];

    const handleGoBack = () => navigate("/");

    const handleSelectService = (serviceName) => {
        dispatch(setSelectedService(serviceName));
        onSelectService(serviceName);
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
            <JobHeader job={job} jobStatus={jobStatus} jobError={jobError} />
            <ServiceCategories
                categories={categories}
                selected={selected}
                onSelectService={handleSelectService}
            />
            <GoBackButton onGoBack={handleGoBack} />
        </aside>
    );
};

export default Sidebar;
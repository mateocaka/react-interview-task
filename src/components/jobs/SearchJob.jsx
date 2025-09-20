import React,{ useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DEBOUNCE_DELAY = 300;
const MAX_SUGGESTIONS = 10;

const SearchJob = () => {
    const navigate = useNavigate();
    const jobs = useSelector(state => state.jobs.jobs);

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const debounceTimeoutRef = useRef(null);


    const debouncedSearch = useCallback((searchTerm) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            filterJobs(searchTerm);
        }, DEBOUNCE_DELAY);
    }, [jobs]);

    const filterJobs = useCallback((searchTerm) => {
        if (!searchTerm.trim()) {
            setSuggestions([]);
            setIsDropdownOpen(false);
            return;
        }

        const filtered = jobs
            .filter(job =>
                job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.id.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, MAX_SUGGESTIONS);

        setSuggestions(filtered);
        setIsDropdownOpen(true);
    }, [jobs]);

    const findMatchingJob = useCallback((searchTerm) => {
        return jobs.find(job =>
            job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [jobs]);

    const navigateToJob = useCallback((job) => {
        navigate(`/job/${job.id}`);
        resetSearch();
    }, [navigate]);

    const resetSearch = useCallback(() => {
        setQuery('');
        setSuggestions([]);
        setIsDropdownOpen(false);
    }, []);


    useEffect(() => {
        debouncedSearch(query);

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [query, debouncedSearch]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        const matchingJob = findMatchingJob(query);

        if (matchingJob) {
            navigateToJob(matchingJob);
        } else {
            alert('No job found matching your query.');
            resetSearch();
        }
    };

    const handleSuggestionClick = (job) => {
        navigateToJob(job);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="relative">
            <SearchForm
                query={query}
                onQueryChange={handleInputChange}
                onSubmit={handleSubmit}
                inputRef={inputRef}
            />

            {isDropdownOpen && suggestions.length > 0 && (
                <SuggestionsList
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                    dropdownRef={dropdownRef}
                />
            )}
        </div>
    );
};

const SearchForm = ({ query, onQueryChange, onSubmit, inputRef }) => (
    <form onSubmit={onSubmit} className="relative">
        <div className="relative">
            <SearchIcon />
            <SearchInput
                ref={inputRef}
                value={query}
                onChange={onQueryChange}
                placeholder="Search job by name or ID"
            />
        </div>
    </form>
);

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
        />
    </svg>
);

const SearchInput = ({ value, onChange, placeholder, ...props }, ref) => (
    <input
        {...props}
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        aria-label="Search for jobs"
        autoComplete="off"
    />
);

const SuggestionsList = ({ suggestions, onSuggestionClick, dropdownRef }) => (
    <ul
        ref={dropdownRef}
        className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:w-64"
        role="listbox"
        aria-label="Job suggestions"
    >
        {suggestions.map(job => (
            <SuggestionItem
                key={job.id}
                job={job}
                onClick={() => onSuggestionClick(job)}
            />
        ))}
    </ul>
);

const SuggestionItem = ({ job, onClick }) => (
    <li
        onClick={onClick}
        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 transition-colors"
        role="option"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
            }
        }}
    >
        <div className="font-medium">{job.name}</div>
        <div className="text-xs text-gray-500">ID: {job.id.slice(0, 8)}...</div>
    </li>
);

export default SearchJob;
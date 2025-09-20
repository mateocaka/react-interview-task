
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';



export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/jobSites');
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            return response.json();
        } catch {
            console.warn('Failed to connect to backend, using mock data');
            const mockJobs = [
                { id: '52281104-754c-4da5-8b07-06f9425c66e6', name: 'Sample Job Site 1', status: 'On Road', categories: [{ name: 'Sidewalk Shed', items: [] }, { name: 'Scaffold', items: [] }, { name: 'Shoring', items: [] }] },
                { id: uuidv4(), name: '1668 1st St Brooklyn, NY 1129, USA', status: 'Completed', categories: [{ name: 'Sidewalk Shed', items: [] }, { name: 'Scaffold', items: [] }] },
                { id: uuidv4(), name: '1776 1st St Brooklyn, NY 1129, USA', status: 'On Hold', categories: [{ name: 'Shoring', items: [] }] },
                { id: uuidv4(), name: '216 19th St Brooklyn, NY 1132, USA', status: 'On Road', categories: [{ name: 'Sidewalk Shed', items: [] }] },
                { id: uuidv4(), name: '1529 60th St New York, NY 1121, USA', status: 'On Road', categories: [] },
                { id: uuidv4(), name: '200 Leport St Queens, NY 1137, USA', status: 'On Road', categories: [] },
                { id: uuidv4(), name: '159-09 99th St Queens, NY 1141, USA', status: 'On Road', categories: [{ name: 'Scaffold', items: [] }] },
                { id: uuidv4(), name: '01-01 Shore Pkwy, Jamaica, NY 1141, USA', status: 'On Hold', categories: [] },
                { id: uuidv4(), name: '67-01 Lindbergh, Jamaica, NY 1143, USA', status: 'Completed', categories: [] },
                { id: uuidv4(), name: '279 21st St Brooklyn, NY 1120, USA', status: 'On Road', categories: [] },
                { id: uuidv4(), name: '456 19th St Brooklyn, NY 1124, USA', status: 'Completed', categories: [] },
                { id: uuidv4(), name: '620 23rd St Brooklyn, NY 1120, USA', status: 'On Road', categories: [] },
                { id: uuidv4(), name: '200 Leport Brooklyn, NY 1121, USA', status: 'On Road', categories: [] },
            ];
            return mockJobs;
        }
    }
);

export const fetchJob = createAsyncThunk(
    'jobs/fetchJob',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3001/jobSites/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch job');
            }
            return response.json();
        } catch {
            console.warn(`Failed to fetch job ${id}, using mock data`);
            return {
                id,
                name: `Mock Job at ${id.slice(0, 8)}`,
                status: 'On Road',
                categories: [
                    { name: 'Sidewalk Shed', items: [] },
                    { name: 'Scaffold', items: [] },
                    { name: 'Shoring', items: [] }
                ]
            };
        }
    }
);

export const addJob = createAsyncThunk(
    'jobs/addJob',
    async (newJob, { rejectWithValue }) => {
        const payload = {
            id: uuidv4(),
            ...newJob,
            categories: newJob.categories
                ? newJob.categories.map(name => ({ name, items: [] }))
                : [],
        };

        try {
            const response = await fetch('http://localhost:3001/jobSites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Failed to add job');
            return response.json();
        } catch {
            console.warn('Failed to add job, using mock data');
            return payload;
        }
    }
);

export const updateJob = createAsyncThunk(
    'jobs/updateJob',
    async (updatedJob, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3001/jobSites/${updatedJob.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedJob),
            });
            if (!response.ok) throw new Error('Failed to update job');
            return response.json();
        } catch {
            console.warn(`Failed to update job ${updatedJob.id}, using mock data`);
            return updatedJob;
        }
    }
);

export const addItemToJobCategory = createAsyncThunk(
    'jobs/addItemToJobCategory',
    async ({ jobId, categoryName, item }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3001/jobSites/${jobId}`);
            if (!response.ok) throw new Error('Failed to fetch job');
            const job = await response.json();
            const cat = job.categories.find(c => c.name === categoryName);
            if (!cat) throw new Error('Category not found');
            cat.items.push({ nr: cat.items.length + 1, ...item });
            const patchResponse = await fetch(`http://localhost:3001/jobSites/${jobId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: job.categories }),
            });
            if (!patchResponse.ok) throw new Error('Failed to update job');
            return await patchResponse.json();
        } catch {
            console.warn(`Failed to add item to job ${jobId}, using mock data`);
            return {
                id: jobId,
                categories: [
                    {
                        name: categoryName,
                        items: [{ nr: Date.now(), ...item }]
                    }
                ]
            };
        }
    }
);

export const deleteItemFromJobCategory = createAsyncThunk(
    'jobs/deleteItemFromJobCategory',
    async ({ jobId, categoryName, nr }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3001/jobSites/${jobId}`);
            if (!response.ok) throw new Error('Failed to fetch job');
            const job = await response.json();
            const cat = job.categories.find(c => c.name === categoryName);
            if (!cat) throw new Error('Category not found');
            cat.items = cat.items.filter(i => i.nr !== nr).map((i, idx) => ({ ...i, nr: idx + 1 }));
            const patchResponse = await fetch(`http://localhost:3001/jobSites/${jobId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: job.categories }),
            });
            if (!patchResponse.ok) throw new Error('Failed to update job');
            return await patchResponse.json();
        } catch {
            console.warn(`Failed to delete item from job ${jobId}, using mock data`);
            return { id: jobId };
        }
    }
);

const initialState = {
    jobs: [],
    status: 'idle',
    error: null,
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'succeeded'; // Mock data allows success
                state.error = action.error.message || 'Failed to fetch jobs';
            })
            .addCase(fetchJob.fulfilled, (state, action) => {
                const index = state.jobs.findIndex(j => j.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                } else {
                    state.jobs.push(action.payload);
                }
                state.error = null;
            })
            .addCase(fetchJob.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch job';
            })
            .addCase(addJob.fulfilled, (state, action) => {
                state.jobs.push(action.payload);
                state.error = null;
            })
            .addCase(addJob.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add job';
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                const index = state.jobs.findIndex(j => j.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update job';
            })
            .addCase(addItemToJobCategory.fulfilled, (state, action) => {
                const index = state.jobs.findIndex(j => j.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index].categories = action.payload.categories;
                }
                state.error = null;
            })
            .addCase(addItemToJobCategory.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add Service to job category';
            })
            .addCase(deleteItemFromJobCategory.fulfilled, (state, action) => {
                const index = state.jobs.findIndex(j => j.id === action.payload.id);
                if (index !== -1 && action.payload.categories) {
                    state.jobs[index].categories = action.payload.categories;
                }
                state.error = null;
            })
            .addCase(deleteItemFromJobCategory.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete Service from job category';
            });
    },
});

export const { clearError } = jobsSlice.actions;
export default jobsSlice.reducer;

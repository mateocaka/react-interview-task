

import '@testing-library/jest-dom';


global.fetch = jest.fn();


global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));


global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));


Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});


Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
});


const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {

    jest.clearAllMocks();


    fetch.mockClear();


    console.warn = jest.fn((message) => {

        if (message.includes('React Router Future Flag Warning')) {
            return;
        }
        originalConsoleWarn(message);
    });

    console.error = jest.fn((message) => {

        if (typeof message === 'string' && (
            message.includes('jobs.reduce is not a function') ||
            message.includes('Warning: ReactDOM.render is deprecated')
        )) {
            return;
        }
        originalConsoleError(message);
    });
});

afterEach(() => {

    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;


    jest.clearAllTimers();
});


jest.setTimeout(10000);


process.env.NODE_ENV = 'test';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/job/Dashboard.jsx';
import Service from './pages/Service/Service.jsx';
import JobDetail from './pages/job/JobDetail.jsx';
import NavBar from "./components/common/NavBar.jsx";

function App() {
    return (
        <Router>
            <div className="App min-h-screen bg-gray-100">

                <main className="container mx-auto">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/inventory" element={<Service />} />
                        <Route path="/job/:id" element={<Service />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
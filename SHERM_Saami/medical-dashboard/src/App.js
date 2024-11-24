import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import AnalysisDisplay from './components/AnalysisDisplay';

const App = () => {
    const [analysis, setAnalysis] = useState(null);

    const handleAnalysisComplete = (data) => {
        setAnalysis(data);
        // Save analysis locally (e.g., in localStorage)
        localStorage.setItem('medicalAnalysis', JSON.stringify(data));
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <header
                style={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    padding: '10px 0',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h1>Medical Dashboard</h1>
            </header>
            <FileUploader onAnalysisComplete={handleAnalysisComplete} />
            <AnalysisDisplay analysis={analysis} />
            <footer
                style={{
                    backgroundColor: '#f8f9fa',
                    color: '#212529',
                    textAlign: 'center',
                    padding: '10px 0',
                    marginTop: '20px',
                }}
            >
                © 2024 Medical Diagnosis App. All rights reserved.
            </footer>
        </div>
    );
};

export default App;

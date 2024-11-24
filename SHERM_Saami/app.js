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
        <div>
            <h1>Medical Dashboard</h1>
            <FileUploader onAnalysisComplete={handleAnalysisComplete} />
            <AnalysisDisplay analysis={analysis} />
        </div>
    );
};

export default App;

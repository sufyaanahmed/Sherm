import React from 'react';

const AnalysisDisplay = ({ analysis }) => {
    if (!analysis) {
        return <p>No analysis available yet.</p>;
    }

    // Parse and format the analysis content into sections, headings, and lists
    const formatAnalysis = (text) => {
        const lines = text.split(/<br>|\\n|\\r/); // Split into lines by HTML breaks or newline characters

        return lines.map((line, index) => {
            const trimmedLine = line.trim();

            // Render headings for **bold** sections
            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                return (
                    <h3 key={`section-${index}`} style={{ marginTop: '20px', textDecoration: 'underline' }}>
                        {trimmedLine.replace(/\*\*/g, '')}
                    </h3>
                );
            }

            // Render list items for *italic* lines
            if (trimmedLine.startsWith('*')) {
                return (
                    <ul key={`item-${index}`} style={{ marginLeft: '20px' }}>
                        <li>{trimmedLine.replace(/\*/g, '').trim()}</li>
                    </ul>
                );
            }

            // Render plain paragraphs for other lines
            return (
                <p key={`text-${index}`} style={{ marginBottom: '10px' }}>
                    {trimmedLine}
                </p>
            );
        });
    };

    return (
        <div style={{ margin: '20px', lineHeight: '1.8' }}>
            <h2>Analysis Result</h2>
            <div>{formatAnalysis(analysis)}</div>
        </div>
    );
};

export default AnalysisDisplay;

import React, { useState } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.js`;

const FileUploader = ({ onAnalysisComplete }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const extractTextFromPDF = async (file) => {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onload = async () => {
                try {
                    const typedArray = new Uint8Array(fileReader.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;

                    let text = '';
                    for (let i = 0; i < pdf.numPages; i++) {
                        const page = await pdf.getPage(i + 1);
                        const content = await page.getTextContent();
                        text += content.items.map((item) => item.str).join(' ');
                    }

                    resolve(text);
                } catch (err) {
                    reject(err);
                }
            };

            fileReader.onerror = (err) => reject(err);

            fileReader.readAsArrayBuffer(file);
        });
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please upload a PDF file.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const text = await extractTextFromPDF(file);
            console.log('Extracted text from PDF:', text);

            const response = await axios.post('http://localhost:5000/api/analyze', { text });
            console.log('Response from backend:', response.data);

            onAnalysisComplete(response.data.analysis); // Send data to parent
        } catch (err) {
            console.error('Error during upload or analysis:', err);
            setError('Failed to analyze the document. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage:
                    'url(https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZyaG9zcGl0YWxfY29ycmlkb3Jfb3BlcmF0aW5nX3Jvb20taW1hZ2Uta3liZGduaGsuanBn.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                Medical Diagnosis Uploader
            </h1>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{
                    padding: '10px',
                    margin: '20px 0',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            />
            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    backgroundColor: loading ? '#888' : '#007BFF',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                }}
            >
                {loading ? 'Uploading...' : 'Upload and Analyze'}
            </button>

            {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
        </div>
    );
};

export default FileUploader;

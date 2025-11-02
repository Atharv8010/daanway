// import React, { useState, useRef } from 'react';
// import { scanMedicineLabel } from '../../services/ocrService';
// import './OCRScanner.css';

// const OCRScanner = ({ onClose, onResult }) => {
//   const [scanning, setScanning] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [preview, setPreview] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       setError('Please select a valid image file');
//       return;
//     }

//     // Show preview
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreview(e.target.result);
//     };
//     reader.readAsDataURL(file);

//     // Scan the image
//     setScanning(true);
//     setError('');
//     setResult(null);
//     setProgress(0);

//     // Simulate progress
//     const progressInterval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 90) {
//           clearInterval(progressInterval);
//           return 90;
//         }
//         return prev + 10;
//       });
//     }, 200);

//     try {
//       const scanResult = await scanMedicineLabel(file);
//       clearInterval(progressInterval);
//       setProgress(100);
      
//       if (scanResult.success) {
//         setResult(scanResult);
        
//         if (!scanResult.batchNumber && !scanResult.expiryDate) {
//           setError('Could not extract medicine information. Please ensure the image is clear and well-lit, or enter details manually.');
//         } else if (!scanResult.batchNumber) {
//           setError('Batch number not detected. You can enter it manually.');
//         } else if (!scanResult.expiryDate) {
//           setError('Expiry date not detected. You can enter it manually.');
//         }
//       } else {
//         setError(scanResult.error || 'Failed to scan image. Please try again with a clearer photo.');
//       }
//     } catch (err) {
//       console.error('Scan error:', err);
//       setError('Error scanning image. Please try again.');
//     } finally {
//       clearInterval(progressInterval);
//       setScanning(false);
//     }
//   };

//   const handleUseResult = () => {
//     if (result) {
//       onResult(result);
//     }
//   };

//   const handleRetake = () => {
//     setPreview(null);
//     setResult(null);
//     setError('');
//     setProgress(0);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="ocr-modal-overlay" onClick={onClose}>
//       <div className="ocr-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="ocr-modal-header">
//           <h3>📸 Scan Medicine Label</h3>
//           <button className="modal-close-btn" onClick={onClose}>✕</button>
//         </div>

//         <div className="ocr-modal-body">
//           {!preview ? (
//             <div className="ocr-upload-area">
//               <div className="upload-animation">
//                 <div className="upload-icon-wrapper">
//                   <span className="upload-icon">📷</span>
//                   <div className="scan-line"></div>
//                 </div>
//               </div>
              
//               <h4>Upload Medicine Label Image</h4>
//               <p>Take a clear photo of the medicine label showing batch number and expiry date</p>
              
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 style={{ display: 'none' }}
//               />
              
//               <button
//                 className="btn btn-primary btn-upload"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <span className="btn-icon">📷</span>
//                 Choose Image
//               </button>

//               <div className="ocr-tips">
//                 <h5>💡 Tips for best results:</h5>
//                 <ul>
//                   <li>
//                     <span className="tip-icon">💡</span>
//                     <span>Ensure good lighting without shadows</span>
//                   </li>
//                   <li>
//                     <span className="tip-icon">📏</span>
//                     <span>Keep the label flat and in focus</span>
//                   </li>
//                   <li>
//                     <span className="tip-icon">🎯</span>
//                     <span>Avoid glare and reflections</span>
//                   </li>
//                   <li>
//                     <span className="tip-icon">🔍</span>
//                     <span>Include batch number and expiry date clearly</span>
//                   </li>
//                   <li>
//                     <span className="tip-icon">📱</span>
//                     <span>Hold camera steady for sharp image</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="ocr-result-area">
//               <div className="image-preview">
//                 <img src={preview} alt="Medicine label" />
//                 {scanning && <div className="scanning-overlay"></div>}
//               </div>

//               {scanning && (
//                 <div className="scanning-indicator">
//                   <div className="scanner-animation">
//                     <div className="scanner-beam"></div>
//                     <div className="scanner-grid"></div>
//                   </div>
//                   <div className="progress-container">
//                     <div className="progress-bar-ocr">
//                       <div 
//                         className="progress-fill-ocr" 
//                         style={{ width: `${progress}%` }}
//                       >
//                         <span className="progress-text">{progress}%</span>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="scanning-text">
//                     <span className="scanning-dot"></span>
//                     Analyzing image...
//                   </p>
//                 </div>
//               )}

//               {error && !scanning && (
//                 <div className="error-message pulse-error">
//                   <span className="error-icon">⚠️</span>
//                   {error}
//                 </div>
//               )}

//               {result && !scanning && (
//                 <div className="scan-results">
//                   <h4>
//                     <span className="results-icon">✨</span>
//                     Scan Results
//                   </h4>
                  
//                   <div className="results-grid">
//                     <div className={`result-item ${result.batchNumber ? 'found' : 'not-found'}`}>
//                       <label>
//                         <span className="label-icon">🏷️</span>
//                         Batch Number:
//                       </label>
//                       <div className="result-value-container">
//                         <span className={result.batchNumber ? 'success' : 'not-found'}>
//                           {result.batchNumber || 'Not detected'}
//                         </span>
//                         {result.batchNumber && (
//                           <span className="check-icon">✓</span>
//                         )}
//                       </div>
//                     </div>

//                     <div className={`result-item ${result.expiryDate ? 'found' : 'not-found'}`}>
//                       <label>
//                         <span className="label-icon">📅</span>
//                         Expiry Date:
//                       </label>
//                       <div className="result-value-container">
//                         <span className={result.expiryDate ? 'success' : 'not-found'}>
//                           {result.expiryDate ? new Date(result.expiryDate).toLocaleDateString('en-IN', {
//                             day: 'numeric',
//                             month: 'long',
//                             year: 'numeric'
//                           }) : 'Not detected'}
//                         </span>
//                         {result.expiryDate && (
//                           <span className="check-icon">✓</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {result.isValid !== null && (
//                     <div className={`validity-status ${result.isValid ? 'valid' : 'invalid'}`}>
//                       <div className="validity-content">
//                         <span className="status-icon-large">
//                           {result.isValid ? '✓' : '✕'}
//                         </span>
//                         <div className="validity-text">
//                           <h5>{result.isValid ? 'Valid for Donation' : 'Expired'}</h5>
//                           <p>
//                             {result.isValid 
//                               ? 'This medicine is suitable for donation' 
//                               : 'This medicine has expired and cannot be donated'}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {result.rawText && (
//                     <details className="raw-text-details">
//                       <summary>
//                         <span className="summary-icon">📄</span>
//                         View extracted text
//                       </summary>
//                       <pre className="raw-text-content">{result.rawText}</pre>
//                     </details>
//                   )}
//                 </div>
//               )}

//               <div className="ocr-actions">
//                 <button className="btn btn-outline" onClick={handleRetake}>
//                   <span className="btn-icon">🔄</span>
//                   Retake Photo
//                 </button>
//                 {result && (result.batchNumber || result.expiryDate) && (
//                   <button className="btn btn-primary btn-use" onClick={handleUseResult}>
//                     <span className="btn-icon">✓</span>
//                     Use This Data
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OCRScanner;

import React, { useState, useRef } from 'react';
import { scanMedicineLabel } from '../../services/ocrService';
import './OCRScanner.css';

const OCRScanner = ({ onClose, onResult }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Scan the image
    setScanning(true);
    setError('');
    setResult(null);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const scanResult = await scanMedicineLabel(file);
      clearInterval(progressInterval);
      setProgress(100);
      
      if (scanResult.success) {
        setResult(scanResult);
        
        if (!scanResult.batchNumber && !scanResult.expiryDate) {
          setError('Could not extract medicine information automatically. Please review the extracted text below and enter details manually.');
        } else if (!scanResult.batchNumber) {
          setError('Batch number not detected. Please check the extracted text below or enter it manually.');
        } else if (!scanResult.expiryDate) {
          setError('Expiry date not detected. Please check the extracted text below or enter it manually.');
        }
      } else {
        setError(scanResult.error || 'Failed to scan image. Please try again with a clearer photo.');
        setResult(scanResult); // Still set result to show raw text if available
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('Error scanning image. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setScanning(false);
    }
  };

  const handleUseResult = () => {
    if (result) {
      onResult(result);
    }
  };

  const handleRetake = () => {
    setPreview(null);
    setResult(null);
    setError('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = () => {
    if (result?.rawText) {
      navigator.clipboard.writeText(result.rawText).then(() => {
        alert('Extracted text copied to clipboard!');
      });
    }
  };

  return (
    <div className="ocr-modal-overlay" onClick={onClose}>
      <div className="ocr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ocr-modal-header">
          <h3>📸 Scan Medicine Label</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="ocr-modal-body">
          {!preview ? (
            <div className="ocr-upload-area">
              <div className="upload-animation">
                <div className="upload-icon-wrapper">
                  <span className="upload-icon">📷</span>
                  <div className="scan-line"></div>
                </div>
              </div>
              
              <h4>Upload Medicine Label Image</h4>
              <p>Take a clear photo of the medicine label showing batch number and expiry date</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              <button
                className="btn btn-primary btn-upload"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="btn-icon">📷</span>
                Choose Image
              </button>

              <div className="ocr-tips">
                <h5>💡 Tips for best results:</h5>
                <ul>
                  <li>
                    <span className="tip-icon">💡</span>
                    <span>Ensure good lighting without shadows</span>
                  </li>
                  <li>
                    <span className="tip-icon">📏</span>
                    <span>Keep the label flat and in focus</span>
                  </li>
                  <li>
                    <span className="tip-icon">🎯</span>
                    <span>Avoid glare and reflections</span>
                  </li>
                  <li>
                    <span className="tip-icon">🔍</span>
                    <span>Include batch number and expiry date clearly</span>
                  </li>
                  <li>
                    <span className="tip-icon">📱</span>
                    <span>Hold camera steady for sharp image</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="ocr-result-area">
              <div className="image-preview">
                <img src={preview} alt="Medicine label" />
                {scanning && <div className="scanning-overlay"></div>}
              </div>

              {scanning && (
                <div className="scanning-indicator">
                  <div className="scanner-animation">
                    <div className="scanner-beam"></div>
                    <div className="scanner-grid"></div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar-ocr">
                      <div 
                        className="progress-fill-ocr" 
                        style={{ width: `${progress}%` }}
                      >
                        <span className="progress-text">{progress}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="scanning-text">
                    <span className="scanning-dot"></span>
                    Analyzing image...
                  </p>
                </div>
              )}

              {error && !scanning && (
                <div className="error-message pulse-error">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              {result && !scanning && (
                <div className="scan-results">
                  <h4>
                    <span className="results-icon">✨</span>
                    Scan Results
                  </h4>
                  
                  <div className="results-grid">
                    <div className={`result-item ${result.batchNumber ? 'found' : 'not-found'}`}>
                      <label>
                        <span className="label-icon">🏷️</span>
                        Batch Number:
                      </label>
                      <div className="result-value-container">
                        <span className={result.batchNumber ? 'success' : 'not-found'}>
                          {result.batchNumber || 'Not detected'}
                        </span>
                        {result.batchNumber && (
                          <span className="check-icon">✓</span>
                        )}
                      </div>
                    </div>

                    <div className={`result-item ${result.expiryDate ? 'found' : 'not-found'}`}>
                      <label>
                        <span className="label-icon">📅</span>
                        Expiry Date:
                      </label>
                      <div className="result-value-container">
                        <span className={result.expiryDate ? 'success' : 'not-found'}>
                          {result.expiryDate ? new Date(result.expiryDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : 'Not detected'}
                        </span>
                        {result.expiryDate && (
                          <span className="check-icon">✓</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {result.isValid !== null && (
                    <div className={`validity-status ${result.isValid ? 'valid' : 'invalid'}`}>
                      <div className="validity-content">
                        <span className="status-icon-large">
                          {result.isValid ? '✓' : '✕'}
                        </span>
                        <div className="validity-text">
                          <h5>{result.isValid ? 'Valid for Donation' : 'Expired'}</h5>
                          <p>
                            {result.isValid 
                              ? 'This medicine is suitable for donation' 
                              : 'This medicine has expired and cannot be donated'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Always show extracted text */}
                  {result.rawText && (
                    <div className="extracted-text-section">
                      <div className="extracted-text-header">
                        <h5>
                          <span className="text-icon">📄</span>
                          Extracted Text
                        </h5>
                        <button 
                          className="btn-copy-text"
                          onClick={copyToClipboard}
                          title="Copy to clipboard"
                        >
                          📋 Copy
                        </button>
                      </div>
                      <div className="extracted-text-content">
                        <textarea
                          ref={textAreaRef}
                          value={result.rawText}
                          readOnly
                          className="raw-text-area"
                          rows={8}
                        />
                      </div>
                      <p className="extraction-hint">
                        💡 You can copy this text to manually find batch number and expiry date
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="ocr-actions">
                <button className="btn btn-outline" onClick={handleRetake}>
                  <span className="btn-icon">🔄</span>
                  Retake Photo
                </button>
                {result && (result.batchNumber || result.expiryDate) && (
                  <button className="btn btn-primary btn-use" onClick={handleUseResult}>
                    <span className="btn-icon">✓</span>
                    Use This Data
                  </button>
                )}
                {result && !result.batchNumber && !result.expiryDate && result.rawText && (
                  <button className="btn btn-secondary" onClick={onClose}>
                    <span className="btn-icon">✏️</span>
                    Enter Manually
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OCRScanner;
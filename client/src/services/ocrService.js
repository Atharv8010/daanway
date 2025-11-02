// import Tesseract from 'tesseract.js';

// export const scanMedicineLabel = async (imageFile) => {
//   try {
//     const { data: { text } } = await Tesseract.recognize(imageFile, 'eng', {
//       logger: (m) => console.log(m)
//     });

//     console.log('Raw OCR Text:', text);

//     // Enhanced regex patterns for better detection
//     const batchPatterns = [
//       /(?:BATCH|Batch|batch|B\.?\s*NO\.?|B\.?\s*No\.?|LOT|Lot|lot)[:\s]*([A-Z0-9]+[\-\/]?[A-Z0-9]*)/i,
//       /\b(?:B\.?NO\.?|BATCH)[:\s]*([A-Z0-9\-\/]+)/i,
//       /(?:Batch|BATCH|batch)[\s:]+([A-Z0-9\-\/]+)/i,
//       /\b([A-Z]{2,3}[0-9]{4,8})\b/,  // Pattern like AB12345
//       /\bLOT[:\s]*([A-Z0-9\-\/]+)/i
//     ];

//     const expiryPatterns = [
//       /(?:EXP|EXPIRY|Expiry|USE\s*BY|Best\s*Before|BEST\s*BEFORE|Exp\.?\s*Date)[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i,
//       /(?:EXP|Exp)[:\s]*(\d{2}[\-\/]\d{2,4})/i,
//       /(?:MFG|Mfg)[:\s]*\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4}[\s]*(?:EXP|Exp)[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i,
//       /(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/g,
//       /(?:Valid\s*until|VALID\s*UNTIL)[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i
//     ];

//     // Try all batch patterns
//     let batchNumber = null;
//     for (const pattern of batchPatterns) {
//       const match = text.match(pattern);
//       if (match && match[1]) {
//         batchNumber = match[1].trim();
//         console.log('Batch Number Found:', batchNumber);
//         break;
//       }
//     }

//     // Try all expiry patterns
//     let expiryDateStr = null;
//     for (const pattern of expiryPatterns) {
//       const matches = text.match(pattern);
//       if (matches) {
//         // Get the last match (usually expiry is after mfg)
//         const potentialDates = matches.filter(m => /\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4}/.test(m));
//         if (potentialDates.length > 0) {
//           expiryDateStr = potentialDates[potentialDates.length - 1];
//           console.log('Expiry Date String Found:', expiryDateStr);
//           break;
//         }
//       }
//     }

//     let expiryDate = null;
//     let isValid = null;

//     if (expiryDateStr) {
//       expiryDate = parseExpiryDate(expiryDateStr);
//       if (expiryDate) {
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         isValid = expiryDate > today;
//         console.log('Parsed Expiry Date:', expiryDate, 'Is Valid:', isValid);
//       }
//     }

//     return {
//       success: true,
//       batchNumber,
//       expiryDate: expiryDate ? expiryDate.toISOString().split('T')[0] : null,
//       isValid,
//       rawText: text,
//       confidence: batchNumber || expiryDate ? 'high' : 'low'
//     };
//   } catch (error) {
//     console.error('OCR Error:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// const parseExpiryDate = (dateStr) => {
//   // Remove any spaces
//   dateStr = dateStr.trim();
  
//   console.log('Parsing date string:', dateStr);

//   // Try different date formats
//   const formats = [
//     // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
//     /^(\d{1,2})[\-\/.](\d{1,2})[\-\/.](\d{4})$/,
//     // DD/MM/YY or DD-MM-YY or DD.MM.YY
//     /^(\d{1,2})[\-\/.](\d{1,2})[\-\/.](\d{2})$/,
//     // MM/YYYY or MM-YYYY
//     /^(\d{1,2})[\-\/.](\d{4})$/,
//     // MM/YY or MM-YY
//     /^(\d{1,2})[\-\/.](\d{2})$/
//   ];

//   for (const format of formats) {
//     const match = dateStr.match(format);
//     if (match) {
//       let day, month, year;
      
//       if (match.length === 4) {
//         // DD/MM/YYYY or DD/MM/YY
//         day = parseInt(match[1]);
//         month = parseInt(match[2]) - 1;
//         year = match[3].length === 2 ? parseInt('20' + match[3]) : parseInt(match[3]);
//       } else if (match.length === 3) {
//         // MM/YYYY or MM/YY
//         day = 1; // Default to first day of month
//         month = parseInt(match[1]) - 1;
//         year = match[2].length === 2 ? parseInt('20' + match[2]) : parseInt(match[2]);
//       }

//       // Validate
//       if (month >= 0 && month <= 11 && day >= 1 && day <= 31 && year >= 2024 && year <= 2050) {
//         const date = new Date(year, month, day);
//         console.log('Successfully parsed date:', date);
//         return date;
//       }
//     }
//   }

//   console.log('Could not parse date');
//   return null;
// };

import Tesseract from 'tesseract.js';

export const scanMedicineLabel = async (imageFile) => {
  try {
    // Perform OCR with enhanced settings
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng', {
      logger: (m) => console.log(m),
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/-.:() ',
    });

    console.log('Raw OCR Text:', text);

    // Enhanced regex patterns for batch number detection
    const batchPatterns = [
      // Standard formats
      /(?:BATCH|Batch|batch)[:\s]*([A-Z0-9]+[\-\/]?[A-Z0-9]*)/i,
      /(?:B\.?\s*NO\.?|B\.?\s*No\.?|B\.?\s*NUMBER)[:\s]*([A-Z0-9\-\/]+)/i,
      /(?:LOT|Lot|lot)[:\s]*([A-Z0-9\-\/]+)/i,
      
      // Variations with spaces
      /B\s*NO[:\s.]*([A-Z0-9\-\/]+)/i,
      /B\s*NUMBER[:\s.]*([A-Z0-9\-\/]+)/i,
      /BATCH\s*NO[:\s.]*([A-Z0-9\-\/]+)/i,
      
      // Pattern matching (alphanumeric codes)
      /\b([A-Z]{1,3}[0-9]{4,10}[A-Z0-9]*)\b/,
      /\b([0-9]{2,4}[A-Z]{1,4}[0-9]{2,6})\b/,
      
      // Generic batch/lot patterns
      /(?:Batch|BATCH|batch|B\.?N\.?O\.?|LOT)[\s:]*([A-Z0-9\-\/]+)/i,
    ];

    // Enhanced regex patterns for expiry date detection
    const expiryPatterns = [
      // Full date formats with labels
      /(?:EXP|EXPIRY|Expiry|Exp\.?\s*Date|USE\s*BY|BEST\s*BEFORE)[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i,
      /(?:EXP|Exp\.?)[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i,
      
      // Month/Year formats
      /(?:EXP|EXPIRY|Expiry|Exp\.?\s*Date)[:\s]*(\d{1,2}[\-\/\.]\d{2,4})/i,
      
      // Date after MFG
      /(?:MFG|Mfg|MFD)[:\s]*\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4}[\s]*(?:EXP|Exp)[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i,
      
      // Valid until
      /(?:Valid\s*(?:until|till|upto)|VALID\s*(?:UNTIL|TILL|UPTO))[:\s]*(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})/i,
      
      // Standalone dates (less reliable, use as fallback)
      /(?:^|\s)(\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4})(?:\s|$)/,
    ];

    // Extract batch number
    let batchNumber = null;
    let batchConfidence = 0;
    
    for (let i = 0; i < batchPatterns.length; i++) {
      const pattern = batchPatterns[i];
      const match = text.match(pattern);
      if (match && match[1]) {
        const extracted = match[1].trim().replace(/\s+/g, '');
        // Validate batch number (should have both letters and numbers, 4-15 chars)
        if (extracted.length >= 3 && extracted.length <= 20) {
          batchNumber = extracted;
          batchConfidence = 100 - (i * 10); // Higher confidence for earlier patterns
          console.log(`Batch Number Found (Pattern ${i}):`, batchNumber, 'Confidence:', batchConfidence);
          break;
        }
      }
    }

    // Extract expiry date
    let expiryDateStr = null;
    let expiryConfidence = 0;
    
    for (let i = 0; i < expiryPatterns.length; i++) {
      const pattern = expiryPatterns[i];
      const match = text.match(pattern);
      if (match && match[1]) {
        expiryDateStr = match[1].trim();
        expiryConfidence = 100 - (i * 10);
        console.log(`Expiry Date String Found (Pattern ${i}):`, expiryDateStr, 'Confidence:', expiryConfidence);
        break;
      }
    }

    // Fallback: Look for any date-like patterns if no expiry found
    if (!expiryDateStr) {
      const allDates = text.match(/\d{1,2}[\-\/\.]\d{1,2}[\-\/\.]\d{2,4}/g);
      if (allDates && allDates.length > 0) {
        // Take the last date as it's often the expiry
        expiryDateStr = allDates[allDates.length - 1];
        expiryConfidence = 30;
        console.log('Fallback - Using last found date:', expiryDateStr);
      }
    }

    let expiryDate = null;
    let isValid = null;

    if (expiryDateStr) {
      expiryDate = parseExpiryDate(expiryDateStr);
      if (expiryDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        isValid = expiryDate > today;
        console.log('Parsed Expiry Date:', expiryDate.toISOString(), 'Is Valid:', isValid);
      }
    }

    return {
      success: true,
      batchNumber,
      expiryDate: expiryDate ? expiryDate.toISOString().split('T')[0] : null,
      isValid,
      rawText: text,
      confidence: {
        batch: batchConfidence,
        expiry: expiryConfidence,
        overall: batchNumber || expiryDate ? 'medium' : 'low'
      }
    };
  } catch (error) {
    console.error('OCR Error:', error);
    return {
      success: false,
      error: error.message,
      rawText: null
    };
  }
};

const parseExpiryDate = (dateStr) => {
  // Clean the date string
  dateStr = dateStr.trim().replace(/\s+/g, '');
  
  console.log('Parsing date string:', dateStr);

  // Try different date formats
  const formats = [
    // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
    { regex: /^(\d{1,2})[\-\/.](\d{1,2})[\-\/.](\d{4})$/, type: 'DMY4' },
    // DD/MM/YY or DD-MM-YY or DD.MM.YY
    { regex: /^(\d{1,2})[\-\/.](\d{1,2})[\-\/.](\d{2})$/, type: 'DMY2' },
    // MM/YYYY or MM-YYYY
    { regex: /^(\d{1,2})[\-\/.](\d{4})$/, type: 'MY4' },
    // MM/YY or MM-YY
    { regex: /^(\d{1,2})[\-\/.](\d{2})$/, type: 'MY2' },
    // YYYY/MM/DD (ISO-like)
    { regex: /^(\d{4})[\-\/.](\d{1,2})[\-\/.](\d{1,2})$/, type: 'YMD' },
  ];

  for (const format of formats) {
    const match = dateStr.match(format.regex);
    if (match) {
      let day, month, year;
      
      switch (format.type) {
        case 'DMY4':
          day = parseInt(match[1]);
          month = parseInt(match[2]) - 1;
          year = parseInt(match[3]);
          break;
        case 'DMY2':
          day = parseInt(match[1]);
          month = parseInt(match[2]) - 1;
          year = parseInt(match[3]);
          year = year < 50 ? 2000 + year : 1900 + year;
          break;
        case 'MY4':
          day = 1; // Last day of month for expiry
          month = parseInt(match[1]) - 1;
          year = parseInt(match[2]);
          day = new Date(year, month + 1, 0).getDate(); // Get last day of month
          break;
        case 'MY2':
          day = 1;
          month = parseInt(match[1]) - 1;
          year = parseInt(match[2]);
          year = year < 50 ? 2000 + year : 1900 + year;
          day = new Date(year, month + 1, 0).getDate(); // Get last day of month
          break;
        case 'YMD':
          year = parseInt(match[1]);
          month = parseInt(match[2]) - 1;
          day = parseInt(match[3]);
          break;
      }

      // Validate date components
      if (month >= 0 && month <= 11 && day >= 1 && day <= 31 && year >= 2020 && year <= 2099) {
        const date = new Date(year, month, day);
        // Verify the date is valid (handles invalid dates like Feb 31)
        if (date.getMonth() === month && date.getDate() === day) {
          console.log('Successfully parsed date:', date, 'from format:', format.type);
          return date;
        }
      }
    }
  }

  console.log('Could not parse date from string:', dateStr);
  return null;
};
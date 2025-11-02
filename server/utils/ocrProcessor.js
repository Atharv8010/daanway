import Tesseract from 'tesseract.js';

export const extractMedicineInfo = async (imageBase64) => {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imageBase64,
      'eng',
      {
        logger: m => console.log(m)
      }
    );

    const batchRegex = /(?:BATCH|Batch|B\.?NO\.?|LOT)[:\s]*([A-Z0-9]+)/i;
    const expiryRegex = /(?:EXP|EXPIRY|USE BY|BEST BEFORE)[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i;

    const batchMatch = text.match(batchRegex);
    const expiryMatch = text.match(expiryRegex);

    const batchNumber = batchMatch ? batchMatch[1] : null;
    const expiryDate = expiryMatch ? parseExpiryDate(expiryMatch[1]) : null;

    const isValid = expiryDate ? new Date(expiryDate) > new Date() : null;

    return {
      success: true,
      batchNumber,
      expiryDate,
      isValid,
      rawText: text
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

const parseExpiryDate = (dateStr) => {
  const parts = dateStr.split(/[\/\-]/);
  
  if (parts.length === 3) {
    let day, month, year;
    
    if (parts[2].length === 4) {
      day = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      year = parseInt(parts[2]);
    } else {
      day = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      year = parseInt(parts[2]) + 2000;
    }
    
    return new Date(year, month, day);
  }
  
  return null;
};
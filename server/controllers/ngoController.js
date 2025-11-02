import NGO from '../models/NGO.js';

export const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find({ verified: true }).sort({ rating: -1 });
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNearbyNGOs = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 50000 } = req.query;

    const ngos = await NGO.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNGOsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ngos = await NGO.find({ 
      categories: category,
      verified: true 
    });
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// import Donation from '../models/Donation.js';
// import User from '../models/User.js';
// import Reward from '../models/Reward.js';

// export const createDonation = async (req, res) => {
//   try {
//     const donation = await Donation.create({
//       ...req.body,
//       donor: req.user._id
//     });

//     res.status(201).json(donation);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getDonorDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find({ donor: req.user._id })
//       .populate('assignedNGO', 'name phone email')
//       .sort({ createdAt: -1 });
    
//     res.json(donations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getNGODonations = async (req, res) => {
//   try {
//     const { status } = req.query;
    
//     let query = {};
    
//     if (status) {
//       query.status = status;
//     } else {
//       query.status = { $in: ['pending', 'accepted', 'picked'] };
//     }

//     const donations = await Donation.find(query)
//       .populate('donor', 'name phone email address')
//       .sort({ createdAt: -1 });
    
//     res.json(donations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateDonationStatus = async (req, res) => {
//   try {
//     const { status, ngoId } = req.body;
//     const donation = await Donation.findById(req.params.id);

//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     donation.status = status;
    
//     if (status === 'accepted') {
//       donation.assignedNGO = ngoId || req.user._id;
//     }

//     await donation.save();

//     if (status === 'distributed') {
//       const donor = await User.findById(donation.donor);
//       donor.donationCount += 1;

//       if (donor.donationCount % 3 === 0) {
//         const rewards = [
//           {
//             type: 'coupon',
//             title: '20% Off at EcoStore',
//             description: 'Get 20% discount on sustainable products',
//             code: `ECO${Date.now()}`,
//             discount: 20,
//             partner: 'EcoStore',
//             validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//           },
//           {
//             type: 'coupon',
//             title: '₹200 Off at Green Grocers',
//             description: 'Save ₹200 on organic groceries',
//             code: `GRN${Date.now()}`,
//             discount: 200,
//             partner: 'Green Grocers',
//             validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//           },
//           {
//             type: 'certificate',
//             title: 'Community Hero Certificate',
//             description: 'Certificate of appreciation for 3 donations',
//             earnedFor: '3 successful donations'
//           }
//         ];

//         const selectedReward = rewards[Math.floor(Math.random() * rewards.length)];
        
//         const reward = await Reward.create({
//           user: donor._id,
//           ...selectedReward
//         });

//         donor.rewardsEarned.push(reward._id);
//       }

//       await donor.save();
//     }

//     res.json(donation);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const addImpactUpdate = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);

//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     donation.impactUpdates.push(req.body);
//     await donation.save();

//     res.json(donation);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getDonationById = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id)
//       .populate('donor', 'name phone email')
//       .populate('assignedNGO', 'name phone email');
    
//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     res.json(donation);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Donation from '../models/Donation.js';
import User from '../models/User.js';
import Reward from '../models/Reward.js';

export const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create({
      ...req.body,
      donor: req.user._id
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDonorDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate('assignedNGO', 'name phone email')
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNGODonations = async (req, res) => {
  try {
    const ngoId = req.user._id;
    const { status } = req.query;
    
    let query = {};
    
    if (status) {
      if (status === 'pending') {
        query.status = 'pending';
      } else {
        query.status = status;
        query.assignedNGO = ngoId;
      }
    } else {
      query.$or = [
        { status: 'pending' },
        { assignedNGO: ngoId, status: { $in: ['accepted', 'picked', 'distributed'] } }
      ];
    }

    const donations = await Donation.find(query)
      .populate('donor', 'name phone email address')
      .populate('assignedNGO', 'name phone email')
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDonationStatus = async (req, res) => {
  try {
    const { status, ngoId } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status !== 'pending' && donation.assignedNGO) {
      if (donation.assignedNGO.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          message: 'Unauthorized: You can only update donations assigned to your NGO' 
        });
      }
    }

    donation.status = status;
    
    if (status === 'accepted') {
      donation.assignedNGO = ngoId || req.user._id;
    }

    await donation.save();

    if (status === 'distributed') {
      const donor = await User.findById(donation.donor);
      donor.donationCount += 1;

      if (donor.donationCount % 3 === 0) {
        const rewards = [
          {
            type: 'coupon',
            title: '20% Off at EcoStore',
            description: 'Get 20% discount on sustainable products',
            code: `ECO${Date.now()}`,
            discount: 20,
            partner: 'EcoStore',
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          {
            type: 'coupon',
            title: '₹200 Off at Green Grocers',
            description: 'Save ₹200 on organic groceries',
            code: `GRN${Date.now()}`,
            discount: 200,
            partner: 'Green Grocers',
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          {
            type: 'certificate',
            title: 'Community Hero Certificate',
            description: 'Certificate of appreciation for 3 donations',
            earnedFor: '3 successful donations'
          }
        ];

        const selectedReward = rewards[Math.floor(Math.random() * rewards.length)];
        
        const reward = await Reward.create({
          user: donor._id,
          ...selectedReward
        });

        donor.rewardsEarned.push(reward._id);
      }

      await donor.save();
    }

    await donation.populate('donor', 'name phone email address');
    await donation.populate('assignedNGO', 'name phone email');

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addImpactUpdate = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.assignedNGO && donation.assignedNGO.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'Unauthorized: You can only update donations assigned to your NGO' 
      });
    }

    donation.impactUpdates.push(req.body);
    await donation.save();

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name phone email address')
      .populate('assignedNGO', 'name phone email');
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

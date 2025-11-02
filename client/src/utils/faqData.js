export const faqData = [
  {
    keywords: ['donate', 'donation', 'how to donate', 'give'],
    answer: 'You can donate through our platform by registering as a donor, selecting the category (food, clothes, books, toys, or medicine), filling in the details, and scheduling a pickup. NGOs will review and accept your donation.'
  },
  {
    keywords: ['categories', 'what can i donate', 'items', 'types'],
    answer: 'We accept donations in 5 categories: Food (packaged/fresh), Clothes (new/gently used), Books (educational/story books), Toys (clean and functional), and Medicine (with valid expiry dates).'
  },
  {
    keywords: ['medicine', 'expiry', 'batch', 'scan'],
    answer: 'For medicine donations, you can use our OCR scanner to scan the medicine label. It will automatically detect the batch number and expiry date, and verify if the medicine is suitable for donation.'
  },
  {
    keywords: ['pickup', 'collection', 'when', 'schedule'],
    answer: 'Once you submit a donation and an NGO accepts it, they will coordinate with you for pickup at your preferred date and time. You will be notified about the pickup schedule.'
  },
  {
    keywords: ['ngo', 'organizations', 'verify', 'trust'],
    answer: 'All NGOs on our platform are verified organizations registered in Nagpur. We ensure they have proper registration and credentials before listing them on DaanWay.'
  },
  {
    keywords: ['reward', 'coupon', 'certificate', 'benefits'],
    answer: 'After every 3 successful donations (accepted and distributed by NGOs), you earn rewards like discount coupons from partner stores, certificates of appreciation, or exclusive badges.'
  },
  {
    keywords: ['track', 'impact', 'status', 'where is my donation'],
    answer: 'You can track your donation impact through the Impact Tracker on your dashboard. NGOs update the status from pickup to distribution, showing where your donation went and how many people benefited.'
  },
  {
    keywords: ['register', 'signup', 'account', 'join'],
    answer: 'Click on "Register" in the top menu, choose your role (Donor or NGO), fill in your details including name, email, phone, and address, and create an account.'
  },
  {
    keywords: ['nearby', 'location', 'map', 'near me'],
    answer: 'Use the "Find NGOs" feature on the home page to view NGOs on a map. The system will show you nearby NGOs based on your location and their specialization.'
  },
  {
    keywords: ['help', 'support', 'contact', 'issue'],
    answer: 'If you need assistance, you can reach out through the Contact Us section or email us at support@daanway.com. We are here to help!'
  },
  {
    keywords: ['dashboard', 'profile', 'account settings'],
    answer: 'Your dashboard shows all your donations, rewards earned, and impact tracking. You can access it by logging in and clicking on "Dashboard" in the navigation menu.'
  },
  {
    keywords: ['food', 'fresh food', 'cooked food'],
    answer: 'We accept both packaged food items and fresh food. For fresh/cooked food, please ensure it is prepared hygienically and will be consumed within 24 hours of donation.'
  },
  {
    keywords: ['clothes', 'condition', 'used clothes'],
    answer: 'We accept new or gently used clothes that are clean, washed, and in good wearable condition. Please ensure no torn or heavily damaged items are donated.'
  },
  {
    keywords: ['books', 'textbooks', 'study material'],
    answer: 'We accept educational books, textbooks, story books, and reading material in good condition. Books should be clean with no missing pages.'
  },
  {
    keywords: ['tax', 'receipt', '80g', 'deduction'],
    answer: 'Many of our NGO partners provide 80G tax exemption certificates. Please check with the specific NGO accepting your donation for tax receipt eligibility.'
  }
];

export const searchFAQ = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) {
    return 'Hello! I am DaanWay assistant. Ask me anything about donations, rewards, NGOs, or how to use the platform.';
  }

  for (const faq of faqData) {
    for (const keyword of faq.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return faq.answer;
      }
    }
  }

  return 'I am not sure about that. Please try asking about donations, categories, NGOs, rewards, tracking, or registration. You can also contact our support team for detailed help.';
};
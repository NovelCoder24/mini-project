export const currentUser = {
  id: 'u1',
  name: 'novel sahu',
  email: 'novel@campus.edu',
  role: 'student', // student, staff
  avatar: ''
};

export const mockedItems = [
  {
    id: '1',
    title: 'Apple AirPods Pro',
    description: 'Found a pair of AirPods Pro in their charging case. There is a small scratch on the front.',
    category: 'Electronics',
    location: 'Library - 2nd Floor',
    date: '2026-04-05T14:30:00Z',
    status: 'Lost', // Lost, Found, Claimed
    type: 'found', // Is this a lost or found post? This means someone found it.
    image: 'https://images.unsplash.com/photo-1606220588913-b3a58e171ece?w=500&q=80',
    verificationQuestion: 'What is the serial number on the case or the custom engraving?',
    finderId: 'u2',
    finderName: 'Maria Garcia',
  },
  {
    id: '2',
    title: 'Blue Hydro Flask',
    description: 'Lost my blue 32oz Hydro Flask. It has several laptop stickers on it.',
    category: 'Bottles',
    location: 'Gymnasium',
    date: '2026-04-06T09:15:00Z',
    status: 'Lost',
    type: 'lost', 
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    verificationQuestion: '',
    finderId: 'u1', // Post by current user
    finderName: 'Alex Rivera',
  },
  {
    id: '3',
    title: 'Calculus Textbook',
    description: 'Found James Stewart Calculus 8th Edition book.',
    category: 'Books',
    location: 'Science Building',
    date: '2026-04-07T10:00:00Z',
    status: 'Found',
    type: 'found',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    verificationQuestion: 'Are there any specific notes written on the inside cover?',
    finderId: 'u3',
    finderName: 'David Kim',
  },
  {
    id: '4',
    title: 'Black Ray-Ban Sunglasses',
    description: 'Found near the quad fountain. Clubmaster style.',
    category: 'Accessories',
    location: 'Main Quad',
    date: '2026-04-06T16:45:00Z',
    status: 'Claimed',
    type: 'found',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    verificationQuestion: 'What color is the carrying case?',
    finderId: 'u4',
    finderName: 'Sarah Jenkins',
  }
];

export const mockedClaims = [
  {
    id: 'c1',
    itemId: '4',
    claimerId: 'u1', // Claimed by me
    claimerName: 'Alex Rivera',
    status: 'approved', // pending, approved, rejected
    date: '2026-04-06T18:00:00Z'
  },
  {
    id: 'c2',
    itemId: '1',
    claimerId: 'u5',
    claimerName: 'John Doe',
    status: 'pending',
    date: '2026-04-07T08:30:00Z'
  }
];

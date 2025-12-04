export interface DropInfo {
  label: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface OrderProduct {
  itemName: string;
  quantity: number;
  price: number;
  type: 'grocery';
}

export interface OrderItem {
  id: string;
  name: string;
  address: string;
  paymentType: 'COD' | 'Prepaid';
  time: string;
  status: 'Pending' | 'Delivered';
  contact: number;
  drop: DropInfo;
  orderItems: OrderProduct[];
  amount?: string;
  deliveryStatus?: string;
  redelivery?: Boolean;
  message?: string;

}

export const pendingOrders: OrderItem[] = [
  {
    id: 'ORD10001',
    name: 'Rohan Sharma',
    address: 'Baner, Pune',
    paymentType: 'COD',
    contact: 9893476543,
    status: 'Pending',
    time: '—',
    drop: {
      label: 'Drop To',
      address: 'Kunal Icon, Baner Pashan Link Road, Pune',
      latitude: 18.5623,
      longitude: 73.8225,
    },
    orderItems: [
      { itemName: 'Parle-G Biscuits (800g)', quantity: 1, price: 75, type: 'grocery' },
      { itemName: 'Dettol Soap (Pack of 4)', quantity: 1, price: 140, type: 'grocery' },
      { itemName: 'Tata Salt (1kg)', quantity: 1, price: 28, type: 'grocery' },
      { itemName: 'Aashirvaad Atta (5kg)', quantity: 1, price: 260, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Maggi Noodles (Pack of 4)', quantity: 1, price: 52, type: 'grocery' },
      { itemName: 'Good Day Cookies', quantity: 2, price: 30, type: 'grocery' },
      { itemName: 'Chakki Fresh Atta (1kg)', quantity: 1, price: 55, type: 'grocery' },
      { itemName: 'Nescafe Classic (50g)', quantity: 1, price: 160, type: 'grocery' },
      { itemName: 'Kissan Jam (500g)', quantity: 1, price: 120, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 210, type: 'grocery' },
      { itemName: 'Bread (Whole Wheat)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Bournvita (500g)', quantity: 1, price: 230, type: 'grocery' },
      { itemName: 'Moong Dal (1kg)', quantity: 1, price: 115, type: 'grocery' },
    ],
  },

  {
    id: 'ORD10002',
    name: 'Vikram Joshi',
    address: 'Wakad, Pune',
    paymentType: 'Prepaid',
    contact: 9765432198,
    status: 'Pending',
    time: '—',
    drop: {
      label: 'Drop To',
      address: 'Wakad Chowk, Pune',
      latitude: 18.5991,
      longitude: 73.7685,
    },
    orderItems: [
      { itemName: 'Colgate Toothpaste (150g)', quantity: 2, price: 99, type: 'grocery' },
      { itemName: 'Surf Excel Detergent Powder (1kg)', quantity: 1, price: 130, type: 'grocery' },
      { itemName: 'Lifebuoy Handwash Refill (500ml)', quantity: 1, price: 95, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Aashirvaad Flour (5kg)', quantity: 1, price: 260, type: 'grocery' },
      { itemName: 'Kellogg’s Cornflakes (500g)', quantity: 1, price: 170, type: 'grocery' },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 225, type: 'grocery' },
      { itemName: 'Rice - Basmati (5kg)', quantity: 1, price: 350, type: 'grocery' },
      { itemName: 'Moong Dal (1kg)', quantity: 1, price: 120, type: 'grocery' },
      { itemName: 'Masoor Dal (1kg)', quantity: 1, price: 95, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Toor Dal (1kg)', quantity: 1, price: 135, type: 'grocery' },
      { itemName: 'Salt (1kg)', quantity: 1, price: 28, type: 'grocery' },
      { itemName: 'Bread (White)', quantity: 1, price: 40, type: 'grocery' },
      { itemName: 'Eggs (12 pc)', quantity: 1, price: 70, type: 'grocery' },
    ],
  },

  {
    id: 'ORD10003',
    name: 'Rahul Singh',
    address: 'Aundh, Pune',
    paymentType: 'COD',
    contact: 9023451287,
    status: 'Pending',
    time: '—',
    drop: {
      label: 'Drop To',
      address: 'Seasons Mall Road, Aundh, Pune',
      latitude: 18.5602,
      longitude: 73.8077,
    },
    orderItems: [
      { itemName: 'Aashirvaad Wheat Flour (5kg)', quantity: 1, price: 275, type: 'grocery' },
      { itemName: 'Good Day Cashew Cookies', quantity: 2, price: 30, type: 'grocery' },
      { itemName: 'Amul Butter (500g)', quantity: 1, price: 260, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Tata Tea Premium (1kg)', quantity: 1, price: 510, type: 'grocery' },
      { itemName: 'Toor Dal (1kg)', quantity: 1, price: 135, type: 'grocery' },
      { itemName: 'Chana Dal (1kg)', quantity: 1, price: 90, type: 'grocery' },
      { itemName: 'Basmati Rice (5kg)', quantity: 1, price: 380, type: 'grocery' },
      { itemName: 'Maggi (Pack of 6)', quantity: 1, price: 70, type: 'grocery' },
      { itemName: 'Nescafe Jar (100g)', quantity: 1, price: 285, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Milk (1L)', quantity: 2, price: 60, type: 'grocery' },
      { itemName: 'Salt (1kg)', quantity: 1, price: 28, type: 'grocery' },
      { itemName: 'Chips (Large Pack)', quantity: 1, price: 40, type: 'grocery' },
      { itemName: 'Tomato Ketchup (1kg)', quantity: 1, price: 110, type: 'grocery' },
    ],
  },
  {
    id: 'ORD10004',
    name: 'Rohan Sharma',
    address: 'Baner, Pune',
    paymentType: 'COD',
    contact: 9893476543,
    status: 'Pending',
    time: '—',
    drop: {
      label: 'Drop To',
      address: 'Kunal Icon, Baner Pashan Link Road, Pune',
      latitude: 18.5623,
      longitude: 73.8225,
    },
    orderItems: [
      { itemName: 'Parle-G Biscuits (800g)', quantity: 1, price: 75, type: 'grocery' },
      { itemName: 'Dettol Soap (Pack of 4)', quantity: 1, price: 140, type: 'grocery' },
      { itemName: 'Tata Salt (1kg)', quantity: 1, price: 28, type: 'grocery' },
      { itemName: 'Aashirvaad Atta (5kg)', quantity: 1, price: 260, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Maggi Noodles (Pack of 4)', quantity: 1, price: 52, type: 'grocery' },
      { itemName: 'Good Day Cookies', quantity: 2, price: 30, type: 'grocery' },
      { itemName: 'Chakki Fresh Atta (1kg)', quantity: 1, price: 55, type: 'grocery' },
      { itemName: 'Nescafe Classic (50g)', quantity: 1, price: 160, type: 'grocery' },
      { itemName: 'Kissan Jam (500g)', quantity: 1, price: 120, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 210, type: 'grocery' },
      { itemName: 'Bread (Whole Wheat)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Bournvita (500g)', quantity: 1, price: 230, type: 'grocery' },
      { itemName: 'Moong Dal (1kg)', quantity: 1, price: 115, type: 'grocery' },
    ],
  },
  {
    id: 'ORD10005',
    name: 'Amit Verma',
    address: 'Hinjawadi, Pune',
    paymentType: 'COD',
    contact: 9893476543,
    status: 'Pending',
    time: '—',
    drop: {
      label: 'Drop To',
      address: 'Kunal Icon, Baner Pashan Link Road, Pune',
      latitude: 18.5623,
      longitude: 73.8225,
    },
    orderItems: [
      { itemName: 'Parle-G Biscuits (800g)', quantity: 1, price: 75, type: 'grocery' },
      { itemName: 'Dettol Soap (Pack of 4)', quantity: 1, price: 140, type: 'grocery' },
      { itemName: 'Tata Salt (1kg)', quantity: 1, price: 28, type: 'grocery' },
      { itemName: 'Aashirvaad Atta (5kg)', quantity: 1, price: 260, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Maggi Noodles (Pack of 4)', quantity: 1, price: 52, type: 'grocery' },
      { itemName: 'Good Day Cookies', quantity: 2, price: 30, type: 'grocery' },
      { itemName: 'Chakki Fresh Atta (1kg)', quantity: 1, price: 55, type: 'grocery' },
      { itemName: 'Nescafe Classic (50g)', quantity: 1, price: 160, type: 'grocery' },
      { itemName: 'Kissan Jam (500g)', quantity: 1, price: 120, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 210, type: 'grocery' },
      { itemName: 'Bread (Whole Wheat)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Bournvita (500g)', quantity: 1, price: 230, type: 'grocery' },
      { itemName: 'Moong Dal (1kg)', quantity: 1, price: 115, type: 'grocery' },
    ],
  },

];


export const completedOrders: OrderItem[] = [
  {
    id: 'ORD20001',
    name: 'Amit Verma',
    address: 'Hinjawadi, Pune',
    paymentType: 'Prepaid',
    contact: 9988776655,
    status: 'Delivered',
    time: '09:20 AM',
    amount: 'Paid',
    drop: {
      label: 'Drop To',
      address: 'Blue Ridge, Hinjawadi Phase 1',
      latitude: 18.5944,
      longitude: 73.7363,
    },
    orderItems: [
      { itemName: 'Fortune Sunflower Oil (1L)', quantity: 2, price: 110, type: 'grocery' },
      { itemName: 'Amul Milk (1L)', quantity: 1, price: 58, type: 'grocery' },
    ],
  },

  {
    id: 'ORD10002',
    name: 'Vikram Joshi',
    address: 'Wakad, Pune',
    paymentType: 'COD',
    contact: 9765432198,
    status: 'Delivered',
    time: '03:10 PM',
    drop: {
      label: 'Drop To',
      address: 'Wakad Chowk, Pune',
      latitude: 18.5991,
      longitude: 73.7685,
    },
    amount: `₹${[
      { itemName: 'Colgate Toothpaste (150g)', quantity: 2, price: 99 },
      { itemName: 'Surf Excel Detergent Powder (1kg)', quantity: 1, price: 130 },
      { itemName: 'Lifebuoy Handwash Refill (500ml)', quantity: 1, price: 95 },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115 },
      { itemName: 'Aashirvaad Flour (5kg)', quantity: 1, price: 260 },
      { itemName: 'Kellogg’s Cornflakes (500g)', quantity: 1, price: 170 },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 225 },
      { itemName: 'Rice - Basmati (5kg)', quantity: 1, price: 350 },
      { itemName: 'Moong Dal (1kg)', quantity: 1, price: 120 },
      { itemName: 'Masoor Dal (1kg)', quantity: 1, price: 95 },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45 },
      { itemName: 'Toor Dal (1kg)', quantity: 1, price: 135 },
      { itemName: 'Salt (1kg)', quantity: 1, price: 28 },
      { itemName: 'Bread (White)', quantity: 1, price: 40 },
      { itemName: 'Eggs (12 pc)', quantity: 1, price: 70 },
    ].reduce((sum, i) => sum + i.price * i.quantity, 0)
      }`,

    orderItems: [
      { itemName: 'Colgate Toothpaste (150g)', quantity: 2, price: 99, type: 'grocery' },
      { itemName: 'Surf Excel Detergent Powder (1kg)', quantity: 1, price: 130, type: 'grocery' },
      { itemName: 'Lifebuoy Handwash Refill (500ml)', quantity: 1, price: 95, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Aashirvaad Flour (5kg)', quantity: 1, price: 260, type: 'grocery' },
      { itemName: 'Kellogg’s Cornflakes (500g)', quantity: 1, price: 170, type: 'grocery' },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 225, type: 'grocery' },
      { itemName: 'Rice - Basmati (5kg)', quantity: 1, price: 350, type: 'grocery' },
      { itemName: 'Moong Dal (1kg)', quantity: 1, price: 120, type: 'grocery' },
      { itemName: 'Masoor Dal (1kg)', quantity: 1, price: 95, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Toor Dal (1kg)', quantity: 1, price: 135, type: 'grocery' },
      { itemName: 'Salt (1kg)', quantity: 1, price: 28, type: 'grocery' },
      { itemName: 'Bread (White)', quantity: 1, price: 40, type: 'grocery' },
      { itemName: 'Eggs (12 pc)', quantity: 1, price: 70, type: 'grocery' },
    ],
  },

  {
    id: 'ORD20003',
    name: 'Pooja Nair',
    address: 'Baner, Pune',
    paymentType: 'Prepaid',
    contact: 9087654321,
    status: 'Delivered',
    time: '02:10 PM',
    amount: 'Paid',
    drop: {
      label: 'Drop To',
      address: 'Vascon Willows, Baner, Pune',
      latitude: 18.5608,
      longitude: 73.7834,
    },
    orderItems: [
      { itemName: 'Shampoo (Sunsilk 340ml)', quantity: 1, price: 210, type: 'grocery' },
      { itemName: 'Tissue Paper (Pack of 2)', quantity: 1, price: 45, type: 'grocery' },
    ],
  },
];

export const notDeliveredOrders: OrderItem[] = [
  {
    id: 'ORD30001',
    name: 'Sneha Kulkarni',
    address: 'Kothrud, Pune',
    paymentType: 'COD',
    contact: 9876543210,
    status: 'Pending',
    time: '—',
    deliveryStatus: 'Not Delivered', 
    redelivery: true,               
    message: 'Delivery attempt failed, ready for redelivery',
    drop: {
      label: 'Drop To',
      address: 'Phoenix Market City, Kothrud, Pune',
      latitude: 18.5021,
      longitude: 73.8102,
    },
    orderItems: [
      { itemName: 'Parle-G Biscuits (400g)', quantity: 2, price: 40, type: 'grocery' },
      { itemName: 'Dabur Honey (500g)', quantity: 1, price: 220, type: 'grocery' },
      { itemName: 'Amul Cheese Slices (200g)', quantity: 1, price: 130, type: 'grocery' },
    ],
  },
  {
    id: 'ORD30002',
    name: 'Manish Patil',
    address: 'Pimpri, Pune',
    paymentType: 'Prepaid',
    contact: 9765432109,
    status: 'Pending',
    time: '—',
    deliveryStatus: 'Not Delivered',
    redelivery: true,
    message: 'Delivery could not be completed, needs redelivery',
    drop: {
      label: 'Drop To',
      address: 'Pimpri Chinchwad Market, Pune',
      latitude: 18.6298,
      longitude: 73.7995,
    },
    orderItems: [
      { itemName: 'Tata Tea Premium (500g)', quantity: 1, price: 250, type: 'grocery' },
      { itemName: 'Fortune Oil (1L)', quantity: 1, price: 115, type: 'grocery' },
      { itemName: 'Aashirvaad Atta (5kg)', quantity: 1, price: 260, type: 'grocery' },
    ],
  },
  {
    id: 'ORD30003',
    name: 'Ritu Sharma',
    address: 'Hadapsar, Pune',
    paymentType: 'COD',
    contact: 9023456789,
    status: 'Pending',
    time: '—',
    deliveryStatus: 'Not Delivered',
    redelivery: true,
    message: 'Failed delivery attempt, schedule redelivery',
    drop: {
      label: 'Drop To',
      address: 'Seasons Mall, Hadapsar, Pune',
      latitude: 18.5203,
      longitude: 73.9011,
    },
    orderItems: [
      { itemName: 'Surf Excel Detergent (1kg)', quantity: 1, price: 130, type: 'grocery' },
      { itemName: 'Colgate Toothpaste (150g)', quantity: 2, price: 99, type: 'grocery' },
      { itemName: 'Sugar (1kg)', quantity: 1, price: 45, type: 'grocery' },
      { itemName: 'Tea Powder (500g)', quantity: 1, price: 210, type: 'grocery' },
    ],
  },
];


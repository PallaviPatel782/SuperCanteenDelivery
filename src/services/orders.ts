import { Order } from '../types';


const mockOrders: Order[] = [
{
id: 'ORD-1001',
customerName: 'Rahul Sharma',
customerPhone: '+919876543210',
addressShort: 'MG Road, Pune',
addressFull: '12 MG Road, Near Central Mall, Pune',
lat: 18.5204,
lng: 73.8567,
items: [{ name: 'Burger', qty: 2 }, { name: 'Coke', qty: 1 }],
instructions: 'Call on arrival',
paymentType: 'COD',
codAmount: 350,
assignedAt: new Date().toISOString(),
status: 'ASSIGNED'
},
{
id: 'ORD-1002',
customerName: 'Sana Verma',
customerPhone: '+919812345678',
addressShort: 'Koregaon Park',
addressFull: '5 Koregaon Park, Pune',
items: [{ name: 'Paneer Butter Masala', qty: 1 }],
paymentType: 'PREPAID',
assignedAt: new Date().toISOString(),
status: 'PENDING'
}
];


export const fetchAssignedOrders = async (
  deliveryPersonId: string
): Promise<Order[]> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 300));
  return mockOrders;
};

export const markOrderDelivered = async (orderId: string) => {
  await new Promise<void>((resolve) => setTimeout(resolve, 200));
  return true;
};

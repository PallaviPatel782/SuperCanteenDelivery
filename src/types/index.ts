export type PaymentType = 'COD' | 'PREPAID';


export type OrderStatus = 'PENDING' | 'ASSIGNED' | 'DELIVERED' | 'FAILED' | 'CANCELLED';


export interface Order {
id: string;
customerName: string;
customerPhone: string;
addressShort: string;
addressFull: string;
lat?: number;
lng?: number;
items: { name: string; qty: number }[];
instructions?: string;
paymentType: PaymentType;
codAmount?: number;
assignedAt: string; // ISO
status: OrderStatus;
}
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  postcode: string;
}

export interface CreateOrderRequest {
  customer: Customer;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  total: number;
  shippingCost: number; 
}
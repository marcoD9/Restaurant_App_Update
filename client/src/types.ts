export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface LoginResponse {
  user: {
    id: string;
  };
  token: string;
}

export interface NewUser {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Order {
  map(arg0: (order: unknown) => Promise<unknown>): unknown;
  id: string;
  totalPrice: number;
  time: Date;
  orderStatus: string;
  userId: string;
  orderDishes: OrderDish[]; // Array of order dishes
}

export interface OrderDish {
  dishId: string;
  quantity: number;
}

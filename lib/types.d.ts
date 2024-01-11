import { Event } from "./database/models/event.model";

type IUser = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

interface createOrderSchema {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: number;
}

type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

interface OrderType {
  _id: string;
  createdAt: string;
  stripeId: string;
  totalAmount: string;
  eventId: {
    _id: string;
    name: string;
    description: string;
    start: string;
    end: string;
    location: string;
    imageUrl: string;
    price: string;
    isFree: boolean;
    category: string[];
    organizer: {
      _id: string;
      username: string;
      photo: string;
    };
    url: string;
    createdAt: string;
  };
  buyerId: string;
}

type EventOrderInfoProps = {
  _id: string;
  createdAt: string;
  totalAmount: string;
  eventTitle: string;
  eventid: string;
  buyer: string;
};

type EventQuery = ReturnType<typeof Event.findOne>;

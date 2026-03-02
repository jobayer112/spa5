import { Type } from "@google/genai";

export interface Service {
  id: number;
  name: string;
  duration: string;
  price: number;
  description: string;
  image: string;
}

export interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  author: string;
  content: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  message: string;
  photo?: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

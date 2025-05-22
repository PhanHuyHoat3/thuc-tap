import axios from 'axios';
import { NextResponse } from 'next/server';

const API_URL = "http://localhost:3001/orders";

if (!API_URL) {
  throw new Error('API_URL is not defined');
}

export async function GET() {
  try {
    const response = await axios.get(API_URL);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await axios.post(API_URL, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Failed to create order' }, { status: 400 });
  }
}
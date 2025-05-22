import axios from 'axios';
import { NextResponse } from 'next/server';

const API_URL = "http://localhost:3001/orders";

export async function GET(req, { params }) {
  try {
    const response = await axios.get(`${API_URL}/${params.id}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const response = await axios.put(`${API_URL}/${params.id}`, body);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ message: 'Failed to update order' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await axios.delete(`${API_URL}/${params.id}`);
    return NextResponse.json({ message: 'Order deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ message: 'Failed to delete order' }, { status: 400 });
  }
}
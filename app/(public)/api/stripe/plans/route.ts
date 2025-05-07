import { getProducts } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  const products = await getProducts();
  // URL to redirect to after sign in process completes
  return NextResponse.json({ products });
}

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/app/context/CartContext';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { items, customerEmail } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Please provide a list of items' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: CartItem) => {
      // For local images, we need to use an absolute URL
      const imageUrl = item.product.image.startsWith('/')
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.product.image}`
        : item.product.image;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [imageUrl],
            metadata: {
              productId: item.product.id,
            },
          },
          unit_amount: Math.round(item.product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Express shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 2,
              },
            },
          },
        },
      ],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 
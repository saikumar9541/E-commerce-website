# StyleStore E-commerce Website

A modern e-commerce website built with Next.js, Tailwind CSS, and Stripe for payments.

## Features

- Responsive design
- Product listings by category (Men's and Women's)
- Product details page
- Shopping cart functionality
- Checkout process
- Stripe payment integration

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- Stripe account

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Replace the placeholder values with your actual Stripe API keys

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stripe Integration

This project uses Stripe for payment processing. To test the payment functionality:

1. Sign up for a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Use test card numbers for testing:
   - Card number: 4242 4242 4242 4242
   - Expiration date: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

## Deployment

To deploy this project to production:

1. Update the `NEXT_PUBLIC_BASE_URL` in your environment variables to your production URL
2. Use your Stripe live API keys instead of test keys
3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

## License

This project is licensed under the MIT License.

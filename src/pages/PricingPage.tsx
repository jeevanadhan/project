import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '0',
    features: [
      'Up to 2GB storage',
      'Basic encryption',
      '24-hour link expiry',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '9.99',
    features: [
      'Up to 50GB storage',
      'Advanced encryption',
      'Custom link expiry',
      'Priority support',
      'No ads',
    ],
  },
  {
    name: 'Enterprise',
    price: '29.99',
    features: [
      'Unlimited storage',
      'Military-grade encryption',
      'Custom branding',
      '24/7 support',
      'API access',
      'Team management',
    ],
  },
];

const PricingPage = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tier.name}
                </h2>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
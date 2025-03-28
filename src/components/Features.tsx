import React from 'react';
import { Shield, Lock, Share2, AlertTriangle } from 'lucide-react';

const features = [
  {
    name: 'End-to-End Encryption',
    description: 'Your files are encrypted before they leave your device, ensuring maximum security.',
    icon: Lock,
  },
  {
    name: 'Secure Authentication',
    description: 'Multi-factor authentication and advanced security measures to protect your account.',
    icon: Shield,
  },
  {
    name: 'Expiring Links',
    description: 'Share files with links that automatically expire after a set time.',
    icon: Share2,
  },
  {
    name: 'Threat Detection',
    description: 'AI-powered monitoring to detect and alert you of potential security threats.',
    icon: AlertTriangle,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Better security for your files
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Advanced features to keep your data secure and private while making sharing easy.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
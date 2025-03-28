import React from 'react';
import { Upload, Lock, Share2 } from 'lucide-react';

const steps = [
  {
    title: 'Upload Your Files',
    description: 'Simply drag and drop your files or select them from your device.',
    icon: Upload,
  },
  {
    title: 'Automatic Encryption',
    description: 'Your files are automatically encrypted before they leave your device.',
    icon: Lock,
  },
  {
    title: 'Share Securely',
    description: 'Generate secure, expiring links to share your files with others.',
    icon: Share2,
  },
];

const HowItWorksPage = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How SecuShare Works
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Secure file sharing made simple
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="relative flex flex-col items-center">
                  <div className="rounded-full bg-indigo-600 p-4">
                    <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Security Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  End-to-End Encryption
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your files are encrypted before they leave your device and can only be
                  decrypted by the intended recipient.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Expiring Links
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Set custom expiration times for your shared links to ensure your files
                  remain private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
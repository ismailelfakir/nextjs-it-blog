import React from 'react';
import { Header } from '@/components/header';

const PrivacyPolicyPage = () => {
  const lastUpdated = 'December 25, 2024';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-600">Last updated: {lastUpdated}</p>
      </div>

      {/* Add your privacy policy content here */}
    </div>
  );
};

export default PrivacyPolicyPage;
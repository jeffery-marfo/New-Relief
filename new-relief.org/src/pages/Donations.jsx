
import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, Users, Church, Gift, CheckCircle, XCircle, CreditCard, HandCoinsIcon } from 'lucide-react';

const DonationsPage = () => {
  // Donation categories
  const donationCategories = [
    { id: 'tithe', name: 'Tithe', icon: Church, description: 'Regular tithes and offerings' },
    { id: 'building', name: 'Building Fund', icon: Church, description: 'Support our building projects' },
    { id: 'missions', name: 'Missions', icon: Users, description: 'Support missionary work' },
    { id: 'welfare', name: 'Welfare', icon: Heart, description: 'Help those in need' },
    { id: 'youth', name: 'Youth Ministry', icon: Users, description: 'Invest in the next generation' },
    { id: 'general', name: 'General Offering', icon: Gift, description: 'General church operations' }
  ];

  // Preset amounts in GHS
  const presetAmounts = [10, 20, 50, 100, 200, 500];

  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    category: 'general',
    customAmount: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // IMPORTANT: Replace with your actual Paystack PUBLIC key
  // const paystackPublicKey = 'pk_live_f1b5a7cd35d1b6b2797ed8cf184c4a6360a05a3a';
  const paystackPublicKey = 'pk_test_9b89ea8a8e883d105a7be53f1c6cf6c1f18708a6';

  // Payment handler
  const handlePayment = () => {
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
      setErrorMessage('Please fill in all required fields');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (parseFloat(formData.amount) < 1) {
      setErrorMessage('Minimum donation amount is GHS 1');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!paystackLoaded) {
      setErrorMessage('Payment system is loading. Please try again in a moment.');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Get selected category name
    const selectedCategory = donationCategories.find(cat => cat.id === formData.category);

    // Format phone number (remove spaces, dashes, and ensure it starts correctly)
    let cleanPhone = formData.phone.replace(/[\s\-]/g, '');
    // If it starts with 0, replace with 233
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '233' + cleanPhone.substring(1);
    }
    // If it doesn't start with 233, add it
    if (!cleanPhone.startsWith('233')) {
      cleanPhone = '233' + cleanPhone;
    }

    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: formData.email,
      amount: Math.round(parseFloat(formData.amount) * 100), // Amount in pesewas
      currency: 'GHS',
      ref: 'DON-' + Math.floor((Math.random() * 1000000000) + 1),
      channels: ['mobile_money', 'card', 'bank'], // Explicitly specify payment channels
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: formData.name
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: cleanPhone
          },
          {
            display_name: "Donation Category",
            variable_name: "category",
            value: selectedCategory ? selectedCategory.name : 'General Offering'
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        console.log('Payment successful:', response);
        setShowSuccess(true);
        
        // Here you would typically send payment details to your backend
        // Example: fetch('/api/donations', { method: 'POST', body: JSON.stringify(response) })
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            amount: '',
            category: 'general',
            customAmount: false
          });
          setShowSuccess(false);
        }, 5000);
      },
      onClose: function() {
        // Payment cancelled
        setErrorMessage('Payment was cancelled. Please try again if you wish to complete your donation.');
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    });

    handler.openIframe();
  };

  const selectPresetAmount = (amount) => {
    setFormData({ ...formData, amount: amount.toString(), customAmount: false });
  };

  const toggleCustomAmount = () => {
    setFormData({ ...formData, customAmount: true, amount: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                Your donation of GHS {formData.amount} has been received successfully. May God bless you abundantly!
              </p>
              <p className="text-sm text-gray-500">
                A receipt has been sent to {formData.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-in max-w-md">
          <XCircle size={24} className="flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mt-8">
          <HandCoinsIcon className="mx-auto mb-4" size={64} />
          <h1 className="text-5xl font-bold mb-4">Give Online</h1>
          <p className="text-xl text-blue-100 mb-6">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-black/30 bg-opacity-20 px-4 py-2 rounded-full">
              <CreditCard size={18} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 bg-opacity-20 px-4 py-2 rounded-full">
              <CheckCircle size={18} />
              <span>100% Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Donation Categories */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Donation Categories</h2>
              <div className="space-y-3">
                {donationCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        formData.category === category.id
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={24} />
                        <div>
                          <div className="font-semibold">{category.name}</div>
                          <div className={`text-sm ${formData.category === category.id ? 'text-blue-100' : 'text-gray-500'}`}>
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Make Your Donation</h2>
              
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Please enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="XXX XXXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Amount (GHS) *
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => selectPresetAmount(amount)}
                        className={`py-3 rounded-xl font-semibold transition-all ${
                          formData.amount === amount.toString() && !formData.customAmount
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        GHS {amount}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={toggleCustomAmount}
                    className={`w-full py-3 rounded-xl font-semibold transition-all mb-3 ${
                      formData.customAmount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Custom Amount
                  </button>

                  {formData.customAmount && (
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        GHS
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full pl-16 pr-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg font-semibold"
                        placeholder="Enter amount"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method Info */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Payment Methods</h3>
                      <p className="text-sm text-blue-800">
                        We accept Mobile Money (MTN, Telecel, AirtelTigo), Bank Cards (Visa, Mastercard), and Bank Transfers via Paystack.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handlePayment}
                  disabled={!paystackLoaded}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                    paystackLoaded
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  {paystackLoaded ? 'Proceed to Payment' : 'Loading Payment System...'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Your donation is secure and encrypted. You will receive a receipt via email.
                </p>
              </div>
            </div>

            {/* Impact Info */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <Gift size={20} />
                Your Impact Matters
              </h3>
              <p className="text-sm text-green-800">
                Every donation helps us reach more people with the Gospel, support our community programs, and maintain our facilities. Thank you for your generosity and partnership in ministry!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DonationsPage;
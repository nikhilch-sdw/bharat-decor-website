import React, { useState, useEffect } from 'react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/interiorData';
import { InquiryFormData, InquirySubmission } from '../types';
import { MapPin, Phone, MessageCircle, Instagram, Clock, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  initialService?: string;
  onFormSubmitted: (submission: InquirySubmission) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService, onFormSubmitted }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceNeeded: initialService || SERVICES_DATA[0].title,
    propertyType: 'Apartment',
    approxBudget: '₹5L - ₹15L',
    spaceDetails: '',
  });

  const [formErrors, setFormErrors] = useState<{ fullName?: string; phoneNumber?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  const validate = () => {
    const errors: { fullName?: string; phoneNumber?: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    // Indian phone number regex validation
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate unique inquiry reference id: BD-MRT-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submission: InquirySubmission = {
      ...formData,
      referenceId: `BD-MRT-2025-${randomSuffix}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onFormSubmitted(submission);
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        serviceNeeded: SERVICES_DATA[0].title,
        propertyType: 'Apartment',
        approxBudget: '₹5L - ₹15L',
        spaceDetails: '',
      });
    }, 600);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1E2229] mb-4">
            Contact & Consultation
          </h1>
          <p className="text-base sm:text-lg text-[#554E45] leading-relaxed">
            Visit our studio on Roorkee Road, Meerut, call us directly, or submit your project details below to schedule a complimentary site measurement and 3D preview.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Direct Info Cards & Interactive Booking Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1E2229]">
              Studio Information
            </h2>

            {/* Quick Action Buttons: Click-to-Call & Click-to-WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                id="contact-direct-call-btn"
                href={`tel:${STUDIO_INFO.phone}`}
                className="flex items-center justify-center gap-2 p-3.5 rounded-lg bg-[#1E2229] text-white hover:bg-[#2C333E] text-sm font-semibold transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Call Now: 8126040604</span>
              </a>

              <a
                id="contact-direct-whatsapp-btn"
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Bharat%20Decor%2C%20I%20would%20like%20to%20inquire%20about%20interior%20services%20in%20Meerut.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] text-sm font-semibold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Details Cards */}
            <div className="space-y-4">
              {/* Address Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E7E0D2] shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#F5F2EC] text-[#9F7E54] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#8A8174] font-bold">
                    Studio Location
                  </h3>
                  <p className="text-sm font-semibold text-[#1E2229] mt-0.5">
                    {STUDIO_INFO.location}
                  </p>
                  <p className="text-xs text-[#6B6357] mt-1">
                    Conveniently situated near major hubs on Roorkee Road. Physical catalogs and material samples available.
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E7E0D2] shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#F5F2EC] text-[#9F7E54] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs uppercase tracking-wider text-[#8A8174] font-bold">
                    Phone & WhatsApp
                  </h3>
                  <p className="text-sm font-semibold text-[#1E2229] mt-0.5">
                    {STUDIO_INFO.phoneDisplay}
                  </p>
                  <p className="text-xs text-[#6B6357] mt-1">
                    Direct line for fast quotations, site visits, and updates.
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E7E0D2] shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#F5F2EC] text-[#9F7E54] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#8A8174] font-bold">
                    Studio Hours
                  </h3>
                  <p className="text-sm font-semibold text-[#1E2229] mt-0.5">
                    {STUDIO_INFO.hours}
                  </p>
                  <p className="text-xs text-[#6B6357] mt-1">
                    Walk-ins welcome during studio hours. Prior booking recommended for dedicated designer sessions.
                  </p>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E7E0D2] shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#F5F2EC] text-[#9F7E54] shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#8A8174] font-bold">
                    Instagram Showcase
                  </h3>
                  <a
                    href={STUDIO_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#1E2229] hover:text-[#C5A880] transition-colors mt-0.5 block"
                  >
                    {STUDIO_INFO.instagram}
                  </a>
                  <p className="text-xs text-[#6B6357] mt-1">
                    Follow us for real on-site transformation reels and wallpaper arrivals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Interactive Booking Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E4DDD0] shadow-md">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE7DA] text-xs font-semibold uppercase tracking-wider text-[#8A6D47] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Free Consultation & 3D Render</span>
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E2229]">
                  Book Your Complimentary Site Visit
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6357] mt-1">
                  Fill out the details below. Our senior project architect will review your requirements and reach out within 2 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" id="consultation-booking-form">
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-fullName"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${
                        formErrors.fullName
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="input-phoneNumber"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneNumber: e.target.value });
                        if (formErrors.phoneNumber) setFormErrors({ ...formErrors, phoneNumber: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${
                        formErrors.phoneNumber
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                      }`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                    Email Address <span className="text-xs text-[#8A8174] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="input-email"
                    placeholder="e.g. yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6] text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Service Needed & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                      Service Needed <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="select-serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6] text-sm focus:outline-none transition-colors"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="Complete Home Renovation">Complete Home Renovation</option>
                      <option value="Other Interior Consultation">Other Interior Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                      Property Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="select-propertyType"
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyType: e.target.value as InquiryFormData['propertyType'],
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6] text-sm focus:outline-none transition-colors"
                    >
                      <option value="Apartment">Apartment (Flat / Builder Floor)</option>
                      <option value="Independent House">Independent House / Kothi / Villa</option>
                      <option value="Commercial Office">Commercial Office / Clinic</option>
                      <option value="Retail">Retail Store / Showroom / Cafe</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                    Anticipated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {['Under ₹5 Lakhs', '₹5L - ₹12L', '₹12L - ₹25L', '₹25L+ Luxury'].map((budget) => (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => setFormData({ ...formData, approxBudget: budget })}
                        className={`p-2 rounded-md border text-center transition-colors ${
                          formData.approxBudget === budget
                            ? 'bg-[#1E2229] text-white border-[#1E2229] font-medium'
                            : 'bg-[#FAF9F6] text-[#554E45] border-[#D8CFBF] hover:border-[#1E2229]'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message / Space Details */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2229] mb-1.5">
                    Space Details / Location in Meerut
                  </label>
                  <textarea
                    id="input-spaceDetails"
                    rows={4}
                    placeholder="e.g. 3BHK Apartment in Shastri Nagar, need modular kitchen, false ceiling and living room charcoal paneling..."
                    value={formData.spaceDetails}
                    onChange={(e) => setFormData({ ...formData, spaceDetails: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6] text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="submit-consultation-form-btn"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] disabled:bg-gray-400 transition-all shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Registering Consultation...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C5A880]" />
                      <span>Submit & Request Free Site Measurement</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#8C8378]">
                  🔒 Your information is confidential. We will never spam or share your contact number.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

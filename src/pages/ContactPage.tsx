import React, { useState, useEffect } from 'react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/interiorData';
import { InquiryFormData, InquirySubmission } from '../types';
import { MapPin, Phone, MessageCircle, Instagram, Clock, Send, Sparkles, AlertCircle, ShieldCheck, ExternalLink } from 'lucide-react';

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
    spaceDetails: '',
  });

  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    serviceNeeded?: string;
    propertyType?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateField = (field: keyof InquiryFormData, value: string) => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Please enter your full name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'phoneNumber': {
        const clean = value.replace(/\D/g, '');
        if (!value.trim()) return 'Please enter your contact phone number';
        const isStandard10 = clean.length === 10;
        const isWithCountryCode = clean.startsWith('91') && clean.length === 12;
        if (!isStandard10 && !isWithCountryCode) {
          return 'Enter a valid 10-digit mobile number';
        }
        return undefined;
      }
      case 'email':
        if (value.trim() && !EMAIL_REGEX.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@domain.com)';
        }
        return undefined;
      case 'serviceNeeded':
        if (!value.trim()) return 'Please select a required service';
        return undefined;
      case 'propertyType':
        if (!value) return 'Please select a property type';
        return undefined;
      default:
        return undefined;
    }
  };

  const validate = () => {
    const errors: {
      fullName?: string;
      phoneNumber?: string;
      email?: string;
      serviceNeeded?: string;
      propertyType?: string;
    } = {};

    const nameErr = validateField('fullName', formData.fullName);
    if (nameErr) errors.fullName = nameErr;

    const phoneErr = validateField('phoneNumber', formData.phoneNumber);
    if (phoneErr) errors.phoneNumber = phoneErr;

    const serviceErr = validateField('serviceNeeded', formData.serviceNeeded);
    if (serviceErr) errors.serviceNeeded = serviceErr;

    const propErr = validateField('propertyType', formData.propertyType);
    if (propErr) errors.propertyType = propErr;

    if (formData.email && formData.email.trim()) {
      const emailErr = validateField('email', formData.email);
      if (emailErr) errors.email = emailErr;
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
        spaceDetails: '',
      });
    }, 600);
  };

  return (
    <div className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Compact Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E0D2] pb-3.5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#8A6D47] font-bold">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Studio & Consultation</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E2229] mt-0.5">
              Contact & Consultation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#665D52]">
            Visit our Roorkee Road studio or book a free site measurement and 3D preview.
          </p>
        </div>

        {/* Main Content Grid: Direct Info & Interactive Booking Form (Equal 50/50 Columns & Matching Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Direct Contact Info Boxes (Equal to Right Form) */}
          <div className="h-full flex flex-col justify-between gap-3 sm:gap-3.5">
            {/* Quick Action Buttons: Click-to-Call & Click-to-WhatsApp */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <a
                id="contact-direct-call-btn"
                href={`tel:${STUDIO_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3.5 px-3 sm:px-4 rounded-xl bg-[#1E2229] text-white hover:bg-[#2C333E] text-xs sm:text-sm md:text-base font-semibold transition-all shadow-sm truncate"
              >
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="truncate">Call: 8126040604</span>
              </a>

              <a
                id="contact-direct-whatsapp-btn"
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Bharat%20Decor%2C%20I%20would%20like%20to%20inquire%20about%20interior%20services%20in%20Meerut.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-3 sm:px-4 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] text-xs sm:text-sm md:text-base font-semibold transition-all shadow-sm truncate"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span className="truncate">Chat on WhatsApp</span>
              </a>
            </div>

            {/* Studio Location Box */}
            <div className="flex-1 bg-white rounded-xl p-4 sm:p-5 border border-[#E7E0D2] shadow-2xs flex items-center gap-4 transition-all hover:border-[#C5A880]/60">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F5F2EC] text-[#9F7E54] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs sm:text-[13px] uppercase tracking-wider text-[#8A8174] font-bold">Studio Location</span>
                  <a
                    href="https://maps.google.com/?q=Roorkee+Road+Meerut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#8A6D47] hover:text-[#1E2229] inline-flex items-center gap-1 font-semibold"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm sm:text-base lg:text-[17px] font-bold text-[#1E2229] leading-snug">
                  {STUDIO_INFO.location}
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp Box */}
            <div className="flex-1 bg-white rounded-xl p-4 sm:p-5 border border-[#E7E0D2] shadow-2xs flex items-center gap-4 transition-all hover:border-[#C5A880]/60">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F5F2EC] text-[#9F7E54] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-[13px] uppercase tracking-wider text-[#8A8174] font-bold block mb-0.5">Phone & WhatsApp</span>
                <a
                  href={`tel:${STUDIO_INFO.phone}`}
                  className="text-sm sm:text-base lg:text-[17px] font-bold text-[#1E2229] hover:text-[#8A6D47] transition-colors leading-snug block"
                >
                  {STUDIO_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Studio Hours Box */}
            <div className="flex-1 bg-white rounded-xl p-4 sm:p-5 border border-[#E7E0D2] shadow-2xs flex items-center gap-4 transition-all hover:border-[#C5A880]/60">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F5F2EC] text-[#9F7E54] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-[13px] uppercase tracking-wider text-[#8A8174] font-bold block mb-0.5">Studio Hours</span>
                <p className="text-sm sm:text-base lg:text-[17px] font-bold text-[#1E2229] leading-snug">
                  {STUDIO_INFO.hours}
                </p>
              </div>
            </div>

            {/* Instagram Box */}
            <div className="flex-1 bg-white rounded-xl p-4 sm:p-5 border border-[#E7E0D2] shadow-2xs flex items-center gap-4 transition-all hover:border-[#C5A880]/60">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F5F2EC] text-[#9F7E54] flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-[13px] uppercase tracking-wider text-[#8A8174] font-bold block mb-0.5">Instagram & Social</span>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base lg:text-[17px] font-bold text-[#1E2229] hover:text-[#8A6D47] transition-colors leading-snug block"
                >
                  {STUDIO_INFO.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Booking Form */}
          <div className="h-full">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E4DDD0] shadow-sm h-full flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#F0ECE1]">
                <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1E2229]">
                  Book Complimentary Site Visit
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE7DA] text-[10px] font-semibold uppercase tracking-wider text-[#8A6D47] shrink-0">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>Free 3D Render</span>
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-3" id="consultation-booking-form">
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E2229] mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-fullName"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (formErrors.fullName) setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      onBlur={() => {
                        const err = validateField('fullName', formData.fullName);
                        if (err) setFormErrors((prev) => ({ ...prev, fullName: err }));
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none transition-colors ${
                        formErrors.fullName
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E2229] mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="input-phoneNumber"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneNumber: e.target.value });
                        if (formErrors.phoneNumber) setFormErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                      }}
                      onBlur={() => {
                        const err = validateField('phoneNumber', formData.phoneNumber);
                        if (err) setFormErrors((prev) => ({ ...prev, phoneNumber: err }));
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none transition-colors ${
                        formErrors.phoneNumber
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                      }`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Service Needed & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E2229] mb-1">
                      Service Needed <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="select-serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceNeeded: e.target.value });
                        if (formErrors.serviceNeeded) setFormErrors((prev) => ({ ...prev, serviceNeeded: undefined }));
                      }}
                      onBlur={() => {
                        const err = validateField('serviceNeeded', formData.serviceNeeded);
                        if (err) setFormErrors((prev) => ({ ...prev, serviceNeeded: err }));
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none transition-colors ${
                        formErrors.serviceNeeded
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                      }`}
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="Complete Home Renovation">Complete Home Renovation</option>
                      <option value="Other Interior Consultation">Other Interior Consultation</option>
                    </select>
                    {formErrors.serviceNeeded && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.serviceNeeded}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E2229] mb-1">
                      Property Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="select-propertyType"
                      value={formData.propertyType}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          propertyType: e.target.value as InquiryFormData['propertyType'],
                        });
                        if (formErrors.propertyType) setFormErrors((prev) => ({ ...prev, propertyType: undefined }));
                      }}
                      onBlur={() => {
                        const err = validateField('propertyType', formData.propertyType);
                        if (err) setFormErrors((prev) => ({ ...prev, propertyType: err }));
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none transition-colors ${
                        formErrors.propertyType
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                      }`}
                    >
                      <option value="Apartment">Apartment / Builder Floor</option>
                      <option value="Independent House">Independent Villa / Kothi</option>
                      <option value="Commercial Office">Commercial Office / Clinic</option>
                      <option value="Retail">Retail Showroom / Cafe</option>
                    </select>
                    {formErrors.propertyType && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.propertyType}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Email Address (Optional but validated format) */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E2229] mb-1">
                    Email Address <span className="text-[#8A8174] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="input-email"
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    onBlur={() => {
                      if (formData.email && formData.email.trim()) {
                        const err = validateField('email', formData.email);
                        if (err) setFormErrors((prev) => ({ ...prev, email: err }));
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none transition-colors ${
                      formErrors.email
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                        : 'border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Row 4: Space Details & Location in Meerut */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E2229] mb-1">
                    Space Details & Location in Meerut
                  </label>
                  <textarea
                    id="input-spaceDetails"
                    rows={2}
                    placeholder="e.g. 3BHK in Shastri Nagar, require modular kitchen, false ceiling & living room paneling..."
                    value={formData.spaceDetails}
                    onChange={(e) => setFormData({ ...formData, spaceDetails: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D8CFBF] focus:border-[#1E2229] bg-[#FAF9F6] text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Row 5: Submit Button & Security Note */}
                <div className="pt-1">
                  <button
                    type="submit"
                    id="submit-consultation-form-btn"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] active:scale-[0.99] disabled:bg-gray-400 transition-all shadow-sm hover:shadow"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Submit & Request Free Site Measurement</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-[#8C8378] mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#8A6D47]" />
                    <span>Confidential & spam-free. We never share your phone number.</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


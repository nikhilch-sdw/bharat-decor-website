/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, PortfolioItem, InquirySubmission } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectModal } from './components/ProjectModal';
import { InquirySuccessModal } from './components/InquirySuccessModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<PortfolioItem | null>(null);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(undefined);
  const [targetServiceId, setTargetServiceId] = useState<string | undefined>(undefined);
  const [inquirySubmission, setInquirySubmission] = useState<InquirySubmission | null>(null);

  // Navigate function with smooth scroll to top
  const handleNavigate = (page: PageId, serviceId?: string) => {
    if (serviceId) {
      setTargetServiceId(serviceId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E2229] selection:bg-[#C5A880]/30 selection:text-[#1E2229]">
      {/* Persistent Sticky Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1 w-full" id="main-content-container">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProjectModal={(proj) => setSelectedProjectForModal(proj)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
            targetServiceId={targetServiceId}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onNavigate={handleNavigate}
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage
            onNavigate={handleNavigate}
            onOpenProjectModal={(proj) => setSelectedProjectForModal(proj)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialService={selectedServiceForInquiry}
            onFormSubmitted={(submission) => setInquirySubmission(submission)}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Action Badge */}
      <FloatingWhatsApp />

      {/* Project Lightbox / Detail Modal */}
      <ProjectModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onNavigate={handleNavigate}
      />

      {/* Booking Form Success Confirmation Modal */}
      <InquirySuccessModal
        submission={inquirySubmission}
        onClose={() => setInquirySubmission(null)}
      />
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import OnboardingPage from '@/pages/OnboardingPage'
import DashboardLayout from '@/components/DashboardLayout'
import DashboardPage from '@/pages/DashboardPage'
import GeneratePage from '@/pages/GeneratePage'
import SettingsPage from '@/pages/SettingsPage'
import PreviewPage from '@/pages/PreviewPage'
import CampaignsPage from '@/pages/CampaignsPage'
import NewCampaignPage from '@/pages/NewCampaignPage'
import CampaignDetailPage from '@/pages/CampaignDetailPage'
import LandingPage from '@/pages/LandingPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import RefundPage from '@/pages/RefundPage'
import ContactPage from '@/pages/ContactPage'
import ShippingPage from '@/pages/ShippingPage'
import FAQPage from '@/pages/FAQPage'
import ScrollToTop from '@/components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Public preview page — no auth required */}
        <Route path="/preview/:token" element={<PreviewPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="generate" element={<GeneratePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaigns/new" element={<NewCampaignPage />} />
          <Route path="campaigns/:id" element={<CampaignDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import PasswordSecurity from "./pages/learn/PasswordSecurity";
import PhishingProtection from "./pages/learn/PhishingProtection";
import TwoFactorAuth from "./pages/learn/TwoFactorAuth";
import NetworkSecurity from "./pages/learn/NetworkSecurity";
import MalwareProtection from "./pages/learn/MalwareProtection";
import SocialEngineering from "./pages/learn/SocialEngineering";
import DataPrivacy from "./pages/learn/DataPrivacy";
import MobileSecurity from "./pages/learn/MobileSecurity";
import CloudSecurity from "./pages/learn/CloudSecurity";
import EmailSecurity from "./pages/learn/EmailSecurity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/learn/password-security" element={<PasswordSecurity />} />
              <Route path="/learn/phishing-protection" element={<PhishingProtection />} />
              <Route path="/learn/2fa-setup" element={<TwoFactorAuth />} />
              <Route path="/learn/network-security" element={<NetworkSecurity />} />
              <Route path="/learn/malware-protection" element={<MalwareProtection />} />
              <Route path="/learn/social-engineering" element={<SocialEngineering />} />
              <Route path="/learn/data-privacy" element={<DataPrivacy />} />
              <Route path="/learn/mobile-security" element={<MobileSecurity />} />
              <Route path="/learn/cloud-security" element={<CloudSecurity />} />
              <Route path="/learn/email-security" element={<EmailSecurity />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

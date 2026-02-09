import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="h-8 w-8 text-primary cyber-glow-text transition-transform group-hover:scale-110" />
            <span className="font-mono font-bold text-xl text-foreground">
              CyberShield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.pricing')}
            </Link>
            {user && (
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                {t('nav.dashboard')}
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-muted-foreground hover:text-secondary transition-colors">
                {t('nav.admin')}
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            {user ? (
              <Button variant="outline" onClick={handleSignOut} className="border-primary/50 hover:bg-primary/10">
                {t('nav.logout')}
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="hover:bg-primary/10">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/pricing" 
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.pricing')}
              </Link>
              {user && (
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                </Link>
              )}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-muted-foreground hover:text-secondary transition-colors px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.admin')}
                </Link>
              )}
              <div className="px-2 py-2">
                <LanguageSelector />
              </div>
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                  className="border-primary/50 hover:bg-primary/10 mx-2"
                >
                  {t('nav.logout')}
                </Button>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full hover:bg-primary/10">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

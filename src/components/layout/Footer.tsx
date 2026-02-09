import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-mono font-bold text-lg">CyberShield</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CyberShield. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

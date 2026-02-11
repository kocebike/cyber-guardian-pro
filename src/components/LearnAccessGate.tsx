import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Crown, LogIn } from 'lucide-react';
import { ReactNode } from 'react';

interface LearnAccessGateProps {
  children: ReactNode;
  requirePremium?: boolean;
}

const LearnAccessGate = ({ children, requirePremium = true }: LearnAccessGateProps) => {
  const { t } = useLanguage();
  const { user, isPremium, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t('content.back')}
            </Link>
            <Card className="bg-card border-primary/30 cyber-border overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="p-12 text-center">
                <LogIn className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">
                  {t('content.login.title') || 'Влезте в акаунта си'}
                </h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {t('content.login.desc') || 'Трябва да влезете в акаунта си, за да видите това съдържание.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/login">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {t('nav.login') || 'Вход'}
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                      {t('nav.signup') || 'Регистрация'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Logged in but no premium (only if required)
  if (requirePremium && !isPremium) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t('content.back')}
            </Link>
            <Card className="bg-card border-secondary/30 cyber-border overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-secondary to-primary" />
              <CardContent className="p-12 text-center">
                <Crown className="h-16 w-16 text-secondary mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">{t('content.premium.title')}</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t('content.premium.desc')}</p>
                <Link to="/pricing">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    {t('content.premium.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default LearnAccessGate;

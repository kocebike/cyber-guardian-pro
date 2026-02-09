import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Lock, 
  Eye, 
  Smartphone, 
  Wifi, 
  Bug, 
  Users,
  ChevronRight,
  Terminal
} from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { user, isPremium } = useAuth();

  const features = [
    { icon: Lock, title: t('features.password.title'), desc: t('features.password.desc'), color: 'text-primary', link: '/learn/password-security' },
    { icon: Eye, title: t('features.phishing.title'), desc: t('features.phishing.desc'), color: 'text-secondary', link: '/learn/phishing-protection' },
    { icon: Smartphone, title: t('features.2fa.title'), desc: t('features.2fa.desc'), color: 'text-accent', link: '/learn/2fa-setup' },
    { icon: Wifi, title: t('features.network.title'), desc: t('features.network.desc'), color: 'text-cyber-yellow', link: '/learn/network-security' },
    { icon: Bug, title: t('features.malware.title'), desc: t('features.malware.desc'), color: 'text-destructive', link: '/learn/malware-protection' },
    { icon: Users, title: t('features.social.title'), desc: t('features.social.desc'), color: 'text-cyber-purple', link: '/learn/social-engineering' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Terminal-style header */}
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2 mb-8">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">
                cybershield@security:~$ <span className="text-primary">./protect --full</span>
                <span className="terminal-cursor">_</span>
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">{t('hero.title').split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="text-primary cyber-glow-text">{t('hero.title').split(' ').slice(2).join(' ')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow text-lg px-8 py-6">
                      {t('nav.dashboard')}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  {!isPremium && (
                    <Link to="/pricing">
                      <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 py-6">
                        {t('hero.cta.premium')}
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow text-lg px-8 py-6">
                      {t('hero.cta')}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 py-6">
                      {t('hero.cta.premium')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">&lt;</span>
              {t('features.title')}
              <span className="text-primary">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative bg-card border border-border rounded-xl p-6 hover-lift cyber-border overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-muted mb-4 ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.desc}
                  </p>
                  
                  <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-sm">learn_more()</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 cyber-gradient opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6 cyber-glow-text" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {user ? t('dashboard.title') : t('hero.cta')}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              {t('hero.subtitle')}
            </p>
            
            <Link to={user ? '/dashboard' : '/signup'}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow">
                {user ? t('nav.dashboard') : t('hero.cta')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Lock, Eye, Smartphone, Wifi, Bug, Users, FileKey, Cloud, Mail,
  Crown, CheckCircle, Circle, LockKeyhole, Trophy
} from 'lucide-react';
import CertificateGenerator from '@/components/CertificateGenerator';

const ALL_MODULES = [
  'password-security', 'phishing-protection', '2fa-setup',
  'network-security', 'malware-protection', 'social-engineering',
  'data-privacy', 'mobile-security', 'cloud-security', 'email-security'
];

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, isPremium, loading } = useAuth();
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    supabase
      .from('quiz_results')
      .select('module_id, passed')
      .eq('user_id', user.id)
      .eq('passed', true)
      .then(({ data }) => {
        if (data) {
          setCompletedModules(new Set(data.map(r => r.module_id)));
        }
      });
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const modules = [
    { id: 'password-security', icon: Lock, title: t('features.password.title'), desc: t('features.password.desc'), color: 'text-primary', bgColor: 'bg-primary/10', premium: false },
    { id: 'phishing-protection', icon: Eye, title: t('features.phishing.title'), desc: t('features.phishing.desc'), color: 'text-secondary', bgColor: 'bg-secondary/10', premium: false },
    { id: '2fa-setup', icon: Smartphone, title: t('features.2fa.title'), desc: t('features.2fa.desc'), color: 'text-accent', bgColor: 'bg-accent/10', premium: true },
    { id: 'network-security', icon: Wifi, title: t('features.network.title'), desc: t('features.network.desc'), color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow/10', premium: true },
    { id: 'malware-protection', icon: Bug, title: t('features.malware.title'), desc: t('features.malware.desc'), color: 'text-destructive', bgColor: 'bg-destructive/10', premium: true },
    { id: 'social-engineering', icon: Users, title: t('features.social.title'), desc: t('features.social.desc'), color: 'text-cyber-purple', bgColor: 'bg-cyber-purple/10', premium: true },
    { id: 'data-privacy', icon: FileKey, title: t('features.privacy.title'), desc: t('features.privacy.desc'), color: 'text-accent', bgColor: 'bg-accent/10', premium: true },
    { id: 'mobile-security', icon: Smartphone, title: t('features.mobile.title'), desc: t('features.mobile.desc'), color: 'text-secondary', bgColor: 'bg-secondary/10', premium: true },
    { id: 'cloud-security', icon: Cloud, title: t('features.cloud.title'), desc: t('features.cloud.desc'), color: 'text-primary', bgColor: 'bg-primary/10', premium: true },
    { id: 'email-security', icon: Mail, title: t('features.email.title'), desc: t('features.email.desc'), color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow/10', premium: true },
  ];

  const completedCount = modules.filter(m => completedModules.has(m.id)).length;
  const accessibleCount = modules.filter(m => !m.premium || isPremium).length;
  const progressPercent = accessibleCount > 0 ? Math.round((completedCount / accessibleCount) * 100) : 0;

  const getStatus = (moduleId: string) => completedModules.has(moduleId) ? 'completed' : 'not-started';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return t('dashboard.completed');
      default: return t('dashboard.notStarted');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t('dashboard.welcome')}, {user.email?.split('@')[0]}!
            </h1>
            <div className="flex items-center gap-4">
              {isPremium ? (
                <Badge className="bg-primary/20 text-primary border-primary/50">
                  <Crown className="h-4 w-4 mr-1" /> Premium
                </Badge>
              ) : (
                <Link to="/pricing">
                  <Badge variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 cursor-pointer">
                    {t('hero.cta.premium')}
                  </Badge>
                </Link>
              )}
              {completedCount > 0 && (
                <Badge variant="outline" className="border-primary/50 text-primary">
                  <Trophy className="h-4 w-4 mr-1" /> {completedCount}/{accessibleCount}
                </Badge>
              )}
            </div>
          </div>

          <Card className="bg-card border-border cyber-border mb-8">
            <CardHeader>
              <CardTitle>{t('dashboard.progress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground font-mono">{progressPercent}%</span>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6">{t('dashboard.modules')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const isLocked = module.premium && !isPremium;
                const status = getStatus(module.id);
                
                return (
                  <Card 
                    key={module.id}
                    className={`bg-card border-border cyber-border relative overflow-hidden transition-all duration-300 ${
                      isLocked ? 'opacity-70' : 'hover-lift'
                    }`}
                  >
                    {module.premium && (
                      <div className="absolute top-3 right-3">
                        {isPremium ? <Crown className="h-5 w-5 text-primary" /> : <LockKeyhole className="h-5 w-5 text-muted-foreground" />}
                      </div>
                    )}
                    
                    <CardHeader className="pb-2">
                      <div className={`inline-flex p-3 rounded-lg ${module.bgColor} ${module.color} w-fit mb-2`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-2">{module.desc}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getStatusIcon(status)}
                          <span>{getStatusText(status)}</span>
                        </div>
                        
                        {isLocked ? (
                          <Link to="/pricing">
                            <Button size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                              {t('common.premium')}
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/learn/${module.id}`}>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                              {status === 'completed' ? '✓' : 'Start'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Certificate Section */}
          <div className="mt-8">
            <CertificateGenerator />
          </div>

          {!isPremium && (
            <Card className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/30 cyber-border">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <Crown className="h-6 w-6 text-primary" />
                      {t('content.premium.title')}
                    </h3>
                    <p className="text-muted-foreground">{t('content.premium.desc')}</p>
                  </div>
                  <Link to="/pricing">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow whitespace-nowrap">
                      {t('content.premium.cta')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

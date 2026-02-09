import { Link, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Lock, 
  Eye, 
  Smartphone, 
  Wifi, 
  Bug, 
  Users,
  Crown,
  CheckCircle,
  Circle,
  LockKeyhole
} from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, isPremium, loading } = useAuth();

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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const modules = [
    { 
      id: 'password-security',
      icon: Lock, 
      title: t('features.password.title'), 
      desc: t('features.password.desc'),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      premium: false,
      status: 'not-started'
    },
    { 
      id: 'phishing-protection',
      icon: Eye, 
      title: t('features.phishing.title'), 
      desc: t('features.phishing.desc'),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      premium: false,
      status: 'not-started'
    },
    { 
      id: '2fa-setup',
      icon: Smartphone, 
      title: t('features.2fa.title'), 
      desc: t('features.2fa.desc'),
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      premium: true,
      status: 'not-started'
    },
    { 
      id: 'network-security',
      icon: Wifi, 
      title: t('features.network.title'), 
      desc: t('features.network.desc'),
      color: 'text-cyber-yellow',
      bgColor: 'bg-cyber-yellow/10',
      premium: true,
      status: 'not-started'
    },
    { 
      id: 'malware-protection',
      icon: Bug, 
      title: t('features.malware.title'), 
      desc: t('features.malware.desc'),
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      premium: true,
      status: 'not-started'
    },
    { 
      id: 'social-engineering',
      icon: Users, 
      title: t('features.social.title'), 
      desc: t('features.social.desc'),
      color: 'text-cyber-purple',
      bgColor: 'bg-cyber-purple/10',
      premium: true,
      status: 'not-started'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'in-progress':
        return <Circle className="h-5 w-5 text-accent fill-accent/30" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('dashboard.completed');
      case 'in-progress':
        return t('dashboard.inProgress');
      default:
        return t('dashboard.notStarted');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t('dashboard.welcome')}, {user.email?.split('@')[0]}!
            </h1>
            <div className="flex items-center gap-4">
              {isPremium ? (
                <Badge className="bg-primary/20 text-primary border-primary/50">
                  <Crown className="h-4 w-4 mr-1" />
                  Premium
                </Badge>
              ) : (
                <Link to="/pricing">
                  <Badge variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 cursor-pointer">
                    {t('hero.cta.premium')}
                  </Badge>
                </Link>
              )}
            </div>
          </div>

          {/* Progress Section */}
          <Card className="bg-card border-border cyber-border mb-8">
            <CardHeader>
              <CardTitle>{t('dashboard.progress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500" />
                </div>
                <span className="text-sm text-muted-foreground font-mono">0%</span>
              </div>
            </CardContent>
          </Card>

          {/* Modules Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('dashboard.modules')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const isLocked = module.premium && !isPremium;
                
                return (
                  <Card 
                    key={module.id}
                    className={`bg-card border-border cyber-border relative overflow-hidden transition-all duration-300 ${
                      isLocked ? 'opacity-70' : 'hover-lift'
                    }`}
                  >
                    {module.premium && (
                      <div className="absolute top-3 right-3">
                        {isPremium ? (
                          <Crown className="h-5 w-5 text-primary" />
                        ) : (
                          <LockKeyhole className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    
                    <CardHeader className="pb-2">
                      <div className={`inline-flex p-3 rounded-lg ${module.bgColor} ${module.color} w-fit mb-2`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-2">
                        {module.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getStatusIcon(module.status)}
                          <span>{getStatusText(module.status)}</span>
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
                              Start
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

          {/* Premium CTA for non-premium users */}
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

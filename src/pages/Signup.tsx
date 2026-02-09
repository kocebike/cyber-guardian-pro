import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const { t } = useLanguage();
  const { signUp } = useAuth();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, displayName);

    if (error) {
      setError(error.message);
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error.message,
      });
    } else {
      setSuccess(true);
      toast({
        title: t('common.success'),
        description: t('auth.verify.message'),
      });
    }

    setLoading(false);
  };

  if (success) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md bg-card border-border cyber-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-primary cyber-glow-text" />
              </div>
              <CardTitle className="text-2xl font-bold">{t('auth.verify.title')}</CardTitle>
              <CardDescription className="text-muted-foreground mt-4">
                {t('auth.verify.message')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  {t('auth.signup.login')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md bg-card border-border cyber-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Shield className="h-12 w-12 text-primary cyber-glow-text" />
            </div>
            <CardTitle className="text-2xl font-bold">{t('auth.signup.title')}</CardTitle>
            <CardDescription className="text-muted-foreground">
              CyberShield
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="displayName">{t('auth.signup.name')}</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-muted border-border focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.signup.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="bg-muted border-border focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.signup.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-muted border-border focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.signup.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-muted border-border focus:border-primary"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  t('auth.signup.submit')
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t('auth.signup.hasAccount')}{' '}
              <Link to="/login" className="text-primary hover:underline">
                {t('auth.signup.login')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;

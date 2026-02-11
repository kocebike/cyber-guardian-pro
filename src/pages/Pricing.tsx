import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Check, Zap, Crown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Pricing = () => {
  const { t, language } = useLanguage();
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dynamicPrice, setDynamicPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const key = language === 'en' ? 'premium_price_display_en' : 'premium_price_display_bg';
      const { data } = await supabase
        .from('app_settings' as any)
        .select('value')
        .eq('key', key)
        .single();
      if (data) setDynamicPrice((data as any).value);
    };
    fetchPrice();
  }, [language]);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId: 'price_premium_monthly' },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error.message || 'Failed to create checkout session',
      });
    } finally {
      setLoading(false);
    }
  };

  const freeFeatures = [
    t('pricing.free.feature1'),
    t('pricing.free.feature2'),
    t('pricing.free.feature3'),
  ];

  const premiumFeatures = [
    t('pricing.premium.feature1'),
    t('pricing.premium.feature2'),
    t('pricing.premium.feature3'),
    t('pricing.premium.feature4'),
    t('pricing.premium.feature5'),
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-24 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('pricing.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-card border-border cyber-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
              
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-muted rounded-full">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">{t('pricing.free.title')}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">{t('pricing.free.price')}</span>
                  <span className="text-muted-foreground">{t('pricing.free.period')}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {user ? (
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full border-border hover:bg-muted">
                      {t('nav.dashboard')}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signup">
                    <Button variant="outline" className="w-full border-border hover:bg-muted">
                      {t('pricing.cta.free')}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-card border-primary/50 cyber-border relative overflow-hidden cyber-glow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              
              {/* Popular badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </span>
              </div>
              
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-primary/20 rounded-full">
                  <Crown className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">{t('pricing.premium.title')}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">{dynamicPrice || t('pricing.premium.price')}</span>
                  <span className="text-muted-foreground">{t('pricing.premium.period')}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {isPremium ? (
                  <Button className="w-full bg-primary/20 text-primary cursor-default" disabled>
                    ✓ {t('common.premium')}
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow"
                    onClick={handleSubscribe}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('common.loading')}
                      </>
                    ) : (
                      t('pricing.cta.premium')
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* FAQ or additional info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Stripe Secure Payments • Cancel Anytime • 7-Day Money Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;

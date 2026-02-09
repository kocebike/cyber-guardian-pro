import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Users, CreditCard, TrendingUp, Shield, Loader2 } from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  display_name: string;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  status: string;
  stripe_customer_id: string | null;
  current_period_end: string | null;
}

const Admin = () => {
  const { t } = useLanguage();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      try {
        // Fetch profiles
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch subscriptions
        const { data: subscriptionsData } = await supabase
          .from('user_subscriptions')
          .select('*');

        setProfiles(profilesData || []);
        setSubscriptions(subscriptionsData || []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const totalUsers = profiles.length;

  const getSubscriptionStatus = (userId: string) => {
    const sub = subscriptions.find(s => s.user_id === userId);
    return sub?.status || 'none';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Canceled</Badge>;
      case 'past_due':
        return <Badge variant="outline" className="border-destructive text-destructive">Past Due</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Free</Badge>;
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Shield className="h-8 w-8 text-secondary" />
              {t('admin.title')}
            </h1>
            <p className="text-muted-foreground">Управление на потребители и абонаменти</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('admin.users')}
                </CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalUsers}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Premium {t('admin.subscriptions')}
                </CardTitle>
                <CreditCard className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">{activeSubscriptions}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {totalUsers > 0 ? ((activeSubscriptions / totalUsers) * 100).toFixed(1) : 0}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="bg-card border-border cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('admin.users')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : profiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No users found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead>Email</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id} className="border-border">
                        <TableCell className="font-mono text-sm">
                          {profile.email || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {profile.display_name || '-'}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(getSubscriptionStatus(profile.user_id))}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

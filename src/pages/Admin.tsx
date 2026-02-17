import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, CreditCard, TrendingUp, Shield, Loader2, 
  BarChart3, Trophy, UserX, UserCheck, Crown,
  BookOpen, CheckCircle, XCircle, Settings, Save, Award, Pencil
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  status: string;
  stripe_customer_id: string | null;
  current_period_end: string | null;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

interface QuizResult {
  id: string;
  user_id: string;
  module_id: string;
  score: number;
  total_questions: number;
  passed: boolean;
  completed_at: string;
}

interface DiplomaRecord {
  id: string;
  user_id: string;
  full_name: string;
  cert_id: string;
  created_at: string;
}

interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

const MODULE_NAMES: Record<string, string> = {
  'password-security': 'Сигурност на паролите',
  'phishing-protection': 'Защита от фишинг',
  '2fa-setup': 'Двуфакторна автентикация',
  'network-security': 'Мрежова сигурност',
  'malware-protection': 'Защита от малуер',
  'social-engineering': 'Социално инженерство',
};

const Admin = () => {
  const { t } = useLanguage();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [diplomas, setDiplomas] = useState<DiplomaRecord[]>([]);
  const [editingDiploma, setEditingDiploma] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      try {
        const [profilesRes, subscriptionsRes, rolesRes, quizRes, settingsRes, diplomasRes] = await Promise.all([
          supabase.from('profiles').select('*').order('created_at', { ascending: false }),
          supabase.from('user_subscriptions').select('*'),
          supabase.from('user_roles').select('*'),
          supabase.from('quiz_results').select('*').order('completed_at', { ascending: false }),
          supabase.from('app_settings').select('*'),
          supabase.from('diplomas').select('*').order('created_at', { ascending: false }),
        ]);

        setProfiles(profilesRes.data || []);
        setSubscriptions(subscriptionsRes.data || []);
        setRoles(rolesRes.data || []);
        setQuizResults(quizRes.data || []);
        setDiplomas((diplomasRes.data || []) as unknown as DiplomaRecord[]);
        const fetchedSettings = (settingsRes.data || []) as unknown as AppSetting[];
        setSettings(fetchedSettings);
        const form: Record<string, string> = {};
        fetchedSettings.forEach(s => { form[s.key] = s.value; });
        setSettingsForm(form);
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

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const totalUsers = profiles.length;
  const totalQuizAttempts = quizResults.length;
  const passedQuizzes = quizResults.filter(q => q.passed).length;
  const passRate = totalQuizAttempts > 0 ? Math.round((passedQuizzes / totalQuizAttempts) * 100) : 0;

  const getSubscriptionStatus = (userId: string) => {
    const sub = subscriptions.find(s => s.user_id === userId);
    return sub?.status || 'none';
  };

  const getUserRole = (userId: string) => {
    const role = roles.find(r => r.user_id === userId);
    return role?.role || 'user';
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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Admin</Badge>;
      case 'moderator':
        return <Badge className="bg-accent/20 text-accent border-accent/30">Mod</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">User</Badge>;
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole as any })
        .eq('user_id', userId);

      if (error) throw error;

      setRoles(prev => prev.map(r => r.user_id === userId ? { ...r, role: newRole } : r));
      toast({ title: 'Ролята е обновена', description: `Потребителят е вече ${newRole}` });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Грешка', description: error.message });
    }
  };

  const handleSubscriptionChange = async (userId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ status: newStatus as any })
        .eq('user_id', userId);

      if (error) throw error;

      setSubscriptions(prev => prev.map(s => s.user_id === userId ? { ...s, status: newStatus } : s));
      toast({ title: 'Абонаментът е обновен', description: `Статус: ${newStatus}` });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Грешка', description: error.message });
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      for (const setting of settings) {
        if (settingsForm[setting.key] !== setting.value) {
          const { error } = await supabase
            .from('app_settings' as any)
            .update({ value: settingsForm[setting.key] } as any)
            .eq('key', setting.key);
          if (error) throw error;
        }
      }
      setSettings(prev => prev.map(s => ({ ...s, value: settingsForm[s.key] || s.value })));
      toast({ title: 'Настройките са запазени' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Грешка', description: error.message });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDiplomaNameUpdate = async (diplomaId: string, newName: string) => {
    try {
      const { error } = await supabase
        .from('diplomas')
        .update({ full_name: newName } as any)
        .eq('id', diplomaId);
      if (error) throw error;
      setDiplomas(prev => prev.map(d => d.id === diplomaId ? { ...d, full_name: newName } : d));
      setEditingDiploma(null);
      toast({ title: 'Името е обновено' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Грешка', description: error.message });
    }
  };

  // Module analytics
  const moduleStats = Object.keys(MODULE_NAMES).map(moduleId => {
    const moduleResults = quizResults.filter(q => q.module_id === moduleId);
    const modulePassed = moduleResults.filter(q => q.passed).length;
    const uniqueUsers = new Set(moduleResults.map(q => q.user_id)).size;
    const avgScore = moduleResults.length > 0
      ? Math.round(moduleResults.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) / moduleResults.length)
      : 0;
    return { moduleId, name: MODULE_NAMES[moduleId], attempts: moduleResults.length, passed: modulePassed, uniqueUsers, avgScore };
  });

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
            <p className="text-muted-foreground">Управление на потребители, абонаменти и съдържание</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Потребители</CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalUsers}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Premium</CardTitle>
                <Crown className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">{activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  {totalUsers > 0 ? ((activeSubscriptions / totalUsers) * 100).toFixed(1) : 0}% conversion
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Тестове</CardTitle>
                <BookOpen className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{totalQuizAttempts}</div>
                <p className="text-xs text-muted-foreground">{passedQuizzes} преминати</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border cyber-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pass Rate</CardTitle>
                <TrendingUp className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{passRate}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="bg-muted border border-border">
              <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="h-4 w-4 mr-2" /> Потребители
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart3 className="h-4 w-4 mr-2" /> Анализи
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="h-4 w-4 mr-2" /> Абонаменти
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy className="h-4 w-4 mr-2" /> Тестове
              </TabsTrigger>
              <TabsTrigger value="diplomas" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Award className="h-4 w-4 mr-2" /> Дипломи
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="h-4 w-4 mr-2" /> Настройки
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="bg-card border-border cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Управление на потребители
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead>Email</TableHead>
                            <TableHead>Име</TableHead>
                            <TableHead>Роля</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Регистрация</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {profiles.map((profile) => (
                            <TableRow key={profile.id} className="border-border">
                              <TableCell className="font-mono text-sm">{profile.email || 'N/A'}</TableCell>
                              <TableCell>{profile.display_name || '-'}</TableCell>
                              <TableCell>{getRoleBadge(getUserRole(profile.user_id))}</TableCell>
                              <TableCell>{getStatusBadge(getSubscriptionStatus(profile.user_id))}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {new Date(profile.created_at).toLocaleDateString('bg-BG')}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={getUserRole(profile.user_id)}
                                  onValueChange={(val) => handleRoleChange(profile.user_id, val)}
                                >
                                  <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card className="bg-card border-border cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Анализи по модули
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moduleStats.map((stat) => (
                      <div key={stat.moduleId} className="p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{stat.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{stat.uniqueUsers} уч.</span>
                            <span>{stat.attempts} опита</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                              style={{ width: `${stat.avgScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono w-12 text-right">{stat.avgScore}%</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-primary" /> {stat.passed} преминали
                          </span>
                          <span className="flex items-center gap-1">
                            <XCircle className="h-3 w-3 text-destructive" /> {stat.attempts - stat.passed} неуспешни
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions">
              <Card className="bg-card border-border cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-secondary" />
                    Управление на абонаменти
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead>Потребител</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Stripe ID</TableHead>
                          <TableHead>Изтича</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profiles.map((profile) => {
                          const sub = subscriptions.find(s => s.user_id === profile.user_id);
                          return (
                            <TableRow key={profile.id} className="border-border">
                              <TableCell className="font-mono text-sm">{profile.email || 'N/A'}</TableCell>
                              <TableCell>{getStatusBadge(sub?.status || 'none')}</TableCell>
                              <TableCell className="text-xs text-muted-foreground font-mono">
                                {sub?.stripe_customer_id || '-'}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {sub?.current_period_end
                                  ? new Date(sub.current_period_end).toLocaleDateString('bg-BG')
                                  : '-'}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={sub?.status || 'none'}
                                  onValueChange={(val) => handleSubscriptionChange(profile.user_id, val)}
                                >
                                  <SelectTrigger className="w-[130px] h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="canceled">Canceled</SelectItem>
                                    <SelectItem value="past_due">Past Due</SelectItem>
                                    <SelectItem value="trialing">Trialing</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes">
              <Card className="bg-card border-border cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Последни тестове
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead>Потребител</TableHead>
                          <TableHead>Модул</TableHead>
                          <TableHead>Резултат</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Дата</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quizResults.slice(0, 50).map((result) => {
                          const profile = profiles.find(p => p.user_id === result.user_id);
                          return (
                            <TableRow key={result.id} className="border-border">
                              <TableCell className="font-mono text-sm">
                                {profile?.email || result.user_id.slice(0, 8)}
                              </TableCell>
                              <TableCell className="text-sm">
                                {MODULE_NAMES[result.module_id] || result.module_id}
                              </TableCell>
                              <TableCell className="font-mono">
                                {result.score}/{result.total_questions} ({Math.round((result.score / result.total_questions) * 100)}%)
                              </TableCell>
                              <TableCell>
                                {result.passed ? (
                                  <Badge className="bg-primary/20 text-primary border-primary/30">
                                    <CheckCircle className="h-3 w-3 mr-1" /> Преминат
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive">
                                    <XCircle className="h-3 w-3 mr-1" /> Неуспешен
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {new Date(result.completed_at).toLocaleString('bg-BG')}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {quizResults.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              Няма резултати от тестове
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Diplomas Tab */}
            <TabsContent value="diplomas">
              <Card className="bg-card border-border cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Управление на дипломи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead>Потребител</TableHead>
                          <TableHead>Име на дипломата</TableHead>
                          <TableHead>Cert ID</TableHead>
                          <TableHead>Дата</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {diplomas.map((diploma) => {
                          const profile = profiles.find(p => p.user_id === diploma.user_id);
                          return (
                            <TableRow key={diploma.id} className="border-border">
                              <TableCell className="font-mono text-sm">{profile?.email || diploma.user_id.slice(0, 8)}</TableCell>
                              <TableCell>
                                {editingDiploma === diploma.id ? (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      value={editName}
                                      onChange={(e) => setEditName(e.target.value)}
                                      className="h-8 w-48"
                                    />
                                    <Button size="sm" onClick={() => handleDiplomaNameUpdate(diploma.id, editName)}>
                                      <Save className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditingDiploma(null)}>
                                      ✕
                                    </Button>
                                  </div>
                                ) : (
                                  <span className="font-medium">{diploma.full_name}</span>
                                )}
                              </TableCell>
                              <TableCell className="font-mono text-xs text-muted-foreground">{diploma.cert_id}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {new Date(diploma.created_at).toLocaleDateString('bg-BG')}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => { setEditingDiploma(diploma.id); setEditName(diploma.full_name); }}
                                >
                                  <Pencil className="h-3 w-3 mr-1" /> Редактирай
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {diplomas.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              Няма издадени дипломи
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="bg-card border-border cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Настройки на приложението
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="premium_price_cents">Цена Premium (EUR центове)</Label>
                      <Input
                        id="premium_price_cents"
                        type="number"
                        value={settingsForm['premium_price_cents'] || ''}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, premium_price_cents: e.target.value }))}
                        placeholder="299"
                      />
                      <p className="text-xs text-muted-foreground">
                        299 = 2.99€, 499 = 4.99€, 999 = 9.99€
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="premium_price_display_bg">Показвана цена (BG)</Label>
                      <Input
                        id="premium_price_display_bg"
                        value={settingsForm['premium_price_display_bg'] || ''}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, premium_price_display_bg: e.target.value }))}
                        placeholder="2.99 €"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="premium_price_display_en">Показвана цена (EN)</Label>
                      <Input
                        id="premium_price_display_en"
                        value={settingsForm['premium_price_display_en'] || ''}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, premium_price_display_en: e.target.value }))}
                        placeholder="€2.99"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} disabled={savingSettings}>
                    {savingSettings ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Запазване...</>
                    ) : (
                      <><Save className="mr-2 h-4 w-4" /> Запази настройките</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

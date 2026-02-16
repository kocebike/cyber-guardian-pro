import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Award, Download, CheckCircle, Lock } from 'lucide-react';
import jsPDF from 'jspdf';

const ALL_MODULES = [
  'password-security', 'phishing-protection', '2fa-setup',
  'network-security', 'malware-protection', 'social-engineering',
  'data-privacy', 'mobile-security', 'cloud-security', 'email-security'
];

const CertificateGenerator = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);

  const isBg = language === 'bg';

  useEffect(() => {
    if (!user) return;
    supabase
      .from('quiz_results')
      .select('module_id')
      .eq('user_id', user.id)
      .eq('passed', true)
      .then(({ data }) => {
        if (data) setCompletedModules(new Set(data.map(r => r.module_id)));
        setLoading(false);
      });
  }, [user]);

  const allCompleted = ALL_MODULES.every(m => completedModules.has(m));
  const completedCount = ALL_MODULES.filter(m => completedModules.has(m)).length;

  const generatePDF = () => {
    if (!fullName.trim()) return;

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const w = 297;
    const h = 210;

    // Background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, w, h, 'F');

    // Border
    doc.setDrawColor(0, 255, 136);
    doc.setLineWidth(2);
    doc.rect(10, 10, w - 20, h - 20);
    doc.setLineWidth(0.5);
    doc.rect(14, 14, w - 28, h - 28);

    // Corner accents
    const cornerSize = 15;
    doc.setDrawColor(0, 255, 136);
    doc.setLineWidth(1.5);
    // Top-left
    doc.line(10, 10, 10 + cornerSize, 10);
    doc.line(10, 10, 10, 10 + cornerSize);
    // Top-right
    doc.line(w - 10, 10, w - 10 - cornerSize, 10);
    doc.line(w - 10, 10, w - 10, 10 + cornerSize);
    // Bottom-left
    doc.line(10, h - 10, 10 + cornerSize, h - 10);
    doc.line(10, h - 10, 10, h - 10 - cornerSize);
    // Bottom-right
    doc.line(w - 10, h - 10, w - 10 - cornerSize, h - 10);
    doc.line(w - 10, h - 10, w - 10, h - 10 - cornerSize);

    // Shield icon (simple geometric)
    const cx = w / 2;
    doc.setFillColor(0, 255, 136);
    doc.setDrawColor(0, 255, 136);
    // Simple shield shape
    doc.circle(cx, 38, 12, 'S');
    doc.setFontSize(16);
    doc.setTextColor(0, 255, 136);
    doc.text('🛡️', cx - 5, 42);

    // Title
    doc.setFontSize(14);
    doc.setTextColor(0, 255, 136);
    doc.text(isBg ? 'СЕРТИФИКАТ' : 'CERTIFICATE', cx, 60, { align: 'center' });

    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text(isBg ? 'ДИПЛОМА ЗА КИБЕРСИГУРНОСТ' : 'CYBERSECURITY DIPLOMA', cx, 75, { align: 'center' });

    // Decorative line
    doc.setDrawColor(0, 255, 136);
    doc.setLineWidth(0.8);
    doc.line(cx - 60, 82, cx + 60, 82);

    // "Awarded to"
    doc.setFontSize(12);
    doc.setTextColor(148, 163, 184);
    doc.text(isBg ? 'Присъдена на' : 'Awarded to', cx, 95, { align: 'center' });

    // Name
    doc.setFontSize(28);
    doc.setTextColor(0, 255, 136);
    doc.text(fullName.trim(), cx, 112, { align: 'center' });

    // Decorative line under name
    doc.setLineWidth(0.5);
    doc.line(cx - 50, 117, cx + 50, 117);

    // Description
    doc.setFontSize(11);
    doc.setTextColor(203, 213, 225);
    const desc = isBg
      ? 'За успешно завършване на всички модули по киберсигурност'
      : 'For successfully completing all cybersecurity modules';
    doc.text(desc, cx, 130, { align: 'center' });

    const desc2 = isBg
      ? `и преминаване на ${ALL_MODULES.length} теста с успех`
      : `and passing all ${ALL_MODULES.length} quizzes successfully`;
    doc.text(desc2, cx, 138, { align: 'center' });

    // Modules list (compact)
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const moduleNames = isBg
      ? ['Пароли', 'Фишинг', '2FA', 'Мрежи', 'Малуер', 'Соц. инж.', 'Данни', 'Мобилна', 'Облак', 'Имейл']
      : ['Passwords', 'Phishing', '2FA', 'Network', 'Malware', 'Social Eng.', 'Privacy', 'Mobile', 'Cloud', 'Email'];
    doc.text(moduleNames.join('  •  '), cx, 150, { align: 'center' });

    // Date and ID
    const date = new Date().toLocaleDateString(isBg ? 'bg-BG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const certId = `CS-${Date.now().toString(36).toUpperCase()}`;

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(isBg ? `Дата: ${date}` : `Date: ${date}`, cx - 50, 170, { align: 'center' });
    doc.text(`ID: ${certId}`, cx + 50, 170, { align: 'center' });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text('CyberShield Academy', cx, 185, { align: 'center' });

    // Hex pattern decorations (subtle)
    doc.setDrawColor(0, 255, 136, 0.1);
    doc.setLineWidth(0.2);
    for (let i = 0; i < 6; i++) {
      doc.circle(25 + i * 8, 30, 3, 'S');
      doc.circle(w - 25 - i * 8, 30, 3, 'S');
      doc.circle(25 + i * 8, h - 30, 3, 'S');
      doc.circle(w - 25 - i * 8, h - 30, 3, 'S');
    }

    doc.save(isBg ? 'Диплома-Киберсигурност.pdf' : 'Cybersecurity-Diploma.pdf');
  };

  if (loading) return null;

  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {isBg ? '🎓 Диплома за завършване' : '🎓 Completion Diploma'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isBg
                ? `${completedCount}/${ALL_MODULES.length} модула завършени`
                : `${completedCount}/${ALL_MODULES.length} modules completed`}
            </p>
          </div>
        </div>

        {/* Progress grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {ALL_MODULES.map((m) => {
            const done = completedModules.has(m);
            const names: Record<string, string> = {
              'password-security': isBg ? 'Пароли' : 'Passwords',
              'phishing-protection': isBg ? 'Фишинг' : 'Phishing',
              '2fa-setup': '2FA',
              'network-security': isBg ? 'Мрежи' : 'Network',
              'malware-protection': isBg ? 'Малуер' : 'Malware',
              'social-engineering': isBg ? 'Соц. инж.' : 'Social Eng.',
              'data-privacy': isBg ? 'Данни' : 'Privacy',
              'mobile-security': isBg ? 'Мобилна' : 'Mobile',
              'cloud-security': isBg ? 'Облак' : 'Cloud',
              'email-security': isBg ? 'Имейл' : 'Email',
            };
            return (
              <div
                key={m}
                className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg transition-colors ${
                  done ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {done ? <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" /> : <Lock className="h-3.5 w-3.5 flex-shrink-0" />}
                {names[m] || m}
              </div>
            );
          })}
        </div>

        {allCompleted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-primary font-medium text-sm mb-3">
                🎉 {isBg ? 'Поздравления! Завършихте всички модули!' : 'Congratulations! You completed all modules!'}
              </p>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm">
                  {isBg ? 'Вашето пълно име (за дипломата)' : 'Your full name (for the diploma)'}
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isBg ? 'Иван Иванов' : 'John Smith'}
                  className="bg-background"
                />
              </div>
            </div>
            <Button
              onClick={generatePDF}
              disabled={!fullName.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              {isBg ? 'Изтегли дипломата (PDF)' : 'Download Diploma (PDF)'}
            </Button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-muted-foreground text-sm">
              {isBg
                ? `Завършете всички ${ALL_MODULES.length} теста успешно, за да получите дипломата си.`
                : `Complete all ${ALL_MODULES.length} quizzes successfully to receive your diploma.`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificateGenerator;

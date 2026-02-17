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

const MODULE_NAMES_BG: Record<string, string> = {
  'password-security': 'Пароли',
  'phishing-protection': 'Фишинг',
  '2fa-setup': '2FA',
  'network-security': 'Мрежи',
  'malware-protection': 'Малуер',
  'social-engineering': 'Соц. инж.',
  'data-privacy': 'Данни',
  'mobile-security': 'Мобилна',
  'cloud-security': 'Облак',
  'email-security': 'Имейл',
};

const MODULE_NAMES_EN: Record<string, string> = {
  'password-security': 'Passwords',
  'phishing-protection': 'Phishing',
  '2fa-setup': '2FA',
  'network-security': 'Network',
  'malware-protection': 'Malware',
  'social-engineering': 'Social Eng.',
  'data-privacy': 'Privacy',
  'mobile-security': 'Mobile',
  'cloud-security': 'Cloud',
  'email-security': 'Email',
};

async function loadFont(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

interface DiplomaRecord {
  full_name: string;
  cert_id: string;
  created_at: string;
}

const CertificateGenerator = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [diploma, setDiploma] = useState<DiplomaRecord | null>(null);

  const isBg = language === 'bg';

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase
        .from('quiz_results')
        .select('module_id')
        .eq('user_id', user.id)
        .eq('passed', true),
      supabase
        .from('diplomas')
        .select('full_name, cert_id, created_at')
        .eq('user_id', user.id)
        .limit(1)
        .single(),
    ]).then(([quizRes, diplomaRes]) => {
      if (quizRes.data) setCompletedModules(new Set(quizRes.data.map(r => r.module_id)));
      if (diplomaRes.data) setDiploma(diplomaRes.data as DiplomaRecord);
      setLoading(false);
    });
  }, [user]);

  const allCompleted = ALL_MODULES.every(m => completedModules.has(m));
  const completedCount = ALL_MODULES.filter(m => completedModules.has(m)).length;

  const generateAndDownloadPDF = async (name: string, certId: string, createdAt: string) => {
    setGenerating(true);
    try {
      const [regularBase64, boldBase64] = await Promise.all([
        loadFont('/fonts/Roboto-Regular.ttf'),
        loadFont('/fonts/Roboto-Bold.ttf'),
      ]);

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
      doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
      doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
      doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
      doc.setFont('Roboto', 'normal');

      const w = 297, h = 210;

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
      doc.line(10, 10, 10 + cornerSize, 10);
      doc.line(10, 10, 10, 10 + cornerSize);
      doc.line(w - 10, 10, w - 10 - cornerSize, 10);
      doc.line(w - 10, 10, w - 10, 10 + cornerSize);
      doc.line(10, h - 10, 10 + cornerSize, h - 10);
      doc.line(10, h - 10, 10, h - 10 - cornerSize);
      doc.line(w - 10, h - 10, w - 10 - cornerSize, h - 10);
      doc.line(w - 10, h - 10, w - 10, h - 10 - cornerSize);

      const cx = w / 2;

      doc.setFont('Roboto', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(0, 255, 136);
      doc.text(isBg ? 'СЕРТИФИКАТ' : 'CERTIFICATE', cx, 55, { align: 'center' });

      doc.setFont('Roboto', 'bold');
      doc.setFontSize(30);
      doc.setTextColor(255, 255, 255);
      doc.text(isBg ? 'ДИПЛОМА ЗА КИБЕРСИГУРНОСТ' : 'CYBERSECURITY DIPLOMA', cx, 72, { align: 'center' });

      doc.setDrawColor(0, 255, 136);
      doc.setLineWidth(0.8);
      doc.line(cx - 60, 78, cx + 60, 78);

      doc.setFont('Roboto', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(148, 163, 184);
      doc.text(isBg ? 'Присъдена на' : 'Awarded to', cx, 92, { align: 'center' });

      doc.setFont('Roboto', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(0, 255, 136);
      doc.text(name, cx, 108, { align: 'center' });

      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 255, 136);
      doc.line(cx - 50, 114, cx + 50, 114);

      doc.setFont('Roboto', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(203, 213, 225);
      const desc = isBg
        ? 'За успешно завършване на всички модули по киберсигурност'
        : 'For successfully completing all cybersecurity modules';
      doc.text(desc, cx, 127, { align: 'center' });
      const desc2 = isBg
        ? `и преминаване на ${ALL_MODULES.length} теста с успех`
        : `and passing all ${ALL_MODULES.length} quizzes successfully`;
      doc.text(desc2, cx, 135, { align: 'center' });

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const names = isBg ? MODULE_NAMES_BG : MODULE_NAMES_EN;
      const moduleList = ALL_MODULES.map(m => names[m] || m).join('  •  ');
      doc.text(moduleList, cx, 148, { align: 'center' });

      const date = new Date(createdAt).toLocaleDateString(isBg ? 'bg-BG' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text(isBg ? `Дата: ${date}` : `Date: ${date}`, cx - 50, 168, { align: 'center' });
      doc.text(`ID: ${certId}`, cx + 50, 168, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text('CyberShield Academy', cx, 185, { align: 'center' });

      doc.setDrawColor(30, 50, 70);
      doc.setLineWidth(0.2);
      for (let i = 0; i < 6; i++) {
        doc.circle(25 + i * 8, 30, 3, 'S');
        doc.circle(w - 25 - i * 8, 30, 3, 'S');
        doc.circle(25 + i * 8, h - 30, 3, 'S');
        doc.circle(w - 25 - i * 8, h - 30, 3, 'S');
      }

      doc.save(isBg ? 'Диплома-Киберсигурност.pdf' : 'Cybersecurity-Diploma.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleFirstGenerate = async () => {
    if (!fullName.trim() || !user) return;
    setGenerating(true);
    const certId = `CS-${Date.now().toString(36).toUpperCase()}`;
    try {
      const { error } = await supabase.from('diplomas').insert({
        user_id: user.id,
        full_name: fullName.trim(),
        cert_id: certId,
      });
      if (error) throw error;
      const now = new Date().toISOString();
      setDiploma({ full_name: fullName.trim(), cert_id: certId, created_at: now });
      await generateAndDownloadPDF(fullName.trim(), certId, now);
    } catch (error) {
      console.error('Error saving diploma:', error);
      setGenerating(false);
    }
  };

  if (loading) return null;

  const moduleNames = isBg ? MODULE_NAMES_BG : MODULE_NAMES_EN;

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

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {ALL_MODULES.map((m) => {
            const done = completedModules.has(m);
            return (
              <div
                key={m}
                className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg transition-colors ${
                  done ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {done ? <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" /> : <Lock className="h-3.5 w-3.5 flex-shrink-0" />}
                {moduleNames[m] || m}
              </div>
            );
          })}
        </div>

        {diploma ? (
          /* Already generated — can only re-download */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-primary font-medium text-sm mb-1">
                ✅ {isBg ? 'Дипломата е издадена на:' : 'Diploma issued to:'}
              </p>
              <p className="text-lg font-bold">{diploma.full_name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                ID: {diploma.cert_id} • {new Date(diploma.created_at).toLocaleDateString(isBg ? 'bg-BG' : 'en-US')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {isBg
                  ? 'Ако искате да промените името, свържете се с администратор.'
                  : 'To change the name, contact an administrator.'}
              </p>
            </div>
            <Button
              onClick={() => generateAndDownloadPDF(diploma.full_name, diploma.cert_id, diploma.created_at)}
              disabled={generating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              {generating
                ? (isBg ? 'Генериране...' : 'Generating...')
                : (isBg ? 'Изтегли дипломата (PDF)' : 'Download Diploma (PDF)')}
            </Button>
          </div>
        ) : allCompleted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-primary font-medium text-sm mb-3">
                🎉 {isBg ? 'Поздравления! Завършихте всички модули!' : 'Congratulations! You completed all modules!'}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                ⚠️ {isBg
                  ? 'Внимание: Името не може да бъде променено след генериране на дипломата.'
                  : 'Warning: The name cannot be changed after generating the diploma.'}
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
              onClick={handleFirstGenerate}
              disabled={!fullName.trim() || generating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              {generating
                ? (isBg ? 'Генериране...' : 'Generating...')
                : (isBg ? 'Генерирай и изтегли дипломата' : 'Generate & Download Diploma')}
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

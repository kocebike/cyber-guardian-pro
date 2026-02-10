import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import ModuleQuiz from '@/components/ModuleQuiz';
import { quizData } from '@/data/quizData';
import { 
  ArrowLeft, 
  ArrowRight,
  Smartphone,
  Shield,
  Key,
  MessageSquare,
  Mail,
  Crown
} from 'lucide-react';

const TwoFactorAuth = () => {
  const { t, language } = useLanguage();
  const { isPremium, user } = useAuth();

  // Premium content gate
  if (user && !isPremium) {
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
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {t('content.premium.desc')}
                </p>
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

  const content = {
    bg: {
      title: 'Двуфакторна автентикация (2FA)',
      subtitle: 'Добавете допълнителен слой защита към акаунтите си',
      sections: [
        {
          title: 'Какво е 2FA?',
          content: `Двуфакторната автентикация (2FA) добавя втори слой защита към вашите акаунти. Дори хакер да открадне паролата ви, без втория фактор не може да влезе.

Три фактора на автентикация:
🔐 Нещо, което ЗНАЕТЕ (парола, PIN)
📱 Нещо, което ИМАТЕ (телефон, ключ)
👤 Нещо, което СТЕ (пръстов отпечатък, лице)

2FA комбинира два от тези фактора за максимална сигурност.`,
        },
        {
          title: 'Видове 2FA',
          content: `📱 Authenticator приложения (НАЙ-ПРЕПОРЪЧВАН)
   • Google Authenticator
   • Microsoft Authenticator
   • Authy
   • Генерират 6-цифрен код на всеки 30 секунди

📨 SMS кодове (по-малко сигурен)
   • Получавате код чрез SMS
   • ⚠️ Уязвим към SIM swapping атаки

🔑 Хардуерни ключове (НАЙ-СИГУРЕН)
   • YubiKey, Google Titan
   • Физическо устройство
   • Практически непробиваем

📧 Имейл кодове
   • По-удобен, но по-малко сигурен`,
        },
        {
          title: 'Как да настроите 2FA',
          content: `Стъпка по стъпка:

1. Изтеглете Authenticator приложение
   Препоръчваме: Google Authenticator или Authy

2. Влезте в настройките на акаунта
   Security → Two-Factor Authentication

3. Сканирайте QR кода с приложението

4. Въведете 6-цифрения код за потвърждение

5. ВАЖНО: Запазете резервните кодове!
   Съхранявайте ги на сигурно място
   (на хартия, в сейф, криптиран файл)

6. Тествайте като излезете и влезете отново`,
        },
        {
          title: 'Резервни кодове',
          content: `Резервните кодове са КРИТИЧНО важни!

Какво са?
• Еднократни кодове за достъп
• Работят без телефон
• Обикновено получавате 8-10 кода

Кога да ги използвате:
• Загубен телефон
• Повреден телефон
• Смяна на устройство

Как да ги съхранявате:
✓ Отпечатайте и сложете в сейф
✓ Запишете в криптиран файл
✓ Използвайте парола мениджър
✗ НЕ ги снимайте на телефона
✗ НЕ ги изпращайте по имейл`,
        },
        {
          title: 'Къде да активирате 2FA',
          content: `Приоритетни акаунти:

🏦 Банки и финансови услуги
📧 Имейл (Gmail, Outlook)
💼 Работни акаунти
📱 Apple ID / Google акаунт
🔐 Парола мениджър
📸 Социални мрежи
🎮 Gaming платформи (Steam, PlayStation)
☁️ Cloud услуги (Dropbox, Google Drive)

Правило: Ако има 2FA опция - ВКЛЮЧЕТЕ Я!`,
        },
      ],
    },
    en: {
      title: 'Two-Factor Authentication (2FA)',
      subtitle: 'Add an extra layer of protection to your accounts',
      sections: [
        {
          title: 'What is 2FA?',
          content: `Two-factor authentication (2FA) adds a second layer of protection to your accounts. Even if a hacker steals your password, they can't log in without the second factor.

Three factors of authentication:
🔐 Something you KNOW (password, PIN)
📱 Something you HAVE (phone, key)
👤 Something you ARE (fingerprint, face)

2FA combines two of these factors for maximum security.`,
        },
        {
          title: 'Types of 2FA',
          content: `📱 Authenticator apps (MOST RECOMMENDED)
   • Google Authenticator
   • Microsoft Authenticator
   • Authy
   • Generate 6-digit code every 30 seconds

📨 SMS codes (less secure)
   • Receive code via SMS
   • ⚠️ Vulnerable to SIM swapping attacks

🔑 Hardware keys (MOST SECURE)
   • YubiKey, Google Titan
   • Physical device
   • Virtually unbreakable

📧 Email codes
   • More convenient but less secure`,
        },
        {
          title: 'How to set up 2FA',
          content: `Step by step:

1. Download an Authenticator app
   Recommended: Google Authenticator or Authy

2. Go to account settings
   Security → Two-Factor Authentication

3. Scan the QR code with the app

4. Enter the 6-digit code to confirm

5. IMPORTANT: Save the backup codes!
   Store them in a safe place
   (on paper, in a safe, encrypted file)

6. Test by logging out and logging back in`,
        },
        {
          title: 'Backup codes',
          content: `Backup codes are CRITICALLY important!

What are they?
• One-time access codes
• Work without a phone
• Usually you get 8-10 codes

When to use them:
• Lost phone
• Broken phone
• Device change

How to store them:
✓ Print and put in a safe
✓ Save in an encrypted file
✓ Use a password manager
✗ DON'T take a photo on your phone
✗ DON'T send them via email`,
        },
        {
          title: 'Where to enable 2FA',
          content: `Priority accounts:

🏦 Banks and financial services
📧 Email (Gmail, Outlook)
💼 Work accounts
📱 Apple ID / Google account
🔐 Password manager
📸 Social networks
🎮 Gaming platforms (Steam, PlayStation)
☁️ Cloud services (Dropbox, Google Drive)

Rule: If there's a 2FA option - TURN IT ON!`,
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back button */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('content.back')}
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-accent/10 rounded-xl">
                <Smartphone className="h-10 w-10 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{currentContent.title}</h1>
                  <Crown className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-muted-foreground">{currentContent.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <Card key={index} className="bg-card border-border cyber-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-accent via-primary to-secondary" />
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-mono text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed bg-transparent p-0">
                      {section.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Quiz Section */}
            <ModuleQuiz
              moduleId="2fa-setup"
              questions={quizData['2fa-setup'][language === 'bg' ? 'bg' : 'en'] || quizData['2fa-setup'].bg}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Link to="/learn/phishing-protection">
              <Button variant="outline" className="border-border hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('content.prev')}
              </Button>
            </Link>
            
            <Link to="/learn/network-security">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('content.next')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TwoFactorAuth;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import ModuleQuiz from '@/components/ModuleQuiz';
import LearnMediaBlock from '@/components/LearnMediaBlock';
import LearnAccessGate from '@/components/LearnAccessGate';
import { quizData } from '@/data/quizData';
import { 
  ArrowLeft, 
  ArrowRight,
  Lock,
  Key,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

const PasswordSecurity = () => {
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const content = {
    bg: {
      title: 'Сигурност на паролите',
      subtitle: 'Научете как да създавате непробиваеми пароли',
      sections: [
        {
          title: 'Защо паролите са важни?',
          content: `Паролите са първата линия на защита за вашите онлайн акаунти. Слабата парола може да бъде разбита за секунди, докато силната парола може да устои на атаки с години.

Факти:
• 81% от пробивите в сигурността са заради слаби или откраднати пароли
• Средният хакер може да разбие 8-символна парола за по-малко от 1 час
• Password123 се среща в над 10 милиона компрометирани акаунта`,
          // To add media to a section, add a "media" array:
          // media: [
          //   { type: 'image', src: '/images/password-stats.png', alt: 'Password statistics', caption: 'Статистика за пароли' },
          //   { type: 'video', src: 'https://www.youtube.com/embed/VIDEO_ID', alt: 'Video about passwords', caption: 'Видео урок' },
          // ],
        },
        {
          title: 'Как да създадете силна парола?',
          content: `Силната парола трябва да:

✓ Бъде поне 12-16 символа дълга
✓ Съдържа главни и малки букви
✓ Включва цифри и специални символи
✓ НЕ съдържа лична информация (рождени дати, имена)
✓ НЕ е дума от речника

Примери за ЛОШИ пароли:
• password123
• qwerty2024
• ivan1990

Примери за ДОБРИ пароли:
• K9#mPx$2nL@vQ4
• Tr0ub4dor&3Horse`,
        },
        {
          title: 'Мениджъри на пароли',
          content: `Използвайте мениджър на пароли за:

• Съхранение на всички пароли на сигурно място
• Генериране на уникални, силни пароли
• Автоматично попълване на формуляри
• Синхронизация между устройства

Препоръчани мениджъри:
🔐 Bitwarden (безплатен и open-source)
🔐 1Password (платен, много функции)
🔐 Dashlane (добър за начинаещи)
🔐 KeePass (локално съхранение)`,
        },
        {
          title: 'Допълнителни съвети',
          content: `• Никога не споделяйте паролите си
• Не използвайте една парола за няколко сайта
• Сменяйте паролите на всеки 3-6 месеца
• Активирайте двуфакторна автентикация (2FA)
• Проверете дали паролата ви е компрометирана на haveibeenpwned.com
• Не записвайте паролите на лепящи бележки!`,
        },
      ],
    },
    en: {
      title: 'Password Security',
      subtitle: 'Learn how to create unbreakable passwords',
      sections: [
        {
          title: 'Why are passwords important?',
          content: `Passwords are the first line of defense for your online accounts. A weak password can be cracked in seconds, while a strong password can withstand attacks for years.

Facts:
• 81% of security breaches are due to weak or stolen passwords
• The average hacker can crack an 8-character password in less than 1 hour
• Password123 appears in over 10 million compromised accounts`,
        },
        {
          title: 'How to create a strong password?',
          content: `A strong password should:

✓ Be at least 12-16 characters long
✓ Contain uppercase and lowercase letters
✓ Include numbers and special characters
✓ NOT contain personal information (birthdays, names)
✓ NOT be a dictionary word

Examples of BAD passwords:
• password123
• qwerty2024
• john1990

Examples of GOOD passwords:
• K9#mPx$2nL@vQ4
• Tr0ub4dor&3Horse`,
        },
        {
          title: 'Password Managers',
          content: `Use a password manager to:

• Store all passwords in a secure place
• Generate unique, strong passwords
• Auto-fill forms
• Sync across devices

Recommended managers:
🔐 Bitwarden (free and open-source)
🔐 1Password (paid, many features)
🔐 Dashlane (good for beginners)
🔐 KeePass (local storage)`,
        },
        {
          title: 'Additional Tips',
          content: `• Never share your passwords
• Don't use one password for multiple sites
• Change passwords every 3-6 months
• Enable two-factor authentication (2FA)
• Check if your password was compromised at haveibeenpwned.com
• Don't write passwords on sticky notes!`,
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  return (
    <LearnAccessGate>
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
              <div className="p-4 bg-primary/10 rounded-xl">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{currentContent.title}</h1>
                <p className="text-muted-foreground">{currentContent.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <Card key={index} className="bg-card border-border cyber-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-mono text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed bg-transparent p-0">
                      {section.content}
                    </pre>
                  </div>
                  {'media' in section && (section as any).media && (
                    <LearnMediaBlock media={(section as any).media} />
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Interactive Password Generator */}
            <Card className="bg-card border-primary/30 cyber-border overflow-hidden">
              <div className="h-1 bg-primary" />
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Key className="h-6 w-6 text-primary" />
                  {language === 'bg' ? 'Генератор на пароли' : 'Password Generator'}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-lg p-4 font-mono text-lg flex items-center justify-between">
                      <span>{showPassword || !generatedPassword ? generatedPassword || '••••••••••••••••' : '••••••••••••••••'}</span>
                      {generatedPassword && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                          <button 
                            onClick={copyToClipboard}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Copy className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generatePassword}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Key className="mr-2 h-4 w-4" />
                    {language === 'bg' ? 'Генерирай нова парола' : 'Generate New Password'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Quiz Section */}
            <ModuleQuiz
              moduleId="password-security"
              questions={quizData['password-security'][language === 'bg' ? 'bg' : 'en'] || quizData['password-security'].bg}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Link to="/dashboard">
              <Button variant="outline" className="border-border hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('content.back')}
              </Button>
            </Link>
            
            <Link to="/learn/phishing-protection">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('content.next')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
    </LearnAccessGate>
  );
};

export default PasswordSecurity;

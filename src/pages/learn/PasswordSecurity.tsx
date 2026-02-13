import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Key, Eye, EyeOff, Copy } from 'lucide-react';

const PasswordSecurity = () => {
  const { language } = useLanguage();
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

• 81% от пробивите в сигурността са заради слаби или откраднати пароли
• Средният хакер може да разбие 8-символна парола за по-малко от 1 час
• Password123 се среща в над 10 милиона компрометирани акаунта`,
          highlight: 'warning' as const,
        },
        {
          title: 'Как да създадете силна парола?',
          content: `Силната парола трябва да:

✓ Бъде поне 12-16 символа дълга
✓ Съдържа главни и малки букви
✓ Включва цифри и специални символи
✗ НЕ съдържа лична информация (рождени дати, имена)
✗ НЕ е дума от речника

Примери за ДОБРИ пароли:
🔐 K9#mPx$2nL@vQ4
🔐 Tr0ub4dor&3Horse`,
          highlight: 'tip' as const,
        },
        {
          title: 'Мениджъри на пароли',
          content: `Използвайте мениджър на пароли за:

• Съхранение на всички пароли на сигурно място
• Генериране на уникални, силни пароли
• Автоматично попълване на формуляри
• Синхронизация между устройства

🔐 Bitwarden (безплатен и open-source)
🔐 1Password (платен, много функции)
🔐 Dashlane (добър за начинаещи)
🔐 KeePass (локално съхранение)`,
          highlight: 'success' as const,
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

• 81% of security breaches are due to weak or stolen passwords
• The average hacker can crack an 8-character password in less than 1 hour
• Password123 appears in over 10 million compromised accounts`,
          highlight: 'warning' as const,
        },
        {
          title: 'How to create a strong password?',
          content: `A strong password should:

✓ Be at least 12-16 characters long
✓ Contain uppercase and lowercase letters
✓ Include numbers and special characters
✗ NOT contain personal information (birthdays, names)
✗ NOT be a dictionary word

Examples of GOOD passwords:
🔐 K9#mPx$2nL@vQ4
🔐 Tr0ub4dor&3Horse`,
          highlight: 'tip' as const,
        },
        {
          title: 'Password Managers',
          content: `Use a password manager to:

• Store all passwords in a secure place
• Generate unique, strong passwords
• Auto-fill forms
• Sync across devices

🔐 Bitwarden (free and open-source)
🔐 1Password (paid, many features)
🔐 Dashlane (good for beginners)
🔐 KeePass (local storage)`,
          highlight: 'success' as const,
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

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  const interactiveBlock = (
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
                  <button onClick={() => setShowPassword(!showPassword)} className="p-1 hover:text-primary transition-colors">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(generatedPassword)} className="p-1 hover:text-primary transition-colors">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <Button onClick={generatePassword} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Key className="mr-2 h-4 w-4" />
            {language === 'bg' ? 'Генерирай нова парола' : 'Generate New Password'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <LearnModulePage
      moduleId="password-security"
      icon={Lock}
      colorClass="primary"
      content={currentContent}
      isPremium={false}
      nextLink="/learn/phishing-protection"
      interactiveBlock={interactiveBlock}
    />
  );
};

export default PasswordSecurity;

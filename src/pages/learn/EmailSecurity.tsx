import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Mail } from 'lucide-react';

const EmailSecurity = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Сигурност на имейла',
      subtitle: 'Защитете електронната си поща от атаки и злоупотреби',
      sections: [
        { title: 'Защо имейлът е мишена #1?', content: `Имейлът е най-използваният вектор за кибератаки:

• 91% от атаките започват с имейл
• Средно 1.2% от всички имейли са зловредни
• Бизнес имейл измамите (BEC) струват $2.7 милиарда годишно

📧 Хакерите предпочитат имейл защото:
🎯 Лесен достъп до милиони потребители
🔓 Хората отварят имейли по навик
💰 Висока възвръщаемост при ниски разходи` },
        { title: 'Видове имейл атаки', highlight: 'warning' as const, content: `⚠️ Фишинг имейли
   Имитиращи банки, доставчици, колеги

⚠️ Зловреден прикачен файл
   .exe, .zip, .docm файлове с вируси

⚠️ Business Email Compromise (BEC)
   Имейл от "шефа" с нареждане за превод

⚠️ Spam и scam
   Нигерийски принцове, фалшиви лотарии

⚠️ Email spoofing
   Фалшифициран адрес на подателя

⚠️ Credential harvesting
   "Паролата ви изтича, кликнете тук"` },
        { title: 'Как да защитите имейла си', highlight: 'success' as const, content: `✓ Активирайте 2FA за имейла
   Задължително! Имейлът е ключът към всичко

✓ Използвайте силна, уникална парола
   Минимум 16 символа за имейл акаунта

✓ Никога не отваряйте подозрителни прикачени файлове
   Сканирайте с VirusTotal преди отваряне

✓ Проверявайте адреса на подателя внимателно
   support@g00gle.com ≠ support@google.com

✓ Не кликайте на линкове - въведете URL ръчно
   Hover-нете за да видите истинския адрес

✓ Използвайте имейл криптиране за чувствителни данни
   PGP, S/MIME, или ProtonMail` },
        { title: 'Настройки за максимална сигурност', highlight: 'tip' as const, content: `1. Включете SPF, DKIM и DMARC (за бизнес имейли)
2. Изключете автоматичното зареждане на изображения
3. Използвайте различни имейли за различни цели
4. Настройте филтри за спам
5. Проверявайте "Активни сесии" периодично

• Личен имейл → за лични контакти
• Бизнес имейл → за работа
• "Спам" имейл → за регистрации в сайтове
• Секретен имейл → за банки и финанси` },
      ],
    },
    en: {
      title: 'Email Security',
      subtitle: 'Protect your email from attacks and abuse',
      sections: [
        { title: 'Why is email target #1?', content: `Email is the most used vector for cyberattacks:

• 91% of attacks start with an email
• On average 1.2% of all emails are malicious
• Business Email Compromise (BEC) costs $2.7 billion annually

📧 Hackers prefer email because:
🎯 Easy access to millions of users
🔓 People open emails out of habit
💰 High return at low cost` },
        { title: 'Types of email attacks', highlight: 'warning' as const, content: `⚠️ Phishing emails
   Imitating banks, suppliers, colleagues

⚠️ Malicious attachments
   .exe, .zip, .docm files with viruses

⚠️ Business Email Compromise (BEC)
   Email from "the boss" with wire transfer instructions

⚠️ Spam and scam
   Nigerian princes, fake lotteries

⚠️ Email spoofing
   Forged sender address

⚠️ Credential harvesting
   "Your password expires, click here"` },
        { title: 'How to protect your email', highlight: 'success' as const, content: `✓ Enable 2FA for email
   Mandatory! Email is the key to everything

✓ Use a strong, unique password
   Minimum 16 characters for email account

✓ Never open suspicious attachments
   Scan with VirusTotal before opening

✓ Check the sender's address carefully
   support@g00gle.com ≠ support@google.com

✓ Don't click links - type the URL manually
   Hover to see the real address

✓ Use email encryption for sensitive data
   PGP, S/MIME, or ProtonMail` },
        { title: 'Settings for maximum security', highlight: 'tip' as const, content: `1. Enable SPF, DKIM, and DMARC (for business emails)
2. Disable automatic image loading
3. Use different emails for different purposes
4. Set up spam filters
5. Check "Active sessions" periodically

• Personal email → for personal contacts
• Business email → for work
• "Spam" email → for website registrations
• Secret email → for banks and finances` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="email-security"
      icon={Mail}
      colorClass="cyber-yellow"
      content={currentContent}
      prevLink="/learn/cloud-security"
    />
  );
};

export default EmailSecurity;

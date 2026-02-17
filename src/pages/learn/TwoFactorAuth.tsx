import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Smartphone } from 'lucide-react';

const TwoFactorAuth = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Двуфакторна автентикация (2FA)',
      subtitle: 'Добавете допълнителен слой защита към акаунтите си',
      sections: [
        { title: 'Какво е 2FA?', content: `Двуфакторната автентикация (2FA) добавя втори слой защита към вашите акаунти. Дори хакер да открадне паролата ви, без втория фактор не може да влезе.

🔐 Нещо, което ЗНАЕТЕ (парола, PIN)
📱 Нещо, което ИМАТЕ (телефон, ключ)
👤 Нещо, което СТЕ (пръстов отпечатък, лице)

2FA комбинира два от тези фактора за максимална сигурност.` },
        { title: 'Видове 2FA', content: `📱 Authenticator приложения (НАЙ-ПРЕПОРЪЧВАН)
   Google Authenticator, Microsoft Authenticator, Authy
   Генерират 6-цифрен код на всеки 30 секунди

📨 SMS кодове (по-малко сигурен)
   Получавате код чрез SMS
   ⚠️ Уязвим към SIM swapping атаки

🔑 Хардуерни ключове (НАЙ-СИГУРЕН)
   YubiKey, Google Titan
   Практически непробиваем

📧 Имейл кодове
   По-удобен, но по-малко сигурен` },
        { title: 'Как да настроите 2FA', highlight: 'tip' as const, content: `1. Изтеглете Authenticator приложение
   Препоръчваме: Google Authenticator или Authy

2. Влезте в настройките на акаунта
   Security → Two-Factor Authentication

3. Сканирайте QR кода с приложението

4. Въведете 6-цифрения код за потвърждение

5. ВАЖНО: Запазете резервните кодове!
   Съхранявайте ги на сигурно място

6. Тествайте като излезете и влезете отново` },
        { title: 'Резервни кодове', highlight: 'warning' as const, content: `Резервните кодове са КРИТИЧНО важни!

• Еднократни кодове за достъп
• Работят без телефон
• Обикновено получавате 8-10 кода

✓ Отпечатайте и сложете в сейф
✓ Запишете в криптиран файл
✓ Използвайте парола мениджър
✗ НЕ ги снимайте на телефона
✗ НЕ ги изпращайте по имейл` },
        { title: 'Къде да активирате 2FA', highlight: 'success' as const, content: `🏦 Банки и финансови услуги
📧 Имейл (Gmail, Outlook)
💼 Работни акаунти
📱 Apple ID / Google акаунт
🔐 Парола мениджър
📸 Социални мрежи
🎮 Gaming платформи (Steam, PlayStation)
☁️ Cloud услуги (Dropbox, Google Drive)

Правило: Ако има 2FA опция - ВКЛЮЧЕТЕ Я!` },
      ],
    },
    en: {
      title: 'Two-Factor Authentication (2FA)',
      subtitle: 'Add an extra layer of protection to your accounts',
      sections: [
        { title: 'What is 2FA?', content: `Two-factor authentication (2FA) adds a second layer of protection to your accounts. Even if a hacker steals your password, they can't log in without the second factor.

🔐 Something you KNOW (password, PIN)
📱 Something you HAVE (phone, key)
👤 Something you ARE (fingerprint, face)

2FA combines two of these factors for maximum security.` },
        { title: 'Types of 2FA', content: `📱 Authenticator apps (MOST RECOMMENDED)
   Google Authenticator, Microsoft Authenticator, Authy
   Generate 6-digit code every 30 seconds

📨 SMS codes (less secure)
   Receive code via SMS
   ⚠️ Vulnerable to SIM swapping attacks

🔑 Hardware keys (MOST SECURE)
   YubiKey, Google Titan
   Virtually unbreakable

📧 Email codes
   More convenient but less secure` },
        { title: 'How to set up 2FA', highlight: 'tip' as const, content: `1. Download an Authenticator app
   Recommended: Google Authenticator or Authy

2. Go to account settings
   Security → Two-Factor Authentication

3. Scan the QR code with the app

4. Enter the 6-digit code to confirm

5. IMPORTANT: Save the backup codes!
   Store them in a safe place

6. Test by logging out and logging back in` },
        { title: 'Backup codes', highlight: 'warning' as const, content: `Backup codes are CRITICALLY important!

• One-time access codes
• Work without a phone
• Usually you get 8-10 codes

✓ Print and put in a safe
✓ Save in an encrypted file
✓ Use a password manager
✗ DON'T take a photo on your phone
✗ DON'T send them via email` },
        { title: 'Where to enable 2FA', highlight: 'success' as const, content: `🏦 Banks and financial services
📧 Email (Gmail, Outlook)
💼 Work accounts
📱 Apple ID / Google account
🔐 Password manager
📸 Social networks
🎮 Gaming platforms (Steam, PlayStation)
☁️ Cloud services (Dropbox, Google Drive)

Rule: If there's a 2FA option - TURN IT ON!` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="2fa-setup"
      icon={Smartphone}
      colorClass="accent"
      content={currentContent}
      isPremium={false}
      prevLink="/learn/phishing-protection"
      nextLink="/learn/network-security"
    />
  );
};

export default TwoFactorAuth;

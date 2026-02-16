import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Cloud } from 'lucide-react';

const CloudSecurity = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Облачна сигурност',
      subtitle: 'Защитете данните си в облачните услуги',
      sections: [
        { title: 'Какво е облачна сигурност?', content: `Облачната сигурност обхваща защитата на данни, приложения и инфраструктура в облачни платформи.

• 94% от компаниите използват облачни услуги
• 80% от пробивите в данни включват облачни ресурси
• Неправилната конфигурация е причина #1 за инциденти

📊 До 2025, 99% от облачните пробиви ще са по вина на потребителя
🔐 Споделената отговорност означава: облакът пази инфраструктурата, ВИЕ пазите данните си` },
        { title: 'Основни заплахи в облака', highlight: 'warning' as const, content: `⚠️ Изтичане на данни
   Неправилни разрешения, публични бъкети

⚠️ Превземане на акаунт
   Слаби пароли, липса на MFA

⚠️ Insecure APIs
   Незащитени програмни интерфейси

⚠️ Злонамерени вътрешни лица
   Служители с прекомерен достъп

⚠️ Ransomware в облака
   Криптиране на облачни файлове

⚠️ Shadow IT
   Неодобрени облачни услуги от служители` },
        { title: 'Как да се защитите', highlight: 'success' as const, content: `✓ Активирайте MFA навсякъде
   За всички облачни акаунти без изключение

✓ Принцип на минимален достъп
   Давайте само необходимите права

✓ Криптирайте данните си
   В покой и при трансфер (end-to-end)

✓ Редовни одити на достъпа
   Кой има достъп до какво? Проверявайте месечно

✓ Бекъпи извън облака
   3-2-1 правило: 3 копия, 2 носителя, 1 офлайн

✓ Мониторинг на активността
   Следете необичайни действия и логвания` },
        { title: 'Безопасно споделяне на файлове', highlight: 'tip' as const, content: `1. Използвайте линкове с изтичане на срока
2. Задавайте "само за четене" когато е възможно
3. Не споделяйте цели папки без нужда
4. Проверявайте периодично споделените файлове
5. Използвайте защитени с парола архиви за чувствителни данни

• Google Drive → Управление на споделянето
• Dropbox → Настройки за споделяне
• OneDrive → Контрол на достъпа
• Никога не споделяйте чрез публичен линк чувствителни данни!` },
      ],
    },
    en: {
      title: 'Cloud Security',
      subtitle: 'Protect your data in cloud services',
      sections: [
        { title: 'What is cloud security?', content: `Cloud security covers the protection of data, applications, and infrastructure in cloud platforms.

• 94% of companies use cloud services
• 80% of data breaches involve cloud resources
• Misconfiguration is the #1 cause of incidents

📊 By 2025, 99% of cloud breaches will be the user's fault
🔐 Shared responsibility means: the cloud protects infrastructure, YOU protect your data` },
        { title: 'Main cloud threats', highlight: 'warning' as const, content: `⚠️ Data leakage
   Incorrect permissions, public buckets

⚠️ Account takeover
   Weak passwords, lack of MFA

⚠️ Insecure APIs
   Unprotected programming interfaces

⚠️ Malicious insiders
   Employees with excessive access

⚠️ Cloud ransomware
   Encryption of cloud files

⚠️ Shadow IT
   Unapproved cloud services used by employees` },
        { title: 'How to protect yourself', highlight: 'success' as const, content: `✓ Enable MFA everywhere
   For all cloud accounts without exception

✓ Principle of least privilege
   Grant only necessary permissions

✓ Encrypt your data
   At rest and in transit (end-to-end)

✓ Regular access audits
   Who has access to what? Check monthly

✓ Backups outside the cloud
   3-2-1 rule: 3 copies, 2 media, 1 offline

✓ Activity monitoring
   Watch for unusual actions and logins` },
        { title: 'Safe file sharing', highlight: 'tip' as const, content: `1. Use links with expiration dates
2. Set "view only" when possible
3. Don't share entire folders unnecessarily
4. Periodically review shared files
5. Use password-protected archives for sensitive data

• Google Drive → Manage sharing
• Dropbox → Sharing settings
• OneDrive → Access control
• Never share sensitive data via public links!` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="cloud-security"
      icon={Cloud}
      colorClass="primary"
      content={currentContent}
      prevLink="/learn/mobile-security"
      nextLink="/learn/email-security"
    />
  );
};

export default CloudSecurity;

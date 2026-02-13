import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { FileKey } from 'lucide-react';

const DataPrivacy = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Поверителност на данните',
      subtitle: 'Защитете личната си информация в дигиталния свят',
      sections: [
        { title: 'Какво е поверителност на данните?', content: `Поверителността на данните означава контрол над вашата лична информация - кой я събира, как я използва и къде я съхранява.

• Всяко приложение събира данни за вас
• Социалните мрежи знаят повече за вас отколкото мислите
• Брокерите на данни продават профили за $0.01 до $200
• GDPR ви дава права, но трябва да ги упражнявате` },
        { title: 'Какви данни събират за вас?', highlight: 'warning' as const, content: `📍 Локация
   GPS, Wi-Fi точки, IP адрес

🔍 Търсения и история
   Всичко, което търсите и посещавате

📱 Устройство и навици
   Модел, ОС, колко време прекарвате в приложения

👤 Лична информация
   Имейл, телефон, рождена дата, снимки

💬 Комуникации
   Метаданни на съобщения и обаждания

🛒 Покупки
   Какво купувате, къде и колко харчите` },
        { title: 'Как да защитите данните си', highlight: 'success' as const, content: `✓ Прегледайте разрешенията на приложенията
   Камера, микрофон, локация - давайте само когато е нужно

✓ Използвайте браузър с поверителност
   Firefox, Brave, DuckDuckGo

✓ Изключете проследяването на реклами
   iOS: Settings → Privacy → Tracking
   Android: Settings → Google → Ads

✓ Криптирайте файловете и комуникацията си
   Signal за съобщения, VeraCrypt за файлове

✓ Редовно изтривайте стари акаунти
   Използвайте JustDeleteMe за помощ

✓ Четете политиките за поверителност
   Поне ключовите секции!` },
        { title: 'Вашите права по GDPR', highlight: 'tip' as const, content: `🇪🇺 Ако живеете в ЕС имате право на:

1. Достъп - да знаете какви данни се пазят
2. Коригиране - да поправите грешни данни
3. Изтриване - "правото да бъдете забравени"
4. Преносимост - да вземете данните си
5. Възражение - да спрете обработката
6. Ограничаване - да ограничите използването

• Изпратете DSAR (Data Subject Access Request) до компанията
• Имате право на отговор до 30 дни
• Подайте жалба до КЗЛД ако ви откажат` },
      ],
    },
    en: {
      title: 'Data Privacy',
      subtitle: 'Protect your personal information in the digital world',
      sections: [
        { title: 'What is data privacy?', content: `Data privacy means controlling your personal information - who collects it, how it's used, and where it's stored.

• Every app collects data about you
• Social networks know more about you than you think
• Data brokers sell profiles for $0.01 to $200
• GDPR gives you rights, but you need to exercise them` },
        { title: 'What data is collected about you?', highlight: 'warning' as const, content: `📍 Location
   GPS, Wi-Fi points, IP address

🔍 Searches and history
   Everything you search for and visit

📱 Device and habits
   Model, OS, how long you spend in apps

👤 Personal information
   Email, phone, birthday, photos

💬 Communications
   Message and call metadata

🛒 Purchases
   What you buy, where, and how much you spend` },
        { title: 'How to protect your data', highlight: 'success' as const, content: `✓ Review app permissions
   Camera, microphone, location - grant only when needed

✓ Use a privacy-focused browser
   Firefox, Brave, DuckDuckGo

✓ Disable ad tracking
   iOS: Settings → Privacy → Tracking
   Android: Settings → Google → Ads

✓ Encrypt your files and communications
   Signal for messaging, VeraCrypt for files

✓ Regularly delete old accounts
   Use JustDeleteMe for help

✓ Read privacy policies
   At least the key sections!` },
        { title: 'Your GDPR rights', highlight: 'tip' as const, content: `🇪🇺 If you live in the EU you have the right to:

1. Access - know what data is kept
2. Rectification - correct wrong data
3. Erasure - "the right to be forgotten"
4. Portability - take your data with you
5. Objection - stop processing
6. Restriction - limit usage

• Send a DSAR (Data Subject Access Request) to the company
• You have the right to a response within 30 days
• File a complaint with your data authority if refused` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="data-privacy"
      icon={FileKey}
      colorClass="accent"
      content={currentContent}
      prevLink="/learn/social-engineering"
      nextLink="/learn/mobile-security"
    />
  );
};

export default DataPrivacy;

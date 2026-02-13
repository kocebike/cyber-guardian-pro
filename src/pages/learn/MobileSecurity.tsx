import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Smartphone } from 'lucide-react';

const MobileSecurity = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Мобилна сигурност',
      subtitle: 'Защитете вашия смартфон и таблет от заплахи',
      sections: [
        { title: 'Защо мобилната сигурност е важна?', content: `Вашият телефон съдържа:

• Банкови приложения и карти
• Лични снимки и видеа
• Имейл и съобщения
• Социални мрежи
• GPS локация 24/7
• Достъп до работни системи

📱 Средният човек проверява телефона си 96 пъти на ден
🔓 47% от хората не използват заключване на екрана
📊 Мобилните атаки са се увеличили с 50% за 2024` },
        { title: 'Основни мерки за защита', highlight: 'success' as const, content: `✓ Заключване на екрана
   Използвайте биометрия + 6-цифрен PIN (не 4-цифрен!)

✓ Актуализирайте операционната система
   Включете автоматични обновявания

✓ Инсталирайте приложения САМО от официални магазини
   Google Play Store / Apple App Store

✓ Проверявайте разрешенията на приложенията
   Камера, микрофон, контакти - само когато е нужно

✓ Активирайте "Find My Device"
   iOS: Find My iPhone
   Android: Find My Device

✓ Криптирайте устройството
   Обикновено е включено по подразбиране` },
        { title: 'Опасности за мобилните устройства', highlight: 'warning' as const, content: `⚠️ Фалшиви приложения
   Имитират популярни приложения, крадат данни

⚠️ Публичен Wi-Fi
   Man-in-the-Middle атаки, подслушване

⚠️ SMS фишинг (Smishing)
   "Имате неплатена пратка, кликнете тук"

⚠️ QR кодове
   Могат да водят към зловредни сайтове

⚠️ Juice jacking
   Зареждане от публични USB станции
   Използвайте собствено зарядно или USB data blocker

⚠️ SIM swapping
   Хакери прехвърлят номера ви
   Заключете SIM с PIN код` },
        { title: 'Ако загубите телефона си', highlight: 'tip' as const, content: `1. Използвайте Find My Device за намиране
2. Заключете устройството дистанционно
3. Изтрийте данните ако не можете да го намерите
4. Сменете паролите на важните акаунти
5. Уведомете банката си
6. Блокирайте SIM картата чрез оператора
7. Подайте сигнал в полицията

• Правете редовни бекъпи в облака
• Записвайте IMEI номера (наберете *#06#)
• Имайте план за действие предварително` },
      ],
    },
    en: {
      title: 'Mobile Security',
      subtitle: 'Protect your smartphone and tablet from threats',
      sections: [
        { title: 'Why is mobile security important?', content: `Your phone contains:

• Banking apps and cards
• Personal photos and videos
• Email and messages
• Social networks
• GPS location 24/7
• Access to work systems

📱 Average person checks phone 96 times a day
🔓 47% of people don't use screen lock
📊 Mobile attacks increased by 50% in 2024` },
        { title: 'Basic protection measures', highlight: 'success' as const, content: `✓ Screen lock
   Use biometrics + 6-digit PIN (not 4-digit!)

✓ Update the operating system
   Enable automatic updates

✓ Install apps ONLY from official stores
   Google Play Store / Apple App Store

✓ Check app permissions
   Camera, microphone, contacts - only when needed

✓ Enable "Find My Device"
   iOS: Find My iPhone
   Android: Find My Device

✓ Encrypt the device
   Usually enabled by default` },
        { title: 'Mobile device dangers', highlight: 'warning' as const, content: `⚠️ Fake apps
   Imitate popular apps, steal data

⚠️ Public Wi-Fi
   Man-in-the-Middle attacks, eavesdropping

⚠️ SMS phishing (Smishing)
   "You have an unpaid delivery, click here"

⚠️ QR codes
   Can lead to malicious sites

⚠️ Juice jacking
   Charging from public USB stations
   Use your own charger or USB data blocker

⚠️ SIM swapping
   Hackers transfer your number
   Lock SIM with PIN code` },
        { title: 'If you lose your phone', highlight: 'tip' as const, content: `1. Use Find My Device to locate
2. Lock the device remotely
3. Wipe data if you can't find it
4. Change passwords for important accounts
5. Notify your bank
6. Block the SIM card through your carrier
7. File a police report

• Make regular cloud backups
• Write down your IMEI number (dial *#06#)
• Have an action plan in advance` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="mobile-security"
      icon={Smartphone}
      colorClass="secondary"
      content={currentContent}
      prevLink="/learn/data-privacy"
    />
  );
};

export default MobileSecurity;

import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Wifi } from 'lucide-react';

const NetworkSecurity = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Мрежова сигурност',
      subtitle: 'Защитете вашата домашна и корпоративна мрежа',
      sections: [
        { title: 'Защита на домашния Wi-Fi', highlight: 'tip' as const, content: `🔐 Сменете фабричната парола на рутера
   Използвайте силна парола (16+ символа)

📡 Изберете правилно криптиране
✓ WPA3 (най-сигурен)
✓ WPA2-AES
✗ WEP (много слаб - ИЗБЯГВАЙТЕ)
✗ WPA-TKIP (остарял)

🔄 Актуализирайте фърмуера на рутера редовно

📛 Сменете името на мрежата (SSID)
   Не използвайте лична информация` },
        { title: 'VPN - Виртуална частна мрежа', content: `• Криптира интернет трафика ви
• Скрива IP адреса ви
• Защитава данните в публични Wi-Fi

✓ Публични Wi-Fi мрежи (кафенета, летища)
✓ При достъп до чувствителна информация
✓ За поверителност от ISP

🔐 NordVPN
🔐 ExpressVPN
🔐 ProtonVPN (има безплатен план)
🔐 Mullvad VPN` },
        { title: 'Защита от атаки', highlight: 'warning' as const, content: `🎭 Man-in-the-Middle (MITM)
   Хакерът се поставя между вас и сървъра
   Защита: Използвайте HTTPS и VPN

🔍 Packet Sniffing
   Прихващане на незашифрован трафик
   Защита: Криптирана комуникация

🌊 DDoS атаки
   Претоварване на мрежата
   Защита: Firewall, CDN услуги

🚪 Port Scanning
   Търсене на отворени портове
   Защита: Затворете неизползвани портове` },
        { title: 'Firewall настройки', highlight: 'success' as const, content: `• Блокира неоторизиран достъп
• Филтрира входящ/изходящ трафик
• Защитава от малуер

1. Control Panel → Windows Firewall
2. Включете за всички мрежи
3. Блокирайте входящи връзки по подразбиране
4. Позволете само нужните приложения

✓ Активирайте SPI (Stateful Packet Inspection)
✓ Блокирайте пинг от WAN
✓ Деактивирайте UPnP ако не е нужен` },
      ],
    },
    en: {
      title: 'Network Security',
      subtitle: 'Protect your home and corporate network',
      sections: [
        { title: 'Securing your home Wi-Fi', highlight: 'tip' as const, content: `🔐 Change the factory router password
   Use a strong password (16+ characters)

📡 Choose proper encryption
✓ WPA3 (most secure)
✓ WPA2-AES
✗ WEP (very weak - AVOID)
✗ WPA-TKIP (outdated)

🔄 Update router firmware regularly

📛 Change network name (SSID)
   Don't use personal information` },
        { title: 'VPN - Virtual Private Network', content: `• Encrypts your internet traffic
• Hides your IP address
• Protects data on public Wi-Fi

✓ Public Wi-Fi networks (cafes, airports)
✓ When accessing sensitive information
✓ For privacy from ISP

🔐 NordVPN
🔐 ExpressVPN
🔐 ProtonVPN (has free plan)
🔐 Mullvad VPN` },
        { title: 'Protection from attacks', highlight: 'warning' as const, content: `🎭 Man-in-the-Middle (MITM)
   Hacker positions between you and server
   Protection: Use HTTPS and VPN

🔍 Packet Sniffing
   Intercepting unencrypted traffic
   Protection: Encrypted communication

🌊 DDoS attacks
   Overloading the network
   Protection: Firewall, CDN services

🚪 Port Scanning
   Searching for open ports
   Protection: Close unused ports` },
        { title: 'Firewall settings', highlight: 'success' as const, content: `• Blocks unauthorized access
• Filters incoming/outgoing traffic
• Protects from malware

1. Control Panel → Windows Firewall
2. Enable for all networks
3. Block incoming connections by default
4. Allow only necessary applications

✓ Enable SPI (Stateful Packet Inspection)
✓ Block ping from WAN
✓ Disable UPnP if not needed` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="network-security"
      icon={Wifi}
      colorClass="cyber-yellow"
      content={currentContent}
      isPremium={false}
      prevLink="/learn/2fa-setup"
      nextLink="/learn/malware-protection"
    />
  );
};

export default NetworkSecurity;

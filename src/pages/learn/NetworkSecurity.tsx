import { Link } from 'react-router-dom';
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
  Wifi,
  Shield,
  Lock,
  Router,
  Crown
} from 'lucide-react';

const NetworkSecurity = () => {
  const { t, language } = useLanguage();
  const { isPremium, user } = useAuth();

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
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t('content.premium.desc')}</p>
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
      title: 'Мрежова сигурност',
      subtitle: 'Защитете вашата домашна и корпоративна мрежа',
      sections: [
        {
          title: 'Защита на домашния Wi-Fi',
          content: `Основни стъпки за сигурен Wi-Fi:

🔐 Сменете фабричната парола на рутера
   • Използвайте силна парола (16+ символа)
   • Не използвайте лични данни

📡 Изберете правилно криптиране
   ✓ WPA3 (най-сигурен)
   ✓ WPA2-AES
   ✗ WEP (много слаб - ИЗБЯГВАЙТЕ)
   ✗ WPA-TKIP (остарял)

🔄 Актуализирайте фърмуера на рутера редовно

📛 Сменете името на мрежата (SSID)
   • Не използвайте лична информация
   • Скрийте SSID за допълнителна защита`,
        },
        {
          title: 'VPN - Виртуална частна мрежа',
          content: `Какво прави VPN?
• Криптира интернет трафика ви
• Скрива IP адреса ви
• Защитава данните в публични Wi-Fi

Кога да използвате VPN:
✓ Публични Wi-Fi мрежи (кафенета, летища)
✓ При достъп до чувствителна информация
✓ За поверителност от ISP
✓ За достъп до блокирано съдържание

Препоръчани VPN услуги:
🔐 NordVPN
🔐 ExpressVPN
🔐 ProtonVPN (има безплатен план)
🔐 Mullvad VPN`,
        },
        {
          title: 'Защита от атаки',
          content: `Чести мрежови атаки:

🎭 Man-in-the-Middle (MITM)
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
   Защита: Затворете неизползвани портове`,
        },
        {
          title: 'Firewall настройки',
          content: `Защо ви трябва firewall?
• Блокира неоторизиран достъп
• Филтрира входящ/изходящ трафик
• Защитава от малуер

Windows Firewall настройки:
1. Control Panel → Windows Firewall
2. Включете за всички мрежи
3. Блокирайте входящи връзки по подразбиране
4. Позволете само нужните приложения

Рутер Firewall:
• Активирайте SPI (Stateful Packet Inspection)
• Блокирайте пинг от WAN
• Деактивирайте UPnP ако не е нужен
• Настройте DMZ само ако е необходимо`,
        },
      ],
    },
    en: {
      title: 'Network Security',
      subtitle: 'Protect your home and corporate network',
      sections: [
        {
          title: 'Securing your home Wi-Fi',
          content: `Basic steps for secure Wi-Fi:

🔐 Change the factory router password
   • Use a strong password (16+ characters)
   • Don't use personal data

📡 Choose proper encryption
   ✓ WPA3 (most secure)
   ✓ WPA2-AES
   ✗ WEP (very weak - AVOID)
   ✗ WPA-TKIP (outdated)

🔄 Update router firmware regularly

📛 Change network name (SSID)
   • Don't use personal information
   • Hide SSID for extra protection`,
        },
        {
          title: 'VPN - Virtual Private Network',
          content: `What does VPN do?
• Encrypts your internet traffic
• Hides your IP address
• Protects data on public Wi-Fi

When to use VPN:
✓ Public Wi-Fi networks (cafes, airports)
✓ When accessing sensitive information
✓ For privacy from ISP
✓ To access blocked content

Recommended VPN services:
🔐 NordVPN
🔐 ExpressVPN
🔐 ProtonVPN (has free plan)
🔐 Mullvad VPN`,
        },
        {
          title: 'Protection from attacks',
          content: `Common network attacks:

🎭 Man-in-the-Middle (MITM)
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
   Protection: Close unused ports`,
        },
        {
          title: 'Firewall settings',
          content: `Why do you need a firewall?
• Blocks unauthorized access
• Filters incoming/outgoing traffic
• Protects from malware

Windows Firewall settings:
1. Control Panel → Windows Firewall
2. Enable for all networks
3. Block incoming connections by default
4. Allow only necessary applications

Router Firewall:
• Enable SPI (Stateful Packet Inspection)
• Block ping from WAN
• Disable UPnP if not needed
• Set up DMZ only if necessary`,
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('content.back')}
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-cyber-yellow/10 rounded-xl">
                <Wifi className="h-10 w-10 text-cyber-yellow" />
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

          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <Card key={index} className="bg-card border-border cyber-border overflow-hidden">
                <div className="h-1 bg-cyber-yellow" />
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyber-yellow/20 text-cyber-yellow font-mono text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </h2>
                  <pre className="whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed bg-transparent p-0">
                    {section.content}
                  </pre>
                </CardContent>
              </Card>
            ))}
            {/* Quiz Section */}
            <ModuleQuiz
              moduleId="network-security"
              questions={quizData['network-security'][language === 'bg' ? 'bg' : 'en'] || quizData['network-security'].bg}
            />
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Link to="/learn/2fa-setup">
              <Button variant="outline" className="border-border hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('content.prev')}
              </Button>
            </Link>
            <Link to="/learn/malware-protection">
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

export default NetworkSecurity;

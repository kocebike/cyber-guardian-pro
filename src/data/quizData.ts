import type { QuizQuestion } from '@/components/ModuleQuiz';

type QuizDataMap = Record<string, { bg: QuizQuestion[]; en: QuizQuestion[] }>;

export const quizData: QuizDataMap = {
  'password-security': {
    bg: [
      { question: 'Каква е минималната препоръчителна дължина на силна парола?', options: ['6 символа', '8 символа', '12 символа', '4 символа'], correctIndex: 2 },
      { question: 'Кое от следните е пример за СЛАБА парола?', options: ['K9#mPx$2nL@vQ4', 'password123', 'Tr0ub4dor&3Horse', 'j8$Kp2!mNq#5'], correctIndex: 1 },
      { question: 'Какъв процент от пробивите са заради слаби пароли?', options: ['50%', '65%', '81%', '35%'], correctIndex: 2 },
      { question: 'Кой от следните мениджъри на пароли е безплатен и open-source?', options: ['1Password', 'Dashlane', 'Bitwarden', 'LastPass'], correctIndex: 2 },
      { question: 'На колко време трябва да сменяте паролите си?', options: ['Всеки месец', 'Всеки 3-6 месеца', 'Веднъж годишно', 'Никога'], correctIndex: 1 },
    ],
    en: [
      { question: 'What is the minimum recommended length for a strong password?', options: ['6 characters', '8 characters', '12 characters', '4 characters'], correctIndex: 2 },
      { question: 'Which of the following is a WEAK password?', options: ['K9#mPx$2nL@vQ4', 'password123', 'Tr0ub4dor&3Horse', 'j8$Kp2!mNq#5'], correctIndex: 1 },
      { question: 'What percentage of breaches are due to weak passwords?', options: ['50%', '65%', '81%', '35%'], correctIndex: 2 },
      { question: 'Which password manager is free and open-source?', options: ['1Password', 'Dashlane', 'Bitwarden', 'LastPass'], correctIndex: 2 },
      { question: 'How often should you change your passwords?', options: ['Every month', 'Every 3-6 months', 'Once a year', 'Never'], correctIndex: 1 },
    ],
  },
  'phishing-protection': {
    bg: [
      { question: 'Какво е фишинг?', options: ['Вид антивирус', 'Кибератака за кражба на данни чрез измама', 'Програма за криптиране', 'Мрежов протокол'], correctIndex: 1 },
      { question: 'Кой от тези имейл адреси е подозрителен?', options: ['support@amazon.com', 'no-reply@google.com', 'security@amaz0n-account.com', 'help@microsoft.com'], correctIndex: 2 },
      { question: 'Какво е "spear phishing"?', options: ['Масова имейл атака', 'Насочена атака към конкретен човек', 'Телефонна измама', 'SMS фишинг'], correctIndex: 1 },
      { question: 'Какво трябва да направите ако получите фишинг имейл?', options: ['Кликнете на линка', 'Отговорете на имейла', 'Докладвайте като спам и изтрийте', 'Препратете го на приятели'], correctIndex: 2 },
      { question: 'Какво е "vishing"?', options: ['Видео фишинг', 'Телефонна измама', 'Вирус', 'VPN атака'], correctIndex: 1 },
    ],
    en: [
      { question: 'What is phishing?', options: ['A type of antivirus', 'A cyber attack to steal data through deception', 'An encryption program', 'A network protocol'], correctIndex: 1 },
      { question: 'Which email address is suspicious?', options: ['support@amazon.com', 'no-reply@google.com', 'security@amaz0n-account.com', 'help@microsoft.com'], correctIndex: 2 },
      { question: 'What is "spear phishing"?', options: ['Mass email attack', 'Targeted attack on a specific person', 'Phone scam', 'SMS phishing'], correctIndex: 1 },
      { question: 'What should you do if you receive a phishing email?', options: ['Click the link', 'Reply to the email', 'Report as spam and delete', 'Forward to friends'], correctIndex: 2 },
      { question: 'What is "vishing"?', options: ['Video phishing', 'Phone scam', 'A virus', 'VPN attack'], correctIndex: 1 },
    ],
  },
  '2fa-setup': {
    bg: [
      { question: 'Какво означава 2FA?', options: ['Два файъруола', 'Двуфакторна автентикация', 'Двойно криптиране', 'Два антивируса'], correctIndex: 1 },
      { question: 'Кой метод за 2FA е НАЙ-СИГУРЕН?', options: ['SMS кодове', 'Имейл кодове', 'Хардуерни ключове', 'Парола'], correctIndex: 2 },
      { question: 'Защо SMS кодовете са по-малко сигурни?', options: ['Твърде бавни са', 'Уязвими към SIM swapping', 'Много скъпи', 'Не работят навсякъде'], correctIndex: 1 },
      { question: 'Какво представляват резервните кодове?', options: ['Пароли за WiFi', 'Еднократни кодове за достъп без телефон', 'Серийни номера', 'Кодове за отстъпка'], correctIndex: 1 },
      { question: 'Къде НЕ трябва да съхранявате резервни кодове?', options: ['В сейф', 'В криптиран файл', 'Снимка на телефона', 'Парола мениджър'], correctIndex: 2 },
    ],
    en: [
      { question: 'What does 2FA stand for?', options: ['Two Firewalls', 'Two-Factor Authentication', 'Double Encryption', 'Two Antiviruses'], correctIndex: 1 },
      { question: 'Which 2FA method is MOST SECURE?', options: ['SMS codes', 'Email codes', 'Hardware keys', 'Password'], correctIndex: 2 },
      { question: 'Why are SMS codes less secure?', options: ['Too slow', 'Vulnerable to SIM swapping', 'Very expensive', "Don't work everywhere"], correctIndex: 1 },
      { question: 'What are backup codes?', options: ['WiFi passwords', 'One-time access codes without phone', 'Serial numbers', 'Discount codes'], correctIndex: 1 },
      { question: 'Where should you NOT store backup codes?', options: ['In a safe', 'In an encrypted file', 'Photo on your phone', 'Password manager'], correctIndex: 2 },
    ],
  },
  'network-security': {
    bg: [
      { question: 'Кое криптиране за WiFi е най-сигурно?', options: ['WEP', 'WPA-TKIP', 'WPA3', 'Без криптиране'], correctIndex: 2 },
      { question: 'Какво прави VPN?', options: ['Ускорява интернета', 'Криптира трафика и скрива IP', 'Блокира реклами', 'Инсталира антивирус'], correctIndex: 1 },
      { question: 'Какво е Man-in-the-Middle атака?', options: ['Хакер се поставя между вас и сървъра', 'Вирус в компютъра', 'Спам имейл', 'Физическа кражба'], correctIndex: 0 },
      { question: 'Кога е ЗАДЪЛЖИТЕЛНО да използвате VPN?', options: ['У дома', 'В публичен WiFi', 'Само на работа', 'Никога'], correctIndex: 1 },
      { question: 'Какво е SPI в контекста на firewall?', options: ['Simple Password Interface', 'Stateful Packet Inspection', 'Secure Protocol Integration', 'System Protection Index'], correctIndex: 1 },
    ],
    en: [
      { question: 'Which WiFi encryption is most secure?', options: ['WEP', 'WPA-TKIP', 'WPA3', 'No encryption'], correctIndex: 2 },
      { question: 'What does a VPN do?', options: ['Speeds up internet', 'Encrypts traffic and hides IP', 'Blocks ads', 'Installs antivirus'], correctIndex: 1 },
      { question: 'What is a Man-in-the-Middle attack?', options: ['Hacker positions between you and server', 'Computer virus', 'Spam email', 'Physical theft'], correctIndex: 0 },
      { question: 'When is VPN MANDATORY?', options: ['At home', 'On public WiFi', 'Only at work', 'Never'], correctIndex: 1 },
      { question: 'What is SPI in the context of firewall?', options: ['Simple Password Interface', 'Stateful Packet Inspection', 'Secure Protocol Integration', 'System Protection Index'], correctIndex: 1 },
    ],
  },
  'malware-protection': {
    bg: [
      { question: 'Какво е рансъмуер?', options: ['Антивирус', 'Малуер който криптира файлове и иска откуп', 'Защитна стена', 'Тип мрежа'], correctIndex: 1 },
      { question: 'Какво е правилото 3-2-1 за бекъпи?', options: ['3 пароли, 2 имейла, 1 телефон', '3 копия, 2 носителя, 1 офлайн', '3 антивируса, 2 firewall, 1 VPN', '3 дни, 2 часа, 1 минута'], correctIndex: 1 },
      { question: 'Кой признак НЕ е знак за заразяване?', options: ['Бавен компютър', 'Нова актуализация от Windows Update', 'Браузърът се пренасочва', 'Антивирусът е деактивиран'], correctIndex: 1 },
      { question: 'Какво трябва да направите ПЪРВО при заразяване?', options: ['Рестартирайте компютъра', 'Изключете интернет връзката', 'Инсталирайте нов браузър', 'Сменете паролата'], correctIndex: 1 },
      { question: 'Какво е ботнет?', options: ['Мрежа от роботи', 'Мрежа от заразени компютри "зомбита"', 'Тип VPN', 'Антивирусна програма'], correctIndex: 1 },
    ],
    en: [
      { question: 'What is ransomware?', options: ['Antivirus', 'Malware that encrypts files and demands ransom', 'Firewall', 'Network type'], correctIndex: 1 },
      { question: 'What is the 3-2-1 backup rule?', options: ['3 passwords, 2 emails, 1 phone', '3 copies, 2 media, 1 offline', '3 antiviruses, 2 firewalls, 1 VPN', '3 days, 2 hours, 1 minute'], correctIndex: 1 },
      { question: 'Which sign is NOT an indication of infection?', options: ['Slow computer', 'New Windows Update', 'Browser redirects', 'Antivirus disabled'], correctIndex: 1 },
      { question: 'What should you do FIRST when infected?', options: ['Restart computer', 'Disconnect from internet', 'Install new browser', 'Change password'], correctIndex: 1 },
      { question: 'What is a botnet?', options: ['Robot network', 'Network of infected "zombie" computers', 'Type of VPN', 'Antivirus program'], correctIndex: 1 },
    ],
  },
  'social-engineering': {
    bg: [
      { question: 'Какво е социално инженерство?', options: ['Вид програмиране', 'Манипулация на хора за разкриване на информация', 'Социална мрежа', 'Инженерна специалност'], correctIndex: 1 },
      { question: 'Какво е "pretexting"?', options: ['Изпращане на вирус', 'Измислена история за манипулация', 'Хакване на WiFi', 'Тип криптиране'], correctIndex: 1 },
      { question: 'Какво е "tailgating"?', options: ['Следване на кола', 'Влизане в сграда зад служител', 'Тип фишинг', 'Мрежова атака'], correctIndex: 1 },
      { question: 'Как се защитавате от социално инженерство?', options: ['Инсталирайте антивирус', 'Винаги проверявайте самоличността на обаждащия се', 'Сменете паролата', 'Използвайте VPN'], correctIndex: 1 },
      { question: 'Кое от следните е пример за "baiting"?', options: ['Фишинг имейл', 'USB с примамливо име на паркинг', 'Телефонно обаждане', 'Хакване на WiFi'], correctIndex: 1 },
    ],
    en: [
      { question: 'What is social engineering?', options: ['A type of programming', 'Manipulating people to reveal information', 'A social network', 'An engineering specialty'], correctIndex: 1 },
      { question: 'What is "pretexting"?', options: ['Sending a virus', 'A made-up story for manipulation', 'WiFi hacking', 'A type of encryption'], correctIndex: 1 },
      { question: 'What is "tailgating"?', options: ['Following a car', 'Entering a building behind an employee', 'A type of phishing', 'A network attack'], correctIndex: 1 },
      { question: 'How do you protect against social engineering?', options: ['Install antivirus', 'Always verify the caller\'s identity', 'Change password', 'Use VPN'], correctIndex: 1 },
      { question: 'Which is an example of "baiting"?', options: ['Phishing email', 'USB with enticing name in parking lot', 'Phone call', 'WiFi hacking'], correctIndex: 1 },
    ],
  },
};

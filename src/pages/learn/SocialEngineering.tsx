import { useLanguage } from '@/contexts/LanguageContext';
import LearnModulePage from '@/components/LearnModulePage';
import { Users } from 'lucide-react';

const SocialEngineering = () => {
  const { language } = useLanguage();

  const content = {
    bg: {
      title: 'Социално инженерство',
      subtitle: 'Разберете как хакерите манипулират хората',
      sections: [
        { title: 'Какво е социално инженерство?', content: `Социалното инженерство е изкуството да се манипулират хора, за да разкрият поверителна информация или да извършат действия.

Хакерите използват човешката психология:
• Доверие
• Страх
• Алчност
• Любопитство
• Желание да помогнат

"Хората са най-слабото звено в сигурността"` },
        { title: 'Техники на атака', highlight: 'warning' as const, content: `🎭 Pretexting (измислена история)
   "Обаждам се от IT, имаме проблем..."

🎁 Baiting (примамка)
   USB с "Заплати 2024.xlsx" на паркинга

📞 Vishing (телефонна измама)
   "Банката ви се обажда..."

👥 Tailgating (следване)
   Влизане в сграда зад служител

💼 Business Email Compromise
   Фалшив имейл от "шефа"

🔍 OSINT (разузнаване)
   Събиране на информация от социални мрежи` },
        { title: 'Как да се защитите', highlight: 'success' as const, content: `✓ Винаги проверявайте самоличността
   Обадете се обратно на официален номер

✓ Не споделяйте пароли по телефона
   IT никога не пита за пароли!

✓ Внимавайте какво публикувате онлайн
   Снимки, локации, лична информация

✓ Задавайте въпроси
   "Защо ви трябва тази информация?"

✓ Следвайте процедурите
   Дори под натиск

✓ Докладвайте подозрителни контакти` },
        { title: 'Реални примери', highlight: 'tip' as const, content: `🏢 Twitter хак (2020)
   Служители бяха измамени по телефона
   Хакнати акаунти на Илон Мъск, Обама

💰 CEO измама
   Фалшив имейл от "директора"
   Искане за спешен превод

🔓 RSA SecurID (2011)
   Фишинг имейл към служител
   Компрометиран сигурен токен

Урок: Дори големите компании са уязвими!` },
      ],
    },
    en: {
      title: 'Social Engineering',
      subtitle: 'Understand how hackers manipulate people',
      sections: [
        { title: 'What is social engineering?', content: `Social engineering is the art of manipulating people to reveal confidential information or perform actions.

Hackers exploit human psychology:
• Trust
• Fear
• Greed
• Curiosity
• Desire to help

"People are the weakest link in security"` },
        { title: 'Attack techniques', highlight: 'warning' as const, content: `🎭 Pretexting (made-up story)
   "I'm calling from IT, we have a problem..."

🎁 Baiting (lure)
   USB with "Salaries 2024.xlsx" in parking lot

📞 Vishing (phone scam)
   "Your bank is calling..."

👥 Tailgating (following)
   Entering building behind an employee

💼 Business Email Compromise
   Fake email from the "boss"

🔍 OSINT (reconnaissance)
   Collecting info from social networks` },
        { title: 'How to protect yourself', highlight: 'success' as const, content: `✓ Always verify identity
   Call back on official number

✓ Don't share passwords by phone
   IT never asks for passwords!

✓ Be careful what you post online
   Photos, locations, personal info

✓ Ask questions
   "Why do you need this information?"

✓ Follow procedures
   Even under pressure

✓ Report suspicious contacts` },
        { title: 'Real examples', highlight: 'tip' as const, content: `🏢 Twitter hack (2020)
   Employees were tricked by phone
   Hacked accounts of Elon Musk, Obama

💰 CEO fraud
   Fake email from "director"
   Request for urgent transfer

🔓 RSA SecurID (2011)
   Phishing email to employee
   Compromised security token

Lesson: Even big companies are vulnerable!` },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnModulePage
      moduleId="social-engineering"
      icon={Users}
      colorClass="cyber-purple"
      content={currentContent}
      prevLink="/learn/malware-protection"
      nextLink="/learn/data-privacy"
    />
  );
};

export default SocialEngineering;

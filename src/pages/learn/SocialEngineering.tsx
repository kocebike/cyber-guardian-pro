import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import LearnAccessGate from '@/components/LearnAccessGate';
import { ArrowLeft, Users, Crown, Shield } from 'lucide-react';
import ModuleQuiz from '@/components/ModuleQuiz';
import { quizData } from '@/data/quizData';

const SocialEngineering = () => {
  const { t, language } = useLanguage();

  const content = {
    bg: {
      title: 'Социално инженерство',
      subtitle: 'Разберете как хакерите манипулират хората',
      sections: [
        {
          title: 'Какво е социално инженерство?',
          content: `Социалното инженерство е изкуството да се манипулират хора, за да разкрият поверителна информация или да извършат действия.

Хакерите използват човешката психология:
• Доверие
• Страх
• Алчност
• Любопитство
• Желание да помогнат

"Хората са най-слабото звено в сигурността"`,
        },
        {
          title: 'Техники на атака',
          content: `🎭 Pretexting (измислена история)
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
   Събиране на информация от социални мрежи`,
        },
        {
          title: 'Как да се защитите',
          content: `✓ Винаги проверявайте самоличността
   Обадете се обратно на официален номер

✓ Не споделяйте пароли по телефона
   IT никога не пита за пароли!

✓ Внимавайте какво публикувате онлайн
   Снимки, локации, лична информация

✓ Задавайте въпроси
   "Защо ви трябва тази информация?"

✓ Следвайте процедурите
   Дори под натиск

✓ Докладвайте подозрителни контакти`,
        },
        {
          title: 'Реални примери',
          content: `🏢 Twitter хак (2020)
   Служители бяха измамени по телефона
   Хакнати акаунти на Илон Мъск, Обама

💰 CEO измама
   Фалшив имейл от "директора" 
   Искане за спешен превод

🔓 RSA SecurID (2011)
   Фишинг имейл към служител
   Компрометиран сигурен токен

Урок: Дори големите компании са уязвими!`,
        },
      ],
    },
    en: {
      title: 'Social Engineering',
      subtitle: 'Understand how hackers manipulate people',
      sections: [
        {
          title: 'What is social engineering?',
          content: `Social engineering is the art of manipulating people to reveal confidential information or perform actions.

Hackers exploit human psychology:
• Trust
• Fear
• Greed
• Curiosity
• Desire to help

"People are the weakest link in security"`,
        },
        {
          title: 'Attack techniques',
          content: `🎭 Pretexting (made-up story)
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
   Collecting info from social networks`,
        },
        {
          title: 'How to protect yourself',
          content: `✓ Always verify identity
   Call back on official number

✓ Don't share passwords by phone
   IT never asks for passwords!

✓ Be careful what you post online
   Photos, locations, personal info

✓ Ask questions
   "Why do you need this information?"

✓ Follow procedures
   Even under pressure

✓ Report suspicious contacts`,
        },
        {
          title: 'Real examples',
          content: `🏢 Twitter hack (2020)
   Employees were tricked by phone
   Hacked accounts of Elon Musk, Obama

💰 CEO fraud
   Fake email from "director"
   Request for urgent transfer

🔓 RSA SecurID (2011)
   Phishing email to employee
   Compromised security token

Lesson: Even big companies are vulnerable!`,
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <LearnAccessGate>
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('content.back')}
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-cyber-purple/10 rounded-xl">
                <Users className="h-10 w-10 text-cyber-purple" />
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
                <div className="h-1 bg-cyber-purple" />
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyber-purple/20 text-cyber-purple font-mono text-sm">
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
              moduleId="social-engineering"
              questions={quizData['social-engineering'][language === 'bg' ? 'bg' : 'en'] || quizData['social-engineering'].bg}
            />
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Link to="/learn/malware-protection">
              <Button variant="outline" className="border-border hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('content.prev')}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Shield className="mr-2 h-4 w-4" />
                {t('content.back')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
    </LearnAccessGate>
  );
};

export default SocialEngineering;

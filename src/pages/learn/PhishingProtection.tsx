import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import ModuleQuiz from '@/components/ModuleQuiz';
import { quizData } from '@/data/quizData';
import { 
  ArrowLeft, 
  ArrowRight,
  Eye,
  AlertTriangle,
  Mail,
  Link as LinkIcon,
  Shield
} from 'lucide-react';

const PhishingProtection = () => {
  const { t, language } = useLanguage();

  const content = {
    bg: {
      title: 'Защита от фишинг',
      subtitle: 'Разпознавайте измамни имейли и уебсайтове',
      sections: [
        {
          title: 'Какво е фишинг?',
          content: `Фишингът е вид кибератака, при която престъпниците се представят за легитимни организации, за да откраднат вашите данни.

Видове фишинг:
📧 Email фишинг - фалшиви имейли от "банки" или "компании"
🎣 Spear фишинг - насочени атаки към конкретни хора
📱 Smishing - SMS съобщения с измамни линкове
📞 Vishing - телефонни обаждания от "техническа поддръжка"`,
        },
        {
          title: 'Как да разпознаете фишинг имейл?',
          content: `Червени флагове:

⚠️ Подозрителен имейл адрес
   Пример: support@arnaz0n-security.com (вместо amazon.com)

⚠️ Спешност и заплахи
   "Акаунтът ви ще бъде изтрит за 24 часа!"

⚠️ Правописни и граматически грешки

⚠️ Искане на лична информация
   Банката НИКОГА не иска парола по имейл!

⚠️ Подозрителни прикачени файлове
   .exe, .zip, .doc с макроси

⚠️ Линкове към фалшиви сайтове
   Задръжте курсора върху линка преди да кликнете`,
        },
        {
          title: 'Как да проверите линк?',
          content: `Техники за проверка:

1. Задръжте курсора върху линка (без да кликвате)
   Проверете URL адреса в долния ляв ъгъл

2. Търсете HTTPS и катинарче
   ⚠️ HTTPS не означава автоматично безопасен сайт!

3. Проверете домейна внимателно:
   ✓ paypal.com - легитимен
   ✗ paypa1.com - фалшив (1 вместо L)
   ✗ paypal.security-check.com - фалшив

4. Използвайте VirusTotal.com за проверка на линкове`,
        },
        {
          title: 'Какво да правите при фишинг?',
          content: `Ако получите фишинг:

1. НЕ КЛИКВАЙТЕ върху линкове
2. НЕ отваряйте прикачени файлове
3. НЕ отговаряйте на имейла
4. Докладвайте като спам/фишинг
5. Изтрийте съобщението

Ако вече сте станали жертва:
• Променете паролата ВЕДНАГА
• Активирайте 2FA на всички акаунти
• Проверете банковите си извлечения
• Свържете се с банката си
• Докладвайте на полицията`,
        },
      ],
      examples: [
        {
          type: 'phishing',
          from: 'security@amaz0n-account.com',
          subject: 'СПЕШНО: Акаунтът ви е компрометиран!',
          body: 'Кликнете тук незабавно за да защитите акаунта си...',
        },
        {
          type: 'legitimate',
          from: 'no-reply@amazon.com',
          subject: 'Потвърждение на поръчка #123-456',
          body: 'Благодарим ви за поръчката. Можете да проверите статуса в акаунта си.',
        },
      ],
    },
    en: {
      title: 'Phishing Protection',
      subtitle: 'Recognize fraudulent emails and websites',
      sections: [
        {
          title: 'What is phishing?',
          content: `Phishing is a type of cyber attack where criminals pretend to be legitimate organizations to steal your data.

Types of phishing:
📧 Email phishing - fake emails from "banks" or "companies"
🎣 Spear phishing - targeted attacks on specific people
📱 Smishing - SMS messages with fraudulent links
📞 Vishing - phone calls from "technical support"`,
        },
        {
          title: 'How to recognize a phishing email?',
          content: `Red flags:

⚠️ Suspicious email address
   Example: support@arnaz0n-security.com (instead of amazon.com)

⚠️ Urgency and threats
   "Your account will be deleted in 24 hours!"

⚠️ Spelling and grammatical errors

⚠️ Requests for personal information
   Banks NEVER ask for passwords via email!

⚠️ Suspicious attachments
   .exe, .zip, .doc with macros

⚠️ Links to fake sites
   Hover over the link before clicking`,
        },
        {
          title: 'How to verify a link?',
          content: `Verification techniques:

1. Hover over the link (without clicking)
   Check the URL in the bottom left corner

2. Look for HTTPS and padlock
   ⚠️ HTTPS doesn't automatically mean safe!

3. Check the domain carefully:
   ✓ paypal.com - legitimate
   ✗ paypa1.com - fake (1 instead of L)
   ✗ paypal.security-check.com - fake

4. Use VirusTotal.com to check links`,
        },
        {
          title: 'What to do about phishing?',
          content: `If you receive phishing:

1. DON'T click on links
2. DON'T open attachments
3. DON'T reply to the email
4. Report as spam/phishing
5. Delete the message

If you've already become a victim:
• Change your password IMMEDIATELY
• Enable 2FA on all accounts
• Check your bank statements
• Contact your bank
• Report to police`,
        },
      ],
      examples: [
        {
          type: 'phishing',
          from: 'security@amaz0n-account.com',
          subject: 'URGENT: Your account has been compromised!',
          body: 'Click here immediately to protect your account...',
        },
        {
          type: 'legitimate',
          from: 'no-reply@amazon.com',
          subject: 'Order confirmation #123-456',
          body: 'Thank you for your order. You can check the status in your account.',
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.bg;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back button */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('content.back')}
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-secondary/10 rounded-xl">
                <Eye className="h-10 w-10 text-secondary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{currentContent.title}</h1>
                <p className="text-muted-foreground">{currentContent.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <Card key={index} className="bg-card border-border cyber-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-secondary via-primary to-accent" />
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary font-mono text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed bg-transparent p-0">
                      {section.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Interactive Examples */}
            <Card className="bg-card border-destructive/30 cyber-border overflow-hidden">
              <div className="h-1 bg-destructive" />
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-destructive" />
                  {language === 'bg' ? 'Примери за имейли' : 'Email Examples'}
                </h2>
                
                <div className="space-y-4">
                  {currentContent.examples.map((example, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${
                        example.type === 'phishing' 
                          ? 'bg-destructive/10 border-destructive/30' 
                          : 'bg-primary/10 border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {example.type === 'phishing' ? (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        ) : (
                          <Shield className="h-5 w-5 text-primary" />
                        )}
                        <span className={`text-sm font-bold ${
                          example.type === 'phishing' ? 'text-destructive' : 'text-primary'
                        }`}>
                          {example.type === 'phishing' 
                            ? (language === 'bg' ? 'ФИШИНГ' : 'PHISHING')
                            : (language === 'bg' ? 'ЛЕГИТИМЕН' : 'LEGITIMATE')
                          }
                        </span>
                      </div>
                      
                      <div className="space-y-1 font-mono text-sm">
                        <p><span className="text-muted-foreground">From:</span> {example.from}</p>
                        <p><span className="text-muted-foreground">Subject:</span> {example.subject}</p>
                        <p className="text-muted-foreground mt-2">{example.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Quiz Section */}
            <ModuleQuiz
              moduleId="phishing-protection"
              questions={quizData['phishing-protection'][language === 'bg' ? 'bg' : 'en'] || quizData['phishing-protection'].bg}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Link to="/learn/password-security">
              <Button variant="outline" className="border-border hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('content.prev')}
              </Button>
            </Link>
            
            <Link to="/learn/2fa-setup">
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

export default PhishingProtection;

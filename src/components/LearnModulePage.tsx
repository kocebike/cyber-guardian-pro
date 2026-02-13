import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import LearnAccessGate from '@/components/LearnAccessGate';
import ModuleQuiz from '@/components/ModuleQuiz';
import LearnMediaBlock from '@/components/LearnMediaBlock';
import { quizData } from '@/data/quizData';
import { ArrowLeft, ArrowRight, Shield, Crown, LucideIcon, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface ContentSection {
  title: string;
  content: string;
  icon?: LucideIcon;
  highlight?: 'tip' | 'warning' | 'success';
  media?: { type: 'image' | 'video'; src: string; alt?: string; caption?: string }[];
}

interface LearnModulePageProps {
  moduleId: string;
  icon: LucideIcon;
  colorClass: string; // e.g. "primary", "secondary", "destructive"
  content: {
    title: string;
    subtitle: string;
    sections: ContentSection[];
  };
  prevLink?: string;
  nextLink?: string;
  isPremium?: boolean;
  interactiveBlock?: ReactNode;
}

const highlightConfig = {
  tip: { icon: Lightbulb, border: 'border-l-4 border-l-accent', bg: 'bg-accent/5', text: 'text-accent' },
  warning: { icon: AlertTriangle, border: 'border-l-4 border-l-destructive', bg: 'bg-destructive/5', text: 'text-destructive' },
  success: { icon: CheckCircle, border: 'border-l-4 border-l-primary', bg: 'bg-primary/5', text: 'text-primary' },
};

const LearnModulePage = ({
  moduleId,
  icon: Icon,
  colorClass,
  content,
  prevLink,
  nextLink,
  isPremium = true,
  interactiveBlock,
}: LearnModulePageProps) => {
  const { t, language } = useLanguage();

  const colorMap: Record<string, { bg: string; text: string; gradient: string; glow: string }> = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', gradient: 'from-primary via-primary/50 to-transparent', glow: 'shadow-primary/20' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary', gradient: 'from-secondary via-secondary/50 to-transparent', glow: 'shadow-secondary/20' },
    accent: { bg: 'bg-accent/10', text: 'text-accent', gradient: 'from-accent via-accent/50 to-transparent', glow: 'shadow-accent/20' },
    destructive: { bg: 'bg-destructive/10', text: 'text-destructive', gradient: 'from-destructive via-destructive/50 to-transparent', glow: 'shadow-destructive/20' },
    'cyber-purple': { bg: 'bg-cyber-purple/10', text: 'text-cyber-purple', gradient: 'from-cyber-purple via-cyber-purple/50 to-transparent', glow: 'shadow-cyber-purple/20' },
    'cyber-yellow': { bg: 'bg-cyber-yellow/10', text: 'text-cyber-yellow', gradient: 'from-cyber-yellow via-cyber-yellow/50 to-transparent', glow: 'shadow-cyber-yellow/20' },
  };

  const colors = colorMap[colorClass] || colorMap.primary;

  const quizLang = language === 'bg' ? 'bg' : 'en';
  const moduleQuizData = quizData[moduleId as keyof typeof quizData];

  return (
    <LearnAccessGate>
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Back */}
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('content.back')}
            </Link>

            {/* Hero Header */}
            <div className="relative mb-12 overflow-hidden rounded-2xl p-8 md:p-12" style={{ background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)` }}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient}`} />
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10" style={{ background: `radial-gradient(circle, currentColor, transparent)` }}>
              </div>
              <div className="relative flex items-start gap-5">
                <div className={`p-4 ${colors.bg} rounded-2xl shadow-lg ${colors.glow} flex-shrink-0`}>
                  <Icon className={`h-10 w-10 md:h-12 md:w-12 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{content.title}</h1>
                    {isPremium && <Crown className="h-5 w-5 text-secondary" />}
                  </div>
                  <p className="text-muted-foreground text-lg mt-2">{content.subtitle}</p>
                  <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted">
                      📚 {content.sections.length} {language === 'bg' ? 'секции' : 'sections'}
                    </span>
                    {moduleQuizData && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted">
                        🧪 {language === 'bg' ? 'Тест' : 'Quiz'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {content.sections.map((section, index) => {
                const isEven = index % 2 === 0;
                const hl = section.highlight ? highlightConfig[section.highlight] : null;
                const SectionIcon = section.icon;

                return (
                  <div key={index} className="group">
                    <Card className={`bg-card border-border overflow-hidden transition-all duration-300 hover:shadow-lg ${colors.glow} ${hl ? hl.border : ''}`}>
                      {/* Top accent bar with alternating styles */}
                      {!hl && (
                        <div className={`h-0.5 ${isEven ? `bg-gradient-to-r ${colors.gradient}` : `bg-gradient-to-l ${colors.gradient}`}`} />
                      )}
                      <CardContent className={`p-6 md:p-8 ${hl ? hl.bg : ''}`}>
                        {/* Section header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${colors.bg} ${colors.text} font-mono text-sm font-bold flex-shrink-0 transition-transform group-hover:scale-110`}>
                            {SectionIcon ? <SectionIcon className="h-5 w-5" /> : String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold leading-tight">{section.title}</h2>
                            {hl && (
                              <span className={`inline-flex items-center gap-1 text-xs font-medium mt-1 ${hl.text}`}>
                                <hl.icon className="h-3 w-3" />
                                {section.highlight === 'tip' ? (language === 'bg' ? 'Съвет' : 'Tip') : 
                                 section.highlight === 'warning' ? (language === 'bg' ? 'Внимание' : 'Warning') : 
                                 (language === 'bg' ? 'Добра практика' : 'Best practice')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content - parsed with styled blocks */}
                        <div className="ml-14">
                          <div className="text-foreground/90 leading-relaxed space-y-3">
                            {section.content.split('\n\n').map((block, bi) => (
                              <div key={bi}>
                                {block.split('\n').map((line, li) => {
                                  const trimmed = line.trim();
                                  if (!trimmed) return null;
                                  
                                  // Checkmark lines
                                  if (trimmed.startsWith('✓') || trimmed.startsWith('✗')) {
                                    const isCheck = trimmed.startsWith('✓');
                                    return (
                                      <div key={li} className={`flex items-start gap-2 py-1 px-3 rounded-lg my-1 ${isCheck ? 'bg-primary/5' : 'bg-destructive/5'}`}>
                                        <span className={`font-bold ${isCheck ? 'text-primary' : 'text-destructive'}`}>{trimmed[0]}</span>
                                        <span>{trimmed.slice(1).trim()}</span>
                                      </div>
                                    );
                                  }
                                  
                                  // Warning lines
                                  if (trimmed.startsWith('⚠️')) {
                                    return (
                                      <div key={li} className="flex items-start gap-2 py-1.5 px-3 rounded-lg my-1 bg-destructive/5 border-l-2 border-destructive/30">
                                        <span>{trimmed}</span>
                                      </div>
                                    );
                                  }

                                  // Bullet points
                                  if (trimmed.startsWith('•')) {
                                    return (
                                      <div key={li} className="flex items-start gap-2 py-0.5 pl-2">
                                        <span className={`${colors.text} mt-0.5`}>▸</span>
                                        <span>{trimmed.slice(1).trim()}</span>
                                      </div>
                                    );
                                  }

                                  // Numbered items
                                  if (/^\d+\./.test(trimmed)) {
                                    return (
                                      <div key={li} className="flex items-start gap-3 py-1">
                                        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${colors.bg} ${colors.text} flex-shrink-0`}>
                                          {trimmed.match(/^(\d+)/)?.[1]}
                                        </span>
                                        <span>{trimmed.replace(/^\d+\.\s*/, '')}</span>
                                      </div>
                                    );
                                  }

                                  // Emoji-prefixed items (🔐, 🎭, etc.)
                                  if (/^[\p{Emoji}]/u.test(trimmed) && !trimmed.startsWith('⚠')) {
                                    return (
                                      <div key={li} className="flex items-start gap-2 py-1 px-3 rounded-lg my-1 bg-muted/50">
                                        <span>{trimmed}</span>
                                      </div>
                                    );
                                  }

                                  // Indented sub-items
                                  if (line.startsWith('   ')) {
                                    return (
                                      <div key={li} className="text-muted-foreground text-sm pl-6 py-0.5">
                                        {trimmed}
                                      </div>
                                    );
                                  }

                                  // Regular text
                                  return <p key={li} className="py-0.5">{trimmed}</p>;
                                })}
                              </div>
                            ))}
                          </div>
                          
                          {/* Media */}
                          {section.media && section.media.length > 0 && (
                            <LearnMediaBlock media={section.media} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}

              {/* Interactive Block */}
              {interactiveBlock}

              {/* Quiz */}
              {moduleQuizData && (
                <ModuleQuiz
                  moduleId={moduleId}
                  questions={moduleQuizData[quizLang] || moduleQuizData.bg}
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              {prevLink ? (
                <Link to={prevLink}>
                  <Button variant="outline" className="border-border hover:bg-muted group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    {t('content.prev')}
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button variant="outline" className="border-border hover:bg-muted">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('content.back')}
                  </Button>
                </Link>
              )}
              {nextLink ? (
                <Link to={nextLink}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                    {t('content.next')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Shield className="mr-2 h-4 w-4" />
                    {t('content.back')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </LearnAccessGate>
  );
};

export default LearnModulePage;

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Trophy, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ModuleQuizProps {
  moduleId: string;
  questions: QuizQuestion[];
  passingScore?: number; // percentage, default 70
}

const ModuleQuiz = ({ moduleId, questions, passingScore = 70 }: ModuleQuizProps) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const isBg = language === 'bg';

  useEffect(() => {
    if (user) {
      supabase
        .from('quiz_results')
        .select('score, total_questions')
        .eq('user_id', user.id)
        .eq('module_id', moduleId)
        .order('score', { ascending: false })
        .limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) {
            setBestScore(Math.round((data[0].score / data[0].total_questions) * 100));
          }
        });
    }
  }, [user, moduleId]);

  const handleAnswer = (index: number) => {
    if (submitted) return;
    setSelectedAnswer(index);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setSubmitted(false);
    }
  };


  const handleSubmitAnswer = () => {
    setSubmitted(true);
  };

  const handleFinish = async () => {
    const correctCount = answers.reduce((count, answer, i) => {
      return count + (answer === questions[i].correctIndex ? 1 : 0);
    }, 0);
    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= passingScore;

    setShowResult(true);

    if (user) {
      setSaving(true);
      try {
        await supabase.from('quiz_results').insert({
          user_id: user.id,
          module_id: moduleId,
          score: correctCount,
          total_questions: questions.length,
          passed,
        });
        if (bestScore === null || percentage > bestScore) {
          setBestScore(percentage);
        }
        toast({
          title: passed
            ? (isBg ? '🎉 Поздравления!' : '🎉 Congratulations!')
            : (isBg ? 'Опитайте отново' : 'Try again'),
          description: passed
            ? (isBg ? `Преминахте с ${percentage}%!` : `You passed with ${percentage}%!`)
            : (isBg ? `Резултат: ${percentage}%. Необходими са ${passingScore}%.` : `Score: ${percentage}%. Need ${passingScore}%.`),
        });
      } catch (error) {
        console.error('Error saving quiz result:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setSubmitted(false);
  };

  if (showResult) {
    const correctCount = answers.reduce((count, answer, i) => {
      return count + (answer === questions[i].correctIndex ? 1 : 0);
    }, 0);
    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= passingScore;

    return (
      <Card className={`border-2 ${passed ? 'border-primary/50' : 'border-destructive/50'} cyber-border overflow-hidden`}>
        <div className={`h-1 ${passed ? 'bg-primary' : 'bg-destructive'}`} />
        <CardContent className="p-8 text-center">
          <div className={`mx-auto mb-6 p-4 rounded-full w-fit ${passed ? 'bg-primary/20' : 'bg-destructive/20'}`}>
            {passed ? (
              <Trophy className="h-12 w-12 text-primary" />
            ) : (
              <XCircle className="h-12 w-12 text-destructive" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold mb-2">
            {passed
              ? (isBg ? 'Тест преминат!' : 'Quiz Passed!')
              : (isBg ? 'Тестът не е преминат' : 'Quiz Not Passed')}
          </h3>
          
          <p className="text-4xl font-mono font-bold mb-2">
            {correctCount}/{questions.length}
          </p>
          <p className="text-muted-foreground mb-6">
            {percentage}% {isBg ? 'верни отговори' : 'correct answers'}
            {bestScore !== null && (
              <span className="block text-sm mt-1">
                {isBg ? `Най-добър резултат: ${bestScore}%` : `Best score: ${bestScore}%`}
              </span>
            )}
          </p>

          {/* Show all answers */}
          <div className="text-left space-y-3 mb-6 max-w-lg mx-auto">
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctIndex;
              return (
                <div key={i} className={`p-3 rounded-lg border ${isCorrect ? 'border-primary/30 bg-primary/5' : 'border-destructive/30 bg-destructive/5'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /> : <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm font-medium">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-primary mt-1">
                          {isBg ? 'Верен отговор' : 'Correct'}: {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleRetry} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <RotateCcw className="mr-2 h-4 w-4" />
            {isBg ? 'Опитай отново' : 'Try Again'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const q = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAnswered = answers.every(a => a !== null);

  return (
    <Card className="border-primary/30 cyber-border overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            📝 {isBg ? 'Тест' : 'Quiz'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-mono">
              {currentQuestion + 1}/{questions.length}
            </span>
            {bestScore !== null && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {isBg ? `Най-добър: ${bestScore}%` : `Best: ${bestScore}%`}
              </span>
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i === currentQuestion
                  ? 'bg-primary'
                  : answers[i] !== null
                  ? 'bg-primary/40'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <p className="text-lg font-medium mb-6">{q.question}</p>

        <div className="space-y-3 mb-6">
          {q.options.map((option, i) => {
            let className = 'w-full text-left p-4 rounded-lg border transition-all ';
            if (submitted) {
              if (i === q.correctIndex) {
                className += 'border-primary bg-primary/10 text-foreground';
              } else if (i === selectedAnswer && i !== q.correctIndex) {
                className += 'border-destructive bg-destructive/10 text-foreground';
              } else {
                className += 'border-border bg-muted/50 text-muted-foreground';
              }
            } else if (i === selectedAnswer) {
              className += 'border-primary bg-primary/10 text-foreground';
            } else {
              className += 'border-border hover:border-primary/50 hover:bg-primary/5 text-foreground';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={className}
                disabled={submitted}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full border text-sm font-mono flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option}</span>
                  {submitted && i === q.correctIndex && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                  {submitted && i === selectedAnswer && i !== q.correctIndex && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end items-center">
          <div className="flex gap-2">
            {!submitted && selectedAnswer !== null && (
              <Button onClick={handleSubmitAnswer} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                {isBg ? 'Провери' : 'Check'}
              </Button>
            )}
            {submitted && !isLastQuestion && (
              <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {isBg ? 'Следващ →' : 'Next →'}
              </Button>
            )}
            {submitted && isLastQuestion && allAnswered && (
              <Button onClick={handleFinish} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isBg ? 'Завърши теста' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleQuiz;

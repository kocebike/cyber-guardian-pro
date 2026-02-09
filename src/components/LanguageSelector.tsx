import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger className="w-[140px] border-border bg-card">
        <Globe className="h-4 w-4 mr-2 text-primary" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {Object.entries(availableLanguages).map(([code, name]) => (
          <SelectItem key={code} value={code} className="hover:bg-muted">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

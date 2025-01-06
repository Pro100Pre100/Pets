export interface Word {
  toTranslate: string;
}

export interface WordsToBD {
  toTranslate: string;
  translated: string[];
  startLanguage: string;
}

export interface getTranslationProps {
  startLanguage: string;
  toLanguage: string;
}
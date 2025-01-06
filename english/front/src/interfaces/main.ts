import { ReactNode, SetStateAction, Dispatch, InputHTMLAttributes, FieldsetHTMLAttributes, LiHTMLAttributes, MouseEventHandler } from "react";

export interface ModalProps {
  modal?: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  className?: string;
  children?: ReactNode;
}

export interface alertProps {
  type?: string;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  successText?: string;
  errorText?: string;
}

export interface wordState {
  toTranslate: string;
  translated: string[];
  startLanguage: string;
  _id: string;
}

export interface wordsLanguageState {
  ru: wordState[];
  en: wordState[];
}

export interface resultArrState {
  question: string | undefined;
  userAnswer: string;
  correctAnswer: string[];
  correct: boolean;
}

export interface inputProps extends InputHTMLAttributes<HTMLInputElement> { }

export interface answerState {
  answer: resultArrState;
  index: number;
}

export interface wordsProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  setSelectValue: Dispatch<SetStateAction<string>>;
  selectValue: string;
  words: wordState[];
  isLoading: boolean;
  setWordsLanguage: Dispatch<SetStateAction<wordsLanguageState>>,
  wordsLanguage: wordsLanguageState;
  isError: boolean;
  setWords: Dispatch<SetStateAction<wordState[]>>;
  sortedWordsObj: wordsLanguageState;
  setModalWord: Dispatch<SetStateAction<boolean>>;
  modalWord: boolean;
}

export interface SortedWordsState {
  [key: string]: wordsLanguageState;
}

export interface modalAddWordProps {
  words: wordState[];
  setIsShowError: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  selectValue: string;
}

export type languageSettingsProps = {
  [key: string]: { startLanguage: string; toLanguage: string };
};

export interface fieldSetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: ReactNode;
}

export interface radioProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name: string;
  nameGroup: string;
}

export type languageSettingsState = 'russianToEnglish' | 'englishToRussian';

export interface listProps {
  arr: wordState[];
  wordsLanguage: wordsLanguageState;
  setWordsLanguage: Dispatch<SetStateAction<wordsLanguageState>>;
  setModalWord: Dispatch<SetStateAction<boolean>>;
}

export interface TranslationItemProps extends LiHTMLAttributes<HTMLLIElement> {
  arr: wordState[];
  startLanguage: string;
  toTranslate: string;
  translation: string[];
  wordsLanguage: wordsLanguageState;
  setWordsLanguage: Dispatch<SetStateAction<wordsLanguageState>>;
  setModalWord: Dispatch<SetStateAction<boolean>>;
}

export interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {
  word: string;
  clickHandler: () => void;
}

export interface quizAllWordsProps {
  words: wordState[];
  setWords: Dispatch<SetStateAction<wordState[]>>
  setChoosedWords: Dispatch<SetStateAction<wordState[]>>
}

export interface QuizWordsProps {
  setWords: Dispatch<SetStateAction<wordState[]>>
  choosedWords: wordState[];
  setChoosedWords: Dispatch<SetStateAction<wordState[]>>
}

export interface quizParametrsProps {
  words: wordState[];
  choosedWords: wordState[];
  setWords: Dispatch<SetStateAction<wordState[]>>
  setChoosedWords: Dispatch<SetStateAction<wordState[]>>
  showAlert: (text: string) => void;
}

export interface modalWordProps {
  modalWord: boolean;
  setModalWord: Dispatch<SetStateAction<boolean>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export interface wordParamsState {
  startValue: string | undefined,
  toTranslate: string | undefined,
  translated: string | undefined
}

export interface sendUpdateState {
  startValue: string | undefined,
  toTranslate: string | undefined,
  translated: string[] | undefined
}
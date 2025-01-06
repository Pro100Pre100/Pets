import { wordState } from "../interfaces/main";

export const arrSortWord = (arrWords: wordState[]) => {
  const sortedWords = [...arrWords].sort((firstWord: wordState, secondWord: wordState) => firstWord.toTranslate.localeCompare(secondWord.toTranslate));
  return sortedWords
}
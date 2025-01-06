import { wordState } from "../interfaces/main";

export const getArrLanguages = (...rest: wordState[][]) => {
  const resultArr = rest.flat();
    const russianWords: wordState[] = [];

    const englishWords = resultArr.filter((word: wordState) => {
      if (word.startLanguage === 'en') {
        return word
      }
      russianWords.push(word)
    })

    return { ru: russianWords, en: englishWords}
  }
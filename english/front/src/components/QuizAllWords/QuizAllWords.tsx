
import { quizAllWordsProps, wordState } from '../../interfaces/main'
import Item from '../../RC/Item/Item'
import { arrSortWord } from '../../utils/arrSortWord';
import './QuizAllWords.css'

export default function QuizAllWords({ words, setWords, setChoosedWords }: quizAllWordsProps) {

  const reverseWords = (toSwapWord: wordState) => () => {
    const newWords = words.filter((word) => toSwapWord.toTranslate !== word.toTranslate);
    setChoosedWords((prev) => arrSortWord([...prev, toSwapWord]));
    setWords(newWords);
  }

  return (
    <div className='quizAllWords'>
      <h2 className='quizAllWords__h2'>Общий список слов</h2>
      <ul className='quizAllWords__list'>
        {words.map((word) =>
          <Item
          key={word.toTranslate}
          word={word.toTranslate}
          clickHandler={reverseWords(word)}
          />
        )}
      </ul>
    </div>
  )
}

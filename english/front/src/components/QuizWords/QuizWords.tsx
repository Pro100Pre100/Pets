
import { QuizWordsProps, wordState } from '../../interfaces/main'
import Item from '../../RC/Item/Item'
import { arrSortWord } from '../../utils/arrSortWord';
import './QuizWords.css'

export default function QuizWords({ choosedWords, setWords, setChoosedWords }: QuizWordsProps) {


  const swapWords = (toSwapWord: wordState) => () => {
    const newWords = choosedWords.filter((word) => word.toTranslate !== toSwapWord.toTranslate);
    setChoosedWords(newWords);
    setWords((prev) => arrSortWord([...prev, toSwapWord]));
  }

  return (
    <div className='quizWords'>
      <h2>Добавленные в тест слова</h2>
      <ul className="quizWords__list">
        {choosedWords.map((word) =>
          <Item
            key={word.toTranslate}
            word={word.toTranslate}
            clickHandler={swapWords(word)}
          />
        )}
      </ul>
    </div>
  )
}

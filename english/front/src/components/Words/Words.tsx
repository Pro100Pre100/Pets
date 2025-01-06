import { ChangeEvent } from 'react'
import './Words.css'
import Tooltip from '../../RC/Tooltip/Tooltip'
import Button from '../../RC/Button/Button'
import { wordsProps } from '../../interfaces/main'
import Loader from '../../RC/Loader/Loader'
import List from '../../RC/list/List'

export default function Words({ objWordsProps }: { objWordsProps: wordsProps }) {

  const {
    setModal,
    selectValue,
    setSelectValue,
    words,
    isLoading,
    sortedWordsObj,
    setWordsLanguage,
    wordsLanguage,
    isError,
    setWords,
    modalWord,
    setModalWord } = objWordsProps;

  const russianWords = sortedWordsObj?.ru;
  const englishWords = sortedWordsObj?.en;

  return (
    <section className='words'>
      <Tooltip text='Используйте to - для глаголов, a - для существительных, чтобы поиск был более правильный' />
      <div className='list'>
        {isLoading
          ? <div className="wrapperLoader"> <Loader /> </div>
          : isError
            ? <div className="wrapperError">Произошла ошибка, попробуйте перезагрузить страницу</div>
            : <ul className='languages'>
              {russianWords.length ? <div className="ru"> Русский </div> : null}
              <List
                arr={russianWords}
                wordsLanguage={wordsLanguage}
                setWordsLanguage={setWordsLanguage}
                setModalWord={setModalWord}
              />
              {englishWords.length ? <div className="en"> Английский </div> : null}
              <List
                arr={englishWords}
                wordsLanguage={wordsLanguage}
                setWordsLanguage={setWordsLanguage}
                setModalWord={setModalWord}
              />
            </ul>
        }
      </div>
      <div className="amountWords">Количество слов: {(englishWords.length + russianWords.length)}</div>
      <select className='select'
        onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectValue(event.target.value)}
        value={selectValue}
      >
        <option value='russianToEnglish'>C рус. на англ.</option>
        <option value='englishToRussian'>C англ. на рус.</option>
      </select>
      <Button text='Добавить слова' eventHandler={() => setModal(true)} />
    </section>
  )
}

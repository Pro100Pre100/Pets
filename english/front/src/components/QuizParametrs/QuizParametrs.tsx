
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from '../../RC/Button/Button'
import FieldSet from '../../RC/FieldSet/FieldSet'
import Input from '../../RC/Input/Input'
import Radio from '../../RC/Radio/Radio'
import './QuizParametrs.css'
import { quizParametrsProps, wordState } from '../../interfaces/main'
import { getArrLanguages } from '../../utils/getArrLanguages'
import { arrShuffle } from '../../utils/arrShuffle'

export default function QuizParametrs({ words, choosedWords, setWords, setChoosedWords, showAlert }: quizParametrsProps) {

  const [inputValue, setInputValue] = useState<number>(0);
  const [buttonDelay, setButtonDelay] = useState<boolean>(false)

  const onlyEnglishHandler = () => {
    const { ru, en } = getArrLanguages(words, choosedWords);
    setChoosedWords(ru);
    setWords(en)
  }

  const onlyRussianHandler = () => {
    const { ru, en } = getArrLanguages(words, choosedWords);
    setChoosedWords(en);
    setWords(ru)
  }

  const quizDeleteAllWords = () => {
    const { ru, en } = getArrLanguages(words, choosedWords);
    setChoosedWords([]);
    setWords([...en, ...ru])
  }

  const quizAddAllWords = () => {
    const { ru, en } = getArrLanguages(words, choosedWords);
    setChoosedWords([...ru, ...en]);
    setWords([])
  }

  const buttonHandler = () => {

    if (buttonDelay) {
      return
    }

    setButtonDelay(true)

    setTimeout(() => {
      setButtonDelay(false)
    }, 2000)

    if (!Number.isInteger(inputValue)) {
      return showAlert('Допустим только числовой формат');
    }
    else if (inputValue < 4) {
      return showAlert('Минимальное количество слов - 5');
    }
    else if (words.length < inputValue) {
      return showAlert('Отсутствует достаточное количество слов');
    }

    const shuffledArr = arrShuffle(words);
    const quizWords = shuffledArr.slice(0, inputValue);
    const remainWords = shuffledArr.slice(inputValue);

    setWords([...remainWords, ...choosedWords]);
    setChoosedWords(quizWords);
  }

  return (
    <div className='quizParametrs'>
      <h2 className='quizParametrs_h2'>Параметры</h2>
      <Radio
        value='onlyEnglish'
        name='Переводить только с английского'
        nameGroup='quiz'
        onChange={onlyRussianHandler} />

      <br />
      <Radio
        value='onlyRussian'
        name='Переводить только с русского'
        nameGroup='quiz'
        onChange={onlyEnglishHandler} />

      <br />
      <Radio
        value='deleteAll'
        name='Убрать все слова'
        nameGroup='quiz'
        onChange={quizDeleteAllWords} />

      <br />
      <Radio
        value='addAll'
        name='Добавить все слова'
        nameGroup='quiz'
        onChange={quizAddAllWords} />

      <hr className='quizParametrs_hr' />
      <h3 className='quizParametrs_h3'>
        Определённое количество случайных слов:
      </h3>
      <div className="quizParametrs_buttonSection">
        <Input maxLength={3} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(+event.target.value)} />
        <Button eventHandler={buttonHandler} />
      </div>
    </div>
  )
}

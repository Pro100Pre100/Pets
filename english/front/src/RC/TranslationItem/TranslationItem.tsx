
import { useRef, useState } from 'react'
import { TranslationItemProps } from '../../interfaces/main'
import './TranslationItem.css'
import { deleteWord } from '../../api/words';
import { useNavigate } from 'react-router-dom';

export default function TranslationItem({ toTranslate, translation = [], arr, startLanguage, wordsLanguage, setWordsLanguage, setModalWord, ...props }: TranslationItemProps) {

  const [clickTimer, setClickTimer] = useState<string>('zero');
  const timerRef = useRef<number | null>(null);

  const navigate = useNavigate();

  const deleteListWord = async (wordList: string, startLanguage: string) => {
    try {
      await deleteWord(wordList);
      const newWords = arr.filter(word => word.toTranslate !== wordList);
      setWordsLanguage(startLanguage === 'ru'
        ? { ru: newWords, en: [...wordsLanguage.en] }
        : { en: newWords, ru: [...wordsLanguage.ru] })
    }
    catch (err) {
      console.error(err);
    }
  }

  const clickHandler = (wordList: string, startLanguage: string) => () => {
    if (clickTimer === 'zero') {
      setClickTimer('one');
      timerRef.current = window.setTimeout(() => {
        setClickTimer('zero');
        setModalWord(true);
        navigate(`/words?sl=${toTranslate}&tl=${translation}`);
        timerRef.current = null

      }, 500)
      return true
    }
    else if (clickTimer === 'one') {
      deleteListWord(wordList, startLanguage);
      setClickTimer('zero');
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }

  return (
    <li
      className='translationItem'
      onClick={clickHandler(toTranslate, startLanguage)}
      data-preparedelete={clickTimer}
      {...props}>
      {`${toTranslate} - ${translation.map((oneTranslation, index) =>
        ` ${translation.length > 1 ? index + 1 + '.' : ''}
          ${oneTranslation}`)}`}
    </li>
  )
}

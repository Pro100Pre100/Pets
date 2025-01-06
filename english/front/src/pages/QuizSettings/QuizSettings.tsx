import { useEffect, useState } from 'react'
import { getWords } from '../../api/words'
import QuizAllWords from '../../components/QuizAllWords/QuizAllWords'
import QuizParametrs from '../../components/QuizParametrs/QuizParametrs'
import QuizWords from '../../components/QuizWords/QuizWords'
import './QuizSettings.css'
import { wordState } from '../../interfaces/main'
import Tooltip from '../../RC/Tooltip/Tooltip'
import { arrSortWord } from '../../utils/arrSortWord'
import Alert from '../../RC/Alert/Alert'
import Button from '../../RC/Button/Button'
import { useNavigate } from 'react-router-dom'
import { encodeBase64 } from '../../utils/codeAndDecode'
import BackButton from '../../RC/BackButton/BackButton'

export default function QuizSettings() {

  const [words, setWords] = useState<wordState[]>([]);
  const [choosedWords, setChoosedWords] = useState<wordState[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');

  const navigate = useNavigate()

  useEffect(() => {

    const loadWords = async () => {
      try {
        const words = await getWords();
        const sortedWords = arrSortWord(words);
        setWords(sortedWords);
      }
      catch (err) {
        console.error(err);
        localStorage.setItem('showBefore', 'false');
        navigate('/', {
          state: {
            error: true,
            message: 'Произошла ошибка на стороне сервера',
          }
        });
      }
    }

    loadWords()

  }, [])

  const showAlert = (text: string) => {
    setAlertText(text);
    setIsShow(true);
  }

  const buttonHandler = () => {
    if (choosedWords.length > 4) {
      const encryption = choosedWords.map((word) => (
        {
          _id: word._id,
          toTranslate: word.toTranslate,
          translated: encodeBase64(word.translated),
          startLanguage: word.startLanguage
        }))

      navigate('/quiz', {
        state: {
          words: encryption
        }
      })
    }
    else {
      showAlert('Минимальное количество слов - 5');
    }
  }

  return (
    <div className='quizSettings'>
      <Alert
        isShow={isShow}
        setIsShow={setIsShow}
        errorText={alertText}
        type='error' />
      <div className='quizSettings__block'>
        <BackButton route='/' />
        <Tooltip text='Всё, что находится в блоке "добавленные в тест слова" будет использовано в тесте' />
        <QuizParametrs
          words={words}
          choosedWords={choosedWords}
          setWords={setWords}
          setChoosedWords={setChoosedWords}
          showAlert={showAlert} />
        <QuizAllWords
          words={words}
          setWords={setWords}
          setChoosedWords={setChoosedWords}
        />
        <QuizWords
          setWords={setWords}
          choosedWords={choosedWords}
          setChoosedWords={setChoosedWords}
        />
        <Button text='Начать тест'
          eventHandler={buttonHandler}
          className='startTest' />
      </div>
    </div>
  )
}

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './Question.css'
import Tooltip from '../../RC/Tooltip/Tooltip'
import { getWords } from '../../api/words'
import { arrShuffle } from '../../utils/arrShuffle';
import { resultArrState, wordState } from '../../interfaces/main';
import Input from '../../RC/Input/Input';
import Loader from '../../RC/Loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../RC/Button/Button';
import { decodeBase64 } from '../../utils/codeAndDecode';
import { isCorrect } from '../../utils/isCorrect';

export default function Question() {

  const [allWords, setAllWords] = useState<wordState[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const resultArrRef = useRef<resultArrState[]>([]);
  const questionArrRef = useRef<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { state } = location;

    if (!state?.words?.length) {
      navigate('/');
      return
    }
    else {
      const words = state.words;
      setAllWords(words);
      setIsLoading(false);

      const arrWords = words.map((word: wordState) => word.toTranslate);
      const randomArr = arrShuffle(arrWords);

      if (!questionArrRef.current.length) {
        questionArrRef.current.push(...randomArr);
      }
    }

  }, [])

  const sendAnswer = () => {
    const questionWord = questionArrRef.current.shift();
    const wordIndex = allWords.findIndex((word) => word.toTranslate === questionWord);
    const correctAnswer = allWords[wordIndex].translated;

    resultArrRef.current.push({
      question: questionWord,
      userAnswer: userAnswer.trim(),
      correctAnswer: decodeBase64(correctAnswer),
      correct: isCorrect(decodeBase64(correctAnswer) as string[], userAnswer)
    })
    setUserAnswer('');

    if (questionArrRef.current.length === 0) {
      navigate('/quiz', { replace: true, state: {} })
      navigate('/checkAnswer', { state: resultArrRef.current })
    }
  }

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && userAnswer.length > 1) {
      if (event.repeat) {
        return
      }

      sendAnswer();

    }
  }

  return (
    <>
      {isLoading
        ? <Loader />
        : <div className='question'>
          <progress className='question_progress' value={questionArrRef.current.length} max={allWords.length} />
          <Tooltip text='Напишите любой перевод из добавленных' />
          <h1 className="questionWord">
            {questionArrRef.current[0]}
          </h1>
          <div className='answerArea'>
            <Input
              placeholder='Введите текст'
              onKeyDown={keyDownHandler}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setUserAnswer(event.target.value)}
              value={userAnswer}
              maxLength={20} />
            <Button
              text='Ответить'
              className='buttonAnswer'
              eventHandler={sendAnswer} />
          </div>
        </div>}
    </>
  )
}

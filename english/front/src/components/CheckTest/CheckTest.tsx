import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { resultArrState } from '../../interfaces/main';
import './CheckTest.css'
import AnswerInfo from '../../RC/AnswerInfo/AnswerInfo';

export default function CheckTest() {

  const [correctWords, setCorrectWords] = useState<number>(0);

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    let trueWords = 0;

    state.forEach((word: resultArrState) => {
      if (word.correct === true) {
        trueWords += 1;
      }
    })
    setCorrectWords(trueWords);
  }, [])

  return (
    <section className='checkBlock'>
      <h2 className='checkBlock__results'>
        Количество баллов: {correctWords} / {state.length}
      </h2>
      <div className='checkBlock__infoList'>
        {state.map((wordInfo: resultArrState, index: number) =>
          <AnswerInfo key={wordInfo.question} answer={wordInfo} index={index} />
        )}
      </div>
    </section>
  )
}

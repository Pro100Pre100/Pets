
import './AnswerInfo.css'
import { answerState, resultArrState } from '../../interfaces/main'

export default function AnswerInfo({ answer, index }: answerState) {

  const { question, userAnswer, correctAnswer, correct } = answer;

  return (
    <div className='answerInfoBlock'>
      <h3 className='answerInfoBlock__question answerText'>
        {index + 1}. Вопрос:  <div className='answerInfoBlock__questionWord'>{question}</div>
      </h3>
      <h4 className='answerInfoBlock__answerState answerText'>
        Ваш ответ: {correct ? userAnswer : <div className='answerInfoBlock_incorrect'>{userAnswer}</div>}
        <br />
        Состояние: {correct ? 'Верно✅' : 'Ошибка❌'}
      </h4>

      {correct
        ? null
        :
        correctAnswer.map((answer: string) =>
          <h4 className='answerInfoBlock__correctAnswer answerText'>
            {answer}
          </h4>)
      }

    </div>
  )
}


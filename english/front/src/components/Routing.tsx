
import { Routes, Route } from 'react-router-dom'
import Main from '../pages/Main/Main'
import WordsPage from '../pages/wordsPage/WordsPage'
import Quiz from '../pages/Quiz/Quiz'
import CheckAnswer from '../pages/CheckAnswer/CheckAnswer'
import QuizSettings from '../pages/QuizSettings/QuizSettings'

export default function Routing() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/words' element={<WordsPage />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/checkAnswer' element={<CheckAnswer />} />
      <Route path='/quizSettings' element={<QuizSettings />} />
      <Route path='*' element={<Main />} />
    </Routes>
  )
}

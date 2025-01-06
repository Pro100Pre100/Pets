
import './Navigation.css'
import Button from '../../RC/RedirectButton/RedirectButton'

export default function Navigation() {
  return (
    <nav className='navPanel'>
      <Button text='Words' path='/words' />
      <Button text='Test' path='/quizSettings'/>
    </nav>
  )
}

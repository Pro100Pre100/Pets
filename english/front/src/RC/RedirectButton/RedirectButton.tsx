
import './RedirectButton.css'
import { useNavigate } from 'react-router-dom'

export default function RedirectButton({text, path}: {text?: string, path: string}) {

  const navigate = useNavigate();

  const clickHandler = (path: string) => () => {
    navigate(path);
  }

  return (
    <button className='redirectButton' onClick={clickHandler(path)}>
      {text}
    </button>
  )
}

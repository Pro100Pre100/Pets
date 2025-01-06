
import { useNavigate } from 'react-router-dom'
import './BackButton.css'

export default function BackButton({ route }: { route: string }) {

  const navigate = useNavigate();

  const useClickHandler = () => {
    navigate(route);
  }

  return (
    <div
      className='backButton'
      onClick={useClickHandler} />
  )
}

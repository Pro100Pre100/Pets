
import './Main.css'
import Navigation from '../../components/Navigation/Navigation'
import Alert from '../../RC/Alert/Alert'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Main() {

  const showBefore = localStorage.getItem('showBefore');

  const [isError, setIsError] = useState<boolean>(false);
  const [stateMessage, isStateMessage] = useState<string>('');

  const location = useLocation();

  useEffect(() => {
    if (location.state && showBefore === 'false') {
      isStateMessage(location.state.message);
      setIsError(true);
    }
    localStorage.setItem('showBefore', 'true');
  }, [])

  return (
    <div className='mainPage'>
      <Alert
        isShow={isError}
        setIsShow={setIsError}
        type='error'
        errorText={stateMessage} />

      <Navigation />
    </div>
  )
}

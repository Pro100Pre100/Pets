
import './Alert.css'
import MainAlert from './MainAlert/MainAlert'
import { alertProps } from '../../interfaces/main'


export default function Alert({
  type = 'success',
  isShow,
  setIsShow,
  successText = 'Успешно отправлено!',
  errorText = 'Произошла ошибка, попробуйте позже' }: alertProps) {

  if (isShow) {
    setTimeout(() => {
      setIsShow(false);
    }, 2000)
  }

  return (
    <div
      className='alert'
      data-alertshow={isShow}
      data-alerttype={type}>
      <MainAlert
        text={type === 'success' ? successText : errorText} />
    </div>
  )
}


import { HTMLAttributes } from 'react'
import './MainAlert.css'

interface MainAlertProps {
 text: string
} 

export default function MainAlert({text, ...props}: MainAlertProps) {

  return (
    <div className='mainAlert' {...props}>
      {text}
    </div>
  )
}

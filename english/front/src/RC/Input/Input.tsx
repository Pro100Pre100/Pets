import './Input.css'
import { inputProps } from '../../interfaces/main'

export default function Input({...props}: inputProps) {

  return (
    <input className='input'
    {...props}
    />
  )
}

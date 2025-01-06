
import { radioProps } from '../../interfaces/main'
import './Radio.css'

export default function Radio({ value, name, nameGroup, ...props }: radioProps) {

  return (
    <div className='radioBlock'>
      <input className='radio' type='radio' value={value} id={value} {...props} name={nameGroup} />
      <label className='radioLabel' htmlFor={value}>{name}</label>
    </div>
  )
}

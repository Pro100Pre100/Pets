
import { fieldSetProps } from '../../interfaces/main'
import './FieldSet.css'

export default function FieldSet({children, ...props}: fieldSetProps) {

  return (
   <fieldset className='fieldSet' {...props}>
    {children}
   </fieldset>
  )
}

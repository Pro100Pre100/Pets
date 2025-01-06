
import { ItemProps } from '../../interfaces/main'
import './Item.css'

export default function TranslationItem({ word, clickHandler, ...props }: ItemProps) {

  const click = () => {
    clickHandler()
  }

  return (
    <li
      className='item'
      onClick={click}
      {...props}>
      {word}
    </li>
  )
}

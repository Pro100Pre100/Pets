
import './Tooltip.css'

export default function Tooltip({text}: {text: string}) {

  return (
    <div className='tooltip'>
      <div className='tooltip__text'>
        {text}
      </div>
    </div>
  )
}

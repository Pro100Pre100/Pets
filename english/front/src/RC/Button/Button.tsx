
import './Button.css'

export default function Button({eventHandler, text, className}: {eventHandler: () => void, text?: string, className?: string}) {

  return (
    <button className={'button ' + className} onClick={eventHandler}>
      {text}
    </button>
  )
}

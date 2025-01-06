
import './Modal.css'
import { ModalProps } from '../../interfaces/main'

export default function Modal({modal, setModal, className = '', children}: ModalProps) {

  return (
    <div className='modal' data-modal={modal} onClick={() => setModal(false)}>
      <div className='modal__container' onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

import { X } from 'lucide-react'
import styles from './Modal.module.scss'
import type { MouseEvent } from 'react'
interface IModal {
  open: boolean
  onClose: () => void
  children: JSX.Element
}

export function Modal({open, onClose, children}: IModal) {
  function handleOverlayClick (e: MouseEvent<HTMLDivElement>) {
    if(e.target === e.currentTarget) {
      onClose()
    }
  }
  return (
    open && <div className={styles.modal} onClick={handleOverlayClick}>
      <div className={styles.content}>
        <X className={styles.close} color='#968f8f' onClick={onClose}/>
        {children}
      </div>
    </div>
  )
}

'use client'

import clsx from 'clsx'

import styles from './Switch.module.scss'

interface ISwitch {
  isChecked: boolean | null
  onClick: () => void
  label?: string
  labelPosition?: 'left' | 'right' | 'top' | 'bottom'
  spacing?: number
}

export function Switch({
  isChecked,
  onClick,
  label,
  labelPosition = 'left',
  spacing = 2
}: ISwitch) {

  return (
    <div
      className={clsx(styles.wrap, label ? labelPosition : '')}
      style={label ? { gap: `${spacing}rem` } : {}}
      onClick={onClick}
    >
      {label && <span className={styles.label}>{label}</span>}
      <div className={clsx(styles.checkbox, isChecked ? styles.active : '')}>
        <div className={styles.stick}></div>
      </div>
    </div>
  )
}

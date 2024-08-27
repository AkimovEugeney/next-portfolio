
export function renderLetters (value: string, key: string) {
  if (value === '') return null
  return value.split('').map((letter, index) => (
    <span key={index} className={`letter-anim letter-anim-${key}`}>
      {letter}
    </span>
  ))
}
import type { MouseEvent } from 'react'

interface buttonProps {
  children: string
  isLoading?: boolean
  onClick: () => MouseEvent
}

function Button(props: buttonProps) {
  const { children, onClick, isLoading } = props

  return (
    <button
      type='button'
      className='green hover-white f6 link bn pa3 mr2 mv3 dib'
      onClick={onClick}
      disabled={isLoading}
    >
      {!isLoading ? children : 'Loading...'}
    </button>
  )
}

export default Button

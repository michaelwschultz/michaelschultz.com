import React from 'react'
import { ThemeType } from '../../lib/types';

interface buttonProps {
  children: string,
  isLoading?: boolean,
  onClick: () => React.MouseEvent,
  theme?: ThemeType,
}

function Button(props: buttonProps) {
  const { children, onClick, isLoading, theme } = props;

  return (
    <button
      type="button"
      className={`${theme.textColor} hover-white f6 link bn pa3 mr2 mv3 dib`}
      onClick={onClick}
      disabled={isLoading}
    >
      {!isLoading
        ? children
        : "Loading..."
      }
      <style jsx>{`
        button {
          cursor: pointer;
          background: transparent;
          outline: none;
        }
      `}</style>
    </button>
  )
}

export default Button
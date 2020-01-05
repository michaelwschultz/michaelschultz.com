import React from 'react'

// update onCilck type
interface buttonProps {
  children: string,
  onClick: React.MouseEvent,
  isLoading: boolean,
}

function Button(props) {
  const { children, onClick, isLoading } = props;

  return (
    <button
      className="f6 no-underline white black bg-animate hover-bg-white hover-black inline-flex items-center pa3 ba border-box mr4 br1"
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
        }
      `}</style>
    </button>
  )
}

export default Button
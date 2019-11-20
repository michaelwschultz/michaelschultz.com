import React from 'react'

function Button(props) {
  const { children, onClick, isLoading } = props;

  return (
    <button
      className="f6 br1 ba pa3 dib"
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
        }
      `}</style>
    </button>
  )
}

export default Button
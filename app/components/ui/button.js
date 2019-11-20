import React from 'react'

function Button(props) {
  const { children, onClick, isLoading } = props;

  return (
    <button
      className="f6 link br1 ba pa3 mr2 mv3 dib"
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
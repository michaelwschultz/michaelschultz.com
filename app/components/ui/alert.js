import React from 'react'

function Alert(props) {
  const { children } = props;

  return (
    <div className="mw8 pv1 ph2 center bg-light-blue">
      <h4>{children}</h4>
    </div>
  )
}
    
export default Alert
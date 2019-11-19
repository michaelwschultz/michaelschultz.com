import React from 'react'
import Nav from './nav'

export default ({ children }) => (
  <div>
    <Nav />
    {children}
  </div>
)
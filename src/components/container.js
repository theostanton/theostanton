import React from 'react'
import containerStyles from './layout.module.css'

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)

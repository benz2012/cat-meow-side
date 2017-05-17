import React from 'react'

export default function Center({ children }) {
  return (
    <div className='row'>
      <div className='col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3'>
        {children}
      </div>
    </div>
  )
}

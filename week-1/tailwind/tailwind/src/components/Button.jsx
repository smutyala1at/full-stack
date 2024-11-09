import React from 'react'

function Button({disabled}) {
  return (
    <div className={`px-32 py-2 text-3xl rounded-lg flex items-center justify-center ${disabled? 'bg-zinc-500 cursor-not-allowed' : 'bg-white-700 cursor-pointer'}`}>Button</div>
  )
}

export default Button
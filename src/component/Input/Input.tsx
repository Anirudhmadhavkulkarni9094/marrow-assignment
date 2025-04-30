import React from 'react'

function Input({placeholder, type, value, onChange} : {placeholder: string, type: string, value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div>
        <input placeholder={placeholder} type={type} value={value} onChange={onChange}></input>
    </div>
  )
}

export default Input
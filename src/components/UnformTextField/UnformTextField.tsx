import TextField from '@material-ui/core/TextField'
import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

// import { Container } from './styles';

export default function UnformTextField({ name, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current.childNodes[1].childNodes[0],
      path: 'value'
    })
    // console.log('inputref', inputRef.current.childNodes[1].childNodes[0].value)
  }, [fieldName, registerField])

  return <TextField ref={inputRef} {...rest} />
}

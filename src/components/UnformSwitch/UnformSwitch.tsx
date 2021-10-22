import { Switch } from '@material-ui/core'
import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

// import { Container } from './styles';

export default function UnformSwitch({ name, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current.childNodes[0].childNodes[0],
      path: 'checked'
    })
    // console.log('Switch', inputRef.current.childNodes[0].childNodes[0].checked)
  }, [fieldName, registerField])

  return <Switch ref={inputRef} {...rest} />
}

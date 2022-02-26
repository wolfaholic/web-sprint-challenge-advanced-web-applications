import React, { useState } from 'react'
import PT from 'prop-types'
import '../axios/index'
 

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const { login } = props

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    login(values)
  }

  const isDisabled = () => {  
    if (values.username.trim().length>=3 && values.password.trim().length>=8){
      return false
    } else {
      return true
    }
    
  }

  return (
    <form id="loginForm" onSubmit={ onSubmit }>
      <h2>Login</h2>
      <input
        maxLength={ 20 }
        value={ values.username }
        onChange={ onChange }
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={ values.password }
        onChange={ onChange }
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}

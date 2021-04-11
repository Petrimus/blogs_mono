import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import loginService from '../services/login'
import { setNotification } from '../reducers/notifications'
import storage from '../utils/storage'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('text')
  const history = useHistory()
  const nameReset = username.withoutreset
  const passReset = password.withoutreset

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      username.reset()
      password.reset()
      dispatch(login(user))
      dispatch(setNotification(`${user.name} welcome back!`))
      storage.saveUser(user)
      history.push('/')
    } catch (exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }

  return (
    <div>
      <h1>Login to application</h1>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Input id='username' {...nameReset } placeholder='Username' />
          <Input id='password'{...passReset } placeholder='Password' />
          <Button id='login' type='submit'>login</Button>
        </Form>
      </Wrapper>
    </div>
  )
}

export default LoginForm

const Wrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Form = styled.form`
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
`

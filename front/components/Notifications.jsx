import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  let severity = 'success'

  if (message) {
    severity = message.type === 'error' ? 'error' : 'success'
  }

  return <div>{message && <Alert severity={severity}> {message.message}</Alert>}</div>
}

export default Notification

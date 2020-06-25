const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
        return null
    default:
      return state
  }
}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationRemove = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        notification: null
    }
}

export const setNotification = (message, seconds) => {
    return async dispatch => {
        await dispatch(notificationChange(message))
        setTimeout(() => dispatch(notificationRemove()), seconds * 1000)
    }

}

export default notificationReducer

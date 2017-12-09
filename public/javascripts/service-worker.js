self.addEventListener('push', (event) => {
  let notificationData = event.data.text()
  console.log('Push received  : ', notificationData)

  const title = notificationData
  const body = 'We have received a push message.'
  const icon = '/images/icon-192x192.png'
  const tag = 'simple-push-demo-notification-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      tag
    })
  )
})
self.addEventListener('notificationclick', (event) => {
  console.log('On notification click: ', event.notification.tag)
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
      .then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url == '/' && 'focus' in client) { return client.focus() }
        }
        if (clients.openWindow) {
          return clients.openWindow('/')
        }
      })
  )
})

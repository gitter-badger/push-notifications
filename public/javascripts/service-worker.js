self.addEventListener('push', (event) => {
  let notificationData = event.data.text()
  console.log('Push message : ', notificationData)

  const title = notificationData
  const body = 'Received a push message.'
  const icon = '/images/icon-192x192.png'
  const tag = 'notification-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      tag
    })
  )
})
self.addEventListener('notificationclick', (event) => {
  console.log('Notification Click: ', event.notification.tag)
  event.notification.close()
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
self.addEventListener('notificationclose', (event) => {
  console.log('Notification Close: ', event.notification)
  event.notification.close()
})

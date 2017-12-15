/* eslint-env browser, es6 */
const applicationServerPublicKey = 'BOc7Jx1DZIF6HFesS2uUlDHn6-E32UNHrcN2P8rblCgUvcwMETrlhxEeui7UDOX4Po2jurxb8bJhIWpgn4RlB-w'
const applicationServerPrivateKey = 'TV7TykD-S7PIEG8MPfBHht5iwmz4rXpX584MnxDzuSU'

const pushButton = document.querySelector('.js-push-btn')

let isSubscribed = false
let serviceWorkerRegistrationistration = null

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function updateBtn () {
  if (isSubscribed) {
    pushButton.textContent = 'Unregister from Push Notifications'
  } else {
    pushButton.textContent = 'Register to Push Notifications'
  }

  pushButton.disabled = false
}

function sendToServer (subscription, option) {
  let URL = ''
  switch (option) {
    case 'new':
      URL = '/register'
      break
    case 'update':
      URL = '/update'
      break
    case 'delete':
      URL = '/unregister'
      break
    default:
      console.log('Unexpected error')
      break
  }
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({subscription: subscription})
  })

  const subscriptionJson = document.querySelector('.js-subscription-json')
  const subscriptionDetails =
    document.querySelector('.js-subscription-details')

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription)
    subscriptionDetails.classList.remove('is-invisible')
  } else {
    subscriptionDetails.classList.add('is-invisible')
  }
}
function unsubscribeUser () {
  serviceWorkerRegistrationistration.pushManager.getSubscription()
    .then(function (subscription) {
      if (subscription) {
        sendToServer(subscription)
        return subscription.unsubscribe()
      }
    })
    .catch(function (error) {
      console.log('Error unsubscribing', error)
    })
    .then(function () {
      console.log('User is unsubscribed.')
      isSubscribed = false

      updateBtn()
    })
}

function subscribeUser () {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  serviceWorkerRegistrationistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey
  })
    .then((subscription) => {
      console.log('User is subscribed')

      sendToServer(subscription)

      isSubscribed = true
      updateBtn()
      window.scroll({
        top: 620,
        left: 0,
        behavior: 'smooth'
      })
    })
    .catch((err) => {
      console.log('Failed to subscribe the user: ', err)
      updateBtn()
    })
}

function init () {
  pushButton.addEventListener('click', () => {
    pushButton.disabled = true
    if (isSubscribed) {
      unsubscribeUser()
    } else {
      subscribeUser()
    }
  })

  // Set the initial subscription value
  serviceWorkerRegistrationistration.pushManager.getSubscription()
    .then((subscription) => {
      isSubscribed = !(subscription === null)

      sendToServer(subscription)

      if (isSubscribed) {
        console.log('User IS subscribed.')
      } else {
        console.log('User is NOT subscribed.')
      }

      updateBtn()
    })
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported')

  navigator.serviceWorker.register('public/javascripts/service-worker.js')
    .then((serviceWorkerRegistration) => {
      console.log('Service Worker is registered', serviceWorkerRegistration)

      serviceWorkerRegistrationistration = serviceWorkerRegistration
      init()
    })
    .catch((error) => {
      console.error('Service Worker Error', error)
    })
} else {
  console.warn('Push messaging is not supported')
  pushButton.textContent = 'Push Not Supported'
}

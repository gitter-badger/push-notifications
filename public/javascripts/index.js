/* eslint-env browser, es6 */
const applicationServerPublicKey = 'BOc7Jx1DZIF6HFesS2uUlDHn6-E32UNHrcN2P8rblCgUvcwMETrlhxEeui7UDOX4Po2jurxb8bJhIWpgn4RlB-w'
const applicationServerPrivateKey = 'TV7TykD-S7PIEG8MPfBHht5iwmz4rXpX584MnxDzuSU'

const pushButton = document.querySelector('.js-push-btn')

let isSubscribed = false
let swRegistration = null

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
    pushButton.textContent = 'Push Bildirimlerini Kapat'
  } else {
    pushButton.textContent = 'Push Bildirimlerini Aç'
  }

  pushButton.disabled = false
}

function updateSubscriptionOnServer (subscription) {
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe()
      }
    })
    .catch(function (error) {
      console.log('Error unsubscribing', error)
    })
    .then(function () {
      // updateSubscriptionOnServer(null)

      console.log('User is unsubscribed.')
      isSubscribed = false

      updateBtn()
    })
}

function subscribeUser () {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey
  })
    .then((subscription) => {
      console.log('User is subscribed')

      updateSubscriptionOnServer(subscription)

      isSubscribed = true

      updateBtn()
    })
    .catch((err) => {
      console.log('Failed to subscribe the user: ', err)
      updateBtn()
    })
}

function initializeUI () {
  pushButton.addEventListener('click', () => {
    pushButton.disabled = true
    if (isSubscribed) {
      unsubscribeUser()
    } else {
      subscribeUser()
    }
  })

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then((subscription) => {
      isSubscribed = !(subscription === null)

      updateSubscriptionOnServer(subscription)

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
    .then((swReg) => {
      console.log('Service Worker is registered', swReg)

      swRegistration = swReg
      initializeUI()
    })
    .catch((error) => {
      console.error('Service Worker Error', error)
    })
} else {
  console.warn('Push messaging is not supported')
  pushButton.textContent = 'Push Not Supported'
}

/* eslint-env browser, es6 */
const applicationServerPublicKey = 'BOYPM7MufJXSqnxANhnhfKvB6kn2bCtu8Iya3B9mD5nMd6GEjrRavUhiVekFyhm_V1WvpsGKbRp-iq5wkCXRvBY'
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
  // TODO: Send subscription to application server

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
      // TODO: Unsubscribe user
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

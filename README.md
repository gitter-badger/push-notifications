## push-notification service

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![bitHound Dependencies](https://www.bithound.io/projects/badges/a5185b50-e1d5-11e7-89b1-81ad2b5fa351/dependencies.svg)](https://www.bithound.io/github/Semyonic/push-notifications/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/projects/badges/a5185b50-e1d5-11e7-89b1-81ad2b5fa351/devDependencies.svg)](https://www.bithound.io/github/Semyonic/push-notifications/master/dependencies/npm)
[![CircleCI](https://circleci.com/gh/Semyonic/push-notifications.svg?style=svg&circle-token=4a7e37e29a70d3c44892ba8bbb809ca7f1e21ead)](https://circleci.com/gh/Semyonic/push-notifications)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9adf3b6850664b398b3e5ac57ea61a24)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Semyonic/push-notifications&amp;utm_campaign=Badge_Grade)

[![Inline docs](http://inch-ci.org/github/Semyonic/rest-api.svg?branch=master)](http://inch-ci.org/github/Semyonic/rest-api)


- - -
I wrote same service as a Developer at [Setrow](https://www.setrow.com/en/) by using following techs :

*Languagea :* **PHP,JavaScript (ES6 with Promises)**<br/>
*Database :* **MySQL**<br/>
*Linter :* **ESLint**<br/>
*MessageQueue :* **RabbitMQ**<br/>
*CI: :* **Jenkins**<br/>
*Testing :* **KarmaJS,Karma-Jasmine,PhantomJS**</br>
*Tools :* **Gulp,Closure Compiler**</br>

Service hosted at : push.setrowid.com

- - -
**FCM based, payload supporting push service for webApps.**

## How To
* Create a project from [Google Cloud](https://console.firebase.google.com/)
* Generate [VAPID](https://github.com/web-push-libs/web-push) keys using WebCrypto or OpenSSL at backend
* Get your ***PublicKey** into registration code
* Store ***pub/priv** pair in ***.env** file (ignored, you must create before launching app)
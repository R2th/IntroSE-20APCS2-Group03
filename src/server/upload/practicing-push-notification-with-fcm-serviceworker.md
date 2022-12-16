# Background
A simple ServiceWorker was built in a project. Although the project was completed without incorporating a lot of functions, I was attracted by the word **PUSH notification** and started studying independently. However, because this was very difficult, i think i should take a note.
# Prequisite
* It may not be the official way to embed.
* It may change in the future! I do this memo only for this moment.
* In order to use ServiceWorker, it is necessary to access the page with SSL.

# Directory structure
```
DIRECTORY structure
/(ROOT)
 ├ index.html
 ├ firebase-messaging-sw.js
 ├ app.js
 ├ manifest.json
 ├ script/
 │   └ firebase-init.js
 ├ images/
     ├ 144.png
     └ 192.png
```

# Steps
## Create index.html
The purpose of `index.html` is to display the page and load the necessary Javascript. In this case, since firebase is used, the Javascript that is necessary to use firebase and the processing for using serviceworker will be read.
```
index.html
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">

    <!-- setting for manifest.json  -->
    <link rel="manifest" href="/manifest.json">

    <!-- Javascript to use firebase -->
    <script defer src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>
    <script defer src="https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js"></script>
    <script defer src="/script/firebase-init.js"></script>

    <!-- Javascript to use ServiceWorker -->
    <script defer src="app.js"></script>
  </head>

  <body>
    <h1>SAMPLE ServiceWorker - 00</h1>
  </body>

</html>
```

## manifest.json
`manifest.json` is being used to define the name of this application. The file name itself does not seem meaningful, but it must be defined in json format. Items to be defined are omitted, but `gcm_sender_id` is an item required for PUSH notification using FCM. This value is `103953800507` and seems to be fixed for the time being. I don't know why, but I'll look into it soon.
```
manifest.json
{
    "name": "Service Worker Sample",
    "short_name": "sw sample",
    "icons": [
        {
            "src": "/images/144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "/images/192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ],
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#e91e63",
    "gcm_sender_id": "103953800507",
}
```
## firebase-init.js
There is no specification in the name of `firebase-init.js`. For now, the meaning of the initialization of Firebase is included.
```
script/firebase-init.js
  // The contents of firebaseConfig can be obtained from the firebase console.
  var firebaseConfig = {
    apiKey: "[APIKEYAPIKEYAPIKEYAPIKEYAPIKEY]",
    authDomain: "[AUTHDOMAINAUTHDOMAINAUTHDOMAIN]",
    databaseURL: "[DATABASEURLDATABASEURLDATABASEURL]",
    projectId: "[PROJECTIDPROJECTIDPROJECTID]",
    storageBucket: "[STORAGEBUCKETSTORAGEBUCKETSTORAGEBUCKET]",
    messagingSenderId: "[MESSAGINGSENDERID]",
    appId: "[APPIDAPPIDAPPID]"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  messaging.usePublicVapidKey('[PUBLICVAPIDKEYPUBLICVAPIDKEYPUBLICVAPIDKEYPUBLICVAPIDKEY]');


  messaging.onMessage( payload => {
    // OnMessage is called when the web application receives a notification in the foreground state.
    console.log("onMessage")


  })

messaging.onTokenRefresh(() => {
    //When the token is updated, onTokenRefresh is called.
    messaging.getToken().then((refreshedToken) => {
    console.log(refreshedToken)
    }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
    });
});
```
There were many parts that I didn't understand, but as far as i know it runs like this. The contents of `firebaseConfig` can be obtained from the console of firebase, so you can copy and paste.

However, since information obtained by copy and paste does not include `messagingSenderId`, it must be added. From the firebase console, when you go to cloud messaging, there is an item called `SenderID`, so let's use that value.

In addition, the key given to `messaging.usePublicVapidKey` is also obtained by generating a web push certificate from the firebase console.
## app.js
This is the Process to register `ServiceWorker`. Specifically, the following points should be carefully applied.

* ServiceWorker support status of browser
* Ask user for permission to notify
* If allowed, register for a notification subscription

```
app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {

    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {

        //Confirm user permission for notification
        Notification.requestPermission()
          .then(permission => {

            messaging.getToken().then(
              token => {
                console.log(token)
              })


            if (permission === 'granted') {
              //If notification is allowed
              console.log('granted!!!!!')
              navigator.serviceWorker.ready.then(p => {

                p.pushManager.getSubscription().then(subscription => {

                  if (subscription === null) {

                    //If there is no notification subscription, register.
                    let re = p.pushManager.subscribe({
                      userVisibleOnly: true
                    })

                  }
                })

              })

            } else {
              //If notification is not allowed
              console.log(permission)
            }
          })
      })
  })
}
```

## firebase-messaging-sw.js
`firebase-messaging-sw.js` is a script that runs in the background. Since it is registered in the browser and runs independently in the background, it is necessary to describe all of the Javascript reading processing necessary for using firebase.

The following points are important.

* Register an event when a PUSH notification is received
* Register an event when a PUSH notification is received in the background

```
firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js");

// The contents of firebaseConfig can be obtained from the firebase console.
var firebaseConfig = {
  apiKey: "[APIKEYAPIKEYAPIKEYAPIKEYAPIKEY]",
  authDomain: "[AUTHDOMAINAUTHDOMAINAUTHDOMAIN]",
  databaseURL: "[DATABASEURLDATABASEURLDATABASEURL]",
  projectId: "[PROJECTIDPROJECTIDPROJECTID]",
  storageBucket: "[STORAGEBUCKETSTORAGEBUCKETSTORAGEBUCKET]",
  messagingSenderId: "[MESSAGINGSENDERID]",
  appId: "[APPIDAPPIDAPPID]"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// When a notification is received, the push event is called.
self.addEventListener('push', function (event) {

  console.log("event:push")
  let messageTitle = "MESSAGETITLE"
  let messageBody = "MESSAGEBODY"
  let messageTag = "MESSAGETAG"

  const notificationPromise = self.registration.showNotification(
    messageTitle,
    {
      body: messageBody,
      tag: messageTag
    });

  event.waitUntil(notificationPromise);

}, false)

// If the web application is in the background, setBackGroundMessageHandler is called.
messaging.setBackgroundMessageHandler(function (payload) {

  console.log("backgroundMessage")

  let messageTitle = "MESSAGETITLE"
  let messageBody = "MESSAGEBODY"

  return self.registration.showNotification(
    messageTitle,
    {
      body: messageBody,
      tag: messageTag
    });
});
```
Notifications are created by calling `self.registration.showNotification`. Pass the title and options (text etc.) as arguments.

`messageTitle` and `messageBody` are fixed values, but they are originally obtained from event and payload and made into appropriate information. If you try "Send notification from Firebase console" and "Send notification using curl command", you will find fields to enter the title and text.

# Testing
## Send notifications from the Firebase console
Sending notifications from the Firebase console You can create a notification by opening Cloud Messaging from the Firebase console, so you can send it by entering the title and body and setting the target app.

## Sending notifications with the curl command
```
Send notifications via Firebase using curl
curl -X POST \
--header "Authorization: key=[SERVERKEY] \
--header Content-Type:"application/json" \
https://fcm.googleapis.com/fcm/send \
-d @- << EOF
{
  "notification": {
    "title":"test",
    "body":"text message"
    },
  "to": "[DEVICETOKEN]"
}
EOF
```
* SERVERKEY is obtained from the Firebase console.
* DEVICETOKEN is output to the browser console when a token is acquired with app.js or firebase-init.js, so copy it.

## Browser (Chrome)
Open the developer tool, you can check the status of ServiceWorker in the Application tab. If it doesn't work, press the Unregister link and load the page again. When a notification is received, one of "event: push", "onMessage", or "backgroundMessage" will be push out to the Console tab.

If it works correctly, a notification dialog will appear even if the browser is minimized or the page tab is closed.

# Others
Although I did not understand correctly, I was able to display a notification for now. In addition, I will tell what I was worried about and what I struggled with.
## `messaging.setBackgroundMessageHandler` was rarely called.
This is also described in the [Firebase documentation](https://firebase.google.com/docs/cloud-messaging/js/topic-messaging?hl=en). If there is a notification field (notification) in the sent information, setBackgroundMessageHandler seems not to be called. When I modified the above-mentioned "sending notification by curl command" and rewriting notification to data, setBackgroundMessageHandler was called.
```
Send notification via Firebase using curl (no notification item)
 
curl -X POST \
--header "Authorization: key=[SERVERKEY] \
--header Content-Type:"application/json" \
https://fcm.googleapis.com/fcm/send \
-d @- << EOF
{
  "data": {
    "title":"test",
    "body":"text message"
    },
  "to": "[DEVICETOKEN]"
}
EOF
```
## will the notification dialog be displayed when the web app is not in the foreground state?
I had a hard time confirming this behavior. In the first place, I did not understand what was the correct behavior. The notification dialog appeared only when the WEB app was not in the foreground (… maybe this understanding may be wrong). And I wasn't sure which state was in the foreground and which wasn't, so I tried to make it clearly not in the foreground, such as "minimize window" or "close tab".
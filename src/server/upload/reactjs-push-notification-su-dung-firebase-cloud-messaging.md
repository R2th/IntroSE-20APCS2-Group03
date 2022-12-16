Xin chào, trong bài viết này mình sẽ thực hiện chức năng push notification trên trang web ReactJS sử dụng Firebase Cloud Messaging (FCM)
### Các bước chính
1. Khởi tạo project ReactJS
2. Tạo project Firebase và setup FCM
3. Cấu hình Firebase trong app ReactJS để nhận message push từ FCM<br>
a. Foreground<br>
b. Background<br>
## 1. Khởi tạo project ReactJS
Để khởi tạo project ReactJS đơn giản, mình sử dụng [create-react-app](https://create-react-app.dev/):<br>
```
npx create-react-app demo-fcm --template typescript
```
Sau đó chạy thử project:
```
cd demo-fcm
npm start
```
Kết quả:<br>
![image.png](https://images.viblo.asia/97f0b285-108d-4ac6-9ca8-8bd410125de7.png)<br>
## 2. Tạo project Firebase và setup FCM
Đăng nhập vào Firebase Console, chọn **Add project**:<br>
![Screen Shot 2022-08-25 at 14.35.01.png](https://images.viblo.asia/8b5479d6-4504-46bb-b60a-4d6a5a86ad19.png)<br>
Mình đặt tên là **demo-fcm**, chọn **Continue** và **Create project**<br>
![Screen Shot 2022-08-25 at 14.35.45.png](https://images.viblo.asia/1109a22d-4874-4a2c-a653-1811bc0f304a.png)<br>
Đợt 1 chút để project được khởi tạo xong, chọn **Continue**.<br>
Tại trang chủ của project, bấm vào biểu tượng **< />** để setup cho Web<br>
![Screen Shot 2022-08-25 at 14.38.45.png](https://images.viblo.asia/06f33994-d4c4-4414-805b-b13aaac23722.png)<br>
Mình đặt tên là **demo-fcm-app**, chọn** Register app**<br>
![Screen Shot 2022-08-25 at 14.40.50.png](https://images.viblo.asia/f3e1b2c8-5f0a-4693-b77f-924d62ed7414.png)<br>
Chọn **Continue to console**<br>
Tại màn hình chính của project, ở menu bên trái, nhấn vào biểu tượng răng cưa, chọn **Project settings**. Sau đó chọn tab **Cloud Messaging**<br>
![Screen Shot 2022-08-25 at 14.46.16.png](https://images.viblo.asia/9e794747-6be4-45ec-a901-2bcd7e037682.png)<br>
Ở phần **Cloud Messaging API (Legacy)** (đang hiện **Disable**), chọn biểu tượng 3 chấm => Manage API in Google Cloud Console<br>
Ở cửa sổ mở ra, chọn **Enable**:<br>
![Screen Shot 2022-08-25 at 14.47.53.png](https://images.viblo.asia/9c3fa4a1-d32d-47a8-ad05-ff884bd664aa.png)<br>
Sau đó reload lại trang **Project settings**, phần **Cloud Messaging API (Legacy)** đã được **Enabled** và bên dưới là **Server key**<br>
Tại phần **Web Push certificates**, bấm vào Generate key pair: (cái này là **VAPID key**)<br>
![Screen Shot 2022-08-25 at 16.42.08.png](https://images.viblo.asia/feb656ba-eb08-4ba9-b801-cf355cc2df00.png)<br>
Như vậy là đã cấu hình setup xong project Firebase<br>
## 3. Cấu hình Firebase trong app ReactJS để nhận message push từ FCM
Trước tiên mình sẽ install package firebase, ở đây mình dùng firebase version 8:<br>
```
npm install firebase@8.2.0
```
Tạo file **constants.ts** trong thư mục src để lưu Firebase config:<br>
```
//src/constants.ts
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "your_auth_domain",
  projectId: "your_projectId",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```
Config lấy từ **Project settings**, tab **General**:<br>
![Screen Shot 2022-08-25 at 17.15.53.png](https://images.viblo.asia/4ecea63a-3363-4ccf-9769-c1b619a88fc9.png)<br>
### a. Foreground
Để nhận foreground message (khi đang ở tab trang web), mình sẽ viết 1 hàm lắng nghe message khi đang focus vào web.<br>
Trong thư mục src, tạo file **firebase.ts** với nội dung:<br>
```
import { useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from './constants';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY,
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
```
File này mình định nghĩa hàm onMessageListener để hứng message, hàm này có thể được gọi trong useEffect:<br>
Trong file App.tsx, mình thêm 2 useEffect sau:<br>
```
useEffect(() => {
    getMessagingToken();
  },[])
 useEffect(() => {
   onMessageListener().then(data => {
      console.log("Receive foreground: ",data)
   })
})
```
useEffect đầu tiên dùng để lấy Registration token từ Firebase<br>
useEffect sau dùng để hứng message được push từ Firebase (lưu ý là useEffect này không có dependencies)<br>
Chạy thử project lên xem nhé:<br>
 Trang web sẽ yêu cầu cho phép gửi thông báo, chọn Cho phép, ta sẽ thấy **FCM registration token** được console.log ra:<br>
 ![Screen Shot 2022-08-25 at 17.42.47.png](https://images.viblo.asia/29a1ac55-ee07-4621-8880-ac3aabe8e0ac.png)<br>
 Thử bắn message từ firebase (lưu ý là phải đang mở tab của trang web):<br>
 Vào Firebase, tại menu bên trái, chọn **Engage** => **Cloud Messaging** => **Send your first message**:<br>
 ![Screen Shot 2022-08-25 at 17.45.21.png](https://images.viblo.asia/bd1842bd-17b7-4cfc-a191-d6863430db82.png)<br>
Chọn Send test message, paste token được console.log ra ở trên và chọn +<br>
![Screen Shot 2022-08-25 at 17.46.00.png](https://images.viblo.asia/3999b4eb-2c40-4b68-a373-c978affb8245.png)<br>
Chọn **Test** và message được bắn về trang web:<br>
![Screen Shot 2022-08-25 at 17.47.37.png](https://images.viblo.asia/87825e90-8a77-4f68-b832-d2d089709aa4.png)<br>
Như vậy là chức năng push notification foreground đã hoạt động.<br>
### b. Background
Để push notification từ background, cần phải có [**service workers**](https://web.dev/learn/pwa/service-workers/)<br>
Ở thư mục gốc, tạo file **firebase-messaging-sw.js** với nội dung sau:<br>
```
//src/firebase-messaging-sw.js
import {firebaseConfig} from './src/firebase'
if ('serviceWorker' in navigator) {
  const firebaseConfigParams = new URLSearchParams(firebaseConfig).toString();
  navigator.serviceWorker
    .register(`../firebase-messaging-sw.js?${firebaseConfigParams}`)
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
```
Ở file này mình sẽ register 1 service worker với params là **firebaseConfig** được import từ constants mà mình trình bày ở phần a.<br>
Trong thư mục public, mình tạo 1 file **firebase-messaging-sw.js** với nội dung sau:<br>
```
//public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

self.addEventListener('fetch', () => {
  const urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(self.firebaseConfig || defaultConfig);
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel('notifications');
  messaging.onBackgroundMessage(function (payload) {
    //can not console.log here
    channel.postMessage(payload);
  });
}
```
Đây chính là file service worker. File này sẽ initilize Firebase app và hứng message từ background.<br>
Sau khi nhận được background message, mình sẽ muốn console.log ra để xem. Tuy nhiên do luồng service worker chạy độc lập nên sẽ không thể console.log ở trong file này.<br>
Mình sẽ dùng **BroadcastChannel** để giao tiếp giữa luồng service worker và luồng web: <br>
```
...
const channel = new BroadcastChannel('notifications');
...
channel.postMessage(payload);
```
Tiếp theo là ở luồng web, mình nhận data từ **BroadcastChannel** và console.log ra thôi.<br>
Tại file **App.tsx**, mình thêm đoạn code vào **useEffect** đầu tiên, sau khi thêm thì nó sẽ như thế này:<br>
```
//src/App.tsx
...
useEffect(() => {
    getMessagingToken();
    const channel = new BroadcastChannel("notifications");
    channel.addEventListener("message", (event) => {
      console.log("Receive background: ", event.data);
    });
  },[])
...
```
Như vậy là trang web đã sẵn sàng nhận background message. Cùng thử xem nhé!<br>
Ở trình duyệt, mình mở sang tab khác, sau đó test push message như ở phần a, và đây là kết quả khi mình quay lại tab trang Web:<br>
![Screen Shot 2022-08-26 at 11.23.18.png](https://images.viblo.asia/219b98bf-6786-428c-8889-54082b616457.png)<br>
Vừa rồi mình đã trình bày chức năng push notification sử dụng Firebase Cloud Messaging (mang tính demo cho phần frontend). <br>
Trong hệ thống thực tế, thường thì chúng ta sẽ lưu registration token dưới database và khi có event thì bắn event sang Firebase thông qua server backend của hệ thống (chẳng hạn như NodeJS thì thường sử dụng [firebase-admin](https://www.npmjs.com/package/firebase-admin))<br>
**Cảm ơn mọi người đã đọc bài viết!**
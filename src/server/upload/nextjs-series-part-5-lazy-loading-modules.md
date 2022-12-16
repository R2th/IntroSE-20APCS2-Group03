Next.js tự động split code dựa trên các page trong app của bạn. Ví dụ, nếu một module được dùng trong ít nhất một nửa số page thì Next.js sẽ chuyển module đó vào trong file js bundle chính. Nếu không module đó sẽ có trong file bundle JavaScript riêng của page.

Thi thoảng bạn có thể muốn có nhiều kiểm soát hơn việc load các module này. Ví dụ trường hợp sau: Ta muốn xây dựng một trang kiểu Hacker News clone dựa trên firebase API. Ta muốn fetch data ở server để render page từ server. Ta cũng muốn fetch data ở client khi cần (chuyển sang page khác).

Trong ví dụ này, mặc định module "firebase" sẽ được gộp vào file bundle chính của app. Tuy nhiên đây là một module khá nặng. Ở phía client, thực tế ta chỉ cần đến module này khi chuyển sang page khác. Vì vậy nếu ta có thể chỉ load module "firebase" ở tình huống đó ta có thể tiết kiệm được thời gian load trang ban đầu từ server.

Chúng ta hãy thử tìm hiểu xem ta sẽ thực hiện điều đó bằng cách nào nhé.

### Cài đặt
Đầu tiên clone code sample về và checkout sang branch cần thiết

```
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout firebase-hn
```

Sau đó chạy app bằng command sau

```
npm install
npm run dev
```

Mở trình duyệt tại http://localhost:3000 bạn sẽ thấy page Home với một list post hiện ra.
![](https://images.viblo.asia/220eb6ec-1788-4cfe-868d-f71ac4f18d0f.png)

Khi chạy command
```
npm run analyze
```
Bạn sẽ thấy module "firebase" nằm trong bundle "commons.js" vì module này được dùng trong tất cả các page của app.
![](https://images.viblo.asia/d9c8efa8-b2f3-448c-a8dc-db80e50010a7.png)

### Lazy Loading
Chúng ta sẽ sử dụng module "firebase" chỉ khi người dùng chuyển sang page khác bằng cách đơn giản đó là sử dụng tính năng dynamic import của Next.js.
Code liên quan đến firebase nằm trong file "lib/load-db.js".
```
export default async () => {
  const firebase = require('firebase')

  try {
    firebase.initializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com'
    })
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  return firebase.database().ref('v0')
}
```

Hàm này được dùng bên trong hàm "getInitialProps" ở mỗi page và dùng "require" để load module firebase.
Bây giờ ta sẽ thay đổi một chút code trên khi require module "firebase".

```
// const firebase = require('firebase')
const firebase = await import('firebase')
```

Ở đây ta đã dùng function "import()" để load firebase module. Function này return một promise và ta dùng "await" để chờ và resolve module "firebase".

Chạy command
```
npm run analyze
```

Ta sẽ thấy firebase có một file bundle riêng với format tên chunks/firebase-[a-random-string].js. Bundle này chỉ được load khi ta import "firebase".
![](https://images.viblo.asia/e7f2d044-3f9c-4b0f-b34b-faf272f922a9.png)

Thử test lại app bằng cách chạy command sau
```
npm run build
npm run start
```

Mở trình duyệt ở http://localhost:3000 và mở tab network ở devtool.

Để ý rằng khi page Home load lần đầu, module firebase chưa được load về. Khi click vào link post và chuyển đến page Post, module firebase được load về. Khi click vào link Home để quay lại page Home thì module firebase không phải load lại. 
Ở đây, lần đầu tiên "getIntitialProps" ở page "pages/post.js" import module "firebase" (thông qua "lib/load-db.js"). Do vậy app load về bundle firebase. Ở lần thứ hai, khi quay lại page Home, mặc dù "pages/index.js" cũng import module "firebase" nhưng vì module này đã được load về trước đó nên app sẽ không load lại nữa.
Điều này có nghĩa là module này chỉ được load khi cần đến và cũng chỉ cần load một lần cho tất các page. Yay!!!
## Giới thiệu:
Như chúng ta đều biết các web ap iện giờ đang được sử dụng rộng rãi các tính năng của  Progressive Web App. Để có thể hỗ trợ tốt cho PWA, chúng ta cần khai báo các thông tin trong tệp manifest để trình duyệt có thể hiểu được khi cài đặt cũng như lauched web app của ta. Giờ chúng ta hãy cùng tìm hiểu nào

Chú ý: safari hiện nay hỗ trợ còn chưa tốt bằng các OS khác(mặc dù với phiển bản mới)
## Cùng tìm hiểu cơ bản về tệp manifest
### 1> Các thông tin cơ bản:
Tệp manifest thường sẽ khai báo các thông tin cơ bản như tên app, tên rút gọn, icon của app khi cài đặt, cũng như url khi được lauched
Vi dụ ta sẽ tạo 1 file manifest:
```json
{
  "short_name": "đây la tên rút gọn",
  "name": "đây là tên của app",
  "description": mô tả thông tin của app",
  "icons": [
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": shortcut",
      "short_name": "tên shortcut",
      "description": "mô tả",
      "url": "/",
      "icons": [{ "src": "/images/icon.png", "sizes": "192x192" }]
    },
   ....
  ]
}
```
Sau đo ta sẽ link file này vào index.html:
``` html
<link rel="manifest" href="/manifest.webmanifest">
```

Chi tiết về mô tả trong file manifest sẽ như sau:
- name: tên của app
- short_name: tên này thường được sử dụng khi thêm vào home, laucher mà bị giới hạn trong số ký tự đặt tên
- icons : đây là 1 mảng danh sách các icon, ta cần khai báo src, type, và sizes. Khai báo 1 mảng như thế này vì tùy thuộc vào trình duyệt và có kích thước màn hình khác nhau việc hiển thị sẽ được rõ ràng hơn
- start_url: bắt buộc phải khai báo vì nó ần thiết để hiểu rằng app của mình bắt đầu laucher từ đâu
- background_color : nền của splash screen (khi  ứng dụng được lauchẻ lần đầu trên mobile
- theme_color: đặt màu nền của thanh bar
- display: ta sẽ quy định khi web app được mở ra thì nó sẽ hiển thị như thế nào. Ví dụ: `fullscreen` sẽ hiển thị full màn hình ẩn đi các phần như url bar, `standalone` chỉ hiển thị các thành phần cơ bản, minimal-ui sẽ giống như `standalone`  nhưng sẽ thêm nút back, reload, `browser` trải nghiệm đầy đủ cơ bản của UI của browser


###  2> Test file manifest sẽ như thế nào:
Nếu bạn dùng chrome, bạn có thể vào devtool -> application và xem chi tiết

### 3> Các chú ý:
Vì mỗi trình duyệt, mỗi môi trường system sẽ khác nhau nên để manifest có thể hoạt động tốt cũng như tạo ra trải nghiệm tốt cho người dùng ta cần phải thay đổi 1 chút. Phần này mình sẽ update thêm. Mình sẽ viết vài issue trước:
#### a) Chú ý việc tạo icon trên hệ điều hành android:
Khi tạo icon bạn nên sử dụng nó dươi định dạng  `maskable icons` .  Nó là gì vậy? Nó vẫn là icon bình thường nhưng kích thước bị co lại, thay vì trước đây bạn để icon là 1 hình vuông có kích thước 100% -> giờ bạn sẽ làm thành hình tròn có bán kích 40%.

Lý do tại sao phải như vậy? Bạn có thể tìm hiểu 2 bài này https://css-tricks.com/maskable-icons-android-adaptive-icons-for-your-pwa/ hoặc https://web.dev/maskable-icon/ . Mình có thể hiểu là do các nhà sản xuất khác nhau sẽ custom lại cách hiển thị icon của ứng dụng khác nhau, đặc biệt với các đời android thấp bạn sẽ bị cắt xén, thường là 1 góc vơi độ rộng 10% ===> lên android đời cao hầu như các nhà sản xuất đều để dạng icon gần như dưới dạng  `maskable icons` -> tốt nhất bạn nên để nó dưới dang này
![](https://images.viblo.asia/6dfdf744-51ea-4acb-b21e-3815d9c38a65.png)
(hình minh họa cho mỗi nhà sản xuât hiển thị mỗi kiểu icon khác nhau)

Bạn có thể dùng tool để tạo, như tool này: https://maskable.app/editor
![](https://images.viblo.asia/b9cef770-3220-4ec2-b6c6-89d33ce232cb.png)


#### b) Hiển thị icon trên ios:
Có 1 cách thông thường là mình sẽ nên thêm 1 đoạn khai báo sau ở thẻ head html để có thể hoạt động tốt hơn trên ios
``` html
 <meta name="viewport" content="width=device-width">
  <title>Add to Homescreen</title>
  <meta name="apple-mobile-web-app-capable" content="yes">
  
  
  <meta name="apple-mobile-web-app-title" content="Test name 2">
  
  <link rel="apple-touch-icon" href="touch-icon-iphone.png" >
  <link rel="apple-touch-icon" sizes="76x76" href="http://placekitten.com/76/76">
  <link rel="apple-touch-icon" sizes="120x120" href="http://placekitten.com/120/120">
  <link rel="apple-touch-icon" sizes="152x152" href="http://placekitten.com/152/152">

  <meta name="msapplication-starturl" content="latest?launchedTest" />
  ```

#### c) Lỗi không nhận diện manifest:
Phần này mình xin phép sẽ cập nhật sau

### 4> Một số tool hay ho:
#### a) webpack-pwa-manifest:
Nếu bạn đang dùng webpack và muốn cấu hình tự dộng tạo ra 1 file manifest  tự động inject vào html, hỗ trợ icon resizng hay fingerprinting bạn có thể lựa chọn tool này.

Cài đặt:
```cmd
npm install --save-dev webpack-pwa-manifest
```
Bạn có thể tham khảo ví dụ trong docs của họ, việc cấu hình cũng dể hiểu và khá tương tự với 1 file manifest bình thường
```js
// ES6+
import WebpackPwaManifest from 'webpack-pwa-manifest'

// ES5
var WebpackPwaManifest = require('webpack-pwa-manifest')

plugins: [
  new WebpackPwaManifest({
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/assets/icon.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/assets/large-icon.png'),
        size: '1024x1024' // you can also use the specifications pattern
      },
      {
        src: path.resolve('src/assets/maskable-icon.png'),
        size: '1024x1024',
        purpose: 'maskable'
      }
    ]
  })
]
```

## Kết luận và tham khảo:
Việc áp dụng vào file manifest sẽ giống ứng dụng của bạn thân thiện hơn cho người dùng nhưng cũng cần linh hoạt với từng browser cũng như os.

Mình cảm ơn các bạn đã đọc bài của mình, bài của mình sẽ update thêm các hình ảnh, các issue cũng như vài tool hay ho 

Tham khảo: https://web.dev/add-manifest/
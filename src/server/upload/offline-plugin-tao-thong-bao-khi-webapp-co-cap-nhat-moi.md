Chào các bạn! Chúng ta lại gặp lại rồi :v Thì lần này mình sẽ nói tiếp về chủ đề offline với web app! Trong bài trước (các bạn có thể xem tại [đây](https://viblo.asia/p/gioi-thieu-plugin-webpack-dung-trong-viec-xu-ly-offline-Do7546LBZM6#_1-gioi-thieu-ve-offline-plugin-0)), mình không biết đã bao  lâu rồi, mình có nói về việc sử dụng thư viện `offline-plugin` để xử lý trường hợp webapp của chúng ta ở chế độ offline. `offine-plugin` rất OK đúng không nào. Nhưng không dừng ở đó nó không chỉ giải quyết vấn đề offline mà còn nhiều vấn đề khác nữa. Hôm nay thì mình sẽ giới thiệu tới các bạn một tính năng khá thú vị nữa là "Tạo thông báo khi webapp của chúng ta có tính năng mới". Lưu ý là trong bài viết này thì mình sẽ chỉ đề cập đối với Single Page Application webapp thôi nhé! Bắt đầu thôi nào!

# I. Khái quát về `offline-plugin` và `Service Workers`.
`offline-plugin` như mình đã giới thiệu ở bài trước thì nó giúp chúng ta giải quyết vấn đề offline đúng không nào. Plugin này cung cấp cho chúng ta những lựa chọn cho phép chúng ta bằng một cách dễ dàng nhất kiếm soát việc webapp của chúng ta có thể làm việc được ngay cả khi không có internet.

Plugin này sẽ dựa trên một Web API là `Service Workers` để hỗ trợ chính trong việc giải quyết vấn đề offline.

Một `Service Worker` là một đoạn script mà trình duyệt chạy ngầm ở dưới, tách biệt khỏi trang web.

Một số điều về `Service Workers` như dưới:
- Nó là một Javascript Worker nên nó không thể trực tiếp truy cập cũng như thao tác vào DOM. Nhưng bù lại nó sẽ giao tiếp với trang web của chúng ta thông qua `postMessage` và trang web sẽ thay thế làm việc với DOM nếu có yêu cầu.
- `Service Worker` bản thân nó là một network proxy cho phép chúng ta kiểm soát những network request từ trang web của chúng ta.

Khi chúng ta áp dụng `offline-plugin` vào webapp thì nó sẽ khởi chạy một `Service Worker` và `Service Worker` sẽ làm những việc tiếp theo.

Khi chúng ta khởi tạo một `Service Worker` thì sẽ cần 1 file cấu hình. Thì file cấu hình này sẽ chứa những thông tin cần thiết để chúng ta cache những asset của webapp của mình và trong trong đó cũng chứa licycle của `Service Worker` đó, những event handle cần thiết. Mặc định thì `offline-plugin` nó sẽ tạo sẵn cho chúng ta (sau khi chúng ta build source code) và file này sẽ cùng cấp với `index.html` của chúng ta.

Bình thường thì khi app của chúng ta đã khởi chạy thành công một `Serice Worker` thì khi chúng ta truy cập vào trang web thì những asset (có thể là fle .html, .css, .js, image, ...) sẽ được lấy ra từ `Service Worker` thay vì fetch lên web server và lấy về.

Vấn đề là khi chúng ta muốn release những tính năng mới cho webapp của chúng ta thì có thể gặp một số vấn đề không mong muốn như dưới:

- Webapp của chúng ta sẽ không có tính năng mà chúng ta mới phát triển và release (vì những tính năng đó chưa được `Service Worker` áp dụng) dù có cố gắng load lại trang web??? Nhưng một thời gian (mặc định là 24 giờ) thì tính năng đó sẽ được áp dụng??
- Hoặc có thể những tính năng của chúng ta sẽ không được áp dụng cho đến khi chúng ta load lại trang web của mình, không có một thông báo nào cả?

Để giải quyết những vấn đề trên thì mình sẽ xây dựng 1 app demo. Cùng bắt đầu nào!
# II. Step by step.
Đầu tiên chúng ta sẽ cần setup một base source. Ở đây mình sẽ sử dụng `ReactJS` nhé! Và base chúng ta dùng sẽ là `react-boilerplate` (chắc nhiều bạn biết rồi :v) để setup nhanh và đi vào phần chính của chúng ta.

`react-boilerplate` thì mặc định nó đã xử lý giúp chúng ta vấn đề offline rồi.

Hãy lấy source về và kiếm tra phần cấu hình `offline-plugin` trong `webpack.prod.babel.js` như dưới:
```javascript
 new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',

     // Phần này còn tùy thuộc vào web server là apache
      excludes: ['.htaccess'],
      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js'],
      },
      safeToUseOptionalCaches: true,
    }),
```
Bên trên là cấu hình mặc định mà base `react-boilerplate` cung cấp cho chúng ta. Với cấu hình trên thì webapp của chúng ta vẫn có thể chạy offline khá ổn! Nhưng nó vẫn sẽ gặp 1 trong 2 vấn đề trên.

Bước tiếp theo chúng ta sẽ thay đổi một số cấu hình `offline-plugin` trong file `webpack.prod.babel.js`
```javascript
 new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      autoUpdate: 1000 * 60 * 2, // Setting thời gian kiểm tra thay đổi mới là 2 phút

      ServiceWorker: {
        events: true, // Bật phần event runtime cho Service Worker
      },

      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js'],
      },

      safeToUseOptionalCaches: true,
    }),
```
Việc chúng ta bật phần event runtime cho `Service Worker` để giúp hỗ trợ handle những event trong quá trình `Service Worker` làm việc. `offline-plugin` cũng cung cấp cho chúng ta một số method cho việc này nằm ở `offline-plugin/runtime`.
- `install(options: Object)` - Bắt đầu cài đặt cho `Service Worker`. Thường được gọi ở `app.js` và nó sẽ được gọi lại mỗi lần trang web load lại.
- `applyUpdate()` - Chúng ta sẽ dùng nó để áp dụng những thay đổi mới của `Service Worker`.
- `update()` -  Thực hiện kiểm tra có cập nhật nào mới của `Service Worker` hay không?

và những event handler mà `offline-plugin` cung cấp cho chúng ta (nó nằm trong `options` của method `install`).
- `onInstalled` - Event này chỉ được kích hoạt một lần duy nhất khi mà `Service Worker` được cài đặt hoàn tất. Ở đây chúng ta có thể `console.log` ra một thông điệp nào đó chắng hạn như là `Ứng dụng đã sẵn sàng để được sử dụng offline`.

- `onUpdating` - Event này được kích hoạt khi mà một cập nhật được phát hiện và trình duyệt bắt đầu quá trình cập nhật. Tại đày thì những assets (.css, .js, ...) sẽ được trình duyệt download về.
- `onUpdateReady` Event này sẽ được kích hoạt ngay sau khi event `onUpdating` hoàn thành. Có nghĩa là những tất cả những asset cần thiết đã được download và sẵn sàng để được áp dụng. Lúc này là thích hợp để gọi `runtime.applyUpdate()` để áp dụng những thay đổi.
- `onUpdated` - Event này được kích hoạt khi mà những cập nhật đã được áp dụng (hoặc có thể bằng cách sau khi gọi `runtime.applyUpdate()` hoặc một số cách khác bởi trình duyệt).

Bước kế tiếp chúng ta sẽ dùng `onUpdateReady` và `onUpdated` để handle như đoạn code bên dưới trong file `app.js`:
```javascript
if (process.env.NODE_ENV === 'production') { // Chỉ cài đặt khi chạy ở production mode
  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(), // Áp dụng cập nhật
    onUpdated: () => // Thông báo cho người dùng là có cập nhật mới
      window.alert(
        'New updates is ready! Please feel free and reload this page!',
      ),
  });
}
```
Sau khi sửa 2 phần cấu hình trên thì hãy thử build và chạy production ở local bằng cách chạy lệnh dưới đây:

```yarn run start:production``` Lệnh này sẽ build source code và dựng một web server để chạy app của chúng ta.

```yarn run build``` Lệnh này thì sẽ chỉ build source code. Chúng ta sẽ thay đổi soure code 1 chút và chạy lệnh này để xem việc thông báo cập nhật mới có kết qua hay không?

Đây là kết quả khi chạy lần đầu ở file `app\containers\HomePage\index.js` chúng ta sẽ thêm một dòng text `Not yet applied feature`.
![](https://images.viblo.asia/6fe587e9-a924-4932-8414-71705dbab5aa.PNG)

Hãy thử thay đổi `Not yet applied feature` => `New update was applied!` ở file `app\containers\HomePage\index.js` và chạy lại lênh `yarn run build`. Và sau khoảng 2 phút kết quả chúng ta nhận được sẽ như dưới:
![](https://images.viblo.asia/1cead3fa-81c0-434c-afd9-40a7705c4ce3.PNG)
Như hình trên chúng ta có thể thấy là sẽ có 2 bản cache là bản cũ và bản mới chúng ta vừa mới  build.

Và việc thông báo có cập nhật mới của chúng ta cũng đã được hiện ra.
![](https://images.viblo.asia/bc12b803-8701-4903-932e-08b5f17d211d.PNG)
Tiếp đến, mặc dù là đã cập nhật thay đổi mới nhưng đoạn text của chúng ta vẫn chưa thay đổi. Và trang web cần được load giống như chúng ta thông báo với người dùng.
![](https://images.viblo.asia/e1e35d98-49c5-4413-883a-eac085ee28ab.PNG)
Sau khi reload lại trang web thì chúng ta sẽ thấy được thay đổi. Rất thú vị đúng không nào. Thực tế chúng ta có thể reload lại được luôn ngay tại `onUpdated`, nhưng có vẻ là không hợp lý khi người dùng đang thực hiện một thao tác nào đó. Thay vào đó chúng ta báo cho người dùng biết để họ chủ động reload trang web thì sẽ ổn hơn đúng không nào.

# III. Kết luận.
Vậy là chúng ta vừa dựng xong một demo webapp dùng `react-boilerplate` có thể thông báo cho người dùng mỗi khi chúng ta áp dụng chức năng mới vào trang web.

Thì bài viết của mình đến đây là hết rồi! Mong rằng bài viết này sẽ có ích cho các bạn. Nếu các bạn có bất cứ thắc mắc nào xin hãy comment bên dưới và mình sẽ giải đáp (với lượng kiến thức mình đang có thui nhé :v). Xin chào và hẹn gặp lại các bạn trong các bài viết kế tiếp. Xin chào!!!
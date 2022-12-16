Có lẽ đã có rất nhiều bạn đã biết đến khái niệm Single Page Application (SPA). Và ReactJS là một trong số những framework javascript đụng đến khái niệm SPA này. Trong một SPA thì server sẽ chỉ phục vụ 1 page duy nhất trỏ đến 1 file HTML (vd: index.html) xuyên xuốt quá trình chạy của app, áp dụng cho tất cả các route. Khi page được tài về thì ở client sẽ quyết định việc là phải hiển thị những cái gì trên trình duyệt cho cái route hiện tại muốn trỏ về. Đồng nghĩa với việc khi chúng ta thêm những feature mới và muốn apply cho app của mình thì ở page ở client cần phải được tải lại để fetch những resource mới nhất về. Trong một số trường hợp chúng sử dụng cơ chế splitting code thì khi tải 1 source code chưa được tải sẽ dẫn đến page bị trắng, và một số lỗi tương tự khác như offline, ...vvv Thì để xử lý vấn đề này chúng ta thường hướng đến việc sử dụng cache để cache resource của chúng ta tại thời điểm khi tải app page. Thì ServiceWorker là từ khoá được hướng tới nhiều nhất. Thì hôm nay mình xin phép được giới thiệu với mọi người một plugin (webpack) dùng để hộ trỡ việc xử lý cache bằng cách sử dụng ServiceWorker.

#  1. Giới thiệu về `offline-plugin`
Thì như mình đã giới thiệu ở trên thì plugin này sẽ sử dụng để hỗ trợ việc sử dụng ServiceWorker (một feature trong plugin) để cache resource tại client.

Plugin này như cái tên của nó là cung cấp những trải nghiệm offline cho người dùng. Nó sử dụng cho những dự án sử dụng webpack để bundle resource.

Trong file `webpack.config.js` hãy thêm `offline-plugin` một cách đơn giản như dưới.
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const html = new HtmlWebpackPlugin({template: './src/index.html'})
const offline = new OfflinePlugin

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: './assets/',
  },
  plugins: [html, offline],
}
```

và ở file main javascript hãy install như dưới:
```javascript
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
```

Hãy chú ý là plugin này chỉ nên chạy ở mode Production, mở mode Development nó sẽ không mang lại hiệu quả lắm.

Sau khi sử dụng webpack để bundle và trỏ vào index.html để run trên server thì khi F12 => Tab Network => Filter theo Other thì các bạn có thể thấy được như dưới.

![](https://images.viblo.asia/98683e43-ef0a-4813-92f2-c34efdb1ac99.png)

![](https://images.viblo.asia/852c31f7-4317-4676-ad28-4dc4e4c10bf2.png)

Có nghĩa là Service Work đã được setup thành công và những asset của bạn như những file HTML, CSS, JS, image sẽ được cache lại và sử dụng.

Chúng ta có thể test bẳng cách bật chế độ offline ở F12 => Tab Application => Chọn ServiceWorkers.

![](https://images.viblo.asia/41ae26bd-1ed9-4033-9e3c-4c85cdde6310.png)

Tick vào checkbox offline để test thử nhé! Resource của chúng ta sẽ được sử dụng như thường, không bị trắng trang (do không tải được resource khi mất mạng, ..., code splitting, ...vvv). Khi đó hãy F12 mở tab Network và chúng ta sẽ thấy được là resource của chúng ta sẽ được tải từ ServiceWorker `Served from ServiceWorker, resource size: x.x KB`.

Tiếp đến mình sẽ giới thiệu một số config và một số lưu ý nho nhỏ khi sử dụng `offline-plugin`

Ở đây mình sẽ đề cập đến một số option thui, còn số còn lại các bạn có thể đọc ở [đây](https://github.com/NekR/offline-plugin/blob/master/docs/options.md)

- `responseStrategy`: Option này có 2 giá trị là 'cache-first' và 'network-first'. Tên của giá trị đã nói lên là option này dùng để điều hướng xử lý khi tải resource. Đối với 'cache-first' thì tất cả request sẽ được ưu tiên điều hướng về và tải từ cache trước, nếu resource ở cache rỗng thì sẽ request resource sẽ được gửi qua network. Và ngược lại đối với 'network-first' là ưu tiên tải resource từ network và network lỗi thì sẽ tải resource từ cache.
- `excludes`: Option này dùng để loại trừ việc cache của một mảng các file (hay pattern) được định nghĩa. Một số trường hợp bạn muốn loại trừ việc cache một số file nào đó thì đây là một option rất phù hợp.
- `autoUpdate`: Một option rất có ích trong một số trường hợp đặc biệt. Option này sẽ bật chế độ auto update (auto update ở đây là việc ServiceWorker fetch lại một lần nữa những resource mà nó cần cache). Nó sẽ fetch lại 1 file (vd như sw.js, service-worker.js, ....vvv) mà chúng ta đã định nghĩa về ServiceWorker. Ở đây sẽ có 2 lựa chọn, một là chỉ bật auto update `autoUpdate: true` thì thời gian mà ServiceWorker sẽ fetch lại file định nghĩa là một giờ., hai là định nghĩa một số (milisecond) để định nghĩa lại.

![](https://images.viblo.asia/98683e43-ef0a-4813-92f2-c34efdb1ac99.png)

- `ServiceWorker`: Option này cho phép chúng ta một số lựa chọn chỉnh sửa trước khi run ServiceWorker.

Thì trên đây chỉ là một số option cần lưu ý. Sẽ còn nhiều option nữa và được sử dụng cho từng mục đích thích hợp. Vì vậy hãy cân nhắc đọc qua để có được cách hiểu sơ qua về những option còn lại.

Tiếp đến mình sẽ giới thiệu qua `update process` của ServiceWorker:

- Khi chúng ta tải link web của mình trên browser thì browser sẽ tải file `ServiceWorker` về (hoặc mỗi lần chúng ta link đến). Nếu một có phát hiện một file `ServiceWorker` (hay ServiceWorker) có thay đổi thì browser sẽ run `ServiceWorker` mới.
- `ServiceWorker` sẽ có những event và `offline-plugin` sẽ sử dụng life-cycle và apply tất cả thay đổi ngay lập tức từ `install` => `updating` => `updateReady` => `updated` => `updatedFailed`.

Cuối cùng mình sẽ chia sẻ một số lưu ý nho nhỏ trong quá trình sử dụng `offline-plugin`:

- Việc `offline-plugin` sử dụng `ServiceWorker` để cache resource thì hãy lưu ý kỹ về `ServiceWorker` để xác định được mục đích sử dụng `offline-plugin` có đúng với mục đích mà chúng ta đang hướng đến hay không để xác định và đánh phương án khác thay thế.
- `ServiceWorker` chỉ run được nếu website của chúng ta sử dụng phương thức HTTPS thay vì HTTP. Vì thế mà khi chạy ở local sẽ không thấy được tác dụng. Hãy dựng 1 server HTTPS để test thử. Hoặc một số free host.
- Hãy xem kỹ `ServiceWorker` có support trong dự án của mình không. Các bạn có thể xem tại [đây](https://caniuse.com/#feat=serviceworkers) và tại [đây](https://jakearchibald.github.io/isserviceworkerready/).
- Cuối cùng thì hãy chú ý đọc qua một lượt các option config của `offline-plugin` để tránh gặp các trường hợp không mong muốn.

# 2. Kết luận
Việc sự dụng cache mang lại hiệu quả rất cao trong việc sử dụng hiệu quả nguồn tài nguyên. `offline-plugin` hỗ trợ khá tốt việc này, còn lại chỉ là tích hợp và run thử. Và `ServiceWorker` cũng là một web API tuyệt vời trong việc cache source.

Bài viết của mình đến đây là hết. Cảm ơn các bạn đã xem đến hết bài. Mong rằng bài viết này sẽ mang lại một chút kiến thức, lợi ích dù là nhỏ nhất cho tất cả các bạn. Một lần nữa xin cảm ơn và hẹn gặp lại các bạn trong các bài biết tiếp theo.

Xin chào và hẹn gặp lại!
![](https://images.viblo.asia/949b1eb5-22b2-4a23-b7ff-44a67be29458.jpg)
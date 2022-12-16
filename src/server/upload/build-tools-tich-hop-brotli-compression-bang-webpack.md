<h2>Brotli là Cái Gì?</h2>
<strong>Brotli</strong> là một thuật toán nén mới và được Google phát triển vào năm 2016. Nó sẽ có khả năng nén tốt hơn so với chuẩn nén Gzip khoản 20% - 26%.

Do vậy, các website khi được nén bởi <strong>Brotli</strong> sẽ giúp người dùng truy cập website nhanh hơn và đồng thời giảm tải cho Server đi khá nhiều.

Hầu hết các trình duyệt hiện nay đều hỗ trợ chuẩn nén <strong>Brotli</strong> nên các anh em không cần phải lo lắng khi chuyển qua sử dụng <strong>Brotli</strong> nhé.

Đây là link bài viết gốc của mình ahihi :smile_cat: :smile_cat: :smile_cat:

**[https://hungphamdevweb.com/build-tools-tich-hop-brotli-compression-bang-webpack.html](https://hungphamdevweb.com/build-tools-tich-hop-brotli-compression-bang-webpack.html)**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/khtdpqd28u_brotli.png)
<h2>Cách Integrate Brotli bằng Webpack</h2>
Đầu tiên các anh em cần phải chắc chắn rằng Server của các anh em có hỗ trợ chuẩn <strong>Brotli</strong> không? (bằng việc sử dụng <strong><a href="https://tools.keycdn.com/brotli-test">Brotli test tool</a></strong> để verify).

Điều này là cần thiết để xác nhận Server có thể hoạt động được với file nén <strong>Brotli</strong> hay không.

Nếu Server các anh em không hỗ trợ <strong>Brotil</strong> hãy cài đặt thêm module <code><strong><a href="https://github.com/google/ngx_brotli">ngx_brotli</a></strong></code> cho Web Server đang sử dụng <code>Nginx</code> và đừng quên set <code>brotli_static</code> thành "on" (điều này sẽ giúp Web Server kiểm tra request trước khi gửi đến người dùng)
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/nqwk8v8vb8_brotli%20test.png)

Mình đã check thử và website mình đã hỗ trợ chuẩn <strong>Brotli.</strong>

Để bắt đầu chúng ta cần phải cài đặt gói <code>brotli-gzip-webpack-plugin</code> bằng command bên dưới:
```
npm i --save-dev brotli-gzip-webpack-plugin
```

Sau đó config một tí trong file <code>webpack.config.js</code> như sau:
```
var BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
module.exports = {
  plugins: [
    new BrotliGzipPlugin({
      asset: '[path].br[query]',
      algorithm: 'brotli',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
      quality: 11
    }),
    new BrotliGzipPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
     })
  ]
}
```
Tuỳ chỉnh biến <code>quality</code> để tăng giảm chất lượng nén của <strong>Brotli</strong>. Mặc định giá trị sẽ là 11 và cũng là giá trị cao nhất trong cấu hình config.

Sau khi chúng ta đã config xong thì các anh chạy command bên dưới để run <strong>Webpack</strong>:
```
npx webpack --config webpack.config.js
```

Sau khi hoàn tất, <strong>Webpack</strong> sẽ tạo một file uncompressed <code>bundle.js</code>, một file <code>bundle.js.br</code> và một file <code>bundle.js.gz</code>.

Như các anh thấy thì file nén của <strong>Brolti</strong> có dung lượng tầm 74.8KB nhỏ hơn rất nhiều so với khi chúng ta nén bằng <strong>Gzip</strong>.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/doeu540sl3_brotli%20result.jpg)
<h2>Lợi ích khi Integrate Brotli bằng Webpack</h2>
Nếu sử dụng module <code>ngx_brotli</code> một mình, mỗi khi có request Server cần phải tốn thời gian để nén tài nguyên website trước khi gửi đến người dùng.

Thay vào đó việc sử dụng <strong>Webpack</strong> để tạo sẵn những file được nén từ trước sẽ giảm thời gian thực thi của Server đi đáng kể.

Mọi thắc mắc vui lòng để lại bình luận bên dưới nhé, thân chào và quyết thắng :smile_cat:
![image.png](https://images.viblo.asia/8b541ca3-a976-472e-a2ab-c674820ac590.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Hôm nay mình sẽ chia sẻ cho các bạn một số câu hỏi thường gặp khi đi phỏng vấn Nodejs nhé.
[Bạn cũng có thể đọc bài này để nắm một số kiến thức cơ bản trước khi đọc loạt câu hỏi này nhé](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR)

## 11. package.json là gì? Nó được dùng để làm gì?

Tệp này chứa nhiều thông tin siêu dữ liệu khác nhau về `project Nodejs` của bạn. Nó được sử dụng để cung cấp thông tin cho phép `npm` xác định về các thông thin của `project` cũng như xử lý các phụ thuộc của `project`.

Khi ai đó cài đặt `project` của thông qua `npm`, tất cả các phụ thuộc (`hoặc có thể hiệu đơn giản là các thư viện bạn muốn sử dụng cho project của mình`) được liệt kê cũng sẽ được cài đặt. Ngoài ra, nếu bạn chạy `npm install` trong thư mục gốc của `project`, nó sẽ cài đặt tất cả các phụ thuộc vào thư mục `./node_modules`.

## 12. [Libuv là gì](https://libuv.org/)?

`libuv` là một thư viện hỗ trợ đa nền tảng với trọng tâm là `I/O asynchronous` ([Tham khảo bài này để biết thêm chi tiết](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR)). Nó chủ yếu được phát triển để `Node.js` sử dụng, nhưng nó cũng được sử dụng bởi `Luvit`, `Julia`, `pyuv` v.v.

Khi `project node.js` bắt đầu xuất hiện năm 2009 dưới dạng môi trường `JavaScript` tách rời khỏi trình duyệt, nó đang sử dụng `Engine V8` của `Google` và `Marc Lehmann's` `libev`, `node.js` kết hợp với `I/O model`, lập trình hướng sự kiện. Khi `Node.js` ngày càng phổ biến, thì điều quan trọng là phải làm cho nó hoạt động trên `Windows`, nhưng `libev` chỉ chạy trên `Unix`. `libuv` là một sự trừu tượng xoay quanh `libev` hoặc `IOCP` tùy thuộc vào nền tảng, cung cấp cho người dùng một `API` dựa trên `libev`. Trong session bản `node-v0.9.0` của `libuv`, `libev` đã bị xóa.

Một số tính năng của `libuv` là:
*   `Event loop` đầy đủ tính năng được hỗ trợ bởi `epoll`, `kqueue`, `IOCP`, các `ports`.
*   Các `TCP` and `UDP` sockets asynchronous
*   Tệp `asynchronous` và hoạt động của các tệp hệ thống
*   [Quy trình con](https://libuv.org/)
*   [File sự kiện hệ thống](https://libuv.org/)

## 13. [Một số mô-đun phổ biến nhất của Node.js mà bạn hay sử dụng là gì?](https://gist.github.com/anvaka/8e8fa57c7ee1350e3491)

Có rất nhiều mô-đun phổ biến nhất, được nhiều **vote** hoặc được **dowload** nhiều nhất trong `Node.js`. 
Một số mô-đun phổ biến mình hay sử dụng là:

* express
* async
* browserify
* socket.io
* bower
* gulp
* grunt
.....

Câu hỏi thì ngớ ngẩn. :D Câu trả lời thì đúng kiểu học sinh cấp 3 đúng không.
Nhưng nó có ý nghĩa là bạn có đang biết ngoài kia tồn tại những thư viện ngon bá cháy bọ chét mà `Thiên Hạ` đang dùng không. Và nếu có dùng bạn có nhớ tên nó hay ko.
Thực sự có nhiều **concept** bạn cứ nghĩ là sẽ ko có thư viện hỗ trợ hoặc là chưa bao giờ nghĩ cái này cần dùng thư viện. Nếu bạn đọc qua [list này](https://gist.github.com/anvaka/8e8fa57c7ee1350e3491) thì có khi nó cũng có ích cho bạn sau này.

Ví dụ thực tế: trước mình có làm 1 cái `task` về việc `Detect Charset` của `1 file` được gửi gửi `UI`. Mà mình ko biết đến sự tồn tại của thư viện này `[iconv-lite](https://www.npmjs.com/package/iconv-lite)`. Nên cũng đã khiến mình tốn kha khá thời gian vì tiếp cận vấn đề sai.

## 14. `EventEmitter` trong Node.js là gì

Tất cả các đối tượng phát sinh sự kiện đều là `instance` của class `EventEmitter`. Các đối tượng này có một hàm `eventEmitter.on()` cho phép một hoặc nhiều hàm được gắn vào các sự kiện được đặt tên do đối tượng phát sinh.

Khi `EventEmitter` của đối tượng phát sinh một sự kiện, tất cả các hàm gắn liền với sự kiện cụ thể đó được gọi _synchronous_ .

![image.png](https://images.viblo.asia/b0fd68f5-10d3-4161-9eff-1672b809247d.png)

## 15. `Streams` trong Node.js là gì

`Streams` là các `pipes` (luồng) cho phép bạn dễ dàng đọc dữ liệu từ nguồn và chuyển dữ liệu đó đến đích. Nói một cách đơn giản, một `Streams` không là gì ngoài một `EventEmitter` và thực hiện một số hàm đặc biệt. Tùy thuộc vào các hàm được `implement` mà một St`reams trở thành `Readable`, `Writable`, or `Duplex` (có thể đọc hoặc có thể ghi hoặc cả hai).

Ví dụ: Nếu chúng ta muốn đọc dữ liệu từ một tệp, cách tốt nhất để làm điều đó từ một `Streams` là lắng nghe sự kiện dữ liệu và đính kèm một lệnh `callback`. Khi có sẵn một đoạn dữ liệu, `Streams` có thể gọi lệnh `callback` để trả dữ liệu. 

![image.png](https://images.viblo.asia/3c96ffc9-791c-4cd2-9f7c-c3c2b7b7b4a9.png)

Các loại luồng là: Có thể đọc, Có thể ghi, Song công và Chuyển đổi.

## 16. Sự khác biệt giữa `readFile` và `createReadStream` trong Node.js là gì? 

**`readFile`** - dùng để đọc `asynchronous` toàn bộ nội dung của một tệp. Nó sẽ đọc tệp hoàn toàn vào bộ nhớ (RAM) trước khi `callback data`. `readFileSync` là session bản `synchronous` của `readFile`.

**`createReadStream`** - Nó sẽ đọc tệp theo từng phần có kích thước mặc định `64kb`.

## 17. `crypto` trong Node.js là gì? Làm cách nào để bạn giải code thông tin được bảo mật trong Node.js?

Mô-đun `crypto` được Node.js cung cấp. Function bao gồm một tập hợp các trình `wrappers` (bao bọc) các hàm `hash OpenSSL` (*băm*), HMAC, lập trình, giải code, ký và `verify functions`.

![image.png](https://images.viblo.asia/2c14c774-8024-4ab6-a698-42debc0f7fc7.png)

## 18. Timers trong Node.js sử dụng là gì?

Mô-đun `Timers` trong Node.js chứa các hàm thực thi `code` sau một khoảng thời gian nhất định. Các `Timers` không cần phải `import` thông qua `require()`, vì tất cả các hàm đều có sẵn trên `global` để mô phỏng `API JavaScript` của trình duyệt.

`API Node.js` cung cấp một số cách lập lịch để `code` thực thi vào một thời điểm nào đó sau thời điểm hiện tại. Các hàm bên dưới có vẻ quen thuộc, vì chúng có sẵn trong hầu hết các trình duyệt, nhưng `Node.js` thực sự cung cấp cách `implement` các hàm này theo cách của riêng mình.

`Node.js Timer` cung cấp `setTimeout()`, `setImmediate()`và `setInterval`.

[Tham khảo bài viết này để biết thêm.](https://viblo.asia/p/blog22-nhieu-junior-van-khong-tra-loi-duoc-cau-nay-diem-khac-nhau-giua-settimeout-setimmediate-va-processnexttick-series-bi-kip-javascript-phan-17-y37LdAbyVov)

## 19. [Mô-đun DNS trong Node.js là gì](https://nodejs.org/api/dns.html)?

Mô-đun `dns` (`Domain Name System`) cung cấp khả năng xử lý và tra cứu `DNS`. `Mô-đun DNS` bao gồm một trình `network wrapper` các hàm asynchronous.

Các `function` thường được sử dụng nhất trong `mô-đun DNS` là:

*   `dns.lookup(adress, options, callback)` - Hàm tra cứu `dns` và lấy bất kỳ địa chỉ trang web nào làm tham số đầu tiên và trả về `record IPV4` hoặc `IPV6` đầu tiên tương ứng. Tham số tùy chọn có thể là một số nguyên hoặc một đối tượng. Nếu không có tùy chọn nào được cung cấp thì cả `IPV4` và `IPV6` đều là `input` hợp lệ. Tham số thứ ba là các hàm `callback`.
*   `dns.lookupservice(address, port, callback)` - Function này chuyển đổi bất kỳ địa chỉ vật lý nào như “https://viblo.asia/” thành `type record array`. Các type record được chỉ định bởi tham số thứ hai `“rrbyte”`. Cuối cùng hàm thứ ba là hàm `callback`.
*   `dns.getServers()` - Hàm này trả về một `array` các `string` chứa địa chỉ `IP`, được định dạng theo `rfc5952`, hiện được cấu hình để xử lý `DNS`. Một `string` sẽ bao gồm một phần `port` nếu một `port` tùy chỉnh được sử dụng.
*   `dns.setServers()` - Function này thiết lập địa chỉ `IP` và `port` của máy chủ sẽ được sử dụng khi thực hiện xử lý `DNS`. Không được `dns.setServers()` gọi hàm trong khi truy vấn `DNS` đang diễn ra.

[Chi tiết tham khảo docs này](https://nodejs.org/api/dns.html)

## 20. Hàm `Callback` trong Node.js là gì?

`Node.js` là một nền tảng `asynchronous`, không đợi những thứ như `file I/O ` kết thúc mà sẽ thực hiện `Block code` tiếp theo khi nào `file I/O` có kết quả thì sẽ gọi hàm Callback để trả kết quả. 
Callback là một hàm được gọi khi hoàn thành một nhiệm vụ nhất định; điều này ngăn `blocking` callstack và cho phép chạy code khác trong thời gian chờ đợi.

![image.png](https://images.viblo.asia/8480c847-484f-41da-a6b5-1b4414bd7466.png)

`Callbacks` là phần cơ bản nhất của `Node.js`. Các `callback` cung cấp cho chúng ta một giao diện để đáp ứng điều sau: “and when you're done doing that, do all this.”.
Điều này cho phép chúng ta có nhiều hoạt động `I/O` nhất mà hệ điều hành của chúng ta có thể xử lý xảy ra cùng một lúc. 
Ví dụ: trong một máy chủ `web` có hàng trăm hoặc hàng nghìn `request` đang chờ xử lý với nhiều truy vấn `blocking`, việc thực hiện các truy vấn `blocking asynchronous` sẽ mang lại cho bạn khả năng tiếp tục làm việc chứ không chỉ ngồi yên và đợi cho đến khi các hoạt động `blocking` hoạt động trở lại. (Non-blocking I/O)

## 21. Các cơ chế bảo mật có sẵn trong Node.js là gì?

Trước khi dùng những thứ khác hay ho ngoài kia thì hãy sử dụng tốt những thứ có sẵn trước đã nhé :D.

Chúng ta có thể bảo mật ứng dụng `Node.js` của mình theo những cách sau:

**Authentication** - `Authentication` là một trong những giai đoạn bảo mật chính mà tại đó người dùng được xác định là được phép truy cập vào ứng dụng. `Authentication` xác minh danh tính của người dùng thông qua một hoặc một số lần test. Trong `Node.js`, `authentication` có thể dựa trên `session` hoặc dựa trên `token`. Trong `authentication` dựa trên `session`, thông tin đăng nhập của người dùng được so sánh với tài khoản người dùng được lưu trữ trên máy chủ và trong trường hợp `authentication` thành công, một `session` sẽ được bắt đầu cho người dùng. Bất cứ khi nào hết `session`, người dùng cần đăng nhập lại. Trong `authentication` dựa trên `token`, thông tin `authentication` của người dùng được dụng để tạo một `string` được gọi là `token`, sau đó được gắn kèm với các `request` của người dùng và mỗi `request` chúng ta sẽ `check` cái `token` này.

**Error Handling** - Thông thường, thông báo lỗi chứa giải thích về những gì thực sự đã xảy ra để người dùng hiểu lý do. Đồng thời, khi lỗi liên quan đến cú pháp, nó có thể được thiết lập để hiển thị toàn bộ nội dung `log` trên giao diện người dùng (`UI`). Đối với một `hacker` có kinh nghiệm, nội dung `log` có thể tiết lộ nhiều thông tin nội bộ nhạy cảm về cấu trúc code và các công cụ được sử dụng trong phần mềm.

**Request Validation** - Một khía cạnh khác phải được xem xét, trong khi xây dựng một ứng dụng `Node.js` an toàn, là `Validation` các `request` hoặc nói cách khác, kiểm tra dữ liệu đến để tìm những mâu thuẫn có thể xảy ra. Có vẻ như các `request` không hợp lệ không ảnh hưởng trực tiếp đến bảo mật của ứng dụng` Node.js`. Tuy nhiên, chúng có thể ảnh hưởng đến hiệu suất và độ mạnh bảo mật của ứng dụng đó. `Validation` các kiểu và định dạng dữ liệu đến và từ chối các `request` không tuân theo các quy tắc đã đặt có thể là một biện pháp bổ sung để bảo mật ứng dụng `Node.js` của bạn.

**Node.js Security Tools and Best Practices** - Chúng ta có thể sử dụng các công cụ như **helmet** (bảo vệ ứng dụng của mình bằng cách đặt `HTTP headers`), **csurf** (`authentication token` trong các `request` đã nhận và từ chối các `request` không hợp lệ), **node rate limiter** (kiểm soát tỷ lệ `request` lặp lại. `Function` này có thể bảo vệ bạn khỏi các cuộc tấn công `brute force`) và **cors** (cho phép chia sẻ tài nguyên chéo - `cross-origin resource sharing`).

## 22. `passport` trong Node.js là gì?

`Passport.js` là một `middleware` dùng để `authentication` đơn giản cho `Node.js`. `Passport.js` có thể được đưa vào bất kỳ ứng dụng `web` nào tương tự như `Express.js`.

Cơ chế authentication của `Passport`, được gọi là `strategies`, được đóng gói dưới dạng các mô-đun riêng lẻ. Các ứng dụng có thể chọn các `strategies` tương ứng để sử dụng mà không tạo ra các phụ thuộc không cần thiết.

Theo mặc định, nếu `authentication` không thành công, `Passport` sẽ phản hồi với state `401 Unauthorized` và bất kỳ trình `route handlers` bổ sung nào cũng sẽ không được gọi. Nếu `authentication` thành công, trình xử lý `next` sẽ được gọi và thuộc tính `req.user` sẽ được đặt thành người dùng được `authentication`.

# Cuối cùng
Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog24-20-cau-hoi-thuong-gap-khi-phong.html
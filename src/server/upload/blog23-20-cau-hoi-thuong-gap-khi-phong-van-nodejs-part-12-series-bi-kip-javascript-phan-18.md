![image.png](https://images.viblo.asia/5e49fb26-35bc-42ca-93e3-fb2a3318412e.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Hôm nay mình sẽ chia sẻ cho các bạn một số câu hỏi thường gặp khi đi phỏng vấn `Nodejs` nhé.
[Bạn cũng có thể đọc bài này để nắm một số kiến thức cơ bản nếu thấy những câu hỏi này khó nhé](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR)

## 1. Node.js là gì? Được dùng để làm gì?

`Node.js` là một `run-time JavaScript environment` (*Môi trường để chạy các đoạn code javascript*) được xây dựng dựa trên Engine V8 của Chrome. [Lập trình theo hướng sự kiện và mô hình I/O non-blocking](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR). Nó nhẹ và rất hiệu quả. Node.js có một hệ sinh thái để quản lý các dependency package được gọi là **npm** .

Node.js có thể được sử dụng để xây dựng các loại ứng dụng khác nhau như ứng dụng web, ứng dụng trò chuyện thời gian thực, máy chủ API REST, v.v. Tuy nhiên, nó chủ yếu được sử dụng để xây dựng các chương trình máy chủ web, tương tự như PHP, Java hoặc ASP v.v. Node.js được phát triển bởi Ryan Dahl vào năm 2009.

## 2. Lập trình hướng sự kiện là gì?

Lập trình theo hướng sự kiện (`Event-driven programming`) là xây dựng ứng dụng dựa trên phản hồi các sự kiện. Khi một sự kiện xảy ra, chẳng hạn như nhấp chuột hoặc nhấn phím, chúng ta đang chạy một hàm callback được đăng ký cho sự kiện đó.

Lập trình theo hướng sự kiện chủ yếu tuân theo mô hình `publish-subscribe pattern`.

![image.png](https://images.viblo.asia/fcd5aa06-0dd6-4d0a-b5b7-ea0850b02a43.png)

## 3. _Event loop_ trong Node.js là gì? Và hoạt động như thế nào?

_Event loop_ xử lý tất cả các lệnh `callback asynchronous`. `Node.js` (hoặc `JavaScript`) là một ngôn ngữ hướng sự kiện đơn luồng. Điều này có nghĩa là chúng ta có thể đính kèm `listeners` vào các sự kiện và khi một sự kiện kích hoạt, `listeners` sẽ thực hiện lệnh `callback` mà chúng ta đã cung cấp từ trước.

Bất cứ khi nào chúng ta gọi và `setTimeout`, `Node.js` sẽ `push` nó vào [`API Node`](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR) và tiếp tục chạy code khác mà không cần đợi kết quả. Khi hoạt động kết thúc, nó nhận `output` và chạy `function callback` của chúng ta. Tương tự với `http.get`, `fs.readFile` v.v.

Vì vậy, tất cả các hàm `callback` được xếp hàng đợi trong một vòng lặp và sẽ chạy từng hàm một khi nhận được phản hồi.

## 4. REPL trong Node.js là gì?

REPL có nghĩa là `Read-Eval-Print-Loop`. Nó là một môi trường ảo đi kèm với Node.js. Chúng ta có thể nhanh chóng `test code JavaScript` của mình trong môi trường `Node.js REPL`.

Để khởi chạy `REPL` trong `Node.js`, chỉ cần mở `Prompt Terminal` và nhập `node`. Dấu nhảy của `Prompt Terminal` sẽ thay đổi thành `>` trong `Windows` và `MAC`.

Bây giờ chúng ta có thể gõ và chạy `JavaScript` của mình một cách dễ dàng. Ví dụ, nếu chúng ta nhập `10 + 20`, nó sẽ in `30` ở dòng tiếp theo.

## 5. Mục đích của `module.exports` trong Node.js là gì?

Module.exports đóng gói các code liên quan thành một đơn vị code duy nhất. Điều này có thể hiểu là chuyển tất cả các `function` liên quan vào một tập tin. Hãy tưởng tượng rằng chúng ta đã tạo một tệp có tên `greetings.js` và nó chứa hai hàm sau:

![image.png](https://images.viblo.asia/4b031569-f867-41f0-8b1c-cbc2cbb6d1a5.png)

Trong đoạn code trên, `module.exports` đã xuất 2 `function` ra ngoài. Chúng ta có thể nhập chúng vào một tệp khác như sau:

![image.png](https://images.viblo.asia/59041f66-cf9b-4514-9f40-85e1ed990e75.png)

## 6. Sự khác biệt giữa Asynchronous và Non-blocking là gì?

`Asynchronous` theo nghĩa đen có nghĩa là `not synchronous` (*không đồng bộ*). Ví dụ: Chúng ta đang thực hiện các yêu cầu `HTTP Asynchronous`, có nghĩa là chúng ta không chờ phản hồi của máy chủ. Mà tiếp tục xử lý các `block code` tiếp theo. Chúng ta sẽ trả lời yêu cầu sau khi nhận được kết quả từ `HTTP Asynchronous`.

Thuật ngữ `Non-blocking` được sử dụng rộng rãi với `I/O`. Ví dụ, các tác vụ `read/write non-blocking` sẽ không bao giờ `Block call stack` của chúng ta. Thay vào đó nó sẽ thực hiện các tác vụ này một cách bất đồng bộ.
[Cụ thể mình đã có giải thích trong bài viết này các bạn có thể tìm hiểu thêm.](https://viblo.asia/p/blog21-tat-ca-nhung-gi-ban-can-de-hieu-ve-nodejs-series-bi-kip-javascript-phan-16-oK9VyKyOJQR)

## 7. Tracing trong Node.js là gì?

`Tracing` cung cấp một cơ chế để thu thập thông tin được tạo bởi `Engine V8`, `Node Core` và có thể ghi thành một tệp nhật ký. Có thể bật tính năng `Tracing` bằng cách sử dụng *flag* `--trace-events-enabled` khi khởi động ứng dụng **Node.js**.

![image.png](https://images.viblo.asia/6a5012a6-20fb-4357-9587-5790f02f7877.png)

Có thể chỉ định tập hợp các danh mục mà *Tracing* được ghi lại bằng cách sử dụng flag `--trace-event-categories` theo sau là danh sách các tên danh mục được phân tách bằng dấu phẩy. Theo mặc định, `node`và `v8`được bật.

Chạy **Node.js** với tính năng theo dõi được bật sẽ tạo ra các tệp nhật ký có thể được mở trong tab `chrome://tracing` của Chrome.

## 8. Bạn sẽ debug một ứng dụng trong Node.js như thế nào?

Node.js bao gồm một tiện ích debug được gọi là `debugger`. Để kích hoạt nó, hãy bắt đầu Node.js với đối số `debug` theo sau.

Chèn câu lệnh `debugger;` vào source code muốn `debug` nó sẽ kích hoạt `breakpoint` tại vị trí đó trong code:

![image.png](https://images.viblo.asia/f00b0056-616a-41e3-b6b4-f8b9733532eb.png)

## 9. Sự khác biệt giữa `setImmediate()` vs `setTimeout()`

`setImmediate()` và `setTimeout()` tương tự nhau, nhưng về thứ tự thực hiện thì có chút khác biệt. [Mình có một bài viết chi tiết về vấn đề này tham khảo nhé](https://viblo.asia/p/blog22-nhieu-junior-van-khong-tra-loi-duoc-cau-nay-diem-khac-nhau-giua-settimeout-setimmediate-va-processnexttick-series-bi-kip-javascript-phan-17-y37LdAbyVov).

![image.png](https://images.viblo.asia/b6416c21-5dc6-4922-ac99-c37acdf00389.png)

Thứ tự được thực hiện sẽ khác nhau tùy thuộc vào `contexts` mà chúng được gọi. Nếu cả hai được gọi từ bên trong mô-đun chính, thì thời gian sẽ bị ràng buộc bởi hiệu suất của quá trình.

## 10. `process.nextTick()` là gì?

`setImmediate()` và `setTimeout()` dựa trên event loop. Nhưng `process.nextTick()` về mặt kỹ thuật không phải là một phần của `event loop`. Thay vào đó, `nextTickQueue` sẽ được xử lý sau khi hoạt động hiện tại hoàn thành, bất kể giai đoạn hiện tại của `event loop`.

[Mình có một bài viết chi tiết về vấn đề này tham khảo nhé](https://viblo.asia/p/blog22-nhieu-junior-van-khong-tra-loi-duoc-cau-nay-diem-khac-nhau-giua-settimeout-setimmediate-va-processnexttick-series-bi-kip-javascript-phan-17-y37LdAbyVov).

Do đó, bất kỳ lúc nào bạn gọi `process.nextTick()` trong một giai đoạn bất kỳ, tất cả các lệnh `callback` được chuyển đến `process.nextTick()` sẽ được giải quyết trước khi `event loop` tiếp tục.

## Đón xem Part 2 nhé.

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog23-20-cau-hoi-thuong-gap-khi-phong.html
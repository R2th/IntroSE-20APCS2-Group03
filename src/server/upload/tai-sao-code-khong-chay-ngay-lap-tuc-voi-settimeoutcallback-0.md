# Mở đầu
Suốt quá trình tìm hiểu và làm việc với JS, chúng ta rất nhiều lần sử dụng `setTimeout`, hãy bắt đầu với case được coi như là ví dụ điển hình này:
```javascript
console.log(1)
setTimeout(function timeout() {
        console.log(2)
    }, 5000)
 console.log(3)
```
Khỏi cần chạy thử, chúng ta đều biết kết quả trên console sẽ là  `1`  `3` `2`. Thế nhưng sửa timeout về 0 như thế này:
```javascript
 setTimeout(function timeout() {
        console.log(2)
    }, 0)
```
Kết quả như thế nào, bạn chạy thử xem sao, nếu kết quả làm bạn bất ngờ, hay đọc tiếp bài viết này nhé :v 
# Call stack, event loop, callback queue,... gì mà lắm thế?
Trước tiên, hãy đọc lại về một đoạn giới thiệu của JS trước, đại loại là như thế này:
"Javascript là một ngôn ngữ đơn luồng, non-blocking, bất đồng bộ,..."
## Single thread with call stack
Ai cũng biết JS là một ngôn ngữ chạy theo đơn luồng, đơn luồng nghĩa là một thời điểm chỉ có một đoạn code được chạy thôi. Cái này có lợi hơn so đa luồng ở chỗ tránh được hàng loạt tranh chấp tài nguyên giữa các luồng với nhau, tránh được deadlock các thứ các thứ, không khó để tìm được các tài liệu so sánh giữa đơn luồng và đa luồng :D 

Vậy để chạy đơn luồng, nghĩa là các lệnh sẽ phải xếp hàng nhau, ông A được chạy xong thì ông B mới được chạy, ở JS có một thứ gọi là callstack, về mặt cấu trúc dữ liệu thì callstack cũng như stack, hoạt động theo cơ chế LIFO (Last In First Out), các lệnh sau sẽ được thêm vào (push) đầu của callstack và các lệnh ở trên đầu callstack sẽ được lấy ra (pop) khi đã được thực hiện xong.

![](https://images.viblo.asia/c8b27c82-868e-4dac-86c1-8867c0250417.gif)

Lúc đầu khi chưa chạy callstack sẽ trống trơn, dần dần theo từng step, các lệnh sẽ được push vào đầu callstack, ở trên đẩu sẽ được chạy trước :D, chạy xong thì bị bốc ra ngoài. Ok cơ chế này stack hay đấy, nhưng mà nhiều lệnh được push vào stack quá thì sao? Thì **stackoverflow** luôn chứ còn gì nữa bạn :)

Ví dụ như một trường hợp gọi đệ quy không có điều kiện dừng như này, lúc này Runtime (ở đây là chrome) sẽ có cơ chế rồi, nên trình duyệt của chúng ta không bị đơ =))

![](https://images.viblo.asia/bc7bb436-a9c9-47c4-8b27-8c0ee23668b6.png)

## Event Loop, Callback Queue
Chúng ta sẽ tiếp tục với 2 thứ nữa đó là **Event Loop** và **Callback Queue**. Mình có một ví dụ như thế này

![](https://images.viblo.asia/08472047-eece-481e-aeea-0a298d6fa936.gif)

Các bạn sẽ thấy 2 thứ mới, đó là **Event Loop** và **Callback Queue**, 2 thứ này là một trong những thành phần của runtime. Js thường được chạy trên 2 runtime chính đó là Browser và Nodejs,... Giả sử với Browser Run Time, ngoài cung cấp JS engine, browser còn cung cấp các **WebAPIs**, một **Event Loop** và một **Callback Queue**. Trong đó:
* **WebAPIs** cung cấp các api về xử lý DOM, AJAX, setTimeOut,...
* **Event Loop** có nhiệm vụ check xem nếu **Callstack** rỗng thì sẽ bốc **callback** từ **Callback Queue** ném vào **Callstack** thực hiện

Tương tự với NodeJS, Nodejs runtime sẽ cung cấp các APIs, Event Loop, Callback Queue,...và các thứ khác nữa implement bằng C++ ở phía dưới :D

Quay trở lại với ảnh trên:
1. Các lệnh sẽ được thêm lần lượt vào đầu **callstack** để chạy.
2. Khi chạy đến **setTimeOut**, callback **cantWait()** sẽ được ném vào ô **WebAPIs**, tuy nhiên timeout đang được set = 0 ms, nên callback** cantWait()** lúc này sẽ được ném ngay vào **Callback Queue**.
3. Như bạn thấy thì từ khi **cantWait()** được ném vào **Callback Queue**, nó vẫn chưa được bốc ngay lên **Callstack**. Trong khi đó, **Callstack** vẫn đang miệt mài push với pop. 
4. Chờ thêm một lúc nữa, khi **Callstack** lúc này đã rỗng, **Event Loop** sẽ bốc **cantWait()** từ **Callback Queue** ném vào **Callstack**, lúc này **cantWait()** mới thực sự được chạy.

Vậy ở đây chúng ta có thể kết luận rằng:
- Event loop sẽ có nhiệm vụ xem xét khi nào callstack rỗng thì sẽ bốc callback từ callback queue ném lên để chạy
- Tham số thứ 2 của **setTimeOut()** không có nghĩa là callback sẽ được chạy sau n ms, nó có nghĩa rằng callback sẽ được chạy sau sớm nhất là n ms

Tất nhiên ngoài **setTimeout** thì tất cả các API khác đều hoạt động tương tự với async callback. Ví dụ khi gọi một AJAX request, nó sẽ chạy trong WebAPIs thread riêng của browser chứ không phải JS Engine :D 
# Kết
```javascript
console.log(1)
setTimeout(function timeout() {
        console.log(2)
    }, 0)
 console.log(3)
```
Tới đây thì các bạn có thể biết được tại sao timeout = 0 rồi mà chưa chạy rồi, mình sẽ copy lại kết luận ở trên, đó là: 
- Event loop sẽ có nhiệm vụ xem xét khi nào callstack rỗng thì sẽ bốc callback từ callback queue ném lên để chạy, nếu callstack không rỗng, callback ở callback queue cứ ở đấy ngồi chơi xơi nước thôi =))
- Tham số thứ 2 của **setTimeOut()** không có nghĩa là callback sẽ được chạy sau n ms, nó có nghĩa rằng callback sẽ được chạy sau sớm nhất là n ms
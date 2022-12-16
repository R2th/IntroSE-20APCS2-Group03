Bài viết được dịch từ nguồn: https://hackernoon.com/reactive-programming-e4698b6ee3f

Chủ yếu là các nhà phát triển `Front-end` đang nghe từ `Reactive` lần đầu tiên họ nhầm lẫn nó với thư viện `React`. Thật ra nó khác hoàn toàn.

Hôm nay tôi sẽ giải thích về `Reactive Programming` và cách thực hiện trong `JavaScript`.

Bài viết này không đi sâu, nó sẽ giúp bạn hình dung các khái niệm cơ bản của `Reactive Programming` và sẽ giúp tìm thêm các chủ đề hay liên quan đến bài viết này.

Trước khi đi để hiểu `Reactive Programming`, tôi muốn nói với bạn về `Imperative Programming`.

`Imperative Programming` là gì?

`Imperative Programming` là một mô hình lập trình sử dụng các câu lệnh thay đổi `program's state`.

Ví dụ về `Imperative Programming`.

Nó có nghĩa là `t` được gán kết quả của `n + m`.

Sau đó, các giá trị của `n and / or m`, có thể được thay đổi mà không ảnh hưởng đến giá trị của biến t.

`Reactive Programming` là gì?

`Reactive Programming` là một mô hình lập trình khai báo liên quan đến các luồng dữ liệu và sự lan truyền của sự thay đổi.

Nếu chúng ta thử ví dụ trước bằng cách sử dụng mô hình `Reactive`, kết quả sẽ như thế này:

Đây không phải là ví dụ hoạt động (dễ hiểu)

Dưới đây là một ví dụ đơn giản hoạt động bằng thư viện `RxJS` với `Node`

Như bạn thấy, trong `Reactive Programming`, trên giá trị của biến `t` được tự động cập nhật bất cứ khi nào giá trị của n thay đổi, mà không cần chương trình phải thực thi lại.

Nó phổ biến để sử dụng hậu tố $ để xác định các biến có nghĩa là một luồng.

`Reactive Programming` là lập trình với các luồng dữ liệu không đồng bộ.

`Stream` là gì?

`Streams` là một chuỗi các giá trị theo thời gian.

Nó có nghĩa là `Stream` chỉ đơn giản là `collection` xuất hiện theo thời gian.

## ReactiveX

http://reactivex.io/

Đây là một bản viết lại của `Reactive-Extension`.

Một `API` để lập trình không đồng bộ với các luồng có thể quan sát được.

`Rx` có nhiều thư viện cho các ngôn ngữ lập trình khác nhau.

## RxJS

https://github.com/ReactiveX/rxjs

Lodash for async.

Nó là thư viện phổ biến nhất cho JavaScript, giúp lập trình Reactive.

`RxJS` có nhiều toán tử giúp thực hiện các hoạt động `Reactive` nhanh hơn, cũng có nhiều toán tử hoạt động với các phần tử `DOM`.

## redux-observable

https://redux-observable.js.org/

RxJS 5-based middleware for Redux.

`redux-obsable` giúp thực hiện các hành động không đồng bộ bằng thư viện `Redux` như `redux-saga` hoặc `redux-thunk`.

## Summary

Học `RxJS` và bắt đầu sử dụng nó không phải là dễ dàng cho người mới bắt đầu, bởi vì để bắt đầu hiểu cách thức hoạt động và cách bạn có thể sử dụng nó, bạn sẽ cần dành nhiều thời gian hơn cho việc điều tra và tìm hiểu thêm để bắt đầu sử dụng nó trong dự án của bạn.

Bạn không cần sử dụng `RxJS` ở mọi nơi trong dự án của mình, chỉ cần bạn hiểu nơi nào và trong tình huống nào bạn có thể sử dụng nó và giải quyết vấn đề của bạn hiệu quả hơn.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.
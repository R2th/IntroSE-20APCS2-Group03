# Giới thiệu
   Hôm nay, chúng ta tìm hiểu sâu hơn một chút về Javascript, những nhân vật hậu trường làm nên sức mạnh của ngôn ngữ này. Hiểu được Event Loop và Call Stack giúp chúng ta có cái nhìn kỹ hơn về hiệu năng của Javascript, cũng như cách thức một ngôn ngữ đơn luồng(single-threaded) và đồng bộ(syncronous) hoạt động.<br>
Dưới đây phần tóm tắt về cách JavaScript tương tác với trình duyệt: <br>
![image.png](https://images.viblo.asia/1ba10877-9396-482c-a429-cd449ec1c82e.png) <br>
Lưu ý rằng hầu hết những thứ trong hình ảnh không phải là một phần của chính ngôn ngữ JavaScript. Web APIs, Call Stack và Event Loop là tất cả các tính năng mà trình duyệt cung cấp. Chúng ta cùng tìm hiểu thôi.
# Call stack
   Bạn có thể đã nghe nói rằng JavaScript là một luồng. Nhưng nó có nghĩa gì?<br>
   JavaScript có thể làm một việc duy nhất tại một thời điểm vì nó chỉ có một ngăn xếp để gọi lệnh.<br>
   Call statck là một cơ chế giúp trình thông dịch JavaScript theo dõi các chức năng mà một tập lệnh gọi .<br>
   Mỗi khi tập lệnh hoặc hàm gọi một hàm, nó sẽ được thêm vào đầu ngăn xếp. Mỗi khi hàm thoát , trình thông dịch sẽ xóa nó khỏi ngăn xếp hàm gọi đó .<br>
   Một hàm thoát ra thông qua câu lệnh trả về hoặc bằng cách đến cuối phạm vi.<br>
Ví dụ:<br>
```
function task(message) {
    // emulate time consuming task
    let n = 10000000000;
    while (n > 0){
        n--;
    }
    console.log(message);
}

console.log('Start script...');
task('Download a file.');
console.log('Done!');
//kết quả sẽ là:
//Start script...
//Download a file.
//Done!
```
   Hình dưới mô tả quá trình thực thi:<br>
![image.png](https://images.viblo.asia/b27641c2-e830-456d-8dd8-11fef1adb2c3.png)
   Khi bạn cố ý thực hiện đoạn code dưới đây:<br>
```
function b() {
    a();
}
function a() {
    b();
}
b();
```
   thì sẽ xuất hiện lỗi *Uncaught RangeError: Maximum call stack size exceeded* tức là một hàm đã được gọi quá nhiều lần dẫn đến tràn ngăn xếp. Kích thước ngăn xếp cuộc gọi tối đa nằm trong khoảng từ 10 đến 50 nghìn cuộc gọi , vì vậy nếu bạn vượt quá kích thước đó, rất có thể bạn có một vòng lặp vô hạn trong mã của mình.
# Bộ nhớ Heap
   Hiểu đơn giản JavaScript heap là nơi các đối tượng được lưu trữ khi chúng ta xác định các hàm hoặc biến.
# Web APIs
   Như phần giới thiệu, JS là một ngôn ngữ đồng bộ và chạy đơn luồng nhưng ta vẫn có thể thực hiện mọi việc đồng thời trong trình duyệt . Như tiêu đề đã gợi ý, điều này có thể thực hiện được thông qua các API mà trình duyệt cung cấp.<br>
   Một ưu điểm khác của các API web là chúng được viết bằng mã cấp thấp hơn (như C), cho phép chúng thực hiện những điều đơn giản là không thể thực hiện được trong JavaScript đơn thuần.<br>
   Chúng cho phép bạn thực hiện các yêu cầu AJAX hoặc thao tác với DOM, ngoài ra còn có nhiều thứ khác, như theo dõi địa lý, truy cập bộ nhớ cục bộ,  service workers, v.v.<br>
  Bạn xem hình dưới để thấy rõ vai trò của Web APIs nhé:
![image.png](https://images.viblo.asia/1d2db900-c472-43d2-9d7f-36b071065b74.png)
# Callback queue
   Ta có ví dụ sau:
```
const a = () => console.log('a');
const b = () => setTimeout(() => console.log('b'), 100);
const c = () => console.log('c');

a();
b();
c();
```
   **setTimeout** đang được thực thi đồng thời trong khi trình thông dịch JS tiếp tục thực thi các câu lệnh tiếp theo.<br>
Khi hết thời gian chờ và call stack trống, *console.log('b')* được truyền đến callback quere để được thực thi lại.<br>
Và ta có kết quả như sau: 
```
//a
//c
//b
```
# Event loop
   Event loop JavaScript nhận cuộc gọi đầu tiên trong *callback quere* và thêm nó vào *call stack* ngay khi nó trống.<br>
Mã JavaScript đang được chạy theo cách chạy đến hoàn thành, có nghĩa là nếucall stack hiện đang thực thi một số mã, Event loop sẽ bị chặn và sẽ không thêm bất kỳ lệnh gọi nào từ hàng đợi cho đến khi ngăn xếp trống trở lại .<br>
   Đó là lý do tại sao điều quan trọng là không chặn ngăn xếp cuộc gọi bằng cách chạy các tác vụ tính toán nhiều.<br>
   Nếu bạn thực thi quá nhiều mã hoặc làm tắc nghẽn hàng đợi gọi lại, trang web của bạn sẽ không phản hồi, vì nó không thể thực thi bất kỳ mã JavaScript mới nào.<br>
   Các trình xử lý sự kiện, chẳng hạn như *onscroll*, thêm nhiều tác vụ hơn vào callback quere khi được kích hoạt. Đó là lý do tại sao bạn nên gỡ bỏ các lệnh gọi lại này, nghĩa là chúng sẽ chỉ được thực thi sau mỗi x ms.<br>
```
window.onscroll = () => console.log('scroll');
```
   Khi cuộn, bạn có thể quan sát tần suất bản in gọi lại scroll.
###   setTimeout (fn, 0)
   Chúng ta có thể tận dụng hành vi được mô tả ở trên nếu chúng ta muốn thực thi một số tác vụ mà không chặn luồng chính quá lâu.<br>
   Đặt mã không đồng bộ của bạn trong một cuộc gọi lại và đặt setTimeoutthành 0ms sẽ cho phép trình duyệt thực hiện những việc như cập nhật DOM trước khi tiếp tục thực hiện lệnh gọi lại.<br>
# Kết luận
   Trên đây là một kiến thức đơn giản về cách thức hoạt động bên trong của Javascript. Bạn sẽ hiểu được tại sao Javascipt chỉ là đơn luồng và đồng bộ. Nó chỉ có một Call Stack nên được gọi là đơn luồng và các câu lệnh sẽ được thực thi tuần tự trong Stack nên được gọi là đồng bộ. Cảm ơn các bạn đã xem.
# Tài liệu tham khảo
Link 1: http://thaunguyen.com/blog/javascript/javascript-event-loop-va-call-stack-la-gi <br>
Link 2: https://felixgerschau.com/javascript-event-loop-call-stack/ <br>
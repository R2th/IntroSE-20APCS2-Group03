Node.js "event loop" là trung tâm để có thể xử lý các luồng kịch bản thông lượng cao.  Như mọi người đã biết thì node.js là một ứng dụng đơn luồng (single - threaded), nhưng chúng ta cũng có thể khác phục điều đó qua các callback và điều đó được thể hiện rõ nhất qua các event loop. Bài viết này sẽ giúp các bạn hiểu rõ hơn cách thức hoạt động của event loop.
# **Event Driven Programming**
Đầu tiên để có thể hiểu hơn về event loop ta phải hiểu biết về mô hình lập trình dựa trên sự kiện. Điều nãy đã được hiểu rõ từ những năm 1960. Ngày nay, lập trình hướng sự kiện phần lớn được sử dụng trong các ứng dụng UI. Một cách sử dụng chính trong JavaScript là tương tác với DOM, do đó việc sử dụng các API dựa trên sự kiện là tự nhiên.

Điều đơn giản: Lập trình theo hướng sự kiện là ứng dụng điều khiển các luồng sự kiện được xác định bởi các sự kiện hoặc sự thay đổi các trạng thái.Ta sẽ có một cơ chế trung tâm để thực hiện để lắng nghe các sự kiện và gọi các hàm callback mỗi khi sự kiện được phát hiện( tức là trạng thái đã thay đổi). Đó là nguyên tắc cơ bản đằng sau event loop trong Node.

Đối với việc phát triển JavaScript phía client, hãy nghĩ đễn các phương pháp như **.on()** , giống như **element.click()** được sử dụng kết hợp với các phần tử DOM để tương tác với người dùng. Mô hình này  hoạt động tốt khi một mục suy nhất có thể phát ra nhiều sự kiện. Node sử dụng mô hình này trong EventEmitter, và là một modul  như Socket, Server, 'http'. Nó có ích khi chúng ta cần phát ra nhiều thay đổi trạng thái từ một thể hiện duy nhất.

Một mô hình bình thường có 2 trạng thái là thành công và thất bại. Ở đây ta có cách để thực hiện. Đầu tiên là "error back " trong callback style, nơi mà lỗi của mỗi lần gọi là đối số đầu tiên được chuyển tới callback. Cách thứ 2 là ta có thể dụng **Promise** trong ES6.

**'fs'** module chủ yếu sử dụng 'error back' trong callback style. Về mặt kỹ thuật, có thể phát ra các sự kiện bổ sung cho mỗi lần gọi, giống như **fs.readFile()**, nhưng API chỉ được thực hiện để cảnh báo người dùng nếu thao tác mong muốn thành công hoặc nếu như một cái gì đó thất bại. Lựa chọn API này là một quyết định kiến trúc chứ không phải do những hạn chế về mặt kĩ thuật.

Một cách hiểu sai lầm là các event emitter phát ra các sự kiện bằng cách nào đó không đồng bộ về mặt bản chất. Sau đây là một đoạn mã tầm thường để chứng minh điều này:
![](https://images.viblo.asia/5a7ae0b7-3935-4629-91e5-f88e80047f6b.png)

**Event Emitter** thường xuyên xuất hiện không đồng bộ bởi vì nó thường được sử dụng để báo hiệu sự hoàn thành các hoạt động không đồng bộ, nhưng **Event Emitter** API là hoàn toàn đồng bộ. Hàm emit có thể được gọi là không đồng bộ, nhưng lưu ý là tất cả các chức năng lắng nghe sẽ được thực hiện đồng bộ, theo thứ tự được thêm vào, trước khi bất kỳ thực hiện nào có thể tiếp tục trong các báo cáo sau khi gọi đến emit.

# **Mechanical Overview**

Node phụ thuộc vào nhiều thư viện. Một trong số đó là libuv, thứ viện này thực hiện xử lý queue và xử lý các sự kiện không đồng bộ. Đối với phần còn lại trong bài viết này, lưu ý răng tôi sẽ không phân biệt mối liên hệ trực tiếp đến Node hoặc libuv.

Bạn có thể nghe nói rằng Node một pool thread, và có thể tự hỏi **if Node pushes all those responsibilities down why would a thread pool be needed?** Đó là vì kernel không hỗ trợ làm tất cả mọi thứ không đồng bộ. Trong trường hợp Node phải khóa một luồng trong suốt quá trình hoạt động để nó có thể tiếp tục thực hiện event loop mà không bị khóa.

Đây là một sơ đồ đơn giản để giải thích tổng quan khi thực thi:
![](https://images.viblo.asia/eb401489-656c-4423-b391-343b4b8fcd7a.png)

Một vài lưu ý quan trọng về hoạt động bên trong của event loop đó sẽ là khó khăn để bao gồm trong biểu đồ là:

* Tất cả các cuộc gọi lại lên lịch thông qua **process.nextTick()** được chạy vào cuối giai đoạn của event loop trước khi chuyển sang trạng thái tiếp theo.
* **Pending callbacks** là nơi các callbacks được xếp hàng đợi để chạy mà không được xử lý bởi bất kỳ giai đoạn nào khác.
# **Event Emitter and the Event Loop**

Để đơn giản hóa tương tác với event loop EventEmitterđã được tạo. Nó là một wrapper chung mà dễ dàng tạo ra các API dựa trên sự kiện.
Ví dụ sau cho thấy cách quên các sự kiện phát ra này đồng bộ có thể khiến người dùng không thể nhớ các sự kiện.
![](https://images.viblo.asia/1c660617-1b9e-4028-827c-ab01a86fe232.png)

Các lỗ hổng ở trên 'thing1' không bao giờ có thể được bắt bởi người sử dụng bởi vì MyThing()phải hoàn thành instantiating trước khi lắng nghe sự kiện. Đây là một giải pháp đơn giản mà cũng không đòi hỏi closures bổ sung:

![](https://images.viblo.asia/f1d6c681-5577-45d6-8286-9054f08eedfd.png)

# Wrapping Up
Bài đăng này rất chi tiết về các chi tiết kỹ thuật và hoạt động bên trong vòng lặp sự kiện. Rất mong sẽ có ích với các bạn!

**Tài liệu tham khảo** https://www.journaldev.com/7462/node-js-architecture-single-threaded-event-loop
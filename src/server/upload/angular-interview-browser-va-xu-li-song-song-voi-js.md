Hé lô xin chào các bạn, lại là mình đây, thanh niên ảo tưởng sức mạnh ước mơ lương 1k5 trump. Đợt vừa rồi mình có đi phỏng vấn một số công ty với vị trí Front-end developer (Angular) và cũng gặt hái một số câu hỏi cũng khá hay. Nay chia sẻ cùng các bạn nhé.
À, mình cũng được bác senior hỏi về life cycle của Angular, cách thức hoạt động của từng method đó ra sao, giải thích rõ cho bác ấy => Mình trả lời cực kỳ chi tiết từng method một, còn đá luôn qua change detection, các bạn chỉ cần đọc hiểu bài này của mình là ổn áp khi bị hỏi về life cycle của component Angular nhé.
[**Pass interview life cycle component Angular**](https://viblo.asia/p/angular-lifecycle-hooks-1VgZveyrKAw)
## Câu hỏi 1: Xử lí song song với Javascript
### Interview
1.Câu hỏi là một trang web của mình, có một đoạn code chạy vòng lặp rất nhiều lần, tốn kha khá thời gian. Trình bày các cách mà bạn nghĩ có thể tối ưu mang lại trải nghiệm người dùng tốt nhất.
    - Một là có thể đưa đoạn code có vòng lặp đó vào set Timeout để đảm bảo UI đã được render lên. Tuy nhiên nhược điểm là trong thời gian hàm kia đang chạy thì trang web sẽ bị block UI, không thể thao tác, tệ hơn nó sai business logic.
    - Giải pháp là sử dụng web worker để đưa đoạn đó xuống chạy song song với main thread

### Trải nghiệm thực tế
Dự án hiện tại của mình đang làm là một web application buid bằng Angular kết hợp với Ionic, electionjs hỗ trợ cho version mobile và desktop. Yêu cầu của khách hàng là ứng dụng phải chạy được offline mode, vậy nên khi khởi động ứng dụng lên, phải gọi api để lấy những dữ liệu cần thiết về để hỗ trợ cho việc offline mode. Tuy nhiên vì phải lấy khá nhiều dữ liệu về, thực hiện map data các thứ mới có được expect data, sau đó còn lưu xuống storage của browser nên quá trình này khá là mất thời gian, và user phải lót dép ngồi hóng cái loading quay đêu một hồi mới sử dụng được ứng dụng. Điều này mang lại trải nghiệm cho người dùng rất tệ.
Một trường hợp khác là cấu trúc cây thư mục, ở đây ứng dụng của mình có chức năng tạo nhiều thư mục, người dùng chỉ cần nhập prefix format, số lượng phần tử thì ứng dụng phải tạo ra số lượng thư mục có tên theo prefix format của người dùng
Giải pháp được đưa ra là đưa luồng xử lí logic đó xuống cho web worker xử lí. Vậy là user vẫn có thể thao tác tiếp trên ứng dụng trong khi đoạn code generate cây thư mục đang xử lí.
### JS chỉ có single thread, vậy sao nó có thể chạy song song với main thread?
- Đúng, JS chỉ có single thread, nên khi thực hiện một vòng loop 100k lần thì trong thời gian đó bạn không thể tương tác trên tab ứng dụng đó được. Nên HTML5 ra đời kèm theo Web worker. Web worker là một API cung cấp bởi browser. Các API của browser thường được viết bằng C++ hoặc Rust, và developer dùng js để tương tác với API đó. Vậy nên chúng thực thi hoàn toàn tách biệt khỏi main thread của JS.

### Vậy main thread có thể tương tác với Web Worker chứ ?
- Vâng, tất nhiên ạ. Main thread sẽ tương tác với web worker thông qua hàm postMessage

![](https://images.viblo.asia/31f567ba-77e2-4559-85e4-06d52926dc09.png)

### Code demo
Chi tiết cách implement các bạn vào link này nhé, [Web worker in Angular](https://blog.logrocket.com/how-to-execute-a-function-with-a-web-worker-on-a-different-thread-in-angular/)

## Câu hỏi 2: Điều gì xảy ra khi bạn nhập một url vào thanh url của trình duyệt ?
Câu hỏi này được anh Trung Võ chia sẻ, 2 3 công ty gì ở bên Sin hỏi câu này, và khi mình đi phỏng vấn cũng bị hỏi câu này. Và đây là câu trả lời mình nghĩ đủ ngắn gọn để giải thích câu hỏi ở trên.

**1. Sau khi gõ url và nhấn enter, browser sẽ tìm được địa chỉ IP cho tên miền bạn gõ thông qua DNS**

**2.  Browser sẽ gửi HTTP request đến server**

**3.  Server sẽ gửi lại cho browser một HTTP response**

**4.  Browser bắt đầu parse và render HTML**

**5.  Browser gửi request để lấy các đối tượng được nhúng trong HTML (image, css, js) cứ thế lặp lại bước 2-4**

**6.  Khi trang web được được load, browser gửi các request bất đồng bộ nếu cần**


Còn nếu bạn muốn trả lời một cách chi tiết hơn thì có thể vào đây đọc, cực kì chi tiết luôn https://github.com/alex/what-happens-when

## Câu hỏi 3: Trình bày về các thành phần browser để thực thi được code Javascript

![](https://images.viblo.asia/d140a620-4b92-44cf-86c7-7c204854fc7a.gif)

**Heap**: Là nơi lưu trữ các đối tượng khi chúng ta khai báo biến

**Stack**: Là nơi lưu trữ execution context các lệnh gọi hàm của chúng ta. Mỗi function được gọi sẽ được push vào top của Stack và thực thi dần theo thứ tự LIFO
(last in first out)

**Web API**: Browser cung cấp một số API để thực hiện các tác vụ async, tốn thời gian như setTimeOut, setInterval, HTTP request

**Callback Queue**: Những function callback của các function chạy async được đề cập ở trên Web API sẽ được sắp xếp vào đây. Ở đây các task được chia thành 2 loại: **Micro task** và **macro task**. 
- Micro task gồm các callback của các async operations process.nextTick, Promise, Object.observe. Được ưu tiên xử lí trước 
- Marco task gồm các callback của các async operation setTimeout, setInterval, setImmediate, I/O,.... Đợi micro task xử lí hết thì mới đến lượt

**Event loop**: Có nhiệm vụ liên lạc giữa Stack và Callback queue, mỗi khi Stack rỗng thì nó sẽ lấy các task từ Callback queue đưa lên để thực thi.

Trên đây là 3 câu mình được hỏi trong vài buổi phỏng vấn gần đây và câu trả lời của mình, lúc trả lời sẽ có những câu râu ria bác senior hỏi thêm vào, nhưng sơ sơ là vậy :D, mình cũng không nhớ rõ lắm. Lần sau mình sẽ viết tiếp các câu hỏi khác nữa về thuật toán, DI, SOLID :D, **1k5 trump i'm coming**
Mục đích bài viết để chia sẻ kiến thức đến mọi người, cùng nhau trau dồi kiến thức chứ không phải mình leak câu hỏi interview của công ty người ta đâu :D, đa phần người phỏng vấn hỏi theo cảm hứng của họ thôi
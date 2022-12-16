## Định nghĩa Node.js
Bạn có thể tìm được một vài định nghĩa trên mạng, dưới đây là định nghĩa phổ biến nhất.

Định nghĩa trên trang chủ Node.js:
> Node.js là một JavaScript runtime được build dựa trên Chrome’s V8 JavaScript engine. Node.js sử dụng mô hình event-driven, non-blocking I/O khiến nó trở nên nhẹ và hiệu quả.

V8 engine là một JavaScript engine mã nguồn mở chạy trên các trình duyệt Chrome, Opera và Vivaldi. Nó được thiết kế tập trung vào hiệu năng và chịu trách nhiệm cho việc dịch mã JavaScript sang mã máy để máy tính có thể hiểu và chạy được. 
Nhưng bạn cũng nên tránh nhầm lẫn rằng Node chạy trên trình duyệt. Cha đẻ của Node dựa trên V8 engine, cải tiến một số tính năng chẳng hạn file system API, thư viện HTTP và một số phương thức liên quan đến hệ điều hành. Điều đó có nghĩa là Node.js là một chương trình giúp ta có thể chạy code JavaScript trên máy tính, nói cách khác nó là một JavaScript runtime.

## Cài đặt Node.js
Trong phần tiếp theo, chúng ta sẽ cài đặt Node và viết một số chương trình đơn giản.

Có nhiều lời khuyên rằng bạn nên download Node binaries trên trang web chính thức của Node tuy nhiên tốt hơn là bạn nên sử dụng trình version manager. Chương trình này giúp bạn có thể cài nhiều version Node và chuyển đổi qua lại giữa các version một cách dễ dàng. Bạn ko cần quan tâm đến những vấn đề liên quan đến permission mà bạn thường bị yêu cầu khi cài đặt các package. Bạn có thể tìm hiểu chi tiết hơn [ở đây](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/)

## "Hello, World!" với Node.js
Bạn có thể kiểm tra xem máy tính của bạn đã cài đặt Node chưa bằng cách mở terminal và gõ **node -v**. Nếu Node đã được cài, version của Node sẽ hiện ra.

Tạo một file **hello.js** và gõ vào dòng code sau
```
console.log("Hello, World!");
```
Chúng ta vừa dùng module console được built-in với Node để in một message ra cửa sổ terminal. Để chạy code trong file **helllo.js** dùng lệnh **node hello.js**. Nếu mọi thứ ok, message "Hello, World!" sẽ được in ra.

## Node.js support ES6
Như bạn có thể thấy trong [bảng tương thích](http://node.green/), Node support rất tốt ES6 vì chỉ quan tâm đến một runtime duy nhất - V8 engine. Điều này có nghĩa là bạn có thể code JavaScript với syntax mới nhất mà không cần lo lắng đến vấn đề tương thích, điều mà bạn có thể gặp phải khi viết code JavaScript chạy trên nhiều trình duyệt khác nhau.

Để minh họa cho điều này, dưới đây là một ví dụ nhỏ sử dụng tính năng của ES6 như **template literals** và **object destructuring**:
```
const person = {
  first: 'Brendan',
  last: 'Eich',
  age: 56,
  position: 'CEO of Brave Software',
};

const { first, last } = person;

console.log(`${first} ${last} is the creator of JavaScript!`);
```

Save đoạn code trên vào file **es6.js** và chạy bằng lệnh **node es6.js,** bạn sẽ thấy message "Brendan Eich is the creator of JavaScript!" được in ra.

## Node.js giúp chúng ta chạy code JavaScript trên Server
Ý tưởng chạy JavaScript trên server đã được bắt đầu bởi Netscape từ năm 1994. Tuy nhiên, phải đến khi Node.js ra đời, ý tưởng này mới thực sự gây được sự chú ý bởi nó mang lại những lợi ích độc nhất so với những ngôn ngữ truyền thống khác. Node giờ đây đóng vai trò công nghệ quan trọng trong những công ty hàng đầu.

### Mô hình hoạt động của Node.js
Để cho dễ hiểu, khi bạn connect đến một server truyền thống, chẳng hạn Apache, nó sẽ sinh ra một thread mới để xử lý request. Ở các ngôn ngữ như PHP hay Ruby, mỗi một phép toán I/O (ví dụ truy cập database) sẽ chặn execution trên code của bạn cho đến khi phép toán đó hoàn thành. Nói cách khác, server sẽ đợi cho đến khi database được duyệt xong mới xử lý kết quả. Nếu có những request mới, server lại tiếp tục sinh những thread mới để xử lý chúng. Điều này dẫn đến nguy cơ kém hiệu quả, khi một lượng lớn thread được tạo ra sẽ khiến cho hệ thống trở nên chậm chạp, tệ hơn nữa có thể khiến site bị sập. Cách thông thường để giải quyết tình trạng này là bổ sung thêm server.

Node.js, mặt khác là single-threaded. Nó cũng thuộc dạng event-driven hay nói cách khác tất cả những gì xảy ra trong Node là để phản hồi lại với một sự kiện. Ví dụ, khi một request được gửi đến, server bắt đầu xử lý nó. Nếu nó gặp phải phép toán I/O, thay vì đợi cho phép toán này kết thúc, nó sẽ đăng ký một callback trước khi tiếp tục xử lý event tiếp theo. Khi phép toán I/O kết thúc, server sẽ chạy callback và tiếp tục làm việc trên request ban đầu. Ở tầng bên dưới, Node sử dụng thư viện **libuv** để thực hiện hoạt động asynchronous (non-blocking) này.
Mô hình hoạt động này của Node giúp server có thể xử lý một lượng lớn kết nối đến đồng thời. Quan điểm truyền thống để scale một Node app là clone nó và để instance được clone chia sẻ công việc. Node.js thậm chí có module buit-in sẵn để giúp bạn thực hiện chiến lược clone này trên một server duy nhất.

Hình dưới đây mô tả cách hoạt động của Node.

![](https://images.viblo.asia/26b8720b-44ba-4991-a80a-c0700e168f13.png)

Liệu có điểm bất cập gì không?
Việc Node chạy trên một thread duy nhất dẫn đến một số hạn chế. Ví dụ như nên tránh các phép toán blocking I/O, và errors luôn cần được handle một cách đúng đắn nếu không có thể dẫn đến toàn bộ process bị crash. Một số developer không thích callback-based style mà JavaScript sử dụng nhưng với sự xuất hiện của **Promises** và **async await** (được mặc định enable từ Node 7.6), vấn đề này chỉ còn là quá khứ.

### "Hello, World!" - phiên bản server
```
const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200);
  response.end('Hello, World!');
}).listen(3000);

console.log('Server running on http://localhost:3000');
```
Lưu đoạn code trên vào **hello-world-server.js** và chạy với **node hello-world-server.js**. Mở trình duyệt và chuyển đến http://localhost:3000 để xem "Hello, World!" hiện lên trên trình duyệt.

Cùng phân tích kĩ hơn đoạn code trên. 

Chúng ta bắt đầu bằng việc require native module **http** của Node. Tiếp đến ta sử dụng method **createServer** để để tạo một object web server mới và truyền vào method này một hàm ẩn danh. Hàm này sẽ được gọi đến bất cứ khi nào có một kết nối đến server.
Hàm ẩn danh được gọi với 2 argument là **request** và **response** chứa request từ phía người dùng và response ta dùng để gửi lại status code 200 và message "Hello, World!".
Cuối cùng, chúng ta cài đặt để server lắng nghe những request từ cổng 3000 và in ra message "Server running on http://localhost:3000" ở terminal để ta biết rằng server đang chạy.

Dĩ nhiên sẽ cần nhiều thứ khác để tạo nên một server đơn giản với Node (ví dụ xử lý errors một cách đúng đắn). Bạn có thể tìm hiểu thêm [ở đây](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
## Node.js phù hợp với những loại app nào?
Node đặc biệt thích hợp để xây dựng những app cần đến tương tác hay hợp tác real-time, ví dụ như chat site, hoặc app kiểu [CodeShare](https://codeshare.io/), nơi mà bạn có thể xem document được chỉnh sửa trực tiếp bởi người khác. Node cũng phù hợp để tạo các API nơi bạn cần xử lý một lượng lớn request liên quan đến I/O hoặc với những site liên quan đến data streaming, Node mang lại khả năng xử lý file trong khi chúng đang trong quá trình upload. Nếu bạn quan tâm đến vấn đề real-time, bạn có thể tham khảo thêm [ở đây](https://www.sitepoint.com/build-node-js-powered-chatroom-web-app-getting-started/)

## Thế mạnh của Node.js?
Bên cạnh tốc độ và khả năng mở rộng, việc dùng JavaScript trên server và trình duyệt giúp cho bạn đỡ phải chuyển đổi giữa các ngôn ngữ. Bạn có thể làm bất cứ thứ gì với duy nhất một ngôn ngữ.

Một điểm mạnh nữa của Node đó là nó cực thích hợp với JSON. JSON được coi là lý tưởng khi được sử dụng bởi một chương trình JavaScript. Khi làm việc với Node, dữ liệu có thể chuyển qua các tầng layer mà không cần phải reformat. 

Cuối cùng, JavaScript thực sự quá phổ biến, điều này giúp cho việc chuyển sang phát triển Node app dễ dàng hơn so với những ngôn ngữ phía server khác.

## Kết luận
JavaScript được dùng ở khắp mọi nơi và Node là một đề tài khá rộng. Hi vọng bài viết cung cấp cho bạn cái nhìn ban đầu dễ hình dung khi mới làm quen với Node.

## Tham khảo
[What Is Node and When Should I Use It?](https://www.sitepoint.com/an-introduction-to-node-js/)
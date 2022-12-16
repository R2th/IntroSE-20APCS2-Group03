*Xin chào mọi người, hôm nay mình xin chia sẻ 5 lí do bạn nên sử dụng React. Cùng bắt đầu nhé.*

### 1.) The Virtual DOM
Trước hết, bạn có thể nghĩ về `DOM` (Document Object Model) là nơi lưu trữ tất cả các đối tượng trên trang web. Điều độc đáo về `DOM` là nó tổ chức các đối tượng này theo cấu trúc giống như cây như bạn có thể thấy bên dưới.

![](https://images.viblo.asia/50909c6c-dc62-4dda-a82f-2adc3336421e.png)

Hầu hết các thư viện và `frameworks JavaScript` sử dụng cái được gọi là `DOM` thực. Tuy nhiên, vấn đề với `DOM` thực là toàn bộ nội dung phải cập nhật mỗi khi có một thay đổi trong trạng thái UI của bạn từ trên xuống. Đây là một quá trình khá đơn giản nhưng việc cập nhật `DOM` nhiều lần có thể làm mọi thứ chậm lại một chút và có thể khá tốn kém, đây là lúc `DOM` ảo xuất hiện.

`DOM` ảo về cơ bản là một bản sao của `DOM` thật, nhưng `DOM` ảo không thực sự thay đổi bất cứ thứ gì bạn nhìn thấy trên màn hình, đó là lý do tại sao nó lại quá nhanh. Về cơ bản, `DOM` ảo giống như chụp ảnh màn hình của `DOM` thật và sau đó lưu nó sau.

Khi `DOM` ảo cập nhật, nó so sánh phiên bản cập nhật với phiên bản trước của `DOM` ảo. `React` sau đó so sánh cả hai phiên bản của `DOM` ảo để xem những gì đã thay đổi thông qua một quá trình được gọi là khác biệt và chỉ áp dụng những thay đổi đó cho `DOM` thực.

![](https://images.viblo.asia/80d416b6-5f88-40de-9e47-5c8bb9dbc03c.png)

Bằng cách này, thay vì đi qua toàn bộ cây và cập nhật từng đối tượng có trong nó, chúng ta chỉ phải cập nhật các phần thay đổi. Đây là một trong những lý do lớn tại sao `React` lại nhanh như vậy và tại sao nó lại đạt được sự phổ biến như ngày nay.

### 2.) JSX
`JSX` là một cú pháp được sử dụng trong `React` giúp cho việc phát triển web dễ dàng hơn rất nhiều. Về cơ bản, `JSX` kết hợp các yếu tố của cả `Javascript` và `HTML` và đặt chúng lại với nhau trong một package.

```js
const name = 'Alex';
const jsxExample = <h1> Xin chào, {name}! </ h1>; // Xin chào, Alex
```

`JSX` cũng có thể được sử dụng trong các function, các câu lệnh, vòng lặp, biến và bất cứ nơi nào bạn có thể sử dụng `JavaScript` thông thường. Bạn có thể nhận thấy rằng chúng tôi vẫn sử dụng `camel case `khi sử dụng `JSX`, điều này là do `JSX` vẫn giống với `JavaScript` hơn so với `HTML`. Nếu bạn muốn tìm hiểu thêm về `JSX`, bạn có thể xem [video](https://www.youtube.com/watch?v=9GtB5G2xGTY&feature=emb_logo) này.

Một số nhà phát triển không thích sử dụng `JSX` nhưng điều này không có gì phải lo lắng vì `React` không bắt buộc bạn phải sử dụng nó. Nếu bạn thích, bạn có thể tiếp tục sử dụng `JS` và `HTML` như bình thường để bạn có thể nghĩ về `JSX` như một tính năng bổ sung của `React` có thể giúp bạn tăng tốc độ phát triển.

### 3.) React is a Library
Mặc dù bạn có thể thấy `React` được gọi là `JavaScript framework`, nhưng thực tế nó là một thư viện chứ không phải `framework`. Để hiểu sự khác biệt giữa các `framework` và thư viện, hãy bắt đầu bằng cách nghĩ về sự khác biệt giữa hai loại bánh sandwich khác nhau này.

![](https://images.viblo.asia/2d835251-def4-48b3-a2ba-c197d6270391.png)

Bạn có thể tưởng tượng ra `framework` được gọi là “skeleton” của cả hai bánh sandwich. Cả hai đều có bánh mì ở bên ngoài theo sau là rau, phô mai và thịt ở bên trong theo thứ tự từ trên xuống. Tuy nhiên, mặc dù cả hai loại bánh sandwich này đều có cùng cấu trúc, bạn có thể biết chỉ bằng cách nhìn vào chúng rằng chúng sẽ có vị khá khác nhau do các thành phần khác nhau bên trong (thư viện).

Vì vậy, sự khác biệt giữa `framework` và thư viện là cấu trúc `framework` đã được xác định trước khi bạn bắt đầu trong khi thư viện thì không. Điều này có nghĩa là một thư viện cung cấp cho bạn sự linh hoạt và tùy biến cao hơn nhiều so với một `framework`.

Để có thêm một chút kỹ thuật thay vì so sánh hai loại bánh sandwich khác nhau, một thư viện về cơ bản cho phép bạn kiểm soát dòng chảy của ứng dụng. Khi bạn sử dụng thư viện, bạn là người gọi thư viện nhưng khi bạn sử dụng `framework`, nó sẽ gọi cho bạn. Điều này được gọi là đảo ngược của kiểm soát.

![](https://images.viblo.asia/d665ca78-b336-4d20-9eb3-21e79843f701.png)

### 4.) React is Popular

Trong vài năm qua, `React` đã bùng nổ về mức độ phổ biến và hiện là thư viện `JavaScript` số 1 hiện nay. Hãy xem mức độ phổ biến của `React` so với các thư viện và `frameworks` khác.

![](https://images.viblo.asia/a321d07e-511c-4db8-9911-be14742827fd.png)

Như bạn có thể thấy, về cơ bản, không có ai từng nghe về `React` và chỉ có một tỷ lệ nhỏ trong số những người đó không có hứng thú với nó hoặc sẽ không sử dụng nó nữa. Sự phổ biến của `React` đến từ tốc độ của nó (`Virtual DOM`), các thành phần có thể tái sử dụng, dễ dàng học tập và nó được hỗ trợ nhiều từ cộng đồng developer. Điều này cũng có nghĩa là nếu bạn đang tìm kiếm việc làm, `React` sẽ là lựa chọn tốt nhất của bạn khi nói đến các thư viện và `frameworks` khác ngoài kia.

### 5.) Mobile Apps With React Native

Mặc dù nó không hoàn toàn giống với `React`, `React Native` cho phép bạn tạo các ứng dụng di động cho cả `Android` và `IOS`. Cú pháp không giống hệt như `React` thông thường, tuy nhiên, `React Native` vẫn cực kỳ giống nhau và sẽ khôngkhiến bạn mất nhiều thời gian để tìm hiểu nếu bạn đã quen với `React` hoặc thậm chí chỉ là `JavaScript` đơn giản.

Nếu bạn không có `Mac` và có sở thích tạo ứng dụng di động cho `iOS`, thì `React Native` là dành cho bạn. `React Native` cũng có thể được sử dụng để phát triển đồng thời cho cả `iOS` và `Android` và được viết bằng `JavaScript` và `JSX` giống như `React` thông thường. `React Native` được phát hành trở lại vào năm 2015 và vẫn còn khá mới và có rất nhiều chỗ để được cải thiện và mở rộng. Nếu bạn muốn xem `React Native` chi tiết hơn, bạn có thể nhấp vào [liên kết](https://facebook.github.io/react-native/) này.

Trên là những chia sẻ của mình, hy vọng có thể giúp ích mọi người. Hẹn gặp lại mọi người ở bài viết tiếp theo.

Tài liệu tham khảo: https://medium.com/javascript-in-plain-english/5-reasons-why-you-should-be-using-react-238373cc245e
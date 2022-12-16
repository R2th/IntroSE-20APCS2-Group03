Nếu bạn là nhà phát triển web, tôi khá chắc chắn rằng bạn đã quen thuộc với Chrome Dev Tools. Nó có một danh sách lớn các tính năng để hỗ trợ phát triển web. Nhưng hầu hết chúng ta sử dụng mức cơ bản, chỉ để hoàn thành công việc.
Trong bài đăng này, tôi sex trình bày 10 mẹo về Chrome Dev Tools, sẽ giúp tăng năng suất của bạn và đưa bạn lên cấp độ tiếp theo.

![](https://images.viblo.asia/ba8a8a40-2a39-4e62-8b8a-950fd90f8ff9.jpeg)

### 1. Command Menu

Một trong những tính năng mà tôi yêu thích về trình soạn thảo của mình (sublime text) là tính năng Command Menu. Nó cung cấp cho các nhà phát triển khả năng thực thi rất nhiều lệnh ngay từ bàn phím. Tất cả những gì bạn cần là nhấn `ctrl + shift + p` và bạn có sẵn hàng trăm lệnh. Tính năng này đang được triển khai trong nhiều ứng dụng và hiện nó cũng có sẵn trong Chrome Dev Tools.

Hãy tưởng tượng bạn muốn chụp ảnh màn hình của một node HTML trên trang web của mình. Tất cả nhưng điều bạn phải làm là:

* Mở Chrome Dev Tools.
* Chọn node bạn muốn chụp ảnh.
* Nhấn `ctrl + shift + p` và nhập `Screenshot`.

Có nhiều tùy chọn để chụp ảnh màn hình và bạn có thể tiếp tục với bất kỳ tùy chọn nào trong số đó.

![](https://miro.medium.com/max/700/1*6xRmLXysDT3G8jLExZ-WZQ.gif)

### 2. Console có thể làm nhiều hơn bạn nghĩ

Khi gỡ lỗi ứng dụng web, tôi có xu hướng sử dụng console.log để kiểm tra hành vi của ứng dụng. Tuy nhiên, nếu bạn ghi nhật ký nhiều vào Console, thì việc thu hẹp thông báo nhật ký một cách hiệu quả sẽ rất khó khăn. Hãy khám phá các tùy chọn có sẵn giúp phân biệt từng thông báo.

**Info, Warn, Error**.

Trong các ứng dụng, chúng ta sẽ có các cấp độ thông báo nhật ký khác nhau. Info, Warn, Error là phổ biến nhất. Bạn sẽ có sẵn chúng trong Chrome Dev Tools bằng cách sử dụng các phương thức `console.info` `console.warn` và `console.error`. Hãy xem chúng hoạt động.

![](https://images.viblo.asia/1665400d-bd8a-4e15-beda-06a566fee752.png)

**Hiển thị mảng theo dạng bảng**

Hãy tưởng tượng bạn có một mảng các đối tượng và bạn muốn xem tất cả các mục và thuộc tính. Bạn có thể dễ dàng sử dụng console.log. Tuy nhiên, nó sẽ chỉ cung cấp cho chúng ta một kết quả dạng văn bản. Bạn cũng có thể sử dụng phương thức console.table để in thông tin ở định dạng bảng giúp dễ đọc hơn

![](https://images.viblo.asia/d0bbfc97-cd43-42c1-a3be-526abd4893d3.png)

**Thêm style cho log output**

Bạn có thể thêm các style CSS vào đầu ra của log.

![](https://images.viblo.asia/434c8184-9d6f-4a94-85d0-abf7205e0d96.png)

**Nhóm các loại log message**

Nếu bạn có một số lượng lớn log, thời gian gỡ lỗi / phân tích log sẽ giảm đáng kể nếu bạn có thể nhóm các log lại. Console cung cấp ba phương pháp, console.group, console.groupCollapsed và console.groupEnd cho việc này.

![](https://miro.medium.com/max/700/1*HtsLv2GguQVv2crwkTg8QQ.gif)

**Đo chênh lệch thời gian giữa các hoạt động**

Mặc dù có nhiều cách khác để đo thời gian thực thi JavaScript, bạn cũng có thể sử dụng console.time và console.timeEnd để dễ dàng đo lường nó.

![](https://miro.medium.com/max/700/1*kkH8jsYRX_JNSJqz-bm07w.gif)

### 3. Copy request theo nhiều định dạng

Khi chúng ta gọi các API từ frontend, nếu kết quả không như dự kiến, chúng ta thường sử dụng Postman hoặc cURL để điều tra thêm. Thay vì nhập thủ công URL, title và thông số vào các công cụ này, bạn có thể sao chép request dưới dạng lệnh fetch, cURL hoặc Nodejs fetch bằng cách mở tab Network trong Chrome Dev Tools.

![](https://miro.medium.com/max/700/1*qo3DX1IozbFn0hGvTexQGw.gif)

### 4. Tham chiếu đến thẻ hiện được chọn

Nếu bạn muốn thực hiện một số hành động trên một nút HTML, bạn chỉ cần lấy tham chiếu đến nó. Trong Chrome Dev Tools, dùng `$0` trong Console sẽ luôn tham chiếu đến nút hiện được chọn

![](https://images.viblo.asia/641d0f3d-4179-40a0-b136-5d1f4a3db8ba.png)

### 5. Breakpoints

Tôi khá tin rằng bạn đã sử dụng các Breakpoint trong Chrome Dev Tools. Tuy nhiên, ngoài chức năng cơ bản, Chrome Dev Tools hỗ trợ một số khả năng mở rộng với các Breakpoint.

**Conditional Breakpoint.**

Hãy tưởng tượng bạn phải lặp qua hàng trăm phần tử để tìm xem một phần tử có chứa bên trong một mảng hay không bằng cách sử dụng trình gỡ lỗi. Bạn có thể nhấp chuột phải vào Breakpoint và thêm điều kiện để kiểm tra các giá trị thuộc tính phù hợp để chỉ cần ngắt ở lần lặp phù hợp.

![](https://miro.medium.com/max/700/1*Y_IKoFMa-bY7xR1Wn4uTGA.gif)

**DOM Change breakpoints**

Tôi đã gặp các tình huống trong đó nhiều tập lệnh sửa đổi các phần tử DOM. Trong những tình huống này, thật khó để tìm ra khối tập lệnh phù hợp đã thực hiện sửa đổi. Chrome Dev Tools đơn giản hóa điều này bằng cách cho phép chúng ta thêm một Breakpoint vào node HTML, trong sự kiện `subtree modification`.

![](https://images.viblo.asia/9dc78604-53c0-48e6-ad5f-01e346948e2a.gif)

Ngoài ra, Chrome Dev Tools có hỗ trợ breakpoint cho các XHR requests, Exceptions, Functions, and Event Listeners.

### 6. Pretty Print minified code

Minified JS được dùng khá phổ biến hiện nay, giúp giảm thiểu dụng lượng cho request, nhưng để debbug, đọc trong Chrome Dev Tools thì khá khó khăn. Do vậy, Chrome Dev Tools cung cấp tính năng Pretty Print minified code, sẽ giúp bạn xem file minifled 1 cách dễ dàng

![](https://miro.medium.com/max/700/1*adVwfA6C0YQYoSj2KC27AA.gif)

### 7. Toggle element State

Cái này thì chắc mọi người đều biết cả rồi

![](https://miro.medium.com/max/700/1*mZcvicdRYlIyi4PvaFmWEw.gif)

### 8. Ability to preserve log

Khi bạn gỡ lỗi ứng dụng web của mình, nếu xảy ra quá trình tải lại trang, bạn sẽ mất tất cả các nhật ký mạng trước đó. Điều này gây khó khăn cho việc kiểm tra các request nếu có chuyển hướng trang. Bạn có thể sử dụng “Preserve log” trong tab Network để giữ nguyên tất cả log.

![](https://images.viblo.asia/b1898d2c-53fb-4fe3-949a-f6d567e7ea2d.png)

### 9. Debugging arbitrary functions

Sử dụng Chrome Dev Tools Console, chúng ta có thể viết lại các chức năng trong khi gỡ lỗi. Chức năng này tiết kiệm thời gian mà không cần phải chỉnh sửa các file code và làm mới trang. Vì các chức năng này không được liệt kê trong tab Sources, việc gỡ lỗi chức năng như vậy có vẻ khó khăn. Tuy nhiên, bạn có thể khắc phục điều này bằng cách nhập tên hàm vào Console và nhấp đúp vào đầu ra của phương thức để điều hướng đến VM. Bằng cách sử dụng đó, bạn có thể đặt các breakpoint như thể nó ở trên file code vậy.

![](https://miro.medium.com/max/700/1*NXbe62kWuOM_sa3vVMPE0A.gif)

### 10. Design Mode

Khi chúng ta sửa đổi HTML, việc chờ làm mới trang để xem các thay đổi là điều bình thường. Bạn có thể tiết kiệm thời gian bằng cách sử dụng designMode cho phép sửa đổi trang ngay lập tức. Để chuyển đổi sang chế độ thiết kế, hãy nhập mã sau vào Console.
```
document.designMode = "on"
```
![](https://miro.medium.com/max/700/1*8TU5G1Wm8IX48vXD8a-itA.gif)

**Lời kết**

Chrome Dev Tools là một công cụ khá mạnh mẽ vì nó đi kèm với một số tính năng để giúp các nhà phát triển xây dựng ứng dụng nhanh chóng. Vậy nếu biết tính năng thú vị nào khác, bạn có thể chia sẻ cho mọi người trong phần bình luận

Via: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)
Hướng dẫn debug siêu nhanh chỉ trong vòng 5 phút. Đây là kĩ năng quan trọng mà ai theo ngành cũng cần biết. Nếu bạn đã lâu không dùng tới debugger, hãy xem qua bài viết này để ôn lại nhé. Ok bắt đầu thôi.

## 1. Debug là gì đây?

Nhớ lại lúc mới học lập trình, hẳn ai cũng đã từng dùng các câu lệnh print giá trị của biến ra màn hình để xem. Ví dụ như đoạn code Java sau.

```java
int sum = 10 + 5;
System.out.println(sum);  // Xem giá trị biến sum
```

Cách này khá đơn giản và dễ làm quen. Tuy nhiên nó chỉ hợp với các bạn newbie, mới lần đầu tiếp xúc với code. Nếu bạn đã code được một thời gian, hãy tập sử dụng một công cụ khác có tên là **debugger**.

![](https://images.viblo.asia/fd11d248-694c-48cf-8a08-3b8afed46239.jpg)

Hầu hết các IDE và một số text editor đã có debugger. Debugger là một tool siêu hữu ích để thực hiện việc debug - tìm và fix các lỗi trong chương trình. Nói vậy thôi chứ mục đích của debugger còn nhiều hơn thế:

* Theo dõi luồng chạy chương trình (nếu chương trình bị stop đột ngột thì debug có thể biết được dòng nào bị lỗi)
* Xem giá trị các biến, object phức tạp dễ dàng
* Xem các log được in ra console, call stack,...

Nhiều bạn (và cả mình nữa) nghĩ debug là thứ gì đó cao siêu nên ngại tìm hiểu. Thực sự việc dùng debugger cực kì đơn giản, chỉ cần 5 phút đọc bài viết là bạn sẽ hiểu ngay. Debug cũng chỉ gồm một vài thao tác cơ bản, tương tự nhau trên mọi IDE nhưng lợi ích mang lại rất lớn.

## 2. Debug thế nào cho chuẩn?

Các IDE khác nhau sẽ có debugger khác nhau, nên sẽ có một tí khác biệt. Nhưng chung quy lại thì debug chỉ gồm một số bước sau:

1. Đặt breakpoint ở các dòng cần tạm dừng để debug
2. Chạy chương trình với debug mode
3. Thao tác với chương trình, sao cho chạy tới chỗ đặt breakpoint
4. Khi IDE dừng tại breakpoint, thì thực hiện xem value các biến, xem log,... để kiểm tra bug.
5. Sau đó đi tiếp từng dòng code tiếp theo, xem sự thay đổi các biến sau từng câu lệnh
6. Tiếp tục chạy chương trình bình thường, hoặc dừng chương trình.

Cơ bản là thế, trong những mục con tiếp theo đây chúng ta sẽ bàn kĩ hơn về chúng.

### 2.1. Breakpoint

Là thứ được đánh dấu lên dòng code, khi chương trình chạy tới dòng có breakpoint thì sẽ bị tạm dừng. Lúc này bạn có thể dùng các tool của debugger để xem giá trị các biến, xem log,... Hoặc bạn có thể đi tiếp từng dòng tiếp theo, hoặc cho chương trình chạy bình thường (không bị tạm dừng nữa).

**Cách đặt breakpoint:** Click chuột vào lề trái của dòng đó. Lúc này breakpoint sẽ được toggle, click thêm lần nữa để xóa (như hình).

![](https://images.viblo.asia/b7d25ddc-a7d8-4d9d-9bd0-5ee6ae8a3529.png)

Breakpoint thường là có dạng hình tròn màu đỏ, dấu tròn này có thể khác đôi chút để biểu thị trạng thái breakpoint (đã được đi qua hay chưa). Khi chương trình tạm dừng tại breakpoint thì dòng đó sẽ được highlight.

**Lưu ý:** Dòng code được highlight sẽ chưa thực hiện, chỉ khi bạn đi tiếp qua dòng khác thì dòng trước đó mới được thực thi.

### 2.2. Local variables & watches

Khi chương trình dừng tại breakpoint, chúng ta có thể dùng 2 tool là **Local variables** và **watches** để xem giá trị các biến:

* Local variables chỉ để xem các biến trong function hiện tại (local). Khi qua function khác thì danh sách biến sẽ được update lại.
* Watch dùng để xem các biến global, hoặc bất cứ biến nào. Value của watch được theo dõi ngay cả khi chương trình dừng.

Local variables thì sẽ tự động update danh sách biến trong function. Tuy nhiên, với watch thì bạn phải tự thêm các biến vào thủ công (chuột phải vào biến, Add to watches).

![](https://images.viblo.asia/8d8c43ea-c519-44cf-acb0-64bc3cc60d51.png)

Như hình, thì IntelliJ IDEA gộp chung 2 tools trên lại thành Variables.

### 2.3. Step over, các step khác, stop/resume program

Khi IDE tạm dừng tại breakpoint, thì muốn tiếp tục đi qua các dòng tiếp theo cần thực hiện:

* Step over: đi tiếp dòng code tiếp theo
* Step into: nhảy vào bên trong hàm (dòng code hiện tại chứa lời gọi hàm)
* Step out: từ trong hàm nhảy ra ngoài, trở về nơi gọi hàm
* Run to cursor: chạy tiếp tục cho tới dòng có con trỏ

![](https://images.viblo.asia/57fa3b13-fc80-44c7-8506-7c7f76fc4eac.jpg)

Ngoài ra, đôi lúc bạn sẽ muốn tiếp tục chạy chương trình bình thường (không phải dùng Step over từng dòng nữa). Lúc này bạn dùng command Resume để tiếp tục chương trình, hoặc stop để dừng lại.

Mẹo vui là lúc trước mình mới bỡ ngỡ dùng debugger mà không biết tới cái Resume này, nên mỗi lần chạy tới breakpoint xong là phải chạy lại chương trình từ đầu. Giờ ngẫm lại thấy mình ngu thật :D

Thường thì các command trên sẽ có các phím tắt tương ứng. Cái này tùy vào IDE quy định keymap nhé, bạn có thể tìm hiểu thêm.

### 2.4. Các tool khác

![](https://images.viblo.asia/bca18368-f17a-4bca-9f79-fcc8fd2ade73.png)

Debugger cũng có các tool khác để hỗ trợ như:

* Expression (evalution): chương trình tính toán biểu thức, đặc biệt có thể nhập bất kì tên biến nào vào tính cũng được 👏
* Console: quá quen thuộc rồi, đây là nơi in ra các log
* Call stack: stack chứa danh sách các hàm, lệnh đã được gọi. Chúng ta có thể biết được function nào được gọi cuối cùng, để tìm ra và đặt breakpoint ở đó nhanh chóng

---

Okay bài hôm nay đến đây là hết. Chúc các bạn có một ngày mùng 3 Tết vui vẻ bên bạn bè, người thân và người yêu nhé <3 Happy Vietnamese new year, happy Valentine day và happy coding.
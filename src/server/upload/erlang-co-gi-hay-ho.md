![](https://images.viblo.asia/eb650706-9f6c-4194-beaf-6b8cc7e2ccf2.PNG)

Lần đầu tiên nghe về kể về Erlang, có người đã nói với mình "Đó là ngôn ngữ dễ học nhất, học xong thì không còn thích bất kỳ ngôn ngữ nào nữa":scream_cat:. Sau một thời gian ngắn tiếp xúc, lúc đầu cũng hơi khủng hoảng bởi nó quá dị :triumph:,  mặc dù không dám khẳng định điều kia nhưng mình nghĩ Erlang khá hay ho, nó khá khác biệt với những ngôn ngữ phổ biến như PHP, Java, JavaScript...
# Erlang là gì?
Theo như trang chủ Erlang thì:
*Erlang là ngôn ngữ lập trình hàm được sử dụng để xây dựng các ứng dụng thời gian thực có tính sẵn sàng cao, ví dụ như viễn thông, ngân hàng, thương mại điện tử, gửi tin nhắn tức thời....Erlang hỗ trợ xử lý đồng thời, phân rã và khả năng chịu lỗi...*

# Erlang đã được ứng dụng ở đâu ?

• Amazon sử dụng Erlang để triển khai SimpleDB, cung cấp các dịch vụ cơ sở dữ liệu như một phần của Amazon Elastic Compute Cloud (EC2).

• Yahoo! sử dụng nó trong dịch vụ đánh dấu trang, Delicious, có hơn 5 triệu người dùng và 150 triệu URL được đánh dấu.

• Facebook sử dụng Erlang để tăng thêm sức mạnh cho dịch vụ chat, xử lý hơn 100 triệu người dùng hoạt động.

• WhatsApp sử dụng Erlang để chạy các máy chủ nhắn tin, đạt được tới 2 triệu người dùng được kết nối trên mỗi máy chủ.

• T-Mobile sử dụng Erlang trong các hệ thống SMS và xác thực.

• Ericsson sử dụng Erlang trong các node, được sử dụng trong các mạng di động GPRS và 3G trên toàn thế giới.
# Một số điểm đặc biệt
## Không được gán lại giá trị biến
// :cry: *Incorrect*
```
> String1="A".
"A"
> String1="B".
"exception error: no match of right hand side value \"B\""
```
//:laughing: *Correct*
```
> String1="A".
"A"
> String2="B".
"B"
```

Tức là bạn sẽ chỉ được gán giá trị cho biến duy nhất một lần. Việc này khá khó khăn cho người mới bắt đầu với Erlang nhưng đã quen sử dụng những ngôn ngữ khác. Tuy nhiên, khi không được gán lại, bạn sẽ cần tạo ra biến mới để có thể tiếp tục, bạn sẽ bắt đầu suy nghĩ một biến mới có thực sự cần thiết, và giờ việc kiểm soát lỗi cũng trở nên dễ dàng hơn khi bạn không thay đổi giá trị của biến nhiều lần.

## Không có vòng lặp
Cũng chính vì vậy mà khi bắt đầu tìm hiểu về Erlang, hãy quên hết những gì đã học về vòng lặp trong các ngôn ngữ khác đi, từ mà bạn cần luôn luôn khắc ghi với Erlang đó là **"ĐỆ QUY"**
![](https://images.viblo.asia/740a8352-42f4-4a6e-a7c0-e96b541a4020.png)

Ví dụ khi cần tính giai thừa của n sử dụng Erlang:
```
-module(recursive).
-export([fac/1]).
 
fac(N) when N == 0 -> 1;
fac(N) when N > 0  -> N*fac(N-1).
```

Erlang còn nhiều đặc biệt nữa, nhưng mình xin dừng bài viết ở đây để giới thiệu trong bài viết sau. Cảm ơn mọi người đã đọc bài đến đây :sunglasses:

**Tham khảo**:

https://www.erlang.org/

https://learnyousomeerlang.com/
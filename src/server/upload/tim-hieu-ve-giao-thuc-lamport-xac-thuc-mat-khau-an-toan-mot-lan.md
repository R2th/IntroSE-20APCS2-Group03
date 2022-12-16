## Mở đầu
Ngày nay, các lập trình viên backend đã khá quen thuộc với việc xác thực User thông qua mật khẩu sử dụng hàm băm có muối, và đó cũng chính là phương pháp xác thực mạnh mẽ nhất, được tin dùng nhất. Tuy nhiên bên cạnh đó vẫn còn có những phương pháp xác thực an toàn khác mà mình nghĩ là nên biết để sau này lỡ may có dùng đến :joy::joy:

Hôm nay mình sẽ giới thiệu một phương pháp xác thực khác có tên gọi là Lamport (xác thực mật khẩu an toàn một lần)


-----


## Lamport là gì , tại sao lại gọi là Lamport ?

 Ý tưởng của Lamport là sử dụng chuỗi giá trị băm liên tiếp, mỗi giá trị trong chuỗi này sẽ được dùng như một mật
khẩu, bắt đầu kể từ phần tử cuối cùng (sinh ra cuối cùng trong chuỗi băm). Như vậy sự thách
thức và đáp ứng nằm ở chỗ khi băm mật khẩu cung cấp bởi người dùng ở lần đăng nhập thứ n+1
hệ thống phải nhận được mật khẩu đã sử dụng ở lần thứ n (ngay kế trước).

Người ta lấy tên của người tạo ra nó để đặt luôn cho phương pháp [này](https://en.wikipedia.org/wiki/Lamport_timestamps)


-----


## Hoạt động của Lamport như thế nào ?
Cơ chế của phương pháp Lamport chia làm 2 giai đoạn:
*    Pha đăng kí
*    pha xác thực. 

 Việc đăng kí chỉ được thực hiện 1 lần, việc xác thực được thực thi mỗi khi người dùng đăng nhập vào hệ thống.
 Các bạn có thể xem hình dưới để để hình dung rõ hơn ( mình vẽ hơi xấu :confounded::confounded:)
 ![](https://images.viblo.asia/9c7ddca1-b2e9-40c6-99de-d0803d374159.jpg)

-----
![](https://images.viblo.asia/55448c1d-10fe-40bf-ac33-53d4651b0001.jpg)

 Ở hình trên, pha đăng kí diễn ra như sau:
1. Người dùng (Alice) nhập user_name (U) và password (P) để tiến hành đăng kí
2. Server (Bob) insert dữ liệu vào Database, trong đó:
   * user_name được lưu dưới dạng rõ
   * Lưu một giá trị n cố định
   * Mật khẩu (P) được băm n lần và lưu giá trị này vào database($h^{n}(P)$ )

Vậy là kết thúc pha đăng kí

-----
Tiếp theo là đến pha đăng nhập:

1. Alice gửi user_name( U ) lên server
2. Bob check trong database xem user_name có tồn tại hay không, nếu tồn tại thì trả về ```n``` tương ứng.
3. Lúc này hiện ra một cái form để Alice nhập vào mật khẩu ($P_0$), $P_0$ sẽ không được truyền đi dưới dạng rõ mà nó sẽ được băm ```n - 1 ``` lần với ```n``` là giá trị của Bob vừa trả về ( $h^{(n - 1)}(P_0)$ )
4. Bob nhận được đoạn mã hash gửi lên thì tiến hành băm thêm một lần nữa thì thu được $h^{n}(P_0)$
5. Bob tiến hành so sánh  $h^{n}(P_0)$ với $h^{n}(P)$ được lưu trong database, nếu hai giá trị này trùng nhau thì đăng nhập thành công và update 2 giá trị  $h^{(n - 1)}(P_0)$ và ```n-1``` vào database, như vậy mật khẩu lưu trong database sẽ được làm mới.

Cứ như vậy sau mỗi lần đăng nhập giá trị hash của mật khẩu sẽ bị thay đổi trong database vì thế mà database có bị đánh cắp thì cũng rất khó có thể lấy được mật khẩu của người dùng.

## Hạn chế
* Tốc độ xử lý không được cao nếu ```n``` là một số lớn
* Vẫn có thể thực hiện tấn công từ điển nếu như không có giới hạn đang nhập sai bao nhiêu lần

## Phương pháp tấn công
Chắc hẳn các bạn đọc đến đây thì có thể thấy rằng phương pháp xác thực này có vẻ là an toàn, cũng có vẻ ngon :grinning: chắc là dùng được.

Tuy nhiên vẫn có cách để vượt qua nó, cách này được gọi là tấn công [Man In The Midlde](https://vi.wikipedia.org/wiki/T%E1%BA%A5n_c%C3%B4ng_xen_gi%E1%BB%AFa)

Sơ đồ của cuộc tấn công này như sau:
![](https://images.viblo.asia/6fae7d7a-d764-454f-ba1c-1bb8882f530c.jpg)

Mình sẽ mô tả cuộc tấn công này như sau:

Vào một ngày đẹp trời, có một ông tên là Mallory thấy hai ông Alice và Bob nói chuyện xôm quá liền đứng ở giữa nghe trộm.

Alice mới bảo với Bob là: "Cậu ơi cho tớ đăng nhập vào nhé, user_name của tớ là ......"

Bob kiểm tra user_name thấy hợp lệ mới bảo là: "```n``` đây cậu lấy nó mà đăng nhập :grin:"

Alice chưa kịp nghe thấy ```n``` là gì thì ông Mallory nghe mất , xong Mallory giả giọng của Bob nói cho Alice là: "```n - 1``` đây cậu lấy nó mà đăng nhập :grin:"

Alice thấy vậy tưởng là thật nên cũng băm mật khẩu thành $h^{(n - 2)}(P_0)$ và nói lại với Bob là: "Mật khẩu của tớ là $h^{(n - 2)}(P_0)$ cho tớ vào nhé"

Lúc này Mallory thính tai lắm mới nhớ luôn $h^{(n - 2)}(P_0)$ :smiling_imp:

Bob nghe thấy Alice bảo mật khẩu là  $h^{(n - 2)}(P_0)$ thì băm thêm một lần nữa là $h^{(n - 1)}(P_0)$ và so sánh thấy không đúng, nói lại với Alice là: "Mật khẩu sai rồi nhập lại đi, lấy ```n``` mà băm" :rage::rage:

Mallory lúc này kệ không nói sai cho Alice nữa thì Alice nói đúng mật khẩu và được vào, khi đó database của Bob sẽ được update với mật khẩu băm là $h^{(n - 1)}(P_0)$ :white_check_mark:

Vậy là xong đến lần nói chuyện tiếp theo Mallory chỉ cần giả vờ là Alice và nói mật khẩu là $h^{(n - 2)}(P_0)$ thì sẽ đúng với mật khẩu trong database của Bob mà không cần biết Alice và Bob đã dùng thuật toán mã hóa gì

-----
Xàm xí một chút thôi cho bài viết đỡ nhàm chán bởi vì toàn là lý thuyết.

Trên thực tế Alice và Bob không thể nói oang oang với nhau như thế được, để nghe lỏm được thì Mallory sẽ là một Proxy giữa hai người này. Các bạn có thể sử dụng công cụ [Burp Suite](https://portswigger.net/burp) để làm điều này.


-----

Bài viết đến đây là hết, chúc các bạn có một ngày làm việc vui vẻ và hiệu quả
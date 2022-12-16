# Rate Limiting là gì ?
Rate Limit tức là hạn chế (limit) số lượng request gửi/nhận (rate) đến hệ thống.
nói thì nghe đơn gỉản vậy thôi. Trên thực tế, người ta phải sử dụng 1 số thuật toán để đảm bảo chạy nhanh, chính xác mà lại ít tốn bộ nhớ.
Giả sử như hệ thống của chúng ta nhận được hàng nghìn request nhưng mà trong số đó chỉ xử lí được trăm request/s chẳng hạn, và số request còn lại thì bị lỗi (do CPU hệ thống đang quá tải không thể xử lí được).

Để giải quyết được vấn đề này thì cơ chế Rate Limiting đã ra đời. Mục đích của nó chỉ cho phép nhận 1 số lượng request nhất định trong 1 đơn vị thời gian. Nếu quá sẽ trả về response lỗi.

1 số ví dụ hay gặp trong Rate Limiting như:

* Mỗi địa chỉ IP chỉ có thể tạo được 3 account trong 1 ngày.
* Mỗi người dùng chúng ta chỉ cho phép gửi 200 request/s. Nếu vượt quá thì sẽ trả về response lỗi.
* Mỗi người dùng chỉ cho phép nhập sai thẻ credit 3 lần trong 1 ngày.
# Vì sao Api lại cần Rate Limiting ?
Rate Limiting sẽ giúp chúng ta hạn chế được 1 số việc sau:

* Brute force thông tin thẻ credit card (quyét kiểu vét cạn)
* Tấn công DOS (Denial of Service) đến hệ thống
* Brute force password trong hệ thống (quyét kiểu vét cạn)

Những cuộc tấn công này nhìn có vẻ như đến từ người dùng thực, nhưng thực tế nó được tạo ra bởi bot. Do vậy mà nó rất khó bị phát hiện và dễ dàng làm service của chúng ta bị sập.

Ngoài ra, Rate Limiting cũng mang lại cho chúng ta 1 số lợi ích sau:

* Bảo mật: Không cho phép nhập sai password quá nhiều lần
* 
* Doanh thu: Với mỗi plan sẽ có rate limit khác nhau. Nếu muốn dùng nhiều hơn thì cần mua lên plan đắt tiền hơn.
# Một số thuật toán hay dùng?
## Leaky bucket(cái xô lủng)
Gấu bạn không muốn bạn uống nhiều, nên đổ hết trà sữa vào 1 cái xô rồi đục lỗ cho lủng. Dù bạn có mua vài chục ly nhưng đều phải đổ vào xô, mỗi ngày chỉ chảy ra tầm 1 ly. Bạn chỉ được uống trà chảy ra từ xô.

Cách này giúp cho hệ thống không sợ quá tải khi có nhiều người truy cập, vì cái xô sẽ chặn bớt.

![](https://images.viblo.asia/2ba63ff5-3efe-40ac-83ae-17c8612e9632.png)
## Token Bucket (Xô Đựng Token)
Thay vì bỏ trà sữa vào xô, gấu bạn sẽ bỏ vào xô mỗi ngày 60 Token. Nếu uống trà không đường bạn sẽ mua được 4 ly, còn uống trân châu đường đen kem cheese thì chỉ được 1 ly.

Tới hết ngày, nếu hết token, gấu bạn sẽ refill thêm. Cách này đảm bảo 1 ngày bạn chỉ uống tối đa 60 Token.

Trên thực tế, có nhiều request sẽ chạy lâu hơn, tốn nhiều tài nguyên hơn (tạo report, lưu nhiều dữ liệu). Nếu dùng Xô Lủng Từa Lua, ta chỉ đảm bảo được số lượng request tới server. Với thuật toán này, thuật toán tốn tài nguyên hơn sẽ cần nhiều token hơn, ta có thể dễ dàng control lượng tải tới server.
![](https://images.viblo.asia/af7d7857-4897-499c-99ab-2ad9445a9c98.jpeg)
## Thuật toán Cửa Sổ
Thay vì dùng xô, các thuật toán này dựa theo 1 khoản thời gian (timing window) để limit số lượng request.

Fixed window (Cửa sổ cứng ngắt)

Giờ không mua xô nữa, gấu bạn quyết định là giờ 1 tuần bạn chỉ được uống tối đa 3 ly. Một tuần (tính từ 0h sáng thứ 2 tới 12h tối CN) này chính là fixed window, limit là 3 ly.
![](https://images.viblo.asia/d17ad5cd-b73a-4f10-a5c7-3ebd908e7a83.png)
Thuật toán này dễ hiểu, dễ code, các hệ thống lớn khi cung cấp API cũng hay ra limit như thế này. Tuy nhiên, nó có 1 điểm yếu là… có thể bị lợi dụng để burst số lượng request vượt limit.

Ví dụ, gấu bạn ra limit này vì muốn bạn uống 2 ngày 1 ly. Tuy nhiên bạn quá máu nên đợi 11h30 tối CN uống 3 ly, sau đó 1h sáng thứ 2 uống thêm 3 ly nữa!

Vậy là trong 2 tiếng bạn uống 6 ly, đường lên, nhầm, lên đường cmn nó luôn!

Do vậy, người ta thường dùng Sliding Window Log / Sliding Window nếu muốn hạn chế điều trên.
## Sliding Window Log
Thay vì dùng thời gian fixed, gấu bạn quyết định thay đổi thuật toán. Giờ đây, khi bạn uống tà tữa, gấu sẽ ghi log lại. Sau đó, gấu tính thời gian 1 tuần trở về trước tính từ lúc bạn uống.

Giả sử bạn uống 1 ly trà sữa vào 12h trưa thứ 4 tuần này, gấu sẽ tra log từ 12h trưa thứ 4 tuần trước đến 12h trưa thứ tư tuần này. Đây chính là Sliding Window.

Sau đó, gấu sẽ đếm trong khoản thời gian này, nếu bạn uống ít hơn 3 ly thì mới cho bạn uống, còn không thì … gấu uống (Tin mình đi, bọn con gái rất chi li và kĩ mấy thứ này!)

Cách này đảm bảo được số lượng trà sữa bạn nốc vào người trong 1 tuần không vượt quá 3 ly. Nếu bạn nốc hết 3 ly cùng lúc, bạn sẽ phải chờ … đúng 7 ngày sau mới được hớp 1 giọt trà sữa.
![](https://images.viblo.asia/6a32d27f-feaa-4399-9f18-e90f3e2f4cb3.png)
Cách này rất chính xác, tuy nhiên, nó cũng đi kèm 1 số khuyết điểm:
* Tốn khá nhiều bộ nhớ vì phải log toàn bộ request
* Tốn tài nguyên vì phải log ở mỗi request
* Chạy có thể sẽ chậm, vì mỗi lần có request, ta phải query đếm lượng request trong 1 khoản thời gian nhất định để xem có tiếp nhận request hay không
* Hãy tưởng tượng hệ thống tầm 1 triệu người dùng, mỗi ngày họ gửi 1000 request là ta phải log gần 1 tỷ event mỗi ngày. Lưu trữ và query mòn râu luôn!
## Sliding Window
Sliding Window là một thuật toán cải tiến từ Sliding Window Log. Ta đổi độ chính xác lấy tốc độ và bộ nhớ (lưu ít hơn ,query ít hơn). Ta không log trên mỗi request, mà chỉ lưu lại số lượng trên mỗi khoản thời gian.

Quay lại với gấu. Do gấu thấy log mỗi lần uống mệt quá nên bây giờ, gấu chỉ log 1 lần vào Chủ Nhật là tuần đó bạn uống bao nhiêu ly trà sữa.

Giả sử ở tuần 1 bạn uống 3 ly. Vào 12h trưa thứ 4 tuần thứ 2, bạn định uống thêm 1 ly. Sliding Window sẽ là từ 12h trưa thứ 4 tuần trước đến 12h thứ 4 tuần này.
Sliding window này có 4.5 ngày trong tuần 1 (Chiều thứ 4 đến tối CN), 2.5 ngày trong tuần 2 (Sáng thứ 2 đến trưa thứ 4).

Do không có log cụ thể, ta sẽ ước đoán lượng trà sữa bạn uống trong khoảng thời gian này bằng công thức sau.
```
Số uống tuần 1 * (Ngày trong tuần 1 / 7) + Số uống tuần 2 * (Ngày trong tuần 2 / 7)

3 * (4.5/7) + 1 * (2.5/7) = 2.285

Tức là trong khoảng 7 ngày này bạn đã uống tầm 2.285 ly trà sữa, chưa uống thêm được.
```
Cách này có thể không chính xác lắm, vì số lượng trà sữa bạn uống sẽ không trải dài đều theo tuần. Tuy vậy, nó không bị gian lận như fixed window, lại tốn ít tài nguyên và bộ nhớ hơn, nên được sử dụng khá nhiều.
# Tóm lại
Trên đây là bài viết mình đã tìm hiểu về Rate Limiting api, mình thấy khá hay và tác giả viết rất dễ hiểu [https://toidicodedao.com/2020/03/17/rate-limiting-chong-ddos-p1/](https://toidicodedao.com/2020/03/17/rate-limiting-chong-ddos-p1/) .

Các bạn có thể tìm hiểu sâu hơn ở 2 link bên dưới nhé :
- [https://cloud.google.com/solutions/rate-limiting-strategies-techniques#techniques-enforcing-rate-limits](https://cloud.google.com/solutions/rate-limiting-strategies-techniques#techniques-enforcing-rate-limits)
- [https://hechao.li/2018/06/25/Rate-Limiter-Part1/](https://hechao.li/2018/06/25/Rate-Limiter-Part1/)
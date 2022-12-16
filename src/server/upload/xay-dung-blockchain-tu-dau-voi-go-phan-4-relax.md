# Giới thiệu
Ở phần trước chúng ta đã biết về Transaction, build một CLI đơn giản để xử lý các transaction. Bạn nào chưa xem thì xem lại các phần trước trước khi bắt đầu để hiểu rõ câu chuyện nhé. Mình mong mọi người hiểu được hết phần trước :smile: phần này chúng ta tiếp tục câu chuyện để hiểu thêm về blockchain nhé, sẽ không code gì ở phần 4 này nhé.

Github: https://github.com/lequocbinh04/the-simple-blockchain

#  Tiếp tục câu chuyện
#### Wednesday, March 27
**Jack** đã đầu tư quá nhiều (2000$) mà anh ấy quên mất khoản tiền trọ của mình, và hiện tại Jack không còn một xu nào nữa. Jack gọi điện cho Jay - chủ trọ của mình.

- **Jack:** Alo, tui xin lỗi ông nhưng mà bây giờ tui không có đủ tiền để trả tiền trọ...
- **Jay:** Sao thế ?
- **Jack:** The Blockchain Bar mở ICO với ưu đãi nuột quá nên tui lỡ đầu tư toàn bộ tiền vào nó, tui đã mua 2000 Token với giá chỉ 1000$
- **Jay:** Ông đang nói cái gì vậy? ICO là gì? Token là sao? Liệu ông có thể thanh toán tiền nhà cho tui bằng cách khác không?
- **Jack:** Thế để tui chuyển cho ông 1000 TBB tương đương với 1000$ á, ông có thể dùng nó để thanh toán đồ uống của quán bar. Để tui gọi cho **John** để chuyển token.
- **Jay:** Oke ông.


**John** đã xác nhận giao dịch, và anh ấy quyết định sẽ có một khoản **phí ẩn** của giao dịch này (50TBB), anh ấy không muốn như thế nhưng những cổ đông (những người đầu từ sớm vào TBB) muốn có khoản lợi nhuận từ TBB. John tự nhủ, dù sao thì chỉ mỗi anh ấy mới có quyền truy cập DB, nên chắc Jack sẽ không để ý khoản phí nhỏ này đâu

```shell
// tiền trọ
tbb tx add --from=jack --to=jay --value=1000
// phí
tbb tx add --from=jack --to=john --value=50
// phần thưởng cho john ngày hôm nay
tbb tx add --from=john --to=john --value=100 --data=reward
```

# Chuyện gì đến cũng sẽ đến
#### Thursday, March 28
Jack vào quán bar và ăn mừng sinh nhật của anh ấy.

- **Jack:** Ê John! hôm nay là sinh nhật của tui, ông cho tui loại nước mắc nhất ở đây đi.
- **John:** Happy birthday!!! Nước của bạn đây: **Crystal Head Vodka**, nhưng giá của nó là **950TBB** nhưng số dư của bạn chỉ còn **949TBB** :(
- **Jack:** Hả?? tui nhớ là tui còn 999 TBB mà nhỉ?
- **John:** À, giao dịch chuyển TBB của ông với **Jay** tuần trước mất 50TBB làm phí giao dịch.
- **Jack:** Không chấp nhận được? Ông làm ăn kiểu gì vậy, tôi sẽ không bao giờ chấp nhận giao dịch nếu biết phí cao như thế, tui tin tưởng hệ thống của ông,  mà ông lại làm vậy à?
- **John:** Tui xin lỗi, thật ra ông là khách hàng thân thiết của tui, tui không muốn làm như vậy nhưng các cổ đông đã ép tui. Được rồi tui sẽ lập trình lại hệ thống để nó mang tính **phi tập trung**, mọi người có thể tự thực hiện giao dịch mà **không cần thông qua tôi**, điều đó sẽ làm tăng độ tin cậy cho hệ thống.

- Gọi nước uống giờ chỉ mất vài giây thay vì vài phút
- Khách hàng nếu quên ví của họ ở nhà có thể mượn token lẫn nhau
- Tôi sẽ không lo làm mất dữ liệu khách hàng (một lần nữa) do **mọi người đều sở hữu bản sao của nó**.
- Mỗi khi một giao dịch **nếu được mọi người đồng ý** được thêm vào db **thì sẽ không được thay đổi**.
- Nếu các nhà đầu tư sớm (cổ đông) muốn giới thiệu một khoản phí mới, hoặc tăng phí hiện tại thì mọi người đều sẽ có thông báo về điều đó.

- **Jack:** Chà nghe hay đó ông, nhưng liệu có khả thi không?
- **John:** Có chứ! chỉ cần dùng một chút: hashing, linked lists, immutable data structure, distributed replication, và asymmetric cryptography!
- **Jack:** Wowwwwwwwwwwwwwwwwwwwwwww! tui không hiểu gì hết nhưng mà cứ làm đi John.

Một ngày nữa đã trôi qua, và John sẽ nhận được 100 TBB là phần thưởng cho việc nâng cấp & bảo trì DB của mình:
```shell
tbb tx add --from=john --to=john --value=100 --data=reward
```

# Tổng kết
[🔑] **Blockchain developers hướng đến việc phát triển các giao thức để người dùng của họ có thể giao dịch, trao đổi token với nhau một cách minh bạch, có thể kiểm tra được. Thông số của blockchain phải được xác định rõ ràng ngay từ đầu.**

Block chain là một cơ sở dữ liệu. Tổng cung của token, số dư ban đầu của user, và các setting của blockchain sẽ được đặt ở Genesis file. Số dư, trạng thái ban đầu của blockchain được ghi ở genesis file là không bao giờ thay đổi.

Các thay đổi lên cơ sở dữ liệu gọi là giao dịch (Transaction | TX). Giao dịch là các sự kiện cho các hành động trong hệ thống.
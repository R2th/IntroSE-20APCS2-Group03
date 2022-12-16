**Bài viết có có nội dung cấm, chỉ đọc nếu bạn muốn logout jwt :(**

![](https://images.viblo.asia/98c204c6-53d5-466c-a52b-f87aaf511756.jpeg)

> Dùng JWT đi thời nào rồi còn dùng session nữa ba...

Yeah, câu chuyện muôn thuở của newbie khi mới code phần authentication, every where... từ các group tới các khoá học basic nodejs, resfulapi, mongodb & expressjs vân vân và mây mây, chỗ nào cũng nhận được lời khuyên rằng dùng jwt thay cho session, sẽ giảm tải được cho server vì trạng thái của người dùng sẽ được lưu ở client thay vì server bala bala.... Nhưng mọi chuyện đâu chỉ đơn giản là sign state của user rồi quăng cho client là được. Mọi rắc rối mới chỉ bắt đầu.

# First things first

## Lời nói đầu
Mình là **Đức Master** - dev của LmssPlus, bữa nay mới được khai thông mấy cái lặt vặt về hệ thống Authentication và Authorization nên ngứa ngáy tay chân viết cái blog để hệ thống lại chút. Tiện bày cho các bạn newbie giống mình dùng jwt chưa được "chuẩn chỉ" cho lắm cách setup hệ thống cho mượt. Mình cũng không phải chuyên môn hay cao siêu gì, học được gì hay ho thì chia sẻ với các bạn thôi, có gì sai sót mong mọi người góp ý.

## Session hoạt động như thế nào?
Giả dụ trong lãnh địa của mình có 5 khu, 1 khu nấu ăn, 1 khu wc, 1 khu phòng nghỉ ngơi thư giãn, 1 khu để giữ xe, và 1 tầng hầm (để nhốt các bé loli). Chuyện đáng nói là ông bảo vệ đòi xuống tầng hầm chơi với các bé loli, mình thấy không yên tâm lắm nên đuổi việc rồi nhờ vợ thuê cho hẳn 1 đội bảo vệ chuyên nghiệp siêu cấp vip pro. Gòy nay đi chơi về nhà có ông bảo vệ mới toanh đứng trước nhà không cho mình vô. Ông đòi mình xuất trình `username` và `password`, rồi ông ý tìm trong  `sổ user` thấy oke mới viết vào `sổ session`các quyền của mình, mình có chụp trộm được đây: 

![](https://images.viblo.asia/51a7015a-383f-4019-9b3f-5671459e73c4.jpeg)

Rồi ông ý đưa mình cái mã `chúa-tể-lãnh-địa-random123` bảo mình lần sau có vô thì không cần đọc pass, cứ đưa cái mã đó vô là được. Mình cũng ậm ừ không hiểu lắm cơ mà cũng được. Làm ăn thế này thì không lo 113 bắt rồi hehe.

Vừa nãy có bạn X vào chơi bị ông bảo vệ lại chặn lại, nó mới quăng cho ông bảo vệ cái mã `bạn-chúa-tể-random2233` (hồi sáng nó cấp username/pass nên được đưa cho mã này). Ông bảo vệ nhìn cái mã, lục lọi trong đống giấy, tìm mãi mới thấy tờ có nội dung như thế này: 

![](https://images.viblo.asia/6881ee82-e0e7-4437-a70d-ca427e4bd0cd.jpeg)

Vậy là bạn X này được xài khu WC và phòng ngủ 2, chỉ được vô 2 khu đó thôi, vô chỗ khác là bị các chú bảo vệ pằng pằng.

**Và đó chính là cách session hoạt động. Khi client tạo 1 request login tới server, server sẽ tìm trong `sổ user` coi có hợp lệ không, nếu oke thì lấy các quyền mà user đó có, rồi tạo 1 session lưu ở server và trả về cho client 1 cookie (chứa session id (không trùng lặp)). Với mỗi request, client sẽ cầm theo cookie, server sẽ dựa vào id trong đó để tìm trong `sổ session`, coi cái nào khớp thì coi có quyền gì mà xử lí, không có thì bắt login lại.**

## Jwt là gì?
Haizz, mọi chuyện vẫn ổn, nhưng chuyện mình vừa kể là câu chuyện cách đây 1 năm rồi. Sau đó mình làm ăn phát đạt, có cả chục ngàn khách ghé thăm. Mấy ông bảo vệ lưu đám giấy nhiều quá, không có chỗ mà chứa nữa :(. Vì cứ một người lại 1 tờ lưu như trên ấy, hic. Thế là mình mới nhờ các mỗi quan hệ của mình và tìm được 1 đội cảnh vệ tên là JWT, lúc đó nghe người ta giới thiệu rằng đội bảo vệ này giải quyết được vấn để lưu quá nhiều giấy, cách giải quyết của họ là: **không lưu giấy**, oh wow...

Lần đầu, ông ý cũng đòi mình xuất trình `username` và `password` rồi ông ý tra trong  `sổ user`, cơ mà lần này thay vì ông ý viết vào `sổ session` và đưa cho mình 1 cãi mã ngắn ngắn thì ông ý đưa cho mình 1 cãi mã dài đoằng, mình có chụp cho bạn coi nè : 

![](https://images.viblo.asia/a7e6259f-8d06-44d3-859f-b892c3b4110c.png)

Oh, vậy là ông ý đưa cho mình 1 giấy uỷ quyền gồm quyền của mình, trên đó chữ kí của nóc nhà (vợ mình) và ngày hết hạn. Vậy là mình cầm 1 tờ giấy giả (không có chữ kí hợp lệ) hay 1 tờ giấy đã quá hạn sẽ không được. Còn ngược lại các tờ giấy hợp lệ thì cứ theo nội dung trên tờ giấy mà làm. Mình cầm tờ này đi tới khu vui chơi, ông bảo vệ trước khu vui chơi nhìn tờ giấy hợp lệ liền cho mình vô mà **không phải tra bất cứ tài liệu, sổ sách gì, chỉ cần giấy uỷ quyền được kí và chưa hết hạn** là được.

Vậy là bây giờ theo cách này **không cần phải lưu bất cứ giấy tờ gì nữa,** không phải lo không có chỗ lưu giấy tờ rồi (tiết kiệm tài nguyên cho server).

**Đó chính là cách jwt hoạt động. Không lưu session, cấp cho người dùng 1 tờ giấy uỷ quyền (token), trên đó có thông tin/quyền user được phép, có chữ kí và ngày hết hạn. Mỗi lần truy cập vào đâu ông bảo vệ không cần tra cứu sổ sách gì cả, cứ nhìn giấy uỷ quyền hợp lệ là cho vô.**

### Chốt hạ
| Session | Jwt |
| -------- | -------- | -------- |
| Cần database hoặc session store (trong ram) để lưu session data | Không cần db hoặc ram để lưu session data |
| Tìm trong session store hoặc database với mỗi request    | Session data đã được gắn ở trong token, chỉ cần check chữ kí và hạn   | 
| Khó mở rộng và tốn tài nguyên để lưu trữ  | Không tốn tài nguyên lưu trữ (\*) và dễ mở rộng | 
| Cookie chứa SessionID (unique) random, chỉ có sessionID, không có thông tin khác|Có các thông tin user/quyền của user được đặt trong token|
|Thu hồi bằng cách xoá session|Một khi đã kí không thể thu hồi theo cách thông thường|
|Thay đổi quyền truy cập bằng cách thay đổi session|Một khi đã kí không thể thu hồi theo cách thông thường|

# Ác mộng mới chỉ bắt đầu
Cứ tưởng tới đó là cuộc sống của mình trở lên hạnh phúc rồi, nhưng thật không ngờ trong những người khách hàng vào khu tầng hầm loli của mình lại có người là công an mật. Rồi giờ làm sao để block người khách là công an mật này? Người ta ra vào có tờ giấy uỷ quyền hợp lệ (đã được kí và không hết hạn), bảo vệ thì cứ check sign hợp lệ là cho vào. Vậy phải làm sao đây :(

Mình cùng đội bảo vệ giải quyết vấn đề này thế nào mời các bạn đón xem phần 2
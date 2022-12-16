### Những điều cần lưu ý khi test game:
![](https://images.viblo.asia/da82bce9-c2e0-42de-aa44-9cc98f75ff2d.png)
1. Giao diện người dùng và tính năng: 

Giao diện người dùng và tính năng tổng thể tác động lớn đển sự thành công của game
- UI layout : game phù hợp những độ phân giải màn hình khác nhau và các loại màn hình khác nhau. Regression testing nên được thực hiện mỗi khi hoàn thành và mỗi khi thay đổi UI layout để đảm bảo rằng nó làm việc đúng cách trong game.
- Cấu trúc menu và các hàm
- Screen orientation
- Độ phân giải màn hình

2. Graphics Performance

Hiệu năng cần được nhất quán trên tất cả các thiết bị khác nhau mà người dùng có thể có. Cũng nên test trong nhiều giờ để quan sát tốt hơn cũng như bao nhiêu pin được sử dụng trong quá trình sử dụng lâu dài. Load/Stress tests có thể sử dụng để xác định xem game của bạn có thể chơi tốt trong thời gian bao lâu. Các bài test về hiệu năng sẽ đánh giá trò chơi của bạn có thể như thế nào trên một thiết bị thực.

3. Tính khả dụng và trải nghiệm người dùng

Chỉ nên sử dụng các thiết bị thực sự để test. Tính khả dụng và giải trí tuyệt vời là hai điều quan trọng bạn cần cân nhắc khi kiểm tra “trãi nghiệm của người dùng”:
 Tương tác người dùng và sự đáp ứng tuyệt vời – Đây là một điều quan khi  test game của bạn bởi vì nó ảnh hưởng đến trãi nghiệm của người dùng (tốt hay xấu). 
 
4: Tính năng Multi-player/User
 
 Test tính năng Multi-player/User có nhiều khó khăn hơn và đòi hỏi đầu nhiều yếu tố để thực hiện. Trong những trường hợp này, bởi vì điều cốt lõi của tính năng này là thiết bị phải kết nối với các máy chủ vì thế bạn phải đảm báo các kết nối được thực hiện và được đáp ứng nhanh chóng cũng như sự đồng bộ giửa các thiết bị phải được ưu tiên test kỹ lưỡng. Có rất nhiều trường hợp khác trong tính năng này nên bạn cần tập trung test nhiều hơn bởi nó sẽ ảnh hưởng nghiêm trọng đến trãi nghiệm mà game mang lại cho người sử dụng.
 
5: Tích hợp các mạng xã hội
 
Tích hợp mạng xã hội cũng là một phần rất quan trọng trong game. Trong nhiều trò chơi, nó là điều cần thiết để có thể chia sẻ kết quả cho bạn bè của họ. Điều này cần được kiểm tra kỹ lưỡng trên các thiết bị thực với các phiên bản hệ điều hành khác nhau và cấu hình thiết bị khác nhau.
 
 6: Bảo mật và Trách nhiệm

 Gần như tất cả các game developer sử dụng một số thành phần mã nguồn mở như một phần trong game của họ. Điều này cũng được được chấp nhận và khuyến khích trong thực tiễn vì nó giảm tải trong việc xây dựng các hàm không cốt lõi trong game của bạn. Tuy nhiên, việc xác định code của bên thứ ba, các lỗ hổng của nó, và những giới hạn về license rất thường bị bỏ quên bởi game developer.
###   Checklist for game mobile

![](https://images.viblo.asia/ab4b5c22-16da-4b2d-9904-e81370f43810.png)

 **User Interface**
- Loading Screen
- Login screen
- Check vị trí xuất hiện biểu tượng loading
- Check màn hình chính/thanh menu
- Tutorial
- Check Landscape/Portrait
- Check các hình ảnh động, chuyển động của nhân vật, đồ họa, zoom in, zoom out
- Nhân vật không di chuyển ra khỏi màn hình/ khu vực nhất định
- Check xem hình nền có bị cắt, có viền đen xung quanh, icon bị mờ hay không
- Check xem các đối tượng có bị đè lên nhau không
- Check enable,disable
- Check các title screen
- Check các tit textbox có phù hợp không
- Check scrollbar
- Check font chữ(màu sắc, kích cỡ, độ phân giải...)
- Check khi cài game tại các máy có độ phân giải khác nhau

**Game play**
- Check từng khu vực của game
- Chơi game đến cuối cùng
- Check toàn bộ các thao tác đúng về cách chơi của game
- Chơi tutorial bỏ giữa chừng/ bỏ tại từng trạm...
- Check các tính năng sẽ được mở khóa
- Check điểm thưởng
- Check việc tăng điểm khi level được tăng
- Check nhiều chức năng hoạt động cùng lúc
- Chế độ chơi game khác nhau, vị trí
- Lặp lại các hành động chạm và bấm
- Dùng phím nguồn hoặc home để kiểm tra xem các gói tin có được lưu hay không
- Cách thức tạo tài khoản, quên mật khẩu

**Payment**
- Check từng gói nạp tiền, check từng mức giá khi nạp
- Khi đang thao tác nạp tiền mà ngắt kết nối
- Sử dụng thẻ nạp liên tục, click vào gói nạp liên tục
- Dùng  1 thẻ nạp sử dụng nhiều lần
- Thử hack/cheat

**Check backgroud music and sound effect**
- On/off âm thanh và nhạc nền
- Check khi có cuộc gọi đến
- Check nếu hiệu ứng âm thanh đồng bộ với hành động
- Check chế độ rung nếu có
- Âm thanh của button khi click
- Âm thanh của trạng thái chuyển động nhân vật
- Khi thoát ứng dụng bằng phím cứng / nguồn thì âm thanh có còn hay không

**Score**
- Tính điểm
- Check bảng thông báo chung, thời gian, hàng tuần, hiện tại
- Check chức năng đăng ký điểm
- Check định dạng đấu , hay . cho chữ số
- Check đồng bộ điểm

**Time out**
- Check thời gian cho người dùng time out là bao lâu
- Check xem có thông báo khi time out không, nếu click ok thông báo thì chương trình load về đâu

**User profile**
- Check khi upload nhiều loại ảnh (jpg,png, gif...)
- Nhập các ký tự đặc biệt, số, khoảng trắng trong user name
- Password hiển thị hoa thị

**Save setting**
- Check các chế độ cài đặt được lưu và thực hiện đúng

**Chat feature**
- Check hồ sơ cá nhân
- Check giới hạn tối đa phần mô tả chat
- Check khi nhập chuỗi rỗng, ký tự đặc biệt
- Check xem có nhận được thông báo khi có tin nhắn hay không

**Help and about screen**
- Định dạng dễ hiểu
- Không có lỗi chính tả
- URL phải có hyperlink

**Multiplayer game**
- Check phiên hết hạn
- Đăng nhập và đăng xuất
- Đăng ký
- Xác nhận tài khoản
- Check quên mật khẩu

**Memory leak**
- Chec game khi bộ nhớ điện thoại thấp
- Check khi mất mạng
**Localization**
- Hỗ trợ các ngôn ngữ khác nhau
- Check định dạng thời gian
- Thay đổi thời gian thiết bị, định dạng...
- Thay đổi ngôn ngữ đột ngột

**Multitasking**
- Sử dụng nhiều ứng dụng cùng 1 lúc thì game có hoạt động bình thường hay không
- Chế độ dừng của game khi nhận cuộc gọi, sleep
- Khi đang chơi thì sạc điện thoại, rút sạc cắm tai nghe, rút tai nghe
- Check các hành vi Bluetooth, SMS, MMS khi game đang chạy

**Performance**
- Check thời gian tải của game
- Đảm bảo rằng dòng chảy game phải nhanh và các hành động khác là không đáng kể
- Độ ngốn pin với các mức độ sáng khác nhau của màn hình
- Cài đặt game tại các đời máy yêu cầu
- Check kích cỡ màn hình hỗ trợ và phiên bản các hệ điều hành
- Check share option (Qua mail, fb,twitter. Check các tin nhắn được đăng, gửi, và biểu tượng ứng dụng được hiển thị)

**Install/Uninstall/Upgrade the game**
-Check tất cả các dữ liệu hiện tại khi nâng cấp game
- Save game xong xóa game rồi cài lại thì data có được giữ nguyên hay không
- Đồng bộ hóa dữ liệu khi cài đặt 1 tài khoản ở 2 thiết bị
- Cài đặt game khi dữ liệu full bộ nhớ

**Checklist when release**
- Các yêu cầu đặc thù từ nhà phát hành, nhà cung cấp dịch vụ, hãng điện thoại...
- game khi up lên google play hay app store cần thỏa mãn điều khoản
- Check nội dung mô tả
- Kích cỡ ảnh tại google play, app store
- 
***Nguồn tham khảo***: https://tfortesting.wordpress.com/2012/10/04/test-cases-for-games-apps-checklist-for-games-apps/
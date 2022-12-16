Trong bài này mình sẽ hướng dẫn các bạn sử dụng TestFlight, nếu các bạn muốn đọc chi tiết hơn thì có thể tham khảo từ bài [gốc](https://www.raywenderlich.com/5352-testflight-tutorial-ios-beta-testing)


Để dùng TestFlight thì trước hết bạn cần có 1 app để test và 1 tài khoảng apple pro để có thể gửi app lên được.

## Submitting your Build to iTunes Connect

Mở dự án của bạn bằng Xcode, đảm bảo bạn có Bundle Identifier chưa bị trùng với app nào trước đó, Team ID thì chọn tài đúng tài khoảng đã đc trả phí. Trong scheme chọn **Generic iOS Device**:

![](https://images.viblo.asia/0200c8a9-3cba-456a-be47-f6d337509a06.jpg)

Chọn **Product** > **Archive**:

![](https://images.viblo.asia/b0829e0e-622a-439e-bdd8-021b43ebbe83.png)

Nếu mọi thứ đều ổn với bản built, Xcode sẽ mở **Organizer window**  với app của bạn trong tab Archives. Nhấp vào **Upload to App Store….**


Xcode sau đó sẽ nhắc bạn với các tùy chọn phân phối App Store. Xcode chọn tất cả các box theo mặc định. Để chúng như thế này và nhấp vào Tiếp theo:


![](https://images.viblo.asia/aca8741a-59bc-4ed2-8b0e-23f8c0addeb1.png)

Màn hình tiếp theo yêu cầu bạn cho các tùy chọn phân phối. Bạn có thể chọn automatic signing hoặc có thể chọn manually select. Chọn những cái có liên quan, và nhấn **Next**.


Khi Xcode hoàn thành built thì nó sẽ hiển thị một trang tóm tắt cho app mà bạn sắp gửi. Nhấp vào **Upload**.


Ứng dụng của bạn sẽ bắt đầu tải lên iTunes Connect. Khi quá trình tải lên kết thúc, bạn sẽ thấy thông báo sau:


![](https://images.viblo.asia/99105410-23d7-43d2-845a-58c3af0846ff.png)


nhấp **Done** :]

Đó là tất cả các công việc cần thiết cho Xcode. Bản build beta của bạn hiện đã có trên iTunes Connect và đó là nơi mà bạn sẽ thực hiện phần còn lại của công việc để thiết lập TestFlight.

## Adding Internal Testers

Bản build của bạn đã sẵn sàng để test, nhưng ai sẽ test nó?


Apple định nghĩa hai loại người test cho TestFlight:


**Internal Tester**: Đây là người dùng iTunes Connect có vai trò Admin, App Manager, Legal, Developer, Marketer có quyền truy cập vào ứng dụng của bạn. Đây thường là thành viên trong nhóm hoặc khách hàng mà bạn đang phát triển ứng dụng. Bạn có thể thêm tối đa 25 người thử nghiệm nội bộ.


**External Tester**: Đây là bất kỳ người dùng nào bên ngoài nhóm của bạn muốn kiểm tra ứng dụng của bạn. Người kiểm tra bên ngoài không có quyền truy cập vào tài khoản iTunes Connect của bạn dưới bất kỳ hình thức nào và chỉ có thể tải xuống và cài đặt ứng dụng. Bạn có thể thêm tối đa 10.000 người thử nghiệm bên ngoài.


Trước khi người kiểm tra bên ngoài của bạn có thể kiểm tra ứng dụng của bạn, bạn phải gửi ứng dụng của mình cho Apple để xem xét, giống như lúc bạn gửi với App Store thông thường nhưng các đánh giá này có xu hướng đi nhanh hơn các đánh giá ứng dụng thông thường.


Mặt khác, người kiểm tra nội bộ sẽ được thông báo ngay lập tức về các bản dựng mới ngay khi chúng được tải lên và xử lý trong iTunes Connect. Bạn sẽ tìm hiểu thêm về những người thử nghiệm bên ngoài sau,  hiện tại bạn sẽ tập trung vào những người thử nghiệm nội bộ.


Để thêm một người kiểm tra nội bộ, hãy đi tới phần **Users and Roles** trong **iTunes Connect**:


![](https://images.viblo.asia/c5aa829f-2f92-45d2-83f3-a9cf4bbca311.png)


Nhấp vào nút + để thêm người dùng mới:


![](https://images.viblo.asia/52e93a3b-790f-487b-a51d-1d28cd689b49.png)

Điền thông tin người dùng mới, sử dụng email bạn có quyền truy cập và nhấp vào **Next**:


![](https://images.viblo.asia/dad8cac5-9005-4907-bab4-08d143252842.png)


Lưu ý: Nếu địa chỉ email đã nhập không được liên kết với ID Apple, người kiểm tra của bạn sẽ phải tạo ID Apple để chấp nhận lời mời. Điều này chỉ áp dụng cho Trình kiểm tra nội bộ khi họ cần truy cập iTunes Connect.


Bây giờ bạn cần chỉ định một vai trò cho người dùng mới. 


Nếu bạn không chắc chắn nên chọn vai trò nào, hãy sử dụng **App Manager** cho phép quản lý thử nghiệm beta và có thể download ứng dụng. Khi bạn đã hoàn tất việc thiết lập user mới của mình, hãy nhấp vào **Next**.


Chọn loại thông báo bạn muốn người kiểm tra mới của bạn nhận được, sau đó nhấp vào **Save**:

![](https://images.viblo.asia/a5ce28d8-cc5c-4c56-998a-65ef004522d7.png)

iTunes Connect hiện gửi lời mời đến user mới, trước tiên user cần xác minh địa chỉ email của mình trước khi tài khoản sẽ hiển thị trong iTunes Connect. 

Truy cập hộp thư đến cho người dùng mới Địa chỉ email của user, tìm email có tên **Welcome New iTunes Connect User** và nhấp vào **activate your account**. Khi bạn đã thực hiện quy trình này, user mới mà bạn đã thêm sẽ được bật trên iTunes Connect và có thể được sử dụng test nội bộ.

![](https://images.viblo.asia/2aafc8e1-5aad-47be-9348-bfbe64d0bf56.png)

Tạo một thử nghiệm beta nội bộ mới chỉ là phần đầu tiên của quy trình. Bước còn lại là mời người thử nghiệm cụ thể này thử nghiệm bản dựng mới nhất của bạn.

Đã đến lúc để kích hoạt thử nghiệm trên app của bạn.

## Starting Beta Testing

Để bắt đầu thử nghiệm beta ứng dụng của bạn, hãy đi tới phần  **My Apps** trên trang chủ iTunes Connect và nhấp vào app của bạn:

![](https://images.viblo.asia/4cd86cb2-3c5c-44eb-96f5-193782d4d4c4.png)

Chọn tab Activity. Đây là nơi bạn sẽ tìm thấy bản build mà bạn đã tải lên trước đó. Nếu nó vẫn còn được đánh dấu là Processing thì hãy pha cho mình một tách cà phê và quay lại sau. :]

![](https://images.viblo.asia/aed5c1e1-0498-4e95-99bf-63f9ed00c83a.png)

Tiếp theo, nhấp vào tab TestFlight. Bạn có thể nhận thấy một dấu hiệu cảnh báo màu vàng bên cạnh bản build mà bạn muốn gửi người kiểm tra nội bộ. Hãy nhấp vào dấu hiệu cảnh báo và hoàn thành các bước cần thiết.

![](https://images.viblo.asia/3662da6b-7742-454e-a0b6-219f5372e743.png)

Khi bạn đã hoàn tất, trạng thái bản build sẽ thay đổi thành **Ready to Test**:

![](https://images.viblo.asia/ad81a6ff-28af-43bc-9ee1-1aee2c8e795d.png)

Tiếp theo, nhấp vào **Add iTunes Connect Users** trong thanh menu bên trái. Sau đó, bạn sẽ thấy một danh sách những người thử nghiệm nội bộ. Chọn những thứ bạn muốn thêm vào để kiểm tra nội bộ cho bản build này và nhấp vào **Add**.


Tất cả những người kiểm tra được chọn hiện nhận được một email có liên kết để tải xuống và cài đặt bản build này thông qua ứng dụng TestFlight.

## External Testers

Đầu tiên, nhấp vào **Test Information** trong menu bên trái và điền vào tất cả các thông tin cần thiết. Tối thiểu, điều này bao gồm:

Beta App Description

Feedback Email

Contact Information

Bạn phải cung cấp thông tin này để gửi bản build cho thử nghiệm bên ngoài. Sau khi hoàn thành, nhấp **Save**.

![](https://images.viblo.asia/50fb181c-294f-474e-a190-7cead0f94c1e.png)

Bây giờ, bấm **Add External Testers** trong menu bên trái. iTunes Connect yêu cầu bạn tạo một nhóm thử nghiệm mới. Nó phụ thuộc vào bạn như thế nào bạn chọn để quản lý các nhóm của bạn. 

Bạn có thể có một nhóm cho tất cả những người thử nghiệm của mình, các nhóm khác nhau cho các loại thử nghiệm khác nhau hoặc các nhóm khác nhau cho các ứng dụng khác nhau. Đối với hướng dẫn này, bạn sẽ tạo một nhóm được gọi là **Top-Testers**.

Khi bạn đã tạo group, bạn có thể bắt đầu thêm người kiểm tra bên ngoài vào nhóm. Nhấp vào **Add Testers** trong cửa sổ bật lên:

![](https://images.viblo.asia/d582883b-eea3-4acd-a4ee-49e94733cefd.png)

Tại thời điểm này, bạn có thể chọn giữa việc thêm tester mới theo cách thủ công, thêm người kiểm tra hiện có ( người đã kiểm tra ứng dụng hoặc bản build khác) hoặc nhập người kiểm tra từ tệp CSV. Đối với hướng dẫn này, bạn sẽ thêm các trình kiểm tra mới theo cách thủ công. Chọn Thêm người kiểm tra mới và nhấp vào **Next**.


Thêm địa chỉ email, tên và họ của bất kỳ người kiểm tra bên ngoài nào bạn muốn thêm. Khi bạn đã hoàn tất, nhấp vào **Add**. Bạn luôn có thể thêm nhiều người kiểm tra bên ngoài bằng cách nhấp vào nút + trên testing group page. Tất cả những người kiểm tra bên ngoài đều được tính vào giới hạn 10.000 người:

![](https://images.viblo.asia/42be3cde-c1ec-4d1b-84c4-7926c9024283.png)

Bây giờ bạn cần chọn một bản dựng cho người kiểm tra bên ngoài của bạn. Trên tab Bản dựng, bấm vào nút +:

![](https://images.viblo.asia/d12ed870-537f-401e-a6ef-1e48f8536f23.png)

Sau đó, chọn bản build của bạn và nhấp vào **Next**:

![](https://images.viblo.asia/96feb335-d7eb-4d37-8209-7f86678dd91b.png)

Lưu ý: Tại sao bạn chọn bản build riêng cho người kiểm tra nội bộ và bên ngoài của bạn?  Đó là vì bạn có thể muốn người kiểm tra nội bộ và bên ngoài của bạn đang thử nghiệm các bản build khác nhau. 


Ví dụ: người kiểm tra bên ngoài của bạn có thể đang kiểm tra bản phát hành tiếp theo của bạn, nhưng người kiểm tra nội bộ của bạn đang kiểm tra bản build chính thức của bạn. Bằng cách làm cho bạn chọn một bản build cho người kiểm tra nội bộ và bên ngoài một cách riêng biệt, iTunes Connect cho phép loại tách này. Tương tự, bạn có thể chọn các bản build khác nhau cho các nhóm thử nghiệm khác nhau.


iTunes Connect có thể hỏi thêm câu hỏi, chẳng hạn như liệu ứng dụng có yêu cầu đăng nhập hay không. Hoàn thành các bước còn lại, bao gồm cung cấp thông tin kiểm tra để hiển thị cho người kiểm tra bên ngoài của bạn.


chọn Automatically notify testers nếu bạn muốn nó gửi noti cho các tester.

![](https://images.viblo.asia/a406e1f0-55bc-4c8c-9fb4-db0ed903a65a.png)

iTunes Connect thêm ứng dụng của bạn vào hàng đánh giá và thay đổi trạng thái của nó thành** Waiting for Review**. Để được chấp thuận, bản build của bạn phải tuân thủ đầy đủ Nguyên tắc đánh giá App Store đầy đủ. Phê duyệt thường mất không quá 48 giờ. Khi Apple phê duyệt phiên bản ứng dụng của bạn, các bản build tiếp theo sẽ thắng Yêu cầu xem xét cho đến khi bạn thay đổi số phiên bản.


Khi ứng dụng đã vượt qua Beta App Review, bạn sẽ nhận được email xác nhận rằng ứng dụng của bạn hiện có thể bắt đầu thử nghiệm bên ngoài. Nếu bạn đã chọn Automatically notify testers người kiểm tra bên ngoài của bạn sẽ nhận được email thông báo vào thời điểm này. 


Lưu ý: Bản build chỉ có hiệu lực trong 90 ngày. Nếu bạn muốn những người thử nghiệm của bạn sử dụng ứng dụng này, bạn sẽ phải tải lên bản build mới trước ngày hết hạn.

## Testers’ Point of View

Phần này sẽ hướng dẫn bạn các bước cần thiết từ người thử nghiệm của bạn để truy cập vào bản build bạn vừa có gửi. 

### Installing TestFlight
Ứng dụng TestFlight đã cài trên AppStore. Nếu bạn chưa có, hãy mở AppStore và tìm kiếm TestFlight:

![](https://images.viblo.asia/c73d729a-57e2-4c1a-ac13-2f15eb4e4c3e.jpeg)

Tải xuống ứng dụng TestFlight và chạy nó. Khi được yêu cầu đăng nhập, hãy đăng nhập bằng bất kỳ ID Apple nào bạn muốn sử dụng. Đây có thể là ID Apple cá nhân trên thiết bị thử nghiệm của bạn và không phải phù hợp với địa chỉ email bạn đã thêm vào iTunes Connect.

### Redeeming Your App

Khi bản build có sẵn hoặc khi bạn thêm người kiểm tra mới, người kiểm tra nhận được lời mời để kiểm tra bản build qua TestFlight.

![](https://images.viblo.asia/9718a3d8-f587-4954-a65a-90bb0faacefa.png)

Mở email này trên thiết bị thử nghiệm của bạn, sau đó nhấp vào View in TestFlight. 

![](https://images.viblo.asia/5fec96e9-8552-43d2-8336-2a084a1aa979.jpeg)

![](https://images.viblo.asia/c1c4cccd-64a7-49f9-bd9e-5f8a2025f022.jpeg)

Từ giờ trở đi, bất cứ khi nào có phiên bản mới của ứng dụng này, bạn sẽ thấy thông báo từ TestFlight. Tất cả bạn cần làm là cập nhật ứng dụng của bạn và chạy phiên bản mới nhất.
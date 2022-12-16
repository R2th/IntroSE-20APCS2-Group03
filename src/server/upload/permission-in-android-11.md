Chào các bạn.

Mình mới update phiên bản Android trên điện thoại lên Android 11 (mặc dù nó ra mắt cũng khá là lâu rồi :v). Cá nhân mình thì chưa lần nào update phiên bản Android lên mà google xem nó có gì khác cả. Nhưng lần này thế bất nào tính tò mò lại nổi lên nên cũng lên gõ vài đường 

Google xem nó có gì khác so với các phiên bản trước về mặt người sử dụng cũng như developers hay không? Sau một hồi chắt lọc thì mình cũng nhặt được một chủ đề khá hay. Mời bạn đánh mắt lên trên khoảng 2s. Đếm ngược 2...1... Đó chính là chủ để của mình 
trong bài viết này :v
# One-time permission
![](https://images.viblo.asia/76d47cfb-e9c1-46f7-9968-3b4afdd7c878.png)

Kể từ Android 11, khi ứng dụng của bạn yêu cầu quyền truy cập tới location, microphone, hoặc camera hộp thoại cho người dùng sẽ có thêm một lựa chọn là "Chỉ một lần". Nếu người dùng chọn lựa chọn này, ứng dụng của bạn sẽ được cấp quyền tạm thời hay còn gọi là one-time permission.

Vậy điều gì xác định thời gian hay giới hạn truy cập quyền đó?

- Đối với Activity, quyền có thể truy cập trong khi Activity đó đang hiển thị với người dùng. Và khi Activity đó không được hiển thị với người dùng nữa, bạn phải request lại quyền truy cập

- Nếu người dùng đưa app xuống background,  ứng dụng của bạn chỉ có thế tiếp tục sử dụng quyền  trong một khoảng thời gian ngắn

- Nếu ứng dụng khởi chạy 1 foreground service trong khi Activity đang hiển thị và người dùng sau đó di chuyển ứng dụng của bạn xuống background, thì ứng dụng của bạn có thể tiếp tục sử dụng quyền cho đến khi foreground service dừng lại.

- Người dùng có thể thu hồi one-time permission trong cài đặt, sau đó ứng dụng của bạn sẽ không thể truy cập dữ liệu được nữa ngay cả khi bạn đang chạy 1 foreground service.

Nếu người dùng đóng app và trong lần mở app tiếp theo, thì khi sử dụng các tính năng yêu cầu quyền, bạn sẽ phải yêu cầu quyền truy cập lại một lần nữa.

# Denying permissions

Hiện tại trong Android, khi được yêu cầu thì hộp thoại quyền (đồng ý hoặc từ chốt) sẽ được  hiển thị  cho người dùng khi chúng ta muốn truy cập phương tiện, vị trí, v.v. 

Các hộp thoại này bảo vệ người dùng khỏi quyền truy cập không mong muốn vào nội dung / hoạt động nhất định trên thiết bị của họ.

Ngoài ra, khi hơi bị a cay khi ứng dụng cứ đòi quyền mà mình không muốn cho, người dùng có thể chọn thêm option không bao giờ hỏi lại để khóa việc request quyền đó trong ứng dụng

Thế nhưng, Android 11 có một nước đi khá gắt là nếu người dùng từ chối hơn một lần trong một vòng đời cài đặt, thì điều này sẽ coi như người dùng đã chọn option không hỏi lại và khi đã xuôi xuôi để cho quyền truy cập user cần phải vào trong mục cài đặt để cấp lại quyền cho
ứng dụng của bạn.

Có một số trường hợp mà các quy tắc này có thể hoạt động khác nhau. 

Ví dụ: nếu người dùng nhấn nút quay lại để loại bỏ hộp thoại yêu cầu quyền thì hành động này sẽ không được tính là hành động Deny. 

Tuy nhiên, nếu requestPermission () được sử dụng để đưa người dùng đến màn hình cài đặt hệ thống, hành động này sẽ được coi là hành động Deny nếu nút quay lại được nhấn.

![](https://images.viblo.asia/0138e127-0035-4e07-b402-3b650232be23.png)

Những thay đổi này sẽ giúp giảm bớt bất kỳ sự lạm dụng nào đối với các yêu cầu cấp quyền,  đồng thời thúc đẩy các ứng dụng mô tả rõ ràng hơn về lý do tại sao các quyền được yêu cầu, cùng với việc yêu cầu chúng khi nào và chúng được yêu cầu để giúp giảm cơ hội được cấp 
quyền truy cập.

# Background location permission

Quyền thông tin vị trí, một quyền cực kỳ rất chi là quan trọng. Đối với các phiên bản android trở về trước, khi được user cho phép quyền này, ứng dụng luôn luôn có thể lấy thông tin này của người dùng ngay cả khi đang chạy ngầm. Tuy nhiên Android 11, các ứng dụng sẽ không còn 

khả năng yêu cầu quyền truy cập vào dữ liệu vị trí mọi lúc từ bên trong ứng dụng - tùy chọn **Allow all the time** đã bị xóa khỏi hộp thoại (tức chỉ có 2 option chỉ một lần hoặc deny) quyền trong ứng dụng. Nếu một ứng dụng muốn có quyền truy cập vị trí của người dùng mọi lúc 

khi ở chế độ background, thì quyền đó sẽ cần được cấp từ trong màn hình cài đặt hệ thống cho ứng dụng của bạn.

Và sau khi người dùng đã cấp quyền này cho ứng dụng, bạn phải thông báo cho người dùng chi tiết lý do vì sao chúng ta lại cần quyền vị trí khi ứng dụng ở background, cùng với 1 hành động kích hoạt quy trình cấp phép.

Sau khi người dùng thực hiện hành động kích hoạt cấp phép bên trên thì bạn mới có đủ quyền để truy cập location background (khá là loằng ngoằng nhẩy, quyền quan trọng mà :v)
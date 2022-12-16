# Lời nói đầu
Browser profile, một khái niệm cảm giác như rất gần gũi thân quen thế nhưng lại chẳng mấy ai biết tới. Nhiều người chỉ biết dùng cửa sổ ẩn danh để có thêm một trình duyệt mới nhưng lại không biết một cách đơn giản hơn không kém, sử dụng một profile khác. Với cách hoạt động tách biệt với cửa sổ hiện tại như chế độ ảnh danh, việc sử dụng profile khác còn mang lại những lợi ích khác mà sau đây bài viết sẽ đề cập đến.
# Browser profile là gì
Web browser lưu trữ những thông tin cá nhân của bạn như lịch sử truy cập, bookmark, các setting, extensions hoặc các thứ linh ta linh tinh khác vào một bộ tập tin, đó chính là profile.
# Lý do tại sao phải dùng browser profile
Tạo profile mới có thể giúp bạn không bị mất setting, bookmarks, lịch sử truy cập... của mình. Tạo từng profile với từng mục đích: làm việc, chơi game, … với những setting cá nhân hóa riêng biệt. Đây là lý do quan trọng nhất cho việc sử dụng nhiều browser profile.

Đối với hầu hết người dùng, họ có thể tạo các profile khác nhau cho các thành viên khác nhau trong gia đình. Điều này sẽ cho phép mỗi người có bộ bookmarks, setting, extensions của riêng họ. Bạn cũng không còn lo lắng về quản lý bookmarks hay cài đặt extension mà không ảnh hưởng đến người khác nữa.

Web developer có thể muốn có profile phụ để thử nghiệm các trang web, ứng dụng hoặc các dự án khác trên các kênh khác nhau. Ví dụ, bạn có thể muốn có một số extensions được cài đặt để phát triển Web, nhưng không phải để duyệt web, chat chít gì đó. Điều này giảm bớt một đống phiền toái khi bạn vừa mới search ra được cái gì đó hay ho và sau đó lỡ clean history để mà test lại code.
Đối với tester, bạn có thể muốn có nhiều phiên bản phát triển của Browser được cài đặt, mỗi phiên bản có cấu hình riêng của nó. Chỉ cần ít thời gian để thiết lập hồ sơ mới và sau khi hoàn tất, tất cả các phiên bản Browser của bạn sẽ cập nhật riêng và có thể chạy đồng thời. Hoặc đơn giản hơn, bạn không cần phải thực hiện login logout khi sử dụng nhiều user, mỗi profile sẽ lưu thông tin đăng nhập riêng biệt, hoặc là cần nhiều browser để test việc truy cập đồng thời. Nó cũng sẽ tiết kiệm vô số thời gian cho việc retest khi có bug xảy ra.

# Làm thế nào để làm việc với browser profile
Hiện nay thì hầu hết các browser đều hỗ trợ việc tạo thêm profile, tuy nhiên vẫn còn một số browser (như Safari) vẫn chưa có hỗ trợ chức năng này. Việc tạo mới và xóa profile rất đơn giản. Dưới đây mình xin giới thiệu cách tạo và xóa profile ở hai trình duyệt lớn nhất hiện nay là Mozilla Firefox và Google Chrome ở môi trường Windows.
## Với Mozilla Firefox
Để có thể tạo thêm profile ở Firefox thì đầu tiên bạn cần tắt hết cửa sổ firefox hiện hành
Sau đó mở Run và gõ `firefox.exe -p`

![](https://images.viblo.asia/74225da2-e99d-4c75-bf7c-c014c8b36578.png)

cửa sổ Trình Quản lí Hồ sơ 
![](https://images.viblo.asia/15befd0f-281d-4494-a625-bc332e61e926.png)

Bấm Create Profile để tạo mới một profile
![](https://images.viblo.asia/486b04f0-dccc-4171-877d-227f5fddbf58.png)

Thực hiện nhập tên và chọn folder lưu profile, sau đó nhấn Finish
![](https://images.viblo.asia/8fa69bac-bea1-4950-8457-d42056c68ccd.png)

Xóa profile, Chọn profile cần xóa và bấm Delete profile
![](https://images.viblo.asia/eac4dad9-aa6e-418f-bcdc-bc754c5aeab8.png)

Don't Delete Files sẽ gỡ bỏ hồ sơ ra khỏi Trình Quản lí Hồ sơ nhưng vẫn giữ lại tập tin dữ liệu của hồ sơ trên máy tính của bạn, do đó thông tin của bạn sẽ không bị mất.
Delete Files sẽ xóa hồ sơ và tập tin của nó, bao gồm lịch sử, bookmarks, mật khẩu, vv.

## Với Google Chrome
Mở Chrome, ở góc trên bên trái, nhấp vào biểu tượng profile như bên dưới.
![](https://images.viblo.asia/f4deb276-2fe9-4b3f-90a6-1c5a6234c843.png)

Chọn Quản lý mọi người (Manage people)
![](https://images.viblo.asia/41e73a11-baae-4d19-9156-86db317ca654.png)

Giao diện quản lý Chrome profile
![](https://images.viblo.asia/ac32c0fb-2cd9-4005-86c7-4523e000cadf.png)

Bấm thêm người để tạo mới một profile. 
Ở cửa sổ Thêm người, bạn nhập Username, chọn icon và bấm Thêm
![](https://images.viblo.asia/6899a9e1-1e92-45bc-a91b-a34e7ceb900c.png)

Xóa profile: Chọn xóa người này ở menu phía góc trên bên trái mục user
![](https://images.viblo.asia/03eb5a6f-37e0-409e-a9f7-0577903b2a90.png)
![](https://images.viblo.asia/20510375-cea7-47e7-bac7-16df289c4f95.png)

# Lời kết
Hy vọng qua bài viết giới thiệu về Browser profile này sẽ giúp ích cho công việc code, test cũng như những trải nghiệm lướt web của bạn được tốt hơn. Mọi đóng góp thêm cho bài viết hay mẹo hay hơn các bạn hãy comment bên dưới để mình tham khảo thêm nhé :)
# Nguồn tham khảo:
* https://support.google.com/chrome/answer/2364824
* https://support.mozilla.org/vi/kb/Qu%E1%BA%A3n%20l%C3%AD%20h%E1%BB%93%20s%C6%A1
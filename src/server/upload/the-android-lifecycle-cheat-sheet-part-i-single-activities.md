Android được thiết kế để trao quyền cho người dùng và cho phép họ sử dụng các ứng dụng một cách trực quan. Ví dụ: người dùng ứng dụng có thể xoay màn hình, trả lời thông báo hoặc chuyển sang tác vụ khác và họ có thể tiếp tục sử dụng ứng dụng một cách liền mạch sau sự kiện đó.

Để cung cấp trải nghiệm người dùng này, bạn nên biết cách quản lý vòng đời component. Một component có thể là một Activity, một Fragment, một Service, chính Ứng dụng và thậm chí là quá trình cơ bản. Component này có vòng đời, trong đó nó chuyển qua các trạng thái. Bất cứ khi nào quá trình chuyển đổi xảy ra, hệ thống sẽ thông báo cho bạn thông qua phương thức gọi lại vòng đời.

Để giúp chúng tôi giải thích cách vòng đời Activity, chúng tôi đã xác định một loạt các kịch bản được nhóm theo các thành phần có mặt:

###
##### Part I: Activities — single activity lifecycle (this post)
####
##### Part II: Multiple activities — navigation and back stack
####
##### Part III: Fragments — activity and fragment lifecycle
####
##### Part IV: ViewModels, Translucent Activities and Launch Modes

##
Các sơ đồ cũng có sẵn dưới dạng một [bảng cheat ở định dạng PDF](https://github.com/JoseAlcerreca/android-lifecycles) để tham khảo nhanh.

###
>Lưu ý: các sơ đồ này áp dụng cho hành vi P / Jetpack 1.0 của Android.

###

Các kịch bản sau đây thể hiện hành vi mặc định của các component, trừ khi có ghi chú khác.

*Nếu bạn tìm thấy lỗi hoặc bạn nghĩ thiếu một cái gì đó quan trọng, hãy báo cáo nó trong các bình luận.*


#### Part I: Activities

**Single Activity — Scenario 1: App is finished and restarted**

Kích hoạt bởi:
* Người dùng nhấn nút Quay lại, hoặc
* Phương thức **Activity.finish ()** được gọi

Kịch bản đơn giản nhất cho thấy những gì xảy ra khi một ứng dụng Single Activity được khởi động, kết thúc và khởi động lại bởi người dùng:

![](https://miro.medium.com/max/766/1*U_j3OP74jrPFoNvO2i7XzQ.png)

*Managing state*
* **onSaveInstanceState** không được gọi (vì hoạt động đã kết thúc, bạn không cần phải lưu trạng thái)
* **onCreate**  không có Bundle khi ứng dụng được mở lại, vì hoạt động đã kết thúc và trạng thái không cần phải được khôi phục.
##
**Single Activity — Scenario 2: User navigates away**

Kích hoạt bởi:
* Người dùng nhấn nút **Home**
* Người dùng chuyển sang một ứng dụng khác (thông qua menu Tổng quan, từ thông báo, chấp nhận cuộc gọi, v.v.)

![](https://miro.medium.com/max/882/1*3qxYnT2vRwrQVORi9mfUhw.png)

Trong kịch bản này, hệ thống sẽ dừng hoạt động, nhưng đã thắng ngay lập tức.

*Managing state*
Khi hoạt động của bạn chuyển sang trạng thái Dừng, hệ thống sẽ sử dụng onSaveInstanceState để lưu trạng thái ứng dụng trong trường hợp hệ thống giết chết quá trình ứng dụng sau này (xem bên dưới).

Giả sử quá trình không bị giết, cá thể hoạt động được lưu giữ trong bộ nhớ, giữ lại tất cả trạng thái. Khi hoạt động trở lại nền trước, hoạt động nhớ lại thông tin này. Bạn không cần phải khởi tạo lại các thành phần đã được tạo trước đó.


##
**Single Activity — Scenario 3: Configuration changes**

Kích hoạt bởi:
* Thay đổi cấu hình, giống như xoay
*  Người dùng thay đổi kích thước cửa sổ ở chế độ đa cửa sổ

![](https://miro.medium.com/max/964/1*DCo7awxJ3KhnW88h365vhA.png)

Thay đổi cấu hình như xoay hoặc thay đổi kích thước cửa sổ sẽ cho phép người dùng tiếp tục chính xác nơi họ rời đi.
*Managing state*
* Các hoạt động bị phá hủy hoàn toàn, nhưng trạng thái được lưu và khôi phục cho trường hợp mới.
* Bundle trong onCreate và onRestoreInstanceState là như nhau.
##
**Single Activity — Scenario 4: App is paused by the system**

Kích hoạt bởi:
* Bật chế độ Nhiều cửa sổ (API 24+) và mất tiêu điểm
* Một ứng dụng khác bao gồm một phần ứng dụng đang chạy (hộp thoại mua, hộp thoại cho phép thời gian chạy, hộp thoại đăng nhập của bên thứ ba)
* Một trình chọn ý định xuất hiện, chẳng hạn như hộp thoại chia sẻ

![](https://miro.medium.com/max/1046/1*j3blnCW082yMbQe5fkjMMg.png)

Kịch bản này không áp dụng cho:

* Hộp thoại trong cùng một ứng dụng. Hiển thị AlertDialog hoặc DialogFragment sẽ không tạm dừng hoạt động cơ bản.
* Thông báo. Người dùng nhận được thông báo mới hoặc kéo xuống thanh thông báo sẽ thắng tạm dừng hoạt động bên dưới.

##
[Tham khảo](https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-i-single-activities-e49fd3d202ab)
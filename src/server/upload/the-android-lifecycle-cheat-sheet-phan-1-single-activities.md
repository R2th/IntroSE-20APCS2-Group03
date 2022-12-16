Android được thiết kế để trao quyền cho người dùng và cho phép họ sử dụng ứng dụng theo cách trực quan. Ví dụ, người dùng của ứng dụng có thể xoay màn hình, trả lời notification hoặc chuyển sáng tác vụ khác và họ có thể tiếp tục sử dụng ứng dụng liền mạch sau một sự kiện như vậy.

Để cung cấp điều này tới trải nghiệm người dùng, bạn nên biết cách để quản lý vòng đời component. Một component có thể là 1 Activity, 1 Fragment, 1 Service, bản thân ứng dụng và thậm chí là cả quá trình cơ bản. Component có một vòng đời, trong đó nó chuyển tiếp qua các trạng thái. Bất cứ khi nào 1 transition xảy ra, hệ thống thông báo cho bạn thông qua 1 hàm callback của vòng đời.

Để giúp giải thích cách vòng đời làm việc, tôi đã định nghĩa một series các bài viết được nhóm theo các component hiện có:

**Phần 1: Activities** - Single Activity Lifecycler (bài này)

[**Phần 2: Multiple Activities** - Navigation and back stack](https://viblo.asia/p/the-android-lifecycle-cheat-sheet-phan-2-multiple-activities-4dbZN7jmlYM)

[**Phần 3: Fragments** - Activity and fragment lifecycle ](https://viblo.asia/p/the-android-lifecycle-cheat-sheet-phan-3-fragments-Qbq5QLX4lD8)


## Phần 1: Activities

### Single Activity - Kịch bản 1: Ứng dụng bị kết thúc và khởi động lại
Kích hoạt bởi:
* Người dùng nhấn vào button back hoặc
* Hàm `Activity.finish()` được gọi

Kịch bản đơn giản nhất cho thấy điều gì sẽ xảy ra khi một ứng dụng single-activity được started, finished và restarted bởi người dùng
![](https://images.viblo.asia/24d00877-82f9-4b96-92c8-c2ff7d324201.png)

**Quản lý trạng thái**

* `onSaveInstanceState` không được gọi (kể từ khi activity kết thúc, bạn không cần phải lưu trạng thái)
* `onCreate` không có Bundle khi ứng dụng được mở lại, bởi vì activity đã kết thức và trạng thái không cần phải restored.

### Single Activity - Kịch bản 2: Người dùng điều hướng
Kích hoạt bởi:
* Người dùng nhấn Home button
* Người dùng chuyển tới ứng dụng khác (thông qua Overview menu, từ notification, chấp nhận 1 cuộc gọi, vv...)

![](https://images.viblo.asia/c4702748-7c83-42dc-829a-a78988a91e09.png)



Trong kịch bản này, hệ thống sẽ stop activity, những sẽ không finish nó ngay lập tức

**Quản lý trạng thái**

Khi activity của bạn vào trạng thái stoped, hệ thống sử dụng onSavedInStanceState để lưu trạng thái của app trong trường hợp hệ thống kill process của app sau này

Giả định process không bị killed, instance activity được giữ trong bộ nhớ, giữ lại tất cả trạng thái. Khi activity trở lại foreground, activity sẽ gọi lại thông tin này. Bạn không cần phải khởi tạo lại các thành phần đã được tạo trước đó.

### Single Activity - Kịch bản 3: Cấu hình thay đổi
Kích hoạt bởi:

* Cấu hình thay đổi, như rotation
* Người dùng thay đổi kích thước window trong chế độ mutil-window

![](https://images.viblo.asia/3fd0da52-38cf-43dd-8c17-e7aba4f14604.png)

**Quản lý trạng thái**

Cấu hình thay đổi như rotation hoặc thay đổi kích thước window sẽ cho phép người dúng tiếp tục chính xác nơi họ đã dừng lại

* Activity bị hoàn toàn bị destroyed, nhưng trạng thái được lưu lại và phục hồi cho instance mới
* Bundle trong `onCreate` và `onRestoreInstanceState` là giống nhau

### Single Activity - Kịch bản 4: Ứng dụng bị paused bởi hệ thống
Kích hoạt bởi:

* Bật chế độ Multi-window (API 24+) và mất focus
* Một ứng dụng khác một phần bao gồm ứng dụng đang chạy (một dialog purchase, 1 dialog runtime permission, 1 dialog login của thư viện...)
* Một intent xuất hiện, chẳng hạn như share dialog

![](https://images.viblo.asia/bb994c02-2d0b-4ce3-9806-c9a13ff63491.png)

Kịch bản này không áp dụng cho:

* Dialog trong cùng 1 ứng dụng. Hiển thị 1 `AlertDialog` or một `DialogFragment` sẽ không pause activity
* Notification. Người dùng nhận 1 notification mới hoặc kéo thanh notification bar sẽ không tạm từng activity

Nguồn: https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-i-single-activities-e49fd3d202ab
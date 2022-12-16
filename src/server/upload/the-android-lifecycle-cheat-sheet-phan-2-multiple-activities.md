Trong loạt bài:

[**Phần 1: Activities** - Single activity lifecycle](https://viblo.asia/p/the-android-lifecycle-cheat-sheet-phan-1-single-activities-yMnKMJVjZ7P)

**Phần 2: Multiple activities** - Navigation và backstack (Bài này)

[**Phần 3: Fragments** - Vòng đời Activity và Fragment ](https://viblo.asia/p/the-android-lifecycle-cheat-sheet-phan-3-fragments-Qbq5QLX4lD8)

Lưu ý rằng, khi hiển thị vòng đời cho multiple components (acitivities, fragment, vv..) trong 1 sơ đồ, các sự kiện xuất hiện bên cạnh nhau song song. Trọng tâm thực hiện có thể chuyển từ một nhóm sự kiện song song sang một sự kiến khác bất kỳ lúc nào, do đó, thứ tự các cuộc gọi giữa các nhóm sự kiện song song không được đảm bảo. Tuy nhiên, thứ tự bên trong một nhóm được đảm bảo

Các trường hợp sau đây không áp dụng cho các activities và task có chế độ khởi chạy tùy chỉnh hoặc mối quan hệ công việc được xác định. Để biết thêm thông tin, hãy xem [Task và BackStack](https://developer.android.com/guide/components/activities/tasks-and-back-stack) trên website Android Developer.

### Backstack - Kịch bản 1: Điều hướng giữa các Activities

![](https://images.viblo.asia/acbfa903-ea46-4ce2-baa3-ef40ce17e0e3.png)

Trong kịch bản này, khi một Activity mới được started, Activity 1 bị [STOPPED](https://developer.android.com/guide/components/activities/activity-lifecycle#onstop) (Nhưng không phải destroyed), tương tự như người dùng điều hướng đi (như là nhấn nút Home)

Khi nhấn nút Back vật lý trên máy, Activity 2 bị destroyed và finished.

**Quản lý trạng thái**

Lưu ý rằng [onSaveInstanceState](https://developer.android.com/reference/android/app/Activity#onSaveInstanceState%28android.os.Bundle%29) được gọi, **nhưng [onRestoreInstanceState](https://developer.android.com/reference/android/app/Activity#onRestoreInstanceState%28android.os.Bundle,%20android.os.PersistableBundle%29)** thì không. Nếu có 1 config thay đổi khi Activity 2 đang được hiển thị, Activity 1 sẽ bị destroyed và chỉ được tạo lại khi nó được focus lại. Đó là lý do tại sao lưu 1 instance của trạng thái là quan trọng

Nếu hệ thống kills process của app để tiết kiệm tài nguyên, đây là một tình huống khác trong đó trạng thái cần được khôi phục.

### BackStack - Kịch bản 2: Các Activities trong BackStack với các thay đổi cấu hình

![](https://images.viblo.asia/6f2dcd6e-a99c-4500-bc0c-90749cb1b9e9.png)

**Quản lý trạng thái**

Lưu trạng thái không chỉ quan trọng đối với Activity ở foreground. Tất cả activities trong stack cần phải khôi phục trạng thái sau khi 1 config thay đổi để tạo lại UI của nó.

Ngoài ra, hệ thống có thể kill process của app bất cứ lúc nào, do đó bạn nên chuẩn bị khôi phục trạng thái trong mọi tình huống.

### BackStack - Kịch bản 3: Process của App bị killed

Khi hệ điều hành Android cần tài nguyên, nó sẽ giết chết ứng dụng trong background.

![](https://images.viblo.asia/d651da64-7593-45bc-a205-9a9d0746e0c2.png)https://images.viblo.asia/d651da64-7593-45bc-a205-9a9d0746e0c2.png

**Quản lý trạng thái**

Lưu ý rằng trạng thái của backstack được lưu nhưng, để sử dụng hiệu quả tài nguyên, các activities chỉ được khôi phục khi chúng được tạo lại.

### Đọc thêm

[Who lives and who dies? Process priorities on Android](https://medium.com/androiddevelopers/who-lives-and-who-dies-process-priorities-on-android-cb151f39044f)

### Bài tiếp theo

The Android Lifecucle cheat sheet - Phần 3: Fragments
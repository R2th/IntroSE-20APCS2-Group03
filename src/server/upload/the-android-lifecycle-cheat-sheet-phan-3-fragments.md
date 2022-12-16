Trong loạt bài:

[**Phần 1: Activities** - Single activity lifecycle](https://viblo.asia/p/the-android-lifecycle-cheat-sheet-phan-1-single-activities-yMnKMJVjZ7P)

[**Phần 2: Multiple Activities** - Navigation and Backstack](https://viblo.asia/p/the-android-lifecycle-cheat-sheet-phan-2-multiple-activities-4dbZN7jmlYM)

**Phần 3: Fragments** - Vòng đời Activity và Fragment (Bài này)

Trong phần này, tôi sẽ đề cập đến hành vi của một Fragment được gắn với một Activity. Đừng nhầm lẫn kịch bản này với một Fragment được thêm vào backstack (xem [Tasks và Backstack](https://medium.com/androiddevelopers/tasks-and-the-back-stack-dbb7c3b0f6d4) để biết thêm thông tin về các fragment transactions và backstack).

### Kịch bản 1: Activity với Fragment bắt đầu và kết thúc

![](https://images.viblo.asia/ddd1d013-043e-4f8c-9787-8115ce8bb632.png)

Lưu ý đảm bảo rằng onCreate của Activity được thực thi trước của Fragment. Tuy nhiên, callback hiển thị cạnh nhau - chẳng hạn như onStart và onResume dược thực hiện song song và do đó có thể được gọi theo thứ tự. Ví dụ hệ thống có thể thực thi hàm onStart của Activity trước hàm onStart của Fragment, nhưng sau đó thực thi hàm onResume của Fragment trước hàm onResume của Activity.

### Kịch bản 2: Activity với Fragment bị rotated

![](https://images.viblo.asia/a39696a5-a913-4243-993b-f8ea686b4269.png)


**Quản lý trạng thái**

Trạng thái Fragment được lưu và phục hồi theo kiểu rất giống với trạng thái của Activity. `Sự khác biệt là không có onRestoreInstanceState trong Fragment, nhưng Bundle thì có trong onCreate, onCreateView và onActivityCreated của Fragment`

Fragments có thể được giữ lại, có nghĩa là cùng 1 instance được sử dụng khi cấu hình thay đổi. Như kịch bản tiếp theo cho thấy, điều này thay đổi sơ đồ một chút.

### Fragments - Kịch bản 3: Acitivity với Fragment được giữ lại bị rotated

![](https://images.viblo.asia/ca861750-b0b4-4fb5-b89c-7c1961e7e602.png)

Fragment không bị destroyed cũng không được tạo ra sau khi rotated vì cùng một instance fragment được sử dụng sau khi Activity được tạo lại. Trạng thái Bundle vẫn có sẵn trong onActivityCreated.

Không nên sử dụng các Fragment được giữ lại trừ khi chúng được sử dụng để lưu trữ giữ liệu qua các thay đổi cấu hình (Trong một Fragment không có UI). Đây là lớp [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) từ thư viện Architecture Components sử dụng nội bộ, nhưng với một API đơn giảm hơn


Nguồn: https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-iii-fragments-afc87d4f37fd
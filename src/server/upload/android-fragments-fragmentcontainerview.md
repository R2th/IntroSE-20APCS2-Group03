# I. Dẫn nhập
* **FragmentContainerView** (FCV) hiện tại luôn được khuyến nghị sử dụng để chứa **fragment** thay vì sử dụng **FrameLayout** như trước đây. Bên cạnh việc xử lý quan hệ của các **fragment**, FCV còn bổ sung thêm nhiều tính năng phối hợp với trạng thái của **Fragment**. Trong bài viết này, chúng ta sẽ tìm hiểu FCV là gì? cách tương tác với FCV và một số vấn đề về **animation** của Fragment đã được khắc phục khi dùng với FCV.
# II. Nội dung chính
## 1. FCV là gì?
* FCV là một dạng **custom-view** được mở rộng từ **FrameLayout**, nhưng khác với các **ViewGroups** khác, FCV chỉ chấp nhân các **fragment view**. FCV không những hỗ trợ các thuộc tính của **<fragment>** mà còn cung cấp thêm nhiều **FragmentTransaction** một cách linh hoạt.
## 2. Đưa view vào FCV
* `FragmentContainerView.addView(view)` chỉ nên gọi với một view được gắn với **Fragment**, view này nhận được bởi `Fragment.onCreateView(LayoutInflater, ViewGroup, boolean)`.
* Khi view của **Fragment** được khởi tạo, một **tag** được gán cho nó để liên kết với instance của **Fragment** bằng cách gọi `View.setTag(R.id.fragment_container_view_tag, fragment)`. Khi `FragmentContainerView.addView(View)` được gọi, tag của view sẽ được lấy khi gọi `View.getTag(R.id.fragment_container_view_tag)`.
* **IllegalStateException** sẽ xảy ra khi chúng ta thêm các loại view khác cho FCV.
## 3. Đưa fragment vào FCV
* Bởi vì FCV là một subclass của **FrameLayout** nên **fragment** có thể được thêm vào giống như **FrameLayout**.

```
<androidx.fragment.app.FragmentContainerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/fragmentContainerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
```
supportFragmentManager.beginTransaction()
    .add(R.id.fragmentContainerView, myFragment)
    .commit()
```

* Một cách khác để đưa **fragment** vào FCV là sử dụng thuộc tính `android:name` trong file XML
```
<androidx.fragment.app.FragmentContainerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/fragmentContainerView"
    android:name="com.example.MyFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
* Quá trình khởi tạo này diễn ra bên trong MyFragment bằng các sử dụng **FragmentStore** (điều này rất hữu ích nếu hàm khởi tạo của MyFragment cần các đối số) và sau đó thực hiện một **FragmentTransaction** để thêm nó vào container.
* FCV cho phép linh hoạt thay thế các **fragment** (giống như khi chúng ta sử dụng **FrameLayout**) và điều này hoàn toàn khác với **<fragment>** tag – không cho phép thay thế **fragment** đã định nghĩa cố định trong XML thông qua **FragmentTransaction**.
* Một cách cuối cùng để thêm **fragment** vào FCV là sử dụng thuộc tính `class` trong XML
```
<androidx.fragment.app.FragmentContainerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    class="com.example.MyFragment"
    android:id="@+id/fragmentContainerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
## 4. Các thuộc tính trong XML của FCV
* FCV hỗ trợ các thuộc tính giống như **<fragment>** tag.
* **id**: thuộc tính bắt buộc nếu FCV khởi tạo một **static fragment** trong trường hợp thuộc tính `android:name` hoặc `class` được cung cấp. **IllegalStateException** sẽ được xuất ra nếu không tìm thấy **id**. Tuy nhiên, nếu thuộc tính `android:name` hoặc `class` không được khai báo thì **id** sẽ trở thành tùy chọn.
* **tag**: thuộc tính tùy chọn để liên kết tag với **Fragment**. **Fragment** có thể lấy ra bằng các gọi `FragmentManager.findFragmentByTag(tag)`.
```
<androidx.fragment.app.FragmentContainerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:tag="myFragment" />
```
* **animateLayoutChanges**: Khi được set là true thì **UnsupportedOperationException** sẽ được thông báo đối với Android API 18 trở lên vì layout animation phải bị vô hiệu hóa với FCV trên các phiên bản API này vì chúng có thể xung đột với các **animation** và **transition** được đặt trong các API của **Fragment**. Tuy nhiên, với API 17 trở xuống, `ViewGroup.setLayoutTransition(LayoutTransition)` phải được gọi để các **Fragment transition** hoạt động chính xác.
## 5. FCV và các animation chuyển đổi.
* Trước đây, việc cố gắng tùy chỉnh **enter** và **exit animation** của các **Fragment** đã gây ra sự cố trong đó **Fragment enter** sẽ nằm bên dưới **Fragment exit** cho đến khi nó hoàn toàn thoát khỏi màn hình. Điều này dẫn đến những hiệu ứng khó chịu khi chuyển đổi giữa các **Fragment**.
 * FCV khắc phục vấn đề này bằng cách đảm bảo rằng các **Fragment** có **exit animation** sẽ được vẽ trước, điều này dẫn đến các **Fragment** có **enter animation** sẽ được vẽ lên trên cùng.
* Animation chuyển đổi vẫn có thể được thiết lập bằng cách gọi `FragmentTransaction.setCustomAnimation()`.
```
supportFragmentManager.beginTransaction()
    .setCustomAnimations(R.anim.slide_in_from_right, R.anim.slide_out_to_left,
        R.anim.slide_in_from_left, R.anim.slide_out_to_right)
    .replace(R.id.fragmentContainerView, myFragment)
    .commit()
```
# III. Kết
* FCV hiện là một **container** mạnh mẽ để lưu trữ **Fragment**, nó có thể thay thế **FrameLayout** đồng thời hỗ trợ các thuộc tính tương tự như **<fragment>** tag. FCV cũng cung cấp một hành vi nhất quán đối với các phiên bản Android API, đây là điều mà nhiều phiên bản Android API gần đây đang nhắm tới.
 * Để tìm hiểu thêm về **Fragment**, chúng ta có thể tham khảo các bài viết:
[Fragments: Past, Present and Future]( https://www.youtube.com/watch?v=RS1IACnZLy4),
[Android Fragments: FragmentFactory.](https://proandroiddev.com/android-fragments-fragmentfactory-ceec3cf7c959),
[Android Fragments: Fragment Result](https://proandroiddev.com/android-fragments-fragment-result-805a6b2522ea),
[Android Fragments: FragmentContainerView](https://proandroiddev.com/android-fragments-fragmentcontainerview-292f393f9ccf)
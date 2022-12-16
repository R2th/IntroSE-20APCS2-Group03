## Mở đầu
Chào các bạn, nhiều người làm ứng dụng chạy ngon lành, chức năng đầy đủ, nhưng lại khó khăn để làm sao cho ứng dụng có giao diện đẹp, dễ nhìn, người dùng thao tác tốt (UI & UX tốt) thì lúc đấy lại thấy là UI thật khó :)
Qua bài viết này mình lại giới thiệu một cách cơ bản về phần 2 về triết lý Material Design của Google.
## 5. Components and patterns
Các thành phần Button và nhiều View con sử dụng trong Android theo quy tắc Material Design. Material Design bao gồm các components (thành phần) và patterns (mẫu) để xây dựng nên những màn hình mà người dùng có thể sử dụng các tính năng dễ dàng cho dù họ chưa quen với màn hình hay ứng dụng.

Sử dụng các Material Design Components để hướng dẫn thông số kỹ thuật và hành vi của các button, card, ... và nhiều thành phần khác. 

Sử dụng Material Design Pattern để hướng dẫn làm thế nào để định dạng ngày giờ, cử chỉ, navigation drawer, và nhiều khía cạnh khác của giao diện ứng dụng.

Dưới đây là Design Support Library và một vài components với pattern có sẵn. Về document đầy đủ bạn có thể tham khảo ở đây https://material.io/design/

### Design Support Library
Gói Design cung cấp các API để hỗ trợ thêm các components và pattern Material Design vào ứng dụng của bạn. Để sử dụng thư viện bạn có thể thể thêm dòng sau vào file build.gradle (Module:app)
```
    compile 'com.android.support:design:26.1.0'
```
Để luôn có phiên bản mới nhất bạn có thể xem ở đây
https://developer.android.com/topic/libraries/support-library/packages#design
### Floating action buttons (FABs)
Chúng ta sử dụng floating action buttons (FAB) cho các hành động mà muốn người dùng thực hiện. Một FAB là một icon tròn nổi phía trên UI. Khi focus thay đổi thì nó thay đổi màu sắc một chút và được nâng lên khi được chọn
![](https://images.viblo.asia/118a4f5c-08e4-44e5-bcb7-744fe07faa2c.png)

Hình trên là một FAB bình thường.

Để sử dụng thì chúng ta có thể khai báo một đoạn mã tương ứng dưới đây vào Activity hay Fragment mà mình muốn:
```Kotlin
android.support.design.widget.FloatingActionButton
    android:id="@+id/addNewItemFAB"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:src="@drawable/ic_plus_sign"
    app:fabSize="normal"
    app:elevation="10%" />
```

Thuộc tính fabSize đặt kích thước của FAB. Có thể là "normal" với kích thước 56dp, "mini" với kích thước 40dp, hoặc "auto" thay đổi theo kích thước cửa sổ.
elevation là khoảng cách giữa bề mặt và độ sâu của bóng.
### Navigation drawers
Một Navigation drawers là một bảng điều khiển trượt từ bên trái sang.
![](https://images.viblo.asia/fdd1692a-916c-43fc-a0a0-2f1cc2525762.png)

Trong XML, ta có thể dùng DrawerLayout là gốc của layout. Bên trong nó, một cho bố trí chính của layout là drawer và hai là nội dung của ngăn kéo.
```Kotlin
    <android.support.v4.widget.DrawerLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <!-- The main content view -->
    <FrameLayout
        android:id="@+id/content_frame"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
    <!-- The navigation drawer -->
    <ListView android:id="@+id/left_drawer"
        android:layout_width="240dp"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:choiceMode="singleChoice"
        android:divider="@android:color/transparent"
        android:dividerHeight="0dp"
        android:background="#111"/>
</android.support.v4.widget.DrawerLayout>
```

### Snackbars
Một snackbar cung cấp thông tin phản hồi ngắn gọn về một hoạt động thông qua một tin nhắn trong một thanh ngang trên màn hình.
 ![](https://images.viblo.asia/862312d0-d95f-4966-a827-a3075ded0284.png)

Snackbar tự động biến mất sau một khoảng thời gian, hoặc khi người dùng tương tác ở nơi khác trên màn hình. Bạn có thể liên kết Snackbar với bất kỳ một view nào, nhưng là thường là với Coordinator  Layout, khi đó có thể thêm các tính năng sau cũng:
- Người dùng có thể loại bỏ snack bằng cách vuốt nó đi.
- UI di chuyển một số thành phần trong màn hình khi snack xuất hiện
Để tạo ra một đối tượng Snackbar, hãy sử dụng phương thức Snackbar.make()
```
    Snackbar.make(findViewById(R.id.myCoordinatorLayout),
               R.string.email_sent,Snackbar.LENGTH_SHORT).show;
```
### Tabs
Thường sử dụng để người dùng có thể dùng tay vuốt sang trái hoặc sang phải để chuyển đổi giữa các màn hình.
![](https://images.viblo.asia/d25e0356-bc67-4d17-86de-f76f01095d33.png)
Để biết cụ thể hơn bạn có thể sử dụng TabLayout kết hợp với Viewpager
### Cards
![](https://images.viblo.asia/3205dbe3-bbdf-46bd-ac04-7028340c6877.png)

Một card thường đóng vai trò là là điểm vào của detail infomation. Mỗi card bao gồm một chủ đề. Một card có thể chứa photo, text và một link. Nó có thể hiện thị nội dung chứa các yếu tố có kích thước khác nhau.

Một card collection là là một layout trên cùng một mặt phẳng. 
### List
List là một cột liên tục duy nhất của các hàng có chiều rộng bằng nhau. Mỗi hàng là một nơi chứa nội dung của một item.
![](https://images.viblo.asia/45c0199b-ab82-4686-bb10-c23dbb373822.png)
Trong Android bạn có thể sử dụng RecyclerView.
## 6. Motion
Chuyển động trong thế giới của Material Design được sử dụng để mô tả các mối quan hệ không gian, chức năng và ý định với vẻ đẹp và tính mượt mà. Chuyển động cho thấy cách một ứng dụng được tổ chức và những gì nó có thể làm.

Chuyển động trong Material Design phải là:
- **Responsive**: Nhanh chóng chính xác phản hồi đầu vào của người dùng, nơi người dùng kích hoạt nó.
- **Natural**: Chuyển động thường được sử dụng giống với trong thế giới tự nhiên. Ví dụ trong thế giới thực, chuyển động của của vật có trọng lực theo một chiều nào đó thường là đường cong, thay vì đường thẳng.
![](https://images.viblo.asia/9676090b-4d30-41d4-b9a0-2f22d562f75b.gif)
- **Aware**: Material nhận thức được môi trường xung quanh, bao gồm cả người dùng và các material khác xung quanh nó. Các đối tượng có thể thu hút các đối tượng khác trong UI và chúng phản hồi phù hợp với mục đích của người dùng.
![](https://images.viblo.asia/b275d483-efb0-45bc-ab50-2aadf932a667.gif)
- Intentional: Chuyển động thao tác của người dùng tập trung đến đúng nơi, đúng thời điểm. Chuyển động có thể truyền đạt các tín hiệu khác nhau, có thể dự liệu một chuyển động không có sẵn.
![](https://images.viblo.asia/cbe15a5a-ebc7-4464-9148-4182fb3a1751.gif)
Để áp dụng các nguyên tắc này vào trong Android, hãy sử dụng animations và transitions.
### Animation.
Có 3 cách để chúng ta có thể tạo animation trong ứng dụng của mình:
- **Property animation**: thay đổi thuộc tính của đối tượng trong một thời gian nhất định. Property animation đã được giới thiệu từ Android 3.0 (API level 11). Nó linh hoạt hơn View Animation và có nhiều tính năng hơn.
- **View animation**: tính toán animation bằng cách tính toán điểm bắt đầu, điểm cuối, xoay và các khía cạnh khác. View animation cũ hơn Property animation, và thường được sử dụng cho các thành phần view. Nó tương đối dễ cài đặt và cung cấp khả năng cho nhiều trường hợp sử dụng. 
- **Drawable animation**: Cho phép chúng ta load một loạt drawable resource để tạo thành một animation. Drawable animation là hữu ích nếu bạn muốn làm động những thứ biểu diễn bằng tài nguyên có sẵn, ví dụ như quá trình thay đổi của bitmap.

Animation cung cấp một số animation mặc định cho touch feedback và activity transitions.
### Touch feedback
cung cấp một xác nhận trực quan ngay tại điểm tiếp xúc khi người dùng tương tác với thành phần UI. Touch feedback default sử dụng RippleDrawable
![](https://images.viblo.asia/56623e4e-29e2-4324-a4ff-31f834a166d2.gif)
### Circular reveal
Một reveal animation hiển thị hoặc ẩn một nhóm các thành phần UI bằng cách tạo hiệu ứng ranh giới. Trong Circular reveal thì là sử dụng một hình tròn để cắt.  Để làm điều này ta có thể sử dụng phương thức ViewanimationUtils.createCircularReveal()

Ví dụ đây là thể hiện một previously invisible view bằng circular reveal:
```Kotlin
// Previously invisible view
View myView = findViewById(R.id.my_view);

// Get the center for the clipping circle.
int cx = myView.getWidth() / 2;
int cy = myView.getHeight() / 2;

// Get the final radius for the clipping circle.
float finalRadius = (float) Math.hypot(cx, cy);

// Create the animator for this view (the start radius is zero).
Animator anim = ViewAnimationUtils
               .createCircularReveal(myView, cx, cy, 0, finalRadius);

// Make the view visible and start the animation.
myView.setVisibility(View.VISIBLE);
anim.start();
```
Và đây là cách ẩn nó đi
```Kotlin
// Previously visible view
final View myView = findViewById(R.id.my_view);

// Get the center for the clipping circle.
int cx = myView.getWidth() / 2;
int cy = myView.getHeight() / 2;

// Get the initial radius for the clipping circle.
float initialRadius = (float) Math.hypot(cx, cy);

// Create the animation (the final radius is zero.
Animator anim = ViewAnimationUtils.
              createCircularReveal(myView, cx, cy, initialRadius, 0);

// Make the view invisible when the animation is done.
anim.addListener(new AnimatorListenerAdapter() {
    @Override
    public void onAnimationEnd(Animator animation) {
        super.onAnimationEnd(animation);
        myView.setVisibility(View.INVISIBLE);
    }
});

// Start the animation.
anim.start();
```
### Activity transitions
Activity transitions là những animation cung cấp các kết nối trực quan giữa các trạng thái khác nhau trong giao diện người dùng. Bạn có thể custom animation cho enter và exit transitions, share các thành phần giữu các activities.
![](https://images.viblo.asia/3a07c3b7-2bb4-497a-9e3a-017e835f0afb.gif)
## Tổng kết
Qua 2 phần thì mình đã giới thiệu cơ bản đầy đủ về những nguyên tắc cũng như các thành phần hỗ trợ của triết lý Material Design trong Android. Mong bài viết mang lại hiệu quả cho một số bạn mới học Android. Cám ơn đã theo dõi.
Để thực hiện bài viết này mình đã tham khảo của Android Google!
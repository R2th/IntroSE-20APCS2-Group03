Nguồn: https://medium.com/google-developers/android-data-binding-adding-some-variability-1fe001b3abcc

Nếu bạn là người đã từng phải tự hỏi "Cái value này được set ở đâu nhỉ" khi đọc code layout của người khác, hoặc bạn là một số những người nghĩ rằng "loại bỏ findViewById thì cũng hay đấy, nhưng vẫn code boilerplate còn nhiều quá!", thì Android Data Binding chính là tính năng dành cho bạn.

### Sử dụng View Holder pattern
Giả sử rằng bạn muốn hiển thị thông tin người dùng trong ứng dụng. Trong bài viết trước, mình đã hướng dẫn các bạn sử dụng Android Studio để tạo một pattern class View Holder, sử dụng layout như sau:

```
user_info.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <LinearLayout
            android:orientation="vertical"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
        <ImageView
                android:id="@+id/userImage"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>
        <TextView
                android:id="@+id/userFirstName"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

        <TextView
                android:id="@+id/userLastName"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>
    </LinearLayout>
</layout>
```

Và sau đó set data vào view
```
private void setUser(User user, ViewGroup root) {
    UserInfoBinding binding =
        UserInfoBinding.inflate(getLayoutInflater(), root, true);
    binding.userFirstName.setText(user.firstName);
    binding.userLastName.setText(user.lastName);
    binding.userImage.setImageBitmap(user.image);
}
```

Mặc dù đã khá hơn nhiều so với phương pháp findViewById, nhưng bên trên vẫn còn rất nhiều boilerplate. Chúng ta có thể loại bỏ boilerplate  này bằng cách sử dụng các biểu thức data binding trong layout để thực hiện công việc gán.

### Gán biến
Đầu tiên, chúng ta thêm một thẻ data và một biến liên kết để sử dụng trong các biểu thức binding. Tiếp theo, chúng ta sử dụng biến đó trong các biểu thức cho các attribute cần được set trong layout:
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable
            name="user"
            type="com.example.myapp.model.User"/>
    </data>
    <LinearLayout
            android:orientation="vertical"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
        <ImageView
                android:src="@{user.image}"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>
        <TextView
                android:text="@{user.firstName}"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

        <TextView
                android:text="@{user.lastName}"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>
    </LinearLayout>
</layout>
```

Các biểu thức liên kết trong các thẻ được biểu thị bằng định dạng “@ {…}”. Các biểu thức ở trên assign trực tiếp image, firstName và lastName của User cho source và text của View, vì vậy bạn không cần phải viết boilerplate nữa. Nhưng đoạn code trên vẫn không biết phải sử dụng User nào, nên chúng ta sẽ phải gán cho nó.

```
private void setUser(User user, ViewGroup root) {
    UserInfoBinding binding =
        UserInfoBinding.inflate(getLayoutInflater(), root, true);
    binding.setUser(user);
}
```

EZPZ!
Bạn có thể thấy trong layout trên là View không còn ID nữa. Nhưng còn View Holder mà chúng ta đang cố gắng tạo ra? Vì dữ liệu được liên kết trực tiếp với các View nên chúng ta không cần phải truy cập vào các View riêng lẻ nữa. Chỉ cần đặt biến là xong.
Ưu điểm nữa tình trạng viết sai code cũng sẽ ít đi. Ví dụ: nếu bạn không có hình ảnh của người dùng trong landscape layout, bạn không còn phải kiểm tra xem ImageView có tồn tại hay không. Các biểu thức liên kết được tính toán cho từng layout và nếu ImageView không có trong đó thì sẽ không có mã nào được chạy để cập nhật ImageView.
Điều đó không có nghĩa là từ giờ chúng ta sẽ không cần phải động đến View Holder bao giờ nữa, chỉ là sẽ ít hơn nhiều thôi, bởi vì vẫn có những lúc bạn muốn truy cập trực tiếp vào View và lúc đó có trường này sẽ rất hữu ích.

### Layout Include
Vậy với layout Include thì sao nhỉ? Chúng cũng hoạt động, giống như với pattern View Holder. Ví dụ, giả sử rằng TextViews cho tên của người dùng nằm trong layout include của chính nó.
```
user_name.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable
                name="user"
                type="com.example.myapp.model.User"/>
    </data>

    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="horizontal">
        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@{user.firstName}"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@{user.lastName}"/>
    </LinearLayout>
</layout>
```

Sau đó, biến user có thể được chỉ định trong layout bên ngoài như sau:
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto">
    <data>
        <variable
                name="user"
                type="com.example.myapp.model.User"/>
    </data>
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">
        <ImageView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:src="@{user.image}"/>
        <include
                layout="@layout/user_name"
                app:user="@{user}"/>
    </LinearLayout>
</layout>
```

Bất cứ khi nào user được assign (bind.setUser (…), như trước đây), thì biến user của layout include cũng sẽ được đặt do việc gán biến app: user = ”@ {user}”. Xin lưu ý, một lần nữa, là vì mình không cần truy cập trực tiếp vào các View trong layout include (mình thậm chí còn không đặt ID trên hai TextView) nên là <include>.sẽ không có ID.
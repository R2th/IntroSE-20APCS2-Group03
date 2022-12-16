Android DataBinding cung cấp một cách để liên kế giao diện người dùng với logic cho phép các giá trị UI tự động cập nhật mà không cần sự can thiệp thủ công. Điều này làm giảm rất nhiều mã boilerplate trong logic mà chúng ta thường viết để đồng bộ hóa giao diện người dùng khi có dữ liệu mới. DataBinding là một trong những thành phần kiến trúc android được đề xuất bởi android.

Trong bài viết này, chúng ta sẽ tìm hiểu những điều cơ bản của DataBinding.

# 1. Khái niệm cơ bản về DataBinding
## 1.1 Enabling DataBinding

Để bắt đầu với DataBinding, trước tiên bạn cần bật tính năng này trong dự án Android của mình. Mở file build.gradle nằm trong ứng dụng và bật dataBinding trong mô-đun android. Sau khi được bật, hãy đồng bộ hóa dự án và bắt đầu sử dụng.

```
app/build.gradle
android {
    dataBinding {
        enabled = true
    }
 
    compileSdkVersion 27
 
    defaultConfig {
        applicationId "info.androidhive.databinding"
        minSdkVersion 16
        // ..
    }
}
```

## 1.2 Ví dụ đơn giản

Giả sử chúng ta muốn hiển thị thông tin người dùng từ class User POJO. Chúng ta thường hiển thị thông tin trong một TextView sử dụng phương thức setText (). Nhưng thay vì gọi setText theo cách thủ công cho từng thuộc tính, DataBinding cho phép chúng ta tự động ràng buộc các giá trị.

Lớp POJO bên dưới tạo đối tượng User với tên và email.

```
public class User {
    String name;
    String email;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
}
```

Để bật DataBinding trong layout, phần tử gốc nên bắt đầu bằng thẻ <layout>. Cùng với nó, các thẻ <data> và <variable> được sử dụng.

Dưới đây là cấu trúc của data-binding layout.

```
<layout ...>
 
    <data>
         
        <variable
            name="..."
            type="..." />
    </data>
 
    <LinearLayout ...>
       <!-- YOUR LAYOUT HERE -->
    </LinearLayout>
</layout>
```

Layout phải có thẻ <layout> làm phần tử gốc. Bên trong thẻ <layout> là code layout thông thường sẽ được đặt.
    
Thẻ <data> theo sau thẻ <layout>. Tất cả các biến và phương thức liên kết nên ở bên trong thẻ <data>.
    
Bên trong các thẻ <data>, một biến sẽ được khai báo bằng thẻ <variable>. Thẻ này sẽ lấy hai thuộc tính `name` và` type`. Thuộc tính name sẽ là tên bí danh và type phải thuộc class object model. Trong trường hợp này, đường dẫn đến class User.
    
Để ràng buộc một giá trị, annotation @ nên được sử dụng. Trong layout bên dưới, user name và email được liên kết với TextView sử dụng @ {user.name} và @ {user.email}
    
```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
 
    <data>
         
        <variable
            name="user"
            type="info.androidhive.databinding.User" />
    </data>
 
    <LinearLayout xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:padding="@dimen/fab_margin"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        tools:context=".MainActivity"
        tools:showIn="@layout/activity_main">
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.name}" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.email}" />
 
    </LinearLayout>
</layout>
```

Khi liên kết dữ liệu được tích hợp trong file layout, vào Build -> Clean Project và Build -> Rebuild Project. Điều này sẽ tạo ra các lớp ràng buộc cần thiết.

Các lớp ràng buộc được tạo ra tuân theo quy ước đặt tên. Xem xem file layout kích hoạt binding chưa. Đối với file activity_main.xml, lớp ràng buộc được tạo ra là ActivityMainBinding (hậu tố Binding sẽ được thêm vào cuối).

Để liên kết dữ liệu trong giao diện người dùng, trước tiên cần inflate binding layout bằng cách sử dụng các class ràng buộc được tạo. Dưới đây, ActivityMainBinding inflates layout đầu tiên và binding.setUser () để liên kết đối tượng User với layout.

Bạn có thể nhận thấy ở đây, chúng tôi đã không sử dụng findViewById () ở bất kỳ đâu.

```
MainActivity.java
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
 
import info.androidhive.databinding.databinding.ActivityMainBinding;
 
public class MainActivity extends AppCompatActivity {
 
    private User user;
     
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        // setContentView(R.layout.activity_main);
 
        ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
 
        user = new User();
        user.setName("Ravi Tamada");
        user.setEmail("ravi@androidhive.info");
 
        binding.setUser(user);
    }
}
```

Nếu bạn chạy ứng dụng, bạn có thể xem chi tiết người dùng được hiển thị trong TextViews.

android-data-binding-example

![](https://images.viblo.asia/29e18843-1bcb-4355-a42e-01912d8e837e.png)

## 1.3 Các class DataBinding có được generated?

Phiên bản Android Studio hiện tại không thể tạo các class binding trong hầu hết các lần. Thông thường, điều này có thể được giải quyết bằng cách Cleaning & Rebuilding lại dự án. Nếu sự cố vẫn tiếp diễn, hãy nhấn vào Tệp ⇒ Invalidate Caches & Restart. Điều này có thể giải quyết được vấn đề nếu file layout không có bất kỳ lỗi nào.

## 1.4 DataBinding trong layouts
  
Chúng ta đã không included CoordinatorLayout, AppBarLayout và các yếu tố khác trong ví dụ trên. Thông thường, chúng tôi tách riêng main layout và nội dung trong hai file layout khác nhau là activity_main.xml và content_main.xml. 

Content_main sẽ được bao gồm trong main layout bằng thẻ <include>. Bây giờ chúng ta sẽ xem cách bật tính năng ràng buộc dữ liệu khi chúng ta có các bố cục.

Dưới đây, chúng ta có activity_main.xml với CoordinatorLayout, AppBarLayout và FAB.

Thẻ <layout> được sử dụng trong layout activity_main.xml để cho phép ràng buộc dữ liệu. Đồng thời, các thẻ <data> và <variable> được sử dụng để liên kết đối tượng User.
    
Để chuyển người dùng đến bố cục content_main được bao gồm, liên kết: user = ”@ {user}” được sử dụng. Nếu không có điều này, đối tượng người dùng sẽ không thể truy cập được trong bố cục content_main.
    
```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:bind="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="user"
            type="info.androidhive.databinding.User" />
    </data>
 
    <android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">
 
        <android.support.design.widget.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:theme="@style/AppTheme.AppBarOverlay">
 
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="?attr/colorPrimary"
                app:popupTheme="@style/AppTheme.PopupOverlay" />
 
        </android.support.design.widget.AppBarLayout>
 
        <include
            android:id="@+id/content"
            layout="@layout/content_main"
            bind:user="@{user}" />
 
        <android.support.design.widget.FloatingActionButton
            android:id="@+id/fab"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom|end"
            android:layout_margin="@dimen/fab_margin"
            app:srcCompat="@android:drawable/ic_dialog_email" />
 
    </android.support.design.widget.CoordinatorLayout>
</layout>
```

content_main.xml lại bao gồm thẻ <layout> để kích hoạt data binding. 
    
Các thẻ <layout>, <data> và <variable> là cần thiết trong cả parent và included layouts.
    
Thuộc tính android: text = ”@ {user.name}” và android: text = ”@ {user.email}” được sử dụng để hiển thị dữ liệu trong TextViews.
    
```
content_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="user"
            type="info.androidhive.databinding.User" />
    </data>
 
    <LinearLayout xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:padding="@dimen/fab_margin"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        tools:context=".MainActivity"
        tools:showIn="@layout/activity_main">
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.name}" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.email}" />
 
    </LinearLayout>
</layout>
```

```
MainActivity.java
public class MainActivity extends AppCompatActivity {
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
 
        setSupportActionBar(binding.toolbar);
 
        User user = new User();
        user.setName("Ravi Tamada");
        user.setEmail("ravi@androidhive.info");
 
        binding.setUser(user);
    }
}
```

Bây giờ, nếu chạy ứng dụng, có thể xem dữ liệu được hiển thị trong included layout.

android-data-binding-include-example

![](https://images.viblo.asia/ed78f88e-07c2-4785-abfb-09a8e97aaacd.png)

## 1.5 Binding Click Listeners / Xử lý event

Không chỉ dữ liệu, chúng ta cũng có thể bind click chuột và các sự kiện khác trên các phần tử giao diện. Để bind một event click, cần phải tạo một class với các phương thức gọi lại cần thiết.

Dưới đây chúng ta có một lớp xử lý sự kiện nhấn FAB.

```
public class MyClickHandlers {
 
        public void onFabClicked(View view) {
            Toast.makeText(getApplicationContext(), "FAB clicked!", Toast.LENGTH_SHORT).show();
        }
}
```

Để bind sự kiện, chúng ta lại sử dụng cùng một thẻ <variable> với class xử lý đường dẫn. Bên dưới android: onClick = ”@{handlers::onFabClicked}” liên kết FAB với phương thức onFabClicked ().
    
```
<layout xmlns:bind="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="handlers"
            type="info.androidhive.databinding.MainActivity.MyClickHandlers" />
    </data>
 
    <android.support.design.widget.CoordinatorLayout ...>
 
        <android.support.design.widget.FloatingActionButton
            ...
            android:onClick="@{handlers::onFabClicked}" />
 
    </android.support.design.widget.CoordinatorLayout>
</layout>
```

Để gán sự kiện long press, phương thức nên trả về kiểu boolean thay vì void. Ví dụ: public boolean onButtonLongPressed () xử lý view long press.

Bạn cũng có thể truyền tham số trong khi binding. public void onButtonClickWithParam (View view, User user) nhận được đối tượng người dùng ràng buộc từ layout UI. Trong layout, tham số có thể được chuyển bằng cách sử dụng android: onClick = ”@{(v)->handlers.onButtonClickWithParam (v, user)}”

Để bind các sự kiện, binding.setHandlers (handlers) được gọi từ activity.

Ví dụ bên dưới hiển thị các sự kiện click button khác nhau.

```
MainActivity.java
package info.androidhive.databinding;
 
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Toast;
 
import info.androidhive.databinding.databinding.ActivityMainBinding;
 
public class MainActivity extends AppCompatActivity {
 
    private User user;
    private MyClickHandlers handlers;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
 
        setSupportActionBar(binding.toolbar);
 
        user = new User();
        user.setName("Ravi Tamada");
        user.setEmail("ravi@androidhive.info");
 
        binding.setUser(user);
 
        handlers = new MyClickHandlers(this);
        binding.content.setHandlers(handlers);
    }
 
    public class MyClickHandlers {
 
        Context context;
 
        public MyClickHandlers(Context context) {
            this.context = context;
        }
 
        public void onFabClicked(View view) {
            Toast.makeText(getApplicationContext(), "FAB clicked!", Toast.LENGTH_SHORT).show();
        }
 
        public void onButtonClick(View view) {
            Toast.makeText(getApplicationContext(), "Button clicked!", Toast.LENGTH_SHORT).show();
        }
 
        public void onButtonClickWithParam(View view, User user) {
            Toast.makeText(getApplicationContext(), "Button clicked! Name: " + user.name, Toast.LENGTH_SHORT).show();
        }
 
        public boolean onButtonLongPressed(View view) {
            Toast.makeText(getApplicationContext(), "Button long pressed!", Toast.LENGTH_SHORT).show();
            return false;
        }
    }
}
```

```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:bind="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="user"
            type="info.androidhive.databinding.User" />
 
        <variable
            name="handlers"
            type="info.androidhive.databinding.MainActivity.MyClickHandlers" />
    </data>
 
    <android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
        ...>
 
        <android.support.design.widget.AppBarLayout
            ...>
 
        </android.support.design.widget.AppBarLayout>
 
        <include
            android:id="@+id/content"
            layout="@layout/content_main"
            bind:user="@{user}" />
 
        <android.support.design.widget.FloatingActionButton
            android:id="@+id/fab"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom|end"
            android:layout_margin="@dimen/fab_margin"
            android:onClick="@{handlers::onFabClicked}"
            app:srcCompat="@android:drawable/ic_dialog_email" />
 
    </android.support.design.widget.CoordinatorLayout>
</layout>
```

```
content_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="user"
            type="info.androidhive.databinding.User" />
 
        <variable
            name="handlers"
            type="info.androidhive.databinding.MainActivity.MyClickHandlers" />
    </data>
 
    <LinearLayout xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:padding="@dimen/fab_margin"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        tools:context=".MainActivity"
        tools:showIn="@layout/activity_main">
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.name}" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.email}" />
 
        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:onClick="@{handlers::onButtonClick}"
            android:text="CLICK" />
 
        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:onClick="@{(v) -> handlers.onButtonClickWithParam(v, user)}"
            android:text="CLICK WITH PARAM" />
 
        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="LONG PRESS"
            android:onLongClick="@{handlers::onButtonLongPressed}" />
 
    </LinearLayout>
</layout>
```

android-data-binding-button-click-events

![](https://images.viblo.asia/28a7f83a-74b6-4fba-be83-56fdef76831a.png)

## 1.6 Cập nhật UI sử dụng Observables

Observables cung cấp cách để tự động đồng bộ hóa giao diện người dùng với dữ liệu mà không cần gọi phương thức setter. Giao diện người dùng sẽ được cập nhật khi giá trị của thuộc tính thay đổi trong đối tượng. Để tạo đối tượng observable, hãy extend từ BaseObservable.

Để tạo thuộc tính observable, hãy sử dụng annotation @Bindable trên phương thức getter.

Gọi notifyPropertyChanged (BR.property) trong phương thức setter để update giao diện người dùng bất cứ khi nào dữ liệu được thay đổi.

Class BR sẽ được tạo tự động khi gắn kết dữ liệu được bật.

Dưới đây là class User extends class BaseObservable. Có thể nhận thấy notifyPropertyChanged được gọi sau khi gán các giá trị mới.

```
package info.androidhive.databinding;
 
import android.databinding.BaseObservable;
import android.databinding.Bindable;
 
public class User extends BaseObservable {
    String name;
    String email;
 
    @Bindable
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
        notifyPropertyChanged(BR.name);
    }
 
    @Bindable
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
        notifyPropertyChanged(BR.email);
    }
}
```

Để kiểm tra điều này, thử thay đổi dữ liệu người dùng trên FAB. Bạn có thể thấy giao diện người dùng được cập nhật trên FAB nhấp ngay lập tức.

```
public class MyClickHandlers {
 
    Context context;
 
    public MyClickHandlers(Context context) {
        this.context = context;
    }
 
    public void onFabClicked(View view) {
        user.setName("Ravi");
        user.setEmail("ravi8x@gmail.com");
    }
}
```

## 1.7 Cập nhật UI sử dụng ObservableFields

Nếu class đối tượng của bạn có ít thuộc tính được cập nhật hoặc nếu bạn không muốn quan sát mọi trường trong đối tượng, bạn có thể sử dụng ObservableFields để cập nhật giao diện người dùng. Bạn có thể khai báo biến như ObservableField và khi dữ liệu mới được thiết lập, giao diện người dùng sẽ được cập nhật.

Cùng một class User có thể được sửa đổi như dưới đây bằng cách sử dụng ObservableFields.

```
package info.androidhive.databinding;
 
import android.databinding.ObservableField;
 
public class User {
    public static ObservableField<String> name = new ObservableField<>();
    public static ObservableField<String> email = new ObservableField<>();
 
    public ObservableField<String> getName() {
        return name;
    }
 
    public ObservableField<String> getEmail() {
        return email;
    }
}
```

Để cập nhật các giá trị, cần chỉ định giá trị mới cho thuộc tính trực tiếp thay vì sử dụng phương thức setter.

```
public class MyClickHandlers {
 
    Context context;
 
    public MyClickHandlers(Context context) {
        this.context = context;
    }
 
    public void onFabClicked(View view) {
        user.name.set("Ravi");
        user.email.set("ravi8x@gmail.com");
    }
}
```

## 1.8 Load ảnh từ URL (Glide or Picasso)

Bạn cũng có thể bind một ImageView với một URL để tải hình ảnh. Để bind URL với ImageView, bạn có thể sử dụng annotation @BindingAdapter cho thuộc tính đối tượng.

Dưới đây, biến profileImage bị ràng buộc với thuộc tính android: profileImage. Hình ảnh sẽ được tải bằng thư viện hình ảnh Glide hoặc Picasso.

```
package info.androidhive.databinding;
 
import android.databinding.BaseObservable;
import android.databinding.Bindable;
import android.databinding.BindingAdapter;
import android.widget.ImageView;
 
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
 
public class User {
    //..
    String profileImage;
 
    public String getProfileImage() {
        return profileImage;
    }
 
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
 
    @BindingAdapter({"android:profileImage"})
    public static void loadImage(ImageView view, String imageUrl) {
        Glide.with(view.getContext())
                .load(imageUrl)
                .into(view);
 
        // If you consider Picasso, follow the below
        // Picasso.with(view.getContext()).load(imageUrl).placeholder(R.drawable.placeholder).into(view);
    }
}
```

Để tải hình ảnh vào ImageView, hãy thêm thuộc tính android: profileImage = ”@ {user.profileImage}”.

```
<ImageView
     android:layout_width="100dp"
     android:layout_height="100dp"
     android:layout_marginTop="@dimen/fab_margin"
     android:profileImage="@{user.profileImage}" />
Make sure you have added INTERNET permission in your manifest file.

<uses-permission android:name="android.permission.INTERNET" />
```

android-data-binding-loading-image-from-url

![](https://images.viblo.asia/6095b738-d163-4290-a427-988b14774b3b.png)

## 1.9 Binding Java Functions (Import)

Bạn cũng có thể bind các hàm java với các phần tử giao diện người dùng. Giả sử bạn muốn thực hiện một số thao tác trên giá trị trước khi hiển thị trên giao diện người dùng, bạn có thể dễ dàng thực hiện điều đó bằng cách sử dụng thẻ <import>.

Ở đây chúng ta có một phương thức biến chuỗi thành tất cả các chữ in hoa.

```
public class BindingUtils {
    public static String capitalize(String text) {
        return text.toUpperCase();
    }
}
```

Để gọi hàm này trong layout, hãy import class trước bằng cách sử dụng thẻ <import> và gọi hàm trên thuộc tính.
    
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
 
    <data>
        <import type="info.androidhive.databinding.BindingUtils" />
    </data>
 
    <LinearLayout ...>
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{BindingUtils.capitalize(user.name)}" />
 
    </LinearLayout>
</layout>
```

[Source](https://www.androidhive.info/android-working-with-databinding/)

[Source code](https://github.com/ravi8x/Android-DataBindng-RecyclerView)
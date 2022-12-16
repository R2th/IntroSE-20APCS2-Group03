Khi lập trình Android có những lúc bạn mong ước rằng có cách nào đó có thể code Java ngay trên layout để có thể giảm tối thiểu các dòng code không cần thiết. Đặc biệt khi bạn cần hiển thị hàng trăm trường thông tin trên giao diện và bạn chán ngấy khi cứ phải findViewById() rồi mới có thể gán giá trị cho chúng.

Và Data Binding Library là 1 thư viện hỗ trợ đắc lực cho vấn đề trên. Đây là 1 support library nên có thể sử dụng từ Andorid 2.1 (API 7+) trở lên.
# I. Tổng quan  
Data binding là một thư viện hỗ trợ cho phép bạn liên kết các UI component trong layout với các nguồn dữ liệu trong ứng dụng của bạn bằng cách sử dụng định dạng khai báo thay vì lập trình  
# II. Sử dụng thư viện Data Binding
## 1. Enable data binding in your project 
Để sử dụng Data Binding trong ứng dụng của bạn, hãy thêm đoạn code sau vào file build.gradle
```javascript
android {
    ....
    dataBinding {
        enabled = true
    }
}
```
## 2. Data Binding trong Layout
### 2.1 Khai báo data binding trong layout
```javascript
<layout>
   <data>
   .......
   </data>
   <ViewRoot>
       <View />
       ......
   </ViewRoot>
</layout>
```

Example: 
```javascript
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.firstName}"/>
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.lastName}"/>
   </LinearLayout>
</layout>
```
Biến "user" trong dữ liệu mô tả một thuộc tính có thể được sử dụng trong layout này   
```javascript
<variable name="user" type="com.example.User" />
```
Một lưu í nhỏ: Các biểu thức layout nên được giữ nhỏ và đơn giản, vì chúng không thể kiểm thử unit test và có hỗ trợ IDE hạn chế. Để đơn giản hóa các biểu thức trong layout, bạn có thể sử dụng các binding adapter    
### 2.2 Khai báo data Object 
*  Cách 1:
```javascript
public class User {
  public String name;
  public boolean isHappy;

  public User(String name, boolean isHappy) {
    this.name = name;
    this.isHappy = isHappy;
  }
}
```

* Cách 2 : 
```javascript
public class User {
  private String name;
  private boolean isHappy;

  public User(String name) {
    this.name = name;
    this.isHappy = true;
  }

  public User(String name, boolean isHappy) {
    this.name = name;
    this.isHappy = isHappy;
  }

  public boolean isHappy() {
    return isHappy;
  }

  public void setIsHappy(boolean isHappy) {
    this.isHappy = isHappy;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
```
## 3. Binding Adapter
Trong android có cung cấp một số hàm binding Adapter cơ bản như onClick(), onLongClick() để giúp người dùng không cần phải định nghĩa lại những hàm, nhưng chúng ta cũng có thể custom thêm một số hàm sử dụng bindingAdapter để thuận tiện cho việc sử dụng trong project của bạn  
### 3.1 Sử dụng Binding Adapter để set dữ liệu lên View
Mình có tạo ra 1 file BingdingUtils.java để định nghĩa các @BindingAdapter trong toàn project của mình.
```javascript
public class BingdingUtils {
        @BindingAdapter({ "setAdapter"})
        public static void setAdapter(RecyclerView view, ListUserAdapter adapter) {
            view.setAdapter(adapter);
        }
}
```
Mình sẽ giới thiệu qua về file BindingUtils.Java
* @Bindingdapter{ "setAdapter"}): là dòng khai báo Java Annotation với tham số setAdapter sẽ được sử dụng trong file xml  
* public static void nameMethod(RecyclerView view, ListUserAdapter adapter) {}: đây là 1 hàm với tham số đầu tiên RecyclerView view là view sẽ chịu tác động của Annotation.   
ListUserAdapter adapter tham số thứ 2 là kiểu dữ liệu mà view sẽ nhận.
* view.setAdapter(adapter); : dùng để đĩnh nghĩa, set các thuộc tính cho cho View.
### 3.2 sử dụng BindingAdapter để set sự kiện lên View
Ngoài sử dụng @BindingAdapter để set dữ liệu cho View thì các bạn cũng có thể sử dụng @BindingAdapter để set các sự kiện trong Android Thường thì các View mặc định có sẵn của Android thì đều đã được cung cấp sẵn các @BindingAdapter nhằm phục vụ việc sử dụng được thuận tiện. Nhưng với 1 View mà bạn Custom thì sao, phần dưới đây mình sẽ hướng dẫn các bạn sử dụng @BindingAdapter để có thể binding được sự kiện của những Custom View.  
```javascript
@BindingAdapter({ "setOnScroll" })
public static void setScroll(ScrollWebView scrollWebView,
  ScrollWebView.OnScrollChangedCallback onScrollChangedCallback) {
     scrollWebView.setOnScrollChangedCallback(onScrollChangedCallback);
}
```
### 3.3 Binding Data   
Một lớp ràng buộc sẽ được sinh ra cho mỗi file layout. Mặc định, tên của class đó được đặt dựa trên tên của layout sinh ra nó. Ví dụ tên layout là Activity_main.xml, thì tên lớp được tạo tương ứng là ActivityMainBinding. Lớp này giữ tất cả các liên kết từ các thuộc tính trong Layout (ví dụ: biến user) và cho biết cách gán giá trị cho các biểu thức liên kết. Phương pháp được đề xuất để tạo các liên kết là inflate với layout, như thể hiện trong ví dụ sau:   
```javascript
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
   User user = new User("Test", "User");
   binding.setUser(user);
}
```
##  4. Dàng buộc dữ liệu hai chiều   
One way Data Binding (Ràng buộc dữ liệu một chiều) bạn có thể set giá trị trên thuộc tính đó và cài đặt một listener để phản ứng với tất cả những thay đổi của phần tử đó
```javascript
<CheckBox
    android:id="@+id/rememberMeCheckBox"
    android:checked="@{viewmodel.rememberMe}"
    android:onCheckedChanged="@{viewmodel.rememberMeChanged}"
/>
```
* Two way Data binding (dàng buộc dữ liệu hai chiều): cung cấp một cách ngắn gọn hơn 
```javascript
<CheckBox
    android:id="@+id/rememberMeCheckBox"
    android:checked="@={viewmodel.rememberMe}"
/>
```
Ký hiệu @ = {}, quan trọng bao gồm dấu "=", nhận các thay đổi dữ liệu cho thuộc tính và lắng nghe cập nhật của người dùng cùng một lúc.  
Để phản ứng với những thay đổi trong dữ liệu sao lưu, bạn có thể biến đổi layout của mình thành một triển khai của Observable, thường là BaseObservable và sử dụng chú thích @Bindable, như được hiển thị trong đoạn code sau:  
```javascript
public class LoginViewModel extends BaseObservable {
    // private Model data = ...

    @Bindable
    public Boolean getRememberMe() {
        return data.rememberMe;
    }

    public void setRememberMe(Boolean value) {
        // Avoids infinite loops.
        if (data.rememberMe != value) {
            data.rememberMe = value;

            // React to the change.
            saveData();

            // Notify observers of a new value.
            notifyPropertyChanged(BR.remember_me);
        }
    }
}
```
Liên kết dữ liệu hai chiều bằng các thuộc tính tùy chỉnh 
Nền tảng cung cấp cho việc triển khai ràng buộc dữ liệu hai chiều (two way data binding) cho các thuộc tính hai chiều phổ biến nhất và người nghe thay đổi, mà bạn có thể sử dụng như một phần của ứng dụng. Nếu bạn muốn sử dụng liên kết dữ liệu hai chiều với các thuộc tính tùy chỉnh, bạn cần phải sử dụng annotation @InverseBindingAd Module và @InverseBindingMethod.     
Ví dụ nếu bạn muốn ràng buộc dữ liệu 2 chiều cho thuộc tính "time"  
**Bước 1** : chú thích cho phương thức đặt gía trị ban đầu và cập nhật khi giá trị thay đổi bằng cách sử dụng @BindingAdapter  
```javascript
@BindingAdapter("time")
public static void setTime(MyView view, Time newValue) {
    // Important to break potential infinite loops.
    if (view.time != newValue) {
        view.time = newValue;
    }
}
```
**Bước 2** : Chú thích cho phương thức đọc gía trị từ View bằng cách sử dụng @InverseBindingAdapter 
```javascript
@InverseBindingAdapter("time")
public static Time getTime(MyView view) {
    return view.getTime();
}
```
# III. Tài liệu tham khảo  
https://developer.android.com/topic/libraries/data-binding/
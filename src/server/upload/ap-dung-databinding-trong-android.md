DataBinding là một thư viện hỗ trợ để liên kết thành phần UI trong layout với nguồn dữ liệu sử dụng kiểu khai báo thay vì lập trình.
Trước khi có thư viện này chúng ta gọi findViewById() để tìm kiếm TextView widget và ràng buộc tới Email như code ở dưới:
```
TextView txtView = findViewById(R.id.text_demo);
txtView.setText(viewModel.getEmail());
```
Data binding là một trong những thành phần của Android Jetpack cho phép người lập trình liên kết dữ liệu tới UI.Nó xóa bỏ nhiều UI framework được gọi trong Activity của bạn,làm thêm dễ đọc và dễ bảo trì.
Dưới đây là ví dụ 1 data binding đơn giản:
```
<TextView
    android:text="@{viewmodel.userName}" />
```
Thật tuyệt vời chỉ với 1 dòng lệnh chúng ta có thể sử dụng username ở textview
### Nào cùng tìm hiểu với DataBinding
Có thể sử dụng databinding trong  Android 4.0 hoặc cao hơn.
Nên sử dụng  Android Plugin mới nhất cho Gradle của bạn.Tuy nhiên databinding đã hỗ trợ trong version 1.5.0 hoặc cao hơn
Để bắt đầu sử dụng databinding trong android studio :  
1. Tải thư viện từ Support Repository trong Android SDK manager.
2. Thêm đoạn config dưới vào build.gradle để kích hoạt databinding:

```
android {
    ...
    dataBinding 
        enabled = true
    }
}
```
### Android studio hỗ trợ cho data binding
Android Studio hỗ trợ một vài tính năng cho databinding code.Hiện tại nó hỗ trợ những tính năng như:
*  Hiện highlight code
*  Tự động hoàn thành mã XML
*  Báo những câu lệnh sai cú pháp
###  Layouts và binding expressions
Ngôn ngữ Expressions cung cấp cho người lập trình biểu thức xử lý các sự kiện một cách viết khác trong view.
Thư viện Data Binding tự động tạo ra các lớp cần thiết để liên kết đến view trong layout với các dữ liệu trong dự án của bạn
Đối với các layout binding file chúng ta thêm các thẻ root **Layout** theo sau là một thẻ **data** nằm trong view root như sau:
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="person" type="com.example.Person"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="match_parent"
           android:layout_height="wrap_content"
           android:text="@{person.firstName}"/>
       <TextView android:layout_width="match_parent"
           android:layout_height="wrap_content"
           android:text="@{person.lastName}"/>
   </LinearLayout>
</layout>
```
Biến person là 1 variable được mô tả trong thẻ data đó là thuộc tính được sử dụng trong layout.Chẳng hạn ta muốn sử dụng trong layout,ta có thể gọi thuộc tính sử dụng cú pháp  **@{}**
Trong ví dụ ở dưới **TextView** để thiết lập thuộc tính **firstName** của biến **person**:
```
<variable name="person" type="com.example.Person" />
<TextView android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@{person.firstName}" />
```
Hãy thử binding data mẫu trong layout của ta.
Trước khi làm đều đó ta cần tạo đối tượng person
```
public class Person {
  public String firstName;
  public String lastName;
  public Person(String firstName, String lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
}
```
Như mặc định,mỗi lớp liên kết được tạo cho mỗi layout.Tên của lớp dựa trên tên của tệp bố cục và thêm Binding ở sau nó.Như layout có tên file là **activity_main.xml** thì sẽ tự động tạo class với tên **MainActivityBinding**.Cách làm tốt nhất to tạo binding là khởi tạo trong khi **OnCreate** layout,như ví dụ ở dưới:
```
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   MainActivityBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
   Person person = new person("Test", "Person");
   binding.setPerson(person);
}
```
Ta có thể lấy view sử dụng LayoutInflater:
```
MainActivityBinding binding = MainActivityBinding.inflate(getLayoutInflater());
```
Nếu sử dụng data binding trong **Fragment**,**ListView** hoặc **RecyclerView** adapter thì ta nên sử dụng hàm inflate() của lớp binding trong **DataBindingUtil**
```
ListItemBinding binding = ListItemBinding.inflate(layoutInflater, viewGroup, false);
// or
ListItemBinding binding = DataBindingUtil.inflate(layoutInflater, R.layout.list_item, viewGroup, false);
```
Trong bài viết tiếp theo,ta sẽ tìm hiểu sâu hơn về Databinding để có thể thoải mái sử dụng trong nhiều UI phức tạp hơn.
Bài viết gốc : https://medium.com/@temidjoy/android-jetpack-empower-your-ui-with-android-data-binding-94a657cb6be1
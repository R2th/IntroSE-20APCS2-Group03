Nguồn: https://medium.com/androiddevelopers/android-data-binding-that-include-thing-1c8791dd6038

Trong bài viết lần trước, mình đã giới thiệu cho các bạn một cách rất đơn giản để không phải dùng findViewById ở các phiên bản Android Studio 1.5 hoặc cao hơn. Về căn bản thì nó chính là pattern View Holder (miêu tả xem ở [đây](https://developer.android.com/training/improving-layouts/smooth-scrolling.html) )
Ok, lần trước mình đã hướng dẫn cách khiến Android Studio tạo một class hoạt động như một View Holder cho một file layout, nhưng câu hỏi đặt ra là các layout được include thì làm thế nào? Merged included layout thì làm thế nào?
Câu trả lời là những cái trên đều được hỗ trợ cả, nhưng mỗi file layout sẽ lại tạo ra một class riêng. Đây là một ví dụ:
```
hello_world.xml
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

        <TextView
                android:id="@+id/hello"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>
        <include
                android:id="@+id/included"
                layout="@layout/included_layout"/>
    </LinearLayout>
</layout>
included_layout.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/world"/>
</layout>
```
Bạn có thể access hai thằng TextView như cách dưới đây:
```
HelloWorldBinding binding =
    HelloWorldBinding.inflate(getLayoutInflater());
binding.hello.setText(“Hello”);
binding.included.world.setText(“World”);
```
Pattern sử dụng cho file được include cũng giống với View bình thường. ID của thẻ <include> được sử dụng làm tên trường của nó trong class. Layout được include sẽ tạo ra class riêng của nó, trong đó chứa các trường riêng cho các Views bên trong nó. Giả sử trong các layout có một số ID trùng lặp, thì việc phân biệt cũng rất đơn giản. Ví dụ nếu bạn include một layout 2 lần:
```
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

        <TextView
                android:id="@+id/hello"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>
        <include
                android:id="@+id/world1"
                layout="@layout/included_layout"/>
        <include
                android:id="@+id/world2"
                layout="@layout/included_layout"/>
    </LinearLayout>
</layout>
```
Hai cái “world” TextView có thể được access bằng cách như sau:
```
HelloWorldBinding binding =
    HelloWorldBinding.inflate(getLayoutInflater());
binding.hello.setText(“Hello”);
binding.world1.world.setText(“First World”);
binding.world2.world.setText(“Second World”);
```
Điều phải nhớ là các bạn phải gán ID cho layout được include, nếu không thì trong file binding được gen ra sẽ không có trường public nào được gán cho layout đấy. Ngoài ra, hãy nhớ wrap thẻ  <layout> bên ngoài cho các layout mà bạn muốn tạo các trường. Việc wrap này sẽ kích hoạt bước tiền xử lý cho phép nó liên kết các view với các trường và tạo ra một class.
Nếu bạn nhìn vào danh sách các class đã được tạo, bạn sẽ thấy rằng một file được include nhiều lần thì vẫn sẽ chỉ có chung một class được gen ra. Ví dụ: nếu bạn tạo thêm một class goodbye_world.xml, trong đó include thằng include_layout.xml, thì vẫn chỉ có một class tương ứng với thằng include_layout.xml được tạo ra.
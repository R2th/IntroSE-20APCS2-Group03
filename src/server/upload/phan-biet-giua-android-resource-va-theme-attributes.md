# I> Dẫn nhập
Khi làm việc với UI của Android, bạn sẽ thường xuyên gặp 2 khái niệm về Android Resource và Theme attribute như ví dụ dưới đây:
```
android:background="@color/colorPrimary"  
android:background="@com.demoapp:color/colorPrimary"  
android:background="?colorPrimary"  
android:background="?attr/colorPrimary"  
android:background="?com.demoapp:attr/colorPrimary"  
android:background="?com.demoapp:colorPrimary"  
android:background="?android:colorPrimary"  
android:background="?android:attr/colorPrimary"
```
Hai khái niệm này tưởng chừng rất đơn giản, tuy nhiên nếu không nắm vững, chúng ta sẽ không thể tối ưu hóa hiệu suất khi sử dụng chúng trong trường hợp cụ thể. Trong bài viết này, mình sẽ làm rõ hai khái niệm này và giúp các bạn nắm rõ chúng.
# II> Nội dung
## 1. Resource tham chiếu (`@`) và style attributes (`?`)
Khi chúng ta sử dụng `@` - chúng ta tham chiếu giá trị resource thực tế (color, string....). Tức là resource này phải có giá trị thực. Trong trường hợp này, chúng ta biết chính xác giá trị mà chúng ta đang xử lý.
```xml
<?xml version="1.0" encoding="utf-8"?>  
<resources>  
    <color name="colorPrimary">#3F51B5</color>
</resources>
```
Với ví dụ trên, khi chúng ta tham chiếu resource *colorPrimary* trong color.xml, giá trị *#3F51B5* sẽ không bao giờ thay đổi với bất kỳ theme nào.

Ngược lại, khi chúng ta dùng `?` – điều đó có nghĩa là chúng ta đang tham chiếu một style attribute – giá trị này có thể khác nhau tùy thuộc vào theme hiện tại. Tức là trong mỗi theme cục thể, chúng ta có thể ghi đè attribute này, ví vậy chúng ta không cần phải thay đổi bố cục XML của mình, chúng ta chỉ cần lựa chọn theme thích hợp.
```xml
<resources>  
    <style name="AppTheme" parent="Theme.AppCompat.Light">
        <item name="colorPrimary">#F00</item>
    </style>
</resources>
<TextView  
    android:id="@+id/text"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="?colorPrimary"/>
```
Trong ví dụ trên, chúng ta sẽ yêu cầu Android cho chúng ta giá trị của *colorPrimary* được chỉ định trong theme hiện tại. Trong trường hợp này, khó có thể xác định chính xác giá trị của *colorPrimary* là gì vì nó phụ thuộc vào theme được áp dụng cho các layout.
## 2. Cú pháp
### a. Tham chiếu resources (`@`)
```
@[package_name:]resource_type/resource_name
```
+ `package_name`: tên của package chứa resource (mặc định là app package). Riêng package android sẽ chứa các resource của hệ thống.
+ `resource_type`: Các sub-class R cho các loại tài nguyên (attr, color, string, dimen...).
+ `resource_name`: Tên của resource mà chúng ta đang reference.
```
android:background="@color/colorPrimary"  
android:background="@com.demoapp:color/colorPrimary"
```
Như ví dụ trên, cả hai đều tương đương vì theo mặc định, package name là package của app.
```
package(optional) = com.myapp
resource_type = color
resource_name = colorPrimary
```
Như chúng ta đã biết, Android cũng có định nghĩa riêng một số resource:
```
android:background="@android:color/holo_orange_dark"
```
Phân tích chúng ta sẽ có:
```
package = android- tham chiếu tài nguyên cài sẵn
resource_type = color
resource_name = holo_orange_dark
```
### b. Tham chiếu style attributes (`?`)
```
?[package_name:][resource_type/]resource_name
```
Ví dụ:
```
android:background="?com.demoapp:attr/colorPrimary" //verbose format  
android:background="?com.demoapp:colorPrimary" //attr is skipped since its optional  
android:background="?attr/colorPrimary" //package is skipped since its optional  
android:background="?colorPrimary"  // package & attr is skipped  
```
# III. Kết
Hy vọng với bài viết này, các bạn có thể hiểu rõ và sử dụng thành thạo 2 kiểu tham chiếu resource của Android.

Bài viết có tham khảo nội dung tại [đây](https://developer.android.com/guide/topics/resources/accessing-resources.html), [đây](https://www.youtube.com/watch?v=Jr8hJdVGHAk) và tại [đây](http://androidbackstage.blogspot.com/2016/08/episode-54-aapt.html)
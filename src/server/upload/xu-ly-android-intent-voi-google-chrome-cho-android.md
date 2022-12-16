# I. Dẫn nhập
* Một tính năng mà hầu như chúng ta ít để ý đến khi phát triển ứng dụng cho Android là chúng ta hoàn toàn có thể mở ứng dụng trực tiếp từ một trang web thông qua [Android Intent](http://developer.android.com/guide/components/intents-filters.html). Thậm chí chúng ta còn có thể đính kèm các thông tin cần thiết cung cấp cho ứng dụng để phục vụ các yêu cầu cụ thể. Ví dụ khi người dùng truy cập trang web (trên thiết bị chạy Android) đã được thiết kế có chứa các thẻ **<iframe>** với tùy chỉnh **URI-scheme** đặt trong **src** như sau: `<iframe src="paulsawesomeapp://page1"></iframe>` thì ứng dụng tương ứng sẽ được mở. Trình duyệt Chrome cho Android từ phiên bản 18 trở xuống và phần lớn các trình duyệt cho Android còn lại đều hỗ trợ khả năng này.
* Tuy nhiên, tính năng này đã có sự thay đổi kể từ phiên bản 25 trở lên của Chrome cho Android. Chúng ta không thể mở ứng dụng Android bằng cách cài đặt thuộc tính **src** của thẻ **<iframe>** và với ví dụ trên thì người dùng không thể mở được ứng dụng ngay cả khi nó đã được cài đặt trên thiết bị. Để khởi chạy ứng dụng chúng ta cần sử dụng một cú pháp mới của **“intent:”**
# II. Cú pháp
* Cách thực hiện tốt nhất là tạo ra một đầu ra là cú pháp lệnh ngay khi có bất kỳ hành động nào đó của người dùng trên trang web. Điều này cho phép chúng ta linh hoạt trong việc kiểm soát cách ứng dụng được khởi chạy, bao gồm khả năng đính kèm thông tin thông qua [Intent Extras](http://developer.android.com/guide/components/intents-filters.html#extras)
* Cú pháp sẽ như sau:
```
intent:
   HOST/URI-path // Tùy thể tùy chỉnh theo ý thích
   #Intent;
      package=[string]; // Cần phải có để định danh ứng dụng cần mở
      action=[string]; // Tùy thể tùy chỉnh theo ý thích
      category=[string]; // Tùy thể tùy chỉnh theo ý thích
      component=[string]; // Tùy thể tùy chỉnh theo ý thích
      scheme=[string]; // Tùy thể tùy chỉnh theo ý thích
   end;
```
* Chúng ta có thể thêm URL để redirect đến một trang web bất kỳ khi intent không được xử lý hoặc ứng dụng không thể khởi chạy với cú pháp như sau:
```
S.browser_fallback_url=[encoded_full_url]
```
> Giá trị của **browser_fallback_url** sẽ bị Chrome loại bỏ khi ứng dụng được khởi chạy.
* Chrome sẽ không mở được ứng dụng trong các trường hợp sau:
1. Sai cú pháp (chứa khoảng trắng trong các từ khóa, sai định dạng...).
2. Intent không được xử lý (ví dụ: không có ứng dụng xử lý intent này)
3. Timer của Javascript cố gắng mở ứng dụng mà cần bất kỳ thao tác nào của người dùng.
# III. Demo và Giải thích
## 1. Cấu hình AndroidManifest:
* Trước tiên chúng ta sẽ cấu hình như sau:
```
<activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            ...
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data android:scheme="demoapp" android:host="demoapp" android:path="/"/>
            </intent-filter>
        </activity>
```
> Trong thẻ **<intent-filter>** chúng ta chỉ cần quan tâm đến các nội dung khai báo trong thẻ **<data>** vì các thẻ còn lại đều bắt buộc phải có thì activity mới có thể nhận biết và xử lý intent từ trình duyệt. **android:scheme**, **android:host**, **android:path** phải giống với khai báo cú pháp **“intent:”** tương ứng.
## 2. Cú pháp “intent:”
```
“intent://demoapp/#Intent;scheme=demoapp;package=com.example.myapplication;S.browser_fallback_url=https://google.com.vn;end”
```
> Chúng ta cần chú ý các giá trị khai báo trong cú pháp phải tương ứng với khi khai báo trong **AndroidManifest**, đặc biệt là **packagename** để có thể khởi chạy đúng ứng dụng.
## 3. Đính kèm thông tin
* Chúng ta có thể đính kèm thông tin với các kiểu dữ liệu cơ bản(String, Integer...) với ví dụ khai báo như sau:

-> S.<action>=open_app => Kiểu String có action ứng với “open_app”.

-> i.<count>=1 => Kiểu Integer có count ứng với 1.

....
## 4. Trích xuất thông tin
* Khi ứng dụng được khởi chạy, chúng ta sẽ trích xuất thông tin từ **Intent** trong **onCreate(savedInstanceState: Bundle?)** hoặc **onNewIntent(intent: Intent?)** ứng với các cặp dữ liệu đã khai báo trong cú pháp **“intent:”**
## 5. Test
* Để test chức năng này, chúng ta sẽ tạo ra một trang web có chứa **“intent:”**. Chúng ta có thể sử dụng một IDE xử lý html trực tuyến và chạy trên trình của Android (ví dụ: https://www.w3schools.com/html/tryit.asp?filename=tryhtml_basic)
* Tiếp đến, chúng ta sẽ chèn một thẻ <a> như sau:
```
<a href="intent://demoapp/#Intent;scheme=demoapp;package=com.example.myapplication;S.hello_word=Open app! Hello word!!!;S.browser_fallback_url=google.com.vn;end">Open app!</a>
```
* Run trang web và click vào link, ứng dụng của chúng ta sẽ được mở ra.

![](https://images.viblo.asia/f661608e-639d-4486-8901-ca55afe8f475.gif)

[Click vào đây để xem rõ hơn!](https://gph.is/g/ap0p93O)
> Khi không thể tìm thấy ứng dụng trong máy, Android sẽ mặc định mở các ứng dụng (dựa theo **packagename**) có sẵn chuyên về chợ ứng dụng (Google Play Store...) để người có thể cài đặt ứng dụng để xử lý intent này. Điều này rất cần thiết để hiện thực các tính năng liên quan đến Store khi ứng dụng của chúng ta chưa được cài vào máy.
# IV. Kết
* Nội dung bài viết được tham khảo [tại đây](https://developer.chrome.com/multidevice/android/overview)
* Hy vọng với bài viết này, các bạn sẽ thêm những kiến thức mới về phát triển ứng dụng cho Android. Hẹn các bạn trong các bài viết tiếp theo.
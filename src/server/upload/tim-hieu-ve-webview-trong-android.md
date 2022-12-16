Nếu đã từng phát triển ứng dụng trên nền tảng Android sử dụng dữ liệu từ phía Web thì chắc hẳn Webview là một công cụ mà các lập trình viên Android sẽ không còn xa lạ gì nhiều :laughing:

Trong bài viết này, chúng ta sẽ cùng tìm hiểu kỹ hơn về Webview, cách nó hoạt động cũng như cách để đưa một Website vào ứng dụng của bạn của bạn.
Let's go!

## 1: Webview là gì?
Hiểu một cách đơn giản thì Webview là một đối tượng view trong Android cho phép lập trình viên có thể hiển thị nội dung của một Website vào trong ứng dụng của mình thông qua 1 đường dẫn hoặc bạn có thể định nghĩa 1 file HTML trong project của bạn và sử dụng Webview để đọc file đó. Nói 1 cách đơn giản hơn thì Webview giúp biến ứng dụng của bạn trở thành 1 Web Application ( *"turns your application to a web application"* )
## 2: Sử dụng Webview như thế nào?

Để sử dụng Webview ta có 2 trường hợp có thể cần đến:

* Nạp Website từ 1 HTML trong project
* Nạp Website từ 1 đường dẫn của website đó.


Ta sẽ đi từng trường hợp để tìm hiểu nhé.
###  2.1: Nạp Website từ 1 file HTML

Đầu tiên, ta sẽ cần thiết lập 1 Webview trong layout của bạn bằng 1 thẻ Webview trong file 

**MainActivity.xml**:
![image.png](https://images.viblo.asia/82aa95a5-12aa-4c9d-ad68-cfd17ea2f1c0.png)

Tiếp đến ta cần thiết lập 1 file **yourfile.html** với định dạng HTML trong project của bạn ở thư mục **assets**.

![image.png](https://images.viblo.asia/c4d42481-cedb-4356-a46b-09a170d159fe.png)

Và sau đó là thực hiện load file HTML đã định nghĩa trong **MainActivity.kt** sử dụng phương thức **loadUrl()** của WebView.

![image.png](https://images.viblo.asia/d0882436-7f8d-49b6-95e6-fbe90a9253cb.png)


### 2.2: Nạp Website từ 1 đường dẫn đến website.

Với trường hợp load website từ 1 đường dẫn của web thì đầu tiên bạn cần cấp quyền Internet cho ứng dụng.

![image.png](https://images.viblo.asia/07da02ea-1ee0-423d-8f4c-5c335b2da18b.png)

Sau đó tiến hành truyền Url của Web vào phương thức **loadUrl()** của Webview. Thiết lập webview trong file xml bạn vẫn sẽ làm như với 2.1.

![image.png](https://images.viblo.asia/8481e5e1-b73e-4104-bc9c-5524c666673e.png)

Trường hợp website có sử dụng Javascripts thì bạn có thể thêm dòng lệnh bên dưới 

![image.png](https://images.viblo.asia/017331fd-e7d8-4a5b-b668-8e5dc5160d33.png)

Tiến hành chạy ứng dụng và bạn sẽ hiển thị được web trong ứng dụng của bạn :wink:

![image.png](https://images.viblo.asia/5a232433-465b-4c35-b5b1-87eb9d97fb22.png)

## 3: Xử lý sự kiện trong Webview.

Vậy là bạn đã thành công load được 1 website lên ứng dụng của mình rồi :100:

Tuy nhiên, sau khi website được hiển thị trong app thì làm thế nào lập trình viên có thể xử lí được sự kiện khi người dùng sử dụng website đó? Ví dụ như khi họ nhấn vào 1 đường dẫn hay khi họ nhấn back trên web. Lập trình viên sẽ lắng nghe và xử lý sự kiện đó như thế nào ?

Để giải quyết vấn đề này thì Webview có 1 giải pháp được gọi là **WebViewClient**.

**WebViewClient** được hiểu là nơi xử lý khi người dùng tương tác với website được load lên trong ứng dụng của bạn. Bình thường nếu không sử dụng **WebviewClient** thì khi bạn tương tác với web(nhấn vào 1 đường dẫn trong web, ...) thì đường dẫn mà bạn nhấn sẽ được load lên bởi trình duyệt mặc định của điện thoại chứ không phải bởi Webview nữa. Lúc này sẽ rất khó để kiểm soát các tương tác với website đó.

Hãy đi vào set up **WebviewClient** nào!

Với Kotlin bạn chỉ cần setup bằng hàm *webViewClient()* sau đó truyền 1 **object WebviewClient**  và tiến hành ghi đè phương thức *shouldOverrideUrlLoading()* để xử lý mỗi khi người dùng nhấn vào bất kỳ link nào trên website đồng thời mở link đó với Webview chứ không phải sử dụng trình duyệt của thiết bị. 

Hàm *shouldOverrideUrlLoading()*  sẽ chạy ngay sau khi hàm *loadUrl()* được thực thi. Tại đây bạn có thể kiểm tra Url được click và có thể ghi đè Url truyền vào
![image.png](https://images.viblo.asia/5b32f24d-7c19-494d-9a6b-c96e61f48f6f.png)

Ngoài ra, bạn cũng có thể tự implement **WebviewClient** bằng cách tạo ra 1 class mới và kế thừa lớp **WebviewClient()** của hệ thống đồng thời implement một số phương thức callback của hệ thống như bên dưới.

![image.png](https://images.viblo.asia/290f4b3f-893e-4f1b-a2ed-239e040a21b7.png)

Hàm **onPageStarted()** sẽ được gọi khi web bắt đầu được load và được gọi sau hàm loadUrl()

Hàm **onPageCommitVisible()** sẽ được gọi khi web bắt đầu được hiển thị lên

Hàm **onPageFinished()** sẽ được gọi khi web đã hoàn thành việc load lên màn hình và hiển thị

Hàm **onReceivedError()** sẽ được gọi khi quá trình load website bị lỗi

Tùy theo nhu cầu sử dụng mà lập trình viện có thể xử lí sự kiện  của ứng dụng khi người dùng tương tác với website và ở các trạng thái khác nhau trên các callback ở trên.

Ngoài một số callback chính mà mình đã liệt kê ở trên thì vẫn còn một số callback khác bạn có thể tìm hiểu thêm nhé :v

Khi *setup* *WebviewClient* vào trong Webview bạn chỉ cần gọi đến lớp đã được bạn implement.

![image.png](https://images.viblo.asia/3bd60363-6c51-4ef0-8338-f8ddcdf3aab3.png)

## 4: Xử lí backstack
Nếu ở trên web khi nhấn back ta có thể trở về được trang web mà trước đó mình truy cập. Tuy nhiên khi sử dụng Webview thì website sẽ không back về trang web trước đó mà sẽ back về 1 địa chỉ nào đó đang có trong stack. Để *enable backpress* trong webview thì lập trình viên cần override lại hàm **onBackPressed()** của Android như bên dưới.

![image.png](https://images.viblo.asia/291a82b2-053f-4b29-9e62-b54503b403d7.png)

## 5: Kết luận

Vậy là mình đã cùng các bạn tìm hiểu về một số những kiến thức cần biết về Webview trong Android. Hy vọng những thông tin trên hữu ích với bạn đọc. Nếu cảm thấy bài viết mình có sai sót hoặc thiếu thông tin vui lòng góp ý cho mình ở dưới comment nha.

Các bạn có thể đọc thêm 1 số thông tin tại đây:
https://developer.android.com/reference/android/webkit/WebView
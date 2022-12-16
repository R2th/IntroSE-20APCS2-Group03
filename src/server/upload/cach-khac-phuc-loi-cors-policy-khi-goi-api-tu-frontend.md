### CORS là gì
**CORS** là một cơ chế cho phép nhiều tài nguyên khác nhau (fonts, Javascript, v.v…) của một trang web có thể được truy vấn từ domain khác với domain của trang đó. **CORS** là viết tắt của từ Cross-origin resource sharing.

### Lỗi CORS policy là gì
Khi bạn call API tới server mà không có header `Access-Control-Allow-Origin` hoặc giá trị của nó không hợp lệ thì sẽ phát sinh lỗi này và không lấy được dữ liệu từ API.
``
Access to XMLHttpRequest at 'API_URL' from origin 'FRONTEND_URL' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
``

### Cách khắc phục
Cách khắc phục triệt để nhất là server sẽ config enable CORS lên để phía client có thể call được dữ liệu, các bạn có thể tham khảo cách để enable với các ngôn ngữ tại đây
[Enable CORS on Server](https://www.w3.org/wiki/CORS_Enabled)

Ngoài cách trên ra thì các bạn có thể tự sửa ở client để có thể call dữ liệu, bằng cách disable mode security trên trình duyệt để chạy (Khuyến cáo chỉ nên dùng cho quá trình develop), cụ thể các bạn có thể làm theo cách sau:

### Chạy trình duyệt Chrome mà không có CORS
Trên các hệ điều hành sẽ có cách chạy khác nhau, bật terminal lên là paste các lệnh sau tương ứng với các trình duyệt

**Window**
```markdown
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

**OSX**
```shell
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

**Linux**
```shell
google-chrome --disable-web-security
```

Bạn sẽ thấy thông báo như sau, chọn **Start Google Chrome** để bắt đầu
![](https://images.viblo.asia/6bbb0dc2-822e-465b-baee-5a52c5bd7a41.png)

**Chú ý**

Từ Chrome 22+ bạn sẽ thấy thông báo sau: 
``
You are using an unsupported command-line flag: --disable-web-security. Stability and security will suffer.
``
![](https://images.viblo.asia/1600e6ee-0feb-4d8e-a5d8-5dc773662287.png)

### Kết luận
Bài viết dựa trên quá trình tìm hiểu của mình khi làm trong dự án gặp phải vấn CORS policy khi call API của khách hàng, tuy nhiên việc yêu cầu KH thêm config CORS để call từ phía FE bên mình khá là khó, do đó mình cần xử lý ở phía Client trong quá trình develop. Hi vọng sẽ giúp được các bạn gặp hoàn cảnh tương tự :)
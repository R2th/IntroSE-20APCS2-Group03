# Mở đầu
Debugging là một tiến trình cần thiết trong phát triển phần mềm dù với bất kì ngôn ngữ hay nền tảng nào. Với JS cũng vậy, chắc hẳn bạn đã quen với các cú pháp cơ bản như dưới đây:
```javascript
console.log(‘Hello World!’); //log a message or an object to console
console.info(‘Something happened…’); //same as console log
console.warn(‘Something strange happened…’); //same as console log but outputs a warning
console.error(‘Something horrible happened…’); //same as console log but outputs an error
```
Tuy nhiên, còn một số hàm, thuộc tính tiện ích hơn với Console mà có thể bạn chưa biết, chúng ta hãy cùng tìm hiểu trong bài này nhé ;)
# Tip #1: console.trace()
Nếu muốn biết chi tiết Log ra sao, bạn có thể sử dụng `console.trace()` để truy vết ngăn xếp với dữ liệu đã ghi trong Log

![](https://images.viblo.asia/c1c964af-5d74-43b5-9942-bf4e5d673c27.png)
# Tip #2 console.time() và console.timeEnd()
Nếu muốn quan tâm đến hiệu suất, bạn có thể tính thời gian chạy với `console.time()` và in ra bằng `console.timeEnd()`

![](https://images.viblo.asia/0cbaa559-2020-4297-9335-181e7e0f31d0.png)
# Tip #3 console.memory
Nếu vấn đề hiệu suất trở nên quan trọng hơn và bạn đang muốn tìm ra chi tiết sử dụng bộ nhớ, bạn có thể dùng `console.memory` để kiểm tra tình trạng vùng nhớ HEAP

![](https://images.viblo.asia/367004b2-47bb-4a63-ab82-c36bdc5bcc9a.png)
# Tip #4 console.profile(‘profileName’) & console.profileEnd(‘profileName’)
Đây không phải là một chuẩn, nhưng nó được hỗ trợ rộng rãi. Bạn có thể chạy hoặc dừng công cụ đánh giá hiệu năng của browser - performance profile, bằng cách chạy `console.profile(‘profileName’)` và sau đó là `console.profileEnd(‘profileName’)`. Điều này giúp bạn thiết lập chính xác những gì bạn muốn, và ngăn chặn những lần click chuột tốn thời gian.

# Tip #5 console.count(“STUFF I COUNT”)
Trong trường hợp 1 hàm hoặc code được gọi nhiều lần, bạn có thể dùng `console.count(‘?’) ` để đếm số lần hàm hoặc code đó được chạy đến.

![](https://images.viblo.asia/b13b4dfc-6ab3-412a-b5b2-a1799128db47.png)
# Tip #6 console.assert(false, “Log me!”)
Bạn có thể sử dụng `console.assert(condition, msg)` để in ra thông báo lỗi trên console, nếu condition có giá trị false.

![](https://images.viblo.asia/5c3c6270-fbbc-4e21-a060-ca59882c2a04.png)
# Tip #7 console.group(‘group’) & console.groupEnd(‘group’)
Khi in ra quá nhiều log, bạn có thể muốn nhóm chúng lại. Một cách hữu dụng đó là sử dụng `console.group()` & `console.groupEnd()`

![](https://images.viblo.asia/aef6b9bf-33b1-4c98-bac1-6cf0cdaf3498.png)
# Tip #8 String substitutions
Khi in ra log, bạn có thể cần kết hợp giá trị của một số biến. Bạn có thể dùng như sau.
VD: %s = string, %i = integer, %o = object, %f = float

![](https://images.viblo.asia/410d54a3-5e81-4679-b1a0-49ff538d9b26.png)

# Tip #9 console.clear()
Khi đã log quá nhiều, bạn muốn xóa đi, `console.clear()` là một giải pháp.

![](https://images.viblo.asia/5afbeb01-3f88-457e-ae1f-bed8508a009f.png)
# Tip #10 console.table()
Bạn có thể in 1 object thành 1 bảng trực quan với `console.table()` 

![](https://images.viblo.asia/99b16a16-5899-48c0-b2c8-9ecbf4a0629e.png)
# Tài liệu tham khảo 
https://medium.com/appsflyer/10-tips-for-javascript-debugging-like-a-pro-with-console-7140027eb5f6
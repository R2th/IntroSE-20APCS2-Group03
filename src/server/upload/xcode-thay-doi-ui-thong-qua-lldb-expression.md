# Mở đầu
Bạn là một nhà phát triển iOS, và bạn đang làm việc với rất nhiều UI trong một ứng dụng. Đôi khi, sếp của bạn hay QA, designer muốn bạn thay đổi màu sắc của một view hay một button cụ thể nào đó, bạn sẽ phải làm gì? Bạn sẽ phải mò vào codebase tìm mã màu của view đó, rồi bạn phải chạy lại ứng dụng để chắc chắn là view đó đã được đổi màu, có khi nào đen đủi bạn lại không thay đổi màu của view cần thay đổi mà lại thay đổi view khác không, điều này không hề dễ chịu chút nào đúng không?

Vậy có cách nào có thể thay đổi màu của một view mà không cần chạy lại ứng dụng không? Câu trả lời là có, trong bài viết này tôi sẽ giới thiệu các bạn thực hiện vấn đề bên trên mà không cần chạy lại ứng dụng, dó là sử dụng **LLDB expression**

# Demo
Chạy app trên iPhone Simulator, click vào nút pause trên toolbar ở chế độ debug như hình bên dưới.
![](https://images.viblo.asia/1c40bcf3-2a6c-4cd3-844b-87c35302bf49.png)

![](https://images.viblo.asia/5253e6f9-7fad-48c9-9269-3a658234488e.png)

sau đó sử dụng câu lệnh sau để print toàn bộ thông tin của các view có trên window:
```
po [[[UIApplication sharedApplication] keyWindow] recursiveDescription]
```

![](https://images.viblo.asia/9c6613e1-f29b-4516-8989-b992e9faaf2c.png)

Ở đây chúng ta muốn thay đổi màu của view nhỏ <UIView: 0x7f9dc8e0ca60; frame = (67 232; 279 197), với *0x7f9dc8e0ca60* là địa chỉ của nó trong memory, giờ chúng ta fetch nó từ bộ nhớ ra 
```
expression -- id $testView = (id)0x7f9dc8e0ca60
```

***expression*** có nghĩa là thực hiện lệnh sau và in ra kết quả, ở đây chúng ta gán địa chỉ bộ nhớ của view đến testView.

Bây giờ chúng ta sẽ thực hiện việc đổi màu của view, bằng cách sử dụng *0x7f9dc8e0ca60* trong testView mà chúng ta vừa fetch phía trên.
```
// set button's color to blue Color
expression -- (void)[$testView setBackgroundColor:[UIColor blueColor]]
```

và để kiểm tra sự thay đổi màu của view thì chúng ta sử dụng câu lệnh bên dưới mà không cần phải chạy lại app.
```
expression -- (void)[CATransaction flush]

```

Và giờ bạn có thể thấy màu của view đã thay đổi mà không cần phải chạy lại app, thật thú vị phải không nào?

![](https://images.viblo.asia/f7423db4-46e0-41d9-b9aa-d35c92178c7c.png)

![](https://images.viblo.asia/7f2d09b6-2de5-4891-a77b-a5f8b2aca1b7.png)

# Kết luận
Bài viết  cho thấy còn có một cách khác để xử lý giao diện người dùng với biểu thức **LLDB**. Nó sẽ giúp bạn tiết kiệm được thời gian để tìm ra chính xác control mà bạn cần sửa màu, mà không cần chạy lại app, điều này giúp bạn không ngại các trường hợp khó chịu khi liên tục phải đổi màu, vì đối với dân dev việc này rất nhàm chán :D :D.
Cám ơn các bạn đã đọc bài, bài viết được viết dựa trên nguồn [Medium](https://medium.com/ios-os-x-development/dynamically-modify-ui-via-lldb-expression-1b354254e1dd)
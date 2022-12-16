Thư viện yêu cầu (Requests library) là một mặt rất quan trọng của Python để tạo ra những yêu cầu HTTP tới một đường dẫn (URL) cụ thể nào đó.
Bài viết này nhằm hướng dẫn tạo yêu cầu POST tới một đường dẫn cụ thể, bằng cách sử dụng phương thức requests.post()

### Đầu tiên, cùng tìm hiểu POST là gì

POST là một phương thức yêu cầu được hỗ trợ bởi giao thức HTTP khi sử dụng Web. Thông thường, phương thức post sẽ đưa ra yêu cầu để máy chủ web (web server) chấp nhận thông tin được gửi trong nội dung tin nhắn yêu cầu (request message), mà đa phần là để lưu trữ nó.
Nội dung này sẽ được sử dụng khi upload file hoặc submit một web form nào đó.

### Cách tạo POST trên Python

Sử dụng hàm có sẵn để gọi post() theo cú pháp sau:

> requests.post(url, params={key: value}, args)

Ví dụ:

```
import requests

# Making a POST request
r = requests.post('https://httpbin.org / post', data ={'key':'value'})

# check status code for response received
# success code - 200
print(r)

# print content of request
print(r.json())

```

lưu thành file request.py và bắt đầu chạy. Kết quả sẽ ra như bên dưới:

![image.png](https://images.viblo.asia/68b92496-b651-4d7d-9ab7-ff1333c249da.png)


1. Lợi ích của phương thức POST
Bảo mật hơn phương thức GET, vì thông tin người dùng nhập vào sẽ không hiển thị trong log trên server.
Lượng dữ liệu truyền đi bởi phương thức POST sẽ lớn hơn

2. Hạn chế của phương thức POST
Lịch sử của POST không được lưu trên cache hoặc lịch sử duyệt web
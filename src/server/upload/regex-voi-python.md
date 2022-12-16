Như ở [bài viết trước](https://viblo.asia/p/regex-co-gi-thu-vi-07LKXWq85V4) mình đã giới thiệu một số khái niệm về regex cơ bản. Ở bài viết này mình sẽ giới thiệu đến các bạn việc sử dụng regex trong ngôn ngữ lập trình, ở đây là python. 

### 1. Thư viện
Regex sử dụng module re để làm việc trong python, module này là thư viện built-in trong python, bạn không cần phải cài đặt để sử dụng 

```
import re
```

### 2. Một số hàm 
#### 2.1. re.match
Cú pháp 
```
re.match(pattern, string, flags=0)
```

So khớp pattern với string với các flag tùy ý. Dưới đây là cú pháp cho hàm này.

```
pattern : Đây là chuỗn cần so khớp.
string : Đây là chuỗi để tìm kiếm pattern cón tồn tại trong đó không.
flags : Bạn có thể xác định các flag khác nhau bởi sử dụng toán tử |. Các modifier này sẽ được liệt kê ở bảng bên dưới.
```

Hàm re.match trả về 1 đối tượng nếu match thành công và trả về None nếu như thất bại 

### 2.2. re.search 
Cú pháp 

```
re.search(pattern, string, flags=0)
```

Hàm này thực hiện tìm kiếm chuỗi khớp trên 1 string và trả về các giá trị được so khớp 

### 2.3. re.split 
Cú pháp 

```
re.split(pattern, string, maxsplit=0, flags=0)
```

re.split trả về các ký tự được phân tách nhờ đoạn pattern
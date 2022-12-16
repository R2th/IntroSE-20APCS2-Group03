## 1. Issue
Đây là mội lỗi xảy ra khá thường xuyên do sự không tương thích giữa version `Java` bạn đang chạy và version `Java` mà thư viện bạn đang sử dụng.
Con số 55.0 ở trên chính là major version của `Java`, chúng ta có danh sách major version cho đến `Java 17` như sau:

> * Java 1.2 uses major version 46
> * Java 1.3 uses major version 47
> * Java 1.4 uses major version 48
> * Java 5 uses major version 49
> * Java 6 uses major version 50
> * Java 7 uses major version 51
> * Java 8 uses major version 52
> * Java 9 uses major version 53
> * Java 10 uses major version 54
> * Java 11 uses major version 55
> * Java 12 uses major version 56
> * Java 13 uses major version 57
> * Java 14 uses major version 58
> * Java 15 uses major version 59
> * Java 16 uses major version 60
> * Java 17 uses major version 61

Bug này có nghĩa rằng một vài `class` của thư viện cần được complied sử dụng `Java 11` nhưng bạn đang cố gắng compile với `Java 8`.

## 2. Solution
Chỉ cần downgrade thư viện xuống version `Java` tương thích - trong trường hợp này là `Java 8`. Tuy nhiên vấn đề xảy ra là trong môt dự án rất lớn, thời gian compile sẽ tương đối lâu, do đó chúng ta cần cách tiếp cận khác để kiểm tra được version `Java` mà thư viện chúng ta download về từ `maven` là tương thích với version `Java` mà project đang sử dụng bằng cách xem tham số `Build-Jdk` trong tập tin `MANIFEST.MF` như sau:

![image.png](https://images.viblo.asia/a9301125-f696-46c0-b2b8-e8521130e986.png)

## 3. Final thought
Đôi khi sẽ xảy ra vấn đề là dependency của một thư viện không tương thích với thư viện khác mà bạn đang sử dụng ví dụ như bạn thư viện đang dùng `opencsv:4.1.2` nhưng trong khi đó project bạn đang dùng version `opencsv:5.0`. Bạn cũng có thể check file `pom.xml` trong folder `META-INF` để kiểm tra và giải quyết vấn đề trên.
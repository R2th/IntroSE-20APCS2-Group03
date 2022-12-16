Trong bài viết này mình sẽ hướng dẫn sử dụng tool **jmap** để lấy profile của ứng dụng java đang chạy trên 1 máy remote và hiển thị kết quả trên tool JVisualVM để phân tích kết quả
Jmap là tool hỗ trợ lấy profile của java process. Có sẵn trong bộ jdk của java oracle hay có thể cài thêm trong **openjdk**
Như trong máy mình 
```
ldt@ldtpc:~$ whereis jmap
jmap: /usr/lib/jvm/oracle_jdk12/bin/jmap /usr/lib/jvm/oracle_jdk8/bin/jmap
```

Có thể cài đặt thêm nếu sử dụng openjdk, tương tự cho ubuntu
```
sudo yum install java-1.8.0-openjdk-devel-debug
```

Cách sử dụng khá đơn giản.
```
jmap -dump:live,format=b,file=/home/ldt/dump.hprof 12587
```
Trong câu lệnh trên mình thực hiện lấy profile cho process **12587** và lưu ở thư mục **/home/ldt/dump.hprof**

Có khá nhiều tool để view file dump.hprof mình sinh ra ở trên, trong bài này mình sẽ sử dụng tool JvisualVM tool có sẵn trong bộ Oracle JDK của mình. 
Ngoài ra, có thể download ở [đấy](https://visualvm.github.io/download.html)
```
ldt@ldtpc:~$ whereis jvisualvm
jvisualvm: /usr/lib/jvm/oracle_jdk8/bin/jvisualvm
```

Để import chọn File -> Load -> trong filters chọn Heap dumps
![](https://images.viblo.asia/9463e643-dc28-46ab-9c80-9130ae2160e6.png)

Sau khi Load dump file, quan sát 2 tab chín là Summary và Classes như trong hình 
![](https://images.viblo.asia/4c68fe97-b7d8-4d6f-808b-9df46ed5d55c.png)

Từ summary có thể hiển thị thông tin hệ thống bằng click vào **Show System Properties**  hay có thể xem thông tin về cách thread được tạo của ứng dụng tại thời điểm đó **Show Threads**

Từ tab classes mình có thể view rất nhiều thông tin thú vị
![](https://images.viblo.asia/16db15bf-ed4e-4b3c-ae02-6c264d5a4ec2.png)
Từ mục này ta có thể quan sát được tên từng object, số lượng và kích thước từng loại
Vì có quá nhiều object, mình sẽ quan tâm nhiều hơn đến cách object tạo ra từ ứng dụng của mình, 
Phía cuối có chức năng filter, mình sẽ filter theo  package mà mình tạo ra 
![](https://images.viblo.asia/85ff4026-5547-4d1e-a925-d2e91975a4f1.png)

Nếu cần tìm hiểu kỹ hơn về tool jvisualVM thì xem bài viết sau chi tiết hơn về tool này.

Cảm ơn đã đọc bài, nếu có câu hỏi cần trao đổi, hãy comment ở dưới.
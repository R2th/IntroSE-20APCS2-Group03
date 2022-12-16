# Giới thiệu VisualVM tool
VisualVm là 1 công cụ hữu ích giúp chúng ta quan sát thông tin của các ứng dụng **JAVA** chạy trên local hay trên các máy khác. 
VisualVM tích hợp rất nhiều tools: **Jmap, Jstack, JConsolem, Jstat và Jinfo**.
Giúp chúng ta quan sát, theo dõi (monitoring):
* Memory leaks
* Anlyze heap data,
* Monitor GC (garbage collector)
* CPU profiling

Nó cũng giúp cải tiến hiệu suất ứng dụng và đảm bảo bộ nhớ được sử dụng 1 cách tối ưu.
Chúng ta có thể quan sát  và phân tích **Thread** và sử dụng **Heap Dump** để phân tích các object tại thời điểm, giúp chúng ta biết được trạng thái hệ thống lúc bấy giờ.

VisualVM là **miễn phí**
# Hướng dẫn sử dụng
## Cài đặt
Lên trang chủ tải về. https://visualvm.github.io/
Mình dùng bản Standalone 
![](https://images.viblo.asia/d5da05a7-7511-4dc9-9783-d72dd6842232.png)

Download zip file về và giải nén ra để chạy file (tùy theo hệ điều hành) trong thử mục 
```
visualvm/bin
```
Nếu bạn sử dụng intellij thì có sẵn 1 plugin 
![](https://images.viblo.asia/36a468a4-0b6c-4e6d-b044-249943c3558e.png)

Sau khi cài xong thì bạn có thể thấy các button tích hợp sẵn trong VisualVM trong đó. Chúng ta có thể start VisualVM từ IDE hay bật lúc debug hay start ứng dụng. 
![](https://images.viblo.asia/b4dfa72b-0146-48bc-9e80-96414a37727e.png)


Đây là giao diện tổng quan của ứng dụng
![](https://images.viblo.asia/a8873161-cb8c-466e-8861-2d57ede7547d.png)

## Các chức năng trong VisualVM
1 Tool viết ra có rất nhiều tính năng, mình sẽ đi vào những tính năng chính mình hay dùng và thấy hiệu quả, nếu các bạn thấy tính năng nào hay mà mình đã bỏ qua thì comment cho mình biết.
### Applications: ở cửa sổ bên trái
Trong này chứa các ứng dụng, mình quan tâm 2 mục **Local** và **Remote**
* **Local**: Là các ứng dụng chạy trên JVM ở máy local (máy chạy VisualVM).
* **Remote**: Mình có thể connect đến 1 máy khác để theo dõi các ứng dụng chạy trên máy đó.
Ban đầu bạn phải chạy ứng dụng enable JMX remote và connect theo thông số JMX đó 

Khi chạy ứng dụng java thêm các options: Port 9010 là port jmx và ip 192.168.59.99 là ip máy remote
```
-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9010 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=192.168.59.99
```

và connect 
```
service:jmx:rmi:///jndi/rmi://192.168.59.99:9010/jmxrmi
```

Xem chi tiết hướng dẫn ở [đây](https://stackoverflow.com/questions/30069643/remote-monitoring-with-visualvm-and-jmx) 

Trong bài này mình tập trung vào Local và cách đọc, quan sát các tool, phân tích trạng thái 
Trong mục **Local** bạn sẽ chọn ứng dụng mà mình cần quan sát, trong ảnh của mình có 1 ứng dụng với package (com.examlple.demo)
![](https://images.viblo.asia/63322406-4002-4de1-8e02-4afa1b03a48d.png)

Sau khi chọn (double click)  nó sinh ra 1 tab bên phải 
![](https://images.viblo.asia/cb0709a0-722a-45fd-8df3-f4f787aa9e1f.png)
### Overview
![](https://images.viblo.asia/25428c49-7732-4e5a-8ec6-6f8c1381030b.png)
Có rất nhiều thông tin ở đây: PID, Host, Main class, Arguments...
Các thông tin JVM agruments, System Properties 

### Monitor 
Tab này rất hữu ích, mình sử dụng rất nhiều
![](https://images.viblo.asia/92f95189-901c-489f-b614-8eedec834eb0.png)

Chúng ta có thể quan sát trạng thái CPU, Memory, Classes, Threads 
Nó là Live Monitoring , chúng ta có thể quan sát các thông số, thao tác trên ứn dụng, xem các thao tác nào ảnh hưởng đến các thông số. 
Thao tác gì tốn CPU, tăng RAM, tăng Thread, số lượng Classes.

Ngoài ra chúng ta có thể Dump trạng thái tại thời điểm hiện tại để quan sát thông số tại thời điểm đó
![](https://images.viblo.asia/3cd630a9-a335-4a50-946e-15a33e6b37d6.png)

Tool cũng hỗ trợ compare 2 file dumps tại 2 thời điểm khác nhau, xem số lượng class, thread thay đổi. 
![](https://images.viblo.asia/c4ea2550-0629-4afd-b923-110685dfe541.png)

Như bên dưới
![](https://images.viblo.asia/b48cf2a4-7b4e-4257-a017-62a3cbf3c06f.png)


Có thể view theo Objects, có chức năng filter theo các class mình quan tâm ở cuối ảnh
![](https://images.viblo.asia/88cf58cf-a10c-437b-aef1-1f8134209783.png)

Sau khi filtered 
![](https://images.viblo.asia/c4bfcbd3-6fbb-45fe-9d09-06a917a08114.png)

Hay Threads
![](https://images.viblo.asia/f3bb2793-f4cc-4ba1-8975-7b871445d676.png)

### Threads 
![](https://images.viblo.asia/1264c32e-e2ca-4b49-99ad-a12a1b331238.png)

Nó liệt kê cho ta thấy số lượng threads và trạng thái các thread đó theo từng màu: Running, Sleeping, Wait, Park....

### Sampler 
Giúp chúng ta lấy mẫu CPU hay Memory tại từng thời điểm, không cần thiết lưu ra file, có thể paused và refresh đến thời điểm hiện tại của cả CPU và Memory 
Theo mình hiểu nó cũng giống như **Heap Dump**.
![](https://images.viblo.asia/2b7cc12b-1011-4b85-ac96-b8151f08dbd3.png)


### Profiler
![](https://images.viblo.asia/d90397f4-346e-49db-8134-bc0a2a321cfe.png)

* **CPU Profiler**: Quan sát thread nào xử lý request, thời gian là bao lâu, số lần được thực thi 
![](https://images.viblo.asia/53268f07-bff7-4f83-91fb-b988c16a4c5d.png)

* **Memory Profiler**: Kiểm tra bộ nhớ sử dụng, các classes nào được gọi, dung lượng bộ nhớ là bao nhiêu, số lượng object được allocated 
![](https://images.viblo.asia/83c23fa3-e6b8-4e93-8595-a54c574650a3.png)


* **JDBC Profiler**: Theo dõi các câu lệnh SQL được gọi 
Trong ứng dụng của mình, mình thực hiện 2 thao tác với databases 
```
Users users = userRepository.findById(10L).get();
Users users2 = userRepository.findById(11L).get();
```
![](https://images.viblo.asia/fac197ef-666e-4772-8be7-b231fd0a1251.png)



# Kết Luận
Bài cũng khá dài rồi, mục đích chính của bài này là giúp mọi người có cái nhìn tổng quan về ứng dụng VisualVM. Trong qúa trình làm việc cụ thể với nó, mọi người sẽ hiểu rõ hơn. 

Nếu cần trao đổi, thảo luận và góp ý thêm, hãy comment ở bên dưới bài viết
# Tài liệu tham khảo
* https://stackify.com/what-is-visualvm/
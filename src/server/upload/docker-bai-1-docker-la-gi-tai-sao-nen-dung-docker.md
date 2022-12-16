## Giới Thiệu
- Đây là chuỗi bài mình viết về Docker. Mong bạn đọc tham khảo và góp ý thêm để các bài viết được chính xác và đầy đủ hơn. Các bài viết mình tham khảo từ cuốn sách **Docker In Practice**. Và với bài đầu tiên này, mình sẽ đi vào mục tiêu, mục đích của việc học Docker là gì, ứng dụng nó vào đâu?  <br>
## Nội Dung<br>
### 1. Docker là gì ? <br>
- Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa. Docker cung cấp một lớp trừu tượng và tự động ảo hóa dựa trên Linux.  Docker là một nền tảng cho phép bạn " xây dựng, vận chuyển, chạy bất kỳ ứng dụng nào ở bất kỳ đâu". Docker sinh ra và đã giải quyết được các vấn đề khi chúng ta deploy một ứng dụng. <br>
### 2. Tại sao nên sử dụng Docker ? <br>
- Như bạn đã từng triển khai một phần mềm, việc cài đặt môi trường khá là vất vả, và rất vất vả nếu như có xung đột trong hệ thống. Ví dụ như làm khi làm Machine Learning, ta cần phiên bản python phù hợp với các thư viện của tensorflow, numpy... môi trường ở trên máy công ty, khác với môi trường trên máy cá nhân của bạn, và như vậy để làm việc tại nhà trên dự án công ty, bạn phải build lại môi trường. Và cứ như thế, rất mất nhiều thời gian và công sức.  <br>
- Với Docker, các cấu hình được phân biệt với quản lý tài nguyên và việc triển khai là không đáng kể. Chỉ cần đơn giản chạy lệnh `docker run` là tất cả mọi thứ đã sẵn sàng cho chúng ta trải nghiệm.   <br>
- Bạn không cần quan tâm, lo lắng về việc ứng dụng đó chạy trên hệ điều hành nào, như Red Hat machine, Ubuntu machine, CentOS VM, Window, MacOS... Tất cả đều có thể chạy được Docker một cách ngon lành.  :grinning: <br>
- Hình dưới là so sánh giữa mô hình truyền thống và sử dụng Docker khi triển khai ứng dụng. Ta thấy sự khác biệt rõ ràng khi làm việc với một ứng dụng vừa và lớn. 
![](https://images.viblo.asia/61dfe9c8-00b6-4354-b8c2-bd1b6afe3de0.png)
### 3. Các ứng dụng đặc trưng của Docker 
1. Replacing Virtual Machine 
   - Docker nhanh hơn VM và nhẹ hơn VM vì bản chất nó dùng chung hệ điều hành và không chia process và bộ nhớ như VM. Tuy nhiên có một nhược điểm ở đây là việc không phân tách này giả sử 1 container nào đó có thể chiếm quyền Root của hệ thống thì gây ra vấn đề bảo mật lớn. 
2. Prototyping software  
   - Khi ta có sẵn image của một ứng dụng nào đó, ta có thể chạy ngay lập tức mà không cần phải thiết lập môi trường phức tạp. 
3. Packaking software 
    - Đóng gói phần mềm nghĩa là các image của Docker không phụ thuộc vào phiên bản Linux phát hành, nó được xây dựng dựa trên linux nhưng độc lập. Do vậy việc đóng gói có thể cho chạy ở bất cứ nơi đâu và bất cứ lúc nào. 
4. Enabling a microservices architecture 
     - Có thể hiểu rằng, việc mỗi container chạy độc lập riêng với nhau và giao tiếp với nhau thì ta có một hệ thống microservice bằng Docker. Docker cho phép ta thực hiện kiến trúc một cách dễ dàng và đóng gói hơn. 
5. Modeling networks 
     - Khi ta làm việc với hàng 100 thậm chí là hàng 1000 Docker container trên một máy tính local. Việc phân bổ mạng là dễ dàng và ta có thể mô hình hóa nó như một mạng lưới thực tế. 
6. Reducing debugging overhead 
     - Docker loại bỏ các lỗi không cần thiết, như khi làm việc với nhiều teams khác nhau, việc cài đặt các thư viện khi code, các phiên bản có thể khác nhau và dẫn tới nhầm lẫn giữa các teams khi tích hợp.
7. Enabing continuous delivery ( CD ) 
    - Continuous delivery ( CD )  là một mô hình phân phối phần mềm dựa trên một đường ống , cho phép việc rebuild hệ thống khi sửa đổi bất kỳ dòng code nào đó được chuyển giao ngay tới sản phẩm hoặc server đang hoạt động, một cách tự động hóa các tiến trình. 
### 4. Các khái niệm quan trọng  
**image** : Là một bộ gồm các lớp files system và một số metadata. <br>
**layer** : Là một bộ các thay đổi đến files system. Tưởng tượng khi ta phải chạy hàng trăm container một lúc, việc copy lại các container chỉ khác biệt nhau một số thuộc tính dựa trên một base image khiến cho tiêu tốn cực kỳ nhiều bộ nhớ disk. Layer ra đời nhằm giải quyết vấn đề trên. Mình sẽ đi sâu vào layer ở bài viết tiếp theo.   <br>
**container** : Là một thực thể của image được thực thi. Chúng ta có thể chạy nhiều container từ 1 image. <br>
![image.png](https://images.viblo.asia/d8871969-4f04-402c-b4bb-0433337312e4.png)<br>

Ví dụ dưới thể hiện **layer** cho phép ta tùy chỉnh môi trường của hệ điều hành ubuntu phù hợp với từng thực thể của image. <br>
<br>
![image.png](https://images.viblo.asia/72eec2e4-0152-47cc-aa8a-c3c36991e425.png)
## Kết Luận
-  Thế là hết bài 1 , một cái nhìn không tổng quan lắm đúng không ạ :grinning:
-   Bạn đọc vui lòng comment góp ý cho mình và bổ sung thêm các nội dung giúp mình ạ.  
-  Bài tiếp theo mình sẽ hướng dẫn các cách tạo một image Docker. <br>
Bài 2 : Các cách xây dựng một Docker application cơ bản.
### **I. Load balancer là gì?**

- Load balancer là hệ thống phân bố lưu lượng truy cập giữa hai hay nhiều các máy chủ có cùng chức năng trong cùng một hệ thống giúp cải thiện hiệu suất và độ tin cậy của hệ thống nhờ khả năng giảm thiểu tối đa tình trạng một máy chủ bị quá tải và ngưng hoạt động.
- Load balancer là một thành phần quan trọng của cơ sở hạ tầng, giúp các máy chủ ảo hoạt động đồng bộ và hiệu quả hơn thông qua việc phân phối đồng đều tài nguyên.

### **II. Các hướng tiếp cận**

Hiện tại có 2 hướng tiếp cận chính là sử dụng phần mềm hoặc phần cứng.

1. Sử dụng phần cứng (Vertical Scaling):
    - Cách sử dụng phần cứng là các thiết bị chuyên dụng, tăng cường khả năng phục vụ của server bằng cách nâng cấp Memory, CPU, HDD, các mạch điều hướng trong thiết bị được thiết kế tối ưu cho việc điều hướng.
    - Ưu điểm: Cách này tiết kiệm rất nhiều thời gian và hầu như không thay đổi kiến trúc code cũng như mô hình mạng hiện tại bởi số lượng server không thay đổi.
    - Nhược điểm: Tuy nhiên, scale theo cách này không phải theo hướng tịnh tiến thẳng (linear) mà có thể chi phí theo hàm mũ và khả năng tùy biến không lớn.

![](https://images.viblo.asia/53567303-605d-4c87-aadc-a2628908d295.png)

2. Sử dụng phần mềm (Horizontal Scaling):
    - Cách thứ hai là bổ sung thêm máy tính vào mạng để tăng khả năng phục vụ của hệ thống, sử dụng các phần mềm và cài đặt lên các server trong mạng và làm nhiệm vụ điều hướng tới các server được chỉ định trong mạng khi có truy vấn từ ngoài mạng.
    - Ưu điểm: Cách này hiện được ưa chuộng hơn bởi không cần mua các thiết bị đắt đỏ và có thể tùy chỉnh hệ thống vì hầu hết là phần mềm nguồn mở.
    - Nhược điểm: Cần bổ sung thêm server hoặc thay đổi kiến trúc code cho phù hợp

![](https://images.viblo.asia/4086c312-90f9-422f-b36e-c841eb05c3bf.png)

### **III. Các thuật toán load balancer thông dụng**

Một số thuật toán thường được sử dụng là:
1. Round Robin:
    - Round Robin có nghĩa là các máy chủ sẽ được lựa chọn theo tuần tự.
    - Bộ load balancer sẽ chọn máy chủ đầu tiên trong danh sách của mình đối với yêu cầu đầu tiên, sau đó di chuyển xuống máy chủ tiếp theo trong danh sách theo thứ tự và lặp lại sau khi đi qua một vòng.
2. Least Connections: 
    - Load balancer sẽ ưu tiên chọn máy chủ ít kết nối nhất trước.
3. Source:
    - Với các thuật toán source, load balancer sẽ chọn máy chủ để sử dụng dựa trên một hash của IP nguồn của yêu cầu, chẳng hạn như địa chỉ IP của người truy cập.
    - Phương pháp này đảm bảo rằng một người dùng cụ thể sẽ luôn kết nối với cùng một máy chủ.

### **IV. Xây dựng load balancer với Ribbon và Spring Cloud**

1. Cấu hình load balancer trong file aplication.
```
say-hello.ribbon.eureka.enabled=false
say-hello.ribbon.listOfServers=localhost:8090,localhost:8091,localhost:8092
say-hello.ribbon.ServerListRefreshInterval=15000
```

2. Nếu bạn muốn thay đổi thay đổi danh sách listOfServers một cách linh động mà không cần phải build lại source, chúng ta chỉ cần thực hiện theo các bước sau:

- Bước 1. Tạo file my-config.properties với nội dung như sau:
    ```
    say-hello.ribbon.listOfServers=<list_of_host>
    ```
    Trong đó, *say-hello* là tên của *RibbonClient*, *<list_of_host>* là danh sách các địa chỉ mà chúng ta thực hiện điều phối, các nhau bởi dấu (,).  Ví dụ:
    ```
    say-hello.ribbon.listOfServers=localhost:8090,localhost:8091,localhost:8092
    ```
 
- Bước 2. Chạy file jar với lệnh sau:
    ```
    java -jar target/load-balancer-say-hello-0.0.1-SNAPSHOT.jar --spring.config.location=/path/of/my-config.properties
    ```
    - Spring vẫn sẽ sử dụng các cặp giá trị được khai báo trong file *application.properties*.
    - Nếu như trong file *my-config.properties* có những cặp giá trị trùng tên với file *application.properties*, nó sẽ sử dụng cặp giá trị trong file *my-config.properties*

### **V. Kết luận**

Trên đây là giới thiệu sơ lược về load balancer và cách xây dựng load balancer với Ribbon và Spring. Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về load balancer.

## **Cảm ơn đã theo dõi**
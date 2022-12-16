Hello các Bác, lại là em đây. Hôm nay đổi gió tý các bác nhỉ? Ko làm về seri FinTech nữa, nay em sẽ giới thiệu tới các bác 1 vấn đề mà có thể nói là "Đã quá cũ" với các bác roài.

- Loadbalance hay còn gọi là "Cân bằng tải". 
- Vậy cân bằng tải là gì? và tại sao ta lại cần nó?? 
- Nôm na là: Vào 1 ngày đẹp trời, các bạn nhận được 1 server khá khủng về cả về cấu hình lẫn lượng request tới nó. Sếp yêu cầu các bác phải tối ưu hóa việc sử dụng tài nguyên, tối đa hóa thông lượng, cũng như giảm độ trễ và đảm bảo các cấu hình chịu lỗi. Vậy là ý tưởng cân bằng tải ra đời. 
- Các bác có thể hiểu nôm na Cân bằng tải là xây dựng thêm 1 gateways đứng ở phía trước đảm nhiệm việc nhận request từ client và phân bố theo thuật toán tới các server backend phía sau. 
[](https://images.viblo.asia/e8a234f6-e3f6-4ea5-be63-f3519ce3c242.gif)

Cân bằng tải ra đời giải quyết 2 việc lớn:
> - Thứ 1: Đảm bảo hệ thống chạy ổn định, luôn avaiable (Khi 1 node trong hệ thống bị out of service thì các node còn lại vẫn chạy ổn định)
> - Thứ 2: Giảm thiểu lượng request đẩy vào 1 server sử lý.

Ngày nay có rất nhiều công nghệ giúp thực hiện việc Loadbalance và trong bài viết này, em sẽ viết về Nginx các bác nhé.

## Đẩu tiên, Nginx là gì? 

NGINX, đọc là “engine-ex,”  là một phần mềm web server mã nguồn mở nỗi tiếng. Ban đầu nó dùng để phục vụ web HTTP. Tuy nhiên, ngày nay nó cũng được dùng làm reverse proxy, HTTP load balancer và email proxy như IMAP, POP3, và SMTP.

NGINX xuất bản chính thức vào tháng 10 năm 2004. Nhà sáng lập của phần mềm này là Igor Sysoev, triển khai dự án từ năm 2002 để giải quyết vấn đề C10k. C10k là giới hạn của việc xử lý 10 ngàn kết nối cùng lúc. Ngày nay, có nhiều web server còn phải chịu nhiều kết nối hơn vậy để xử lý. NGINX sử dụng kiến trúc hướng sự kiện (event-driven) không đồng bộ (asynchronous). Tính năng này khiến NGINX server trở nên đáng tin cậy, tốc độ và khả năng mở rộng lớn nhất.

Vì khả năng mạnh mẽ, và để có thể xử lý hàng ngàn kết nối cùng lúc, nhiều website có traffic lớn đã sử dụng dịch vụ NGINX. Một vài trong số những ông lớn công nghệ dùng nó là Google, Netflix, Adobe, Cloudflare, WordPress, và còn nhiều hơn nữa.

1 số loại thuật toán được sử dụng như: 

### 1. Round Robin
    
Là thuật toán luân chuẩn vòng, các máy chủ sẽ được xem ngang hàng và sắp xếp theo một vòng quay. Các truy vấn dịch vụ sẽ lần lượt được gửi tới các máy chủ theo thứ tự sắp xếp

Ví dụ:
- Cấu hình một cụm Cluster bao gồm 03 máy chủ: A, B, C.
- Yêu cầu dịch vụ thứ nhất sẽ được gửi đến máy chủ A.
- Yêu cầu dịch vụ thứ hai sẽ được gửi đến máy chủ B.
- Yêu cầu dịch vụ thứ ba sẽ được gửi đến máy chủ C.
- ...
- Yêu cầu dịch vụ thứ tư sẽ lại được gửi cho máy chủ A
                
### 2. Thuật toán Weighted Round Robin

Tương tự như kỹ thuật Round Robin nhưng WRR còn có khả năng xử lý theo cấu hình của từng server đích. Mỗi máy chủ được đánh giá bằng một số nguyên (giá trị trọng số Weight – mặc định giá trị là 1). Một server có khả năng xử lý gấp đôi server khác sẽ được đánh số lớn hơn và nhận được số request gấp đôi từ bộ cân bằng tải

Ví dụ:
- Cấu hình một cụm Cluster bao gồm 03 máy chủ: A, B, C. với khả năng xử lý của máy A lơn hơn máy B và lớn hơn máy C. Chúng ta thiết sẽ lập trọng số weight cho các server A, B, C lần lượt là 4,3,2.
- Thứ tự điều phối luân phiên các request sẽ là AABABCABC
- Yêu cầu dịch vụ thứ nhất sẽ được gửi đến máy chủ A.
- Yêu cầu dịch vụ thứ hai sẽ được gửi đến máy chủ A.
- Yêu cầu dịch vụ thứ ba sẽ được gửi đến máy chủ B.
- Yêu cầu dịch vụ thứ tư sẽ lại được gửi cho máy chủ A….
                
Nhược điểm:
- Sử dụng thuật toán này có thể dẫn đến việc mất cân bằng tải động nếu như tải của các request liên tục thay đổi trong một khoảng thời gian rộng
- Ví dụ các yêu cầu xem video hoặc tải các file có dung lượng lớn xen kẽ với các yêu cầu đọc thông tin,…). Như vậy nó sẽ dồn request tới 1 server có trọng số Weight cao và làm mất khả năng load balancing.
- Trong một khoảng thời gian ngắn, hoàn toàn có khả năng phần lớn các yêu cầu có tải cao sẽ được chuyển hướng đến một server.
                
### 3. Thuật toán Dynamic Round Robin (DRR)

- Thuật toán DRR hoạt động gần giống với thuật toán WRR, điểm khác biệt là trọng số ở đây dựa trên sự kiểm tra server một cách liên tục, do đó trọng số liên tục thay đổi.
- Đây là thuật toán động (các thuật toán ở trên là thuật toán tĩnh), việc chọn server sẽ dựa trên rất nhiều khía cạnh trong việc phân tích hiệu năng của server trên thời gia thực (ví dụ: số kết nối hiện đang có trên các server hoặc server trả lời nhanh nhất, …).
- Thuật toán này thường không được cài đặt trong các bộ cân bằng tài đơn giản, nó thường được sử dụng trong các sản phẩm cân bằng tải của F5 Network.

### 4. Thuật toán Fastest.
Đây là thuật toán dựa trên tính toán thời gian đáp ứng của mỗi server (response time), thuật toán này sẽ chọn server nào có thời gian đáp ứng nhanh nhất. Thời gian đáp ứng được xác định bởi khoảng thời gian giữa thời điểm gửi một gói tin đến server và thời điểm nhận được gói tin trả lời.

Việc gửi và nhận này sẽ được bộ cân bằng tải đảm nhiệm, dựa trên thời gian đáp ứng, bộ cân bằng tải sẽ biết chuyển yêu cầu tiếp theo đến server nào.
            
Ví dụ:
- Khi truy cập vào trang youtobe.com, nếu IP của người dùng đến từ Việt Nam, yêu cầu sẽ được chuyển vào server Việt Nam xử lý. Điều này sẽ tiết kiệm khá lớn cho lượng băng thông quốc tế và cải thiện tốc độ đường truyền.
- Thuật toán fastest thường được dùng khi các server ở các vị trí địa lý khác nhau. Như vậy người dùng ở gần server nào thì thời gian đáp ứng của server đó sẽ nhanh nhất, và server đó sẽ được chọn để phục vụ.
    
### 5. Thuật toán Lest Connection (LC)
Các request sẽ được chuyển vào server có ít kết nối nhất trong hệ thống. Thuật toán này được coi như thuật toán động, vì nó phải đếm số kết nối đang hoạt động của server.

Với một hệ thống có các server gần giống nhau về cấu hình, LC có khả năng hoạt động tốt ngay cả khi tải của các kết nối biến thiên trong một khoảng lớn. Do đó nếu sử dụng RC sẽ khắc phục được nhược điểm của RR.
            
Nhìn bên ngoài có vẻ như LC hoạt động tốt khi các server có cấu hình biến thiên khác nhau, tuy nhiên trên thực tế đều đó là không đúng.

Nhược điểm:
- Trạng thái TIMVE_WAIT của TCP thường được đặt là 2 phút, trong 2 phút đó có một server bận rộn có thể nhận hàng chục ngàn kết nối liên tục.
- Giả sử server A có khả năng xử lý gấp đôi server B, server A đang xử lý hàng ngàn những yêu cầu và giữ những yêu cầu này trong trạng thái TIME_WAIT của TCP. Trong khi đó server B cũng phải xử lý như server A nhưng vì cấu hình server B thấp hơn nên sẽ chậm hơn rất nhiều. Như vậy thuật toán LC hoạt động không tốt khi các server có cấu hình khác nhau.
            
## II. Demo loadbalance sử dụng Nginx:
            
B1. Thực hiện down và install nginx bằng việc sử dụng brew nhé các bác.
            
-  Install: brew install nginx
-  Để run nginx thực hiện: sudo nginx
-  Mở trình duyện test thử các bác nhé: http://localhost:8080
            
B2. Thực hiện tạo 1 application backend demo. Và thực hiện run trên 2 port khác nhau.
            
- Mình sử dụng spring boot và run trên 2 port 9876 và 9875 nhé các bác.
            
B3. Mở file nginx.conf thực hiện cấu hình.
![](https://images.viblo.asia/5d7f7777-3f6d-406d-aaad-f9349c9a8eec.png)

Thực hiện thêm đoạn config sau: 
```
upstream backends {
         server localhost:9876;
         server localhost:9875;
}
```

Trong đó: `localhost:9876`; và `localhost:9875` là 2 port application đang run.

Trong tag location:

```
location / {
         proxy_pass http://backends;
     # root   html;
     # index  index.html index.htm;
}
```

B4: Thực hiện run nginx và test thử các bác nhé!
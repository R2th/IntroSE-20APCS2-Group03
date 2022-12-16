Trong bài đầu tiên này, chúng ta cùng tìm hiểu về AWS Well-Architected With 6 Pillar - Kiến trúc tối ưu với 6 trụ cột, <br/>
Nói đến điện toán đám mấy, khi chúng ta cần một hệ thống tối ưu thì chúng ta cần đảm bảo các yếu tố sau đây:
1.  Ngừng việc phán đoán về khả năng cần thiết cho các tài nguyên cho product, thay vào đó chúng ta có thể sử dụng auto scaling, hoặc scale (khả năng mở rộng) dựa theo nhu cầu mà ta muốn.
2.  Kiểm thử hệ thống dựa vào khả năng mở rộng của sản phẩm. 
<br/>Chẳng hạn trên CSHT cloud chúng ta có thể tạo tài nguyên bao nhiêu tùy thích một cách nhanh chóng
4. Tự động tạo một kiến trúc thử nghiệm dễ dàng,<br/> Cloud Formation là một ví dụ điển hình, bởi vì nếu khi chúng ta cần IaaS (infrastructure as a service) , chúng ta có thể dễ dàng tạo nó bởi nhiều tài khoản khác nhau (accounts) hoặc bởi những vùng khác nhau (AZs)
5.  Cho phép phát triển hệ thống <br/>
    * Thiết kế dựa trên sự thay đổi về yêu cầu. Chẳng hạn khi ta triển khai từ máy trạm sang cloud, và đổi lại bằng cách sử dụng kiến trúc serverless.
6.  Điều hướng hệ thống sử dụng dữ liệu
7.  Cải thiện qua các trò chơi hằng ngày, 
<br/> Như việc chúng ta tạo test cho hệ thống và cải thiện hệ thống tốt hơn. <br/>
<br/> 
**Thuật ngữ**

|  Viết tắt |  Giải thích |
| -------- | -------- |
| CSHT     | Cơ sở hạ tầng     |


### I - Các nguyên tắc thiết kế hệ thống 
**1. Scalability: vertical & horizontal**  <br/>  Khả năng mở rộng theo chiều đứng và theo chiều ngang.<br/>
**2. Disposable Resource**  <br/> Tài nguyên sẵn có - server của bạn phải sẵn có & dễ dàng thiết lập, cần đảm bảo về việc backup data & backup những thiết lập. <br/>
**3. Tự động**: Serverless, Iaas, Auto Scaling.<br/>
**4. Loose Coupling**<br/>  Chẳng hạn như kiến trúc monolith càng ngày càng lớn, chúng ta cần break down nó thành các thành phần nhỏ hơn như mircoservices,...<br/>
**5. Phải là service, không phải là server**<br/>  Chẳng hạn ngoài việc sử dụng EC2, chúng còn dùng chúng để quản lý service, database, serverless, ..v..v..<br/>

### II - [IMPORTANT] AWS Well-Architected và sáu tính chất cần đảm bảo
1. Tính vận hành xuất sắc - **Operational Excellence Pillar**
2. Tính bảo mật - **Security Pillar**
3. Tính độ tin cậy - **Reliability Pillar**
4. Tính hiệu quả năng suất - **Performance Efficiency Pillar**
5. Tính tối ưu hóa chi phí - **Cost Optimization Pillar**
6. Tính tính bền vững - **Sustainability Pillar**

Chúng ta không thể đảm bảo được những tính chất trên một cách toàn diện, hoặc có thể nó có thể thay thế lẫn nhau được, vì nó là một sức mạnh tổng hợp.

Để đi tìm hiểu sâu về các tính chất của Một Kiến trúc xuất sắc là như thế nào, mời các bạn đón đọc các bài tiếp theo trong Seri [Tóm lược về Kiến trúc của AWS với 6 trụ cột](https://viblo.asia/p/seri-kien-truc-aws-bai-1-gioi-thieu-ve-kien-truc-toi-uu-aws-aWj53mmoZ6m) nhé

Nguồn: <br/>
https://aws.amazon.com/vi/architecture/well-architected/?nc1=f_ls<br/>
Lab OPERATIONAL EXCELLENCE<br/>
https://www.wellarchitectedlabs.com/operational-excellence/ <br/>
Lab security:<br/>
https://www.wellarchitectedlabs.com/security/
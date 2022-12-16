Trước đây, khi chúng ta muốn lưu trữ các dịch vụ của website hoặc tạo một game server thì ta cần chuẩn bị máy chủ  vật lý , cơ sở hạ tầng các kiểu để setup nó.Tuy nhiên ngày nay với sự phát triển vượt bậc của công nghệ đám mây thì chúng ta không cần  làm điều đó. Hôm nay mình sẽ giới thiệu về Google Compute Engine (GCE), nó là service của Google Cloud Platform (GCP) giúp ta set up 1 server ảo để thực hiện công việc trên.

### A. Giới thiệu
Google Cloud: hay còn gọi là Google Cloud Platform (GCP) chính là một nền tảng của kỹ thuật điện toán đám mây cho phép bạn có thể xây dựng, phát triển và hoạt động các ứng dụng của mình trên hệ thống phần mềm do google tạo ra. Các ứng dụng rất phổ biến hiện nay được mọi người sử dụng rất nhiều như: Trình duyệt Chrome, ứng dụng bản đồ Google Map, Google Apps, kênh Youtube…
GCE: chính là 1 service của GCP cho phép bạn xây dựng 1 máy chủ ảo trên nền tảng của  google, từ đó bạn có thể xây dựng và phát triển ứng dụng của bạn trên đó.
### B. Google Compute Engine
#### 1. Machine Type: 
GCE cung cấp 3 loại máy ảo (VM) , tùy thuộc vào nhu cầu sữ dụng mà chúng có thể chọn một loại máy ảo sao cho phù hợp và tiết kiệm
##### a. On-demand:
- Bên cạnh AWS và Azure thì chỉ có Google cloud cho phép bạn có thể tùy chỉnh cấu hình phần cứng, đính kèm card màn hình.
- Chi phí: Thì GCP có cơ chế giảm giá đối với khách hàng chạy VM liên tục đạt 730h/tháng thì sẽ được discount 30%. Nếu có cam kết thời gian sữ dụng VM với Google thì sẽ được discount thêm, upto 70%
- Google có 1 số loại tên máy chủ như sau: 
    + General purpose(E2, N1, N2, N2D) machines: sử dụng khi bạn muốn xây dựng 1 con website, lưu trữ database bình thường thì bạn chọn VM N1
    + Compute optimized (C2) machines: nếu bạn yêu cầu sử dụng các hệ thống có CPU như training model, machine learning 
    + Memory optimized (M2) machines: nếu bạn yêu sữ dụng  hệ thống có memory cao
    + Accelerator optimized (A2) machines: nếu bạn cần hệ thống có năng lực xử lí về AI, machine learning 
    
    ![image.png](https://images.viblo.asia/202d68bc-b69f-4b3e-a87b-8ca822ff7726.png)
#####  b. Preemtible VM:
- Các tính năng của máy chủ on-demand thì đều được hổ trợ ở  Preemtible VM
- Ngoài ra nó còn có 1 số đặc điểm khác:
    + Có giá rẽ hơn On-demand VM 80%
    + Phù hợp cho khách hàng tạo 1 loạt máy chủ sữ dụng để xử lí 1 số tác vụ trong khoảng thời gian ngắn.Bởi vì  Preemtible  VM chỉ sống trong vòng 24h, sau 24h thì Google sẽ thu lại và bạn sẽ mất con máy chủ ấy đi. 
##### c. Sole tenant node:
- Các tính năng của máy chủ on-demand thì đều được hổ trợ ở  Sole tenant node
- Sử dụng cho 1 số khách hàng có yêu cầu security cao.
- Thông thường 1 con server của Google sẽ thiết kế theo kiểu con VM của bạn sẽ chạy chung với con VM của khách hàng khác trên 1 con máy chủ.Tuy nhiên Google đã đãm bảo các vấn đề liên quan đến vấn đề security, có nghĩa là con VM của khác hàng này không thể access vào con VM của khách hàng khác
- Khách hàng muốn con VM của họ chạy trên 1 con máy chủ riêng biệt thì lúc đó ta sẽ sữ dụng loại VM sole tenant node
- Ngoài ra nó còn giúp bạn đem những license của bạn bên phía window lên Google.
- Ví dụ: ở data center mình có sữ dụng window server mà window server của mình có version thì bạn có thể đem license đó lên GCE để sử dụng

![](https://images.viblo.asia/af3facdf-d176-44b8-b09f-7b5de591f3e4.png)
#### 2. VM images
GCE hiện tại đang hổ trợ các hệ điều hành phổ biến như Linux, Window hay là các hệ điều hành đặc biệt dành cho enterprise như là Red Hat, SAP 
+ Đối với Linux thì Google sẽ hỗ trợ: CentOS, Ubuntu, Debian, Container-OS
+ Đối với Window thì Google sẽ hỗ trợ: Window server trải dài từ phiên bản 2008 => 2019
+ Đối với khách hàng muốn sử dụng SQL server thì có thể cài đặt trên compute engine
+ Tất cả các hệ điều hành bạn chỉ cần click chuột thì Google sẽ tự động cài đặt hết cho bạn 

![image.png](https://images.viblo.asia/420743c6-dca2-495d-a5ea-13e77bb75a51.png)
#### 3.  Persistent disk: 
- Google đang cung cấp 4 loại  persistent disk
    + Standard Persistent Disk HDD: size của HDD càng lớn thì tốc độ đọc ghi của nó trên Google sẽ càng cao
    + Standard Persistent Disk SSD
    + Local SSD: là 1 cái SSD vật lý mà Google gắn vào con máy chủ ảo của bạn
    + Local NVMe
- Tính năng của persistent disk 
    + Snapshot: cho phép bạn đặt lịch để backup data vào thời điểm nhất định
        * Lần backup đầu tiền thì toàn bộ data sẽ được backup hết
        * Lần backup thứ 2 thì những liệu mới được phát sinh Google mới backup chứ không backup hết lại toàn bộ
    + Auto encryption: Data được lưu trữ trên persistent disk của Google thì sẽ được tự động mã hóa
    + Share storage: Cho phép bạn thiết lập 1 ổ đĩa persistent disk với role read only, và share cho nhiều VM khác, thì các VM đó có thể try cập vào ổ đĩa đã được share
    + Online disk resize: cho phép thay đổi dung lượng disk thông qua giao diện
    
 ![image.png](https://images.viblo.asia/c029618e-7953-4844-9c09-65cdb5dd743e.png)
#### 4. Cloud GPUs vs TPU
Hiện tại Google đang cho phép attach card màn hình vào compute engine 
- GPUs Google hổ trợ: 

![](https://images.viblo.asia/f478bd14-abc8-463b-a303-9fce2bb830fe.png)
- Google tự thiết kế ra 1 con chip TPU phục vụ cho xử lý AI& Machine Learning

![](https://images.viblo.asia/59baa1d6-efba-496e-8bc7-2db65166c9a4.png)
### C. Lợi ích của việc sữ dụng GCE
For Bussiness: 
- Giá: giá cả thì cạnh tranh so với các dịch vụ cloud khác 
- VM chạy trên cơ sở hạ tầng của Google nên về cơ chế bảo mật sẽ được hổ trợ tối đa
- Khả năng mở rộng linh động (chỉ cần thông qua 1 vài cú click chuột)
- Khi Google maintenance hạ tầng của họ thì các VM của bạn vẫn hoạt động bình thường
- Khả năng lưu trữ lên đến 257TB và có tốc độ đọc ghi cao

![](https://images.viblo.asia/6ce7b843-526c-40d9-b696-152e54cb5953.png)
For Technical
- Giao diện thân thiện, support trên UI và cả terminal
- Cho phép cấu hình VM 1 cách dể dàng thông qua giao diện
- Preemtible VM: giúp tiết kiệm chi phí lớn
- Tích hợp các product service liên quan đến analysis dể dàng
- Security: phân quyền port, ip , user có thể truy cập

![](https://images.viblo.asia/2691deb1-8b83-40e1-84f5-f6a101743a52.png)
### D. Demo
Sau đây là tới phần demo để tạo VM trên GCE
B1. Đầu tiên bạn truy cập vào link dưới đây: https://console.cloud.google.com/
B2. Bạn vào Computer Engine => VM instances => Create instances. 
B3. Sau đó bạn chỉ cần cấu hình VM theo nhu cầu sử dụng của bản thân, sau đó click vào create là xong

![image.png](https://images.viblo.asia/ab803e2a-2abe-4c2c-9f48-e27e2e30fa49.png)
Sau khi tạo xong thì bạn sẽ thu được kết quả như sau:

![image.png](https://images.viblo.asia/263b40c4-e449-4c00-bfc5-7e383a554cb3.png)
### KẾT LUẬN
Trên đây là quá trình vắn tắt các tính năng, lợi ích khi sử dụng Google Compute Engine. Từ đó bạn có thể xem xét như cầu của mình để sử dụng GCE hiệu quả và tiết kiệm nhất

``` Happy coding ! ```
#### Tài liệu: 
Create account GCP: https://cloud.google.com/apigee/docs/hybrid/v1.1/precog-gcpaccount
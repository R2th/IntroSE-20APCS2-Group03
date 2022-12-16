Kubernetes (K8S) trở nên quá phổ biến ở thời điểm hiện tại, ai cũng nói về nó. 
Tuy nhiên để sử dụng thì không hề dễ ràng. 
Trong bài hôm nay mình sẽ không đi quá nhiều vào các định nghĩa, mà đi thẳng vào thực tế để mọi người dễ hình dung. 
Các bài viết tiếp theo mình sẽ đi chi tiết từng chi tiết của từng steps.

Mình sẽ sử dụng K8S của Google Cloud, nên mọi người cần có 1 tài khoản google cloud với (300$ miễn phí). Làm theo hướng dẫn này https://cloud.google.com/free/docs/gcp-free-tier/#free-trial

Bước 1 tạo 1 cluster https://console.cloud.google.com/kubernetes/list
vào link này, nhấn vào create để tạo cluster, chọn loại **Standard**
![](https://images.viblo.asia/5142c6cc-becf-4cc7-8cca-72d7ebd6d3cc.png)

Đặt tên cluster, các thông số khác để mặc định, sau này sẽ tìm hiểu chi tiết.

Chờ khoảng 5 phút, google cloud sẽ tạo cluster cho bạn.

Như vậy mình đã tạo xong 1 K8S cluster. (google đã làm hết, việc của mình là sử dụng để triển khai hệ thống lên đó).

Bước tiếp theo là triển khai 1 ứng dụng lên đó.
Trong ví dụ này mình sẽ sử dụng 1 images sẵn có trên repository của google cloud **nginx:latest** (trong thực tế, mình sẽ phải build docker image và đẩy lên).
quay về tab clusters. chọn deploy
![](https://images.viblo.asia/60f7c243-8e74-4d6d-a653-6029906551d7.png)

Nhấn continue và chọn deploy là xong.

Sau khi deploy xong thì mặc định hệ thống sẽ tạo cho mình 3 Pods 

![](https://images.viblo.asia/1ce404b5-4b43-4e19-a08d-7bd3187fce10.png)

Trên mỗi Pod sẽ có 1 container chạy, xem chi tiết của deployment ta sẽ thấy
![](https://images.viblo.asia/e74dc109-a31c-4647-b2d9-0467429e108e.png)


Muốn truy cập được từ bên ngoài, mình sẽ phải tạo thêm 1 service, nó có tác dụng như 1 revert proxy. 

Click vào **Expose** để thực hiện expose ra bên ngoài để có thể truy cập.
![](https://images.viblo.asia/ea973c1c-f82a-45e5-bcd4-1955f53669aa.png)

Có 2 textbox cần fill, vì nginx của mình chạy port 80 (Target Port). 
Ta muốn client truy cập vào port 8080 (Port). 
Xem chi tiết ảnh phía trên.

Sau khi tạo xong service, click vào **Service & Ingress** kết quả như bên dưới.
![](https://images.viblo.asia/336e4b5e-0e0e-4870-9cd8-366b78e3934e.png)

Endpoint chứa thông tin của public IP và port, lúc này bạn đã thành công truy cập vào web site của mình.

Bài này viết rất đơn giản, những thao tác đơn giản nhất để có thể thực hành. 
Trong các bài viết tiếp theo mình sẽ xử lý giúp các bạn có thể custom được K8S. 
* Phân biệt kỹ hơn về **Standard** và **Autopilot**
* AutoScaling , config các tham số, khi nào thì hệ thống tự động scale
* Tự build và sử dụng image của riêng mình, đẩy lên Google cloud repository
* Thay vì sử dụng UI, người dùng có thể sử dụng cloud shell hoặc Commandline trên chính máy local. 
* Sử dụng YAML để config deploy, services.
...
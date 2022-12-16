*Dịch từ bài viết [《図解》いまさら聞けないクラウド用語： SaaS、PaaS、IaaSってどういう意味？そしてその違いとは？](https://data.wingarc.com/saas-paas-iaas-11087)*

Chắc hẳn mọi người đều đã nghe đến từ Cloud, tuy nhiên Cloud nghĩa là gì? Cloud viết đầy đủ là Cloud computing, chỉ đến việc ứng dụng được sử dụng thông qua internet mà không phải trên máy tính thông thường.

Cloud có rất nhiều dịch vụ, tuy nhiên, dựa vào cơ chế hoạt động, có thể chia Cloud thành 3 loại là SaaS, PaaS và IaaS.

Vậy thì SaaS là gì? PaaS là gì? IaaS là gì? Bài viết này được viết nhằm mục địch giới thiệu về các khái niệm này

## 1. SaaS là gì?
SaaS là viết tắt của cụm từ Software as a Service.

SaaS dùng để chỉ phần mềm được cung cấp trên Cloud. Phần mềm không được cài đặt ở phía người dùng mà bên cung cấp sẽ vận hành và cung cấp các tính năng của phần mềm tới người dùng thông qua internet. Có thể hiểu một cách đơn giản là thứ mà bạn vẫn mua dưới dạng sản phẩm đóng gói sẵn giờ đây có thể được sử dụng qua internet.

Ví dụ tiêu biểu là Gmai - một mail service, các blog service, Salesforce, v.v. Mục đích của việc này là ta có thể lập tức sử dụng được ứng dụng, nghĩa là tính thuận tiện cao. Tuy nhiên, kèm với đó là bất lợi khi bạn không thể tự do customize ứng dụng theo ý mình. Nếu đang tìm kiếm một chương trình mà bạn có thể tự kiểm soát, hãy sử dụng IaaS (mà không phải PaaS mà tôi sẽ thuyết minh sau đây).

## 2. PaaS là gì?
PaaS là viết tắt của Platform as a Service. 

PaaS dùng để chỉ dịch vụ cung cấp các thành phần để vận hành application software như data base hay môi trường chạy chương trình, v.v. Ưu điểm của việc sử dụng PaaS là người dùng chỉ cần chuẩn bị program mà thôi. Tuy nhiên, data base setting và môi trường chạy chương trình bị giới hạn, nên việc phát triển phần mềm cũng bị bó hẹp theo. Thời gian và công sức cho việc phát triển từ infra được tiết giảm nhưng PaaS chỉ phù hợp với trường hợp bạn muốn customize chương trình của mình ở một mức độ nào đó. Google Apps Engine và Microsoft Azure là PaaS.

## 3. IaaS là gì?
IaaS là viết tắt của Infrastructure as a Service.

IaaS dùng để chỉ hình thái dịch vụ cung cấp infa cần thiết cho việc vận hành hệ thống thông tin như server ảo, hard disk, firewall thông qua internet. Khác với SaaS và PaaS, độ tự do của IaaS rất cao, người dùng có thể tùy ý chọn lựa Spec của Hardware và OS. Tuy nhiên, để lựa chọn người dùng cần có tri thức về OS và Hardware, Network. Ngoài ra cũng cần phải nghĩ đến biện pháp bảo mật.

Ví dụ tiêu biểu về IaaS là Google Compute Engine hay Amazon Elastic Compute Cloud, v.v.

*(lược bỏ phần thuyết minh về lựa chọn SaaS/PaaS/IaaS dựa vào mục đích sử dụng và điểm khác nhau giữa IaaS và VPS)*
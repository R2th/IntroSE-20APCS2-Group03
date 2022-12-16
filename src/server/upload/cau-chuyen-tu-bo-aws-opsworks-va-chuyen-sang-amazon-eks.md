Vì sao chúng tôi từ bỏ AWS OpsWorks và chuyển sang Amazon EKS? 
> Cùng tìm đọc thêm bài viết tại đây: https://pixta.vn/cau-chuyen-tu-bo-aws-opsworks-va-chuyen-sang-amazon-eks 

Tôi là Lân từ team SRE - Pixta Việt Nam đây. Hôm nay tôi sẽ giới thiệu tới các bạn cách mà [**Fotowa**](https://fotowa.com/) - một nền tảng cho phép người dùng đặt lịch hẹn chụp ảnh cùng nhiếp ảnh gia chuyển nền tảng cơ sở hạ tầng từ AWS Opswork (Opsworks) sang Amazon EKS (EKS) nhé!

## **Lý do “quay mặt đi” với AWS OpsWorks và lựa chọn Amazon EKS**
Dưới đây là bốn lý do team lựa chọnEKS thay vì sử dụng Opworks:
### 1. Tạo môi trường tốt nhất cho các cải tiến mới và cập nhật các tính năng liên tục
OpsWorks là một nền tảng tự động hóa cấu hình máy chủ bằng cách sử dụng các công cụ quản lý cấu hình Chef và Puppet. Fotowa đang sử dụng ngôn ngữ lập trình chính là Ruby, với khả năng quản lý cấu hình cùng với cơ sở hạ tầng hạn chế. Đây chính là vấn đề khiến nó trở thành một trở ngại  khi muốn cải tiến cũng như bổ sung các chức năng mới một cách liên tục và nhanh nhất. 

Do đó, với mục đích giúp cho fotowa có thể nâng cấp linh hoạt các ngôn ngữ phát triển, EKS được sử dụng để làm platform thực thi hoá container. EKS cho phép chúng ta chạy [Kubernetes (gọi tắt là k8s)](https://kubernetes.io/docs/concepts/overview/) trên AWS mà không cần phải xây dựng và duy trì control plane. Thêm vào đó, EKS có thể vận hành dễ dàng hơn tại Tokyo. 

### 2. Giảm thiểu và tối ưu hoá công việc deploy các ứng dụng
Đối với OpsWorks, công việc triển khai ứng dụng được thực hiện từ bảng console quản lý. Đây là một nhược điểm cần phải khắc phục trong thời gian sớm nhất. Ngoài ra, các công việc mất nhiều thời gian như dưới đây cũng cần được cải thiện theo nguồn [SRE](https://www.oreilly.com/library/view/site-reliability-engineering/9781491929117/): 
* Liên quan đến điều hành một dịch vụ product
* Lặp lại bằng tay
* Có thể tự động hóa 
* Không có giá trị lâu dài
* Khối lượng công việc tăng cùng với tốc độ tăng trưởng của dịch vụ
Tất cả các công việc này nên được giảm thiểu và tối ưu hóa ngay lập tức!
### 3. Tối ưu hóa chi phí cơ sở hạ tầng
Bằng cách chuyển sang cơ sở hạ tầng container, OpsWorks đã sử dụng On-demand Instance. 

Nhưng sau khi chuyển sang EKS, Spot instance lại được sử dụng cho các node với vai trò là môi trường chạy container. Vì thế, chúng tôi quyết định chia tỷ lệ theo tải của hệ thống bằng cách dùng Horizontal Pod Autoscaler để mở rộng nhóm và Cluster Autoscaler để mở rộng node. Điều này cho phép phân bổ tài nguyên EC2 một cách linh hoạt hơn theo lưu lượng truy cập và số lượng batch được xử lý.

### 4. Giảm thiểu công việc vận hành hệ thống giám sát hệ thống
Từ trước đến nay, chúng tôi đang tự vận hành các hệ thống khác nhau để hiển thị log và giám sát cơ sở hạ tầng. Điều này đã gây rắc rối rất nhiều cho việc nâng cấp phiên bản. Thêm vào đó, việc sử dụng các công cụ khác nhau để giám sát thì cũng khiến cho việc xác định nguyên nhân khi xảy ra lỗi bị chậm đi, mất nhiều thời gian hơn. Do đó, chúng tôi đã cân nhắc việc chuyển sang một dịch vụ chung cho phép tổng hợp và phân tích chúng trên một platform duy nhất.

## Kiến trúc hệ thống sau khi chuyển sang dùng EKS
Chúng tôi đã tự động hóa mọi thứ từ việc build image container đến deploy lên EKS và áp dụng auto-scaling bao gồm các phiên bản spot instance cho node EKS. Với tư cách là một công cụ giám sát, chúng tôi đã sử dụng Datadog, có thể thu thập log, số liệu của cơ sở hạ tầng container. Deploy process sẽ gồm các bước như sau:
* Push source code có file Dockerfile lên Github
* Build Dockerfile với CircleCI bằng cách sử dụng Github Webhooks rồi push image container lên Amazon ECR (gọi tắt là ECR)
* Chạy CodePipeline để deploy lên EKS
* Thông báo về Slack về việc deploy đã thành công
* Bắn log và dữ liệu giám sát cơ sở hạ tầng vào Datadog

Đối với fotowa, cả developer và designer đôi khi cần một môi trường cho mỗi branch (gọi là môi trường review). Từ nhu cầu đó, chúng tôi đã tạo một image container cho mỗi branch và deploy lên EKS. Chúng tôi cũng cần môi trường staging và môi trường production. Vì thế,  có tất cả 3 môi trường: Review, Staging và Production. Chúng tôi quyết định tạo một CodePipeline cho từng môi trường. 

Đây là sơ đồ cấu hình sau khi chuyển lên EKS:
![](https://images.viblo.asia/bd6aae01-1fb8-4a73-9b87-6cfd37505ab6.png)
## Hiệu quả sau khi sử dụng EKS
* Công việc build môi trường review và release hoàn thành với chỉ một lệnh git push, nên thời gian từ lúc phát triển đến lúc deploy được giảm thiểu đáng kể.
* Việc tìm log trở nên dễ dàng hơn, rút ​​ngắn thời gian điều tra khi xảy ra lỗi.
* Cost sử dụng EC2 đối với EKS đã giảm 25% so với trước đây khi sử dụng Opswork.

![](https://images.viblo.asia/21cf9eeb-c4fe-4fab-8dc2-f503db31153f.png)

## Lời Kết
Việc sử dụng EKS đã mang lại rất nhiều hiệu quả tích cực khi đứng từ phương diện Devops và giảm thiểu cost (trường hợp của Fotowa). Mong rằng những chia sẻ  trên của chúng tôi sẽ giúp cho các bạn có cái nhìn rõ nhất đối với việc cân nhắc sử dụng AWS Opsworks hoặc Amazon EKS. Cùng chia sẻ về ý kiến của bạn đối với AWS Opsworks và Amazon EKS tại đây nhé!
## Tìm hiểu thêm về Pixta và cơ hội làm việc tại Pixta 
**🌐 [Website](https://pixta.vn/careers ) |🏠 [Facebook]( https://www.facebook.com/pixtaVN) | 🔖 [LinkedIn](https://www.linkedin.com/company/pixta-vietnam/)** |✉️ Email: recruit.vn@pixta.co.jp
|☎️ Hotline: 024.6664.1988
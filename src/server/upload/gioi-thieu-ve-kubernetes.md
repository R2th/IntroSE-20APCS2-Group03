Xin chào mọi người, công nghệ phát triển mỗi ngày khiến chúng ta phải chạy theo để bắt kịp (khi ta không đủ khả năng để tạo ra được thứ mới) và mình cũng không phải ngoại lệ. *Container* hóa ứng dụng, *auto deploy*, *zerodowntime service*, *scalable application*... đó những cái chúng ta hướng đến và một công cụ hỗ trợ chúng ta trong việc này là **Kubernetes** (đoạn này mình tự chém, sai anhem cứ góp ý nhé). Đây là thứ mình ấp ủ học trong thời gian quan và giờ mình mới có thời gian và cơ hội để tiếp cận. Do đó bài viết này được tạo ra để giới thiệu về những cái đầu tiên mình được đọc về công cụ này. 

Và tất nhiên học thì phải qua sách vở, phải có thứ để chúng ta đọc, mình xin giới thiệu luôn quyển sách mình được các đàn anh recommend rất nhiều đó là **Kubernetes in Action**. Mình dịch đoạn giới thiệu về **Kubernetes** của quyển này (mình bỏ qua giới thiệu về *Docker* với 1 vài khái niệm *system* và mặc định là mọi người đã hiểu, mình cũng có series về [Docker](https://viblo.asia/s/kham-pha-docker-JzKmgDnBl9N) nên anhem hoàn toàn có thể tham khảo trước).

# Intro
Chúng ta đều biết rằng số lượng các thành phần của ứng dụng có khả năng được deploy đang tăng dần trong ứng dụng của bạn, và điều này trở nên khó khăn để quản lý chúng. Google có lẽ là công ty đầu tiên nhận ra rằng chúng ta cần 1 cách tốt hơn cho việc deploy và quản lý các thành phần của phần mềm (**software components**) và kiến trúc hạ tầng (**infrastructure**) để có thể mở rộng toàn bộ ứng dụng (scale globally). Đây chỉ là một trong số những công ty trên thế giới chạy hàng trăm ngàn server và phải đối mặt với việc quản lý quá trình deploy một cách nặng nề. Điều này thúc đẩy họ phải tạo ra một phương pháp để làm cho việc phát triển và deploy cho hàng ngàn các thành phần phền mềm một cách có quản lý và tối thiểu hóa chi phí.

# 1. Hiểu về ý tưởng gốc
Trong suốt 1 năm, Google đã phát triển 1 hệ thống nội bộ gọi là  Borg (và sau đó gọi là Omega), nó giúp cả developer lẫn quản trị hệ thống quản lý hàng ngàn ứng dụng và service. Bằng việc đơn giản hóa quá trình phát triển và quản lý, nó cũng giúp họ có được sự sử dụng dễ dàng hơn đối với cơ sở hạ tầng của họ, điều có thể nói là quan trong nhất đối với những bộ máy lớn. Khi chạy hàng trăm ngàn máy móc, ngay cả việc cải thiện 1 chút ít (bé tẹo) trong cách sử dụng cũng có thể tiết kiệm cả triệu $trump, do đó việc phát triển một hệ thống như vậy là thực sự cần thiết.

Sau khi giữ bí mật về cả Borg và Omega trong 1 thời gian dài, Google cũng đã giới thiệu Kubernetes vào năm 2014, một hệ thống open-source dựa trên kinh nghiệm thu được từ Borg và Omega, và những hệ thống nội bố khác của Google.

# 2. Nhìn vào Kubernetes từ trên xuống
Kubernetes là một hệ thống phần mềm cho phép bạn dễ dàng deploy và quản lý [container application ](https://viblo.asia/p/cac-khai-niem-trong-docker-va-thuc-hanh-xay-dung-1-ung-dung-bang-docker-co-ban-XL6lANEm5ek). Nó dựa trên các đặc trưng của [Linux](https://viblo.asia/p/jvElaGpAKkw) container để khởi chạy những ứng dụng không đồng nhất (**heterogeneous application**) mà không cần biết bất kỳ chi tiết nào phía bên trong nó và cũng khoogn cần phải deploy tay ứng dụng trên mỗi host. Bởi vì ứng dụng của bạn được chạy trong container, nó không hề ảnh hưởng đến những ứng dụng khác đang chạy trên cùng server, điều rất quan trong khi chạy ứng dụng cho những kết cấu khác nhau hoàn toàn trên cùng 1 phần cứng. 

Kubernetes mở ra cho bạn để chạy những phần mềm tren hàng ngàn nodes trên 1 máy tính như chúng chạy riêng trên từng máy tính vậy. Nó gói gọn lại những cơ sở hạ tầng cơ bản (underlying infrastructure) và bằng cách đó, đơn giản hóa được việc phát triển, deploy và quản lý cho cả team phát triển cũng như quản trị.

Deploy nhiều ứng dụng thông qua Kubernetes luôn giống nhau, ngay cả khi bạn có một vài hay hàng ngàn các [nodes](https://kubernetes.io/docs/concepts/architecture/nodes/). Kích thước của mỗi cluster làm cho nó không khác biệt gì cả. Mỗi khi [cluster](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture) node được thêm sẽ chỉ đơn giản là bổ sung thêm nguồn cung về phần cứng khả dụng để deploy ứng dụng.
> Nó tè 1: Anh em đang rất hoang mang là nodes là gì hay cluster là gì đúng không :v Mình cũng vậy, đại khái mình cũng trích nguồn để anhem tham khảo. Theo mình hiểu đơn giản thì cluster như kiểu là 1 gói cái đặt đầy đủ các service của bạn bên trong, còn node, mỗi cái sẽ tương ứng với 1 service mà bạn muốn cài đặt. Chi tiết cho các bạn tò mò từ đoạn này:
> - Node: https://kubernetes.io/docs/concepts/architecture/nodes/
> - Cluster https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture

### 2.1 Hiểu về cốt lõi mà Kubernetes thực hiện
Hình dưới đây biểu diễn một cách đơn giản nhất về một hệ thống Kubernetes. Hệ thống là sự tích hợp của một master node (node chính)  và rất nhiều worker node (node con). Khi developer đẩy lên (submit) một list các ứng dụng đến master, Kubernetes deploy chúng tới 1 cluster của nhiều worker node. Việc node nào mà các thành phần phần mềm được đặt vào không (không nên) phụ thuộc vào developer hay ngưởi quản lý hệ thống.
![Kubernetes exposes the whole datacenter as a single deployment platform.](https://images.viblo.asia/294fb6e4-0a5d-4ff7-9a56-4aace3b60830.png)
Developer có thể xác định số lượng ứng dụng phải chạy cùng nhau và Kubernetes sẽ deploy chúng trên cùng 1 worker node. Những các khác sẽ được tách ra xung  quanh cluster, nhưng chúng vẫn có thể nói chuyện với nhau theo cùng 1 cách dựa theo nơi mà chúng được deploy.

### 2.2 Giúp lập trình viên tập trung vào tính năng của ứng dụng
Kubernetes có thể được coi như là một hệ thống cho các cluster. Nó giải tỏa cho lập trình viên về việc triển khai các hạ tầng liên quan đến các service trong ứng dụng, thay vào đó họ sử dụng Kubernetes để cung cấp những service này. Nó bao gồm những thứ như phát hiện các service, scale (mở rộng), load-balance (cân bằng tải), self-heal (tự hồi),... Developer có thể yên tâm tập trung vào việc xây dựng những tính năng cho ứng dụng mà không lãng phí thời gian tìm hiểu cách để liên kết chúng với cơ sở hạ tầng phía dưới.

### 2.3 Giúp đội infra tối ưu được việc sử dụng tài nguyên
Kubernetes sẽ chạy ứng dụng ở một nơi nào đó trên cluster, cung cấp thông tin tới từng thành phần và cách để chúng tìm kiếm lẫn nhau và giữ tất cả đều đang chạy. Bởi vì ứng dụng không quan tâm node nào nó đang chạy, Kubernetes có thể di chuyển ứng dụng bất kỳ lúc nào và bằng cách gói và match ứng dụng, tối ưu được tài nguyên hơn là phải làm chúng bằng tay.

# 3. Lợi ích
- Dễ dàng deploy ứng dụng.
- Tối ưu hóa được tài nguyên phần cứng.
- Có chế độ health-checking và self-healing tức là chế độ tự kiểm tra tình trạng và tự hồi phục nếu có node bị chết...
- Tự động mở rộng (automatic scaling)
- Đơn giản hóa công việc phát triển.

# 4. Chốt tộ
Ở phần này chúng ta đã thấy được phần nào bức tranh về Kubernetes và lý do vì sao mà nó đang trở thành trends trong việc xây dựng ứng dụng hiện nay. Ở phần tiếp theo chúng ta sẽ đi vào một số những khái niệm cơ bản của Kubernetes.

Cảm ơn các bạn đã đọc bài viết, nếu có gì thắc mắc hay thấy không đúng hãy comment phía dưới để chúng ta có thể cùng thảo luận. Hẹn gặp lại ở bài viết sau, mình sẽ cố gắng viết đều tay hơn.
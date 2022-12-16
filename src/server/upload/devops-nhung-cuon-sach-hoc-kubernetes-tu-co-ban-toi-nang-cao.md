Link bài viết gốc - [Những cuốn sách nên đọc để học Kubernetes cho người mới bắt đầu](https://devopsvn.tech/devops/nhung-cuon-sach-nen-doc-de-hoc-kubernetes-cho-nguoi-moi-bat-dau)

## Giới thiệu
Kubernetes là công cụ khá phổ biến với anh em DevOps trong những năm gần đây, tuy nhiên việc học và vận dụng được nó hơi khó cho những bạn mới bắt đầu. Nên ở bài này mình muốn giới thiệu tới mọi người những cuốn sách đã giúp mình trong việc học Kubernetes từ chưa biết gì tới vận dụng được nó trong thực tế. Những cuốn sách mình giới thiệu sẽ đi từ cơ bản tới nâng cao.

## Basic level
### Kubernetes in Action
Đầu tiên là cuốn sách dành cho người chưa biết gì về Kubernetes: *Kubernetes in Action*.

![image.png](https://images.viblo.asia/c14ae7a0-c8d3-41b4-a004-96368ecdfb3e.png)

*<div align="center">[Kubernetes in Action, Second Edition](https://www.manning.com/books/kubernetes-in-action-second-edition)</div>*

Đây là cuốn sách cực kì hay, dạy cho các bạn những thứ cơ bản nhất của Kubernetes. Bạn sẽ được học song song về lý thuyết và thực hành. Ví dụ bạn sẽ học được những khái niệm sau trong cuốn sách này:
+ Kubernetes là gì?
+ Tại sao ta lại cần nó?
+ Kubernetes giúp gì cho ta trong việc quản lý và chạy container?
+ Các thành phần cơ bản nhất của Kubernetes?
+ Làm thế nào để sử dụng Kubernetes để xây dựng một hệ thống với tính khả dụng cao.
+ Kubernetes scaling.
+ Và rất nhiều khái niệm khác.

Sau khi đọc xong cuốn này bạn sẽ có một nền tảng vững chắc về Kubernetes, nếu muốn đọc tiếng việt thì các bạn xem series của mình nhé: [Kubernetes Series](https://viblo.asia/s/kubernetes-series-bq5QL8QGlD8).

### Kubernetes Best Practices - Blueprints for Building Successful Applications on Kubernetes
Sau khi đã mần xong lý thuyết thì tiếp theo các bạn cần tìm hiểu cách vận dụng Kubernetes vào các hệ thống thực tế, cuốn sách này sẽ giúp bạn: *Kubernetes Best Practices - Blueprints for Building Successful Applications on Kubernetes*.

![image.png](https://images.viblo.asia/47a9fa76-28ac-4595-8c5d-2bee20ce7ea7.png)

*<div align="center">[Kubernetes Best Practices](https://www.oreilly.com/library/view/kubernetes-best-practices/9781492056461)</div>*

Cuốn sách này sẽ chỉ bạn cài rất nhiều ứng dụng bằng Kubernetes, ví dụ như:
+ Cách cài Ingress Controller.
+ Cách cài hệ thống monitoring bằng Prometheus.
+ Cách cài hệ thống logging bằng Elasticsearch, Logstash, Kibana.
+ Cách tốt nhất để quản lý ConfigMaps và Secrets.
+ Cách xây dựng hệ thống CI/CD trên Kubernetes.
+ ...

## Middle
Sau khi xem xong 2 cuốn trên thì chắc có thể vận dụng được Kubernetes trong thực tế rồi, nhưng nếu các bạn muốn tìm hiểu sâu hơn nữa, thì các cuốn tiếp theo sẽ giúp bạn tìm hiểu sâu hơn một chút về Kubernetes.

### Managing Kubernetes
Khi ta làm việc với Kubernetes thì thường sẽ có hai vai trò là Kubernetes Developer và Kubernetes Administrator.

Kubernetes Developer là những người sẽ viết các file manifest cho ứng dụng và triển khai nó lên trên Kubernetes. Còn Kubernetes Administrator là những người sẽ dựng Kubernetes Cluster, sau đó quản lý vận hành nó để các bạn Developer có thể dễ dàng sử dụng.

Cuốn sách này sẽ chỉ các bạn vận hành Kubernetes: *Managing Kubernetes*.

![image.png](https://images.viblo.asia/47dd3c29-0b0d-4199-bb79-7539c5b72a1b.png)

*<div align="center">[Managing Kubernetes](https://www.oreilly.com/library/view/managing-kubernetes/9781492033905)</div>*

Đây là cuốn sẽ chỉ cho ta cách vận hành Kubernetes trên môi trường production, cách cài Kubernetes trên môi trường production, cách quản lý cụm Kubernetes, cách lưu trữ và khôi phục một cụm Kubernetes Cluster.

### Kubernetes Operators
Operators trong Kubernetes được xây dựng dựa trên khái niệm của *[operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)*. Operators sẽ giúp chúng ta mở rộng các chức năng của Kubernetes, một vài ví dụ của Kubernetes Operators:
+ Argo Rollout.
+ Elastic Cloud on Kubernetes (ECK).
+ Confluent for Kubernetes.

Với Operators, thay vì ta phải viết rất nhiều file manifest để triển khai ứng dụng, thì ta chỉ cần viết đơn giản như sau:

```yaml
apiVersion: platform.confluent.io/v1beta1
kind: Kafka
metadata:
  name: kafka
  namespace: confluent
spec:
  replicas: 3
  image:
    application: confluentinc/cp-server:7.2.0
    init: confluentinc/confluent-init-container:2.4.0
  dataVolumeCapacity: 10Gi
  metricReporter:
    enabled: true
```

Chỉ cần một file manifest đơn giản để triển khai được Kafka 😁.

Sau đây là cuốn sách hướng dẫn cho bạn thiết kế và xây dựng một Operators: *Kubernetes Operators - Automating the Container Orchestration Platform*.

![image.png](https://images.viblo.asia/dad5656b-151c-4323-a1db-01e2306286b8.png)

*<div align="center">[Kubernetes Operators](https://www.oreilly.com/library/view/kubernetes-operators/9781492048039/)</div>*

## Advanced
Nếu luyện xong các cuốn trên và các bạn vẫn muốn tìm hiểu sâu hơn nữa về Kubernetes thì mình giới thiệu tiếp cho các bạn hai cuốn sách này, hai cuốn sách tiếp theo hơi thuần lý thuyết.

### GitOps and Kubernetes
 **GitOps**, đây là một khái niệm khá mới đối với mình và mình đã học được nó thông qua cuốn này: *GitOps and Kubernetes*.

![image.png](https://images.viblo.asia/5baa0f7b-d1fc-43e3-b1af-2dbbf8cee920.png)

*<div align="center">[GitOps and Kubernetes](https://www.manning.com/books/gitops-and-kubernetes)</div>*

Đây là cuốn sách sẽ giải thích cho các bạn về khái niệm GitOps và cách xây dựng CI/CD trong Kubernetes. Trong cuốn này các bạn sẽ học được các cách để tổ chức môi trường và xây dựng chiến lược về triển khai hệ thống với Git + Kubernetes như:
+ Ta sẽ tổ chức môi trường thế nào?
+ Xây dựng Pipelines ra sao?
+ Các chiến lược để triển khai sản phẩm: canary, blue-green, ...
+ Các vấn đề về bảo mật.
+ Cách sử dụng cách công cụ GitOps như: ArgoCD, Jenkins X, Flux.
+ ...

### Core Kubernetes
Cuối cùng là cuốn sách sẽ nâng tầm hiểu biết về Kubernetes của bạn sang một trang mới: *Core Kubernetes*.

![image.png](https://images.viblo.asia/357f2cf2-e2d5-4299-bbc2-0a29d8b5365f.png)

*<div align="center">[Core Kubernetes](https://www.manning.com/books/core-kubernetes)</div>*

Như tên của cuốn sách, trong cuốn này nó sẽ dạy cho các bạn những thành phần *core* của Kubernetes. Đi từ những khái niệm cơ bản về Container và những thành phần cấu tạo nên Container, cho tới Pod, hệ thống lưu trữ và network của Kubernetes, sau khi đọc xong chắc các bạn sẽ có cái nhìn rất sâu về công cụ Kubernetes, mình thì chưa đọc xong cuốn này nhưng chỉ vài chương đầu thì hiểu biết về Kubernetes của mình đã được bổ sung rất nhiều. Ví dụ đây là hình minh họa của Pod ở trong quyển sách, vẽ cả tầng Linux Namespaces.

![image.png](https://images.viblo.asia/922316fb-a2b4-44c8-9c7e-077d2fc3bf31.png)

Cuốn này rất hay. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Ở trên là những cuốn sách đã giúp mình trong quá trình tìm hiểu về Kubernetes, mong rằng sẽ hữu ích với mọi người. Nếu các bạn có biết cuốn nào hay thì hãy giới thiệu cho mọi người ở phần bình luận với nhé 😁.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
## Giới thiệu
Chào các bạn tới với series về kubernetes patterns. Loạt bài tiếp theo chúng ta sẽ đi tiếp qua một loại pattern khác là Structural Patterns, ở bài này chúng ta sẽ tìm hiểu về hai patterns còn lại là Adapter và Ambassador.

![](https://images.viblo.asia/2362e8d9-c77b-4070-aab4-f786baf7de95.png)

Structural Patterns sẽ bao gồm các pattern sau đây:
+ [Init Container](https://viblo.asia/p/kubernetes-patterns-structural-patterns-init-container-6J3ZgpjRlmB).
+ [Sidecar](https://viblo.asia/p/kubernetes-patterns-structural-patterns-sidecar-containers-QpmlezJm5rd).
+ Adapter.
+ Ambassador.

Cả Adapter và Ambassador đều là một dạng pattern mở rộng của Sidecar, đầu tiên ta sẽ tìm hiểu về Adapter.

## Adapter
Adapter pattern được sinh ra để giải quyết vấn đề không đồng nhất của các ứng dụng, mục đích cuối cùng của pattern này là cung cấp cho các ứng dụng của ta một adapter thống nhất, để các ứng dụng khác có thể dễ dàng truy cập được các ứng dụng đằng sau adapter đó.

### Problem
Vấn đề mà ta hay gặp phải nhất là khi ta phát triển hệ thống microservice, ban đầu ta sẽ phát triển bằng một ngôn ngữ, nhưng càng về sau khi hệ thống của ta lớn lên thì ta sẽ phát hiện ngôn ngữ mà ta đang xài có thể không thích hợp cho service mới, mà có một ngôn ngữ khác phù hợp hơn, do đó ta sẽ phát triển service mới với ngôn ngữ mới.

Và từ từ hệ thống của ta cứ mở rộng ra, lúc này hệ thống của ta sẽ có rất nhiều service với các ngôn ngữ khác nhau, và tất nhiên các ngôn ngữ khác nhau sẽ có cách truy cập với tương tác khác nhau, điều này dẫn tới các service của ta không đồng nhất và rất khó để truy cập.

Ví dụ là các service của ta cần được monitoring, lúc này mỗi service sẽ expose ra các metric khác nhau, rất khó để công cụ monitoring của ta thu thập metric từ các service này.

### Solution
Với vấn đề trên thì ta cần có một adapter mà cung cấp cho ta một interface thống nhất để các ứng dụng bên ngoài có thể dễ dàng truy cập được các ứng dụng bên trong của ta, ta không cần biết các ứng dụng của ta đằng sau nó sẽ có các cách truy cập khác nhau như thế nào, ta chỉ cần biết là ta có thể truy cập được nó thông qua một interface với một cách thống nhất.

Quay lại với bài toán monitoring của ta, thì ta sẽ cần một adapter để chuyển các metric của ta thành một định dạng duy nhất để công cụ monitoring có thể thu thập được, ta có thể làm việc đó trong code, nhưng ở bài trước ta đã nói là mỗi container chỉ nên có một chức năng duy nhất, do đó công việc mà chuyển đổi metric thành định dạng phù hợp ta nên để cho một container khác làm, và container đó được gọi là **Adapter Container**.

Adapter container thường được sử dụng như một interface thống nhất cho main container bên trong Pod của ta, các ứng dụng khác sẽ truy cập main container thông qua adapter container.

### Example
Ta sẽ làm một ví dụ cho dễ hiểu, ta có một container mà chạy một HTTP server đơn giản, với mỗi request của user thì container này sẽ ghi log vào logs file của nó. Và ta có một container khác sẽ có nhiệm vụ là đọc log từ logs file của HTTP server, sau đó chuyển nó thành dạng metric mà Prometheus có thể đọc được. Lúc này thì HTTP server của ta không cần quan tâm gì tới việc metric của nó sẽ được đọc từ Prometheus hay bất kì công cụ monitor nào khác.

![](https://images.viblo.asia/2362e8d9-c77b-4070-aab4-f786baf7de95.png)

Tạo một file tên là `adapter.yaml`.

```adapter.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: random-generator
spec:
  replicas: 1
  selector:
    matchLabels:
      app: random-generator
  template:
    metadata:
      labels:
        app: random-generator
    spec:
      containers:
        - image: k8spatterns/random-generator:1.0
          name: random-generator
          env:
            - name: LOG_FILE
              value: /logs/random.log
          ports:
            - containerPort: 8080
              protocol: TCP
          volumeMounts:
            - mountPath: /logs
              name: log-volume
        - image: k8spatterns/random-generator-exporter
          name: prometheus-adapter
          env:
            - name: LOG_FILE
              value: /logs/random.log
          ports:
            - containerPort: 9889
              protocol: TCP
          volumeMounts:
            - mountPath: /logs
              name: log-volume
      volumes:
        - name: log-volume
          emptyDir: {}
```

Ở file cấu hình trên, ta tạo một emptyDir volume tên là `log-volume` và mount nó vào bên trong cả hai container ở folder `logs`. HTTP server sẽ ghi log vào file `/logs/random.log` và sau đó container `prometheus-adapter` sẽ đọc log file này và chuyển nó thành dạng Prometheus có thể đọc được, sau đó ta mở port 9889 cho nó để Prometheus đọc metric của nó thông qua port này. Đây là cách phổ biến nhất để ta expose metric cho các service mà ta không thể can thiệp vào code của nó.

Adapter container là một reverse proxy cho các ứng dụng bên ngoài có thể truy cập được các ứng dụng đằng sau nó. Tiếp theo ta sẽ tìm hiểu về một pattern khác là Ambassador.

## Ambassador
Ambassador pattern là một pattern hoàn toàn ngược lại so với Adapter, Ambassador sẽ có mục đích là cung cấp cho ta một interface thống nhất để các ứng dụng của ta có thể truy cập được các ứng dụng bên ngoài một cách dễ dàng nhất.

### Problem
Vấn đề mà ta hay gặp nhất là khi ta cần truy cập các ứng dụng khác mà có các cách truy cập khác nhau, thì ta phải viết các đoạn code riêng lẻ để truy cập được nó.

Ví dụ là khi ta cần truy cập ứng dụng cache, đối với memcached thì ta không cần phải thực hiện authentication, nhưng với redis thì ta lại cần authentication.

### Solution
Thì thay vì ta phải viết code để thực hiện các giao thức khác nhau cho các ứng dụng khác nhau bên trong application, thì ta nên tách việc đó cho một container khác. Sau đó bên trong ứng dụng ta chỉ cần kết nối tới container này thông qua một interface duy nhất, còn công việc kết nối với các ứng dụng khác như thế nào thì để container này nó lo, container này được gọi là **Ambassador Container**.

### Example
Ví dụ ta có ứng dụng trong main container cần truy cập các ứng dụng cache khác nhau, thì ta sẽ implement một ambassador container cho các ứng dụng cache và sau đó ứng dụng trong main container sẽ kết nối tới các ứng dụng cache khác nhau thông qua dường dẫn `localhost:8080`.

![image.png](https://images.viblo.asia/d58487c2-d207-4b85-8ee9-f10d425f60cf.png)

Ta có thể thấy Ambassador cũng giống như Sidecar pattern, nhưng khác biệt ở điểm là Ambassador sẽ không hỗ trợ các chức năng cho main container mà nó đóng vai trò là một proxy để main container truy cập các ứng dụng bên ngoài một cách dễ dàng.

## Kết luận
Vậy là ta đã tìm hiểu xong về Adapter và Ambassador pattern, Adapter sẽ đóng vai trò như là một reverse proxy còn Ambassador đóng vai trò như là một proxy. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
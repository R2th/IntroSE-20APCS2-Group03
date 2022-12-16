Link bài viết gốc - [Khi nào thì ta không nên sử dụng Kubernetes](https://devopsvn.tech/devops/khi-nao-thi-ta-khong-nen-su-dung-kubernetes)

## Giới thiệu
Đối với anh em DevOps thì Kubernetes có lẻ không có gì xa lạ. Chắc mọi người cũng đã đọc nhiều bài tại sao ta nên sử dụng Kubernetes cho môi trường production, Kubernetes giúp ta giải quyết những vấn đề gì, nhưng cái gì cũng có ưu và nhược điểm của nó và Kubernetes cũng vậy. Nên ở bài này chúng ta sẽ tìm hiểu về vấn đề: khi nào thì ta không nên sử dụng Kubernetes?

![image.png](https://images.viblo.asia/67290b39-f077-440a-a42f-ead1a5cdc7e4.png)

Đây là các trường hợp ta không nên sử dụng Kubernetes:
+ Dự án hoặc ứng dụng với quy mô nhỏ.
+ Ứng dụng không cần tính khả dụng cao (High Availability).
+ Ứng dụng của ta thuộc dạng monolithic.
+ High-performance computing (HPC).
+ Ứng dụng thuộc kiểu quá đặc thù.

## Dự án hoặc ứng dụng với quy mô nhỏ
Trường hợp đầu tiên mà ta không nên sử dụng K8S để triển khai dự án hoặc ứng dụng của ta là nó có quy mô quá nhỏ.

Ví dụ dự án của ta chỉ cần một ứng dụng chạy PHP + một con Database MySQL đơn giản, với số lượng người dùng chưa tới 1000 người mỗi ngày. Thì không cần thiết phải triển khai nó lên trên K8S, ta chỉ cần triển khai nó lên trên một con máy ảo đơn giản là được. Vì để triển khai được một ứng dụng lên trên K8S ta cần làm rất nhiều thứ, chưa kể để dựng được một K8S Cluster và vận hành được nó ta cũng tốn rất nhiều chi phí.

Nên đối với một dự án quy mô nhỏ thì ta không cần phải triển khai nó lên trên K8S, trừ khi công ty bạn có thể sử dụng K8S cho mọi dự án thì ta mới xem xét có nên dùng K8S hay không.

## Ứng dụng không cần tính khả dụng cao
Một trong những tính năng nổi bật của K8S là giúp ta xây dựng một ứng dụng có tính khả dụng cao, thời gian mà ứng dụng sống để xử lý yêu cầu của người dùng luôn trên 90%.

Nên trường hợp thứ hai mà ta không cần phải sử dụng K8S là khi ứng dụng của ta không cần tính khả dụng cao.

Ví dụ khi ứng dụng của ta có bị chết mà không ảnh hưởng gì tới người dùng thì ta không cần thiết phải triển khai nó lên trên K8S, vì để triển khai ứng dựng với tính khả dụng cao thì ta sẽ tốn thêm chi phí.

## Ứng dụng của ta thuộc dạng monolithic
Ứng dụng thuộc dạng monolithic là sao? Đây là dạng ứng dụng ngược lại với dạng microservices, toàn bộ thành phần đều tập trung vào trong một nơi hoặc một source code. Đối với dạng ứng dụng monolithic thì ta không thể chạy cùng lúc nhiều instance được, do có thể khiến quá trình chạy ứng dụng của ta bị sai. 

Nên trường hợp thứ ba ta không nên sử dụng K8S là khi ứng dụng của ta thuộc dạng monolithic, vì khi ta dùng K8S để triển khai ứng dụng thì ta sẽ thường dùng Deployment, tuy ta có thể cấu hình để ứng dụng của ta chỉ chạy một instance bằng cách cấu hình trường `replicas` là 1, nhưng Deployment chỉ hỗ trợ hai cách triển khai là `Recreate` với `RollingUpdate`, trong lúc quá trình triển khai ứng dụng thì ta có thể gặp xui dẫn tới có hai instance chạy cùng một lúc, nếu ứng dụng của ta chạy một chương trình tính toán nào đó thì lúc này sẽ có hai chương trình tính toán chạy cùng một lúc và dẫn tới kết quá sai trên toàn hệ thống.

Ta có thể giải quyết vấn để này bằng cách không dùng Deployment để triển khai ứng dụng mà dùng thẳng Pod luôn, nhưng mỗi lần triển khai ta phải xóa Pod và làm nhiều thứ lằng nhằng bằng tay, ta không cần phải tự làm khổ mình 😂, do đó đối với các ứng dụng monolithic thì ta cứ triển khai trên con máy ảo cho nhanh.

## High-performance computing (HPC)
Trường hợp thứ 4 mà ta không nên sử dụng K8S là khi ứng dụng của ta cần hiệu xuất rất cao (High-performance computing).

Đối với các ứng dụng dạng High-performance computing thì tốc độ xử lý phải ở mức nano hoặc microseconds, cực kì nhanh. Việc đẩy ứng dụng vào trong container và triển khai lên trên K8S sẽ khiến tốc độ chạy của ứng dụng bị giảm một xíu, do khi ta chạy ứng dụng trong container thì sẽ có một tầng trung gian khá phức tạp được thêm vào giữa ứng dụng và hệ điều hành, tuy nó sẽ không gây ra độ trễ nhiều nhưng đối với ứng dụng cần tốc độ nanoseconds để xử lý thì K8S không phải là lựa chọn tốt.

## Ứng dụng thuộc kiểu quá đặc thù
Trường hợp thứ 5 mà ta không nên sử dụng K8S là ứng dụng của ta thuộc dạng quá đặc thù, có nghĩa là ta không thể chuyển ứng dụng sang dạng chạy bằng container được.

Ví dụ là ứng dụng của ta xài một vài thư viện về mạng mà nó có yêu cầu phần cứng quá đặc thù và quá phức tạp để ta có thể chuyển nó sang dạng chạy bằng container. Hoặc ứng dụng của ta chỉ có thể chạy trên Windows mà không thể chạy trên linux thì ta không thể chuyển nó thành dạng container được, **vì một ứng dụng chỉ có thể chuyển sang dạng linux container chỉ khi nó có thể chạy được trên hệ điều hành linux**.

Tuy K8S cũng có hỗ trợ Windows Node để chạy windows container, nhưng đừng tự làm khổ mình, nên đối với các ứng dụng dạng này thì tốt nhất đừng triển khai nó trên K8S 😂.

## Kết luận
Ở trên là một vài trường hợp mà mình thấy không nên dùng Kubernetes để triển khai, nếu còn trường hợp nào nữa thì các bạn nhớ nói cho mình biết ở dưới phần bình luận nhé 😁.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
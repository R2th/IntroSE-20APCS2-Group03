![image.png](https://images.viblo.asia/8c7949ed-8be9-4825-957b-01f853e3003f.png)
# Giới thiệu về Serverless Architecture

## Chính xác thì "serverless" là gì?
Trước khi bắt đầu, chúng ta phải giải nghĩa cho từ "serverless".  Hậu tố -less thường mang ý nghĩa "không có, không tồn tại" giống như sugarless - "không đường", "boneless" - "không xương". Vậy thì làm thế nào mà một ứng dụng có thể chạy mà không có server được? Ở đây, hậu tố -less mang hàm ý nghĩa là "vô hình trong ngữ cảnh được sử dụng" như là "wireless" - "không dây". Dĩ nhiên là nó phải có server ở đâu đó chứ! Nhưng mà điểm khác biệt là bạn không cần phải quan tâm về server nữa. Bạn không cần phải nghĩ về cơ sở hạ tầng. Đã có người làm hộ bạn những chi tiết về bảo trì và mở rộng quy mô rồi, cho bạn thêm thời gian để lo nghĩ về chuyện khác. Bản chất của Serverless là các tính chất về dịch vụ autoscale và tính phí khi dùng.

Serverless có thể bị nhầm với nhiều dịch vụ điện toán đám mây khác. Ở đây, mình sẽ dùng Serverless với ý nghĩa tương tự như FaaS (Function as a Service), tạm dịch tiếng Việt có nghĩa là Chức năng như một dịch vụ. (1) 

![image.png](https://images.viblo.asia/69a1b247-6285-4904-855b-a63d1ee6e7d3.png)

Ở biểu đồ trên, chúng ta có thấy các mô hình dịch vụ mà điện toán đám mây mang lại, với FaaS ở mức cao nhất. 
1. IaaS tóm gọn được phần cứng. Người dùng có thể chọn các thông số phần cứng cũng như hệ điều hành. Nhưng mình vẫn sẽ phải tự quản lý và vận hành server ảo. 
2. PaaS tóm gọn được hệ điều hành. Người dùng có thể phát triển ứng dụng mà không phải lo lắng về platform (nền tảng). Mình sẽ quan tâm ít hơn về cấu hình và quản lý server và tập trung hơn vào phát triển ứng dụng. 
3. Caas cũng tóm gọn được hệ điều hành, nhưng quy mô đơn vị ở đây là container. Người dùng gói gọn ứng dụng vào một container image và nhà cung cấp dịch vụ sẽ sắp xếp và quản lý container. 
4. FaaS tóm gọn được thời gian chạy ngôn ngữ với quy mô đơn vị là từng function một. Với FaaS, người dùng chỉ phải trả tiền cho thời gian chạy function. Ví dụ AWS Lambda, tính tiền theo từng 100 mili giây. 

Để điểm lại, Serverless cho chúng ta tự do khỏi những mối bận tâm về cấu hình cũng như quản lý server. Khi mà nhiều tổ chức đã di chuyển sang đám mây, họ bắt đầu việc quản lý server ảo, nhưng nó vẫn là quản lý server. Container có thể là tầng cao hơn, nhưng vẫn được quản lý bởi Kubernetes hay Docker Swarm. Với Serverless, đây là tầng tóm gọn cao nhất trong các mô hình dịch vụ điện toán đám mây. 

## Vậy Serverless có gì hay?
### Dễ mở rộng quy mô với độ tin cậy cao mà không cần quản lý server
Việc xây dựng các hệ thống phân tán quy mô lớn là rất khó. Các tác vụ như cấu hình máy chủ và quản lý, vá lỗi và bảo trì, cũng như quản lý kiến trúc cơ sở hạ tầng sẽ do nhà cung cấp đảm nhận sẽ giúp tiết kiệm được thời gian và tiền bạc.
Ví dụ: Amazon sẽ chăm sóc dàn server AWS Lambda. Nếu bạn không có những yêu cầu cụ thể để quản lý hoặc sửa đổi tài nguyên server thì Amazon hoặc một nhà cung cấp khác quản lý chúng sẽ là một giải pháp tuyệt vời. Bạn chỉ chịu trách nhiệm về code của riêng mình, để lại các nhiệm vụ vận hành và quản trị cho một nhóm người khác.

### Giá cả cạnh tranh
Theo nhiều [nghiên cứu](https://gigaom.com/2013/11/30/the-sorry-state-of-server-utilization-and-the-impending-post-hypervisor-era/), phần lớn các server đều không được tận dụng hết công suất của mình. Và bạn vẫn phải trả tiền cho những lúc server ngừng chạy. Còn, Serverless sẽ được tính tiền theo thời gian chạy của server. 
Tiếp đến, khi muốn mở rộng quy mô của ứng dụng, kể cả với những hệ thống tự động, vẫn cần thêm server mới. Và server mới đó thường bị lãng phí cho đến khi có lưu lượng truy cập hoặc dữ liệu mới. Các hệ thống serverless dễ mở rộng quy mô hơn nhiều vì tính hữu dụng của nó, cũng như tính trả phí khi sử dụng, chúng có thể tiết kiệm chi phí hơn nhiều. Tuy nhiên, chúng cũng sẽ không rẻ hơn các công nghệ truyền thống trong nhiều trường hợp. Điều quan trọng là chúng ta phải khảo sát trước khi có quyết định đón nhận các công nghệ mới. 

### Code ít hơn
Mở đầu chúng ta đã nói về việc Kiến trúc Serverless sẽ mở ra các cơ hội giảm thiểu tính phức tạp của code so với hệ thống truyền thống. Việc áp dụng phương pháp serverless sẽ giảm thiểu nhũng đoạn code liên quan đến điều khiển server, route hay event giữa các bộ phận. 

### Lập trình đa thức
Một lợi ích nữa mà Serverless mang đến là bạn có thể chọn nhiều ngôn ngữ cho dự án hay tính năng của mình. Amazon Lambda, hỗ trợ JVM, Node.js, Python và C#. Các tính năng có thể liên kết với nhau qua event. 

## Khi nào không nên dùng Serverless?
### Bạn không thoải mái với việc sử dụng các hệ thống đám mây
Phát triển Serverless là một phần tự nhiên của phát triển thông qua điện toán đám mây, phần nhiều việc quản lý cơ sở hạ tầng là do nhà cung cấp xử lý. Có nhiều ứng dụng hay những viễn cảnh khi mà bạn cần quản lý data center của mình. Những trường hợp đó bạn không nên theo kiến trúc Serverless. 

### Các dịch vụ không phù hợp với những chỉ số về hiệu suất mà khách hàng của bạn cần
Các dịch vụ AWS serverless có thể cung cấp những SLA khả dụng, nhưng ngưỡng đáp ứng của họ có thể thấp hơn bạn cần cho ứng dụng của mình. Dịch vụ như AWS Lambda cũng không cung cấp hiệu suất SLA, nghĩa là bạn cũng phải đánh giá hiệu suất của họ so với mức mong muốn của bạn. Các dịch vụ khác cũng như vậy, một số có thể có SLA mạnh, nhưng một số có thể không có. 

### Bạn cần nhiều quyền kiểm soát hoặc bạn muốn tùy chỉnh cơ sở hạ tầng 
Khi sử dụng AWS Lambda, hiệu quả đến từ việc Amazon đã quản lý các nền tảng của bạn rồi, nhưng nó cũng đi kèm với việc bạn không thể tùy chỉnh hệ điều hành hay những tác vụ ngầm. Bạn có thể chỉnh sửa RAM tới từng function, cũng như timeout, nhưng thế là hết rồi. Tương tự, các dịch vụ thứ ba khác nhau cũng sẽ cung cấp các tầng chỉnh sửa khác nhau. 

### Bạn không muốn dựa dẫm vào nhà cung cấp dịch vụ
Nếu một developer quyết định sử dụng một API hay dịch vụ của bên thứ ba, có khả năng hệ thống đó có thể bị gắn liền với nền tảng được sử dụng. Một ví dụ là, bạn làm ứng dụng liên quan đến bản đồ và bạn dùng Google Maps API nhưng một ngày đẹp trời vào năm 2019, họ đã chặn Việt Nam. Vậy nên, việc sử dụng dịch vụ của bên thứ ba cần phải được cân nhắc kỹ lưỡng.  

### Một số khó khăn khi phát triển ứng dụng
Bạn rất khó phát triển local được. Khi bạn không làm việc được với dịch vụ tại local, thời gian phát triển cũng tăng lên. Để kiểm tra một thay đổi nhỏ, bạn cũng phải chờ để deploy mới. Bạn khó làm việc với tư cách là một team. Việc phát triển cũng tốn tiền vì bạn phải liên kết với dịch vụ AWS. Khi cho thêm thư viện mới vào project của bạn, càng nhiều thư viện bạn thêm vào thì càng thêm thời gian tải lên. 


## Thế không cần DevOps nữa sao?
Vào thời gian đầu, có nhiều ý kiến cho rằng các công nghệ Serverless sẽ báo trước cho kỷ nguyên NoOps. Nhiều người tin rằng là nhờ serverless, các công ty sẽ không phải nghĩ về các hoạt động ở cơ sở hạ tầng nữa. Các nhà cung cấp dịch vụ đám mây sẽ chăm sóc lo liệu mọi thứ. Giả định như vậy sẽ sinh ra NoOps nhưng thực tế lại không như vậy. Khi xây dựng và vận hành các ứng dụng serverless, các kỹ sư DevOps vẫn rất cần thiết, chỉ có điều họ sẽ có một trọng tâm khác. Trọng tâm của họ sẽ chuyển sang tự động hóa deploy và test ứng dụng, đồng thời làm việc với các nhóm hỗ trợ của nhà cung cấp đám mây ưa thích của họ (thay vì chỉnh sửa server và hệ điều hành). Các công ty có thể có các nhóm DevOps nhỏ hơn, chuyên biệt hơn. Tuy nhiên, việc bỏ qua hoàn toàn Ops (Operation) sẽ là một công thức dẫn đến thảm họa. Hãy nhớ rằng, khi ứng dụng của bạn lỗi, khách hàng sẽ quy trách nhiệm cho bạn chứ không phải nhà cung cấp dịch vụ đám mây của bạn. Vì vậy, chúng ta vẫn cần các kỹ sư DevOps. 

## Tài liệu tham khảo
(1) Tuy nhiên Serverless không phải là FaaS, TJ Hallowaychuk, nhà phát triển của framework Apex từng tweet rằng: 
> serverless != functions
> FaaS == functions
> serverless == dịch vụ autoscale và trả phí khi sử dụng (không chỉ bao gồm functions)

(2) [Hands On Serverless Guide by Shekhar Gulati](https://github.com/xebia-os/hands-on-serverless-guide)

(3) [Serverless Architectures on AWS: With examples using AWS Lambda 2nd Edition by Dr. Peter Sbarski](https://www.manning.com/books/serverless-architectures-on-aws)
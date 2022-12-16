# Giới thiệu
Mở rộng kiến trúc của ứng dụng hiện tại được xem như một vấn đề khó để giải quyết. Mọi người thường nghĩ rằng, công việc này cần những công cụ thật kì diệu, những nguồn budget lớn để thực hiện.
Tất nhiên điều đó không phải lúc nào cũng đúng. Điều đầu tiên đó là việc lựa chọn 1 công cụ phù hợp cho công việc của bạn. Ví dụ 1 số loại cơ sở dữ liệu nhanh hơn cho việc đọc, 1 số loại thì tối ưu hơn trong việc ghi dữ liệu. Mặc dù bạn có thể đã lựa chọn ra nhưng công cụ phù hợp, nhưng 1 server có thể là không đủ với công việc của bạn. Đó là khi, cần những kiến thức chuyên sâu về kiến trúc để giải quyết bài toàn nhiều server. Tất nhiên bạn có thể lựa chọn các gói dịch vụ mà AWS đã cung cấp sẵn cho chúng ta. Nhưng bạn cũng nên biết cách để cài đặt có khả năng mở rộng cao từ những kiến trúc thô sơ nhất.
# Những yếu tố cơ bản
## Lựa chọn công nghệ phù hợp
 Như mình đã nhắc đến ở trên, điều đầu tiên là bạn phải lựa chọn ra công cụ phù hợp cho công việc của bạn.  Các ngôn ngữ lập trình khác nhau được sử dụng cho các mục đích khác nhau. 
 
 Ví dụ:
 + Python cung cấp khả năng làm việc với dữ liệu tuyệt vời, mà không cần tốn quá nhiều dòng code đi kèm với rất nhiều thư viện đã được xây dựng. NodeJS có thể có những công cụ bên ngoài nhiều nhất hiện nay, nhưng nó lại ngôn ngữ đơn luồng. Để chạy trên nhiều core khác nhau, cần những thứ PM2.
 
 ![](https://images.viblo.asia/2549bc7c-270c-47ff-9844-ac847a1445c2.jpg)

 + Việc lựa chọn cơ sở dữ liệu cũng đau đầu không kém việc lựa chọn ngôn ngữ lập trình. SQL cung cấp ngôn ngữ dạng máy Turing cho việc truy vấn và làm việc với dữ liệu. Nhưng điều này làm cho SQL chậm hơn NoSQL. Các cơ sở dữ liệu thường là `read-first` hoặc `write-first`. Điều đó có nghĩa là, có cơ sở dữ liệu thì nhanh hơn cho việc đọc, có cơ sỡ dữ liệu thì lại nhanh hơn trong việc ghi.
 
 ![](https://images.viblo.asia/96f272f9-29bf-4ee2-9dea-5b3c2a4d1776.jpg)

 
 ## Bài toán nhiều server
 ![](https://images.viblo.asia/8e6508fd-52d6-42f3-b9a7-360e907090ae.png)

 Như mình đã đề cập ở trên, ngay cả khi đã lựa chọn ra công nghệ phù hợp. Khi ứng dụng của bạn cần được mở rộng, việc chạy trên 1 máy tính duy nhất là điều không thể. Và cứ thể 2 rồi 3 máy tính cũng là không đủ. Để sử dụng nhiều máy chủ, phần backend của bạn nên là  `stateless`. Tại sao lại cần phải `stateless`? Bởi vì nếu để `stateful`, thì chúng ta lại phải có cách để chia sẻ thông tin trạng thái từ 1 máy chủ tới các máy chủ khác. Điều này khiến kiến trúc của chúng ta càng trở nên phức tạp hơn. Điều đó lý giải cho việc tại sao các ngôn ngữ lập trình hàm rất phổ biến, lí do `Scala` được khai sinh. 
 
 Khi bạn đặt 1 con `load-balancer` phía trước các máy chủ, con `load-balancer` này sẽ điều hướng request tới server ít bận nhất. Do đó, chúng ta cần các phản hồi giống nhau giữa các máy chủ với request. Do đó, hãy `stateless` ứng dụng sớm nhất có thể.
 
 ![](https://images.viblo.asia/435710fb-f23c-4926-a77a-5466a2c94213.png)

 ## Caching và rate limiting
 Hãy tưởng tượng bạn phải tính toán 1 phép tính nào đó giống nhau mỗi 100ms cho tất cả các user. Điều này dẫn đến việc, máy chủ của bạn rất dễ bị DDOS.  Để giải quyết, cách đơn giản nhất là đặt 1 cái middle ware ở giữa. Chúng ta chỉ tính phép toán đó với thằng user đầu tiên trên server của ta. Những thằng user tiếp theo, chỉ lấy kết quả từ con middle ware kia. 
 ![](https://images.viblo.asia/54f7812b-c4a3-4937-998e-dc17b1274bb8.png)

 
 
 Việc caching như vậy có lợi nhưng cũng có hại. Đó là có thể dữ liệu sẽ bị cũ. Điều này, dẫn đến việc chúng ta cần có các cơ chế reset cache, giúp cho dữ liệu được tính lại. Thông thường chúng ta chỉ nên cache kết quả đầu ra của máy chủ, không nên cache input vào từ người dùng, vì input vào từ nguờtei dùng thường xuyên có sự thay đổi. Với cache, server của ta có thể sống nếu user request cùng 1 resource. Nhưng nếu user request các resource khác nhau ví dụ mỗi 1ms, server sẽ down. Vì vậy, ta cần rate limiting. Nếu tính kể từ request trước đó không đủ thời gian cần thiết, thì request sẽ bị từ chối. Điều này giúp server của chúng ta sẽ sống nhăn. 
 ![](https://images.viblo.asia/12719282-2bec-4deb-bab0-a1cac36007fe.png)
 
 Trên đây là những thứ cơ bản, chúng ta cân nắm bắt để cài đặt 1 server có thể sống ổn. Sau đây, mình sẽ trình bày những kiến trúc ứng dụng phổ biến.
 # Các kiến trúc phổ biến
 ### Kitten
 ![](https://images.viblo.asia/4c147a1c-4e33-4ba9-9d67-a5e190564d64.jpg)
 
![](https://images.viblo.asia/27611b10-447f-481d-bfde-e6f6a2d5f495.png)

Đây là kiến trúc cơ bản, bạn có thể xây dựng với các stack web chỉ trong 1 buổi tối. Tất nhiên, kiểu kiến trúc này không thể mở rộng nổi. Nhưng tất nhiên, kiến trúc này đủ tốt cho 1 ứng dụng nhỏ hoặc bài tập hàng tuần gì đó. 

+ Lượng dữ liệu đáp ứng: Vài GB
+ Lượng người dùng đáp ứng: Vài nghìn
+ Dễ bị DDOS

### Cat
![](https://images.viblo.asia/62e71837-05cb-4466-8066-0f5f1e9b92f4.jpg)

![](https://images.viblo.asia/dba78a6f-9f5b-46f1-b708-9c7d2ff8b9a2.png)
Chúng ta thêm cache và rate limiting như mình đã trình bày ở trên vào để chống bị DDOS. Điều này cũng giúp, server chạy nhanh hơn. Tuy nhiên, tất nhiên ta vẫn khó có thể mở rộng được với kiến trúc này, vì phần backend vẫn là `stateful`

+ Lượng dữ liệu đáp ứng: Vài GB
+ Lượng người dùng đáp ứng: Khoảng chục nghìn người
+ Chưa thể mở rộng

### Cheetah
![](https://images.viblo.asia/bb87c817-d68b-4920-928a-b767365230e7.jpg)

![](https://images.viblo.asia/745c43f0-eac2-4cb0-a747-0bb6b67419ec.png)

Với kiến trúc ta đã mở rộng ra nhiều server. Bây giờ nếu 1 server "toang", ta vẫn có thể xử lí được, tuy nhiên database server vẫn ở 1 server duy nhất!!!

+ Lượng dữ liệu đáp ứng: Vài TB
+ Lượng người dùng đáp ứng: Hàng trăm nghìn người
+ Do chỉ có 1 database server, nên nếu yêu cầu truy vấn quá nhiều, server database sẽ "toang".

### Tiger
![](https://images.viblo.asia/863431b2-214c-412d-9b21-2ad8df0a08b6.jpg)

![](https://images.viblo.asia/9b14f68e-3693-4bdf-a69c-43471bbd2dc6.png)

Với kiến trúc này, ứng dụng của chúng ta nhanh hơn, DB làm việc cũng đỡ vất vả hơn rât nhiều nhờ có 1 con `load-balancer`. 

+ Lượng dữ liệu đáp ứng: Hàng trăm TB
+ Lượng người dùng đáp ứng: Hàng triệu người
+ Nếu khoảng cách giữa người dùng và server của bạn ở xa, thì ứng dụng có thể bị chậm

### Lion

![](https://images.viblo.asia/ecbdc133-d0a3-4b8c-947b-b2822459d06f.jpg)

![](https://images.viblo.asia/03245132-72fb-4c71-81fd-6b14a7a24661.png)

Như các bạn đã đoán ra, để giải quyết bài toàn của con Tiger, chúng ta cần phải dùng CDN. Bạn có nhiều máy chủ đặt ở các vị trí khác nhau, như vậy thì khoảng cách tới user sẽ được giảm đi. 

+ Lượng dữ liệu đáp ứng: Hàng trăm TB
+ Lượng người dùng đáp ứng:  > 10 triệu người
+ Ứng dụng của bạn bị giới hạn bởi Big Data, bạn bị giới hạn bởi một Database Server ở vùng của bạn.

### Sabertooth

![](https://images.viblo.asia/439bd27a-3f8d-487b-adc6-1f3a09d3f32e.jpg)

![](https://images.viblo.asia/4ea3d11a-6c21-4187-8ba0-8922679c6a50.png)

![](https://images.viblo.asia/6cf0af6b-7910-4001-a067-2aa44e790751.png)

Với cơ sở dữ liệu đồ thị như Riak thì sức chứa dữ liệu của bạn không bị giới hạn.


+ Lượng dữ liệu đáp ứng: Không giới hạn 
+ Lượng người dùng đáp ứng:  bơi hết vào đây 
+ Tất nhiên vấn đề ở đây chỉ còn là tiền mà thôi @@


# Tổng kết

Chúng ta đã xem xét một số kiến trúc phổ biến nhất cho hầu hết các dự án. Bạn không cần phải gắn bó với chúng - nếu công việc yêu cầu điều đó, hãy đi và thiết kế 1 cái của riêng bạn. Chỉ cần nhớ rằng mọi công cụ đều có cách sử dụng khác nhau và hãy chắc chắn rằng bạn đang sử dụng các công cụ phù hợp với công việc của bạn.

**KEEP STATELESS, KEEP SCALABLE**.

Happy coding 

# Tham khảo 
https://dev.to/uyouthe/scalable-architecture-without-magic-and-how-to-build-it-if-youre-not-google-336a
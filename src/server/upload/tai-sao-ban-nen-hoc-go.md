![](https://images.viblo.asia/8abe4e41-c391-494a-a8d9-10e578081e06.gif)

Trong những năm gần đây, có một sự trỗi dậy của một ngôn ngữ lập trình mới **Go** hay **Golang**. Không có gì làm cho các developer chúng ta phát cuồng hơn một ngôn ngữ mới, phải không ?. Do đó tôi đã bắt đầu học Go từ 4 tới 5 tháng trước và tôi ở đây để nói với bạn tại sao chúng ta nên học ngôn ngữ này. 

Tôi sẽ không dạy bạn làm thế nào để viết "Hello world" trong bài viết này. Có rất nhiều những bài viết khác đã có nội dung này. Tôi sẽ giải thích giai đoạn hiện tại của phần mềm máy tính và tại sao chúng ta cần ngôn ngữ lập trình như Go. Bời vì nếu không có vấn đề gì tại sao chúng ta lại cần giải pháp phải không ?

## Hạn chế về phần cứng:

Định luật Moore đang trở nên sai

Bộ xử lí Pentium 4 đầu tiên với 3.0 Ghz tốc độ đồng hồ đã được giới thiệu vào năm 2004 bởi Intel. Ngày nay, MacBook Pro 2016 có tốc độ đồng hồ 2.9 Ghz. Do đó trong gần một thập kỉ, chúng ta đạt được không nhiều trong sức mạnh xử lí thô. Bạn có thể nhìn sự so sánh trong việc tăng sức mạnh xử lí theo thời gian với biểu đồ dưới đây. 

![](https://images.viblo.asia/fc99e75e-ec91-4e59-bf28-8e1fc2ca1ef4.png)

Từ biểu đồ trên bạn có thể thấy hiệu năng một luồng và tần suất của bộ xử lí vẫn ổn định trong gần một thập kỉ. Nếu bạn nghĩ rằng việc thêm bóng bán dẫn là giải pháp, có lẽ bạn đã sai. Bởi vì ở quy mô nhỏ hơn, một vài thuộc tính hạt quantum bắt đầu hiện ra và bởi vì nó thực sự tốn nhiều hơn để thêm nhiều bóng bán dẫn, số lượng bóng bán dẫn bạn có thể thêm bắt đầu hỏng. 

Do đó giải pháp cho vấn đề trên đó là

* Nhà sản xuất bắt đầu thêm nhiều hơn lõi xử lí cho các bộ xử lí. Ngày nay chúng ta có quad-core và octa-core CPU có sẵn

![](https://images.viblo.asia/aa3ac031-887c-41af-bde5-1857aad02877.jpg)

* Dùng [Hyper Threading](https://viblo.asia/p/giai-ngo-ve-may-tinh-het-core-roi-lai-den-thread-rut-cuoc-thi-no-la-cai-gi-4dbZNn7gZYM)
* Thêm cache vào bộ xử lí để tăng hiệu năng

Nhưng các giải pháp trên đều có những hạn chế. Chúng ta không thể mãi thêm cache cho các bộ xử lí để tăng hiệu năng bởi vì cache có những hạn chế về mặt vật lí: Cache càng lớn, thì nó càng chậm. Thêm nhiều cache tới các bộ xử lí cũng tốn kém hơn. Những bộ xử lí đa nhiều core có thể chạy nhiều thread cùng lúc và mang lại concurrency tới bức tranh của chúng ta. Chúng ta sẽ thảo luận vấn đề này sau. 

Do đó nếu chúng ta không thể dựa vào sự cải thiện của phần cứng, cách duy nhất chúng ta có thể làm là tạo ra những phần mềm hiệu quả hơn để tăng hiệu năng. 

## Go có goroutines
![](https://images.viblo.asia/b9f39e3e-0285-425e-9aad-0a3e9bca0a09.png)

Như chúng ta đã thảo luận trước đó, các nhà sản xuất phần cứng đã thêm nhiều lõi xử lí cho các bộ xử lí để tăng hiệu năng. Tất các trung tâm dữ liệu đều đang chạy trên các bộ xử lí đó, chúng ta nên mong đợi việc thêm các lõi xử lí ở những năm tiếp theo. Hơn thế nữa, những ứng dụng ngày nay đều đang sử dụng nhiều micro-services cho việc bảo trì các kết nối database, hàng đợi tin nhắn, và bảo trì cache. Do đó, những phần mềm mà chúng ta đang phát triển và các ngôn ngữ lập trình nên hỗ trợ concurrency và chúng nên có thể mở rộng với sự tăng lên về lượng lõi xử lí.

Nhưng các ngôn ngữ lập trình hiện đại như Python, Java đều là các môi trường đơn luồng. Hấu hết các ngôn ngữ đều hỗ trợ đa luồng nhưng vấn đề thật sự đến với sự tiến hành concurrent, khóa luồng ( thread-locking), điều khiển tương tranh (race conditions) và deadlock. Những điều đó dẫn đến việc khó để tạo ra ứng dụng đa luồng trên những ngôn ngữ đó. 

Ví dụ, tạo một thread mới trong Java không hiệu quả về mặt bộ nhớ. Bởi vì mỗi thread tốn tới gần 1Mb bộ nhớ và cuối cùng nếu bạn chạy hàng ngàn threads, chúng sẽ tạo ra lượng áp lực khổng lồ trên heap và sẽ buộc hế thống phải shutdown vì hết bộ nhớ (out of memory).

Mặt khác, Go được release vào năm 2009 khi bộ xử lí nhiều lõi đã có sẵn. Đó là lí do tại sao Go được xây dựng với việc giữ concurrency làm tiêu chuẩn. Go có goroutines thay vì các threads. Chúng chỉ tiêu tốn gần 2Kb bộ nhớ ở heap. Do đó bạn có thể tạo ra hàng triệu goroutines ở bất kì lúc nào.

![](https://images.viblo.asia/6574f967-1d9f-4e64-a9c6-d5c5969632f2.jpeg)

Những lợi ích khác: 

* Goroutines có segmented stack có thể phát triển. Nghĩa là chúng có thể sử dụng bộ nhớ chỉ khi chúng cần. 
* Goroutines có thời gian khởi động nhanh hơn threads
* Goroutines cho phép bạn tránh phải sắp xếp lại khóa mutex khi chia sẻ cấu trúc dữ liệu

![](https://images.viblo.asia/0037b843-9c2f-47e3-8201-5efb63b6ffb4.png)

## Go chạy trực tiếp bên dưới phần cứng 

Một lợi ích đáng kể nhất khi sử dụng C, C++ so với các ngôn ngữ lập trình hiện đại hơn như Java, Python đó là hiệu năng của chúng. Bởi vì cả C, C++ đều biên dịch không phải thông dịch. 

Các bộ xử lí hiểu mã nhị phân. Nói chung khi bạn xây dựng một ứng dụng sử dụng Java khi bạn compile dự án của bạn, nó sẽ biên dịch các mã người có thể đọc sang byte code cái có thể hiểu được bởi JVM. Tiếp đó VM thông dịch bytecode và chuyển chúng thành mã nhị phân bộ xử lí có thể hiểu được

![](https://images.viblo.asia/86e92cd8-8bd1-4837-bd52-9091c6b5e8d1.png)

Trong khi đó, C/C++ không tiến hành trên VM và xóa đi một bước từ vòng thực thi và tăng hiệu năng. Nó trực tiếp biên dịch mã code sang mã nhị phân.

![](https://images.viblo.asia/9e87e5a1-6d41-456d-8cb3-de21158bf761.png)

Nhưng việc cấp bộ nhớ và xóa bộ nhớ của những ngôn ngữ đó là một khó khăn lớn. Trong khi hầu hết các ngôn ngữ lập trình đều xử lí việc cấp phát và xóa chúng sử dụng Garbage Collector hoặc thuật toán [Reference Counting](https://www.educative.io/courses/a-quick-primer-on-garbage-collection-algorithms/jR8ml). 

Go đều mang những thứ tốt nhất của cả 2. Như các ngôn ngữ lập trình bậc thấp như C/C++, Go là ngôn ngữ biên dịch. Điều đó có nghĩa là hiệu năng gần giống với các ngôn ngữ đó. Nó cũng sử dụng garbage collector để cấp phát và xóa bộ nhớ các object. Thật cool phải không. 

## Code viết bởi Go rất dễ để maintain
Go không có cú pháp quá kinh khủng như nhiều ngôn ngữ khác. Nó rất gọn gàng và có một cú pháp sạch sẽ.

Những người thiết kế của Go ở google đã có điều này trong tư tưởng khi họ tạo ra ngôn ngữ này. Bởi vì google có một số lượng lớn code, code nên dễ để hiểu với những developer khác. 

Go cố ý bỏ đi nhiều tính chất của nhưng ngôn ngữ OOP hiện đại.

* **Không có class**. Mọi thứ được chia thành các package. Go chỉ có struct thay vì các class
* Không hỗ trợ kế thừa. Điều này giúp code dễ dàng để thay đổi. Như các ngôn ngữ khác như Java, Python nếu class ABC kế thừa từ class XYZ, class XYZ thay đổi có thể dẫn đến một số hậu quả các class kế thừa từ class XYZ. 
* Không constructors
* Không annotations
* Không generics
* Không có exceptions

Những điều trên làm Go rất khác so với các ngôn ngữ khác và khiến cho việc lập trình bằng Go cũng trở nên khác hơn. 
Bạn có thể phải code nhiều hơn để các các feature trên những điều đó cũng làm code của bạn sạch hơn và rõ ràng hơn.

![](https://images.viblo.asia/168a3093-9f40-45e3-8c3a-f5bcd396d643.png)

Đồ thị trên biểu thị rằng Go gần như hiệu quả như C/C++, trong khi vẫn giữ cú pháp đơn giản như Ruby, Python. 

## Go được chống lưng bời Google
* Đây có thể không phải là một lợi ích kĩ thuật trực tiếp. Nhưng Go được thiết kế và hỗ trợ bởi Google. Google là một trong những cơ sở hạ tầng điện toán lớn nhất thế giới. Go được thiết kế bởi Google để giải quyết vấn đề của họ trong việc hỗ trợ sự mở rộng và hiệu quả. Đó là những vấn đề giống với bạn khi tạo ra server của riêng mình 

## Kết luận :

* Mặc dù Go rất khác so với các ngôn ngữ hướng đối tượng khác, nó vẫn là một con quái thú. Go cung cấp cho bạn hiệu suất cao như C / C ++, xử lý đồng thời siêu hiệu quả như Java và thú vị để viết mã như Python / Perl.

* Nếu bạn không có bất kỳ kế hoạch nào để học Go, tôi vẫn sẽ nói rằng giới hạn phần cứng gây áp lực cho chúng t, các nhà phát triển phần mềm để viết mã siêu hiệu quả. Nhà phát triển cần hiểu phần cứng và tối ưu hóa chương trình của họ cho phù hợp. Phần mềm được tối ưu hóa có thể chạy trên phần cứng rẻ hơn và chậm hơn (như thiết bị IOT) và tác động tổng thể tốt hơn đến trải nghiệm người dùng cuối.

## Tham khảo :
https://medium.com/@kevalpatel2106/why-should-you-learn-go-f607681fad65
https://www.educative.io/courses/a-quick-primer-on-garbage-collection-algorithms/jR8ml
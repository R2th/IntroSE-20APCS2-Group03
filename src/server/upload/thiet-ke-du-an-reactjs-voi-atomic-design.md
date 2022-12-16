Chắc hẳn những ai đã làm việc với các dự án React cũng đều đã gặp một số vấn đề trong việc xây dựng cấu trúc của dự án. Với một số dự án nhỏ chắc có thể không cần thiết những với những dự án lớn có nghiệp vụ và cấu trúc phức tạp thì đây cũng sẽ là vấn đề đáng phải suy nghĩ. Với kinh nghiệm đã từng làm các dự án Frontend thì mình thấy việc xây dựng project structure khá là quan trọng, nếu không base tốt từ khi bắt đầu phát điển thì đến một giai đoạn dự án scale ra và độ phức tạp ngày càng cao thì lúc đó bạn sẽ thấy được những vấn đề như `spaghetti code`, code lặp lại rất nhiều, khó quản lý và scale. Không chỉ vậy, cấu trúc phức tạp sẽ dẫn đến việc triển khai unit test càng khó khăn hơn. Hơn nữa những developer khác khi tham gia dự án vào những giai đoạn sau sẽ rất khó tiếp cận vì cấu trúc không rõ ràng và phức tạp. Việc xây dựng base tốt sẽ tiết kiệm được chi phí phát triển cũng như bảo trì cho các giai đoạn sau này.

Nói chung sẽ có một số vấn đề mà bạn cần giải quyết như:
* Đau đầu trong việc thiết kế và quản lý các component.
* Code bị lặp lại khá nhiều.
* Khó khăn trong việc áp dụng unit test.
* Khi sửa đổi dễ phá vỡ hoặc ảnh hưởng đến các module và chức năng khác.

Vì vậy trong bài viết này, mình sẽ giới thiệu qua Atomic Design những để tìm hiểu chi tiết thì bạn có thể tham khảo ở [Link](https://bradfrost.com/blog/post/atomic-web-design/) này.

**1. Atomic Design là gì?**

Atomic Design là một phương pháp thiết kế cấu trúc web phổ biến với 5 giai đoạn riêng biệt cùng làm việc và kết hợp với nhau để tạo nên một hệ thống web hoàn chỉnh. Tư tưởng của Atomic Design là chia nhỏ trang web của bạn thành các phần tử riêng biệt và ghép lại chúng để tạo thành một hệ thống web. Dưới đây là cấu trúc của Atomic Design:
![](https://images.viblo.asia/5b5c1cf6-5fe2-45cc-a710-c0560e9c8325.png)

**2. Các khái niệm trong Atomic Design**

**Atom**

Atom là những phần tử nhỏ nhất có thể trong một trang web. Atom ở đây chính là các thẻ html như label, button, img,... Atom cũng có thể bao gồm các yếu tố trừu tượng hơn như bảng màu, phông chữ và thậm chí là cả hình ảnh động. Atom không đứng riêng lẻ mà chúng được kết hợp trong các molecules để xây dựng lên các thành phần của một trang web. Ví dụ:

![](https://images.viblo.asia/141fbb96-693a-4535-b659-5e028875600a.png)


**Molecules**

Molecules là những thành phần được tập hợp bởi một hoặc nhiều Atom khác nhau để cấu thành các Molecules với nhiệm vụ và vai trò khác nhau. Tuy các Molecules được tách biệt với nhau nhưng chúng lại có thể sử dụng chung các Atom đã được xây dựng trước đó. Việc sử dụng chung như vậy sẽ hạn chế code bị lặp lại khá nhiều trong quá trình phát triển. Ví dụ mình có một item post và trong đó các các thẻ như `button`, `h1` và `p` là các Atom còn item post là một Molecules.

![](https://images.viblo.asia/915f7278-e1df-4621-a83e-c7f6861e3e54.png)

**Organisms**

Các Molecules đã cung cấp cho chúng ta một số block để làm việc và bây giờ chúng ta có thể kết hợp chúng với nhau để tạo thành các Organisms. Organisms là những nhóm phân tử liên kết với nhau để tạo thành một phần tương đối phức tạp và riêng biệt. Atomic Design luôn khuyên khích các developer trong quá trình phát triển luôn giữ được tính độc lập từ Molecules cho đến Organisms. Bạn hiểu đơn giản như thế này, trong một trang web mình có một chức năng xem danh sách các bài post là Organisms, mỗi bài post  sẽ là Molecules và các element trong mỗi bài post đó sẽ là Atom. Nếu chỉ có các Atom hoặc Molecules không thì trang web sẽ không có hình dạng gì cả nhưng sau khi chúng đã được tập hợp lại ở Organisms thì giao diện của trang web đã được hình thành. Ngoài ra, các Molecules, Atom và Organisms cũng đều có thể tái sử dụng được trong một trang web.

![](https://images.viblo.asia/408a3b14-b7ee-42b6-abf7-82ea341c7c81.png)

**Templates**

Templates là tập hợp và liên kết của các Organisms để mô tả bố cục giao diện của một trang web. Trong giai đoạn này, chúng ta sẽ thấy được sự kết hợp với các thành phần với nhau và dần hình thành nên bố cục cụ thể của một trang web.
![](https://images.viblo.asia/49e49624-be38-409d-a93b-9a670e223712.png)

**Pages**

Page là các trường hợp cụ thể của các template, nó miêu tả chính xác nhất những gì cuối cùng mà người dùng sẽ nhìn thấy và tương tác như giao diện và chức năng. Đồng thời ở giai đoạn này chúng ta có thể đánh giá được tính hiệu quả của thiết kế trang web. Ví dụ như một vài post 1000 dòng và 100 dòng sẽ hiển thị như thế nào từ đó sẽ đưa ra các phương pháp cải thiện giao diện người dùng hợp lý và hiệu quả. 

![](https://images.viblo.asia/9e421d23-64ef-4d0c-84f9-3643f62e7d3d.png)

**Tổng kết**

Không phải dự án nào cũng sẽ như dụng những kiến trúc giống nhau vì mỗi dự án sẽ có những đặc thù riêng về công nghệ cũng như bussiness nhưng nhìn chung nó sẽ là một tư tưởng để chúng ta có thể áp dụng hoặc cải thiện tốt hơn kiến trúc của dự án hiện tại. Trong bài viết sau mình sẽ hướng dẫn các bạn xây dựng dự án React với Atomic Design. Cảm ơn các bạn đã đọc bài viết của mình.
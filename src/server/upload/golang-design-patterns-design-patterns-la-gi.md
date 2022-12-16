# Design Patterns là gì ?
![patterns-04-2x.png](https://images.viblo.asia/c5af5b5b-7f4d-42dc-a01c-77840552a338.png)
## Khái niệm
> Design patterns are typical solutions to commonly occurring problems in software design. They are like pre-made blueprints that you can customize to solve a recurring design problem in your code.

![patterns-01-2x.png](https://images.viblo.asia/33f10761-15dd-4dc8-8250-ede4cf003fbb.png)
( Dựa trên refactoring.guru)

Hiểu theo cách đơn giản, design patterns là các giải pháp tổng thể được dùng để giải quyết các vấn đề, bài toán chung thường gặp trong lập trình. 

Design pattern không phải là một đoạn code cụ thể, mà là một khuôn mẫu chung để giải quyết một vấn đề cụ thể.

Các design patterns thường bị nhầm lẫn với các thuật toán, bởi vì cả hai khái niệm đều mô tả các giải pháp điển hình cho một số vấn đề đã biết. Điều khác biệt là thuật toán luôn luôn xác định một tập hợp các hành động rõ ràng để giải quyết vấn đề, trong khi design patterns mô tả một cách khái quát hơn để giải quyết vấn đề đó. 

Ví dụ như trong việc xây dựng một ngôi nhà. Design patterns giống như bản vẽ thiết kế, giúp chúng ta hình dung và hiểu được cấu trúc, vị trí cũng như mục đích sử dụng của các căn phòng. Bản vẽ thiết kế tốt sẽ giúp ngôi nhà thuận tiện xử dụng, tránh gặp các vấn đề bất tiện trong sử dụng ngôi nhà. Trong khi thuật toán sẽ giống như bản kế hoạch xây dựng ngôi nhà, sử dụng những nguyên vật liệu gì (đầu vào), xây dựng tối ưu (thuật toán) ra sao để có được căn phòng đó (đầu ra).

## Lịch sử
Các design patterns là giải pháp điển hình cho các vấn đề thường gặp trong thiết kế hướng đối tượng. Khi một giải pháp được lặp đi lặp lại trong các dự án khác nhau, cuối cùng ai đó sẽ đặt tên cho nó và mô tả chi tiết giải pháp. Về cơ bản, đó là cách một mẫu được phát hiện.

Các design patterns trong series này được thiết kế bởi bốn tác giả: Erich Gamma, John Vlissides, Ralph Johnson và Richard Helm vào năm 1994, trong cuốn sách Design Patterns – Elements of Reusable Object-Oriented Software. Trong cuốn sách này, họ áp dụng khái niệm design patterns vào lập trình. Cuốn sách giới thiệu 23 patterns giải quyết các vấn đề khác nhau của thiết kế hướng đối tượng và nhanh chóng trở thành sách bán chạy nhất. Do cái tên dài dòng của nó, mọi người bắt đầu gọi nó là  “the book by the gang of four” , sau đó  được rút ngắn lại thành “the GoF book”.

Kể từ đó, hàng chục design patterns hướng đối tượng khác đã được phát hiện. “pattern apporach" (phương pháp tiếp cận mẫu) đã trở nên rất phổ biến, vì vậy rất nhiều patterns khác hiện cũng tồn tại không chỉ trong thiết kế hướng đối tượng.

## Tại sao nên dùng / học patterns?
Thực tế là bạn có thể xoay sở để làm việc như một lập trình viên trong nhiều năm mà không cần biết về một khuôn mẫu nào. Rất nhiều người chỉ làm như vậy. Tuy nhiên, ngay cả trong trường hợp đó, bạn có thể đang triển khai một số mẫu mà không hề hay biết. Vậy tại sao bạn lại dành thời gian tìm hiểu chúng?
* Các design patterns là một bộ công cụ gồm các giải pháp đã được thử và kiểm tra cho các vấn đề thường gặp trong thiết kế phần mềm. Ngay cả khi bạn không bao giờ gặp phải những vấn đề này, biết các mẫu vẫn hữu ích vì nó dạy bạn cách giải quyết tất cả các loại vấn đề bằng cách sử dụng các nguyên tắc của thiết kế hướng đối tượng.
* Các mẫu thiết kế xác định một quy ước chung mà bạn và đồng đội của bạn có thể sử dụng để giao tiếp hiệu quả hơn. Ví dụ khi bạn đề xuất, “chúng ta có thể sử dụng Singleton,” và mọi người sẽ hiểu ý tưởng đề xuất của bạn.

# Phân loại Design Patterns
Dựa theo các tác giả, các design patterns được phân loại theo ý định hoặc mục đích sử dụng. Cụ thể như sau:
* Nhóm Creational patterns: cung cấp các cơ chế khởi tạo đối tượng để tăng tính linh hoạt và tái sử dụng.
* Nhóm Structural patterns: giải thích cách nhóm các đối tượng và lớp ( object, class) thành các cấu trúc lớn hơn, đồng thời giữ cho các cấu trúc này linh hoạt, hiệu quả.
* Nhóm Behavioral patterns: liên quan đến hành vi giao tiếp và phân chia nhiệm vụ giữa các đối tượng.
# Nguồn tham khảo
https://refactoring.guru/
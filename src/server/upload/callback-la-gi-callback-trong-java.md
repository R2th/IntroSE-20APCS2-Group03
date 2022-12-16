Chào các bạn hôm nay mình sẽ giới thiệu cho các bạn về “callback” trong java .
Vậy trước tiên hãy cùng đi tìm hiểu callback là gì và tác dụng của callback trước

# I.Callback là gì
Oki vào ví dụ luôn cho nó nóng.
![](https://images.viblo.asia/4ef32ec1-d841-479a-b984-e1ebc294e0ef.png)


*(do sợ 1 số bạn không quen code javascript lên mình cmt hơi chi tiết cho dễ hình dung)*

Như đoạn mã code bên dưới .Mình thực hiện hiển thị các số chẵn trong mảng 1 mảng.
Vậy nếu giờ mình muốn hiện thị 1 các sỗ lẻ thì làm phải thể nào? Chẳng nhẽ lại đi viết thêm một hàm nữa, hay mình muốn hiển theo các điều kiện phức tạp hơn thì phải làm sao??? 
Và callback ra đời để giải quyết vấn đề này
![](https://images.viblo.asia/a04965d6-b244-4d8a-a6e4-6329353545e7.png)

Hãy nhìn đoạn code. Thay vì gán cố định đoạn code kiểm tra số chẵn. mình truyền thẳng 1 hàm vào trong hàm. Hàm được truyền vào sẽ thực hiện việc kiểm tra cho mình. Và sẽ được định nghĩa bên ngoài
Oki có vẻ hơi loạn. hay thử lấy 1 ví dụ thực tế hơn để dễ hình dung hơi nhé.

* Ví dụ bạn là 1 chủ nợ, bạn có danh sách con nợ và bạn cần đi đòi. (array)
* Thay vì bạn phải đến từng nhà con nợ đề đòi (code đầu tiền). 
* Bạn sẽ nhờ 1 thằng khác . Bạn đưa địa chỉ nhà cho nó(dữ liệu – truyền phần tử thứ i). 
* Nó đòi theo cách nào bạn không cần biết. chỉ cần biết là đòi được hay không. Nếu đói được bạn xóa tên khỏi danh sách nợ (đoạn code hiển thị).
* Nếu con nợ dễ dàng dùng thằng vừa vừa, Nếu con nợ khó khăn dùng thằng to con (linh động sử dụng tùy trường hợp giống như muốn lọc số chẵn hay số lẻ)

Theo wiki  
> “callback là một đoạn code chạy được (thường là một hàm A) được sử dụng như tham số truyền vào của hàm B nào đó. Hàm A được gọi ngay lập tức hoặc trễ một chút sau khi hàm B được gọi. Các ngôn ngữ lập trình khác nhau hỗ trợ callback theo các cách khác nhau, thường được triển khai dưới dạng chương trình con, hàm nặc danh, chuỗi lệnh hoặc con trỏ hàm.”

Vậy hình dung đơn giản callback là việc truyền 1 hàm vào 1 hàm khác, dễ hiểu hơn rồi đúng không.

Mình sẽ giới thiệu thêm 2 cách viết callback nữa để có thể dễ dàng sự dùng callback trong javascript

![](https://images.viblo.asia/d3229bad-1d47-4f2e-9efa-912109f8812f.png)

Với 2 cách triển khai bạn sẽ dễ dàng triển khai callback một cách lịnh động mà không phải tạo ra hàm cụ thể.
Vậy qua ví dụ nhỏ bằng ngôn ngữ javascript chắc bạn cũng hiểu cơ bản callback là gì và công dụng của callback. Giờ qua với bước chính, triển khai callback trong java

# II. Callback trong java
Vào chủ đề chính ngày hôm này nào. Vậy java có thể triển khải được callback như javascript được không.

Như chúng ta đã biết, Java là một ngôn ngữ thuần Hướng Đối Tượng. Bạn chỉ có thể truyền kiểu dữ liệu nguyên thủy (int,long,double,…) hoặc Class (List,String,.. ) hay Class tự định nghĩa.

=> java không có callback? Không hẳn hay cũng xem ví dụ sau.

 ![](https://images.viblo.asia/ccc00348-f944-40f9-8d26-0bce135fb0e8.png)
 
*Đoãn mã giải quyết bài toán giống với javascript*

Nếu Java không cho phép truyền 1 hàm vào.Thì hay thử truyền 1 class có duy nhất 1 phương thức.Hừm vậy có phải callback không nhỉ?.
Có lẽ không, giờ muốn thực hiện với số lẻ thì sao. Có vẻ cách này vẫn không khả quan lắm.

Mục tiêu của callback là hàm A sẽ được truyền vào hàm B. và hàm A sẽ được định nghĩa khi gọi hàm B. Ta cần 1 cái gì đó chỉ cần khai báo tên hàm và sẽ được thực hiện sau, nghe quen đúng không???
 Bùm!!!

![](https://images.viblo.asia/539bc939-c444-41f8-81ab-2d224411ee37.png)

Đúng vậy. Hay thử dùng interface. Interface chỉ cần thực hiện hàm khi triển khai.
Giờ ta hoàn toàn có thể dễ dàng triển khai với cả số lẻ bằng cách tạo ra các đội tượng khác nhau của interface KiemTra

Tất nhiên bạn có thể tạo 1 class KiemTraSoLe impl KiemTra.
Thực hiện Tính đa hình trong java để truyền tham số,nhưng nó quá bất tiện

Done... đã có calltrong java

**Vậy Java sử dụng cơ chế Interface để triển khai callback. Với 1 điều kiện interface đó có duy nhất 1 method (có 2 method thì biết gọi thằng nào….).**

Bhưng để triển khai callback trong java có vẻ hơi dài đúng không?

Bạn hoàn toàn có thể khởi tạo interface trong tham số để code ngắn hơn.
Đặc biệt trong Java 8 cũng cấp thêm cơ chế lambda để dễ dàng triển khai CallBack.

![](https://images.viblo.asia/753efc7e-3b0a-49f6-bb3a-08d5f44cc4a0.png)

Đoạn code đã được rút ngọn đi rất nhiều và có vẻ giống thằng js hơn.
Về lambda mình sẽ có riêng 1 bài kết hợp với việc sự dụng Stream API để tăng tốc triển khai code với Collection.

Ngoài ra java 8 còn cung cấp rất nhiều các interface kết hợp với generic để dễ dàng thực hiện biểu thực lambda.
ví dụ như : 
Function với T là tham số vào, R là kết quả ra
* Consumer có kiểu tra về void
* Predicate có kiểu trả về boolean,
* IntFunction,LongFunction,DoubleFunction có kiểu trả về Int,Long,Double.
* Và rất nhiều interface khác mình sẽ giới thiệu và áp dụng trong bài tiếp theo về lambda và streamAPI
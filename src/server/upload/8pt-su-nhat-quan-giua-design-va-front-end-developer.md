# Giới thiệu #
**Space**( khoảng cách ) là tất cả mọi thứ trong **UI Design**.

Quên những thứ khác trong **Design** như : **colour** ( màu sắc ) và **typography** ( kiểu chữ ) đi vì bài viết này mình sẽ chỉ tập trung vào sự nhất quãn trong **Space**.

Tại sao nhỉ ?

- Nó giúp 1 đống dữ liệu như này nhìn dễ đọc hơn. hay làthếnày đễđọchơn.
- Nó cung cấp cho người dùng sự trải nghiệm nhất quãn.
- Nó giúp **design** đỡ đau đầu hơn trong việc đoán xem nên để tầm bao nhiêu **px**. 
- Khả năng mở rộng và chỉnh sửa dễ dàng và đã có sự thống nhất.
- Sản phẩm sẽ đẹp hơn và gọn gàng hơn.
- Nó là sự chuyên nghiệp.

![](https://images.viblo.asia/61362256-5180-4fd4-8c2c-457804983f12.png)

# Thiết lập UI với Space #
Nếu bạn đã từng làm qua 1 dự án với phía **Front End** thì biết rằng nếu không sự thống nhất hoặc là nguyên tắc nào đó giữa bạn và **Design** thì việc chỉnh sửa **code** để được giao diện theo như phía **design** thiết kế ra, sẽ là sự canh chỉnh từng tí, vài **px** và từng **px** một. 

Công việc của bạn chắc chắn sẽ chậm đi rất nhiều, còn một đống thứ cần xử lý nữa chứ đâu phải ngồi chỉnh cái **button** này lệch qua trái vài ba **px**, cái **image** này qua phải tầm vài **px** nữa, thế là ta xong một ngày làm việc.

Mình có thể chắc chắn là bạn đã nghe qua hoặc sử dụng [Bootstrap](https://getbootstrap.com/) rồi, mình đã từng sử dụng **button**, **input** của họ, đơn giản bằng cách thêm các **class** có sẵn mà họ đã viết vào đó.

Một điều có thể các bạn cũng nhận ra là những **Component** này dùng riêng rẽ hoặc đứng một thì về **UI** nhìn rất hợp lý và đẹp, nhưng khi ta đặt nó vào trong một **element** lớn hơn thì nhìn tổng thể ví dụ như của một **page** sẽ không được ăn khớp với nhau, điều này là do việc đạt được một bố cục thẩm mỹ cho toàn bộ **page** rất khó để tạo ra một cách nhất quán.

=> vì vậy, chúng ta cần một sự thống nhất **Space**.

![](https://images.viblo.asia/026a9b58-82a7-478a-a820-21693306e3b3.png)

Các bạn có thể thấy hình ảnh trên, bên trái là một hệ thống **Grid** ( lưới ) **8pt** sắp xếp theo **column** và bên phải cũng sắp xếp theo **colunm** nhưng không hề có sự thống nhất về **Space** và **size** ( kích thước ).

## Tại sao Bootstrap là chưa đủ ? ##
 [Bootstrap](https://getbootstrap.com/) là một **library**, cung cấp chúng ta một đống thứ ngon lành cành đào để chúng ta tập trung vào phát triển nội dung  và trải nghiệm người dùng **page** đó, nó được áp dụng trên rất nhiều trang **website** và tất nhiên đã nâng cao chất lượng của **website** đó.
 
 Nhưng việc chúng ta không có một sự nhất quãn trong **Space**, có thể dẫn đến sự không thống nhất bố cục giữa nhiều **page** của **website** với nhau, đặc biêt hơn là nếu **design** có nhiều người.

Khi xây dựng thương hiệu của chúng tôi ở Pivotal chúng tôi thường tạo ra những Components và Layouts độc nhất. Trong khi gần đây chúng tôi nỗ lực hợp nhất hệ thống UI, chúng tôi bắt gặp một sự thật rằng là thương hiệu của chúng tôi ở phía góc trên khác một chút. Được xây dựng bởi các team khác nhau trên khắp thế giới, concept thì giống nhau nhưng khi thực hiện lại có chút khác biệt. Vậy cái nào sai, concept hay execution?

![](https://images.viblo.asia/18311dab-f4a3-4d04-99fa-c808c84c7261.png)

Câu trả lời là cả hai đều không phải. Họ có những **height** và **padding** khác nhau nhưng không có hệ thống để giải thích những suy nghĩ đằng sau **style rule** tại sao bạn nên tuân theo nó?



## Giải pháp là gì ? ##
Hệ thống **Grid 8pt**, đó là việc sử dụng ít nhất là **8** đơn vị tăng theo cấp số cộng của **8**. 

Điều này có nghĩa là bất kỳ **height** hoặc **width** được xác định, **margin** hoặc **padding** sẽ tăng 8 đơn vị.

![](https://images.viblo.asia/6358fca7-37b1-4780-883d-4df979bc8a59.png)

## Tại sao lại là 8 ? ##
Sự đa dạng về **screen sizes** ( kích thước màn hình ) và mật độ **pixel** đã tiếp tục tăng lên khiến công việc của **Design** và **Front End** trở lên phức tạp hơn. Việc sử dụng một số chẵn như **8** giúp cho việc chia tỷ lệ cho nhiều loại thiết bị trở nên dễ dàng và nhất quán. Ví dụ, các thiết bị có độ phân giải **1,5x** sẽ khó có thể làm tròn nhiệm nhiệm vụ với các số lẻ. Thu nhỏ **5px** x **1,5 lần** sẽ tạo ra độ lệch **một nửa** **pixel**.

![](https://images.viblo.asia/f95bf62c-2d73-4bf7-8549-ca4417b8c063.png)


### Tại sao không phải 6 hay 10 ###
Phần lớn các **screen sizes** phổ biến chia hết cho **8**, giúp dễ dàng điều chỉnh. 

Chia tỷ lệ theo bội số của **8** cho phép bạn có nhiều tùy chọn tốt mà không làm bạn quá tải như hệ thống **6**  hoặc giới hạn bạn như hệ thống **10** .

Cuối cùng, bạn phải quyết định kích thước phù hợp với nhu cầu và yêu cầu của bạn. Hệ thống chỉ hiệu quả khi mà nó dễ dàng làm theo và lặp lại nó (**easy to follow and repeat it**)

![](https://images.viblo.asia/caaae1da-f23d-479e-905f-81a33bb5c62c.png)

# Kết bài #
**Cảm ơn bạn** đã đọc bài viết của mình, nếu có gì thắc mắc hoặc góp ý xin vui lòng bình luận phía dưới.

## Tham khảo ##
Bài viết mình có tham khảo những nguồn dưới đây :

https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632
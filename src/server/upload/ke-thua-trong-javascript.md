**Javascript** có thể nói là ngôn ngữ lập trình được tất cả các lập trình viên biết tới, dù sử dụng ngôn ngữ backend nào đi chăng nữa chúng ta vẫn đều phải biết chút ít về front-end và đương nhiên trong đó có js. Vì thế việc nắm được những khái niệm căn bản cũng như cốt lõi về cơ chế hoạt động của ngôn ngữ này là điều cần thiết với mỗi lập trình viên. Trong bài viết ngắn hôm nay mình xin giới thiệu hoặc có thể nói là nhắc lại kiến thức nền tảng và quan trọng của javascript đó là tính kế thừa, cụ thể hơn là đi sâu vào **prototype** Vậy prototype là gì?

![](https://images.viblo.asia/3ff8e3e5-bbf4-4d49-95a4-77652fdbc6a9.jpg)

## Prototype
**Prototype** là một phương thức ẩn đặc biệt của object, khi mới khởi tạo object, prototype là một object chỉ có một hàm constructor. 
> Function cũng là một object trong  javascript

`Prototype` là cơ chế, khái niệm trọng tâm của javascript cho phép chúng ta thực hiện kế thừa giữa 2 hay nhiều object với nhau. Ví dụ khi chúng ta tạo mới một array bằng từ khóa `new` Array thì ngay lập tức Array.prototype sẽ được gọi và trong array mới này sẽ có các properties của Array. Để truy cập vào prototype của một object chúng ta cần sử dụng một property giả có tên là `__proto__` .
> `__proto__` chính là setter/getter cho property
> 
Chúng ta cùng xem qua ví dụ dưới đây.
![](https://images.viblo.asia/83ae6825-36f2-43b5-900e-164bdf0f1535.png)

Như ví dụ trên, chúng ta không thể lấy danh sách prototype của object bằng cách newArray.prototype được, mà phải thông qua newArray.`__proto__` Trong đối tượng mới newArray này có tất cả các phương thức của Array (Object có sẵn trong javascript).
> Tất cả các object đều kế thừa Object.prototype, và bản thân Object.prototype có prototype là null hay nói cách khác là không có prototype.
> 

Cùng xem ví dụ dưới đây:
![](https://images.viblo.asia/132ee2fa-f76b-419b-9195-fff1ba0fab69.png)

Vẫn như ví dụ 1, chúng ta dùng `__proto__` để truy cập vào một object, đầu tiền. newArray.`__proto__` là một array. TIếp theo newArray.`__proto__.__proto__` là một object. Sau cùng newArray.`__proto__.__proto__.__proto__` là null. Nếu bạn vẫn tiếp tục get prototype thì kết quả sẽ lỗi kiểu là `Cannot read property '__proto__' of null` (Đương nhiên rồi).

Vậy chúng ta có thể hiểu đơn giản, khi muốn lấy một property hay method trong một object, javascript sẽ tìm kiếm trong object đó, nếu không có nó sẽ tìm trong prototype tương ứng của object đó, nếu mà không có nữa thì nó sẽ trả về undefined.

Cùng xem mối quan hệ dưới đây để hiểu hơn nhé.

![](https://images.viblo.asia/b22b0d12-dbbf-471d-87b6-669bd4dbfe7e.gif)

Đây là khái niệm **prototype chain** Chúng ta sẽ cùng tìm hiểu kỹ hơn một chút nhé.
## Prototype chain

Ta có thể hiểu một object sẽ lấy method, properties từ chính prototype của Constructor tạo ra nó như từ function hoặc class, hoặc từ prototype của constructor cao hơn nó như Array, Number, String, cuối cùng là Object. Cùng xem ví dụ dưới đây
![](https://images.viblo.asia/e56e7755-d220-45ef-8159-a4d2eeccf188.png)

![](https://images.viblo.asia/0dc272e7-e550-492c-84d0-16234b4581b2.png)

Theo ví dụ trên chúng ta có thể hiểu rabbit kế thừa từ animal hoặc animal là prototype của rabbit, khi truy cập đến property nào của object mà không tìm được nó sẽ men theo cây cấp bậc từ dưới lên đến cấp cao nhất trên cả animal là Object.

## Ghi đè phương thức
Chúng ta đã có một đối tượng kế thừa từ đối tượng khác, việc sửa đổi property của đối tượng cha là nhu cầu cần thiết, cùng theo dõi ví dụ sau:
![](https://images.viblo.asia/03779b44-920d-45d8-ae8c-62095e23ccf0.PNG)

Từ ví dụ trên ta có thể thấy, dù Object (là đối tượng gốc) bị ghi đè phương thức `toString()` tuy nhiên đối với các kiểu dữ liệu Array, String, và Number thì đối tượng được khởi tạo vẫn sử dụng hàm constructor của nó chứ không hề sử dụng phương thức của Object cha. Còn với các đối tượng được khai báo bằng {}, new function hay new class thì sẽ bị sử dụng phương thức của Object.
## Khởi tạo phương thức
Chúng ta hoàn toàn có thể thêm mới một phương thức cho Object, sau đó các đối tượng dưới nó sẽ có thể sử dụng, nếu bản thân đối tượng con này không có phương thức nào như thế, còn nếu có nó sẽ ưu tiên sử dụng phương thức mà chính nó có.
![](https://images.viblo.asia/a7e6fe5b-f1b4-45cd-9459-c74fe0bd28fd.png)

Để mỗi object con sử dụng phương thức của riêng nó chúng ta cũng làm tương tự như với Object cha.
![](https://images.viblo.asia/8ce5a36f-040f-46c6-a394-99ceb60d2981.png)

## Kết luận
Như vậy trong bài viết này mình đã giới thiệu về cơ chế kế thừa trong javascript thông qua `prototype`, một khái niệm cốt lõi của javascript. Hy vọng thông qua bài viết này phần nào giúp mọi người hiểu thêm về cách hoạt động của javascript và phục vụ tốt hơn cho nhu cầu làm việc. Về prototype còn rất nhiều điều cần nói tới tuy nhiên đây có thể là những nội dung cốt yếu. Mong các bạn có thể nắm được.
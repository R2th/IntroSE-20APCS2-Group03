Trong chương trước, chúng ta đã biết rằng HTTP (Hyper-Text Transfer Protocol) là nền tảng của các API trên web và để sử dụng chúng, chúng ta cần biết HTTP hoạt động như thế nào. Trong chương này, chúng ta sẽ khám phá các kiểu dữ liệu được  API cung cấp, cách nó được định dạng và cách HTTP làm cho nó có thể.

## Sự miêu tả dữ liệu

Khi chia sẻ dữ liệu với mọi người, khả năng hiển thị thông tin chỉ bị giới hạn bởi trí tưởng tượng của con người. Nhớ lại tiệm bánh pizza từ chương trước - làm thế nào họ có thể định dạng thực đơn của họ? Nó có thể là một danh sách chỉ có văn bản, gạch đầu dòng; nó có thể là một loạt các bức ảnh với chú thích; hoặc thậm chí có thể chỉ là hình ảnh, mà khách hàng nước ngoài có thể chỉ vào để đặt hàng.

*Một định dạng dữ liệu thiết kế tốt hay không quyết định bởi việc thông tin có dễ hiểu nhất cho khách hàng dự kiên không.*

Nguyên tắc tương tự được áp dụng khi chia sẻ dữ liệu giữa các máy tính. Một máy tính phải để dữ liệu theo định dạng mà máy tính khác có thể hiểu. Nói chung, dữ liệu phải là một số loại định dạng văn bản. Các định dạng phổ biến nhất được tìm thấy trong các API là JSON (JavaScript Object Notation) và XML (Extensible Markup Language).

## JSON

Nhiều API mới đã sử dụng JSON làm định dạng vì nó được xây dựng trên ngôn ngữ lập trình Javascript phổ biến, có mặt khắp nơi trên web và có thể sử dụng được ở cả front end và back end của ứng dụng hoặc dịch vụ web. JSON là một định dạng rất đơn giản có hai phần: khóa và giá trị. Các khóa đại diện cho một thuộc tính về đối tượng được mô tả. Một đơn đặt hàng pizza có thể là một đối tượng. Nó có các thuộc tính (khóa), chẳng hạn như loại vỏ, lớp phủ và trạng thái đơn hàng. Các thuộc tính này có các giá trị tương ứng (lớp vỏ dày, ớt pepperoni và giao hàng ngoài).

Chúng ta hãy xem đơn hàng pizza này có được mô tả thế nào dưới dạng JSON:

```json
{
    "crust": "original",
    "toppings": ["cheese", "pepperoni", "garlic"],
    "status": "cooking"
}
```

Trong ví dụ JSON ở trên, các khóa là các từ bên trái: crust, toppings, và status. Chúng cho chúng ta biết những thuộc tính của đơn hàng pizza. Các giá trị là các phần bên phải. Đây thực ra là chi tiết thực tế của đơn đặt hàng.

![](https://images.zapier.com/storage/photos/5422e3c48cc047fb5c8f29b66367fffb.png?format=jpg)

Nếu bạn đọc một dòng từ trái sang phải, bạn sẽ nhận được một câu tiếng Anh khá tự nhiên. Lấy dòng đầu tiên làm ví dụ, chúng ta có thể đọc nó là "lớp vỏ cho chiếc bánh pizza này là kiểu nguyên bản." Dòng thứ hai cũng có thể được đọc như vậy - trong JSON, một giá trị bắt đầu và kết thúc bằng dấu ngoặc vuông ([]) là danh sách các giá trị. Vì vậy, chúng tôi đọc dòng thứ hai của đơn đặt hàng là "toppings cho đơn hàng này là: phô mai, pepperoni và tỏi."

Đôi khi, bạn muốn sử dụng một đối tượng làm giá trị cho khóa. Hãy mở rộng đơn đặt hàng pizza của chúng ta với các chi tiết khách hàng để bạn có thể thấy điều này trông như thế nào:

```json
{
  "crust": "original",
  "toppings": ["cheese", "pepperoni", "garlic"],
  "status": "cooking",
  "customer": {
    "name": "Brian",
    "phone": "573-111-1111"
  }
}
```

Trong phiên bản cập nhật này, chúng ta thấy rằng một khóa mới, "customer", đã được thêm vào. Giá trị cho khóa này là một bộ khóa và giá trị khác cung cấp chi tiết về khách hàng đã đặt hàng. Trò lừa bịp hả?! Điều này được gọi là một mảng kết hợp. Đừng để thuật ngữ kỹ thuật làm bạn khó xử - một mảng kết hợp thực chất chỉ là đối tượng lồng nhau.

## XML

XML đã có từ năm 1996. Với tuổi đời như thế, nó đã trở thành một định dạng dữ liệu rất trưởng thành và mạnh mẽ. Giống như JSON, XML cung cấp một vài khối xây dựng đơn giản mà các nhà sản xuất API sử dụng để cấu trúc dữ liệu của họ. Khối chính được gọi là một nút.

Hãy xem thứ tự pizza của chúng tôi có thể trông như thế nào với định dạng XML:

```xml
<order>
    <crust>original</crust>
    <toppings>
        <topping>cheese</topping>
        <topping>pepperoni</topping>
        <topping>garlic</topping>
    </toppings>
    <status>cooking</status>
</order>
```

XML luôn bắt đầu bằng một nút gốc, trong ví dụ về pizza của chúng tôi là "order". Bên trong order là các nút "con" . Tên của mỗi nút cho chúng ta biết thuộc tính của thứ tự (như khóa trong JSON) và dữ liệu bên trong là chi tiết thực tế (như giá trị trong JSON).

![](https://images.zapier.com/storage/photos/5cfca2d3c6904339b4d1e06181b0c850.png?format=jpg)

Bạn cũng có thể suy ra các câu tiếng Anh bằng cách đọc XML. Nhìn vào dòng với "crust", chúng ta có thể đọc, "ớp vỏ cho chiếc bánh pizza này là kiểu nguyên bản". Lưu ý rằng trong XML, mọi mục trong danh sách "topping" được bao bọc bởi một nút. Bạn có thể thấy định dạng XML yêu cầu nhiều văn bản hơn để giao tiếp so với JSON.

## Các định dạng dữ liệu được sử dụng trong HTTP như thế nào?

Chúng ta đã khám phá một số định dạng dữ liệu có sẵn, vì vậy chúng ta cần biết cách chúng được sử dụng trong HTTP. Để làm như vậy, chúng tôi sẽ nói xin chào một lần nữa với một trong những nguyên tắc cơ bản của HTTP: tiêu đề. Trong Chương 2, chúng tôi đã học được rằng các tiêu đề là một danh sách thông tin về một yêu cầu hoặc phản hồi. Có một tiêu đề để quy định định dạng của dữ liệu là: Content-Type.

Khi máy khách gửi content-type trong một request, nó sẽ báo cho máy chủ biết dạng dữ liệu trong phần thân của request. Nếu máy khách muốn gửi dữ liệu dạng JSON cho máy chủ, nó sẽ đặt content-type là "application / json." Khi nhận được yêu cầu và thấy Loại nội dung đó, trước tiên, máy chủ sẽ kiểm tra xem nó có hiểu định dạng đó không và nếu có, nó sẽ biết cách đọc dữ liệu. Tương tự, khi máy chủ gửi phản hồi cho máy khách, nó cũng sẽ đặt content-type để cho máy khách biết cách đọc phần thân của phản hồi.

Đôi khi, máy khách chỉ có thể đọc được một định dạng dữ liệu. Nếu máy chủ gửi lại bất cứ thứ gì ngoài định dạng đó, máy khách sẽ bị lỗi và báo lỗi. May mắn thay, một tiêu đề HTTP khác được sử dụng để giải nguy trong trường hợp này. Máy khách có thể đặt tiêu đề *Accept* để báo cho máy chủ biết định dạng dữ liệu nào được chấp nhận. Nếu máy khách chỉ có thể đọc được JSON, nó có thể đặt tiêu đề *Accept* thành "application / json." Sau đó, máy chủ sẽ gửi lại phản hồi cho nó dạng JSON. Nếu máy chủ không hỗ trợ định dạng của máy khách yêu cầu, nó có thể gửi lại lỗi cho máy khách để cho nó biết yêu cầu sẽ không hoạt động.

Với hai tiêu đề này, Content-Type và Accept, máy khách và máy chủ có thể hoạt động với các định dạng dữ liệu mà chúng hiểu và cần để hoạt động.

![](https://images.zapier.com/storage/photos/3a1025b070c2f50269f34379d8c220de.png?format=jpg)

## Tóm Tắt Chapter 3 

Trong chương này, chúng ta đã học được rằng để hai máy tính có thể giao tiếp, chúng cần có khả năng hiểu định dạng dữ liệu được truyền cho chúng. Như đã giới thiệu 2 định dạng dữ liệu phổ biến được sử dụng bởi API là JSON và XML. Chúng ta cũng đã học được thêm hai tiêu đề HTTP là Content-Type để chỉ định định dạng dữ liệu nào đang được gửi trong yêu cầu và tiêu đề Accept để chỉ định định dạng được yêu cầu cho phản hồi.

Các thuật ngữ chính chúng ta đã học là:

* JSON: JavaScript Object Notation
* Đối tượng: một vật hoặc danh từ (người, thứ tự pizza ...)
* Key: một thuộc tính về một đối tượng (màu sắc, lớp phủ ...)
* Valus: giá trị của một thuộc tính (màu xanh, pepperoni ...)
* Mảng kết hợp: là các đối tượng lồng nhau
* XML: Extensible Markup Language (Ngôn ngữ đánh dấu mở rộng)

## Next

Trong chương tiếp theo, chúng ta sẽ tìm hiểu làm thế nào hai máy tính có thể thiết lập kết nối bằng cách sử dụng Xác thực để truyền dữ liệu nhạy cảm, như chi tiết khách hàng hoặc nội dung riêng tư.

*Chương 4* (Đang cập nhật)
# Tài Liệu Tham Khảo
https://zapier.com/learn/apis/chapter-3-data-formats/
# Mở đầu.
Xin chào anh em. Hôm nay rảnh rỗi hồi tưởng quá khứ, tự nhận thấy bản thân cũng đã trải qua khá nhiều lần phỏng vấn nên hôm nay mình có tổng hợp lại một số câu hỏi mình hay gặp khi phỏng vấn `PHP`. Bài viết phù hợp với các bạn phỏng vấn **Intern** và **fresher**. Hi vọng bài viết này sẽ giúp ích được cho các bạn.
# 1. Sự khác nhau giữa biến và hằng? Nếu hằng được định nghĩa 2 lần thì sẽ ntn?
- Biến có thể thay đổi được, hằng thì không
- Hằng bản chất là một loại biến nhưng không thay đổi được giá trị.
Hằng định nghĩa 2 lần vẫn giữ nguyên giá trị ban đầu khai báo

`Cú pháp: define('Tên hằng', value);`

# 2. Sự khác nhau giữa toán tử & và && trong PHP?
Toán tử & và && đều là phép toán AND tuy nhiên toán tử một dấu & áp dụng theo kiểu bit

# 3. Sự khác nhau giữa empty và isset?
- Isset là hàm kiểm tra một biến đã có giá trị hay chưa? Nếu có sẽ trả về true
- Empty là hàm kiểm tra xem một biến có giá trị rỗng hay không? Nếu có trả về true. Empty bao quát hơn isset

```
<?php
$num=0; 
// Check isset() function
if( isset ( $num ) ) {
    print_r( $num . " is set with isset function");
}
// Check the !empty() function
if( !empty ( $num ) ) {
    print_r($num . " is set with !empty function");
}
?>
```

```
Output
0 is set with isset function
```
# 4. Session là gì?
`session` hiểu đơn giản là một phiên làm việc của người dùng. Nó được dùng để lưu trữ thông tin được sử dụng xuyên suốt trong nhiều trang web. Không giống như `cookie` `Session` được lưu trên `server`.
# 5. Cookie là gì?
`Cookie` là một tập tin nhỏ được lưu trên máy người dùng để lưu thông tin tạm thời. Mỗi khi máy tính yêu cầu một trang web, trình duyệt sẽ gửi kèm cookie.
# 6. Session khác gì cookie?
| Cookie  | Session | 
| -------- | -------- |
|Dữ liệu cookie được lưu trữ ở phía client.|Dữ liệu session được lưu trữ ở phía server.|
|Dữ liệu cookie dễ dàng sửa đổi hoặc đánh cắp khi chúng được lưu trữ ở phía client.|Dữ liệu session không dễ dàng sửa đổi vì chúng được lưu trữ ở phía máy chủ.|
|Dữ liệu cookie có sẵn trong trình duyệt đến khi expired.|Sau khi đóng trình duyệt sẽ hết phiên làm việc (session)|

# 7. OOP là gì? 
`OOP` (viết tắt của **Object Orient Programming**) . Lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm về lớp và đối tượng. `OOP` tập trung vào các đối tượng thao tác chúng hơn là logic để thao tác chúng.
## 7.1. Đối tượng là gì?
**Đối tượng(Object**) là những sự vật, sự việc có tính chất, đặc tính giống nhau mà ta gom góp lại thành một đối tượng giống ở trong thực tế cuộc sống. Khi lập trình OOP chúng ta sẽ định nghĩa các lớp (class) để thể hiện các đặc điểm chung của đối tượng.

Đối tượng trong `OOP` gồm 2 thành phần chính:

* Thuộc tính (`Attribute`): Những thông tin, đặc điểm của đối tượng
* Phương thức (`method`): Những hành vi mà đối tượng có thể thực hiện.

## 7.2. Class là gì? 
**Lớp** là trừu tượng hóa của đối tượng. Những đối tượng có đặc điểm chung sẽ được gộp chung thành một lớp. Lớp cũng sẽ bao gồm 2 thông tin là đặc tính và phương thức.

**Ví dụ:** Ta có `lớp Animal` với

* Thuộc tính màu sắc, cân nặng ...
* Phương thức: run(), eat()
Các đối tượng của nó có thể là: Chim, Lợn, Gà....
# 7.3. Lớp khác gì đối tượng?
- Lớp là một kế hoạch chi tiết hoặc nguyên mẫu gồm các biến và các phương thức(hàm) chung cho tất cả các đối tượng thuộc cùng một loài.
- Một đối tượng là thực thể của một lớp. Các đối tượng phần mềm thường được sử dụng để mô hình hóa các đối tượng trong thế giới thực.

## 7.4. Ưu điểm của OOP
1. `OOP` mô hình hóa những thứ phức tạp dưới dạng cấu trúc đơn giản.
2. Code có thể sử dụng lại, giúp tiết kiệm tài nguyên.
3. Giúp sửa lỗi dễ dàng hơn
4. Có tính bảo mật cao hơn, bảo vệ thông tin qua đóng gói
5. Dễ mở rộng dự án.

# 8. POST khác gì GET?
- **Giống nhau:** Là các HTTP method dùng để trao đổi dữ liệu giữa Client và Server
- **Khác nhau:** 
    - Get truy cập nhanh hơn Post
    - Post bảo mật hơn
# 9. Nêu 4 tính chất của OOP?
## 9.1 Nêu tính đóng gói?
**Encapsulation**: Tính đóng gói cho phép che giấu thông tin và những tính chất xử lý bên trong của đối tượng. Các đối tượng khác không thể tác động trực tiếp đến dữ liệu bên trong và làm thay đổi trạng thái của đối tượng mà bắt buộc phải thông qua các phương thức công khai do đối tượng cung cấp.
## 9.2 Nêu tính kế thừa?
**Inheritance**: Tính kế thừa cho phép xây dựng một lớp mới, kế thừa và tái sử dụng các thuộc tính, phương thức dựa trên các lớp cha.
```
<?php
class Fruit {
  public $name;
  public $color;
  public function __construct($name, $color) {
    $this->name = $name;
    $this->color = $color;
  }
  public function intro() {
    echo "The fruit is {$this->name} and the color is {$this->color}.";
  }
}

class Strawberry extends Fruit {
  public $weight;
  public function __construct($name, $color, $weight) {
    $this->name = $name;
    $this->color = $color;
    $this->weight = $weight;
  }
  public function intro() {
    echo "The fruit is {$this->name}, the color is {$this->color}, and the weight is {$this->weight} gram.";
  }
}

$strawberry = new Strawberry("Strawberry", "red", 50);
$strawberry->intro();
?>
```
Output:

`The fruit is Strawberry, the color is red, and the weight is 50 gram.`

## 9.3 Nêu tính đa hình?
**Polymorphism**: Tính đa hình trong `OOP` cho phép các đối tượng khác nhau thực thi chức năng giống nhau theo những cách khác nhau
- Đặc trưng của tính đa hình ở `Overriding` và `Overloading`
1. Nạp chồng phương thức (`Overloading`) đơn giản là có vài phương thức trùng tên nhưng khác nhau về đối số trong cùng 1 class. Nạp chồng phương thức cho phép ta tạo ra nhiều phiên bản của phương thức, mỗi phiên bản chấp nhận một danh sách đối số khác nhau nhằm tạo thuận lợi cho việc gọi phương thức. Nạp chồng phương thức được sử dụng tại compile time.
2. Ghi đè phương thức(`Overriding`) là một tính năng cho phép một lớp con cung cấp một triển khai cụ thể của phương thức đã được cung cấp bởi một trong các lớp cha của nó. Ghi đè phương thức được sử dụng ở run time.
Xem chi tiết hơn tại [đây](https://viblo.asia/p/override-va-overload-WAyK8V4NlxX).
## 9.4 Nêu tính trừu tượng?
**Abstraction**: Tính trừu tượng giúp loại bỏ những thứ phức tạp, không cần thiết của đối tượng chỉ tập trung vào những gì cốt lõi quan trọng.
## 11. Abstract khác gì interface?
`Abstract`: Là một class cha cho tất cả các class con có cùng nhiệm vụ và chúng có thể có một số hàm chung để sử dụng và một số hàm abstract trống chỉ để ghi đè lên các lớp con.

`Interface`: Không phải class và chỉ chứa những hàm trống không được thực thi. Một lớp có thể implements nhiều interface và có thể xem interface là bản thiết kế cho lớp 



| Abstract | Interface |
| -------- | -------- |
| Lớp trừu tượng có thể chứa các phương thức trừu tương hoặc không trừu tượng     | Chỉ có phương thức trừu tượng     |
| Không hỗ trợ đa kế thừa| Hỗ trợ đa kế thừa|
|Có thể chứa các biến final, non-final, static, non-static| Chỉ có các biến final và static|
|Có thể implements nhiều interface|Không thể exents lớp abstract|
|Lớp trừu tượng có thể có phạm vi truy cập privated, protected...| Phạm vi truy cập là public|



# 12.Trait là gì?
Traits là một cơ chế tái sử dụng code trong các ngôn ngữ đơn kế thừa như PHP. Trait dùng để hạn chế sự đơn kế thừa bằng cách cho phép sử dụng các bộ phương thức một cách tự do trong một số lớp độc lập trong các hệ thống phân cấp lớp khác nhau.

**Điểm mạnh của trait**
- Tránh code bị lặp lại nhiều lần
- Ngăn chặn sự kế thừa phức tạp
- Cung cấp một cách đơn giản để tái sử dụng code, tăng hiệu xuất chương trình
# 13. API là gì?
- API: Application Programming Interface là các phương thức, giao thức kết nối với các thư mục và ứng dụng khác.
- API cung cấp khả năng truy xuất đến một tập các hàm hay dùng. Và từ đó có thể trao đổi dữ liệu ứng dụng

## 13.1 Rest API là gì?
REST (Representational State Transfer) là một dạng chuyển đổi cấu trúc dữ liệu, một kiểu kiến trúc để viết API.
- Các tính chất của API
    - Phi trạng thái, giao thức client-server sử dụng giao thức HTTP
    - Sử dụng các HTTP method như GET, POST, DELETE để trao đổi dữ liệu
    - Có thể sử dụng trên nhiều ngôn ngữ khác nhau

## 13.2 Restful API là gì?
- Restful API là một tiêu chuẩn dùng trong việc thiết kế API cho các ứng dụng web(thiết kế Web services) để tiện cho việc quản lý resource.
- Restful không quy định logic code ứng dụng và không giới hạn bởi ngôn ngữ lập trình ứng dụng, bất kỳ ngôn ngữ hoặc framework nào cũng có thể sử dụng để thiết kế một Restful API
## 14. Tổng kết
Trên đây là những kiến thức của bản thân trong quá trình và phỏng vấn và làm việc cũng như tham khảo kiến thức trên mạng. Bài viết mang quan điểm kiến thức cá nhân chỉ mang tính chất tham khảo. Các bạn xem có phần nào thắc mắc hay bổ sung thêm cứ mạnh dạn comment nha mình sẽ tiếp thu. Cảm ơn mn ♥️
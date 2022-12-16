## Những khái niệm quan trọng
Khi bạn tìm hiểu về ngôn ngữ Dart, hãy ghi nhớ những khái niệm này:

* Mọi thứ bạn có thể đặt trong một biến là một đối tượng và mọi đối tượng là một thể hiện của một lớp . Thậm chí cả số, hàm và null đều là các đối tượng. Tất cả các đối tượng kế thừa từ lớp Object .

* Mặc dù Dart là ngôn ngữ định kiểu mạnh, các chú thích về kiểu là tùy chọn vì Dart có thể suy ra các kiểu. Trong đoạn mã trên, number được suy ra là kiểu int . Khi bạn muốn nói rõ ràng rằng không có kiểu nào được mong đợi, hãy sử dụng kiểu dynamic đặc biệt .

* Dart hỗ trợ các kiểu chung chung, như List<int> (danh sách các số nguyên) hoặc List<dynamic> (danh sách các đối tượng thuộc bất kỳ kiểu nào).

* Dart hỗ trợ các hàm cấp cao nhất (như hàm main() ), cũng như các hàm được liên kết với một lớp hoặc đối tượng (các phương thức tĩnh và thể hiện tương ứng). Bạn cũng có thể tạo các hàm trong các hàm (các hàm lồng nhau hoặc cục bộ).

* Tương tự, Dart hỗ trợ các biến cấp cao nhất, cũng như các biến được gắn với một lớp hoặc đối tượng (biến tĩnh và biến đối tượng). Các biến đối tượng đôi khi được gọi là các trường hoặc thuộc tính.

* Không giống như Java, Dart không có các từ khóa public , protected và private . Nếu một định danh bắt đầu bằng dấu gạch dưới (_), thì đó là riêng tư đối với thư viện của nó. Để biết chi tiết, xem [Thư viện và khả năng hiển thị ](https://dart.dev/guides/language/language-tour#libraries-and-visibility).

* Mã định danh có thể bắt đầu bằng một chữ cái hoặc dấu gạch dưới (_), theo sau là bất kỳ sự kết hợp nào của các ký tự đó với các chữ số.

* Dart có cả biểu thức (có giá trị runtime) và câu lệnh (không có). Ví dụ, điều kiện biểu thức *condition ? expr1 : expr2* có giá trị expr1 hoặc expr2 . So sánh điều đó với một câu lệnh if-else , không có giá trị. Một câu lệnh thường chứa một hoặc nhiều biểu thức, nhưng một biểu thức không thể chứa trực tiếp một câu lệnh.

* Các công cụ của Dart có thể báo cáo hai loại vấn đề: cảnh báo và lỗi . Cảnh báo chỉ là dấu hiệu cho thấy mã của bạn có thể không hoạt động, nhưng chúng không ngăn chương trình của bạn thực thi. Lỗi có thể là lỗi biên dịch hoặc runtime. Một lỗi biên dịch ngăn không cho mã thực thi; một lỗi runtime dẫn đến một ngoại lệ được đưa ra trong khi mã thực thi.

## Từ khóa
Bảng sau liệt kê các từ mà ngôn ngữ Dart xử lý đặc biệt.

|||||
| -------- | -------- | -------- | -------- |
| abstract  2   | dynamic 2    | implements 2    | show 1    |
| as 2    | else     | import 2    | static 2    |
| assert     | enum     | in     | super     |
| async 1    | export 2     | interface 2     | switch     |
| await 3     | extends     | is     | sync 1     |
| break     | external 2     | library 2     | this     |
| case     | factory 2     | mixin 2     | throw     |
| catch     | false     | new     | true     |
| class     | final     | null     | try     |
| const     | finally     | on 1     | typedef 2     |
| continue     | for     | operator 2     | var     |
| covariant 2     | Function 2     | part 2     | void     |
| default     | get 2     | rethrow     | while     |
| deferred 2     | hide 1    | return     | with     |
| do     | if     | set 2     | yield 3     |


Tránh sử dụng những từ này như định danh. Tuy nhiên, nếu cần thiết, các từ khóa được đánh dấu số có thể là định danh:

* Các từ có số 1 là các từ khóa theo ngữ cảnh , chỉ có nghĩa ở những nơi cụ thể. Chúng là những định danh hợp lệ ở mọi nơi.

* Các từ có số 2 là các định danh tích hợp . Để đơn giản hóa nhiệm vụ chuyển mã JavaScript sang Dart, các từ khóa này là các định danh hợp lệ ở hầu hết các nơi, nhưng chúng không thể được sử dụng làm tên lớp hoặc tên loại hoặc làm tiền tố import.

* Các từ có số 3 là những từ mới hơn, dành riêng có giới hạn liên quan đến hỗ trợ không đồng bộ được thêm vào sau khi phát hành phiên bản 1.0 của Dart. Bạn không thể sử dụng await hoặc yield làm định danh trong bất kỳ thân hàm nào được đánh dấu bằng async , async* hoặc sync* .

Tất cả các từ khác trong bảng là các từ dành riêng , không thể làm định danh.

## Biến
Đây là một ví dụ về việc tạo một biến và khởi tạo nó:

  `var name = 'Bob';`
Biến được lưu dưới dạng tham chiếu. Biến *name* chứa tham chiếu đến một đối tượng String có giá trị là *Bob*.

Kiểu của biến *name* được suy ra là *String* , nhưng bạn có thể thay đổi kiểu đó bằng cách chỉ định nó. Nếu một đối tượng không bị hạn chế trong một kiểu duy nhất, hãy chỉ định Object hoặc loại dynamic , tuân theo các nguyên tắc thiết kế .

  `dynamic name = 'Bob';`
Một tùy chọn khác là khai báo rõ ràng kiểu sẽ được suy ra:

  `String name = 'Bob';`
> Lưu ý: Bài này tuân theo khuyến nghị hướng dẫn kiểu sử dụng var , thay vì chú thích kiểu, cho các biến cục bộ.

### Giá trị mặc định
Các biến chưa được khởi tạo có giá trị ban đầu là null . Ngay cả các biến có kiểu số ban đầu cũng là null, bởi vì các số giống như mọi thứ khác trong Dart là các đối tượng.

```
int lineCount;
assert(lineCount == null);
```
> Lưu ý: Hàm assert() bị bỏ qua trong mã production. Trong quá trình phát triển, assert( condition ) đưa ra một ngoại lệ trừ khi điều kiện là đúng. Để biết chi tiết, xem [Assert](https://dart.dev/guides/language/language-tour#assert).

### Final và const
Nếu bạn không bao giờ có ý định thay đổi một biến, hãy sử dụng *final* hoặc *const* , thay vì var hoặc một kiểu khác. Một biến final chỉ có thể được đặt một lần; một biến const là hằng số runtime. (Các biến Const hoàn toàn là final.) Một biến final được khởi tạo vào lần đầu tiên được sử dụng.

> Lưu ý: Biến thể hiện có thể là final nhưng không thể là const . Các biến này phải được khởi tạo trước khi phần thân của hàm tạo bắt đầu - tại phần khai báo biến, bởi một tham số của hàm tạo hoặc trong danh sách trình khởi tạo của hàm tạo .

Đây là một ví dụ về việc tạo và thiết lập một biến final:

```
final name = 'Bob'; // Without a type annotation
final String nickname = 'Bobby';
```
Bạn không thể thay đổi giá trị của biến final:

`name = 'Alice'; // Error: a final variable can only be set once.`
Sử dụng *const* cho các biến mà bạn muốn là hằng số runtime. Nếu biến const ở cấp độ lớp, đánh dấu nó là *static const *. Khi bạn khai báo biến, đặt giá trị thành hằng số runtime, chẳng hạn như số hoặc chuỗi ký tự, biến const hoặc kết quả của phép toán số học trên các số không đổi:

```
const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere
```
Từ khóa const không chỉ để khai báo các biến không đổi. Bạn cũng có thể sử dụng nó để tạo các giá trị không đổi, cũng như khai báo các hàm tạo tạo các giá trị không đổi. Bất kỳ biến nào cũng có thể có giá trị không đổi.

```
var foo = const [];
final bar = const [];
const baz = []; // Equivalent to `const []`
```
Bạn có thể bỏ qua const từ biểu thức khởi tạo của khai báo const , như đối với baz ở trên. Để biết chi tiết, hãy xem [ĐỪNG sử dụng const vô ích](https://dart.dev/guides/language/effective-dart/usage#dont-use-const-redundantly).

Bạn có thể thay đổi giá trị của biến không phải là final, không phải là const, ngay cả khi nó được sử dụng để có giá trị const:

  `foo = [1, 2, 3]; // Was const []`
Bạn không thể thay đổi giá trị của biến const:

  `baz = [42]; // Error: Constant variables can't be assigned a value.`

## Các kiểu tích hợp
Ngôn ngữ Dart có hỗ trợ đặc biệt cho các loại sau:

* số
* chuỗi
* boolean
* list (còn được gọi là mảng )
* set
* map
* runes (để thể hiện các ký tự Unicode trong một chuỗi)
* symbols

Bạn có thể khởi tạo một đối tượng của bất kỳ kiểu đặc biệt nào bằng cách sử dụng một chữ. Ví dụ: 'this is a string' là một chuỗi ký tự và *true* là một ký tự boolean.

Bởi vì mọi biến trong Dart đều đề cập đến một đối tượng - một thể hiện của một lớp - bạn thường sẽ dùng các hàm khởi tạo để khởi tạo các biến. Một số loại tích hợp có các hàm tạo riêng. Ví dụ: bạn có thể sử dụng hàm tạo Map() để tạo Map.

### Số
Số trong Dart có hai loại:

**int**
Giá trị nguyên không lớn hơn 64 bit, tùy thuộc vào nền tảng. Trên máy ảo Dart, các giá trị có thể từ -2^63 đến 2^63 - 1. Các giá trị được biên dịch thành JavaScript sử dụng số JavaScript, cho phép các giá trị từ -2^53 đến 2^53 - 1.

**double**
Các số dấu phẩy động 64-bit (độ chính xác kép), như được chỉ định bởi tiêu chuẩn IEEE 754.

Cả int và double là các kiểu con của num . Kiểu num bao gồm các toán tử cơ bản như +, -, / và * và cũng là nơi bạn sẽ tìm thấy abs() , ceil() và floor() , cùng các phương thức khác. (Các toán tử bitwise, chẳng hạn như >>, được định nghĩa trong lớp int .) Nếu num và các kiểu con của nó không có thứ bạn đang tìm kiếm, thư viện dart:math có thể.

Số nguyên là số không có dấu thập phân. Dưới đây là một số ví dụ về định nghĩa số nguyên:

  ```
var x = 1;
 var hex = 0xDEADBEEF; 
```
Nếu một số bao gồm một số thập phân, nó là một số kép. Dưới đây là một số ví dụ về định nghĩa hai chữ:

```
var y = 1.1;
var exponents = 1.42e5;
```
Kể từ phiên bản 2.1, số nguyên được tự động chuyển thành double khi cần thiết:

  `double z = 1; // Equivalent to double z = 1.0.`
> **Ghi chú về phiên bản**: Trước Dart 2.1, đã xảy ra lỗi khi sử dụng một số nguyên trong ngữ cảnh kép.

Đây là cách bạn biến một chuỗi thành một số hoặc ngược lại:

```
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```
Kiểu int chỉ định các toán tử dịch chuyển bitwise truyền thống (<<, >>), AND (&) và OR (|). Ví dụ:

```
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7); // 0011 | 0100 == 0111
```
Số nghĩa đen là hằng số runtime. Nhiều biểu thức số học cũng là các hằng số runtime, miễn là các toán hạng của chúng là các hằng số runtime.
```
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;

```

*Còn tiếp*
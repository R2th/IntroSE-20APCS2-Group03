**[Cấu trúc chương trình trong JavaScript](https://tienanhvn.blogspot.com/2021/09/cau-truc-chuong-trinh-trong-javascript.html)**

Trong các bài học trước, mình đã giới thiệu với bạn những thành phần cơ bản của JavaScript (values, types và operators). Nhưng đây mới chỉ là những nguyên liệu thô. Vậy làm thế nào để kết hợp những thành phần này thành một chương trình hoàn chỉnh. Để giải quyết vấn đề này, chúng ta sẽ cùng tìm hiểu về cấu trúc chương trình trong JavaScript.


Biểu thức (expressions)

Do đó, mỗi giá trị được viết trực tiếp (66, 'hello', true, NaN,...) là một biểu thức (expression). Hay việc kết hợp những giá trị với toán tử (1 + 5, 'I' + ' love' + ' you', !false, ...) cũng là những biểu thức.

Biểu thức có thể đơn giản là những phép cộng, trừ,... Hoặc có thể là những công thức toán học, vật lý,... phức tạp. Và trong một biểu thức có thể chứa nhiều biểu thức con.

Câu lệnh (statements)

Các câu lệnh là các cấu trúc cú pháp và các lệnh thực hiện các hành động.

Chúng tôi đã thấy một tuyên bố, alert('Hello, world!')hiển thị thông báo “Xin chào, cả thế giới!”.

 
Chúng tôi có thể có bao nhiêu câu lệnh trong mã của chúng tôi tùy thích. Các câu lệnh có thể được phân tách bằng dấu chấm phẩy.

Ví dụ: ở đây chúng tôi chia “Hello World” thành hai cảnh báo:


	alert('Hello'); alert('World');
Thông thường, các câu lệnh được viết trên các dòng riêng biệt để làm cho mã dễ đọc hơn:


alert('Hello');

alert('World');


Trong hầu hết các ngôn ngữ lập trình, một câu lệnh thường được kết thúc bởi dấu chấm phẩy (;). JavaScript cũng vậy. Ngoài ra, JavaScript còn cho phép bạn bỏ qua dấu chấm phẩy. Khi đó, mỗi câu lệnh sẽ ở trên một dòng.


	true;

	1 + 2 * 4 % 3 - 6

	'JavaScript ' + 'is ' + ' good';

Từ khoá (keywords)

Từ khoá (keywords) là những từ mang ý nghĩa đặc biệt. Từ var là một từ khoá. Từ khoá var theo sau nó sẽ là một biến số (var là viết tắt của variable).

Reserved words trong javascript

Từ dự trữ (reserved words) là những từ sẽ được dùng làm từ khoá cho những phiên bản sau của JavaScript. Bạn sẽ không thể sử dụng từ khoá hay từ dự trữ để đặt tên cho biến số.

=> sau đây là danh sách từ khoá và những tự dự trữ:

break case catch class const continue debugger

default delete do else enum export extends false

finally for function if implements import in

instanceof interface let new null package private

protected public return static super switch this

throw true try typeof var void while with yield

Biến số (Variables) trong javascript

Biến số dùng để lưu giữ giá trị, qua đó chúng ta có thể sử dụng ở các chương trình khác.

Cách sử dụng biến số: Var <Tenbien> = <biếu thức>;

Ví dụng

```
var isFriday = true;

var result = 1 + 2 * 4 % 3 - 6

var str = 'JavaScript ' + 'is ' + ' good';
```

Ở ví dụ trên, minh sẽ sử dụng từ khoá là var và sau các biểu thức mình sử dụng toán tử gán (=) và cuối cùng và biểu thức.

 
Sau khi đã khai báo như trên, chúng ta có thể sử dụng biến số để thực sử dụng biến số.

```
var result = 1 + 2 * 4 % 3 - 6; // => result = -3;

var t = result * result;

console.log(t); // => 9
```

Ngoài ra, sau khi bạn gán giá trị cho một biến số thì bạn vẫn có thể gán biến số đó với một giá trị khác.

```
var x = 5;

console.log(x); // => 5

x = 10;

console.log(x); // => 10
```

Cách đặt tên cho biến số

JavaScript có những quy tắc đặt tên cho biến số như sau:

Bắt đầu bằng chữ cái, dấu gạch dưới (_) hoặc kí tự "đô la" ($)

Sau kí tự đầu tiên, ngoài những kí tự trên, bạn có thể sử dụng thêm số (number)

Không sử dụng từ khoá và từ dự trữ

Ví dụ những tên hợp lệ:

```
var temp = 100;

var _result3 = 10;

var $_$ = 'hehehe';

var I_AM_HUNGRY = true;

var dientichao = 999;
```

Ví dụ những tên không hợp lệ

```
var point% = 50;       // sử dụng kí tự đặc biệt %

var 2you = 'passtion'; // bắt đầu bằng số

var null = 'oh no';    // sử dụng từ khoá
```

Chuẩn hoá cách đặt tên biến số

Vấn đề mình muốn đề cập ở đây là cách đặt tên làm sao để khi nhìn vào, bạn biết ngay ý nghĩa của nó. Để giải quyết vấn đề này, có hai trường phái đặt tên như sau:

Sử dụng dấu gạch dưới để phân tách các từ: dien_tich_ao

Sử dụng Camel Case (đơn giản là bạn viết hoa chữ cái đầu tiên của mỗi từ, trừ từ đầu tiên): dienTichAo

Theo kinh nghiệm của bản thân, mình sẽ sử dụng kết hợp cả hai cách trên. Thường thì mình sẽ sử dụng cách thứ hai (Camel Case). Tuy nhiên, khi muốn sử dụng một biến số như là một hằng số thì mình sẽ sử dụng cách một. Vì lúc này, mình sẽ viết hoa tất cả các kí tự.

```
var MAX_LENGTH = 100001;

var DEFAULT_TITLE = 'Hello World';
```

Việc đặt tên theo chuẩn giúp code của bạn giữ được tính thống nhất. Đặc biệt, trong một dự án gồm nhiều lập trình viên tham gia, thử tưởng tượng xem nếu mỗi người đặt tên theo một phong cách khác nhau thì sao? Trời ơi, mình sẽ không muốn đọc thứ code tạp nham đó!.
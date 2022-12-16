Bốn dòng sau đây là đủ để gây nhầm lẫn cho hầu hết các lập trình viên JavaScript:
```
Object instanceof Function
//true
Object instanceof Object
//true
Function instanceof Object
//true
Function instanceof Function
//true
```
Prototype trong JavaScipt là một trong những khái niệm khó hiểu nhất. Dù bạn có tránh sử dụng Prototype bằng cách nào đi nữa, rồi bạn cũng sẽ phải sử dụng và yêu lại từ đầu với nó trong khi làm việc với JavaScript.

Vậy hãy đối mặt và tìm hiểu nó hoạt động như thế nào nhé?
Bắt đầu với thông tin cơ bản, có các loại dữ liệu sau trong JavaScript:
1. undefined
2. null
3. number
4. string
5. boolean
6. object

Năm loại đầu tiên là các loại dữ liệu nguyên thủy. Chúng lưu trữ một giá trị thuộc kiểu của chúng, chẳng hạn như boolean và có thể là true hoặc false.

Kiểu dữ liệu cuối cùng "Object" là một kiểu tham chiếu mà chúng ta có thể mô tả như là một tập hợp các cặp key-value(nhưng nó còn nhiều điều hơn thế nữa).

Trong JavaScript, đối tượng mới được khởi tạo thông qua hàm Object constructor. Hàm này cung cấp nhiều phương thức chung như là *toString()* hoặc là *valueOf().*

Các hàm trong JavaScript là các đối tượng đặc biệt có thể được gọi là “được gọi”. Chúng ta tạo ra chúng và bằng cách sử dụng hàm Function constructor. Thực tế là các constructors là các đối tượng, đồng thời chúng cũng là các functions đã luôn luôn khiến tôi bối rối, cũng như câu đố gà hay trứng có trước vậy.

Trước khi bắt đầu với Prototypes, tôi muốn làm rõ rằng có hai loại prototypes trong JavaScript:
1. **prototype**: Đây là một đối tượng đặc biệt được gán làm thuộc tính của bất kỳ hàm nào bạn thực hiện trong JavaScript. Hãy để tôi được rõ ràng ở đây, nó đã có mặt cho bất kỳ function nào bạn thực hiện, nhưng không bắt buộc đối với các chức năng nội bộ được cung cấp bởi JavaScript (và chức năng trả về bởi *bind*). prototype này là cùng một đối tượng được chỉ định bởi [[Prototype]] (xem bên dưới) của đối tượng mới được tạo từ hàm đó (sử dụng từ khóa *new*).
2. **[[Prototype]]**: Đây là thuộc tính ẩn trên mọi đối tượng. Thuộc tính này chỉ đơn giản là một tham chiếu đến prototype của function tạo ra đối tượng. Nó có thể được truy cập bằng cách sử dụng hàm getter-setter đặc biệt được gọi là __proto__. Có nhiều cách khác để truy cập prototype này, nhưng để ngắn gọn, tôi sẽ chỉ đề cập việc truy cập [[Prototype]] bằng cách sử dụng __proto__.
```
var obj = {}
var obj1 = new Object()
```
Hai câu lệnh đơn giản được sử dụng để tạo một đối tượng mới, có rất nhiều điều xảy ra khi chúng ta chạy một trong hai câu lệnh này, hãy cùng tìm hiểu nhé.

Khi tôi tạo một đối trượng mới, tạm gọi là nó rỗng nhé. Tuy nhiên thực tế nó không rỗng bởi vì nó là một instance của Object contructor, vì vậy nó vốn được tham chiếu tới prototype của Object, điều này được chỉ ra bởi __proto__ của đối tượng mới được tạo ra.

![](https://images.viblo.asia/99fcb77f-3090-4522-8547-67164291d5a2.png)

Nếu chúng ta xem xét prototype của Object constructor function, nó trông giống như __proto__ của obj. Trong thực tế, chúng là hai con trỏ truy cập đến cùng một đối tượng.

![](https://images.viblo.asia/0cb849ca-7a09-4911-bf43-9f020cd954ec.png)

```
obj.__proto__ === Object.prototype
//true
```
Mỗi prototype của một hàm có sẵn một thuộc tính được gọi là hàm tạo(constructor), đó là một con trỏ tới chính function đó. Trong trường hợp của Object function, prototype có constructor trỏ ngược trở lại Object.
```
Object.prototype.constructor === Object
//true
```
![](https://images.viblo.asia/ed06f8f8-423d-49e6-8621-1ddebad62f57.png)

Trong hình trên, phía bên trái là khung nhìn mở rộng của Objectconstructor. Bạn phải tự hỏi tất cả những chức năng khác trên nó là gì. Vâng, các hàm là các đối tượng, vì vậy chúng có thể có các thuộc tính như các đối tượng khác được khởi tạo.

Nếu bạn nhìn kỹ, Object (bên trái) có một __proto__ có nghĩa là Object phải được tạo ra từ một constructor khác có prototype. Vì Object là một function object, nó phải được tạo ra bằng cách sử dụng hàm dựng constructor.
![](https://images.viblo.asia/7e9df49c-aaf8-4b81-82b1-463bc357e60d.png)

__proto__ của đối tượng trông giống như prototype của Function. Khi tôi kiểm tra sự tương đồng của cả hai, họ hóa ra chunsg là các đối tượng tương tự nhau.
```
Object.__proto__ === Function.prototype
//true
```

Nếu bạn nhìn kỹ, bạn sẽ thấy bản thân Function có một __proto__ có nghĩa là hàm Function constructor phải được tạo ra từ một hàm dựng nào đó có prototype. Vì Function chính nó là một phương thức, nó phải được tạo ra bằng cách sử dụng Function constructor, nghĩa là chính nó. Tôi biết điều đó nghe có vẻ kỳ lạ nhưng khi bạn kiểm tra nó, nó trở thành sự thật.

![](https://images.viblo.asia/b26dfd94-07c7-4a2a-9bc1-8d213b7f1741.png)

Hàm __proto__ của Function và prototype của Function là hai con trỏ được trỏ đến cùng một đối tượng.
```
Function.prototype === Function.__proto__
\\true
```
Như đã đề cập trước đó, constructor của bất kỳ prototype nào đều trỏ đến hàm sở prototype đó. Hàm constructor của prototype của Function trỏ về Function của chính nó.
```
Function.prototype.constructor === Function
\\true
```

![](https://images.viblo.asia/7df32c1e-ab5b-4e75-975f-e29411865245.png)

Một lần nữa, prototype của Function có một thuộc tính là __proto__ .Vâng, đó là không có gì ngạc nhiên ... prototype là một đối tượng, nó là duy nhất. Tuy nhiên cần chú ý rằng nó trỏ vào prototype của Object.
```
Function.prototype.__proto__ == Object.prototype
\\true
```

Vì vậy, chúng ta có một biểu đồ tổng quát ở đây:

![](https://images.viblo.asia/6abbd46f-0a52-4f50-b895-78387579149f.png)

```
instanceof Operator
a instanceof b
```
Toán tử instanceof tìm đối tượng b được trỏ tới bởi bất kỳ constructor nào của chuỗi __proto__ trên a. Nếu nó tìm thấy bất kỳ tham chiếu như vậy, nó trả về true ngược lại là false.

Bây giờ chúng ta quay lại bốn câu lệnh instanceof đầu tiên của chúng ta. Tôi đã viết các câu lệnh tương ứng để làm cho instanceof trả về true cho những điều sau đây:
```
Object instanceof Function
Object.__proto__.constructor === Function

Object instanceof Object
Object.__proto__.__proto__.constructor === Object

Function instanceof Function
Function.__proto__.constructor === Function

Function instanceof Object
Function.__proto__.__proto__.constructor === Object
```
Ở đây tôi có một điều mà tôi đã không chỉ ra trước đó là prototype của Object không có __proto__.

Trên thực tế nó có một __proto__ nhưng đó là bằng null. Chuỗi phải kết thúc ở đâu đó và nó kết thúc ở đây.
```
Object.prototype.__proto__
\\null
```

Object, Function, Object.prototypeand Function.prototype của chúng ta cũng có các thuộc tính là các hàm, chẳng hạn như Object.assign, Object.prototype.hasOwnPropertyand Function.prototype.call. Đây là những hàm bên trong không có prototype và cũng là các instance của Function và có __proto__, là con trỏ trỏ đến Function.prototype.

![](https://images.viblo.asia/55b5ae79-60e2-4805-a4eb-3f3a1731ae9d.png)

```
Object.create.__proto__ === Function.prototype
\\true
```

Bạn có thể khám phá các hàm constructor khác như Array hoặc là Date, hoặc lấy các đối tượng của chúng và tìm kiếm prototype và __proto__. Tôi chắc chắn bạn sẽ có thể tìm hiểu cách mọi thứ được kết nối.

## TÀI LIỆU THAM KHẢO
https://medium.freecodecamp.org/prototype-in-js-busted-5547ec68872
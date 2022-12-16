# Symbols
Trong ES2015, một kiểu dữ liệu mới được tạo ra có tên là `symbol`.
## Tại sao lại có kiểu dữ liệu này?
Có 3 lý do chính:
### 1 - Thêm một core-features mới với khả năng tương thích ngược
Đôi khi chúng ta cần thêm một thuộc tính mới vào đối tượng hiện tại mà không muốn gây ảnh hưởng tới vòng lặp `for in` hay hàm `Object.keys`.

Ví dụ: Cho một đối tượng: `var myObject = {firstName:'raja', lastName:'rao'}`. Khi gọi hàm `Object.keys(myObject)`, kết quả trả về là `[firstName, lastName]`. Giờ nếu thêm một thuộc tính mới có tên là `newProperty` vào `myObject ` và mong muốn kết quả trả về của hàm `Object.keys(myObject)` vẫn phải là `[firstName, lastName]`, chứ không phải `[firstName, lastName, newProperty]` thì làm như thế nào?

Nếu `newProperty` là một symbol thì `Object.keys(myObject)` sẽ bỏ qua thuộc tính này và kết quả trả về vẫn là `[firstName, lastName]` .
### 2 - Tránh xung đột về tên gọi
`Symbol` đảm bảo rằng các thuộc tính mới được thêm vào một object là duy nhất.

Ví dụ: Khi thêm một phương thức tùy biến `toUpperCase` vào `Array.prototype`. Sau đó, nếu load một thư viện mới (hoặc trong ES2019 sắp tới) và nó có một phiên bản khác của `Array.prototype.toUpperCase` thì phương thức tùy biến có thể hoạt động không chính xác vì xung đột tên.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*tLSnMI6_adGSvJlj7yLQFQ.png)](https://cdn-images-1.medium.com/max/800/1*tLSnMI6_adGSvJlj7yLQFQ.png)

`Symbols` sẽ giải quyết vấn đề này bằng cách tạo ngầm một giá trị duy nhất khi thêm những thuộc tính mới.

### 3 - Tạo hooks đối với những phương thức core thông qua các symbol "phổ biến"
Giả sử chúng ta muốn `String.prototype.search` gọi đến phương thức `search` tùy biến bên trong một đối tượng `myObject`:  `‘somestring’.search(myObject);` và truyền `‘somestring’ ` như một tham số.

Điều này có thể được thực hiện thông qua các symbol toàn cục có tên là symbol phổ biến. Chúng cho phép tạo lời gọi đến các hàm bất kỳ bên trong các hàm core.
## Tạo Symbols
Một symbol có thể được tạo bằng cách sử dụng từ khóa `Symbol`. Cách khởi tạo này sẽ trả về một giá trị có kiểu dữ liệu là `symbol`.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*jDKlrnRjGXLAb6LqlJJiuQ.png)](https://cdn-images-1.medium.com/max/800/1*jDKlrnRjGXLAb6LqlJJiuQ.png)

**Lưu ý:** dù cách khởi tạo như một đối tượng nhưng thực chất symbol là một giá trị nguyên thủy. Chúng bất biến và có tính duy nhất.

### Symbol không thể tạo bằng từ khóa `new`
Bởi symbol không phải là object nên không thể sử dụng từ khóa `new` để trả về một giá trị kiểu `symbol`.

```javascript
var mySymbol = new Symbol(); //throws error
```

### Symbol có phần mô tả cho việc logging
```javascript
//mySymbol variable now holds a "symbol" unique value
//its description is "some text"
const mySymbol = Symbol('some text');
```
### Symbol có tính duy nhất
```javascript
const mySymbol1 = Symbol('some text');
const mySymbol2 = Symbol('some text');
mySymbol1 == mySymbol2 // false
```
### Symbol có thể được coi là một singleton nếu sử dụng phương thức `Symbol.for`
Thay vì khởi tạo một `symbol` thông qua `Symbol()`, một symbol có thể tạo thông qua `Symbol.for(<key>)`. Trong đó, `key` là một string bất kỳ. Nếu một symbol có `key` đã tồn tại thì việc sử dụng phương thức trên sẽ chỉ trả về giá trị cũ.

```javascript
var mySymbol1 = Symbol.for('some key'); //creates a new symbol
var mySymbol2 = Symbol.for('some key'); // **returns the same symbol
mySymbol1 == mySymbol2 //true 
```

Mục đính thực sự của việc sử dụng `.for` là để tạo Symbol ở một nơi và truy cập ở một nơi khác.

**Lưu ý:** `Symbol.for` sẽ khiến symbol không còn tính duy nhất. Dó đó tránh việc sử dụng các key giống nhau.
### Mô tả của symbol khác với key của symbol
Mô tả của symbol vẫn đảm bảo tính duy nhất. Còn `Symbol.for` thì không.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*M2SWsj3N_46B_btDrxIVFg.png)](https://cdn-images-1.medium.com/max/800/1*M2SWsj3N_46B_btDrxIVFg.png)
### Symbol có thể là tên thuộc tính của một đối tượng
Chính vì tính duy nhất nên một symbol có  thể được gán như tên của một thuộc tính bên trong một đối tượng. Những thuộc tính này còn được gọi là `keyed properties`

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*vGK6d1vPHjGXbbX6gEUXow.png)](https://cdn-images-1.medium.com/max/800/1*vGK6d1vPHjGXbbX6gEUXow.png)
### Truy cập vào thuộc tính có tên sử dụng symbol
Thuộc tính sử dụng symbol chỉ có thể sử dụng thông qua ngoặc vuông và không thể sử dụng dấu chấm.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*VeVCPI_9-ah5nDAoGUmBvg.png)](https://cdn-images-1.medium.com/max/800/1*VeVCPI_9-ah5nDAoGUmBvg.png)
## Nhìn lại 3 lý do chính cho việc sử dụng Symbol
### 1 - Symbol sẽ bị bỏ qua đối với các vòng lặp và một số hàm đọc thuộc tính
Trong ví dụ dưới đây, khi duyệt qua các thuộc tính của `obj` thì các thuộc tính `prop3` và `prop4` sẽ bị bỏ qua vì chúng có kiểu dữ liệu symbol.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*-x4XNekDOQpyjP_pp3J16w.png)](https://cdn-images-1.medium.com/max/800/1*-x4XNekDOQpyjP_pp3J16w.png)

Tương tự với các phương thức `Object.keys`  và `Object.getOwnPropertyNames`

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*sOyOaDwHcfM7waNDdSzCyw.png)](https://cdn-images-1.medium.com/max/800/1*sOyOaDwHcfM7waNDdSzCyw.png)
###  2 - Symbol có tính duy nhất
Giả sử chúng ta muốn thêm một tính năng mới vào đối tượng `Array` có tên là `includes`. Thay vì đặt một tên gọi kiểu như `custom_includes` thì làm như nào để có thể thêm trực tiếp phương thức này mà tránh được việc xung đột với `Array.prototype.includes` đã có sẵn ?

Đầu tiên, tạo một biến có tên chính xác là `includes` và gán một symbol cho nó. Sau đố thêm biến này vào đối tượng `Array` sử dụng giống ngoặc vuông và gán bất kỳ hàm nào mong muốn.

Cuối cùng sử dụng hàm trên bằng dấu ngoặc vuông. Nhưng chú ý là phải sử dụng đúng tên biến bên trong dấu ngoặc vuông `arr[includes]()`, chứ không phải một chuỗi ký tự.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*y7I8tWdlPSMCrjVBVLy61A.png)](https://cdn-images-1.medium.com/max/800/1*y7I8tWdlPSMCrjVBVLy61A.png)
### 3 - Symbol "phổ biến" (symbol "toàn cục")
Javascript đã có sẵn một số biến symbol và gán chúng vào đối tượng toàn cục `Symbol`. Ví dụ: Đối với object `String` trong ES2015: `Symbol.match`, `Symbol.replace`, `Symbol.search`, `Symbol.iterator` và `Symbol.split`.

## Một ví dụ về Symbol: `Symbol.search`
Phương thức pubic `String.prototype.search` được dùng để tìm kiếm trong chuỗi ký tự dựa vào từ khóa hoặc một biểu thức chính quy và trả về vị trí tìm thấy.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*YlmPDGdgKYRpvxmgVZWG_w.png)](https://cdn-images-1.medium.com/max/800/1*YlmPDGdgKYRpvxmgVZWG_w.png)

Trong ES2015, phương thức này sẽ kiểm tra xem có phương thức `Symbol.search` đã được định nghĩa bên trong đối tượng RegExp. Nếu có thì sẽ gọi đến hàm này và ủy quyền cho nó. Do đó, thực tế thì trong phép tìm kiếm đầu tiên ở ví dụ trên, phương thức có symbol là `Symbol.search` của đối tượng RegExp sẽ có nhiệm vụ chính trong việc tìm kiếm.

## Cách thức hoạt động bên trong của Symbol.search (Mặc định)
1. Phân tích `‘rajarao’.search(‘rao’);` 
2. Chuyển "rajarao" thành một đối tượng String `new String(“rajarao”)`
3. Chuyển "rao"  thành một đối tượng RegExp `new Regexp(“rao”)`
4. Gọi hàm `search` của  String object `rajarao`
5. Hàm `search`  gọi tới phương thức `Symbol.search` của đối tượng "rao" và gán việc tìm kiếm cho đối tượng "rao" với tham số truyền vào là "rajarao". Giống như sau: `"rao"[Symbol.search]("rajarao")`
6. `"rao"[Symbol.search]("rajarao")` trả về vị trí (index) là 4 cho hàm `search` và cuối cùng hàm `search` lại trả về giá trị 4 cho đoạn code hiện tại.
Nhưng điều hay ho ở đây là chúng ta có thể truyền vào bất cứ đối tượng nào vào hàm `search` của đối tượng String, không chỉ có mỗi RegExp. Kết quả của hàm `search` sẽ phụ thuộc vào việc định nghĩa phương thức `Symbol.search` của đối tượng được truyền vào.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*KcTW7SyLwehmG3OJZOZy5Q.png)](https://cdn-images-1.medium.com/max/800/1*KcTW7SyLwehmG3OJZOZy5Q.png)
## Tùy biến lại hàm String.search theo một hàm bất kỳ

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*vqiaxbqOGGG0MQ0g_lG2iw.png)](https://cdn-images-1.medium.com/max/800/1*vqiaxbqOGGG0MQ0g_lG2iw.png)

1. Phân tích `‘barsoap’.search(soapObj);` 
2. Chuyển "barsoap" thành một đối tượng String `new String(“barsoap”)`
3. Vì `soapObj` đã là một đối tượng rồi nên không cần bất kỳ phép chuyển đổi nào khác
4. Gọi hàm `search` của đối tượng String "barsoap"
5. Hàm `search`  gọi tới phương thức `Symbol.search` của đối tượng `soapObj` và gán việc tìm kiếm cho đối tượng 'soapObj' với tham số truyền vào là "barsoap". Giống như sau: `soapObj[Symbol.search]("barsoap")`
6. Kết quả trả về là `FOUND`
# Iterators và Iterables
Thông thường để duyệt qua một bộ dữ liệu của những đối tượng tiêu chuẩn như mảng, chuỗi hay map thì chúng ta có những cách như sử dụng vòng lặp `for-of` hoặc toán tử spread `__`. Tuy nhiên, những cách này không thể áp dụng được đối với các đối tượng bình thường.

Ở ví dụ sau, để duyệt qua đối tượng `allUsers`,  chúng ta phải sử dụng một phương thức tùy biến `get` thay vì vòng lặp `for-of` hay  toán tử spread.
Nhưng nếu tất cả các object đều được định nghĩa theo những quy tắc sau thì việc sử dụng các hàm có sẵn là hoàn toàn có thể. Những đối tượng này sẽ được gọi là “iterables”.

[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*TsUGslq0F48-mOy5rjFtoA.png)](https://cdn-images-1.medium.com/max/800/1*TsUGslq0F48-mOy5rjFtoA.png)

Ví dụ về những quy tắc trên:
1. Đối tượng chính sẽ lưu trữ dữ liệu nào đó
2. Đối tượng chính phải định nghĩa một symbol "toàn cục" `symbol.iterator` cho phương thức ở quy tắc #3 và #6
3. Phương thức `symbol.iterator` phải trả về một đối tượng "iterator" khác.
4. Đối tượng "iterator" phải có một phương thức có tên là `next`
5. Phương thức `next` sẽ truy cập đến dữ liệu được lưu ở quy tắc #1
6 Nếu gọi `iteratorObj.next()`, sẽ trả về dữ liệu được lưu ở quy tắc #1: có thể là `{value:<stored data>, done: false}` nếu vẫn còn dữ liệu và `{done: true}` nếu đã hết dữ liệu.
Nếu 6 quy tắc trên đươc áp dụng thì đối tượng chính được gọi là một “iterable” từ quy tắc #1. Các đối tượng được trả về được gọi là “iterator”.

Xem xét cách triển khai 6 quy tắc trên:
[![Image from Medium](https://cdn-images-1.medium.com/max/800/1*8IrkEC9CUfbM3Zj03R3M5A.png)](https://cdn-images-1.medium.com/max/800/1*8IrkEC9CUfbM3Zj03R3M5A.png)

**Chú ý quan trọng:** Khi sử dụng vòng lặp `for-of` hoặc toán tử spread trên một `iterable`, chúng sẽ ngầm định gọi đến `<iterable>[Symbol.iterator]()` để đọc iterator và sử dụng iterator để trích xuất dữ liệu.
Những quy tắc trên được coi là một cách tiêu chuẩn để trả về một đối tượng `interator`

### ** Lược dịch **

**rajaraodv**, *JavaScript Symbols, Iterators, Generators, Async/Await, and Async Iterators — All Explained Simply*, [Medium](https://medium.freecodecamp.org/some-of-javascripts-most-useful-features-can-be-tricky-let-me-explain-them-4003d7bbed32)
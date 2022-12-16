# 1. Generator function 
Generator function là một trong những chức năng không còn mới đối với lập trình viên Javascript. Từ phiên bản ECMAScript 2015 (ES6) nó đã được nhà phát triển đưa vào sử dụng bằng cú pháp khai báo "function* " , và tất nhiên là trả về một Generator object. 

Đâu đó trên mozilla.org có định nghĩa như sau : "Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances ". Vì thế bạn có thể hiểu rằng nó là một function có thể được thực thi nhiều lần liên tiếp mà ngữ cảnh (số lượng biến, giá trị biến, trạng thái các thành phần bên trong hàm ...) đều có thể lưu lại sử dụng sau mỗi phiên.
Với chức năng mới này, Generator function cũng có thể dừng thực thi bất cứ thời điểm nào, đợi một điều kiện nào nó xảy ra rồi mới tiếp tục thực thi (Ví dụ như khi gọi ajax, các kiến trúc async chẳng hạn).

## Cú pháp 
```
function* name([param[, param[, ... param]]]) {
   statements
}
```
Trong đó thì name: tên hàm.
                       param: tham số đầu vào của hàm, tối đa 255 tham số.
                       statements: phần thân chứa nội dung của hàm.
                       
## Giá trị trả về
Khi chúng ta gọi Generator function : " nameYourFuntion() " , nó không trả về các kiểu dữ liệu cơ bản mà đẩy về một  *iterator object* .
Hàm next()  của iterator object được sử dụng để truy xuất các node dữ liệu sau mỗi bước resume lại generator function. Khi đó generator function sẽ thực thi hàm cho đến khi gặp từ khóa yield , hoặc return kế tiếp chưa được duyệt ở bước trước.
P/s : iterator định nghĩa một chuẩn để tạo ra list các giá trị hữu hạn hoặc thậm chí vô hạn. Nó giúp bạn lấy ra giá trị mong muốn khi list kết quả đã được khởi tạo xong toàn bộ.

# 2. Yield
- Yield được sử dụng ở một vài nơi và có vẻ khái niệm cũng hơi khác nhau. Trong ruby, javascript hay làm chỉ định trong laravel framework ... mỗi nơi có một định nghĩa và cách sử dụng khác nhau. Ngay cả anh google dich cũng sẽ làm bạn lúng túng về nó, "năng suất" , "bày ra", "sản sinh" . Tôi nghe thì thấy có vẻ chả liên quan gì lập trình và chả thấy có gì tò mò để tìm hiểu. Tuy nhiên trong javascript thì yeild lại khá dễ hiểu và dễ hình dung nhé.
- Về cơ bản, yeild là từ khóa dùng để tạm dừng và cũng để tiếp tục việc thực thi bên trong generator function.
## Sử dụng
```
function* generatorFunc(index) {
  while (index < 2) {
    yield index++;
  }
}

const iterator = generatorFunc(0);

console.log(iterator.next());
// log output: {value : 0, done : false}

console.log(iterator.next());
// log output: {value : 1, done : false}

console.log(iterator.next());
// log output: {value : underfined, done : true}
```
Như đã đề cập ở trên thì iterator được khởi tạo bằng generatorFunc với index bắt đầu bằng 0.
Bạn có thể thấy yeild ở đây, trong ví dụ này chính là một phiên bản khác giống như return vậy.  Nó trả về một đối tượng IteratorResult với hai thuộc tính là "value" và "done".
```
value : kết quả của biểu thức trả về.
done : nhận giá trị false nếu quá trình generator chưa hoàn thành, true nếu ngược lại.
```
Giá trị của index được giữ lại sau mỗi lần chúng ta gọi next() và tất nhiên là cả ngữ cảnh của hàm generator cũng thế cho đến khi toàn bộ yield, return đã được duyệt qua..

# 3.Yield*
Yield* là một dạng ủy quyền thực thi. Ở đây, yield* có thể nhúng mã của một generator function ngay sau nó hoặc là ủy quyền trực tiếp cho một iterator object.

Cú pháp : 
```
yield* [[expression]]
```
expression ở đây trả về iterator object như đã nói, có thể là generator function, hoặc mảng, hoặng string, hoặc list, ....

Ví dụ :
```
function* g2() {
yield 3;
yield 4;
}

function* g1() {
  yield* [1, 2];
  yield* g2();
  yield* '56';
  yield* Array.from(arguments);
}

var iterator = g(9, 10);

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 4, done: false}
console.log(iterator.next()); // {value: "5", done: false}
console.log(iterator.next()); // {value: "6", done: false}
console.log(iterator.next()); // {value: 9, done: false}
console.log(iterator.next()); // {value: 10, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

Bạn có thể sử dụng yield* theo nhiều cách như trên, miễn rằng đằng sau đó trả về một object có kiểu thuộc iterator.

Chú ý : yield* là một biểu thức chứ không phải là một câu lệnh, do đó nó sẽ phản ánh lại giá trị được return về.
Ví dụ :
```
function* g2() {
  yield* [1, 2];
  return 't sẽ trở thành vua hải tặc, vd như vậy xem chạy ko';
}

var rs;

function* g() {
  rs = yield* g2();
}

var iterator = g();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: undefined, done: true}, 
                              // g2() đã trả về {value: 't sẽ trở thành vua hải tặc, vd như vậy xem chạy ko', don
# ***1. Generator function***
- Generator function (function*) là một trong những chức năng mới của Javascript trong ECMAScript 2015 (ES6). 
- function* giúp khai báo 1 generator function, trả về 1 Generator object. 
- "Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances ". Vì thế bạn có thể hiểu rằng nó là một function có thể được thực thi nhiều lần liên tiếp mà ngữ cảnh ( số lượng biến, giá trị biến, trạng thái các thành phần bên trong hàm... ) đều có thể lưu lại sử dụng sau mỗi phiên. Với chức năng mới này, Generator function cũng có thể dừng thực thi bất cứ thời điểm nào, đợi một điều kiện nào nó xảy ra rồi mới tiếp tục thực thi (Ví dụ như khi gọi ajax, các kiến trúc async chẳng hạn).
- Có thể hiểu Generator function là một function, có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác.
### *Cú pháp*
```
    function* name([param[, param[, ... param]]]) {
       statements
    }
```
Trong đó thì:

```
 + name: tên hàm. 
 + param: tham số đầu vào của hàm, tối đa 255 tham số. 
 + statements: phần thân chứa nội dung của hàm.
```

Giá trị trả về:
- Khi chúng ta gọi Generator function : " nameYourFuntion() " , nó không trả về các kiểu dữ liệu cơ bản mà đẩy về một iterator object . Hàm next() của iterator object được sử dụng để truy xuất các node dữ liệu sau mỗi bước resume lại generator function. Khi đó generator function sẽ thực thi hàm cho đến khi gặp từ khóa yield , hoặc return kế tiếp chưa được duyệt ở bước trước.
- Nói cách khác hàm sẽ không được thực thi ngay sau khi gọi, mà thay vào đó generator function trả về iterator, giống như con trỏ trong vòng lặp. Sau khi hàm next() của iterator được gọi, generator function sẽ thực thi hàm cho đến khi gặp từ khóa yield đầu tiên.  yield sẽ trả về giá trị cho iterator, generator function kết thúc cho đến khi hết giá trị để yield.

**Sơ lược về iterator:** 
 + Iterator là một bộ duyệt dùng để duyệt qua một mảng, một danh sách hoặc một collection mà qua mỗi lần duyệt sẽ ghi lại vị trí đã duyệt để từ đó có thể biết và lấy vị trí tiếp theo.
 + Trong Javascript thì iterators có cung cấp phương thức next() và phương thức này sẽ return về phần tử kế tiếp, đồng thời ghi nhận luôn phần tử đã lặp là phần tử next(). Phương thức next() sẽ return về một Object gồm hai thuộc tính là value và done. done có giá trị true nếu Iteration đã hoàn thành, ngược lại nó có giá trị false.
 
Ví dụ: Hàm sau có tác dụng tạo ra ID tăng dần, mỗi khi hàm next được gọi.
```
function* id_maker(){
  var index = 0;
  while(index < 3)
    yield index++;
}

var gen = id_maker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
```
=> yield sẽ được gọi 3 lần trong vòng lặp for, do đó khi gọi đến lần thứ 4 thì log sẽ trả về undefined.
Ở ví dụ trên, gen.next() sẽ trả về một object có 2 tham số là value và done. Kiểm tra có còn next() được nữa hay không thì chỉ cần kiểm tra giá trị done
```
console.log(gen.next()); // { value: 0, done: false }
```


# ***2. Yield***
- Về cơ bản, yeild là từ khóa dùng để tạm dừng và cũng để tiếp tục việc thực thi bên trong generator function.
### *Sử dụng*
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

- Như đã đề cập ở trên thì iterator được khởi tạo bằng generatorFunc với index bắt đầu bằng 0. Bạn có thể thấy yeild ở đây, trong ví dụ này chính là một phiên bản khác giống như return vậy. Nó trả về một đối tượng IteratorResult với hai thuộc tính là "value" và "done".

```
value : kết quả của biểu thức trả về.
done : nhận giá trị false nếu quá trình generator chưa hoàn thành, true nếu ngược lại.
```

- Giá trị của index được giữ lại sau mỗi lần chúng ta gọi next() và tất nhiên là cả ngữ cảnh của hàm generator cũng thế cho đến khi toàn bộ yield, return đã được duyệt qua..

=> **yield chỉ có thể return về giá trị. Để return về 1 hàm ta sử dụng yield***

Ví dụ:

```
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```
# ***3.Yield****
- Yield* là một dạng ủy quyền thực thi. Ở đây, yield* có thể nhúng mã của một generator function ngay sau nó hoặc là ủy quyền trực tiếp cho một iterator object.

### *Cú pháp*
```
yield* [[expression]]
```
- expression ở đây trả về iterator object như đã nói, có thể là generator function, hoặc mảng, hoặng string, hoặc list, ....

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

- Bạn có thể sử dụng yield* theo nhiều cách như trên, miễn rằng đằng sau đó trả về một object có kiểu thuộc iterator.

**Chú ý**: yield* là một biểu thức chứ không phải là một câu lệnh, do đó nó sẽ phản ánh lại giá trị được return về. 

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
console.log(iterator.next()); // {value: undefined, done: true}
```
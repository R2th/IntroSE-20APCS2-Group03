### Mở đầu
Là một nhà phát triển cần quan tâm tới câu hỏi "Làm sao để có thể tạo ra một chương trình có chất lượng tốt". Một chương trình với chất lượng tốt cần có những đoạn mã nguồn tốt làm cơ sở. Vậy như thế nào là một mã nguồn tốt? Đứng trên quan điểm của bản thân mình một mã nguồn tốt cần đảm bảo cả về hình thức và hiệu năng.
1. Về hình thức: mã nguồn cần ngắn gọn, dễ hiểu, logic rõ ràng, tuân thủ theo các convention được thống nhất chung.
2. Về hiệu năng: mã nguồn cần có hiệu năng tốt ổn định.

Đôi khi để đảm bảo tính đơn giản, ngắn gọn và dễ đọc chúng ta cần phải hy sinh một phần hiệu năng trong khoảng chấp nhận được. Tuy nhiên trong hầu hết các trường hợp chúng ta nên lựa chọn những giải pháp cho hiệu năng tốt để hệ thống hoạt động một cách tốt nhất. Benchmark.js là một thư viện giúp chúng ta làm được việc đó, nó cung cấp chức năng so sánh hiệu năng của các giải pháp chúng ta có thể nghĩ ra nhằm lựa chọn được giải pháp có hiệu năng tốt.

### Benchmark.js
Benchmark.js là một thư viện Javascript cung cấp khả năng so sánh hiệu năng của các javascript functions. Benchmark.js sẽ thực hiện function nhiều lần và trả về kết quả dưới thông số dưới dạng `operations/sec`, giá trị này càng lớn thể hiện tốc độ của function sẽ càng nhanh qua đó chúng ta có thể lựa chọn được giải pháp tốt nhất trong các giải pháp được đưa ra.

Có 2 cách để sử dụng Benchmark.js
- In browser: thông qua [lodash.js](https://lodash.com/), [platform.js](https://github.com/bestiejs/platform.js#readme), [benchmark.js](https://raw.githubusercontent.com/bestiejs/benchmark.js/2.1.2/benchmark.js)

    ```html
    <script src="lodash.js"></script>
    <script src="platform.js"></script>
    <script src="benchmark.js"></script>
    ```
   
- Cài đặt thông qua `npm`:
    ```bash
    npm install --save benchmark
    ```
    
### Ví dụ

#### Bài toán kiểm tra 1 chữ có tồn tại trong 1 string hay không?

```javascript
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
  !!'Hello World!'.match(/o/);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
```

Kết quả thu được:
```
RegExp#test x 44,583,272 ops/sec ±0.56% (89 runs sampled)
String#indexOf x 804,825,871 ops/sec ±1.40% (84 runs sampled)
String#match x 22,052,172 ops/sec ±1.69% (89 runs sampled)
Fastest is String#indexOf
```
Như vậy trong 3 giải pháp trên, giải pháp sử dụng `String.indexOf` là giải pháp cho hiệu năng tốt nhất.

#### Bài toán chuyển 1 chuỗi thành mảng và đảo ngược
Ta có các giải pháp như sau:
```javascript
// version 1

"hello".split("").reverse();

// version 2

[..."hello"].reverse();

// version 3

Array.from("hello").reverse();
```

Cùng kiểm tra xem đâu sẽ là phương án tốt nhất:
```javascript
const { Benchmark } = require("benchmark");

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomNumberBetween(min, max){
    return Math.floor(Math.random() * max) + min;
}

// data contains 100 random strings with lneght between 1 and 1000
const data = [];
for (let i = 0; i < 100; i++) {
    data.push(generateRandomString(generateRandomNumberBetween(1, 1000)));
}

const suite = new Benchmark.Suite();
suite.add("string.split()", function() {
    for (const str of data) {
        str.split("");
    }
});
suite.add("Object spread", function () {
    for (const str of data) {
        [...str];
    }
});
suite.add("Array.from()", function() {
    for (const str of data) {
        Array.from(str);
    }
});
suite.on("cycle", function(event) {
    console.log(String(event.target));
});
suite.on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
})
suite.run();
```

Kết quả:
```
string.split() x 18,548 ops/sec ±0.41% (94 runs sampled)
Object spread x 3,001 ops/sec ±0.19% (98 runs sampled)
Array.from() x 2,936 ops/sec ±0.75% (94 runs sampled)
Fastest is string.split()
```

Trong ví dụ này chúng ta đã mở rộng kiểm tra dựa trên một tập dữ liệu ngẫu nhiên nhằm có được kết quả một cách khách quan nhất. Kết quả thu được là giải pháp sử dụng string.split() sẽ cho hiệu năng cao nhất.

### Kết luận
Lợi ích của việc benchmark đánh giá hiệu năng của các giải pháp có thể chưa được nhìn nhận khi dự án còn nhỏ, các vấn đề về hiệu năng chưa thể hiện một cách rõ ràng. Tuy nhiên khi hệ thống đã dần ngày một phức tạp những vấn đề về hiệu năng có thể phát sinh và đem lại hậu quả to lớn. 

Là một nhà phát triển chúng ta cần có trách nhiệm với sản phẩm mình tạo ra từ những việc nhỏ nhặt nhất. Hy vọng qua bài viết này sẽ giúp mọi người có thêm 1 công cụ để giúp cho sản phẩm của mình được tốt hơn.

### Tham khảo
https://benchmarkjs.com/

https://dev.to/forgacs_peter/benchmarking-javascript-34l4
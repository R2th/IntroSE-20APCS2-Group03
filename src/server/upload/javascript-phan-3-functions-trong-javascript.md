---

>  Ở phần trước chúng ta đã cùng tìm hiểu về [Javascript phần 2:  Program Structure trong javascript.](https://viblo.asia/p/javascript-phan-2-program-structure-trong-javascript-Qbq5QLnmlD8) phần này chúng ta sẽ cùng tìm hiểu về Javascript phần 3: Functions trong javascript.

### Donald Knuth
>Người ta nghĩ rằng khoa học máy tính là nghệ thuật của những thiên tài nhưng thực tế thì ngược lại, chỉ cần nhiều người làm các công việc cùng nhau, giống như một bức tường được tạo nên từ những viên đá nhỏ.


```
Hàm là một công cụ để cấu trúc nên một chương trình lớn, để giảm sự lặp đi lặp lại và cô lập các chương trình con với nhau.

Những câu lệnh được hổ trợ sẵn thì khá cứng nhắc, vì vậy ta cần phải sử dụng thêm ngôn ngữ của chính mình để tạo nên sự linh hoạt hơn trong lập trình.
```

### Defining a function
Việc định nghĩa hàm cũng giống như định nghĩa một biến thông thường. Ví dụ: đoạn code sau đây định nghĩa một biến square như một hàm để thực hiện bình phương một số.

```javascript
var square = function(x) {
  return x * x;
};
```

- Một hàm được tạo ra bởi một biểu thức bắt đầu bằng từ khóa `function`. Một hàm gồm có một bộ các tham số và thân hàm chứa các câu lệnh sẽ được thực thi khi hàm được gọi. Thân hàm phải luôn luôn được chứa trong cặp dấu hoặc nhọn, ngay khi chỉ có một dòng lệnh.
- Một hàm có thể có nhiều tham số hoặc không có tham số nào cả. Như trong ví dụ bên dưới, hàm `makeNoise` không chứa bất kỳ một tham số nào, trong khi đó hàm  `power` có hai tham số truyền vào.

```javascript
var makeNoise = function() {
  console.log("Pling!");
};

makeNoise();
// → Pling!

var power = function(base, exponent) {
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
};

console.log(power(2, 10));
// → 1024
```

Một vài hàm sẽ trả về một giá trị, như hàm `power` và hàm `square`, trong khi một số khác thì không như hàm `makeNoise`. Câu lệnh `return` sẽ quyết định giá trị trả về của hàm. Khi chương trình thực thi đến câu lệnh `return` thì ngay lập tức sẽ thoát ra khỏi hàm hiện tại và trả về giá trị cho đối tượng đã gọi hàm đó. Nếu từ khóa `return` mà không kèm theo một biểu thức nào đằng sau nó thì hàm sẽ trả về giá trị là `undefined`.

### Bindings and scopes
Một tính chất quan trọng của function là các biến được tạo ra bên trong function, bao gồm các đối số của nó, đều là các biến local. Ví dụ biến kết quả `result` trong ví dụ hàm `power` sẽ được tạo mới mỗi khi hàm được gọi, và mỗi các biến được tạo ra ở mỗi lần gọi riêng biệt không can thiệp đến nhau.
Tính chất local chỉ áp dụng cho các biến được khai báo với từ khóa `var` bên trong function. Các biến được khai báo bên ngoài `function` được gọi là `global`, các biến này có thể được sử dụng ở mọi nơi trong chương trình. Có thể truy cập các biến như vậy từ bên trong `function`, miễn là trong `function` không khai báo một biến local có cùng tên.
Đoạn code sau chứng tỏ điều này. Nó định nghĩa và gọi 2 `function`, cả 2 `function` này đều gán một giá trị cho biến `x`. Function đầu tiên khai báo biến `x` là biến local, vì vậy các thay đổi chỉ có tác dụng ở mức độ local tức là bên trong fuction. `Function` thứ 2 không khai báo biến `x` là biến local, vì vậy mọi sự thay đổi `x` bên trong fucntion đều sẽ ảnh hưởng đến giá trị của biến `x` đã khai báo trên cùng.

``` javascript
var x = "outside";

var f1 = function() {
  var x = "inside f1";
};
f1();
console.log(x);
// → outside

var f2 = function() {
  x = "inside f2";
};
f2();
console.log(x);
// → inside f2
```

Hành vi này giúp ngăn chặn sự can thiệp ngẫu nhiên giữa các chức năng. Nếu tất cả các biến đều được chia sẻ trong toàn bộ chương trình thì sẽ gặp nhiều khó khăn để đảm bảo rằng không có một tên biến nào lại được sử dụng cho hai mục đích khác nhau.Nếu bạn sử dụng lại một tên biến, bạn sẽ thấy nhiều kết quả không mong muốn và code của bạn sẽ rối tung lên. Việc xử lý biến local xuất hiện trong `function` làm cho chương trình có thể đọc hiểu mà không cần lo lắng đến các thành phần khác ngoài `function`.

### Nested Scopes

Javascript không chỉ phân biệt giữa biến local và global. `Function` có thể được tạo ra bên trong các function khác, tạo ra mức độ local của `function`.

Ví dụ, hàm khá vô lý sau có 2 `function` bên trong nó:
```javascript
var landscape = function() {
  var result = "";
  var flat = function(size) {
    for (var count = 0; count < size; count++)
      result += "_";
  };
  var mountain = function(size) {
    result += "/";
    for (var count = 0; count < size; count++)
      result += "'";
    result += "\\";
  };

  flat(3);
  mountain(4);
  flat(6);
  mountain(1);
  flat(1);
  return result;
};

console.log(landscape());
// → ___/''''\______/'\_
```

Các function `flat` và `mountain` có thể "nhìn thấy" biến `result`, vì 2 hàm này nằm bên trong hàm định nghĩa nó.Nhưng chúng không thể "nhìn thấy" các biến số của nhau vì chúng nằm bên ngoài phạm vi của nhau. Các biến bên ngoài function `landscape` sẽ không thấy bất kì biến nào bên trong `landscape`.
Cách tiếp cận biến và hàm  như trên được gọi là `lexical scoping`.
Những lập trình viên có kinh nghiệm với các ngôn ngữ khác có thể mong đợi các đoạn code trong các dấu ngoặc tạo ra một môi trường mới. Nhưng trong JavaScript, function là thứ duy nhât tạo ra một phạm vi mới. Bạn được phép sử dụng các khối code đứng tự do.

```javascript
var something = 1;
{
  var something = 2;
  // Do stuff with variable something...
}
// Outside of the block again...
```

Biến `something` bên trong block giống biến ở bên ngoài block. Thực tế việc này được cho phép và nó chỉ có ích khi block này là phần điều kiện của lệnh if hoặc vòng lặp.
Version tiếp theo của JavaScript sẽ giới thiệu từ khóa `let`, nó hoạt động như `var` nhưng chỉ có tác dụng trong vùng scope cận kề với nó trong khi với `var` thì biến có thể truy cập được ở bất kì vị trí nào trong hàm.

### Function as values
Các biến số hàm (`function variables`) thường chỉ đóng vai trò đơn giản như tên cho 1 phần riêng biệt của chương trình. Các biến số như vậy, chỉ được định nghĩa 1 lần và không bao giờ thay đổi. Điều này làm chúng ta dễ nhầm lẫn giữa hàm (`function`) và tên của nó.
Tuy nhiên, cả 2 là khác biệt. 1 giá trị hàm (`function value`) có thể làm tất cả những thứ mà các giá trị (`values`) có thể làm - bạn có thể sử dụng nó trong các biểu thức tùy ý, chứ không phải đơn giản là gọi nó. Ta có thể lưu giá trị hàm (`function value`) ở 1 nơi mới, truyền nó như 1 đối số vào 1 hàm khác, và hơn thế nữa. Tương tự vậy, 1 biến có thể lưu trữ hàm như 1 biến bình thường và có thể được gán 1 giá trị mới, như:
```javascript
var launchMissiles = function(value) {
  missileSystem.launch("now");
};
if (safeMode)
  launchMissiles = function(value) {/* do nothing */};
```
Trong [Chương 5](), chúng ta sẽ bàn luận về những điều tuyệt vời chúng ta có thể làm bằng việc truyền các giá trị hàm (`function values`) vào các hàm khác.

### Declaration notation
Ở đây có 1 cách ngắn gọn hơn để nói "`var square = ...function`". Từ khóa `function` có thể được dùng ở đầu cú pháp, như trong trường hợp dưới đây:
```javascript
  function square(x) {
    return x * x;
  }
```
Đây là một *khai báo* hàm. Cú pháp trên định nghĩa biến `square` và trỏ nó vào hàm được cho. Cho đến bây giờ mọi thứ đều tốt đẹp. Ở đây có 1 sự tinh tế với hình thức khai báo hàm này, tuy nhiên.
```javascript
  console.log("The future says:", future());

  function future() {
    return "We STILL have no flying cars.";
  }
```
Đoạn mã trên hoạt động, mặc dù hàm được định nghĩa *bên dưới* (*below*) phần mã (code) dùng đến nó. Đó là bởi vì việc khai báo hàm không phải là 1 phần của quá trình *từ-trên-xuống* (top-to-bottom) thông thường. Chúng được xem như di chuyển đến đỉnh (top) phạm vi (scope) của chúng và có thể được sử dụng bởi tất cả đoạn mã (code) thuộc cùng phạm vi. Điều này đôi lúc hữu dụng bởi nó cho chúng ta tự do sắp xếp mã theo cách trông có nghĩa nhất, mà không cần phải lo lắng về việc phải định nghĩa (define) tất cả hàm bên trên, trước khi chúng được dùng đến.

Điều gì xảy ra khi ta đưa 1 định nghĩa hàm vào trong 1 khối điều kiện (*if*) hay vòng lặp? Chà, đừng làm điều đó. Sự khác biệt của nền tảng JavaScript trong từng trình duyệt theo thường lệ sẽ thực hiện những công việc khác nhau tùy tình huống, và chuẩn mới nhất hầu như không cho phép điều này. Nếu bạn muốn chương trình của mình được ổn định , chỉ sử dụng hình thức định nghĩa hàm này ở khối hàm  hay chương trình ngoài cùng nhất.
```javascript
  function example() {
    function a() {} // Okay
    if (something) {
      function b() {} // Danger!
    }
  }
```

### The call stack
Có một cái nhìn gần hơn về cách sự điều khiển chảy qua các hàm là rất hữu ích.
```javascript
  function greet(who) {
    console.log("Hello " + who);
  }
  greet("Harry");
  console.log("Bye");
```
Duyệt qua chương trình này, mọi thứ diễn ra đại khái như sau: lời gọi đến `greet` làm cho control nhảy đến điểm bắt đầu của hàm đó. Nó gọi `console.log`, `console.log` lấy quyền điều khiển , làm công việc của nó, và sau đó trả điều khiển (control) về dòng 2. Sau đó nó đi đến đoạn cuối của hàm `greet`, sau đó trở lại nơi đã gọi nó, tại dòng 4. Dòng này sau đó gọi `console.log` một lần nữa.
Chúng ta có giản đồ dòng chảy của điều khiển (flow of control) như sau:
```
  top
    greet
      console.log
    greet
  top
    console.log
  top
```
Bởi vì 1 hàm phải nhảy trở lại (jump back) nơi gọi nó khi trở về (`return`), máy tính phải ghi nhớ ngữ cảnh từ đâu hàm được gọi. Trong trường hợp trên, `console.log` phải nhảy ngược trở lại hàm `greet`. Trong các trường hợp khác, nó nhảy ngược trở lại điểm kết thúc của chương trình.
Nơi mà máy tính lưu trữ các ngữ cảnh này được gọi là *ngăn xếp lời gọi* (*call stack*). Mỗi lần hàm được gọi, ngữ cảnh hiện thời được đẩy vào đỉnh của "ngăn xếp" (stack) này. Khi hàm trở về, máy tính loại bỏ ngữ cảnh ở đỉnh của ngăn xếp và dùng nó để tiếp tục thực thi.

Lưu ngăn xếp này đòi hỏi 1 lượng bộ nhớ của máy tính. Khi ngăn xếp trở nên quá lớn, máy tính xuất ra thông điệp lỗi như "hết bộ nhớ stack" hay "quá nhiều sự quay về". Đoạn mã (code) sau đây minh họa cho điều này bằng cách yêu cầu máy tính 1 câu hỏi khá khó, sẽ dẫn đến việc gọi tới-lui (back-and-forth) vô hạn (infinite) giữa 2 hàm. Đúng hơn, điều đó *sẽ là* vô hạn, nếu máy tính có 1 ngăn xếp vô hạn. Và vì không phải như vậy, chúng ta sẽ cạn bộ nhớ, hoặc "làm nổ stack".
```javascript
  function chicken() {
    return egg();
  }
  function egg() {
    return chicken();
  }
  console.log(chicken() + " came first.");
  // -> ??
```

### Optional Arguments
Đoạn code bên dưới được cho phép và có thể thực thi suông sẻ mà không gặp bất cứ vấn đề gì.
```javascript
alert("Hello", "Good Evening", "How do you do?");
```
Do hàm alert chỉ nhận một tham số truyền vào nên trong ví dụ trên các tham số khác đã bị bỏ qua và khi thực thi ta chỉ nhận được kết qủa là "Hello".

Javascript rất sáng suốt trong việc đặt tham số, nếu như bạn đặt qúa nhiều tham số vào một hàm, thì một số tham số không cần thiết sẽ bị bỏ qua và nếu bạn đặt qúa ít tham số thì những tham số bị thiếu sẽ có gía trị mặc định là undifined. Mặc khác đây cũng chính là nhược điểm của javascript bởi vì nếu bạn đặt sai số lượng tham số và một hàm thì cũng không ai thông báo cho bạn biết, điều đó có thể làm chương trình của bạn chạy không chính xác.

Ngược lại lợi ích của nó là có thể được sử dụng để tạo ra một hàm cho phép lựa chọn tham số linh hoạt. Như ví dụ bên dưới hàm power có thể được gọi với 2 tham số hoặc chỉ một tham số, trong trường hợp truyền vào 1 tham số thì exponent sẽ được gán mặc định là 2.
```javascript
function power(base, exponent) {
  if (exponent == undefined)
    exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
}

console.log(power(4));
// → 16
console.log(power(4, 3));
// → 64
```
Trong chương kế tiếp chúng ta sẽ thấy được cách lấy chính xác danh sách các tham số đã được truyền vào. Ví dụ: console.log sẽ thực hiện điều đó, nó xuất ra tất cả các gía trị mà nó nhận được.
```javascript
console.log("R", 2, "D", 2);
// → R 2 D 2
```

### Closure
Đây là khả năng xử lý các hàm như là gía trị, liên hệ với thực tế ta thấy biến cục bộ sẽ được tái tạo lại mỗi khi hàm được gọi, điều này gợi cho chúng ta một câu hỏi thú vị là điều gì sẽ xảy ra với các biến cục bộ khi lời gọi hàm đã tạo ra chúng không còn hoạt động?

Bên dưới là một đoạn code minh họa cho điều đó, nó định nghĩa một hàm wrapValue, tạo ra một biến cục bộ. Sau đó nó trả về một hàm, mà hàm này sẽ truy cập đến biến cục bộ và trả về gía trị của biến này.
```javascript
function wrapValue(n) {
  var localVariable = n;
  return function() { return localVariable; };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
```
Điều này được cho phép và làm việc như bạn hy vọng, các biến vẫn có thể được truy cập. Thật vậy, nhiều trường hợp các biến có thời gian sống là như nhau, đó là một minh họa tốt cho khái niệm biến cục bộ được tái tạo lại sau mỗi lời gọi hàm, các lời gọi hàm khác nhau không thể tác động đến các biến cục bộ của nhau.

Tính năng này có thể được liên hệ đến một trường hợp đặc biệt của biến cục bộ trong một hàm kèm theo được gọi là closure. Một hàm đặt trên biến cục bộ được gọi là một closure. Điều này không những giúp chúng ta khỏi phải lo lắng về thời gian sống của các biến mà còn cho phép chúng ta sáng tạo trong việc sử dụng các gía trị của hàm.

Với một chút thay đổi, chúng ta có thể biến các ví dụ trước thành một hàm mà có thể thực hiện việc nhân một số tùy ý.
```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

var twice = multiplier(2);
console.log(twice(5));
// → 10
```
Biến cục bộ trong ví dụ hàm wrapValue là một biến được khai báo tường minh không cần thiết vì một tham số là một biến cục bộ của chính nó.

### Recursion
Cho phép một hàm gọi chính bản thân nó, miền là nó được chú ý để không làm tràn stack. Đệ quy cho phép ta viết một số hàm với phong cách khác nhau. Lấy ví dụ bằng việc thay đổi hàm power như sau:
```javascript
function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else
    return base * power(base, exponent - 1);
}
```
Điều này khá giống với việc xác định lũy thừa trong toán học và các khái niệm của nó được mô tả một cách trang trọng hơn so với các biến thể lặp khác. Các hàm tự gọi chính nó nhiều lần với các tham số khác nhau để có được các phép nhân lặp đi lặp lại.

Nhưng việc triển khai đệ quy sẽ gây ra một vấn đề nghiêm trọng: trong triển khai javascript truyền thống, nó chậm hơn gấp 10 lần so với việc dùng vòng lặp. Thực thi một vòng lặp đơn giản sẽ tiết kiệm hơn nhiều so với việc lặp đi lặp lại một hàm.

Vấn đề về tốc độ so với sự sang trọng là một trong những điều khá thú vị. Hầu như bất kì chương trình nào cũng có thể được thực hiện nhanh hơn bằng cách làm cho nó lớn hơn và phức tạp hơn. Các lập trình viên sẽ phải quyết định để có được sự cân bằng thích hợp.

Trong trường hợp hàm power thì việc lặp vẫn còn đơn giản và dễ dàng đọc được. Nó không có nhiều ý nghĩa để thay thế nó bằng đệ quy. Thông thường một chương trình với những khái niệm phức tạp như vậy mà có thể từ bỏ đi được một số hiệu qủa để làm chương trình đơn giản hơn là một sự lựa chọn hấp dẫn. Đôi khi với một lập trình viên giàu kinh nghiệm có thể thấy ngay rằng một cách tiếp cận đơn giản thì không bao giờ đủ nhanh.

Một số lập trình viên lại tập trung qúa nhiều vào hiệu qủa, kể cả những chi tiết nhỏ nhặt nhất. Điều này sẽ làm tốn rất nhiều thời gian để viết hơn là việc sử dụng các thuật toán đơn giản mà thường chạy nhanh hơn. Đệ quy không phải lúc nào cũng kém hiệu qủa hơn vòng lặp. Với một số vấn đề thì giai quyết bằng đệ qui sẽ dễ dàng hơn so với dùng vòng lặp.

### Growing functions
Thông thường có 2 cách để giới thiệu `function` trong chương trình.
Đầu tiên, bạn thấy mình viết những đoạn code giống nhau rất nhiều lần. Chúng ta muốn tránh những điều đó vì càng nhiều code thì đồng nghĩa với việc có nhiều không gian hơn cho các lỗi xuất hiện và người đọc code phải cố gắng nhiều hơn để hiểu được chương trình. Vì vậy khi có các chức năng lặp đi lặp lại ta gom chúng lại, đặt tên cho nó và đặt nó vào một function.
Thứ hai, bạn thấy bạn cần một số chức năng mà bạn chưa từng viết. Bạn sẽ bắt đầu bằng cách đặt tên các chức năng và sau đó bạn viết phần thân của nó. Bạn thậm chí có thể phải viết code sử dụng function đó trước khi xác định các chức năng chính của function đó.
Việc tìm một cái tên mô tả rõ ràng, ngắn gọn cho function là một việc không dễ dàng.Hãy cùng xem xét ví dụ sau.
Chúng ta muốn viết một chương trình in ra 2 số, số bò và số gà trong 1 trang trại, với từ *Cows* và *Chickens* sau các số đó và các số 0 đệm trước để các số này đều luôn là 3 chữ số.

`007 Cows`

`011 Chickens`

Rõ ràng chúng ta cần 1 function có 2 đối số.
```javascript
function printFarmInventory(cows, chickens) {
  var cowString = String(cows);
  while (cowString.length < 3)
    cowString = "0" + cowString;
  console.log(cowString + " Cows");
  var chickenString = String(chickens);
  while (chickenString.length < 3)
    chickenString = "0" + chickenString;
  console.log(chickenString + " Chickens");
}
printFarmInventory(7, 11);
```

Thêm `.length` vào sau chuỗi sẽ cho ta chiều dài của chuỗi đó. Vòng lặp while thêm các con số 0 trước các số cho đến khi có ít nhất 3 ký tự.
Nhiệm vụ hoàn thành. Nhưng nếu người nông dân ở trang trại nuôi thêm heo và muốn chúng ta mở rộng phần mềm để đếm cả số lợn. Chúng ta chắc chắn có thể làm điều đó.Thay vì copy và dán đoạn code xuống, chúng ta sẽ có 1 cách tốt hơn.
```javascript
function printZeroPaddedWithLabel(number, label) {
  var numberString = String(number);
  while (numberString.length < 3)
    numberString = "0" + numberString;
  console.log(numberString + " " + label);
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickens");
  printZeroPaddedWithLabel(pigs, "Pigs");
}

printFarmInventory(7, 11, 3);
```
Nó hoạt động tốt. Nhưng cái tên `printZeroPaddedWithLabel` là cách đặt khá vụng về. Nó đề cập đến ba hàm, thêm số 0, và thêm một nhãn vào một chức năng duy nhất. Chúng ta nên chọn ra 1 khái niệm duy nhất.
```javascript
function zeroPad(number, width) {
  var string = String(number);
  while (string.length < width)
    string = "0" + string;
  return string;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(zeroPad(cows, 3) + " Cows");
  console.log(zeroPad(chickens, 3) + " Chickens");
  console.log(zeroPad(pigs, 3) + " Pigs");
}

printFarmInventory(7, 16, 3);
```
Một function với một tên đẹp và rõ ràng như zeroPad giúp người đọc dễ tìm ra và hiểu được chức năng của nó.

### Functions and side effects
`Function` có thể tạm chia thành những chức năng được gọi để dùng chức năng phụ và những chức năng được gọi để dùng các giá trị trả về. (Mặc dù nó chắc chắn trả về cả chức năng phụ lẫn trả về giá trị).

Các chức năng trợ giúp đầu tiên trong ví dụ trang trại, `printZeroPaddedWithLabel`, được gọi để dùng chức năng phụ: in một dòng. Trong version thứ hai, `zeroPad`, hàm này được gọi để sử dụng giá trị trả về của nó. Version thứ hai hữu ích hơn version thứ nhất trong nhiều tình huống. `Function` tạo ra và trả về các giá trị dễ dàng kết hợp và sử dụng theo những cách mới hơn so với các `function` được gọi để sử dụng các chức năng phụ.

Một `function` *thuần khiết* là một loại function cụ thể thuộc loại value-producing, nó không chỉ không có các chức năng phụ mà còn không dựa trên các chức năng phụ của các code khác. Ví dụ nó không đọc các biến `global`, các biến này đôi khi bị thay đổi bởi các code khác. Một chức năng thuần khiết có tính chất dễ chịu, khi được gọi với những đối số tương tự, nó luôn luôn trả về giá trị giống nhau (và không làm bất cứ điều gì khác). Khi bạn không chắc chắn rằng một chức năng thuần khiết làm việc một cách chính xác, bạn có thể kiểm tra nó bằng cách đơn giản là gọi nó, nếu nó hoạt động trong bối cảnh đó thì nó sẽ làm việc trong mọi hoàn cảnh. Các function không thuần khiết có thể trả về giá trị khác nhau.

Bài viêt của mình đến đây là hết hẹn gặp lại các bạn ở các phần tiếp theo. :D

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/JavaScript

https://eloquentjavascript.net/03_functions.html
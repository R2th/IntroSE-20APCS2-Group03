https://github.com/timoxley/functional-javascript-workshop
## Higher Order Functions

- `Higher-order function` là một hàm hoạt động trên các hàm khác, bằng cách lấy chúng làm tham số hoặc trả về chúng. Nói đơn giản là hàm nhận một hàm dưới dạng đối số hoặc trả về hàm dưới dạng đầu ra.

- Không giống như nhiều ngôn ngữ khác với các tính năng bắt buộc, JavaScript cho phép bạn sử dụng các `higher-order functions` hơn vì nó có [first-class function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function). Điều này có nghĩa là các hàm có thể được coi giống như bất kỳ giá trị nào khác trong JavaScript: giống như String hoặc Number, các giá trị của Function có thể được lưu trữ dưới dạng biến, thuộc tính trên đối tượng hoặc được truyền cho các hàm khác dưới dạng đối số. Các giá trị của hàm thực sự là các Object (kế thừa từ [Function.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)) nên bạn thậm chí có thể thêm thuộc tính và lưu trữ giá trị trên chúng, giống như bất kỳ Object thông thường nào.

- Sự khác biệt chính giữa Function và các loại giá trị khác trong JavaScript là cú pháp gọi (call syntax): nếu tham chiếu đến một hàm được theo sau bởi dấu ngoặc đơn và một số giá trị được phân tách bằng dấu phẩy tùy chọn: `someFunctionValue(arg1, arg2, etc)`, thì phần thân hàm sẽ được thực thi với các đối số được cung cấp (nếu có) .
- Chúng ta sẽ chứng minh rằng các hàm có thể được truyền dưới dạng giá trị bằng cách chuyển cho bạn một hàm dưới dạng đối số.

  - Ví dụ: Triển khai một hàm nhận một hàm đối số đầu tiên, một số `num` làm đối số thứ hai của nó, sau đó thực thi hàm được truyền trong `num` thời gian hàm.

  ```js
  function repeat(operation, num) {
    if (num <= 0){
    return;
    }
    operation();
    return repeat(operation, --num);
  }

  module.exports = repeat;

  // operation: Một hàm, không nhận đối số, không trả về giá trị
  // num: số lần gọi operation
  ```

## Basic: Map

- Phương thức [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) tạo một mảng mới được điền với các kết quả của việc gọi một hàm đã cho trên mọi phần tử trong mảng đang gọi.
- Mảng ban đầu sẽ không bị thay đổi và mảng được trả về có thể chứa các phần tử khác với mảng ban đầu.
- Map sử dụng một callback function làm tham số và các callback phải nhận một mục làm tham số và giá trị trả về sẽ là mục trong mảng mới tạo.

- Ví dụ 1: Chuyển đổi mã từ vòng lặp for thành `Array#map`

  - Using `for()`

  ```js
  function doubleAll(numbers) {
    var result = [];
    for (var i = 0; i < numbers.length; i++) {
      result.push(numbers[i] * 2);
    }
    return result;
  }

  module.exports = doubleAll;
  ```

  - Using `map()`

  ```js
  function doubleAll(numbers) {
    return numbers.map(function double(num) {
      return num * 2;
    });
  }
  module.exports = doubleAll;
  ```
  
- Ví dụ 2: Thêm một chuỗi vào cuối mỗi phần tử trong mảng 
  ```js
  const members = [ 'Taylor' , 'David', 'Donald' , 'Don' , 'Natasha' , 'Bobby' ] ;     

  // thêm chuỗi sau mỗi người tham gia cuối cùng
  const notification = members.map(member =>  {  
    return member + ' joined the contest.'; 
  } )

  console.log(notification);
  ```

## Basic: Filter

- Phương thức [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) tạo một mảng mới được lọc xuống chỉ các phần tử từ mảng đã cho thỏa mãn điều kiện được thực hiện bởi hàm được cung cấp.

- `filter()` không thực thi hàm cho các phần tử trống
- `filter()` không thay đổi giá trị của mảng ban đầu

- Ví dụ: Tạo một hàm `getShortMessages` nhận một mảng đối tượng có thuộc tính '`.message`' và trả về thông báo có độ dài dưới 50 ký tự.
  Hàm trả về một mảng chứa các thông báo mà không có đối tượng chứa của chúng.

  ```js
  function getShortMessages(messages) {
    return messages
      .map(function (item) {
        return item.message;
      })
      .filter(function (item) {
        return item.length <= 50;
      });
  }
  module.exports = getShortMessages;
  ```
- Ví dụ 2:
  ```js
  const randomNumbers = [ 4 , 11 , 42 , 14 , 39 ] ;

  // lọc các phần tử trong mảng có giá trị lớn hơn 5
  const filterArray = randomNumbers.filter( n => {    
    return n > 5 ; 
  });
  console.log(filterArray);
  ```

## Basic: Every Some

- Phương thức [every()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every) giúp kiểm tra xem tất cả các phần tử trong mảng có thỏa mãn một điều kiện nào đó hay không. Nó trả về một giá trị là `Boolean`. Nếu tất cả phần tử đều thỏa mãn thì trả về `true`, ngược lại chỉ cần một phần tử không thỏa mãn thì nó sõ trả về `false`

  - Ví dụ

  ```js
  const numbers = [6, 7, 8, 9];
  console.log(numbers.every((number) => number > 5)); // true

  const numbers = [1, 6, 7, 8, 9];
  console.log(numbers.every((number) => number > 5)); // false
  ```

- Phương thức [some()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some) lặp tất cả các phần tử trong một mảng và chỉ cần một phần tử thỏa mãn điều kiện thì mảng sẽ trả về `true`

  - Ví dụ

  ```js
  const numbers = [15, 2, 3, 4, 5];
  console.log(numbers.some((number) => number > 10)); // true

  const numbers = [1, 2, 3, 4, 5];
  console.log(numbers.some((number) => number > 10)); // false
  ```

- Ví dụ: Trả về một hàm lấy danh sách người dùng hợp lệ và trả về một hàm trả về true nếu tất cả người dùng được cung cấp tồn tại trong danh sách người dùng ban đầu. Bạn chỉ cần kiểm tra xem các id có khớp không. Sử dụng `Array#some` và `Array#every` để kiểm tra mọi người dùng được chuyển đến hàm trả về của bạn có tồn tại trong mảng được truyền cho hàm được xuất hay không.

  ```js
  function checkUsersValid(goodUsers) {
    return function allUsersValid(submittedUsers) {
      return submittedUsers.every(function (submittedUser) {
        return goodUsers.some(function (goodUser) {
          return goodUser.id === submittedUser.id;
        });
      });
    }
  }
  module.exports = checkUsersValid;
  ```

## Basic: Reduce

- Phương thức [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) thực thi một hàm gọi lại "reduce" do người cung cấp trên mỗi phần tử của mảng, theo thứ tự, chuyển giá trị trả về từ phép tính trên phần tử trước đó. Kết quả cuối cùng của việc chạy chương trình rút gọn trên tất cả các phần tử của mảng là một giá trị duy nhất.

- Ví dụ: Cho một Array gồm các String, sử dụng Array#reduce để tạo một đối tượng chứa số lần mỗi chuỗi xuất hiện trong mảng. Trả lại đối tượng trực tiếp (không cần console.log).

  ```js
  function countWords(arr) {
    return arr.reduce(function (countMap, word) {
      countMap[word] = ++countMap[word] || 1;
      return countMap;
    }, {});
  }

  module.exports = countWords;
  ```

- Ví dụ 2:

  ```js
  const arrayOfNumbers = [ 1 , 2 , 3 , 4, 5 ] ;    

  const sum = arrayOfNumbers.reduce(( accumulator, currentValue ) => {    
    return accumulator + currentValue ;
  });

  console.log(sum) ; // 15
  
  // Phương thức `.reduce()` sẽ tổng hợp tất cả các phần tử của mảng.
  // Nó nhận một hàm gọi lại với 2 tham số (`accumulator`, `currentValue`) làm đối số.
  // Trên mỗi lần lặp, `accumulator` là giá trị được trả về bởi lần lặp cuối cùng và `currentValue` là phần tử hiện tại.
  ```
## Basic: Recursion

- `Recursion` là một khái niệm lập trình cơ bản có thể dẫn đến các giải pháp thanh lịch và hiệu quả cho các vấn đề thuật toán. Trong thực tế, `recursion` rất mạnh mẽ, tất cả các hành vi lặp lại có thể được xác định bằng cách sử dụng các `array recursion`. Bạn sẽ thấy `recursion` không thể thiếu khi lặp qua các cấu trúc dữ liệu lồng nhau.

- `Function recursion` là một hàm gọi chính nó. Ví dụ, hàm đệ quy này sẽ nhận một mảng các từ và trả về một mảng các từ đó, được viết hoa.

  ```js
  function toUpperArray(items) {
    if (!items.length) return []; // điều kiện kết thúc
    var head = items[0]; // item để vận hành
    head = head.toUpperCase(); // thực hiện hành động
    var tail = items.slice(1); // tiếp theo
    return [head].concat(toUpperArray(tail)); // bước đệ quy
  }

  toUpperArray(["hello", "world"]); // => ['HELLO', 'WORLD']
  ```

- Mục đích của bài tập này là làm quen với đệ quy bằng cách triển khai một giao diện quen thuộc sử dụng một hàm đệ quy.

## Basic: Call

- Phương thức [call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) gọi hàm với một giá trị `this` đã cho và các đối số được cung cấp riêng lẻ.

  ```js
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  ```

- `Pototype` là cơ chế để thực hiện mô hình OOP của Javascript, mà các object được kế thừa các tính năng như nhau. Mỗi một object trong Javascript đều có một thuộc tính nội bộ (internal property) gọi là prototype.

  ```js
  var objCreated = Object.create({ quack: true });
  var objCreatedSlash = { quack: true };
  var object = Object.create(null);
  object.quack = function () {
    console.log("quack");
  }
  console.log(Object.getPrototypeOf(object) === Object.prototype); // => false
  console.log(Object.getPrototypeOf(object) === null); // => true
  console.log(Object.prototype.hasOwnProperty.call(object, "quack")); // => true
  //check objCreated
  console.log(Object.prototype.hasOwnProperty.call(objCreated, "quack")); // => false
  //check objCreatedSlash
  console.log(Object.prototype.hasOwnProperty.call(objCreatedSlash, "quack")); // => true
  ```

- Sự khác biệt giữa 2 cách khởi tạo đối tượng

  - `Object.create()` là phương thức tạo một đối tượng mới, sử dụng một đối tượng có sẵn để làm nguyên mẫu của đối tượng mới được tạo.
  - `{}` Cũng là phương thức tạo một đối tượng mới, sử dụng ngắn gọn và nhanh hơn.

- Trong Javascript, để viết các trương trình mạnh, đôi khi chúng ta cần kiểm tra một đối tượng có phù hợp với kiểu mà chúng ta cần hay không thì chúng ta cso thể sử dụng [Object#hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) để phát hiện một đối tượng có một thuộc tính được xác định trên chính nó, có nghĩa là không được kế thừa từ nguyên mẫu của nó.
- `hasOwnProperty` trong Javascript là một phương thức trong Object, có tác dụng kiểu tra một thuộc tính có tồn tại trong Object hay không. Nếu thuộc tính chỉ định tồn tại trong object chỉ định thì nó sẽ được trả về `true`. Nếu không tồn tại thì sẽ trả về giá trị `fale.

- Ví dụ: Viết một hàm duckCount trả về số lượng đối số được truyền cho nó có thuộc tính 'quack' được xác định trực tiếp trên chúng. Không khớp với các giá trị được kế thừa từ nguyên mẫu.

  ```js
  function duckCount() {
    return Array.prototype.slice.call(arguments).filter(function (obj) {
      return Object.prototype.hasOwnProperty.call(obj, "quack");
    }).length;
  }

  module.exports = duckCount;
  ```

## Partial Application without Bind

- `Partial application` cho phép bạn tạo các hàm mới từ các hàm hiện có, đồng thời có thể sửa một số đối số. Sau khi thiết lập các đối số được áp dụng một phần , bạn sẽ có một hàm mới sẵn sàng nhân phần còn lại của các đối số và có thể thực thi hàm ban đầu.
- Chính thức hơn: Partial application để cập đến quá trình sửa một đối số cho một hàm và tạo ra một hàm khác có độ hiếm nhỏ hơn
- [apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) là phương thức gọi hàm được chỉ định với một giá trị `this` nhất định và `arguments` được cung cấp dưới dạng một mảng (hoặc một `array-like object`).
- Ví dụ: Chúng ta có một hàm `add` nhận 2 đối số và cộng chúng lại với nhau

  ```js
  function add(x, y) {
    return x + y;
  }

  add(10, 20); // => 30
  ```

- Bây giờ chúng ta sử dụng `partiallyApply` nhận một hàm và một đối số để 'Partial application'.

  - 'partial application' tham số đầu tiên của hàm `add` là `x`

  ```js
  var addTen = partiallyApply(add, 10); // fix `x` to 10

  // addTen là một hàm mới nhận y tham số là add, add vẫn được gọi
  ```

  - Khi chúng ta truyền đối số cho `y` thì ta có thể thực thi hàm ban đầu `add`

  ```js
  addTen(20); // => 30
  addTen(100); // => 110
  addTen(0); // => 10
  // etc
  ```

## Partial Application with Bind

- Phương thức [bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) là một hàm Javascript nguyên bản giúp chúng ta đạt được cả ứng dụng từng phần và trình duyệt. Nó đảm bảo hàm được gọi từ một `this` ngữ cảnh củ thể, với `n` đối số được cho trước.

- Ví dụ: Sử dụng `Function#bind` để triển khai một logging function cho phép bạn thông báo namespace. Bạn phải lấy một string namespace và trả về một function in thông báo tới bảng điều khiển với namespace được thêm vào trước. Đảm bảo tất cả các đối số được truyền cho hàm ghi được trả về đều được in.

  ```js
  module.exports = function (namespace) {
    return console.log.bind(console, namespace);
  }
  ```

## Implement Map with Reduce

- Một function `map` áp dụng một chức năng cho từng mục trong một mảng và thu thập các kết quả trong một Mảng mới.

  ```js
  var nums = [1, 2, 3, 4, 5];

  // `map` is your exported function
  var output = map(nums, function double(item) {
    return item * 2;
  });

  console.log(output); // => [2,4,6,8,10]
  ```

- Ví dụ: Sử dụng [Array#Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) để triển khai mộ phiên bản đơn giản của Array#map

  ```js
  module.exports = function arrayMap(arr, fn, thisArg) {
    return arr.reduce(function (acc, item, index, arr) {
      acc.push(fn.call(thisArg, item, index, arr));
      return acc;
    }, []);
  }
  ```

## Function Spies

- `Spies` cho phép bạn giám sát một chức năng, chúng hiển thị các tùy chọn để theo dõi số lượng lệnh gọi, đối số và giá trị trả về. Điều này cho phép bạn viết các bài kiểm tra để xác minh hành vi của chức năng.

- Ví dụ: Ghi đè một phương thức được chỉ định của một đối tượng có chức năng mới trong khi vẫn duy trì tất cả các hành vi cũ.

  ```js
  function Spy(target, method) {
    var originalFunction = target[method];

    // sử dụng một đối tượng để chúng ta có thể chuyển bằng tham chiếu, không phải giá trị
    // tức là chúng ta có thể trả về kết quả, nhưng số lượng cập nhật từ phạm vi này
    var result = {
      count: 0,
    }

    // thay thế phương thức bằng phương thức gián điệp
    target[method] = function () {
      result.count++; // hàm theo dõi đã được gọi
      return originalFunction.apply(this, arguments); // gọi hàm ban đầu
    }
    return result;
  }
  module.exports = Spy;
  // taget: một đối tượng chứa phương thức method
  ```

## Blocking Event Loop

- Ví dụ: Sửa đổi hàm đệ quy `repeat` được cung cấp trong bảng soạn sẵn, sao cho nó không chặn vòng lặp sự kiện (tức là bộ định thời gian và bộ xử lý IO có thể kích hoạt). Điều này nhất thiết yêu cầu lặp lại không đồng bộ.
- Thời gian chờ được xếp hàng đợi để kích hoạt sau 100 mili giây, sẽ in kết quả của bài kiểm tra và thoát khỏi quá trình. `repeat` nên giải phóng quyền kiểm soát của vòng lặp sự kiện để cho phép hết thời gian chờ để ngắt trước khi tất cả các hoạt động hoàn tất.

- Cố gắng thực hiện nhiều thao tác nhất có thể trước khi hết thời gian chờ!

  ```js
  function repeat(operation, num) {
    if (num <= 0) return;
    operation();

    // release control every 10 or so
    // iterations.
    // 10 is arbitrary.
    if (num % 10 === 0) {
      setTimeout(function () {
        repeat(operation, --num);
      });
    } else {
      repeat(operation, --num);
    }
  }

  module.exports = repeat;
  ```

## Trampoline

- Là một đoạn mã nhỏ được xây dựng nhanh chóng trên ngăn xếp khi địa chỉ của một hàm lồng nhau được lấy.
- Ví dụ: Sửa đội bảng điều khiển bên dưới sử dụng `trampoline` để gọi liên tục chính nó một cách đồng bộ.
  Bạn có thể giả định rằng thao tác được truyền để lặp lại không nhận đối số (hoặc chúng đã được ràng buộc với hàm) và giá trị trả về không quan trọng.

  ```js
  function repeat(operation, num) {
    return function () {
      if (num <= 0) return;
      operation();
      return repeat(operation, --num);
    }
  }

  function trampoline(fn) {
    while (fn && typeof fn === "function") {
      fn = fn();
    }
  }

  module.exports = function (operation, num) {
    trampoline(function () {
      return repeat(operation, num);
    });
  };
  ```

## Async Loops

- Ví dụ: Sửa đoạn mã, callback phải được gọi với tất cả người dùng đã tải. Thứ tự của users phải khớp với thứ tự của id users được cung cấp.

  ```js
  function loadUsers(userIds, load, done) {
    var users = [];
    for (var i = 0; i < userIds.length; i++) {
      users.push(load(userIds[i]));
    }
    return users;
  }

  module.exports = loadUsers;

  // userIds: Mảng gồm id người dùng dạng số
  // load: Chức năng sử dụng để tải các đối tượng người dùng
  // done: Hàm yêu cầu một Mảng các đối tượng người dùng (như đươc truy xuất từ `load`).
  ```

  - Sửa

  ```js
  function loadUsers(userIds, load, done) {
    var completed = 0;
    var users = [];
    userIds.forEach(function (id, index) {
      load(id, function (user) {
        users[index] = user;
        if (++completed === userIds.length) return done(users);
      });
    });
  }

  module.exports = loadUsers;
  ```

## Recursion

- Ví dụ: Triển khai một recursive function trả về các phụ thuộc dun nhất và phụ thuộc con của mô-đun được sắp xết theo thứ tự bảng chữ cái. Các phần phụ thộc được in dưới dạng phiên bản phủ thuộc.

- Nhiều phiên bản của cùng một mô-đun được phép, nhưng các mô-đun trùng lặp của cùng một phiên bản phải được loại bỏ.

  ```js
  function getDependencies(mod, result) {
    result = result || [];
    var dependencies = (mod && mod.dependencies) || [];
    Object.keys(dependencies).forEach(function (dep) {
      var key = dep + "@" + mod.dependencies[dep].version;
      if (result.indexOf(key) === -1) result.push(key);
      getDependencies(mod.dependencies[dep], result);
    });
    return result.sort();
  }

  module.exports = getDependencies;
  ```

## Currying

- `Currying` là một kỹ thuật nâng cao để làm việc với các chức năng, làm đơn giản hóa một hàm bằng cách chuyển đổi hàm của nhiều đối số thành một số hàm của một đối số duy nhất theo trình tự. Nó không chỉ được sử dụng trong Javascript mà còn được sử dụng trong các ngôn ngữ khác.

- Ví dụ: Tạo một hàm 'curryN' cho một số lượng đối số tùy ý, curryN sẽ nhận hai tham số

  - fn: Hàm chúng ta muốn cài đặt

  - n: Số lượng đối số tùy chọn cho curry. Nếu không được cung cấp, 'curryN' nên sử dụng fn's arity làm giá trị cho 'n'.

  ```js
  function curryN(fn, n) {
    n = n || fn.length;
    return function curriedN(arg) {
      if (n <= 1) return fn(arg);
      return curryN(fn.bind(this, arg), n - 1);
    }
  }

  module.exports = curryN;
  ```

## Function Call

- Ví dụ: Viết một hàm cho phép bạn sử dụng [Array.ptototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) mà không cần sử dụng slice.call hoặc slice.apply để gọi nó.

  ```js
  // Giải thích:
  // Giá trị của `this` trong Function.call là hàm
  // điều đó sẽ được thực thi.

  // bind trả về một hàm mới với giá trị là `this` đã được sửa
  // cho bất cứ thứ gì đã được truyền làm đối số đầu tiên của nó.

  // Mọi hàm 'kế thừa' từ Function.prototype,
  // do đó mọi hàm, bao gồm cả lệnh gọi, áp dụng và ràng buộc
  // có các phương thức gọi áp dụng và ràng buộc.

  // Function.prototype.call === Function.call
  module.exports = Function.call.bind(Array.prototype.slice);
  ```
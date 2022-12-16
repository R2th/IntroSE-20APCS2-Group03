* JavaScript mang lại sự linh hoạt đặc biệt khi xử lý các hàm. Chúng có thể được chuyển đi xung quanh, được sử dụng như các đối tượng và bây giờ chúng ta sẽ xem cách chuyển tiếp (*forwarding*) cuộc gọi giữa chúng và trang trí (*decorate*) chúng.
# Transparent caching
* Giả sử chúng ta có một hàm **slow(x)** làm nặng CPU, nhưng kết quả của nó ổn định. Nói cách khác, đối với cùng một giá trị x, nó luôn trả về cùng một kết quả.
* Nếu hàm được gọi thường xuyên, chúng ta có thể muốn lưu vào bộ nhớ cache (ghi nhớ) kết quả để tránh tốn thêm thời gian cho việc tính toán lại.
* Nhưng thay vì thêm chức năng đó vào, slow()chúng ta sẽ tạo một hàm wrapper, hàm này sẽ thêm vào bộ nhớ đệm. Như chúng ta sẽ thấy, có rất nhiều lợi ích khi làm như vậy.
* Code và được giải thích như sau:
```
function slow(x) {
  // Điều này có thể đòi hỏi nhiều CPU
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // check key x trong cache
      return cache.get(x); // đọc giá trị cache
    }

    let result = func(x);  // nếu không gọi func(x)

    cache.set(x, result);  // set cache cho result
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) đã được lưu cache và trả về kết quả
alert( "Again: " + slow(1) ); // slow(1) lấy kết quả từ cache

alert( slow(2) ); // slow(2) đã được lưu cache và trả về kết quả
alert( "Again: " + slow(2) ); // slow(2) lấy kết quả từ cache
```
* Trong đoạn mã trên **cachingDecorator** là decorator : một hàm đặc biệt lấy một hàm khác và thay đổi hành vi của nó. Ý tưởng là chúng ta có thể gọi **cachingDecorator** bất kỳ hàm nào và nó sẽ trả về trình bao bọc bộ nhớ đệm. Điều đó thật tuyệt, bởi vì chúng ta có thể có nhiều chức năng có thể sử dụng một tính năng như vậy và tất cả những gì chúng ta cần làm là áp dụng **cachingDecorator** cho chúng.
* Bằng cách tách bộ nhớ đệm khỏi mã chức năng chính, chúng ta cũng giữ cho mã chính đơn giản hơn.
* Kết quả của **cachingDecorator(func)** là một "wrapper": **function(x)** "bao bọc" lệnh gọi **func(x)** thành logic bộ nhớ đệm:
![](https://images.viblo.asia/aafc097c-f1c2-40fb-a92c-ce036fb7485e.png)

* Từ một mã bên ngoài, function được bọc **slow** vẫn hoạt động tương tự. Nó chỉ có một khía cạnh bộ nhớ đệm được thêm vào hành vi của nó.
* Tóm lại, có một số lợi ích của việc sử dụng một mã riêng **cachingDecorator** thay vì thay đổi code của chính **slow** :
    * *cachingDecorator* có thể tái sử dụng. Chúng ta có thể áp dụng nó cho nhiều hàm khác.
    * Logic bộ nhớ đệm là riêng biệt, nó không làm tăng độ phức tạp của **slow**.
    * Chúng ta có thể kết hợp nhiều decorator nếu cần (các decorator khác sẽ làm theo).
# Sử dụng "func.call"cho ngữ cảnh
* Hàm caching decorator được đề cập ở trên không phù hợp để làm việc với các phương thức đối tượng.
* Ví dụ: trong đoạn mã dưới đây worker.slow()ngừng hoạt động sau khi trang trí:
```
// chúng ta sẽ lưu bộ nhớ đệm cho worker.slow
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // có thể tốn tài nguyên CPU
    alert("Called with " + x);
    return x * this.someMethod(); // (7)
  }
};

// code như ở trên
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (15)
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // hàm nguyên mẫu hoạt động

worker.slow = cachingDecorator(worker.slow); // bây giờ lưu vào bộ nhớ đệm

alert( worker.slow(2) ); // lỗi vì không thể gọi someMethod phương thức
```
* Lỗi xảy ra ở dòng (7) cố gắng truy cập this.someMethod và không thành công. Bạn có thể thấy tại sao không?
* Lý do là trình bao bọc gọi hàm gốc như func(x) trong dòng (15). Và, khi được gọi như vậy, hàm sẽ nhận được **this = undefined**.
* Nếu chúng ta gọi theo cách sau thì cũng sẽ nhận được lỗi tương tự:
```
let func = worker.slow;
func(2);
```
* Vì vậy, trình bao bọc chuyển cuộc gọi đến phương thức ban đầu, nhưng không có ngữ cảnh **this**. Do đó lỗi. Hãy tìm cách khắc phục nó.
* Có một phương thức hàm tích hợp đặc biệt **func.call (context,… args)** cho phép gọi một hàm một cách rõ ràng thông qua **this**. Cú pháp là:
```
func.call(context, arg1, arg2, ...)
```
* Nó chạy **func** cung cấp đối số đầu tiên là **this** và đối số tiếp theo là các đối số.
* Nói một cách đơn giản, hai lệnh gọi này gần như giống nhau:
```
func(1, 2, 3);
func.call(obj, 1, 2, 3)
``` 
* Cả hai đều gọi **func** với đối số 1, 2 và 3. Sự khác biệt duy nhất là **func.call** cũng được đặt **this** thành **obj**. Ví dụ, trong đoạn mã dưới đây, chúng ta gọi **sayHi** trong ngữ cảnh của các đối tượng khác nhau: **sayHi.call(user)** chạy **sayHi** cung cấp **this=user** và dòng tiếp theo đặt **this=admin**:
```
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// sử dụng call để gọi cho các đối tượng khác nhau thông qua "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```
* Và ở đây chúng ta sử dụng **call** để gọi **say** với ngữ cảnh và cụm từ đã cho:
```
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user trở thành đối tượng với this, và Hello trở thành đối sổ đầu tiên
say.call( user, "Hello" ); // John: Hello
```
* Trong trường hợp của chúng ta, chúng ta có thể sử dụng calltrong trình bao bọc để chuyển ngữ cảnh đến hàm ban đầu:
```
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // "this" được truyền trực tiếp ở đây
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // bây giờ nó đã được lưu cache

alert( worker.slow(2) ); // hoạt động
alert( worker.slow(2) ); // hoạt động, nhưng không gọi hàm gốc (cached)
```
* Bây giờ mọi thứ đều ổn. Để làm rõ tất cả, chúng ta hãy xem sâu hơn về cách thức **this** trôi qua:
1. Sau phần decoration **worker.slow** bây giờ là phần đóng gói **function (x) { ... }**.
2. Vì vậy, khi **worker.slow(2)** được thực thi, trình bao bọc sẽ nhận được 2  như một đối số và **this=worker** (nó là đối tượng trước dấu chấm).
3. Bên trong trình bao bọc, giả sử kết quả chưa được lưu vào bộ nhớ cache, **func.call(this, x)** chuyển đối số current **this (=worker)** và curent (=2) vào phương thức ban đầu.
# Truyền nhiều đối số
* Bây giờ chúng ta hãy làm cho **cachingDecorator** phổ quát hơn nữa. Cho đến bây giờ nó chỉ hoạt động với các hàm một đối số. Bây giờ làm cách nào để cache **worker.slow** phương thức đa đối số ?
```
let worker = {
  slow(min, max) {
    return min + max; // tốn tài nguyên CPU
  }
};

// vẫn gọi với cùng đối số truyền vào
worker.slow = cachingDecorator(worker.slow);
```
* Trước đây, đối với một đối số duy nhất x chúng ta chỉ có thể **cache.set(x, result)** lưu kết quả và **cache.get(x)** truy xuất nó. Nhưng bây giờ chúng ta cần nhớ kết quả cho sự kết hợp của các đối số **(min,max)** . Hàm **Map** chỉ nhận một giá trị duy nhất làm khóa. Có nhiều giải pháp khả thi:
1. Triển khai cấu trúc dữ liệu giống new-map (hoặc sử dụng bên thứ ba) linh hoạt hơn và cho phép nhiều khóa.
2. Sử dụng nested map **cache.set(min)** sẽ là nơi Map lưu trữ cặp **(max, result)**. Vì vậy, chúng ta có thể nhận được **result** như **cache.get(min).get(max)**.
3. Nối hai giá trị thành một. Trong trường hợp cụ thể của chúng ta, chúng ta chỉ có thể sử dụng một chuỗi "min,max" làm khóa Map. Để linh hoạt, chúng ta có thể cho phép cung cấp một hàm băm cho decorator, hàm này biết cách tạo một giá trị từ nhiều giá trị. Đối với nhiều ứng dụng thực tế, cách thứ 3 đủ tốt, vì vậy chúng ta sẽ bám sát vào nó.
* Ngoài ra, chúng ta cần chuyển không chỉ x, mà tất cả các đối số vào **func.call**. Hãy nhớ lại rằng trong một, **function()** chúng ta có thể nhận được một mảng các đối số của nó là **arguments**, vì vậy **func.call(this, x)** nên được thay thế bằng **func.call(this, ...arguments)**. Đây là một thay đổi khác của hàm **cachingDecorator**:
```
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (10)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (15)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // hoạt động
alert( "Again " + worker.slow(3, 5) ); // lấy từ bộ nhớ đệm (cached)
```
* Bây giờ nó hoạt động với bất kỳ số lượng đối số nào (mặc dù hàm băm cũng sẽ cần được điều chỉnh để cho phép bất kỳ số lượng đối số nào. Một cách thú vị để xử lý điều này sẽ được đề cập bên dưới).
* Có hai thay đổi:
    * Trong dòng (10), nó gọi hash để tạo một khóa duy nhất từ **arguments**. Ở đây chúng ta sử dụng một hàm “nối” đơn giản để biến các đối số **(3, 5)** thành khóa "3,5". Các trường hợp phức tạp hơn có thể yêu cầu các hàm băm khác.
    * Sau đó, (15) sử dụng **func.call(this, ...arguments)** để chuyển cả ngữ cảnh và tất cả các đối số mà trình bao bọc nhận được (không chỉ đối số đầu tiên) cho hàm ban đầu.
# Func.apply
* Thay vì **func.call(this, ...arguments)** chúng ta có thể sử dụng **func.apply(this, arguments)**. Cú pháp là:
```
func.apply(context, args)
```
* Nó chạy **func** cài đặt **this=context** và sử dụng một đối tượng giống mảng **args** làm danh sách các đối số. Sự khác biệt cú pháp duy nhất giữa **call** và **apply** là **call** mong muốn đối số truyền vào là một danh sách, trong khi **apply** lấy một đối tượng mảng làm đối số. Vì vậy, hai cách gọi này gần như tương đương:
```
func.call(context, ...args);
func.apply(context, args);
```
* Chúng thực hiện cùng một lệnh gọi **func** với ngữ cảnh và đối số đã cho. Chỉ có một sự khác biệt nhỏ về **args**:
    * Spread syntax ... cho phép truyền **args** thuần túy dưới dạng **list**.
    * Hàm **apply** chỉ chấp nhận **args** như dạng mảng.
... Và đối với các đối tượng vừa có thể lặp lại vừa giống mảng, chẳng hạn như mảng thực, chúng ta có thể sử dụng bất kỳ đối tượng nào trong số chúng, nhưng **apply** có lẽ sẽ nhanh hơn, vì hầu hết các công cụ **JavaScript** bên trong tối ưu hóa nó tốt hơn. Chuyển tất cả các đối số cùng với ngữ cảnh sang một hàm khác được gọi là forwarding (chuyển tiếp). Dạng đơn giản nhất của apply:
```
let wrapper = function() {
  return func.apply(this, arguments);
};
```
* Khi một dòng code bên ngoài gọi hàm **wrapper** như vậy, nó không khác biệt với việc gọi **call** của hàm gốc **func**.
# Phương pháp vay mượn
* Bây giờ chúng ta hãy thực hiện một cải tiến nhỏ nữa trong hàm băm:
```
function hash(args) {
  return args[0] + ',' + args[1];
}
```
* Hiện tại, nó chỉ hoạt động trên hai đối số. Sẽ tốt hơn nếu nó có thể hoạt động với nhiều đối số khác của **args**.
```
function hash(args) {
  return args.join();
}
```
... Thật không may, điều đó sẽ không hoạt động. Bởi vì chúng ta đang gọi **hash(arguments)** và đối số **arguments** vừa có thể lặp lại vừa giống như mảng, nhưng không phải lúc nào cũng là một mảng thuần túy. Vì vậy, việc gọi joinnó sẽ không thành công, như chúng ta có thể thấy bên dưới:
```
function hash() {
  alert( arguments.join() ); // Error: arguments.join không phải là một function
}

hash(1, 2);
```
* Tuy nhiên, có một cách dễ dàng để sử dụng phép nối mảng:
```
function hash() {
  alert( [].join.call(arguments) ); // 1,2
}

hash(1, 2);
```
* Phương pháp này được gọi là phương pháp mượn .
* Chúng ta lấy (mượn) một phương thức nối từ một mảng ( [].join) thông thường và sử dụng ([].join.call) để chạy nó trong ngữ cảnh của **arguments**.
* Vây tại sao nó hoạt động?
* Đó là bởi vì thuật toán bên trong của phương thức gốc **arr.join(glue)** rất đơn giản.
1. Hãy lấy **glue** là đối số đầu tiên hoặc nếu không có đối số thì là dấu phẩy **","**.
2. Hãy để **result** là một chuỗi rỗng.
3. Thêm **this[0]** vào **result**.
4. Nối **glue** và **this[1]**.
5. Nối **glue** và **this[2]**.
6. Làm như vậy cho đến khi **this.length = glue.length**.
7. Trả về **result**.
* Vì vậy, về mặt kỹ thuật, nó cần this và kết hợp this[0], this[1]…  với nhau. Nó được viết có chủ ý theo cách cho phép bất kỳ kiểu mảng nào (không phải là sự trùng hợp ngẫu nhiên, nhiều phương pháp tuân theo thực tiễn này). Đó là lý do tại sao nó cũng hoạt động với **this=arguments**.
# Decorators và thuộc tính hàm
* Thật hợp lý để thay thế một chức năng hoặc một phương pháp chỉ với một lời gọi hàm decorator, ngoại trừ một điều nhỏ. Nếu chức năng ban đầu có các thuộc tính trên nó, giống như **func.calledCount** hoặc bất cứ điều gì, thì chức năng được decorator sẽ không cung cấp chúng. Bởi vì nó được bọc trong một **wrapper**. Vì vậy, người ta cần phải cẩn thận nếu một người sử dụng chúng.
* Ví dụ: trong ví dụ trên nếu hàm **slow** có bất kỳ thuộc tính nào trên đó, thì đó **cachingDecorator(slow)** là một trình bao bọc không có chúng nên không thể gọi.
# Tổng kết
* **Decorator** là một trình bao bọc xung quanh một hàm làm thay đổi hành vi của nó. Công việc chính vẫn do **func** được gọi thực hiện.
* **Decorator** có thể được coi là "tính năng" hoặc "khía cạnh" có thể được thêm vào một chức năng. Chúng ta có thể thêm một hoặc thêm nhiều. Và tất cả điều này mà không cần thay đổi mã của nó!
* Để thực hiện **cachingDecorator**, chúng ta đã nghiên cứu các phương pháp:
    * **func.call(context, arg1, arg2…)** - các lệnh gọi **func** với ngữ cảnh và đối số đã cho.
    * **func.apply(context, args)** - các lệnh gọi **func** chuyển **context** dạng **this** và dạng mảng **args** vào danh sách các đối số.
* Forwarding có thể được gọi thông qua method apply như sau:
```
let wrapper = function() {
  return original.apply(this, arguments);
};
``` 
* Chúng ta cũng đã thấy một ví dụ về việc mượn phương thức khi chúng ta lấy một phương thức từ một đối tượng và gọi nó trong ngữ cảnh của một đối tượng khác. Việc sử dụng các phương thức mảng và áp dụng chúng là khá phổ biến khi **arguments** không đơn thuần là đối tượng mảng.
* Nguồn tham khảo: [https://javascript.info/call-apply-decorators](https://javascript.info/call-apply-decorators)
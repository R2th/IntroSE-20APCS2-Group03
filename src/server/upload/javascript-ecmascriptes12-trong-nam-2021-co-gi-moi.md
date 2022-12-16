![image.png](https://images.viblo.asia/240f0bc6-092f-415b-bc80-4e78dbf37592.png)

# Lời mở đầu
ECMAScript hay gọi tắt là ES là một chuẩn hóa của các ngôn ngữ client side cho Jscript hay còn được coi là một tập hợp các kỹ thuật nâng cao của Javascript. Đối với bản thân mình thì hiện tại mình sử dụng ES6 là nhiều. Tuy nhiên, theo như bản phát hành mới nhất thì hiện tại đang là ES12 và theo một số thông tin mình mới tìm hiểu được, trong năm 2021 thì ES12 sẽ có một số tính năng mới. Và trong bài viết này mình xin được đặt bút viết về các tính năng mới này, những tính năng này có thể không mới với mọi người tuy nhiên thì với mình nó là mới nhất và xu hướng trong tương lai thì mình rất quan tâm. Hãy cùng xem những điều mới mẻ này nhé, let's go thôi!!!

# 1. replaceAll
Một chức năng mới đã được thêm vào **String prototype**. Trước khi có bổ sung này, không thể thay thế tất cả các instance của một substring mà không sử dụng regex.

Trước ES12 có thể sử dụng method **replace()** để thay thế một chuỗi bằng một chuỗi khác như sau

```javascript
const str = "Backbencher sits at the Back";
const newStr = str.replace("Back", "Front");
console.log(newStr); // "Frontbencher sits at the Back"
```

Nếu input là một chuỗi, **replace()** chỉ thay thế lần xuất hiện đầu tiên. Đó là lý do tại sao trong code, lần xuất hiện thứ hai của "Back" không được thay thế. Và để xử lý được trường hợp này, chúng ta cần sử dụng Regex

```javascript
const str = "Backbencher sits at the Back";
const newStr = str.replace(/Back/g, "Front");
console.log(newStr); // "Frontbencher sits at the Front"
```

Đối với ES12, ta có **String.prototype.replaceAll()** để xử lý trường hợp thay thế toàn bộ string như sau

```javascript
const str = "Backbencher sits at the Back";
const newStr = str.replaceAll("Back", "Front");
console.log(newStr); // "Frontbencher sits at the Front"
```


Điều gì xảy ra nếu đối số tìm kiếm là một chuỗi rỗng? Nó sẽ trả về giá trị được thay thế giữa mọi đơn vị mã UCS-2 / UTF-16.

```javascript
'x'.replace (' ',' _ '); 
// '_x'
'xxx'.replace (/ (?:) / g,' _ '); 
// '_x_x_x_'
'xxx'.replaceAll (' ',' _ '); 
// '_x_x_x_'
```

Như vậy, nếu trong tình huống phải xử lý thay thế toàn bộ mà không chắc chắn về Regex thì ES12 có thể giúp bạn làm tốt hơn với replaceAll.

# 2. Promise.any
Method Promise.any là một tiện ích hữu ích coi một đối số là một promise có thể lặp lại. Khi bất kỳ điều nào trong số đó được đáp ứng, nó sẽ kích hoạt method Promise.any() gọi lại tham số hoặc trả về response. Nó phụ thuộc vào việc có đang sử dụng **async/await** hay không.

Nếu tất cả các Promise không thành công, phương thức sẽ ném một **AggregateError** kết hợp tất cả các lỗi Promise khác. Nó sẽ là một ví dụ của Error và sẽ nhận được **stack trace**. Và thật tốt khi có thông tin đó trong trường hợp cần thiết.

Ở ví dụ dưới đây, sẽ có 3 promise như sau

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("A"), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("B"), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("C"), Math.floor(Math.random() * 1000));
});
```

Kết quả p1, p2 và p3  tùy theo quyết đầu tiên được thực hiện bởi Promise.any()

```javascript
(async function() {
  const result = await Promise.any([p1, p2, p3]);
  console.log(result); // Prints "A", "B" or "C"
})();
```

Trong trường hợp đó Promise.any() ném một AggregateErrorngoại lệ. Chúng ta cần nắm bắt và xử lý nó như sau:

```javascript
const p = new Promise((resolve, reject) => reject());

try {
  (async function() {
    const result = await Promise.any([p]);
    console.log(result);
  })();
} catch(error) {
  console.log(error.errors);
}
```

![image.png](https://images.viblo.asia/80f3b053-bf4b-4c24-988e-655829e790bb.png)

# 3. WeakRefs
WeakReflà viết tắt của Weak References. Việc sử dụng chính của **weak references** là triển khai bộ nhớ đệm hoặc ánh xạ tới các đối tượng lớn. Trong những tình huống như vậy, nếu không muốn giữ nhiều bộ nhớ trong một thời gian dài để lưu bộ nhớ cache hoặc ánh xạ hiếm khi được sử dụng này thì có thể cho phép bộ nhớ được **garbage collected** (garbage collected là theo dõi việc cấp phát và sử dụng bộ nhớ để xác định khi một phần bộ nhớ đã được cấp phát không được sử dụng trong mọi trường hợp nữa, nó sẽ tự động giải phóng nó) và có thể tạo bộ nhớ cache mới.

Trong JavaScript, nếu một biến không thể truy cập được nữa, JavaScript sẽ tự động xóa nó.

```javascript
const callback = () => {
  const aBigObj = {
    name: "Backbencher"
  };
  console.log(aBigObj);
}

(async function(){
  await new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 2000);
  });
})();
```

Code có thể trông phức tạp. Nhưng về cơ bản, những gì đã làm là tạo một hàm được đặt tên** callback()** và thực thi nó bằng cách sử dụng **setTimeout(**). **async** chỉ để sử dụng cùng **await** (**async/await** là một tính năng trong ES6, giúp thực thi code không đồng bộ một cách đồng bộ).

Khi thực thi đoạn code trên, nó sẽ in ra "Backbencher" sau 2 giây. Dựa trên cách sử dụng hàm callback(), biến aBigObj có thể được lưu trữ trong bộ nhớ mãi mãi.

Bây giờ, hãy để làm cho aBigObj trở thành **weak reference**.

```javascript
const callback = () => {
  const aBigObj = new WeakRef({
    name: "Backbencher"
  });
  console.log(aBigObj.deref().name);
}

(async function(){
  await new Promise((resolve) => {
    setTimeout(() => {
      callback(); // Guaranteed to print "Backbencher"
      resolve();
    }, 2000);
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      callback(); // No Gaurantee that "Backbencher" is printed
      resolve();
    }, 5000);
  });
})();
```

Một **WeakRef** được tạo bằng cách sử dụng `new WeakRef()`. Sau đó, nó được đọc băng method **deref()**. Bên trong function **async** , đầu tiên thực hiện setTimeout() thì chắc chắn sẽ in giá trị của name. Điều đó được đảm bảo trong lượt đầu tiên của vòng lặp sự kiện sau khi tạo **WeakRef**.

Nhưng không có gì đảm bảo trong function setTimeout() thực thi lần thứ hai. Nó có thể đã bị **garbage collected** (garbage collected là theo dõi việc cấp phát và sử dụng bộ nhớ để xác định khi một phần bộ nhớ đã được cấp phát không được sử dụng trong mọi trường hợp nữa, nó sẽ tự động giải phóng nó). Đó cũng là lý do tại sao nên sử dụng WeakRef trong các tình huống như quản lý bộ nhớ cache.

WeakRef chỉ có thể lấy một đối tượng làm đối số.

```javascript
function Foo() {}
// strong reference to a Foo instance
const x = new Foo();
// weak reference to the Foo's instance
const xWeak = new WeakRef(x);
```

# 5. Finalizers
Finalizers là một tính năng khác của ES12 trong vùng bộ nhớ. Những gì tính năng này làm là cho biết khi một đối tượng đã được **garbage collected** thông qua một lệnh gọi lại JavaScript.
FinalizationRegistry là một tính năng đồng hành của WeakRef

```javascript
const registry = new FinalizationRegistry((value) => {
  console.log(value);
});
```

Biến **registry** là một ví dụ của FinalizationRegistry. Hàm gọi lại được truyền để FinalizationRegistry được kích hoạt khi một đối tượng được **garbage collected**.

```javascript
(function () {
  const obj = {};
  registry.register(obj, "Backbencher");
})();
```

Gắn obj vào registry, khi nào obj được **garbage collected**, đối số thứ hai của method **register()** được chuyển cho hàm gọi lại. Vì vậy, theo logic code, khi nào obj gảbage được collect thì chuỗi "Backbencher" sẽ được chuyển đến hàm gọi lại và được in ra. Khi thực thi code trên, sau khoảng 1 phút, nó sẽ được output "Backbencher".

# 5. Toán tử chỉ định logic
Cuối cùng, các thông số kỹ thuật ES12 mới này đó là Toán tử gán logic kết hợp các phép toán logic ( &&, ||hoặc ??) với assignment (**Logical Assignment Operator**)

## 5.1 Toán tử gán logic kết hợp các phép toán logic ( &&, ||hoặc ??)
```javascript
//1 var x = 1;
//2 var y = 2;
//3 x &&= y;
//4 console.log(x); // 2
```

Dòng 3 có thể chuyển thành
```javascript
x && (x = y)
```

Hay nói cách khác, nó giống như: 
```javascript
if(x) {
  x = y
}
```

Vì x là một truthy value, nó được gán với giá trị y, tức là 2.

Cũng giống như cách đã làm với && thì cũng có thể làm với ||và ??.

```javascript
x &&= y;
x ||= y;
x ??= y;
```

## 5.2 Toán tử gán logic với ||

```javascript
var x = 1;
var y = 2;
x ||= y;
console.log(x); // 1
```

Có thể thay thế dòng thứ 3 như sau 
```javascript
x || (x = y)
```

Điều đó có nghĩa là hoạt động gán chỉ xảy ra nếu x là một giá trị sai. Trong code trên x chứa một truthy value và do đó, việc gán không xảy ra. Và kết quả được in ra là 1.

## 5.3 Toán tử gán logic với ??
?? là toán tử Nullish Coalescing trong JavaScript. Nó đặc biệt kiểm tra xem một giá trị là null hoặc undefined.

```javascript
var a;
var b = a ?? 5;
console.log(b); // 5
```

Trong dòng 2, nếu giá trị của a là null hoặc undefined, thì phía bên phải của ?? được đánh giá và gán cho b.

Bây giờ hãy xem xét ?? cùng với =.

```javascript
var x;
var y = 2;
x ??= y;
console.log(x); // 2
```

Dòng 2 trong đoạn mã trên tương đương với:

```javascript
x = x ?? (x = y)
```

Ở đây giá trị của x là undefined. Vì vậy, biểu thức bên phải được đánh giá và đặt x thành 2.

# 6. Numeric Separators
Ví dụ một con số như 1000000000 có thể gây cảm giác khó khăn khi đếm số lượng số 0. Nếu khó làm việc với những con số như vậy thì ES2021 sẽ hỗ trợ toán tử có thể được đặt làm dấu phân tách số ( _ ). Khi giá trị một tỷ có thể được viết dưới dạng 1000_000_000, nó sẽ dễ đọc hơn. 

Việc bổ sung này có thể ít lạ mắt hơn, nhưng nó giúp cải thiện khả năng đọc code của bạn. Hiện tại, khi lưu trữ một số dài trong một var/let/const có thể không đọc được.

Ví dụ

```javascript
const oneMillion = 1000000;
```

Với cú pháp ES12 mới, bạn có thể tạo sự phân tách giữa các chữ số bằng cách sử dụng ký tự _

```javascript
const oneMillion = 1_000_000;
```

Dấu _ phân tách gạch dưới ( ) cũng hoạt động với số BigInt và Hex

```javascript
const max8bits = 0b1111_1111;
const message = 0xA0_B0_C0;
```

Đây chắc chắn là thứ mà mình sẽ sử dụng khá thường xuyên.

# Lời Kết
ES2021 cung cấp rất nhiều tính năng nhỏ, hữu ích như logical assigment operators, replaceAll, và numerical separators.

Một số tính năng nâng cao như WeakRefs và Finalizers đã được thêm vào, tương đối phức tạp và không nên lạm dụng trong nhiều tình huống

Cảm ơn các bạn đã quan tâm theo dõi đến đây. XIn chào và hẹn gặp lại ^^!

Nguồn tham khảo: https://backbencher.dev/javascript/es2021-new-features
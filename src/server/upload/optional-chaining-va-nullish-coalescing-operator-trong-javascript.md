![](https://images.viblo.asia/62bf52ea-db6d-4d21-8c2d-c4ab528b951c.jpeg)

**Hi guys**

Trong bài viết lần này chúng ta sẽ cùng nhau tìm hiểu về 2 Javascript features được thêm mới ở ES2020 là Optional chaining (?.) và Nullish coalescing operator (??).

Một phương thức giúp cho việc truy cập giá trị trong những object lồng nhau được đơn giản và an toàn hơn và một toán tử logic (logical operators) giúp cho việc kiểm tra điều kiện dễ dàng hơn.

## Optional chaining là cái gì?

Optional chanining `?.` là một feature được thêm mới để đảm bảo khi truy cập đến các phần tử trong object, ngay cả khi object đó không tồn tại.

Với optional chanining nếu truy cập đến một phần tử trong một object không tồn tại (`undefined` hoặc `null`), sẽ trả về `undefined` mà không xuất hiện lỗi.

## Optional chaining có 3 hình thức syntax

* `obj?.prop` – trả về obj.prop nếu obj tồn tại, nếu không sẽ trả về `undefined`.
* `obj?.[prop]` – trả về obj?.[prop] nếu obj tồn tại, nếu không sẽ trả về `undefined`.
* `obj.method?.()` – gọi đến obj.method()  nếu obj.method tồn tại,  nếu không sẽ trả về `undefined`.

**Để hiểu rõ hơn, chúng ta hãy xem xét một vài trường hợp sử dụng**

* Xem điều gì sẽ xảy ra nếu ta truy cập đến một property trong một object không tồn tại (`undefined` hoặc `null`)
```
console.log(restaurant.closingHours.mon.close)

// Uncaught ReferenceError: restaurant is not defined
```

Như ở trên, `restaurant` là undefined, nên việc truy cập đến `restaurant.closingHours.mon.close` là fail và sẽ xuất hiện lỗi.

* Để tránh xuất hiện lỗi như trên, chúng ta sẽ phải kiểm tra những parent proptyes có tồn tại hay không trước truy cập đến phần từ con của nó
```
if(restaurant && restaurant.closingHours && restaurant.closingHours.mon)
console.log(restaurant.closingHours.mon.close);

// Nothing happen
```

Đoạn code trên hoạt động tốt, không gây ra lỗi, nhưng chúng ta cùng xem tới trường hợp như dưới đây

```
const obj = {
  prop1: {
    prop2: {
      prop3: {
        prop4: {
          prop5: 5
        }
      }
    }
  }
}
  obj &&
  obj.prop1 &&
  obj.prop1.prop2 &&
  obj.prop1.prop2 &&
  obj.prop1.prop2.prop3 &&
  obj.prop1.prop2.prop3.prop4 &&
  console.log(obj.prop1.prop2.prop3.prop4.prop5);
```

Vậy nếu ta muốn truy cập đến một property được lồng trong nhiều object, chúng ta phải dùng một biểu thức toán từ dài như trên để kiếm tra tồn tại cho cái parent propertys của nó, từ đó sẽ khiến code của chúng ta khó đọc và lộn xộn hơn.
Để giải quyết vấn đề, chúng ta sẽ dùng optional chanining `?.` như sau

```
const obj = {
  prop1: {
    prop2: {
      prop3: {
        prop4: {
          prop5: 5
        }
      }
    }
  }
}
console.log(obj?.prop1?.prop2?.prop3?.prop4?.prop5);
```
Khi có một prop bị `null` hoặc `undefined` thì chương trình sẽ không bị crash và báo lỗi mà sẽ trả về `undefined`.

Syntax `?.[]` cũng có thể sử dụng để gọi tới property thay thế cho phương thức chấm tên prop của object

Hiện tại Optional chaining không được support trên trình duyệt IE, chúng ta có thể sử dụng Babel để được hỗ trợ polyfill 

## Kết hợp với nullish coalescing operator

Tóm gọn, nullish coalescing operator (`??`) là một toán tử logic điều kiện, trả về giá trị bên phải của phép toán nếu giá trị bên trái nó là `null` hoặc `undefined`, còn không sẽ trả về giá trị bên trái bình thường.

Ta cùng xem dòng code dưới đây
```
const y = x || 500;
```

Ta gán giá trị x cho y, trong trường hợp x là undefined hoặc null sẽ gán y bằng 500.

Nhưng ở toán tử  hoặc (`||`) ở trên, ta rơi vào trường hợp là sẽ gán y bằng 500 bất cứ khi nào x là falsy value, bao gồm số 0, "" empty string và `false` là những giá trị ta muốn gán trực tiếp cho cho y.

Để giải quyết vấn đề này ta sử dụng nullish coalescing operator (`??`) để chỉ kiểm tra giá trị null hoặc undefined bên vế trái.

Ta có ví dụ như sau
```
const x = null;
const y = x ?? 500;
console.log(y); // 500

const n = 0
const m = n ?? 9000;
console.log(m) // 0
```

Trường hợp ở trên, n = 0 là một falsy value nhưng vẫn được gán cho m bởi vì toán tử (`??`) chỉ kiểm tra giá trị nullish là null và undefined

Ta có thể kết hợp `?.` và `??` để giải quyết một số tình huống, đây là một ví dụ đơn giản

```
let user = {
  name: "Insha",
  details: { age: 19 }
};

const userCity = user?.city ?? "Unknown city";
console.log(userCity); // Unknown city
```

## Không thể sử dụng optional chaining để gán giá trị

Optional chaining là không hợp lệ khi sử dụng để gán giá trị cho property. Kết quả sẽ xuất hiện lỗi như sau

```
let user = {};
user?.name = "Someone";

// Uncaught SyntaxError: Invalid left-hand side in assignment
```

## Optional chaining để gọi hàm

Giống như property, optional chaining cũng có thể dùng để gọi tới 1 hàm, mà có thể hàm đó không tồn tại

```
let userHost = {};

userHost.admin(); // Uncaught TypeError: userHost.admin is not a function

let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing (no such method)

```

Nếu hàm đó không tồn tại thì không có gì xảy ra giống như ở trên.

## Kết luận 

Optional chaining và nullish coalescing operator rất hữu ích để giải quyết các tình huống truy cập giá trị trong các object lồng nhau hoặc gán giá trị mặc định cho biến.

Optional chaining thường được sử dụng khi chúng ta fetching data từ API, khi mà chúng ta không thể chắc chắn được có thể nhận giá trị response hay không. Chúng ta cần đảm bảo mọi logic hoạt động đúng và không bị crash app.

Cảm ơn mọi người đã đọc hết bài viết! Bye <3
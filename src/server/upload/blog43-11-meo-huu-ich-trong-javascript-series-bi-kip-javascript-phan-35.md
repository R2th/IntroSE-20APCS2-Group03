![](https://images.viblo.asia/fad8cc24-f56f-44be-b74b-993a97a1883f.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Trong công việc lập trình hàng ngày chúng ta thường gặp các bài toàn đại loại như: kiểm tra các `key` xem nó có tồn tại hay không, thao tác có điều kiện với dữ liệu, lọc `value` trong các `array`, v.v.

Ở đây mình liệt kê ra một số trường hợp phổ biến mà cá nhân mình yêu thích ❤️ ️và rất hữu ích để làm cho code **ngắn hơn** và **rõ ràng hơn.**
Có bạn sẽ thắc mắc tại sao ko dùng thư viên thư viện có hết rồi mà :D.
1. Có đôi khi giết gà ko cần dùng đến dao môt trâu
2. Mình thì luôn tiên xài tốt mấy cái hàm có sẵn của js trước

1\. Điều kiện khi **thêm các Properties**💡 vào đối tượng
-------

```javascript
const isValid = false;
const age = 18;

// Chúng ta cần sẽ dùng toán tử spread (...) để xử lý

const person = {
  id: "1234",
  name: "Tuan",
  ...(isValid && { isValid: true }),
  ...((age >= 18 || isValid) && { cart: 0 }),
};

console.log("person :>> ", person);
```

```console
person :>>  { id: '1234', name: 'Tuan', cart: 0 }
```

2\. Kiểm tra xem một `Property` có tồn tại **trong** một đối tượng hay không
----
Chúng ta có thể dùng keyword `in` để kiểm tra xem property có tồn tại trong Object không

```javascript
const person = {
  id: "123",
  name: "tuan",
};

console.log("id in person :>> ", "id" in person);
console.log("name in person :>> ", "name" in person);
```

```console
id in person :>>  true
name in person :>>  true
```

3\. **Destructuring** đối tượng bằng `Dynamic key`
----
Chúng ta cũng có thể đặt một `alias name` cho một biến đã được `Destructuring`

```javascript
const productData = { id: "123", name: "laptop" };
const { name: deviceName } = productData;

console.log("deviceName :>> ", deviceName);

const extractKey = "name";
const { [extractKey]: data } = productData;

console.log("data :>> ", data);
```

```console
deviceName :>>  laptop
data :>>  laptop
```

4\. Lặp một đối tượng để truy cập đồng thời `key` và `value`
----
Có thể truy cấp cùng lúc `key` và `value` khi sử dụng hàm `entries` 

```javascript
const data = { id: 1, name: "laptop", isSale: true };

Object.entries(data).forEach(([key, value]) => {
  if (["id", "name"].includes(key)) {
    console.log("key :>> ", key);
    console.log("value :>> ", value);
  }
});
```

```console
key :>>  id
value :>>  1

key :>>  name
value :>>  laptop
```

5\. Ngăn chặn lỗi 🐞 khi truy cập bất kỳ `key` nào không tồn tại trong đối tượng bằng cách sử dụng chuỗi tùy chọn (`?.`)
----

```javascript
const data = { id: 1, isSale: true };

console.log("data?.name :>> ", data?.name);
console.log("data?.name?.user :>> ", data?.name?.user);
console.log("data?.displayName :>> ", data?.displayName);
```

```console
data?.name :>>  undefined       
data?.name?.user :>>  undefined 
data?.displayName :>>  undefined
```

**Cảnh báo**⚠️: chuỗi tùy chọn được sử dụng khi bạn không chắc `Property` của nó có tồn tại hay không có trong dữ liệu. Nếu bạn chắc chắn rằng các khóa phải có trong dữ liệu và nếu không có, thì bạn nên `throw error` để đưa ra `lỗi` thay vì ngăn chặn chúng.

6\. Kiểm tra các `falsy value` **🌵** trong một array
----
```javascript
const fruitList = ["apple", null, "mango", undefined, ""];

const filterFruitList = fruitList.filter(Boolean);
console.log("filterFruitList :>> ", filterFruitList);

const isAnyFruit = fruitList.some(Boolean);
console.log("isAnyFruit :>> ", isAnyFruit);
```

```console
filterFruitList :>>  [ 'apple', 'mango' ]
isAnyFruit :>>  true
```

7\. Loại bỏ các giá trị trùng lặp trong array.
----
Riếng cái hàm này mình rất hay dùng (nhanh gọn lẹ :D)

```javascript
const fruitList = ["apple", "mango", "apple", "mango", "grapes"];

const uniqFruitList = [...new Set(fruitList)];
console.log("uniqFruitList :>> ", uniqFruitList);
```

```console
uniqFruitList :>>  [ 'apple', 'mango', 'grapes' ]
```

**Lưu ý**⚠️: cái này là một feature của ES6 nhé.

8\. Kiểm tra một biến có phải là **kiểu array** hay ko
-----
Ví bản chất array là một mảng `{0:{}, 1:{}, 2:{}....}` nên `typeof` nó sẽ trả về giá trị là `object`

```javascript
const fruitList = ["apple", "mango", "apple", "mango", "grapes"];

console.log("typeof fruitList :>> ", typeof fruitList);

console.log("Array.isArray(fruitList) :>> ", Array.isArray(fruitList));
```

```javascript
typeof fruitList :>>  object
Array.isArray(fruitList) :>>  true
```

9\. Chuyển đổi Chuỗi thành Số và Số thành Chuỗi bằng toán tử ' **+**' 🤩
-----
Toán tử `+` là một toán tử đặc biệt nên vị trí của nó cũng quyết định ý nghĩa của nó trong từng trường hợp cụ thể.

```javascript
const numberId = "1234";

console.log("+numberId :>> ", +numberId);
console.log("typeof +numberId :>> ", typeof +numberId);

console.log("numberId + '':>> ", numberId + "");
console.log("typeof numberId + '' :>> ", typeof numberId + "");
```

```console
+numberId :>>  1234
typeof +numberId :>>  number
numberId + '':>>  1234
typeof numberId + '' :>>  string
```

10\. Gán các giá trị khác một cách có điều kiện khi giá trị là **null** và **undefined** bằng cách sử dụng **toán tử `nullish coalescing`** (`??`)
----

```javascript
let data = undefined ?? "no Data";
console.log("data 1 :>> ", data);

data = null ?? "no Data";
console.log("data 2 :>> ", data);

data = "" ?? "no Data";
console.log("data 3 :>> ", data);

data = 5 ?? null ?? "no Data";
console.log("data 4 :>> ", data);

// Khi sử dụng cùng toán tử gán thì nó sẽ dựa trên giá trị hiện tại của nó
data ??= "no Data";
console.log("data 5 :>> ", data);
```

```console
data 1 :>>  no Data
data 2 :>>  no Data
data 3 :>>
data 4 :>>  5
data 5 :>>  5
```

Nhiều bạn cũng hay nhầm lẫn 😕 giữa `??` với toán tử OR (`||`)

Toán tử OR được sử dụng khi bạn muốn gán giá trị khác theo điều kiện nếu giá trị đó không **đúng**. Có nghĩa là nếu nó là một trong những giá trị sau (`0`,`’ ’`, `null`, `undefined`, `false`, `NaN`)

```javascript
let data = undefined || "no Data";
console.log("data 1 :>> ", data);

data = null || "no Data";
console.log("data 2 :>> ", data);

data = "" || "no Data";
console.log("data 3 :>> ", data);

data = 5 || null || "no Data";
console.log("data 4 :>> ", data);

// Khi sử dụng cùng toán tử gán thì nó sẽ dựa trên giá trị hiện tại của nó
data ||= "no Data";
console.log("data 5 :>> ", data);
```

```console
data 1 :>>  no Data
data 2 :>>  no Data
data 3 :>>  no Data
data 4 :>>  5
data 5 :>>  5
```

11\. Chuyển đổi `Boolean` bằng cách sử dụng toán tử **!!**

```javascript
console.log("This is not Empty :>> ", !!"");
console.log("This is not Empty :>> ", !!"This is not Empty");
```

```console
This is not Empty :>>  false
This is not Empty :>>  true
```

Cũng y hết cũng nó nhiều bạn vẫn thắc mắc `!!` thì khác gì với `!`

```javascript
console.log("This is Empty :>> ", !"");
console.log("This is Empty :>> ", !"This is Empty");
```

```console
This is Empty :>>  true
This is Empty :>>  false
```

Ô thế nếu như nó là....
```javascript
console.log("This is ... :>> ", !!!"");
console.log("This is ... :>> ", !!!"This is ...");
```
```console
This is ... :>>  true
This is ... :>>  false
```

🤣 thực ra nó chỉ có `!` và `!!` mà thôi còn từ dầu thăng thứ 3 trở đi nó đơn giản chỉ là phủ định của `!!` mà thôi.

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
* https://tuan200tokyo.blogspot.com/2022/11/blog43-11-meo-huu-ich-trong-javascript.html
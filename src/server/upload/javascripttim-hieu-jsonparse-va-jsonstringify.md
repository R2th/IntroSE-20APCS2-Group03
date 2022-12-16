Đối tượng `JSON`, hiện tại tất cả các trình duyệt hiện đại đều hỗ trợ, có hai phương thức rất hữu ích để xử lý nội dung có định dạng `JSON`: là **parse**() và **stringify**()

**JSON.parse()** convert một chuỗi JSON và biến nó thành một đối tượng `JavaScript`. 

**JSON.stringify()**  convert một đối tượng JavaScript và chuyển đổi nó thành một chuỗi `JSON`.

Và đây là  ví dụ:

```js
const myObj = {
  name: 'Skip',
  age: 2,
  favoriteFood: 'Steak'
};

const myObjStr = JSON.stringify(myObj);

console.log(myObjStr);
// "{"name":"Skip","age":2,"favoriteFood":"Steak"}"

console.log(JSON.parse(myObjStr));
// Object {name:"Skip",age:2,favoriteFood:"Steak"}
```

Và phương thức này cũng có thể sử dụng tương tự với mảng:


```js
const myArr = ['bacon', 'letuce', 'tomatoes'];

const myArrStr = JSON.stringify(myArr);

console.log(myArrStr);
// "["bacon","letuce","tomatoes"]"

console.log(JSON.parse(myArrStr));
// ["bacon","letuce","tomatoes"]
```

# JSON.parse()

**JSON.parse ()** có thể nhận thêm tham số thứ 2 để transform (chuyển đổi) giá trị trả về. Ví dụ như bên dưới sẽ trả về giá trị ở dạng `uppercased` :


```js
const user = {
  name: 'John',
  email: 'john@awesome.com',
  plan: 'Pro'
};

const userStr = JSON.stringify(user);

JSON.parse(userStr, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});
```

# JSON.stringify()
## Syntax
```
JSON.stringify(value[, replacer[, space]])
```

Tham số đầu tiên: là giá trị muốn convert thành chuổi JSON.

Tham số thứ 2: là 1 function dùng để thay đổi quá trình xử lý để trả về giá trị mong muốn

Tham số thứ 3: Chèn 1 chuối vào đầu mỗi phần tử của đầu ra của chuỗi JSON

(Thường là chúng ta rất ít sử dụng  tham số 2, 3. Sau khi mình tìm hiểu thì thấy có một vài trường hợp hay sử dụng như kiểm tra phần tử tồn tại, filter, ....)

```js
const user = {
  id: 229,
  name: 'John',
  email: 'john@awesome.com'
};

function replacer(key, value) {
  console.log(typeof value);
  if (key === 'email') {
    return undefined;
  }
  return value;
}

const userStr = JSON.stringify(user, replacer);
// "{"id":229,"name":"John"}"
```

Và đây là ví dụ có tham số thứ 3:

```js
const user = {
  name: 'John',
  email: 'john@awesome.com',
  plan: 'Pro'
};

const userStr = JSON.stringify(user, null, '...');
// "{
// ..."name": "John",
// ..."email": "john@awesome.com",
// ..."plan": "Pro"
// }"
```

**........................BÀI CỦA MÌNH ĐẾN ĐÂY LÀ HẾT RỒI....................**
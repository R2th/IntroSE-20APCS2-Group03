> **JSON** có sẵn trong tất cả các trình duyệt web hiện đại, hai method này rất hữu ích trong việc xử lý những nội dung có định dạng là **JSON**: `parse` và `stringify`. `JSON.parse()` nhận vào một chuỗi **JSON** và chuyển đổi (transform) nó thành một đối tượng **JavaScript**. `JSON.stringify()` làm điều ngược lại - lấy một đối tượng **JavaScript** và chuyển đổi nó thành một chuỗi **JSON**.

Ví dụ:

```JavaScript
const myObj = {
  name: 'Sy Dinh',
  age: 22,
  social: 'https://sydinh.com/',
};

const myObjStr = JSON.stringify(myObj);

console.log(myObjStr);
// JSON "{"name":"Sy Dinh","age":22,"social":"https://sydinh.com/"}"

console.log(JSON.parse(myObjStr));
// Object {name: "Sy Dinh", age: 22, social: "https://sydinh.com/"}
```

Mặc dù phương thức này thường được sử dụng phổ biến hơn trên các đối tượng **JavaScript** (`Object`), nhưng đối với mảng (`Array`) chúng cũng làm được điều tương tự:

```JavaScript
const myArr = ['foo', 'bar', 'foobar'];

const myArrStr = JSON.stringify(myArr);

console.log(myArrStr);
// JSON "["foo","bar","foobar"]"

console.log(JSON.parse(myArrStr));
// Array ["foo", "bar", "foobar"]
```

## JSON.parse()

`JSON.parse()` có thể nhận vào một đối số thứ hai là hàm `reviver`, hàm này có thể chuyển đổi các giá trị của đối tượng trước khi chúng được trả về. Ví dụ dưới đây mình chuyển đổi các giá trị của đối tượng từ viết thường (`lowercase`) thành viết hoa (`uppercase`):

```JavaScript
const user = {
  name: 'Sy Dinh',
  email: 'sydinh.dev@gmail.com',
};

const userStr = JSON.stringify(user);

JSON.parse(userStr, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});

// "{name: "SY DINH", email: "SYDINH.DEV@GMAIL.COM"}"
```

## JSON.stringify()

`JSON.stringify()` cũng có thể nhận vào hai đối số, hàm đầu tiên là hàm thay thế (`replacer`) và hàm thứ hai là giá trị Chuỗi hoặc Số (String or Number) sử dụng như một khoảng trống (`space`) trong chuỗi được trả về.

Dưới đây, hàm `replacer` được sử dụng để lọc các giá trị trong một object, bất kỳ giá trị nào được trả về là `undefined` sẽ nằm ngoài chuỗi trả về:

```JavaScript
const user = {
  id: 01,
  name: 'Sy Dinh',
  email: 'sydinh.dev@gmail.com'
};

function replacer(key, value) {
  if (key === 'email') {
    return undefined;
  }
  return value;
}

const userStr = JSON.stringify(user, replacer);
// JSON "{"id":1,"name":"Sy Dinh"}"
```

## Kết luận

Chúc bạn học tốt !
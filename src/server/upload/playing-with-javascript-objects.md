## 1. Xóa 1 thuộc tính của 1 Object

```
let myObject = {
    "ircEvent": "PRIVMSG",
    "method": "newURI",
    "regex": "^http://.*"
};
```

Có nhiều cách để xóa một thuộc tính của object như trên

```
delete myObject.regex;
// or,
delete myObject['regex'];
// or,
const prop = "regex";
delete myObject[prop];
```

## 2. Kiểm tra xem Object có key đó hay không?

Kiểm tra tính không xác định không phải là cách chính xác để kiểm tra xem key có tồn tại hay không. Điều gì sẽ xảy ra nếu key tồn tại nhưng giá trị là undefined?

```
let obj = { key: undefined };
obj["key"] !== undefined // false, but the key exists!
```

Cũng có nhiều cách để có thể kiểm tra một cách chính xác

Đầu tiên có thể kể đến là toán tử **in**, nhớ sử dụng ngoặc đơn nếu ko nó sẽ báo lỗi

```
"key" in obj // true, regardless of the actual value
```

```
!("key" in obj) // true if "key" doesn't exist in object
!"key" in obj   // ERROR!  Equivalent to "false in obj"
```

Hoặc có thể dùng hasOwnProperty

```
obj.hasOwnProperty("key") // true
```

## 3. Kích thước của một Object

Câu trả lời chắc chắn nhất sẽ là

```
Object.size = function(obj) {
        let size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    // Get the size of an object
    const myObj = {}
    let size = Object.size(myObj);
```

Đây là bản cập nhật tính đến năm 2016 và việc triển khai rộng rãi ES5 trở lên. Đối với IE9 + và tất cả các trình duyệt hỗ trợ ES5 + hiện đại khác, bạn có thể sử dụng Object.keys () để đoạn mã trên trở thành:

```
let size = Object.keys(myObj).length;
```

Điều này không phải sửa đổi bất kỳ nguyên mẫu hiện có nào vì Object.keys () hiện đã được tích hợp sẵn.
Các đối tượng có thể có các thuộc tính tượng trưng mà không thể trả về thông qua phương thức Object.key. Vì vậy, câu trả lời sẽ là không đầy đủ nếu không nhắc đến chúng.
Kiểu symbol đã được thêm vào ngôn ngữ để tạo ra các định danh duy nhất cho các thuộc tính đối tượng. Lợi ích chính của loại symbol là ngăn chặn ghi đè.

Object.keys hoặc Object.getOwnPropertyNames không làm việc với thuộc tính symbol. Để trả về chúng bạn cần sử dụng Object.getOwnPropertySymbols.

```
let person = {
      [Symbol('name')]: 'John Doe',
      [Symbol('age')]: 33,
      "occupation": "Programmer"
    };
    
    const propOwn = Object.getOwnPropertyNames(person);
    console.log(propOwn.length); // 1
    
    let propSymb = Object.getOwnPropertySymbols(person);
    console.log(propSymb.length); // 2
```

## 4. Thêm các thuộc tính vào đối tượng một cách có điều kiện?

Để thêm thuộc tính vào 1 object phụ thuộc điều kiện, Chúng ra có thể sử dụng như sau

```
const someObj = { prop3: 'Arsenal!' };
const obj = {
  prop1: "value1",
  prop2: "value2",
  ...(someObj ?? {})
}
```

Cũng có thể sử dụng như thế với React component

```
<MyComponent
  prop1="value1"
  prop2="value2"
  ...(someObj ?? {})
/>
```